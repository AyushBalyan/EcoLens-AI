import { METADATA_PATH, MODEL_PATH } from "@/lib/constants";

export type ModelLoadState = "idle" | "loading" | "ready" | "error";

let model: import("@tensorflow/tfjs").LayersModel | null = null;
let labels: string[] = [];
let loadState: ModelLoadState = "idle";
let loadError: string | null = null;

async function loadLabels(): Promise<string[]> {
  try {
    const response = await fetch(METADATA_PATH);
    if (!response.ok) return [];

    const metadata = (await response.json()) as { labels?: string[] };
    return metadata.labels ?? [];
  } catch {
    return [];
  }
}

export async function loadModel(): Promise<import("@tensorflow/tfjs").LayersModel> {
  if (model) return model;
  if (loadState === "loading") {
    throw new Error("Model is already loading");
  }

  loadState = "loading";
  loadError = null;

  try {
    const tf = await import("@tensorflow/tfjs");
    await tf.setBackend("webgl");
    await tf.ready();

    model = await tf.loadLayersModel(MODEL_PATH);
    labels = await loadLabels();
    loadState = "ready";
    return model;
  } catch (error) {
    loadState = "error";
    loadError =
      error instanceof Error ? error.message : "Failed to load TensorFlow model";
    throw error;
  }
}

export function getModelLoadState(): ModelLoadState {
  return loadState;
}

export function getModelLoadError(): string | null {
  return loadError;
}

export function getModelLabels(): string[] {
  return labels;
}

export function getLoadedModel(): import("@tensorflow/tfjs").LayersModel | null {
  return model;
}

export async function getTensorFlow() {
  const tf = await import("@tensorflow/tfjs");
  await tf.setBackend("webgl");
  await tf.ready();
  return tf;
}
