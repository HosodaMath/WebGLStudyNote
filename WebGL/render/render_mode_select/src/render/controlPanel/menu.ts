import { createControlPanel } from "../../component/controller/createControlPanel";
import { createMenu } from "../../component/controller/createMenu";
import { RenderControlPanelProps } from "../../parameter/parameter";
/**
 * @todo ControlPanelとMenuを別にする
 * Menuは描画全体に影響を与えるがControlPanelは部分的にしか影響を与えない
 * @param renderProps
 */
export const renderMenu = (renderProps: RenderControlPanelProps) => {
  const controlPanel = createControlPanel({ classList: "controlPanelSection" });

  const menu = createMenu({
    classList: "menu",
    optionName: ["TRIANGLES", "LINES", "POINTS"],
  });

  renderProps.mainBody.appendChild(controlPanel);
  controlPanel.appendChild(menu);

  return menu;
};
