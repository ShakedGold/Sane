import { Canvas, CanvasRenderingContext2D } from "canvas";
import Renderable2D from "../Interfaces/Renderable2D";

class Rectangle implements Renderable2D {
  public position: { x: number, y: number };
  public color: string;
  public size = { width: 100, height: 100 };

  constructor() {
    this.position = { x: 0, y: 0 };
    this.color = "#FFFFFF";
    this.size = { width: 100, height: 100 };
  }

  render(canvas: Canvas, ctx: CanvasRenderingContext2D): Canvas {
    if (!ctx) ctx = canvas.getContext("2d");
    const fillStyle = ctx.fillStyle;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    ctx.fillStyle = fillStyle;
    return canvas;
  }
}

export default Rectangle;