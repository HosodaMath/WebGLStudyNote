import { sketch1 } from "./sketch1/sketch1"
const main = () => {
  const mainBody = document.body;
  sketch1(mainBody);
}

window.addEventListener("load", main);