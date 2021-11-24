export class RGB {
  private red: number;
  private green: number;
  private blue: number;
  /**
   *
   * @param red
   * @param green
   * @param blue
   */
  constructor(red: number, green: number, blue: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  /**
   *
   * @returns
   */
  rgbArray = (): number[] => {
    return [this.red, this.green, this.blue];
  };

  /**
   *
   * @returns
   */
  normalizeColor = (): number[] => {
    const color = this.rgbArray();
    return color.map((color) => color / 255);
  };

  /**
   * 
   * @returns 
   */
  deNormalizeColor = (): number[] => {
    const color = this.rgbArray();
    return color.map((color) => color * 255);
  };
}
