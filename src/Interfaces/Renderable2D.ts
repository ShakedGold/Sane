import { Canvas, CanvasRenderingContext2D } from "canvas";

interface Renderable2D {
  render(canvas: Canvas, ctx?: CanvasRenderingContext2D): Canvas;
}

export default Renderable2D;