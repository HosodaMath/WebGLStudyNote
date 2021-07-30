class Mathematics {
  static random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  static degTorad = (degrees: number) => {
    return (degrees / 360) * (Math.PI * 2);
  };
}

export { Mathematics };
