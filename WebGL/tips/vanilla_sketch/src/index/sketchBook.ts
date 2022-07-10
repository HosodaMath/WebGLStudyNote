import { sketchData } from "../data/sketchData";
/**
 * @description スケッチブック棚の作成とスケッチBookを入れていく
 * @param main
 */
export const createSketchBook = (main: HTMLElement) => {
  const sketchShelf = document.createElement("section");
  sketchShelf.className = "wrapper";

  const projectTitle = document.createElement("h2");
  projectTitle.className = "projectTitle";
  projectTitle.textContent = "Directional Light";

  const sketchGrid = document.createElement("div");
  sketchGrid.className = "sketchGrid";

  main.appendChild(sketchShelf);
  sketchShelf.appendChild(projectTitle);
  sketchShelf.appendChild(sketchGrid);

  const sketchItemMax = sketchData.length;
  [...Array(sketchItemMax).keys()].forEach((sketchIter) => {
    const sketch = sketchData[sketchIter];

    const sketchItem = document.createElement("div");
    sketchItem.className = "sketchItem";

    const sketchTitle = document.createElement("h3");
    sketchTitle.textContent = sketch.sketchTitle;

    const sketchLink = document.createElement("a");
    sketchLink.href = sketch.sketchLink;

    const sketchImage = document.createElement("img");
    sketchImage.className = "sketchImg";
    sketchImage.src = sketch.sketchSrc;
    sketchImage.alt = sketch.sketchTitle;

    const sketchDescription = document.createElement("p");
    sketchDescription.className = "itemDescription";
    sketchDescription.textContent = sketch.sketchDescription;

    sketchGrid.appendChild(sketchItem);
    sketchItem.appendChild(sketchTitle);
    sketchItem.appendChild(sketchLink);
    sketchLink.appendChild(sketchImage);
    sketchItem.appendChild(sketchDescription);
  });
};
