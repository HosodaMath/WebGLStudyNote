import { StrictMode } from "react";
import { render } from "react-dom";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import "sanitize.css";

render(
  <StrictMode>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
