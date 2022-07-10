/**
 * @description 上部にあるメッセージBOXを作成
 * @param main
 */
export const createMessage = (main: HTMLElement) => {
  // 上部にあるメッセージBOXを作成
  const descriptionSection = document.createElement("section");
  descriptionSection.className = "sketchContents wrapper";

  // ページタイトル
  const pageTitle = document.createElement("h2");
  pageTitle.textContent = "Lighting Sketch";
  pageTitle.className = "pageTitle";

  // メッセージ本文の作成
  const contentsMessage = document.createElement("div");
  contentsMessage.className = "contentsMessage";

  // ここからcontentsMessageの子要素
  const contentsTitle = document.createElement("h3");
  contentsTitle.textContent = "Introduction.";

  // message1
  const contentsMessage1 = document.createElement("p");
  const message1 = `
  This site deals with the basics and applications of directional light sources using Web3D. The source code is licensed under the MIT License. HosodaMath owns the copyrights to all images (except favicons, etc.) and other materials.
  `;
  contentsMessage1.textContent = message1;

  // message2
  const contentsMessage2 = document.createElement("p");
  const message2 = `
  Note that since the objective is to learn the basics of directional light sources, prior knowledge of HTML, CSS, JavaScript, TypeScript, WebGL, and basic math is required.
  `;
  contentsMessage2.textContent = message2;
  // ここまでがcontentsMessageの子要素

  // 変数定義をもとに作成
  main.appendChild(descriptionSection);
  descriptionSection.appendChild(pageTitle);
  descriptionSection.appendChild(contentsMessage);
  contentsMessage.appendChild(contentsTitle);
  contentsMessage.appendChild(contentsMessage1);
  contentsMessage.appendChild(contentsMessage2);
};
