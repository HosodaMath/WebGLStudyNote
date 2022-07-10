import { createMessage } from "./message";
import { createSketchBook } from "./sketchBook";

const createHeader = (mainBody: HTMLElement) => {
  const header = document.createElement("header");
  header.classList.add(...["wrapper"]);
  
  const h1 = document.createElement("h1");
  h1.textContent = "Sketch WebGL";

  mainBody.appendChild(header);
  header.appendChild(h1);

}

const main = () => {
  const mainBody = document.body;
  
  createHeader(mainBody);
  createMessage(mainBody);
  createSketchBook(mainBody);
};

window.addEventListener("load", main);
