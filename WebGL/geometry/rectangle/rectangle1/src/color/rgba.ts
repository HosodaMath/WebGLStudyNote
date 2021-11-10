export class RGBA {
  private red: number;
  private green: number;
  private blue: number;
  private alpha: number;

  /**
   *
   * @param red
   * @param green
   * @param blue
   * @param alpha
   */
  constructor(red: number, green: number, blue: number, alpha: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }

  /**
   *
   * @returns
   */
  rgbaArray = (): number[] => {
    return [this.red, this.green, this.blue, this.alpha];
  };

  /**
   *
   * @returns
   */
  normalizeColor = (): number[] => {
    const color = this.rgbaArray();
    return color.map((color) => color / 255);
  };

  /**
   *
   * @returns
   */
  deNormalizeColor = (): number[] => {
    const color = this.rgbaArray();
    return color.map((color) => color * 255);
  };
}
