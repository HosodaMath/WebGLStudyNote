class Mathematics {
  static random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };
}

export {Mathematics};
