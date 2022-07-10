import SketchItem from "../assets/sketch0.png";
import DirectionalLightImage1 from "../assets/directionalLight1.png";
import DirectionalLightImage2 from "../assets/directionalLight2.png";
import DirectionalLightImage3 from "../assets/directionalLight3.png";
import DirectionalLightImage4 from "../assets/directionalLight4.png";
import DirectionalLightImage5 from "../assets/directionalLight5.png";
import DirectionalLightImage6 from "../assets/directionalLight6.png";
export type SketchType = {
  sketchID: number;
  sketchTitle: string;
  sketchLink: string;
  sketchSrc: string;
  sketchDescription: string;
};

export const sketchData: SketchType[] = [
  {
    sketchID: 1,
    sketchTitle: "Directional Light Sketch1",
    sketchLink: "./pages/directionalLight1/directionalLight1.html",
    sketchSrc: DirectionalLightImage1,
    sketchDescription: `This is the basic 1 of the directional light source. The size of the sphere is doubled in SCALE. The material is assigned along the normal vector.`,
  },
  {
    sketchID: 2,
    sketchTitle: "Directional Light Sketch2",
    sketchLink: "./pages/directionalLight2/directionalLight2.html",
    sketchSrc: DirectionalLightImage2,
    sketchDescription: `Directional Light Source Basics 2. In addition to Directional Light Source Basics 1, a function to adjust the direction of the directional light source has been added.`,
  },
  {
    sketchID: 3,
    sketchTitle: "Directional Light Sketch3",
    sketchLink: "./pages/directionalLight3/directionalLight3.html",
    sketchSrc: DirectionalLightImage3,
    sketchDescription: `Directional Light Source Basics 3. Same as Directional Light Source Basics 2, but rendered in points.`,
  },
  {
    sketchID: 4,
    sketchTitle: "Directional Light Sketch4",
    sketchLink: "./pages/directionalLight4/directionalLight4.html",
    sketchSrc: DirectionalLightImage4,
    sketchDescription: `This is Basic 4 for directional light sources. The material is the same as Directional Light Source Basics 2, but instead of following the normal vector, a self-made material called a Water material is assigned.The Water material can be adjusted in frequency and amplitude using the mouse.`,
  },
  {
    sketchID: 5,
    sketchTitle: "Directional Light Sketch5",
    sketchLink: "./pages/directionalLight5/directionalLight5.html",
    sketchSrc: DirectionalLightImage5,
    sketchDescription: `This is Basic 5 for directional light sources. Same as Directional Light Source Basics 4, but the number and amplitude of oscillations can be adjusted on the vertex shader side (vertex oscillation only) using the mouse.`,
  },
  {
    sketchID: 6,
    sketchTitle: "Directional Light Sketch6",
    sketchLink: "./pages/directionalLight6/directionalLight6.html",
    sketchSrc: DirectionalLightImage6,
    sketchDescription: `This is Application 1 of Directional Light Source. Same as Directional Light Source Basic 5, but uses TRIANGLES and POINTS to double-render spheres of different sizes.`,
  },
];
