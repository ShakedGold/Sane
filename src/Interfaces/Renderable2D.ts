import { Canvas, CanvasRenderingContext2D } from "canvas";

interface Renderable2D {
  /**
   * Renders the object to the canvas.
   * @param canvas 
   * @param ctx 
   * @returns The canvas with the object rendered on it.
   */
  render(canvas: Canvas, ctx?: CanvasRenderingContext2D): Canvas;
}

export default Renderable2D;