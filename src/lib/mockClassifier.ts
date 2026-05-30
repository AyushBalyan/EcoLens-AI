import { getAllClassNames } from "@/lib/sustainability";
import type { DetectionResult } from "@/types/sustainability";

export class MockClassifier {
  private ready = false;
  private index = 0;

  async init(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    this.ready = true;
  }

  isReady(): boolean {
    return this.ready;
  }

  async classifyFrame(): Promise<DetectionResult | null> {
    if (!this.ready) return null;

    await new Promise((resolve) => setTimeout(resolve, 120));

    const classes = getAllClassNames();
    const selected =
      Math.random() > 0.35
        ? classes[this.index % classes.length]
        : classes[Math.floor(Math.random() * classes.length)];

    this.index += 1;

    return {
      class: selected,
      confidence: 0.75 + Math.random() * 0.23,
    };
  }
}
