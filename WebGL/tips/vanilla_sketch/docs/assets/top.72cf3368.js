import"./modulepreload-polyfill.b7f2da20.js";/* empty css               */const p=s=>{const e=document.createElement("section");e.className="sketchContents wrapper";const t=document.createElement("h2");t.textContent="Lighting Sketch",t.className="pageTitle";const i=document.createElement("div");i.className="contentsMessage";const a=document.createElement("h3");a.textContent="Message";const o=document.createElement("p"),n=`
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
  molestias omnis totam. Accusantium assumenda consequuntur cumque,
  doloribus eos excepturi exercitationem facilis fugiat, molestias
  necessitatibus non praesentium quae repellendus tempora ullam
  `;o.textContent=n;const c=document.createElement("p"),u=`
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
  molestias omnis totam. Accusantium assumenda consequuntur cumque,
  doloribus eos excepturi exercitationem facilis fugiat, molestias
  necessitatibus non praesentium quae repellendus tempora ullam
  `;c.textContent=u,s.appendChild(e),e.appendChild(t),e.appendChild(i),i.appendChild(a),i.appendChild(o),i.appendChild(c)};var d="./assets/sketch0.8b88ecc4.png",k="./assets/directionalLight1.0bbc1e3e.png";const h=[{sketchID:1,sketchTitle:"DirectionalLight Light Sketch1",sketchLink:"./pages/directionalLight1/directionalLight1.html",sketchSrc:k,sketchDescription:"\u5E73\u884C\u5149\u6E90\u306E\u57FA\u672C1\u3067\u3059\u3002\u30DE\u30C6\u30EA\u30A2\u30EB\u306F\u6CD5\u7DDA\u30D9\u30AF\u30C8\u30EB\u306B\u6CBF\u3063\u3066\u5272\u308A\u5F53\u3066\u3089\u308C\u3066\u3044\u307E\u3059\u3002"},{sketchID:2,sketchTitle:"SketchTitle",sketchLink:"./pages/directionalLight2/directionalLight2.html",sketchSrc:d,sketchDescription:` Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Enimmolestias omnis totam. Accusantium assumenda consequuntur
    cumque, doloribus eos excepturi exercitationem facilis fugiat,
    molestias necessitatibus non praesentium quae repellendus tempora
    ullam!`},{sketchID:3,sketchTitle:"SketchTitle",sketchLink:"./pages/directionalLight3/directionalLight3.html",sketchSrc:d,sketchDescription:` Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Enimmolestias omnis totam. Accusantium assumenda consequuntur
    cumque, doloribus eos excepturi exercitationem facilis fugiat,
    molestias necessitatibus non praesentium quae repellendus tempora
    ullam!`},{sketchID:4,sketchTitle:"SketchTitle",sketchLink:"./pages/directionalLight4/directionalLight4.html",sketchSrc:d,sketchDescription:` Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Enimmolestias omnis totam. Accusantium assumenda consequuntur
    cumque, doloribus eos excepturi exercitationem facilis fugiat,
    molestias necessitatibus non praesentium quae repellendus tempora
    ullam!`}],g=s=>{const e=document.createElement("section");e.className="wrapper";const t=document.createElement("h2");t.className="projectTitle",t.textContent="Directinal Light";const i=document.createElement("div");i.className="sketchGrid",s.appendChild(e),e.appendChild(t),e.appendChild(i);const a=h.length;[...Array(a).keys()].forEach(o=>{const n=h[o],c=document.createElement("div");c.className="sketchItem";const u=document.createElement("h3");u.textContent=n.sketchTitle;const l=document.createElement("a");l.href=n.sketchLink;const m=document.createElement("img");m.className="sketchImg",m.src=n.sketchSrc,m.alt=n.sketchTitle;const r=document.createElement("p");r.className="itemDescription",r.textContent=n.sketchDescription,i.appendChild(c),c.appendChild(u),c.appendChild(l),l.appendChild(m),c.appendChild(r)})},C=s=>{const e=document.createElement("header");e.classList.add("wrapper");const t=document.createElement("h1");t.textContent="Sketch WebGL",s.appendChild(e),e.appendChild(t)},E=()=>{const s=document.body;C(s),p(s),g(s)};window.addEventListener("load",E);
