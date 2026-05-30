export const CONFIDENCE_THRESHOLD = 0.6;
export const STABLE_DETECTION_COUNT = 3;
export const CLASSIFICATION_INTERVAL_MS = 300;
export const MODEL_PATH = "/model/model.json";
export const METADATA_PATH = "/model/metadata.json";

export function shouldUseMockClassifier(): boolean {
  return process.env.NEXT_PUBLIC_USE_MOCK_CLASSIFIER !== "false";
}
