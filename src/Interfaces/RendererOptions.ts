interface RendererOptions {
  /**
   * The width of the video in pixels.
   */
  width?: number;
  /**
   * The height of the video in pixels.
   */
  height?: number;
  /**
   * The name of the video file.
   */
  name?: string;
  /**
   * The duration of the video in seconds.
   */
  durationS?: number;
  /**
   * The frames per second of the video.
   */
  fps?: number;
  /**
   * If true, the renderer will remove the frames folder after rendering the video.
   */
  cleanup?: boolean;
}

export default RendererOptions;