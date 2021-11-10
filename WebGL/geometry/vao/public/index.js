/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sanitize.css/sanitize.css":
/*!**************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sanitize.css/sanitize.css ***!
  \**************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/* Document\\n * ========================================================================== */\\n\\n/**\\n * 1. Add border box sizing in all browsers (opinionated).\\n * 2. Backgrounds do not repeat by default (opinionated).\\n */\\n\\n*,\\n::before,\\n::after {\\n  box-sizing: border-box; /* 1 */\\n  background-repeat: no-repeat; /* 2 */\\n}\\n\\n/**\\n * 1. Add text decoration inheritance in all browsers (opinionated).\\n * 2. Add vertical alignment inheritance in all browsers (opinionated).\\n */\\n\\n::before,\\n::after {\\n  text-decoration: inherit; /* 1 */\\n  vertical-align: inherit; /* 2 */\\n}\\n\\n/**\\n * 1. Use the default cursor in all browsers (opinionated).\\n * 2. Change the line height in all browsers (opinionated).\\n * 3. Breaks words to prevent overflow in all browsers (opinionated).\\n * 4. Use a 4-space tab width in all browsers (opinionated).\\n * 5. Remove the grey highlight on links in iOS (opinionated).\\n * 6. Prevent adjustments of font size after orientation changes in iOS.\\n */\\n\\n:where(:root) {\\n  cursor: default; /* 1 */\\n  line-height: 1.5; /* 2 */\\n  overflow-wrap: break-word; /* 3 */\\n  -moz-tab-size: 4; /* 4 */\\n  tab-size: 4; /* 4 */\\n  -webkit-tap-highlight-color: transparent; /* 5 */\\n  -webkit-text-size-adjust: 100%; /* 6 */\\n}\\n\\n/* Sections\\n * ========================================================================== */\\n\\n/**\\n * Remove the margin in all browsers (opinionated).\\n */\\n\\n:where(body) {\\n  margin: 0;\\n}\\n\\n/**\\n * Correct the font size and margin on `h1` elements within `section` and\\n * `article` contexts in Chrome, Edge, Firefox, and Safari.\\n */\\n\\n:where(h1) {\\n  font-size: 2em;\\n  margin: 0.67em 0;\\n}\\n\\n/* Grouping content\\n * ========================================================================== */\\n\\n/**\\n * Remove the margin on nested lists in Chrome, Edge, and Safari.\\n */\\n\\n:where(dl, ol, ul) :where(dl, ol, ul) {\\n  margin: 0;\\n}\\n\\n/**\\n * 1. Correct the inheritance of border color in Firefox.\\n * 2. Add the correct box sizing in Firefox.\\n */\\n\\n:where(hr) {\\n  color: inherit; /* 1 */\\n  height: 0; /* 2 */\\n}\\n\\n/**\\n * Remove the list style on navigation lists in all browsers (opinionated).\\n */\\n\\n:where(nav) :where(ol, ul) {\\n  list-style-type: none;\\n  padding: 0;\\n}\\n\\n/**\\n * Prevent VoiceOver from ignoring list semantics in Safari (opinionated).\\n */\\n\\n:where(nav li)::before {\\n  content: \\\"\\\\200B\\\";\\n  float: left;\\n}\\n\\n/**\\n * 1. Correct the inheritance and scaling of font size in all browsers.\\n * 2. Correct the odd `em` font sizing in all browsers.\\n * 3. Prevent overflow of the container in all browsers (opinionated).\\n */\\n\\n:where(pre) {\\n  font-family: monospace, monospace; /* 1 */\\n  font-size: 1em; /* 2 */\\n  overflow: auto; /* 3 */\\n}\\n\\n/* Text-level semantics\\n * ========================================================================== */\\n\\n/**\\n * Add the correct text decoration in Safari.\\n */\\n\\n:where(abbr[title]) {\\n  text-decoration: underline;\\n  text-decoration: underline dotted;\\n}\\n\\n/**\\n * Add the correct font weight in Chrome, Edge, and Safari.\\n */\\n\\n:where(b, strong) {\\n  font-weight: bolder;\\n}\\n\\n/**\\n * 1. Correct the inheritance and scaling of font size in all browsers.\\n * 2. Correct the odd `em` font sizing in all browsers.\\n */\\n\\n:where(code, kbd, samp) {\\n  font-family: monospace, monospace; /* 1 */\\n  font-size: 1em; /* 2 */\\n}\\n\\n/**\\n * Add the correct font size in all browsers.\\n */\\n\\n:where(small) {\\n  font-size: 80%;\\n}\\n\\n/* Embedded content\\n * ========================================================================== */\\n\\n/*\\n * Change the alignment on media elements in all browsers (opinionated).\\n */\\n\\n:where(audio, canvas, iframe, img, svg, video) {\\n  vertical-align: middle;\\n}\\n\\n/**\\n * Remove the border on iframes in all browsers (opinionated).\\n */\\n\\n:where(iframe) {\\n  border-style: none;\\n}\\n\\n/**\\n * Change the fill color to match the text color in all browsers (opinionated).\\n */\\n\\n:where(svg:not([fill])) {\\n  fill: currentColor;\\n}\\n\\n/* Tabular data\\n * ========================================================================== */\\n\\n/**\\n * 1. Collapse border spacing in all browsers (opinionated).\\n * 2. Correct table border color inheritance in all Chrome, Edge, and Safari.\\n * 3. Remove text indentation from table contents in Chrome, Edge, and Safari.\\n */\\n\\n:where(table) {\\n  border-collapse: collapse; /* 1 */\\n  border-color: inherit; /* 2 */\\n  text-indent: 0; /* 3 */\\n}\\n\\n/* Forms\\n * ========================================================================== */\\n\\n/**\\n * Remove the margin on controls in Safari.\\n */\\n\\n:where(button, input, select) {\\n  margin: 0;\\n}\\n\\n/**\\n * Correct the inability to style buttons in iOS and Safari.\\n */\\n\\n:where(button, [type=\\\"button\\\" i], [type=\\\"reset\\\" i], [type=\\\"submit\\\" i]) {\\n  -webkit-appearance: button;\\n}\\n\\n/**\\n * Change the inconsistent appearance in all browsers (opinionated).\\n */\\n\\n:where(fieldset) {\\n  border: 1px solid #a0a0a0;\\n}\\n\\n/**\\n * Add the correct vertical alignment in Chrome, Edge, and Firefox.\\n */\\n\\n:where(progress) {\\n  vertical-align: baseline;\\n}\\n\\n/**\\n * 1. Remove the margin in Firefox and Safari.\\n * 3. Change the resize direction in all browsers (opinionated).\\n */\\n\\n:where(textarea) {\\n  margin: 0; /* 1 */\\n  resize: vertical; /* 3 */\\n}\\n\\n/**\\n * 1. Correct the odd appearance in Chrome, Edge, and Safari.\\n * 2. Correct the outline style in Safari.\\n */\\n\\n:where([type=\\\"search\\\" i]) {\\n  -webkit-appearance: textfield; /* 1 */\\n  outline-offset: -2px; /* 2 */\\n}\\n\\n/**\\n * Correct the cursor style of increment and decrement buttons in Safari.\\n */\\n\\n::-webkit-inner-spin-button,\\n::-webkit-outer-spin-button {\\n  height: auto;\\n}\\n\\n/**\\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\\n */\\n\\n::-webkit-input-placeholder {\\n  color: inherit;\\n  opacity: 0.54;\\n}\\n\\n/**\\n * Remove the inner padding in Chrome, Edge, and Safari on macOS.\\n */\\n\\n::-webkit-search-decoration {\\n  -webkit-appearance: none;\\n}\\n\\n/**\\n * 1. Correct the inability to style upload buttons in iOS and Safari.\\n * 2. Change font properties to `inherit` in Safari.\\n */\\n\\n::-webkit-file-upload-button {\\n  -webkit-appearance: button; /* 1 */\\n  font: inherit; /* 2 */\\n}\\n\\n/* Interactive\\n * ========================================================================== */\\n\\n/*\\n * Add the correct styles in Safari.\\n */\\n\\n:where(dialog) {\\n  background-color: white;\\n  border: solid;\\n  color: black;\\n  height: -moz-fit-content;\\n  height: fit-content;\\n  left: 0;\\n  margin: auto;\\n  padding: 1em;\\n  position: absolute;\\n  right: 0;\\n  width: -moz-fit-content;\\n  width: fit-content;\\n}\\n\\n:where(dialog:not([open])) {\\n  display: none;\\n}\\n\\n/*\\n * Add the correct display in Safari.\\n */\\n\\n:where(details > summary:first-of-type) {\\n  display: list-item;\\n}\\n\\n/* Accessibility\\n * ========================================================================== */\\n\\n/**\\n * Change the cursor on busy elements in all browsers (opinionated).\\n */\\n\\n:where([aria-busy=\\\"true\\\" i]) {\\n  cursor: progress;\\n}\\n\\n/*\\n * Change the cursor on control elements in all browsers (opinionated).\\n */\\n\\n:where([aria-controls]) {\\n  cursor: pointer;\\n}\\n\\n/*\\n * Change the cursor on disabled, not-editable, or otherwise\\n * inoperable elements in all browsers (opinionated).\\n */\\n\\n:where([aria-disabled=\\\"true\\\" i], [disabled]) {\\n  cursor: not-allowed;\\n}\\n\\n/*\\n * Change the display on visually hidden accessible elements\\n * in all browsers (opinionated).\\n */\\n\\n:where([aria-hidden=\\\"false\\\" i][hidden]) {\\n  display: initial;\\n}\\n\\n:where([aria-hidden=\\\"false\\\" i][hidden]:not(:focus)) {\\n  clip: rect(0, 0, 0, 0);\\n  position: absolute;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://vao/./node_modules/sanitize.css/sanitize.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/main.css":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/main.css ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"@charset \\\"UTF-8\\\";\\r\\nbody {\\r\\n  background-color: #ffffff;\\r\\n}\\r\\n\\r\\ncanvas {\\r\\n  position: absolute;\\r\\n  top: 0px;\\r\\n  left: 0px;\\r\\n  z-index: -1;\\r\\n  /*\\r\\n  width: 100vw;\\r\\n  height: 100vh;*/\\r\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://vao/./src/main.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var _i = 0; _i < this.length; _i++) {\n        var id = this[_i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i2 = 0; _i2 < modules.length; _i2++) {\n      var item = [].concat(modules[_i2]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://vao/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://vao/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/shader/geometry/rect/rect1.frag":
/*!*********************************************!*\
  !*** ./src/shader/geometry/rect/rect1.frag ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"#version 300 es\\r\\nprecision highp float;\\r\\nprecision highp int;\\r\\n\\r\\nout vec4 fragColor;\\r\\n\\r\\nvoid main(void){\\r\\n  fragColor = vec4(1.0, 1.0, 0.0, 1.0);\\r\\n}\");\n\n//# sourceURL=webpack://vao/./src/shader/geometry/rect/rect1.frag?");

/***/ }),

/***/ "./src/shader/geometry/rect/rect1.vert":
/*!*********************************************!*\
  !*** ./src/shader/geometry/rect/rect1.vert ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"#version 300 es\\r\\nprecision highp float;\\r\\nprecision highp int;\\r\\n\\r\\nin vec3 aVertexPosition;\\r\\nvoid main(void){\\r\\n\\r\\n  gl_Position = vec4(aVertexPosition, 1.0);\\r\\n}\\r\\n\");\n\n//# sourceURL=webpack://vao/./src/shader/geometry/rect/rect1.vert?");

/***/ }),

/***/ "./node_modules/sanitize.css/sanitize.css":
/*!************************************************!*\
  !*** ./node_modules/sanitize.css/sanitize.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _css_loader_dist_cjs_js_sanitize_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../css-loader/dist/cjs.js!./sanitize.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sanitize.css/sanitize.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_sanitize_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_sanitize_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _css_loader_dist_cjs_js_sanitize_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _css_loader_dist_cjs_js_sanitize_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://vao/./node_modules/sanitize.css/sanitize.css?");

/***/ }),

/***/ "./src/main.css":
/*!**********************!*\
  !*** ./src/main.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./main.css */ \"./node_modules/css-loader/dist/cjs.js!./src/main.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://vao/./src/main.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://vao/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://vao/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://vao/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://vao/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://vao/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://vao/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/color/rgba.ts":
/*!***************************!*\
  !*** ./src/color/rgba.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RGBA\": () => (/* binding */ RGBA)\n/* harmony export */ });\nclass RGBA {\r\n    red;\r\n    green;\r\n    blue;\r\n    alpha;\r\n    /**\r\n     *\r\n     * @param red\r\n     * @param green\r\n     * @param blue\r\n     * @param alpha\r\n     */\r\n    constructor(red, green, blue, alpha) {\r\n        this.red = red;\r\n        this.green = green;\r\n        this.blue = blue;\r\n        this.alpha = alpha;\r\n    }\r\n    /**\r\n     *\r\n     * @returns\r\n     */\r\n    rgbaArray = () => {\r\n        return [this.red, this.green, this.blue, this.alpha];\r\n    };\r\n    /**\r\n     *\r\n     * @returns\r\n     */\r\n    normalizeColor = () => {\r\n        const color = this.rgbaArray();\r\n        return color.map((color) => color / 255);\r\n    };\r\n    /**\r\n     *\r\n     * @returns\r\n     */\r\n    deNormalizeColor = () => {\r\n        const color = this.rgbaArray();\r\n        return color.map((color) => color * 255);\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack://vao/./src/color/rgba.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils */ \"./src/utils/utils.ts\");\n/* harmony import */ var _webgl_gl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webgl/gl */ \"./src/webgl/gl.ts\");\n/* harmony import */ var _color_rgba__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color/rgba */ \"./src/color/rgba.ts\");\n/* harmony import */ var _shader_geometry_rect_rect1_vert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shader/geometry/rect/rect1.vert */ \"./src/shader/geometry/rect/rect1.vert\");\n/* harmony import */ var _shader_geometry_rect_rect1_frag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shader/geometry/rect/rect1.frag */ \"./src/shader/geometry/rect/rect1.frag\");\n/* harmony import */ var sanitize_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sanitize.css */ \"./node_modules/sanitize.css/sanitize.css\");\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./main.css */ \"./src/main.css\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nwindow.addEventListener(\"DOMContentLoaded\", () => {\r\n    let gl;\r\n    let width;\r\n    let height;\r\n    /**\r\n     *\r\n     * @param gl\r\n     * @param color\r\n     */\r\n    const updateClearColor = (gl, color) => {\r\n        gl.clearColor(color[0], color[1], color[2], color[3]);\r\n        gl.clear(gl.COLOR_BUFFER_BIT);\r\n        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);\r\n    };\r\n    const init = () => {\r\n        const canvas = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.getCanvas)();\r\n        width = canvas.width = window.innerWidth;\r\n        height = canvas.height = window.innerHeight;\r\n        gl = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.geGLContext2D)(canvas);\r\n        const windowResize = () => {\r\n            width = window.innerWidth;\r\n            height = window.innerHeight;\r\n        };\r\n        window.addEventListener(\"resize\", windowResize);\r\n    };\r\n    const draw = () => {\r\n        const rgbaColor = new _color_rgba__WEBPACK_IMPORTED_MODULE_2__.RGBA(0, 0, 0, 1);\r\n        const color = rgbaColor.rgbaArray();\r\n        updateClearColor(gl, color);\r\n        const vertexShader = (0,_webgl_gl__WEBPACK_IMPORTED_MODULE_1__.initShader)(gl, \"VERTEX_SHADER\", _shader_geometry_rect_rect1_vert__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\r\n        const fragmentShader = (0,_webgl_gl__WEBPACK_IMPORTED_MODULE_1__.initShader)(gl, \"FRAGMENT_SHADER\", _shader_geometry_rect_rect1_frag__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\r\n        const webglProgram = (0,_webgl_gl__WEBPACK_IMPORTED_MODULE_1__.initProgram)(gl, vertexShader, fragmentShader);\r\n        const vertices = [\r\n            -0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0,\r\n        ];\r\n        const indices = [0, 1, 2, 0, 2, 3];\r\n        const vao = (0,_webgl_gl__WEBPACK_IMPORTED_MODULE_1__.createVAO)(gl, webglProgram, vertices, indices);\r\n        gl.bindVertexArray(vao);\r\n        const mode = gl.TRIANGLES;\r\n        const count = indices.length;\r\n        const type = gl.UNSIGNED_SHORT;\r\n        const offset = 0;\r\n        gl.drawElements(mode, count, type, offset);\r\n        gl.bindVertexArray(null);\r\n    };\r\n    init();\r\n    draw();\r\n});\r\n\n\n//# sourceURL=webpack://vao/./src/main.ts?");

/***/ }),

/***/ "./src/utils/utils.ts":
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCanvas\": () => (/* binding */ getCanvas),\n/* harmony export */   \"geGLContext2D\": () => (/* binding */ geGLContext2D)\n/* harmony export */ });\n/**\r\n *\r\n * @returns\r\n */\r\nconst getCanvas = () => {\r\n    const canvas = document.querySelector(\".canvas\");\r\n    if (!(canvas instanceof HTMLCanvasElement)) {\r\n        throw new Error(\"Error!! HTML5 Canvas was found on this page \");\r\n    }\r\n    return canvas;\r\n};\r\n/**\r\n *\r\n * @param canvas\r\n * @returns\r\n */\r\nconst geGLContext2D = (canvas) => {\r\n    const gl = canvas.getContext(\"webgl2\");\r\n    if (!gl) {\r\n        throw new Error(\"Error!! WebGL2 not supported\");\r\n    }\r\n    return gl;\r\n};\r\n\n\n//# sourceURL=webpack://vao/./src/utils/utils.ts?");

/***/ }),

/***/ "./src/webgl/gl.ts":
/*!*************************!*\
  !*** ./src/webgl/gl.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createVBO\": () => (/* reexport safe */ _vbo__WEBPACK_IMPORTED_MODULE_0__.createVBO),\n/* harmony export */   \"createIBO\": () => (/* reexport safe */ _ibo__WEBPACK_IMPORTED_MODULE_1__.createIBO),\n/* harmony export */   \"createVAO\": () => (/* reexport safe */ _vao__WEBPACK_IMPORTED_MODULE_2__.createVAO),\n/* harmony export */   \"initShader\": () => (/* reexport safe */ _shader__WEBPACK_IMPORTED_MODULE_3__.initShader),\n/* harmony export */   \"initProgram\": () => (/* reexport safe */ _program__WEBPACK_IMPORTED_MODULE_4__.initProgram)\n/* harmony export */ });\n/* harmony import */ var _vbo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vbo */ \"./src/webgl/vbo.ts\");\n/* harmony import */ var _ibo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ibo */ \"./src/webgl/ibo.ts\");\n/* harmony import */ var _vao__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vao */ \"./src/webgl/vao.ts\");\n/* harmony import */ var _shader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shader */ \"./src/webgl/shader.ts\");\n/* harmony import */ var _program__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./program */ \"./src/webgl/program.ts\");\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://vao/./src/webgl/gl.ts?");

/***/ }),

/***/ "./src/webgl/ibo.ts":
/*!**************************!*\
  !*** ./src/webgl/ibo.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createIBO\": () => (/* binding */ createIBO)\n/* harmony export */ });\n/**\r\n *\r\n * @param gl\r\n * @param indices\r\n * @returns\r\n */\r\nconst createIBO = (gl, indices) => {\r\n    const ibo = gl.createBuffer();\r\n    if (!ibo) {\r\n        throw new Error(\"iboの作成に失敗しました\");\r\n    }\r\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);\r\n    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);\r\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);\r\n    return ibo;\r\n};\r\n\n\n//# sourceURL=webpack://vao/./src/webgl/ibo.ts?");

/***/ }),

/***/ "./src/webgl/program.ts":
/*!******************************!*\
  !*** ./src/webgl/program.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initProgram\": () => (/* binding */ initProgram)\n/* harmony export */ });\n/**\r\n *\r\n * @param gl\r\n * @param vertexShader\r\n * @param fragmentShader\r\n * @returns\r\n */\r\nconst initProgram = (gl, vertexShader, fragmentShader) => {\r\n    const program = gl.createProgram();\r\n    if (!program) {\r\n        throw new Error(\"プログラムの作成に失敗しました。\");\r\n    }\r\n    gl.attachShader(program, vertexShader);\r\n    gl.attachShader(program, fragmentShader);\r\n    gl.linkProgram(program);\r\n    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\r\n        throw new Error(`シェーダーのリンクに失敗しました ${gl.getProgramInfoLog(program)}`);\r\n    }\r\n    gl.useProgram(program);\r\n    return program;\r\n};\r\n\n\n//# sourceURL=webpack://vao/./src/webgl/program.ts?");

/***/ }),

/***/ "./src/webgl/shader.ts":
/*!*****************************!*\
  !*** ./src/webgl/shader.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initShader\": () => (/* binding */ initShader)\n/* harmony export */ });\n/**\r\n *\r\n * @param gl\r\n * @param type\r\n * @param sorce\r\n * @returns\r\n */\r\nconst initShader = (gl, type, sorce) => {\r\n    const shader = gl.createShader(gl[type]);\r\n    if (!shader) {\r\n        throw new Error(\"WebGLShaderの作成に失敗しました\");\r\n    }\r\n    gl.shaderSource(shader, sorce);\r\n    gl.compileShader(shader);\r\n    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\r\n        throw new Error(`コンパイルエラーが発生しました${gl.getShaderInfoLog(shader)}`);\r\n    }\r\n    return shader;\r\n};\r\n\n\n//# sourceURL=webpack://vao/./src/webgl/shader.ts?");

/***/ }),

/***/ "./src/webgl/vao.ts":
/*!**************************!*\
  !*** ./src/webgl/vao.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createVAO\": () => (/* binding */ createVAO)\n/* harmony export */ });\n/**\r\n * @description VertexArrayObjectの作成\r\n * @param gl\r\n * @param program\r\n * @param vertices\r\n * @param indices\r\n * @returns\r\n */\r\nconst createVAO = (gl, program, vertices, indices) => {\r\n    // VertexArrayObjectの作成\r\n    const vao = gl.createVertexArray();\r\n    if (!vao) {\r\n        throw new Error(\"VertexArrayObjectの作成に失敗しました\");\r\n    }\r\n    gl.bindVertexArray(vao);\r\n    // vaoバッファの作成\r\n    const vaoBuffer = gl.createBuffer();\r\n    gl.bindBuffer(gl.ARRAY_BUFFER, vaoBuffer);\r\n    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);\r\n    const index = gl.getAttribLocation(program, \"aVertexPosition\");\r\n    const size = 3;\r\n    const type = gl.FLOAT;\r\n    const normalize = false;\r\n    const stride = 0;\r\n    const offset = 0;\r\n    gl.enableVertexAttribArray(index);\r\n    gl.vertexAttribPointer(index, size, type, normalize, stride, offset);\r\n    // iboの作成\r\n    const ibo = gl.createBuffer();\r\n    if (!ibo) {\r\n        throw new Error(\"iboの作成に失敗しました\");\r\n    }\r\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);\r\n    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);\r\n    // clean\r\n    gl.bindVertexArray(null);\r\n    gl.bindBuffer(gl.ARRAY_BUFFER, null);\r\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);\r\n    return vao;\r\n};\r\n\n\n//# sourceURL=webpack://vao/./src/webgl/vao.ts?");

/***/ }),

/***/ "./src/webgl/vbo.ts":
/*!**************************!*\
  !*** ./src/webgl/vbo.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createVBO\": () => (/* binding */ createVBO)\n/* harmony export */ });\n/**\r\n *\r\n * @param gl\r\n * @param vertices\r\n * @returns\r\n */\r\nconst createVBO = (gl, vertices) => {\r\n    const vbo = gl.createBuffer();\r\n    if (!vbo) {\r\n        throw new Error(\"バッファの作成に失敗しました\");\r\n    }\r\n    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);\r\n    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);\r\n    gl.bindBuffer(gl.ARRAY_BUFFER, null);\r\n    return vbo;\r\n};\r\n\n\n//# sourceURL=webpack://vao/./src/webgl/vbo.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;