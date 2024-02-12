import { Canvas } from "canvas";
import Renderable2D from "../Interfaces/Renderable2D";

class Scene implements Renderable2D {
  components: Renderable2D[];
  background: string;

  constructor() {
    this.components = [];
    this.background = "#000000";
  }

  addComponent(component: Renderable2D) {
    this.components.push(component);
  }

  addComponents(...components: Renderable2D[]) {
    this.components = this.components.concat(components);
  }

  update(frame: number): void { }

  render(canvas: Canvas): Canvas {
    const ctx = canvas.getContext('2d');
    const fillStyle = ctx.fillStyle;
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = fillStyle;
    this.components.forEach((component) => component.render(canvas, ctx));
    return canvas;
  }
}

export default Scene;