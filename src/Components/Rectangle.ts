import { Canvas, CanvasRenderingContext2D } from "canvas";
import Renderable2D from "../Interfaces/Renderable2D";

class Rectangle implements Renderable2D {
  /**
   * The position of the rectangle.
   */
  public position: { x: number, y: number };
  /**
   * The color of the rectangle.
   */
  public color: string;
  /**
   * The size of the rectangle.
   */
  public size = { width: 100, height: 100 };

  constructor() {
    this.position = { x: 0, y: 0 };
    this.color = "#FFFFFF";
    this.size = { width: 100, height: 100 };
  }

  render(canvas: Canvas, ctx: CanvasRenderingContext2D): Canvas {
    if (!ctx) ctx = canvas.getContext("2d");
    // save the fill style so we can restore it after rendering
    const fillStyle = ctx.fillStyle;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    ctx.fillStyle = fillStyle;
    return canvas;
  }
}

export default Rectangle;