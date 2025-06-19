declare module '../hooks/useParallax' {
  /**
   * Hook that returns the current scroll position (y-axis)
   * @returns The current scroll position in pixels
   */
  export function useParallax(): number;

  /**
   * Hook that returns a style object with a transform property for parallax effects
   * @param speed - The speed of the parallax effect (default: 0.5)
   * @returns A style object with transform property
   */
  export function useParallaxElement(speed?: number): { transform: string };
}
