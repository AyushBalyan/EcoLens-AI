import type { DetectionResult, StoredDetection } from "@/types/sustainability";

const DETECTION_KEY = "ecolens_detection";

export function saveDetection(result: DetectionResult): void {
  const stored: StoredDetection = {
    ...result,
    timestamp: Date.now(),
  };
  sessionStorage.setItem(DETECTION_KEY, JSON.stringify(stored));
}

export function getDetection(): StoredDetection | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(DETECTION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredDetection;
  } catch {
    return null;
  }
}

export function clearDetection(): void {
  sessionStorage.removeItem(DETECTION_KEY);
}
