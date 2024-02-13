import { Canvas } from "canvas";
import Renderable2D from "../Interfaces/Renderable2D";

class Scene implements Renderable2D {
  /**
   * The background color of the scene.
   */
  background: string;

  constructor() {
    this.background = "#000000";
  }

  update(frame: number): void { }

  render(canvas: Canvas): Canvas {
    // get the components via the this element and all of the elements in it that have a render method
    const components = Object.getOwnPropertyNames(this).map((name) => this[name]).filter((component) => component.render);
    const ctx = canvas.getContext('2d');
    const fillStyle = ctx.fillStyle;
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = fillStyle;
    components.forEach((component) => component.render(canvas, ctx));
    return canvas;
  }
}

export default Scene;