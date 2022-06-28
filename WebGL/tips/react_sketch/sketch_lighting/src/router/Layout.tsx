import { Outlet } from "react-router-dom";
import { createFullScreen } from "../window/window";

export const Layout = () => {
  createFullScreen(document.body);

  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};
