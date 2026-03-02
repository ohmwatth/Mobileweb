import { Motion } from "@capacitor/motion";
import type { AccelSample } from "./types";

export class MotionService {
  private listener?: { remove: () => Promise<void> };
  private running = false;

  async start(cb: (s: AccelSample) => void): Promise<void> {
    if (this.running) return;
    this.running = true;

    this.listener = await Motion.addListener("accel", (event) => {
      const a = event.accelerationIncludingGravity;
      if (!a) return;

      const sample: AccelSample = {
        ax: a.x ?? 0,
        ay: a.y ?? 0,
        az: a.z ?? 0,
        t: Date.now(),
      };

      console.log("ACC:", sample.ax, sample.ay, sample.az);

      cb(sample);
    });
  }

  async stop(): Promise<void> {
    if (!this.running) return;

    if (this.listener) {
      await this.listener.remove();
      this.listener = undefined;
    }

    this.running = false;
  }
}