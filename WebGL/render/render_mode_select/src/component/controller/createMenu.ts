import { MenuProps } from "../../parameter/parameter";
export const createMenu = (menuProps: MenuProps) => {

  const menuClassName = menuProps.classList;
  const optionName = menuProps.optionName;

  const menu = document.createElement("select");
  menu.classList.add(menuClassName);

  optionName.map((value) => {
    const option = new Option(value, value);
    menu.add(option);
  })

  return menu;
}