import { Canvas, CanvasRenderingContext2D } from "canvas";
import Renderable2D from "../Interfaces/Renderable2D";

class Text2D implements Renderable2D {
  public text: string;
  public position: { x: number, y: number };
  public color: string;
  public font: { size: number, family: string }

  constructor(text: string = "") {
    this.text = text;
    this.position = { x: 0, y: 0 };
    this.color = "#FFFFFF";
    this.font = { size: 12, family: "Arial" };
  }

  public render(canvas: Canvas, ctx: CanvasRenderingContext2D): Canvas {
    if (!ctx) ctx = canvas.getContext("2d");
    const fillStyle = ctx.fillStyle;
    ctx.fillStyle = this.color;
    ctx.font = `${this.font.size}px ${this.font.family}`;
    ctx.fillText(this.text, this.position.x, this.position.y);
    ctx.fillStyle = fillStyle;
    return canvas;
  }
}

export default Text2D;