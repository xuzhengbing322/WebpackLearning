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

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/Calculator */ \"./src/modules/Calculator.js\");\n\n(doc => {\n  const oCalculator = document.getElementsByClassName('J_calculator')[0];\n  const init = () => {\n    // 将oCalculator作为参数传递给Calculator构造函数的构造器\n    new _modules_Calculator__WEBPACK_IMPORTED_MODULE_0__.Calculator(oCalculator).init();\n  };\n  init();\n})(document);\n\n//# sourceURL=webpack://wp_learning/./src/js/index.js?");

/***/ }),

/***/ "./src/lib/js/compute.js":
/*!*******************************!*\
  !*** ./src/lib/js/compute.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Compute)\n/* harmony export */ });\n// 类的写法\nclass Compute {\n  plus(a, b) {\n    return a + b;\n  }\n  minus(a, b) {\n    return a - b;\n  }\n  mul(a, b) {\n    return a * b;\n  }\n  div(a, b) {\n    return a / b;\n  }\n}\n\n// 装饰器。target：谁用这个装饰器，target就是谁\n// export default (target) => {\n//     // 在原型上添加方法，因此this实例对象可以访问这些方法。\n//     target.prototype.plus = function(a, b) {\n//         return a + b;\n//     }\n//     target.prototype.minus = function(a, b) {\n//         return a - b\n//     };\n//     target.prototype.mul = function(a, b) {\n//         return a * b\n//     };\n//     target.prototype.div = function(a, b) {\n//         return a / b\n//     }\n// }\n\n//# sourceURL=webpack://wp_learning/./src/lib/js/compute.js?");

/***/ }),

/***/ "./src/modules/Calculator.js":
/*!***********************************!*\
  !*** ./src/modules/Calculator.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Calculator\": () => (/* binding */ Calculator)\n/* harmony export */ });\n/* harmony import */ var _lib_js_compute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/js/compute */ \"./src/lib/js/compute.js\");\n/* harmony import */ var _utils_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/tools */ \"./src/utils/tools.js\");\n\n\n\n/*\n实例对象获取节点。\njavascript只能继承一个父类，因此把计算工具作为父类就有些牵强。因此，使用装饰器。\n*/\n// @compute\nclass Calculator extends _lib_js_compute__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  // constructor构造器的参数就是实例化构造函数时传的参数\n  constructor(el) {\n    // 继承构造函数，就要继承它的构造器\n    super();\n    this.name = 'Calculator';\n    this.oResult = el.getElementsByClassName('result')[0];\n    this.oInputs = el.getElementsByClassName('num-input');\n    this.oBtnGroup = el.getElementsByClassName('button-group')[0];\n  }\n\n  // 初始化类的函数\n  init() {\n    // 执行事件处理函数，让事件绑定函数生效\n    this.bindEvent();\n  }\n  // 事件处理\n  bindEvent() {\n    /*将点击事件添加到this实例对象中，然而事件处理函数addEventLister()总是绑定被事件处理的元素，\n    即oBtnGroup。因此需要使用bind()改变this的指向。\n    */\n    this.oBtnGroup.addEventListener('click', this.onBtnClick.bind(this), false);\n  }\n  onBtnClick(ev) {\n    const e = ev || window.event,\n      tar = e.target || e.srcElement,\n      tagName = tar.tagName.toLowerCase();\n    if (tagName === 'button') {\n      const method = tar.getAttribute('data-method'),\n        fVal = (0,_utils_tools__WEBPACK_IMPORTED_MODULE_1__.digitalize)((0,_utils_tools__WEBPACK_IMPORTED_MODULE_1__.trimSpace)(this.oInputs[0].value)),\n        sVal = (0,_utils_tools__WEBPACK_IMPORTED_MODULE_1__.digitalize)((0,_utils_tools__WEBPACK_IMPORTED_MODULE_1__.trimSpace)(this.oInputs[1].value));\n\n      //Calculator继承了Compute，所以this可以访问Compute中的方法 \n      this.setResult(method, fVal, sVal);\n    }\n    ;\n  }\n  setResult(method, fVal, sVal) {\n    this.oResult.innerText = this[method](fVal, sVal);\n  }\n}\n;\n\n\n//# sourceURL=webpack://wp_learning/./src/modules/Calculator.js?");

/***/ }),

/***/ "./src/utils/tools.js":
/*!****************************!*\
  !*** ./src/utils/tools.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"digitalize\": () => (/* binding */ digitalize),\n/* harmony export */   \"trimSpace\": () => (/* binding */ trimSpace)\n/* harmony export */ });\nfunction trimSpace(str) {\n  return str.replace(/s+/g, '');\n}\nfunction digitalize(str) {\n  return Number(str) || 0;\n}\n\n\n//# sourceURL=webpack://wp_learning/./src/utils/tools.js?");

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
/******/ 			// no module.id needed
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;