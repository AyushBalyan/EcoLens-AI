export interface SustainabilityInfo {
  name: string;
  recyclable: boolean;
  ecoScore: number;
  decompositionTime: string;
  binType: string;
  alternative: string;
  co2Impact: string;
  disposalSteps: string[];
}

export interface DetectionResult {
  class: string;
  confidence: number;
}

export interface StoredDetection extends DetectionResult {
  timestamp: number;
}

export type EcoScoreRating = "Poor" | "Average" | "Good" | "Excellent";
