import { ControlPanelProps } from "../../parameter/parameter";
/**
 * @description ControlPanelSectionの作成
 * @param controlPanelProps 
 * @returns sectionTag
 */
export const createControlPanel = (controlPanelProps: ControlPanelProps) => {
  const controlPanel = document.createElement("section");
  controlPanel.classList.add(controlPanelProps.classList);

  return controlPanel;
};
