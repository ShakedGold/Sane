import { Canvas, createCanvas } from "canvas";
import { writeFileSync, existsSync, mkdirSync, unlinkSync, rmdirSync } from "fs";
import * as ffmpeg from "fluent-ffmpeg";
import * as cliProgress from "cli-progress";

import Scene from "./Scene";
import { RendererOptions } from "../Interfaces";

class Renderer2D {
  /**
   * The scene to be rendered.
   */
  public scene: Scene;
  private options: RendererOptions;
  private canvas: Canvas;

  constructor(options?: RendererOptions, scene?: Scene) {
    const defaultOptions = { width: 800, height: 600, name: "example.png", durationS: 5, fps: 30 };
    this.options = { ...defaultOptions, ...options };
    this.canvas = createCanvas(this.options.width, this.options.height);
    this.scene = scene || new Scene();
  }

  setOptions(options: RendererOptions) {
    this.options = { ...this.options, ...options };
  }

  /**
   * Render the scene to frames and save them to the "frames" directory.
   */
  render() {
    const frames = this.options.durationS * this.options.fps;

    // make directory for frames if it doesn't exist
    if (!existsSync("frames")) {
      mkdirSync("frames");
    }

    const bar = new cliProgress.SingleBar({
      format: "Rendering frames [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} frames"
    }, cliProgress.Presets.shades_classic);
    bar.start(frames, 0);
    for (let i = 0; i < frames; i++) {
      this.scene.update(i);
      this.scene.render(this.canvas);

      const buffer = this.canvas.toBuffer("image/png");
      writeFileSync(`frames/frame${String(i + 1)}.png`, buffer);
      bar.update(i + 1);
    }
    bar.stop();
    console.log("Frames rendered\n");
  }

  /**
   * Create a video from the frames in the "frames directory".
   */
  save() {
    const bar = new cliProgress.SingleBar({
      format: "Creating video [{bar}] {percentage}% | ETA: {eta}s"
    }, cliProgress.Presets.shades_classic);

    // make directory for output if it doesn't exist
    if (!existsSync("output")) {
      mkdirSync("output");
    }

    // Create a video from the frames
    bar.start(100, 0);
    ffmpeg("frames/frame%d.png")
      .inputFPS(this.options.fps)
      .format("mp4")
      .videoCodec("libx264")
      .size(`${this.options.width}x${this.options.height}`)
      .duration(this.options.durationS)
      .on("end", () => {
        bar.update(100);
        bar.stop();
        console.log("Video created");

        if (this.options.cleanup) {
          this.cleanup();
        }
      })
      .on("error", (err) => {
        console.error(err);
      })
      .on("progress", (progress) => {
        const percent = Math.round(isNaN(progress.percent) ? 0 : progress.percent)
        bar.update(percent);
      })
      .save(`output/${this.options.name}.mp4`);
  }

  /**
   * Remove the frames and frames directory.
   */
  cleanup() {
    const frames = this.options.durationS * this.options.fps;

    const barCleanup = new cliProgress.SingleBar({
      format: "Cleaning up [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} frames"
    }, cliProgress.Presets.shades_classic);
    barCleanup.start(frames + 1, 0);
    for (let i = 0; i < frames; i++) {
      // remove frames
      unlinkSync(`frames/frame${String(i + 1)}.png`);
      barCleanup.update(i + 1);
    }
    // remove frames directory
    rmdirSync("frames");
    barCleanup.update(frames + 1);
    barCleanup.stop();
  }
}

export default Renderer2D;