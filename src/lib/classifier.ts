import { CONFIDENCE_THRESHOLD, shouldUseMockClassifier } from "@/lib/constants";
import { MockClassifier } from "@/lib/mockClassifier";
import { normalizeClassName } from "@/lib/sustainability";
import {
  getLoadedModel,
  getModelLabels,
  getTensorFlow,
  loadModel,
} from "@/lib/tensorflow";
import type { DetectionResult } from "@/types/sustainability";

export interface Classifier {
  init(): Promise<void>;
  isReady(): boolean;
  classifyFrame(video: HTMLVideoElement): Promise<DetectionResult | null>;
}

class TensorFlowClassifier implements Classifier {
  private ready = false;
  private inputSize = 224;

  async init(): Promise<void> {
    await loadModel();
    this.ready = true;
  }

  isReady(): boolean {
    return this.ready;
  }

  async classifyFrame(
    video: HTMLVideoElement,
  ): Promise<DetectionResult | null> {
    if (!this.ready || video.videoWidth === 0 || video.videoHeight === 0) {
      return null;
    }

    const tf = await getTensorFlow();
    const model = getLoadedModel();
    if (!model) return null;

    const labels = getModelLabels();

    let topIndex = 0;
    let topConfidence = 0;

    tf.tidy(() => {
      const tensor = tf.browser
        .fromPixels(video)
        .resizeNearestNeighbor([this.inputSize, this.inputSize])
        .toFloat()
        .div(255)
        .expandDims(0);

      const predictions = model.predict(tensor) as import("@tensorflow/tfjs").Tensor;
      const values = predictions.dataSync();
      predictions.dispose();

      topConfidence = values[0] ?? 0;
      topIndex = 0;

      for (let i = 1; i < values.length; i += 1) {
        if (values[i] > topConfidence) {
          topConfidence = values[i];
          topIndex = i;
        }
      }
    });

    const rawClass = labels[topIndex] ?? `Class ${topIndex}`;
    const normalized = normalizeClassName(rawClass);

    if (topConfidence < CONFIDENCE_THRESHOLD) return null;

    return {
      class: normalized,
      confidence: topConfidence,
    };
  }
}

let classifierInstance: Classifier | null = null;

export function getClassifier(): Classifier {
  if (!classifierInstance) {
    classifierInstance = shouldUseMockClassifier()
      ? new MockClassifier()
      : new TensorFlowClassifier();
  }
  return classifierInstance;
}

export async function initClassifier(): Promise<Classifier> {
  const classifier = getClassifier();
  if (!classifier.isReady()) {
    try {
      await classifier.init();
    } catch {
      if (!(classifier instanceof MockClassifier)) {
        classifierInstance = new MockClassifier();
        await classifierInstance.init();
      }
    }
  }
  return getClassifier();
}

export async function classifyFrame(
  video: HTMLVideoElement,
): Promise<DetectionResult | null> {
  const classifier = getClassifier();
  if (!classifier.isReady()) return null;
  return classifier.classifyFrame(video);
}
