const createTexture = (gl: WebGL2RenderingContext, imageDataURL: string) => {
  const img = new Image();

  img.addEventListener("load", () => {
    const initTexture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, initTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);

    //グローバルで定義するべきか？
    // texture = texture;
  });

  img.src = imageDataURL;
};
