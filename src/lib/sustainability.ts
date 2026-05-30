import sustainabilityData from "@/data/sustainabilityData.json";
import type { EcoScoreRating, SustainabilityInfo } from "@/types/sustainability";

const data = sustainabilityData as Record<string, SustainabilityInfo>;

const CLASS_ALIASES: Record<string, string> = {
  "plastic bottle": "Plastic Bottle",
  "glass bottle": "Glass Bottle",
  "aluminum can": "Aluminum Can",
  "metal can": "Aluminum Can",
  paper: "Paper",
  cardboard: "Cardboard",
  "food waste": "Food Waste",
  battery: "Battery",
  "electronic waste": "Electronic Waste",
  "e-waste": "Electronic Waste",
  "plastic bag": "Plastic Bag",
  "cloth bag": "Cloth Bag",
};

export function normalizeClassName(className: string): string {
  const trimmed = className.trim();
  const direct = data[trimmed];
  if (direct) return trimmed;

  const alias = CLASS_ALIASES[trimmed.toLowerCase()];
  if (alias) return alias;

  const match = Object.keys(data).find(
    (key) => key.toLowerCase() === trimmed.toLowerCase(),
  );
  return match ?? trimmed;
}

export function getSustainabilityInfo(
  className: string,
): SustainabilityInfo | null {
  const normalized = normalizeClassName(className);
  return data[normalized] ?? null;
}

export function getEcoScoreRating(score: number): EcoScoreRating {
  if (score <= 3) return "Poor";
  if (score <= 6) return "Average";
  if (score <= 8) return "Good";
  return "Excellent";
}

export function getAllClassNames(): string[] {
  return Object.keys(data);
}
