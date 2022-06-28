import { Route, Routes } from "react-router-dom";
import { Layout } from "./router/Layout";
import { Home } from "./router/Home";
import { SketchDirectinalLighting1 } from "./sketch/sketch1/Sketch1";
import { SketchDirectinalLighting2 } from "./sketch/sketch2/Sketch2";
import { SketchDirectinalLighting3 } from "./sketch/sketch3/Sketch3";
import "./App.css";
export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Home></Home>}></Route>
          <Route
            path="directinalLighting1"
            element={<SketchDirectinalLighting1></SketchDirectinalLighting1>}
          ></Route>
          <Route
            path="directinalLighting2"
            element={<SketchDirectinalLighting2></SketchDirectinalLighting2>}
          ></Route>
          <Route
            path="directinalLighting3"
            element={<SketchDirectinalLighting3></SketchDirectinalLighting3>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};
