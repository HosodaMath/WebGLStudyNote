import * as THREE from "three";
/**
 * @description 雪を描画
 * @param color 
 * @param point_material 
 * @param scene 
 * @return color
 */
export const drawSnowFlake = (
  color: number[][],
  point_material: Array<THREE.PointsMaterial>,
  scene: THREE.Scene
) => {
  // point geometry
  const snowGeometry = new THREE.BufferGeometry();

  const vertices: Array<number> = [];

  const textureLoader = new THREE.TextureLoader();

  const sprite1 = textureLoader.load("texture/snowflake1.png");
  const sprite2 = textureLoader.load("texture/snowflake2.png");
  const sprite3 = textureLoader.load("texture/snowflake3.png");
  const sprite4 = textureLoader.load("texture/snowflake4.png");
  const sprite5 = textureLoader.load("texture/snowflake5.png");

  [...Array(10000).keys()].forEach((_count) => {
    const x = Math.random() * 2000 - 1000;
    const y = Math.abs(Math.random() * 2000 - 1000);
    const z = Math.random() * 2000 - 1000;

    vertices.push(x, y, z);
  });
  // console.log(vertices);
  snowGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const color_data = [
    [1.0, 0.2, 0.5],
    [0.95, 0.1, 0.5],
    [0.9, 0.05, 0.5],
    [0.85, 0.0, 0.5],
    [0.8, 0.0, 0.5],
  ];

  color = color_data;

  const sprite_data = [sprite2, sprite3, sprite1, sprite5, sprite4];
  const size_data = [20, 15, 10, 8, 5];
  if (
    color_data.length === sprite_data.length &&
    sprite_data.length === size_data.length
  ) {
    [...Array(color_data.length).keys()].forEach((count) => {
      const color = color_data[count];
      const sprite = sprite_data[count];
      const size = size_data[count];

      point_material[count] = new THREE.PointsMaterial({
        size: size,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      });
      // console.log(color);
      // console.log(color[0], color[1], color[2]);
      point_material[count].color.setHSL(color[0], color[1], color[2]);

      const snowParticle = new THREE.Points(
        snowGeometry,
        point_material[count]
      );

      snowParticle.rotation.x = Math.random() * 6;
      snowParticle.rotation.y = Math.random() * 6;
      snowParticle.rotation.z = Math.random() * 6;

      scene.add(snowParticle);
    });
  }

  return color;
};
