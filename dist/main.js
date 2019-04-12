/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".main.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_Blob_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/Blob.js */ \"./src/js/Blob.js\");\n\n\nwindow.onload = (blarg) => {\n\tlet blob = 0\n\tfunction gotohash() {\n\t\tif(blob && blob.renderer) document.body.removeChild(blob.renderer.domElement) // HACK\n\t\tlet hash = window.location.hash.substr(1).replace('.js', '');\n\t\tif(!hash || !hash.length) return\n    console.log( hash, examples);\n    if (examples[hash] !== undefined) blob = new _js_Blob_js__WEBPACK_IMPORTED_MODULE_0__[\"Blob\"](examples[hash]);\n\t}\n\twindow.addEventListener(\"hashchange\", gotohash)\n\tgotohash()\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/js lazy recursive":
/*!**************************************!*\
  !*** ./src/js lazy namespace object ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(function() {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = function() { return []; };\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nmodule.exports = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/js lazy recursive\";\n\n//# sourceURL=webpack:///./src/js_lazy_namespace_object?");

/***/ }),

/***/ "./src/js lazy recursive ^\\.\\/.*$":
/*!***********************************************!*\
  !*** ./src/js lazy ^\.\/.*$ namespace object ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./BehaviorBounce\": [\n\t\t\"./src/js/BehaviorBounce.js\"\n\t],\n\t\"./BehaviorBounce.js\": [\n\t\t\"./src/js/BehaviorBounce.js\"\n\t],\n\t\"./BehaviorCollide\": [\n\t\t\"./src/js/BehaviorCollide.js\"\n\t],\n\t\"./BehaviorCollide.js\": [\n\t\t\"./src/js/BehaviorCollide.js\"\n\t],\n\t\"./BehaviorEmitter\": [\n\t\t\"./src/js/BehaviorEmitter.js\"\n\t],\n\t\"./BehaviorEmitter.js\": [\n\t\t\"./src/js/BehaviorEmitter.js\"\n\t],\n\t\"./BehaviorEvent\": [\n\t\t\"./src/js/BehaviorEvent.js\"\n\t],\n\t\"./BehaviorEvent.js\": [\n\t\t\"./src/js/BehaviorEvent.js\"\n\t],\n\t\"./BehaviorHand\": [\n\t\t\"./src/js/BehaviorHand.js\",\n\t\t0\n\t],\n\t\"./BehaviorHand.js\": [\n\t\t\"./src/js/BehaviorHand.js\",\n\t\t0\n\t],\n\t\"./BehaviorHeart\": [\n\t\t\"./src/js/BehaviorHeart.js\"\n\t],\n\t\"./BehaviorHeart.js\": [\n\t\t\"./src/js/BehaviorHeart.js\"\n\t],\n\t\"./BehaviorLight\": [\n\t\t\"./src/js/BehaviorLight.js\"\n\t],\n\t\"./BehaviorLight.js\": [\n\t\t\"./src/js/BehaviorLight.js\"\n\t],\n\t\"./BehaviorMesh\": [\n\t\t\"./src/js/BehaviorMesh.js\"\n\t],\n\t\"./BehaviorMesh.js\": [\n\t\t\"./src/js/BehaviorMesh.js\"\n\t],\n\t\"./BehaviorOrbit\": [\n\t\t\"./src/js/BehaviorOrbit.js\"\n\t],\n\t\"./BehaviorOrbit.js\": [\n\t\t\"./src/js/BehaviorOrbit.js\"\n\t],\n\t\"./BehaviorParticles\": [\n\t\t\"./src/js/BehaviorParticles.js\"\n\t],\n\t\"./BehaviorParticles.js\": [\n\t\t\"./src/js/BehaviorParticles.js\"\n\t],\n\t\"./BehaviorPhysics\": [\n\t\t\"./src/js/BehaviorPhysics.js\"\n\t],\n\t\"./BehaviorPhysics.js\": [\n\t\t\"./src/js/BehaviorPhysics.js\"\n\t],\n\t\"./BehaviorProton\": [\n\t\t\"./src/js/BehaviorProton.js\"\n\t],\n\t\"./BehaviorProton.js\": [\n\t\t\"./src/js/BehaviorProton.js\"\n\t],\n\t\"./BehaviorRenderer\": [\n\t\t\"./src/js/BehaviorRenderer.js\"\n\t],\n\t\"./BehaviorRenderer.js\": [\n\t\t\"./src/js/BehaviorRenderer.js\"\n\t],\n\t\"./BehaviorSky\": [\n\t\t\"./src/js/BehaviorSky.js\"\n\t],\n\t\"./BehaviorSky.js\": [\n\t\t\"./src/js/BehaviorSky.js\"\n\t],\n\t\"./BehaviorText\": [\n\t\t\"./src/js/BehaviorText.js\"\n\t],\n\t\"./BehaviorText.js\": [\n\t\t\"./src/js/BehaviorText.js\"\n\t],\n\t\"./BehaviorTextPanel\": [\n\t\t\"./src/js/BehaviorTextPanel.js\"\n\t],\n\t\"./BehaviorTextPanel.js\": [\n\t\t\"./src/js/BehaviorTextPanel.js\"\n\t],\n\t\"./BehaviorTick\": [\n\t\t\"./src/js/BehaviorTick.js\"\n\t],\n\t\"./BehaviorTick.js\": [\n\t\t\"./src/js/BehaviorTick.js\"\n\t],\n\t\"./BehaviorWalk\": [\n\t\t\"./src/js/BehaviorWalk.js\"\n\t],\n\t\"./BehaviorWalk.js\": [\n\t\t\"./src/js/BehaviorWalk.js\"\n\t],\n\t\"./Blob\": [\n\t\t\"./src/js/Blob.js\"\n\t],\n\t\"./Blob.js\": [\n\t\t\"./src/js/Blob.js\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(function() {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {\n\t\treturn __webpack_require__(id);\n\t});\n}\nwebpackAsyncContext.keys = function webpackAsyncContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackAsyncContext.id = \"./src/js lazy recursive ^\\\\.\\\\/.*$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack:///./src/js_lazy_^\\.\\/.*$_namespace_object?");

/***/ }),

/***/ "./src/js/BehaviorBounce.js":
/*!**********************************!*\
  !*** ./src/js/BehaviorBounce.js ***!
  \**********************************/
/*! exports provided: BehaviorLine, BehaviorBounce, BehaviorOscillate, BehaviorWander, BehaviorStare */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorLine\", function() { return BehaviorLine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorBounce\", function() { return BehaviorBounce; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorOscillate\", function() { return BehaviorOscillate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorWander\", function() { return BehaviorWander; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorStare\", function() { return BehaviorStare; });\nclass BehaviorLine extends THREE.Line2 {\n\n\tconstructor(props,blob) {\n\t\tlet geometry = new THREE.LineGeometry()\n\t\tlet matLine = new THREE.LineMaterial( {\n\t\t\tcolor: 0xffffff,\n\t\t\tlinewidth: 5, // in pixels\n\t\t\tvertexColors: THREE.VertexColors,\n\t\t\tdashed: false\n\t\t} );\n\t\tmatLine.resolution.set( window.innerWidth, window.innerHeight )\n\t\tsuper(geometry,matLine)\n\t\tthis.myGeometry = geometry\n\t\tthis.first = blob.parent.children.find(props.first)\n\t\tthis.second = blob.parent.children.find(props.second)\n\t}\n\n\ttick(interval,blob) {\n\n\t\tif(!this.first || !this.second) return\n\n\t\tlet a = this.first.mesh.position\n\t\tlet b = this.second.mesh.position\n\n\t\tlet geometry = this.myGeometry\n\t\tlet positions = [];\n\t\tlet colors = [];\n\t\t//let points = hilbert3D( new THREE.Vector3( 0, 0, 0 ), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7 );\n\t\tlet points = [ a, b ]\n\t\tlet spline = new THREE.CatmullRomCurve3( points );\n\t\tlet divisions = Math.round( 12 * points.length );\n\t\tlet color = new THREE.Color();\n\t\tfor ( let i = 0, l = divisions; i < l; i ++ ) {\n\t\t\tlet point = spline.getPoint( i / l );\n\t\t\tpositions.push( point.x, point.y, point.z );\n\t\t\tcolor.setHSL( i / l, 1.0, 0.5 );\n\t\t\tcolors.push( color.r, color.g, color.b );\n\t\t}\n\t\tgeometry.setPositions( positions );\n\t\tgeometry.setColors( colors );\n\n\t\tthis.computeLineDistances()\n\t\tgeometry.verticesNeedUpdate = true;\n\t}\n\n}\n\nclass BehaviorBounce {\n\tconstructor(props) {\n\t\tthis.thrust = props.thrust ? new THREE.Vector3(props.thrust.x,props.thrust.y,props.thrust.z) : new THREE.Vector3()\n\t\tthis.force = props.force ? new THREE.Vector3(props.force.x,props.force.y,props.force.z) : new THREE.Vector3()\n\t\t// TODO it does expect properties to exist... maybe it should force requirements to exist if not present\n\t\t// TODO so maybe it should also add itself to the blob? can it add duplicate named entries?\n\t\t// blob.register(this)\n\t}\n\ttick(interval,blob) {\n\t\tif(!blob.mesh) return\n\t\tthis.force.add(this.thrust)\n\t\tblob.mesh.position.add(this.force)\n\t\tif(blob.mesh.position.y < 2) {\n\t\t\tblob.mesh.position.y = 2\n\t\t\tthis.force.y = 0.5\n\t\t}\n\t}\n}\n\nclass BehaviorOscillate {\n\tconstructor() {\n\t\tthis.angle = 0\n\t}\n\ttick(interval,blob) {\n\t\tif(!blob.mesh) return // TODO more error checking\n\t\tlet rad = 30\n\t\tthis.angle += 0.01\n\t\tblob.mesh.position.set(Math.sin(this.angle)*rad, 3, Math.cos(this.angle)*rad)\n\t}\n}\n\nclass BehaviorWander {\n\tconstructor(props) {\n\t\tthis.thrust = props.thrust ? new THREE.Vector3(props.thrust.x,props.thrust.y,props.thrust.z) : new THREE.Vector3()\n\t\tthis.force = props.force ? new THREE.Vector3(props.force.x,props.force.y,props.force.z) : new THREE.Vector3()\n\t}\n\ttick(interval,blob) {\n\t\tif(!blob.mesh) return\n\t\t// pick somewhere occasionally\n\t\tif(!this.focus || Math.random() < 0.011) {\n\t\t\tthis.focus = new THREE.Vector3(Math.random()*20-10,Math.random()*20,Math.random()*20-10)\n\t\t}\n\t\t// accelerate towards it if far away\n\t\tthis.thrust.x = ( this.focus.x - blob.mesh.position.x ) * 0.01 * interval\n\t\tthis.thrust.y = ( this.focus.y - blob.mesh.position.y ) * 0.01 * interval\n\t\tthis.thrust.z = ( this.focus.z - blob.mesh.position.z ) * 0.01 * interval\n\t\tthis.force.add(this.thrust)\n\t\tthis.mesh.position.add(this.force)\n\t}\n}\n\nclass BehaviorStare {\n\tconstructor(props) {\n\t\tthis.props = props\n\t}\n\ttick(interval,blob) {\n\t\tlet focus = blob.parent.children.find(this.props)\n\t\tif(focus && focus.mesh) {\n\t\t\tblob.mesh.lookAt(focus.mesh.position)\n\t\t}\n\t}\n}\n\n\n\n//# sourceURL=webpack:///./src/js/BehaviorBounce.js?");

/***/ }),

/***/ "./src/js/BehaviorCollide.js":
/*!***********************************!*\
  !*** ./src/js/BehaviorCollide.js ***!
  \***********************************/
/*! exports provided: BehaviorCollide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorCollide\", function() { return BehaviorCollide; });\n\nlet collidants = []\n\nclass BehaviorCollide {\n\tconstructor(props,blob) {\n\t\tif(!props.layer) props.layer = 1\n\t\tif(!props.filter) props.filter = 1\n\t\tif(!props.proximity) props.proximity = 1\n\t\tcollidants.push({props:props,blob:blob})\n\t}\n\ttick(interval,blob) {\n\t\t// test everybody\n\t\tfor(let i = 0; i < collidants.length; i++) {\n\t\t\tfor(let j = i+1; j < collidants.length; j++) {\n\t\t\t\tlet a = collidants[i]\n\t\t\t\tlet b = collidants[j]\n\t\t\t\t// TODO it is fragile code wise to look specifically for a mesh - should use blob.findByProperty(\"isObject3D\")\n\t\t\t\tif(!a.blob.mesh || !b.blob.mesh) continue\n\t\t\t\t// May only collide if layer masks overlap\n\t\t\t\tif(!(a.props.layer & b.props.layer)) continue\n\t\t\t\tlet dist = a.blob.mesh.position.distanceTo( b.blob.mesh.position )\n\t\t\t\tlet near = a.props.proximity + b.props.proximity\n\t\t\t\tif(dist < near) {\n\t\t\t\t\t// May only report if filters also succeed\n\t\t\t\t\tif((a.props.filter & b.props.layer) && a.props.on_overlap) a.props.on_overlap(interval,a.blob,b.blob)\n\t\t\t\t\tif((b.props.filter & a.props.layer) && b.props.on_overlap) b.props.on_overlap(interval,b.blob,a.blob)\t\t\t\t\t\n\t\t\t\t}\n\t\t\t\tif(dist < near && !a.latched) {\n\t\t\t\t\ta.latched = true\n\t\t\t\t\tif(a.props.on_enter) a.props.on_enter(interval,a.blob,b.blob)\n\t\t\t\t\tif(b.props.on_enter) b.props.on_enter(interval,b.blob,a.blob)\n\t\t\t\t} else if(dist >= 2) a.latched = false\n\t\t\t}\n\t\t}\n\t}\n}\n\n\n\n//# sourceURL=webpack:///./src/js/BehaviorCollide.js?");

/***/ }),

/***/ "./src/js/BehaviorEmitter.js":
/*!***********************************!*\
  !*** ./src/js/BehaviorEmitter.js ***!
  \***********************************/
/*! exports provided: BehaviorEmitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorEmitter\", function() { return BehaviorEmitter; });\nclass BehaviorEmitter {\n\tconstructor(props,blob) {\n\t\tif(!props || !props.target) {\n\t\t\tconsole.error(\"You have to specify a target\")\n\t\t\treturn\n\t\t}\n\t\tlet target = blob._findChildByName(props.target)\n\t\tif(!target) {\n\t\t\tconsole.error(\"Target is not found\")\n\t\t\treturn\n\t\t}\n\t\tlet count = props.count || 10\n\t\tfor(let i = 0; i < count; i++) {\n\t\t\t// randomly place - TODO parameterize\n\t\t\tlet x = Math.random()*10 - 5\n\t\t\tlet y = 0\n\t\t\tlet z = Math.random()*10 - 5\n\t\t\tlet position = {x:x,y:y,z:z}\n\t\t\ttarget._details.mesh.position = position\n\t\t\tlet fresh_copy = target._copy()\n\t\t}\n\t}\n}\n\n//# sourceURL=webpack:///./src/js/BehaviorEmitter.js?");

/***/ }),

/***/ "./src/js/BehaviorEvent.js":
/*!*********************************!*\
  !*** ./src/js/BehaviorEvent.js ***!
  \*********************************/
/*! exports provided: BehaviorEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorEvent\", function() { return BehaviorEvent; });\n\n///\n/// BehaviorEvent\n///\n/// This is an idea to let users decorate objects with event handlers\n/// Exploring various strategies to pipe useful events to 'user land'\n///\n\nclass BehaviorEvent {\n\tconstructor(props,blob) {\n\t\t// Listen to events on the parent scope and pipe them all directly to userland\n\t\tif(blob) blob._listen(\"\",(e) => {\n\t\t\tif(!props)return\n\t\t\te.parent = blob\n\t\t\te.behavior = this\n\t\t\tprops(e)\n\t\t})\n\t}\n}\n\n//# sourceURL=webpack:///./src/js/BehaviorEvent.js?");

/***/ }),

/***/ "./src/js/BehaviorHeart.js":
/*!*********************************!*\
  !*** ./src/js/BehaviorHeart.js ***!
  \*********************************/
/*! exports provided: BehaviorHeart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorHeart\", function() { return BehaviorHeart; });\n/* harmony import */ var _BehaviorMesh_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BehaviorMesh.js */ \"./src/js/BehaviorMesh.js\");\n\nlet heart_geometry = 0\n\n\n\nclass BehaviorHeart extends _BehaviorMesh_js__WEBPACK_IMPORTED_MODULE_0__[\"BehaviorMesh\"] {\n\n\tconstructor(props,blob) {\n\t\tsuper(props,blob)\n\t}\n\n\tsetCustomGeometry() {\n\t\tif(heart_geometry) return heart_geometry\n\t\tlet x = 0, y = 0\n\t\tlet shape = new THREE.Shape()\n\t\tshape.moveTo( x + .5, y + .5 )\n\t\tshape.bezierCurveTo( x + .5, y + .5, x + .4, y, x, y )\n\t\tshape.bezierCurveTo( x - .6, y, x - .6, y + .7,x - .6, y + .7 )\n\t\tshape.bezierCurveTo( x - .6, y + 1.1, x - .3, y + 1.54, x + .5, y + 1.9 )\n\t\tshape.bezierCurveTo( x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + .7 )\n\t\tshape.bezierCurveTo( x + 1.6, y + .7, x + 1.6, y, x + 1.0, y )\n\t\tshape.bezierCurveTo( x + .7, y, x + .5, y + .5, x + .5, y + .5 )\n\t\t//let extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 }\n\t\t//heart_geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings )\n\t\t//heart_geometry = new THREE.ShapeGeometry( shape )\n\t\theart_geometry = new THREE.ShapeBufferGeometry( shape )\n\t\treturn heart_geometry\n\t}\n}\n\n\n//# sourceURL=webpack:///./src/js/BehaviorHeart.js?");

/***/ }),

/***/ "./src/js/BehaviorLight.js":
/*!*********************************!*\
  !*** ./src/js/BehaviorLight.js ***!
  \*********************************/
/*! exports provided: BehaviorLight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorLight\", function() { return BehaviorLight; });\nclass BehaviorLight extends THREE.DirectionalLight {\n\tconstructor(props,blob) {\n\n\t\t// instance directional light\n\t\tsuper(props)\n\n\t\t// adjust scale and position\n\t\tif(props.position) this.position.set(props.position.x,props.position.y,props.position.z)\n\n\t\tthis.target.position.set(0,0,0)\n\t\tthis.castShadow = props.castShadow || true\n\n\t\t// debug - make a visible representation\n\t\tlet color = props.color || 0xFFFF00\n\t\tlet geometry = new THREE.SphereGeometry( 3, 16, 16 )\n\t\tlet material = new THREE.MeshBasicMaterial( {color: color } )\n\t\tlet mesh = new THREE.Mesh(geometry,material)\n\t\tthis.add(mesh)\n\t}\n}\n\n\n//# sourceURL=webpack:///./src/js/BehaviorLight.js?");

/***/ }),

/***/ "./src/js/BehaviorMesh.js":
/*!********************************!*\
  !*** ./src/js/BehaviorMesh.js ***!
  \********************************/
/*! exports provided: BehaviorMesh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorMesh\", function() { return BehaviorMesh; });\n\n///\n/// A mesh manager\n///\n/// TODO support active or inactive\n/// TODO should material properties be more detailed?\n///\n\nclass BehaviorMesh extends THREE.Mesh {\n\n\tconstructor(props={},blob=0) {\n\n\t\t// TODO I would prefer to instance and set properties in one step rather than deleting and resetting properties\n\t\tsuper()\n\n\t\t// reset physics\n\t\tthis.physicsReset()\n\n\t\t// publish an event that properties are about to be set\n\t\tif(blob) blob._speak({ name:\"behavior_initialization\", behavior:this, parent:blob, props:props })\n\n\t\t// set or reset various properties from params\n\t\tthis.reset(props)\n\n\t\t// listen to events and attach any children that show up\n\t\tif(blob) blob._listen(\"child_added\",this.on_child_added.bind(this))\n\t}\n\n\ton_child_added(args) {\n\t\tif(args.name != \"child_added\") return\n\t\tlet mesh = this\n\t\tObject.entries(args.child).forEach(([key,value])=>{\n\t\t\tif(value instanceof THREE.Object3D) {\n\t\t\t\tmesh.add(value)\n\t\t\t}\n\t\t})\n\t}\n\n\t/// set or reset qualities of this mesh\n\treset(props) {\n\n\t\tif(!props) return\n\n\t\t// set or reset material from params - do this before the geom in case I later want to try scavenge material into gltf\n\t\t{\n\t\t\tlet c = props.color || 0xff00ff\n\t\t\tlet s = props.doublesided ? THREE.DoubleSide : 0\n\t\t\tlet t = props.transparent ? 0 : 0\n\t\t\tlet m = new THREE.MeshPhongMaterial( {color: c, transparent: t, side: s } )\n\t\t\tif(this.material) this.material.dispose()\n\t\t\tthis.material = m\n\t\t}\n\n\t\t// set or reset geometry\n\t\tif(!this.props || this.props.art != props.art) {\n\t\t\tthis.setGeometryFromString(props.art)\n\t\t}\n\n\t\tlet mesh = this\n\n\t\tif(props.scale) {\n\t\t\tmesh.scale.set(props.scale.x,props.scale.y,props.scale.z)\n\t\t}\n\n\t\tif(props.position) {\n\t\t\tmesh.position.set(props.position.x,props.position.y,props.position.z)\n\t\t}\n\n\t\tif(props.orientation) {\n\t\t\tmesh.rotation.x = props.orientation.x * Math.PI/180.0\n\t\t\tmesh.rotation.y = props.orientation.y * Math.PI/180.0\n\t\t\tmesh.rotation.z = props.orientation.z * Math.PI/180.0\n\t\t}\n\n\t\tif(typeof props.visible !== 'undefined') {\n\t\t\tmesh.visible = props.visible ? true : false\n\t\t}\n\n\t\t// save for future reference on changes\n\t\tthis.props = props\n\t}\n\n\t/// set or reset geometry from a string description with special rules\n\tsetGeometryFromString(str) {\n\n\t\t// TODO must write remove if already exists in scene\n\n\t\tlet is_gltf = 0\n\t\tlet geometry = 0\n\n\t\tswitch(str) {\n\t\t\tcase undefined:\n\t\t\tcase 0:\n\t\t\tcase null:\n\t\t\t\t// TODO the semantics here could use thought - perhaps a default shape is best if nothing is supplied\n\t\t\t\tgeometry = this.setCustomGeometry()\n\t\t\t\tbreak\n\t\t\tcase \"group\":\n\t\t\t\tgeometry = null\n\t\t\t\tbreak\n\t\t\tcase \"box\":\n\t\t\t\tgeometry = new THREE.BoxBufferGeometry(1,1,1,16,16,16)\n\t\t\t\tbreak\n\t\t\tcase \"sphere\":\n\t\t\t\tgeometry = new THREE.SphereGeometry(1,16,16)\n\t\t\t\tbreak\n\t\t\tdefault:\n\t\t\t\tis_gltf = 1\n\t\t\t\tgeometry = new THREE.SphereGeometry(1,16,16)\n\t\t\t\tbreak\n\t\t}\n\n\t\tif(this.geometry) this.geometry.dispose()\n\t\tthis.geometry = geometry\n\n\t\t// was a simple geometry\n\t\tif(!is_gltf) {\n\t\t\treturn\n\t\t}\n\n\t\t// actually i don't want to see it\n\t\tif(this.material) this.material.visible = false\n\n\t\t// load the gltf\n\t\tlet url = str + \"/scene.gltf\"\n\t\tlet loader = new THREE.GLTFLoader()\n\t    let mesh = this\n\n\t\tloader.load(url, (gltf) => {\n\n\t\t\tif(!gltf || !gltf.scene) {\n\t\t\t\treturn // oh well it tried - doesn't matter if fails\n\t\t\t}\n\n\t\t\t// start animations\n\t        if(gltf.animations && gltf.animations.length){\n\t            let mixer = new THREE.AnimationMixer(gltf.scene)\n\t            for(let animation of gltf.animations){\n\t                mixer.clipAction(animation).play()\n\t            }\n\t        }\n\n\t\t\t// center on self\n\t\t\tlet bbox = new THREE.Box3().setFromObject(gltf.scene)\n\t\t\tlet size = mesh.scale.length()\n\t\t    let resize = size / bbox.getSize(new THREE.Vector3()).length() * 2\n\t\t    let offset = bbox.getCenter(new THREE.Vector3()).multiplyScalar(resize)\n\t\t    gltf.scene.scale.set(resize,resize,resize)\n\t\t    gltf.scene.position.sub(offset)\n\n\t\t    // add to parent\n\t\t\tmesh.add(gltf.scene)\n\n\t\t\t// turn the top level material invisible to reveal the gltf only\n\t\t\t// TODO later use the top level material here\n\t\t\tif(this.material) this.material.visible = false\n\t\t})\n\t}\n\n\t///\n\t/// may be subclassed\n\t///\n\tsetCustomGeometry() {\n\t\tconsole.error(this)\n\t\tthrow new Error('You have to implement the method setCustomGeometry!')\n\t}\n\n\ttick(interval,blob) {\n\t\tif(!this.physical) return\n\n\t\t// dampen linear movement by friction\n\t\tthis.linear.x = this.linear.x * this.friction\n\t\tthis.linear.y = this.linear.y * this.friction\n\t\tthis.linear.z = this.linear.z * this.friction\n\n\t\t// apply force to object\n\t\tthis.position.add(this.linear)\n\t}\n\n\tphysicsReset() {\n\t\tthis.physical = 0\n\t\tthis.friction = 0.9\n\t\tthis.linear = new THREE.Vector3()\n\t}\n\n\t///\n\t/// Apply a linear force to an object, or an angular force, which dampen over time\n\t/// TODO use time interval TODO parameterize\n\n\tphysicsForce(linear=0,angular=0) {\n\t\tthis.physical = 1\n\t\tif(linear) {\n\t\t\t// rotate force to current heading and apply it to forces on object\n\t\t\t//let scratch = new THREE.Vector3(this.linear.x,this.linear.y,this.linear.z)\n\t\t\tlet scratch = new THREE.Vector3(linear.x,linear.y,linear.z) //this.linear.x,this.linear.y,this.linear.z)\n\t\t\tscratch.applyQuaternion( this.quaternion )\n\t\t\tthis.linear.add(scratch)\n\t\t}\n\t\tif(angular) {\n\t\t\t// get angular force as a quaternion\n\t\t\tlet q = new THREE.Quaternion() ; q.setFromEuler(angular)\n\t\t\t// apply to current orientation immediately\n\t\t\tthis.quaternion.multiply(q)\n\t\t\t// debug\n\t\t\tlet e = new THREE.Euler()\n\t\t\te.setFromQuaternion(this.quaternion)\n\t\t\tlet x = e.x * 180 / Math.PI\n\t\t\tlet y = e.y * 180 / Math.PI\n\t\t\tlet z = e.z * 180 / Math.PI\n\t\t}\n\t}\n}\n\n\n\n\n//# sourceURL=webpack:///./src/js/BehaviorMesh.js?");

/***/ }),

/***/ "./src/js/BehaviorOrbit.js":
/*!*********************************!*\
  !*** ./src/js/BehaviorOrbit.js ***!
  \*********************************/
/*! exports provided: BehaviorOrbit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorOrbit\", function() { return BehaviorOrbit; });\nclass BehaviorOrbit extends THREE.OrbitControls{\n\tconstructor(props,blob) {\n\t\t// TODO it's a bit of a hack that this component knows or expects to find a camera in its own scope\n\t\tif(!blob.camera) {\n\t\t\tconsole.error(\"BehaviorOrbit requires a camera to be attached to the same group already\")\n\t\t}\n\t\tsuper(blob.camera)\n\t\tlet lookat = props.lookat || {x:0,y:1,z:0}\n\t\tthis.target = new THREE.Vector3(lookat.x,lookat.y,lookat.z)\n\t\tthis.minDistance = props.minDistance || 50\n\t\tthis.maxDistance = props.maxDistance || 500\n\t\tthis.update()\n\t}\n}\n\n\n//# sourceURL=webpack:///./src/js/BehaviorOrbit.js?");

/***/ }),

/***/ "./src/js/BehaviorParticles.js":
/*!*************************************!*\
  !*** ./src/js/BehaviorParticles.js ***!
  \*************************************/
/*! exports provided: BehaviorParticles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorParticles\", function() { return BehaviorParticles; });\n\n///\n/// A rudimentary particle effects engine that acts on 3d geometries\n///\n/// There are other engines which act on points and exploit shaders - it may be worth migrating to one of those\n///\n/// https://github.com/a-jie/three.proton\n/// https://tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js/\n///\n///\n\n///\n/// Particle state tracking\n///\n\nclass Particle {\n\n\tconstructor(props,parentBehavior) {\n\n\t\tif(!parentBehavior) {\n\t\t\tconsole.error(\"Needs a hint about what kind of mesh to use - and needs a parent object to attach to\")\n\t\t\treturn\n\t\t}\n\n\t\t// re-instance and then somewhat manually associate the behavior with the threejs scene graph\n\t\tthis.mesh = new parentBehavior.constructor(parentBehavior.props,0)\n\t\tparentBehavior.add(this.mesh)\n\n\t\tthis.reset(props,parentBehavior)\n\t}\n\n\treset(props,parentBehavior=0) {\n\t\t// lifespan\n\n\t\tlet longevity = props.longevity || { min:50, max:100 }\n\t\tthis.life = this.lifestart = Math.random() * (longevity.max-longevity.min) + longevity.min\n\n\t\t// gravity dir\n\n\t\tthis.gravity = props.gravity || new THREE.Vector3(0,-1,0)\n\t\tthis.friction = props.friction || new THREE.Vector3(0.9,0.9,0.9)\n\n\t\t// starting radius cloud\n\n\t\tlet offset = props.offset || {x:0,y:0,z:0}\n\t\tlet radius = props.radius || 1\n\n\t\tthis.position = new THREE.Vector3(\n\t\t\toffset.x + Math.random() * radius,\n\t\t\toffset.y + Math.random() * radius,\n\t\t\toffset.z + Math.random() * radius\n\t\t\t)\n\n\t\t// starting force direction\n\n\t\tlet speed = Math.random() * ( props.speed.max - props.speed.min ) + props.speed.min\n\n\t\tlet nozzle = props.nozzle || {axis1:-10,axis2:10,spin1:0,spin2:360}\n\n\t\t// get vector pointing up of the speed we want\n\t\tlet v = new THREE.Vector3(0,1*speed,0)\n\t\t// get angle on z to rotate that by - a small range would be a small declination\n\t\tlet a = (Math.random()*(nozzle.axis2-nozzle.axis1)+nozzle.axis1)\n\t\t// rotate it by that much\n\t\tv.applyAxisAngle(new THREE.Vector3(0,0,1),a*Math.PI/180)\n\t\t// now take the result and sweep it around the vertical spin axis\n\t\tlet b = (Math.random()*(nozzle.spin2-nozzle.spin1)+nozzle.spin1)\n\t\tv.applyAxisAngle(new THREE.Vector3(0,1,0),b*Math.PI/180)\n\t\tthis.velocity = v\n\n\t\t// pick a tumble orientation\n\n\t\tthis.tumbleTime = 0\n\n\t\t// fiddle with scale and color - TODO later get from params\n\t\t{\n\t\t\tlet r = Math.floor(Math.random()*100 + 135)\n\t\t\tlet g = Math.floor(Math.random()*100 + 19)\n\t\t\tlet b = Math.floor(Math.random()*100 + 101)\n\t\t\tlet c = r *65536 + g * 256 + b\n\t\t\tlet s = Math.random() + 1\n\t\t\t// build up properties to write\n\t\t\tlet modifiers = {\n\t\t\t\tcolor:c,\n\t\t\t\tscale:{ x:s, y:s, z:s },\n\t\t\t\tdoublesided:1,\n\t\t\t\ttransparent:1,\n\t\t\t}\n\t\t\t// modify the mesh\n\t\t\tthis.mesh.reset(modifiers)\n\t\t}\n\n\n\t\t// force tick it ahead to get the properties into the next refresh\n\t\tthis.tick(0)\n\t}\n\n\ttick(interval) {\n\n\t\t// age\n\t\tif(this.life < 0) {\n\t\t\tthis.mesh.visible = false\n\t\t\tthis.mesh.position.set(0,0,0)\n\t\t\treturn\n\t\t}\n\t\tthis.life--\n\n\t\t// dampen current velocity and add forces\n\t\tlet seconds = 0.001\n\t\tthis.velocity.x = this.velocity.x * this.friction.x + this.gravity.x * seconds\n\t\tthis.velocity.y = this.velocity.y * this.friction.y + this.gravity.y * seconds\n\t\tthis.velocity.z = this.velocity.z * this.friction.z + this.gravity.z * seconds\n\n\t\t// update position by velocity\n\t\tthis.position.x += this.velocity.x\n\t\tthis.position.y += this.velocity.y\n\t\tthis.position.z += this.velocity.z\n\n\t\t// move\n\t\tthis.mesh.visible = true\n\t\tthis.mesh.position.set(this.position.x,this.position.y,this.position.z)\n\n\t\t// tumble\n\n\t\tif(--this.tumbleTime<0 || !this.tumbleAxis) {\n\t\t\tthis.tumbleTime = Math.floor(Math.random()*50)\n\t\t\tthis.tumbleAxis = new THREE.Vector3(Math.random()*10,Math.random()*10,Math.random*10).normalize()\n\t\t}\n\t\tthis.mesh.rotateOnAxis(this.tumbleAxis,0.1)\n\n\t\t// TODO opacity and color change\n\t\t//var colorHSL = this.colorTween.lerp( this.age );\n\t\t//this.color = new THREE.Color().setHSL( colorHSL.x, colorHSL.y, colorHSL.z );\n\n\t\tthis.mesh.material.opacity = 1-(this.lifestart-this.life)/this.lifestart\n\n\t}\n\n}\n\n///\n/// A behavior that adds particles\n///\n///\n\nclass BehaviorParticles {\n\tconstructor(props,blob) {\n\t\tthis.props = props\n\t\tthis.particles = []\n\t\tthis.rateCount = 0\n\t\tthis.parentBehavior = blob._findByProperty(\"isObject3D\")\n\t\tif(!this.parentBehavior) {\n\t\t\tconsole.error(\"Particles need to act on a 3d example object\")\n\t\t\treturn\n\t\t}\n\t\tthis.parentBehavior.material.visible = false\n\t}\n\ttick(interval,blob) {\n\t\tif(!this.parentBehavior) return\n\n\t\t// visit all particles\n\t\tlet reusable = []\n\t\tlet active = 0\n\n\t\tfor(let i = 0;i<this.particles.length;i++) {\n\n\t\t\t// get a particle\n\t\t\tlet particle = this.particles[i]\n\n\t\t\t// ignore if aged out\n\t\t\tif(particle.life<0) {\n\t\t\t\tparticle.mesh.visible = false\n\t\t\t\treusable.push(particle)\n\t\t\t\tcontinue\n\t\t\t}\n\n\t\t\t// update\n\t\t\tparticle.tick(interval)\n\t\t\tactive++\n\t\t}\n\n\t\t// accumulate rate\n\t\tthis.rateCount += this.props.rate\n\n\t\tlet count = Math.floor(this.rateCount)\n\n\t\t// add rate number of more particles\n\t\tfor(let i = 0; i < count; i++) {\n\t\t\tif(reusable.length) {\n\t\t\t\tlet particle = reusable.shift()\n\t\t\t\tparticle.reset(this.props)\n\t\t\t} else {\n\t\t\t\tif(this.particles.length >= this.props.quantity) return\n\t\t\t\tlet particle = new Particle(this.props,this.parentBehavior)\n\t\t\t\tthis.particles.push(particle)\n\t\t\t}\n\t\t\tthis.rateCount -=1\n\t\t}\n\t}\n}\n\n\n\n//# sourceURL=webpack:///./src/js/BehaviorParticles.js?");

/***/ }),

/***/ "./src/js/BehaviorPhysics.js":
/*!***********************************!*\
  !*** ./src/js/BehaviorPhysics.js ***!
  \***********************************/
/*! exports provided: BehaviorPhysics, BehaviorPhysical */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorPhysics\", function() { return BehaviorPhysics; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorPhysical\", function() { return BehaviorPhysical; });\n\n\n///\n/// BehaviorPhysics\n///\n/// A physics capability - singleton\n///\n\nlet physicsInstance = 0\n\nclass BehaviorPhysics {\n\n\t/// helper to get at instance\n\tstatic getInstance() {\n\t\tif(!physicsInstance) physicsInstance = new BehaviorPhysics()\n\t\treturn physicsInstance\n\t}\n\n\t/// singleton constructor, can be called multiple times although it is slightly wasteful (a tiny object is created and thrown away)\n\tconstructor(props,blob) {\n\n\t\t// a singleton\n\t\tif(physicsInstance) {\n\t\t\tconsole.error(\"Warning: Multiple instances of BehaviorPhysics - use .getInstance()\")\n\t\t\treturn physicsInstance\n\t\t}\n\t\tphysicsInstance = this\n\n\t\tAmmo()\n\t\tconsole.log(\"XXXX\")\n\n\t\tthis.collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration()\n\t\tthis.dispatcher              = new Ammo.btCollisionDispatcher(this.collisionConfiguration)\n\t\tthis.overlappingPairCache    = new Ammo.btDbvtBroadphase()\n\t\tthis.solver                  = new Ammo.btSequentialImpulseConstraintSolver()\n\t\tthis.dynamicsWorld           = new Ammo.btDiscreteDynamicsWorld(this.dispatcher, this.overlappingPairCache, this.solver, this.collisionConfiguration)\n\n\t\tthis.dynamicsWorld.setGravity(new Ammo.btVector3(0, -10, 0))\n\n\t\tthis.bodies = []\n\t}\n\n\taddConstraint(constraint) {\n\t\tthis.dynamicsWorld.addConstraint(constraint)\n\t}\n\n\taddRigidBody(body) {\n\t\tthis.dynamicsWorld.addRigidBody(body)\n\t\tthis.bodies.push(body)\n\t}\n\n\ttick() {\n\t\tthis.dynamicsWorld.stepSimulation(1/60, 10)\n\t}\n\n\tdestroy() {\n\t    Ammo.destroy(this.dynamicsWorld)\n\t    Ammo.destroy(this.solver)\n\t    Ammo.destroy(this.overlappingPairCache)\n\t    Ammo.destroy(this.dispatcher)\n\t    Ammo.destroy(this.collisionConfiguration)\n\t}\n\n}\n\n///\n/// BehaviorPhysical\n///\n/// A physics capability for meshes\n///\n///\n\nclass BehaviorPhysical {\n\tconstructor(props,blob) {\n\n\t\tif(!blob.mesh) {\n\t\t\t/// TODO right now there is a bit of a hack where it looks for a 'mesh' property on the parent - may be better to force specify hull?\n\t\t\tconsole.error(\"There has to be a mesh behavior in this object already\")\n\t\t\treturn\n\t\t}\n\n\t\tif(blob.physical) {\n\t\t\t/// TODO right now there is a bit of a hack where it looks for a 'mesh' property on the parent - may be better to force specify hull?\n\t\t\tconsole.error(\"Object already has a physical behavior\")\n\t\t\treturn\n\t\t}\n\n\t\tthis.props = props\n\n\t\t// Force properties to exist\n\t\tlet scale = blob.mesh.scale\n\t\tlet position = blob.mesh.position\n\t\tlet size = scale.length()\n\n\t\tlet mass = this.mass = props.mass || 0\n\t\tlet transform = this.transform = 0\n\n\n\t\tlet hull = \"sphere\"\n\t\tif(blob.mesh.geometry instanceof THREE.BoxBufferGeometry) hull = \"box\"\n\t\tif(blob.mesh.geometry instanceof THREE.SphereGeometry) hull = \"sphere\"\n\t\tlet shape = 0\n\n\t\tswitch(hull) {\n\t\t\tcase \"sphere\":\n\t\t\t\tshape = this.shape = new Ammo.btSphereShape(size/2)\n\t\t\t\ttransform = this.transform = new Ammo.btTransform()\n\t\t\t\ttransform.setIdentity()\n\t\t\t\ttransform.setOrigin(new Ammo.btVector3(position.x,position.y,position.z))\n\t\t\t\tbreak\n\t\t\tdefault:\n\t\t\t\tshape = this.shape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x/2,scale.y/2,scale.z/2))\n\t\t\t\ttransform = this.transform = new Ammo.btTransform()\n\t\t\t\ttransform.setIdentity()\n\t\t\t\ttransform.setOrigin(new Ammo.btVector3(position.x,position.y,position.z))\n\t\t\t\tbreak\n\t\t}\n\n\t\tlet localInertia  = new Ammo.btVector3(0, 0, 0)\n\t\tif(mass) shape.calculateLocalInertia(mass, localInertia)\n\t\tlet myMotionState = new Ammo.btDefaultMotionState(transform)\n\t\tlet rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, shape, localInertia)\n\n\t\tlet body = this.body = new Ammo.btRigidBody(rbInfo)\n\t\tthis.trans = new Ammo.btTransform()\n\n\t\t// super bouncy for now\n\t\tthis.body.setRestitution(0.9)\n\n\t\t// disable deactivation for now\n\t\tthis.body.setActivationState(4)\n\t\tthis.body.activate()\n\n\t\tif(this.props.launch) {\n\t\t\tthis.body.applyCentralForce(new Ammo.btVector3(this.props.launch.x,this.props.launch.y,this.props.launch.z))\n\t\t\tthis.body.applyCentralImpulse(new Ammo.btVector3(this.props.launch.x,this.props.launch.y,this.props.launch.z))\n\t\t}\n\n\t\tBehaviorPhysics.getInstance().addRigidBody(this.body)\n\n\t\tif(props.joint) this.testJoint(props)\n\t}\n\n\t///\n\t/// hack test code\n\t///\n\n\ttestJoint(props) {\n\n\t\tlet bodies = BehaviorPhysics.getInstance().bodies\n\n\t\tlet test1 = bodies[bodies.length-2]\n\t\tlet test2 = bodies[bodies.length-1]\n\n\t\tlet transforma = new Ammo.btTransform()\n\t\ttransforma.setIdentity()\n\t\t//transforma.setOrigin(new Ammo.btVector3(0, 10, 0))\n\n\t\tlet transformb = new Ammo.btTransform()\n\t\ttransformb.setIdentity()\n\t\t//transformb.setOrigin(new Ammo.btVector3(0, 0, 0))\n\n\t\tlet constraint = new Ammo.btSliderConstraint(\n\t\t\ttest1,\n\t\t\ttest2,\n\t\t\ttransforma,\n\t\t\ttransformb,\n\t\t\ttrue\n\t\t)\n\n\t\tconstraint.setLowerLinLimit(0)\n\t\tconstraint.setUpperLinLimit(2)\n\n\t\t// don't need to do this\n\t\t//\tconstraint.setLowerAngLimit(-1)\n\t\t//\tconstraint.setUpperAngLimit(-1)\n\n\t\t// motors are not supported\n\t\t//\tconstraint.setLinMotorVelocity( 1 )\n\t\t//\tconstraint.setMaxLinMotorForce( 0.0001 );\n\t\t//\tconstraint.setPoweredLinMotor( true );\n\n\t\t// try see if a persistent force will make it stay at limit\n\t\t//\tconstraint.setSoftnessLimLin( params.linear || 0 )\n\t\t//\tconstraint.setSoftnessLimAng( params.angular || 0 )\n\n\t\tBehaviorPhysics.getInstance().addConstraint(constraint)\n\n\t}\n\n\ttick(interval,blob) {\n\n\t\tif(!blob.mesh) return\n\n\t\tif(this.props.force) {\n\t\t\t// test code remove - TODO\n\t\t\t//this.body.applyCentralForce(new Ammo.btVector3(this.props.force.x,this.props.force.y,this.props.force.z))\n\t\t\tthis.body.applyCentralImpulse(new Ammo.btVector3(this.props.force.x,this.props.force.y,this.props.force.z))\n\t\t}\n\n\t\tlet ms = this.body.getMotionState()\n\t\tif (ms) {\n\t\t\tms.getWorldTransform(this.trans)\n\t\t\tvar p = this.trans.getOrigin()\n\t\t\tvar q = this.trans.getRotation()\n\t\t\tblob.mesh.position.set( p.x(), p.y(), p.z() )\n\t\t\tblob.mesh.quaternion.set( q.x(), q.y(), q.z(), q.w() )\n\t\t}\n\t}\n}\n\n/*\nfunction shootSphere () {\n    First, we need a ray from the camera.\n    Because we need a shooting position, and a shooting direction.\n  var vp = mat4.multiply([], projectionMatrix, viewMatrix)\n  var invVp = mat4.invert([], vp)\n\n  // get a single point on the camera ray.\n  var rayPoint = vec3.transformMat4([], [2.0 * mp[0] / canvas.width - 1.0, -2.0 * mp[1] / canvas.height + 1.0, 0.0], invVp)\n\n  // get the position of the camera.\n  var rayOrigin = vec3.transformMat4([], [0, 0, 0], mat4.invert([], viewMatrix))\n\n  var rayDir = vec3.normalize([], vec3.subtract([], rayPoint, rayOrigin))\n\n  // we release the ball a bit in front of the camera.\n  vec3.scaleAndAdd(rayOrigin, rayOrigin, rayDir, 4.4)\n\n    Next, create the sphere mesh\n  var mesh = primitiveSphere(1.0, {\n    segments: 16\n  })\n  var sphereMesh = new Mesh(mesh.cells, mesh.positions, mesh.normals)\n\n    Then, create the rigid body.\n  var mass = 1.0\n  var shape = new BtSphereShape(1)\n  shape.setMargin(0.05)\n  var motionState = new BtDefaultMotionState(new BtTransform(new BtQuaternion(0, 0, 0, 1), new BtVector3(rayOrigin[0], rayOrigin[1], rayOrigin[2])))\n\n  var localInertia = new BtVector3(0, 0, 0)\n  shape.calculateLocalInertia(mass, localInertia)\n\n  var ci = new BtRigidBodyConstructionInfo(mass, motionState, shape, localInertia)\n  var rigidBody = new BtRigidBody(ci)\n  physicsWorld.addRigidBody(rigidBody)\n\n    Now send the rigid body flying!\n  var POWER = 80.0\n  rigidBody.applyImpulse(new BtVector3(POWER * rayDir[0], POWER * rayDir[1], POWER * rayDir[2]), new BtVector3(rayOrigin[0], rayOrigin[1], rayOrigin[2]))\n\n  return {rigidBody: rigidBody, drawCall: sphereMesh, color: [1.0, 1.0, 1.0]}\n}\n\nvar transformTemp = new BtTransform()\n// extracts the model matrix from a rigid body.\nfunction getModelMatrix (rb) {\n  var ms = rb.getMotionState()\n\n  if (ms) {\n    ms.getWorldTransform(transformTemp)\n    var p = transformTemp.getOrigin()\n    var q = transformTemp.getRotation()\n\n    return mat4.fromRotationTranslation(\n      [], [q.x(), q.y(), q.z(), q.w()], [p.x(), p.y(), p.z()])\n  }\n}\n*/\n\n\n/*\n\nvarious kinds of primitives\n\nhttps://github.com/kripken/ammo.js/blob/master/examples/webgl_demo_terrain/index.html\n\n\n\t\t\t\tswitch ( objectType ) {\n\t\t\t\t\tcase 1:\n\t\t\t\t\t\t// Sphere\n\t\t\t\t\t\tvar radius = 1 + Math.random() * objectSize;\n\t\t\t\t\t\tthreeObject = new THREE.Mesh( new THREE.SphereGeometry( radius, 20, 20 ), createObjectMaterial() );\n\t\t\t\t\t\tshape = new Ammo.btSphereShape( radius );\n\t\t\t\t\t\tshape.setMargin( margin );\n\t\t\t\t\t\tbreak;\n\t\t\t\t\tcase 2:\n\t\t\t\t\t\t// Box\n\t\t\t\t\t\tvar sx = 1 + Math.random() * objectSize;\n\t\t\t\t\t\tvar sy = 1 + Math.random() * objectSize;\n\t\t\t\t\t\tvar sz = 1 + Math.random() * objectSize;\n\t\t\t\t\t\tthreeObject = new THREE.Mesh( new THREE.BoxGeometry( sx, sy, sz, 1, 1, 1 ), createObjectMaterial() );\n\t\t\t\t\t\tshape = new Ammo.btBoxShape( new Ammo.btVector3( sx * 0.5, sy * 0.5, sz * 0.5 ) );\n\t\t\t\t\t\tshape.setMargin( margin );\n\t\t\t\t\t\tbreak;\n\t\t\t\t\tcase 3:\n\t\t\t\t\t\t// Cylinder\n\t\t\t\t\t\tvar radius = 1 + Math.random() * objectSize;\n\t\t\t\t\t\tvar height = 1 + Math.random() * objectSize;\n\t\t\t\t\t\tthreeObject = new THREE.Mesh( new THREE.CylinderGeometry( radius, radius, height, 20, 1 ), createObjectMaterial() );\n\t\t\t\t\t\tshape = new Ammo.btCylinderShape( new Ammo.btVector3( radius, height * 0.5, radius ) );\n\t\t\t\t\t\tshape.setMargin( margin );\n\t\t\t\t\t\tbreak;\n\t\t\t\t\tdefault:\n\t\t\t\t\t\t// Cone\n\t\t\t\t\t\tvar radius = 1 + Math.random() * objectSize;\n\t\t\t\t\t\tvar height = 2 + Math.random() * objectSize;\n\t\t\t\t\t\tthreeObject = new THREE.Mesh( new THREE.CylinderGeometry( 0, radius, height, 20, 2 ), createObjectMaterial() );\n\t\t\t\t\t\tshape = new Ammo.btConeShape( radius, height );\n\t\t\t\t\t\tbreak;\n\t\t\t\t}\n\n*/\n\n\n\n//# sourceURL=webpack:///./src/js/BehaviorPhysics.js?");

/***/ }),

/***/ "./src/js/BehaviorProton.js":
/*!**********************************!*\
  !*** ./src/js/BehaviorProton.js ***!
  \**********************************/
/*! exports provided: BehaviorProton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorProton\", function() { return BehaviorProton; });\n\nclass BehaviorProton {\n\n\tconstructor(props,blob) {\n\t\tthis.props = props\n\t\tthis.particles = []\n\t\tthis.rateCount = 0\n\t\tthis.parentMesh = blob._findByProperty(\"isObject3D\")\n\t\tlet scene = blob.parent.scene // hack\n\t\tif(!scene) console.error(\"no scene\")\n\t\tthis.parentMesh.material.visible = false\n\t\tthis.initProton(this.parentMesh,scene)\n\t}\n\ttick(interval,blob) {\n        this.proton.update();\n\t}\n\n    initProton(mesh,scene) {\n        let proton = this.proton = new Proton();\n        let emitter1 = this.emitter1 = this.createEmitter({\n            p: {\n                x: -100,\n                y: 0\n            },\n            Body: this.createMesh(\"sphere\")\n        })\n        let emitter2 = this.emitter2 = this.createEmitter({\n            p: {\n                x: 100,\n                y: 0\n            },\n            Body: this.createMesh(\"cube\")\n        })\n        proton.addEmitter(emitter1)\n        proton.addEmitter(emitter2)\n        proton.addRender(new Proton.MeshRender(scene))\n        Proton.Debug.drawEmitter(proton, scene, emitter1)\n        Proton.Debug.drawEmitter(proton, scene, emitter2)\n    }\n\n    createMesh(geo) {\n        if (geo == \"sphere\") {\n            var geometry = new THREE.SphereGeometry(10, 8, 8);\n            var material = new THREE.MeshLambertMaterial({\n                color: \"#ff0000\"\n            });\n        } else {\n            var geometry = new THREE.BoxGeometry(20, 20, 20);\n            var material = new THREE.MeshLambertMaterial({\n                color: \"#00ffcc\"\n            });\n        }\n        var mesh = new THREE.Mesh(geometry, material);\n        return mesh;\n    }\n\n\tcreateEmitter(obj) {\n        var emitter = new Proton.Emitter();\n        emitter.rate = new Proton.Rate(new Proton.Span(5, 10), new Proton.Span(.1, .25));\n        emitter.addInitialize(new Proton.Mass(1));\n        emitter.addInitialize(new Proton.Radius(10));\n        emitter.addInitialize(new Proton.Life(2, 4));\n        emitter.addInitialize(new Proton.Body(obj.Body));\n        emitter.addInitialize(new Proton.Position(new Proton.BoxZone(100)));\n        emitter.addInitialize(new Proton.Velocity(200, new Proton.Vector3D(0, 1, 1), 30));\n        emitter.addBehaviour(new Proton.Rotate(\"random\", \"random\"));\n        emitter.addBehaviour(new Proton.Scale(1, 0.1));\n        //Gravity\n        emitter.addBehaviour(new Proton.Gravity(3));\n        emitter.p.x = obj.p.x;\n        emitter.p.y = obj.p.y;\n        emitter.emit();\n        return emitter;\n    }\n\n}\n\n/*\nsnow\n\n\n    function addProton() {\n        proton = new Proton();\n        emitter = new Proton.Emitter();\n        emitter.rate = new Proton.Rate(new Proton.Span(34, 48), new Proton.Span(.2, .5));\n        emitter.addInitialize(new Proton.Mass(1));\n        emitter.addInitialize(new Proton.Radius(new Proton.Span(10, 20)));\n        var position = new Proton.Position();\n        position.addZone(new Proton.BoxZone(2500, 10, 2500));\n        emitter.addInitialize(position);\n        emitter.addInitialize(new Proton.Life(5, 10));\n        emitter.addInitialize(new Proton.Body(createSnow()));\n        emitter.addInitialize(new Proton.Velocity(0, new Proton.Vector3D(0, -1, 0), 90));\n        emitter.addBehaviour(new Proton.RandomDrift(10, 1, 10, .05));\n        emitter.addBehaviour(new Proton.Rotate(\"random\", \"random\"));\n        emitter.addBehaviour(new Proton.Gravity(2));\n        var sceenZone = new Proton.ScreenZone(camera, renderer, 20, \"234\");\n        emitter.addBehaviour(new Proton.CrossZone(sceenZone, \"dead\"));\n        emitter.p.x = 0;\n        emitter.p.y = 800;\n        emitter.emit();\n        proton.addEmitter(emitter);\n        proton.addRender(new Proton.SpriteRender(scene));\n        //Proton.Debug.drawZone(proton,scene,new Proton.BoxZone(800, 10, 800));\n    }\n    function createSnow() {\n        var map = new THREE.TextureLoader().load(\"./img/snow.png\");\n        var material = new THREE.SpriteMaterial({\n            map: map,\n            transparent: true,\n            opacity: .5,\n            color: 0xffffff\n        });\n        return new THREE.Sprite(material);\n    }\n\n    */\n\n    /*\n\n     function addProton() {\n        proton = new Proton();\n        proton.addEmitter(createEmitter());\n        proton.addRender(new Proton.SpriteRender(scene));\n    }\n    function createSprite() {\n        var map = new THREE.TextureLoader().load(\"./img/dot.png\");\n        var material = new THREE.SpriteMaterial({\n            map: map,\n            color: 0xff0000,\n            blending: THREE.AdditiveBlending,\n            fog: true\n        });\n        return new THREE.Sprite(material);\n    }\n    function createEmitter() {\n        emitter = new Proton.Emitter();\n        emitter.rate = new Proton.Rate(new Proton.Span(10, 15), new Proton.Span(.05, .1));\n        emitter.addInitialize(new Proton.Body(createSprite()));\n        emitter.addInitialize(new Proton.Mass(1));\n        emitter.addInitialize(new Proton.Life(1, 3));\n        emitter.addInitialize(new Proton.Position(new Proton.SphereZone(20)));\n        emitter.addInitialize(new Proton.V(new Proton.Span(500, 800), new Proton.Vector3D(0, 1, 0), 30));\n        emitter.addBehaviour(new Proton.RandomDrift(10, 10, 10, .05));\n        //emitter.addBehaviour(new Proton.Alpha(1, 0.1));\n        emitter.addBehaviour(new Proton.Scale(new Proton.Span(2, 3.5), 0));\n        emitter.addBehaviour(new Proton.G(6));\n        emitter.addBehaviour(new Proton.Color('#FF0026', ['#ffff00', '#ffff11'], Infinity, Proton.easeOutSine));\n        emitter.p.x = 0;\n        emitter.p.y = -150;\n        emitter.emit();\n        return emitter;\n    }\n\n\n*/\n\n\n//# sourceURL=webpack:///./src/js/BehaviorProton.js?");

/***/ }),

/***/ "./src/js/BehaviorRenderer.js":
/*!************************************!*\
  !*** ./src/js/BehaviorRenderer.js ***!
  \************************************/
/*! exports provided: BehaviorRenderer, BehaviorCamera, BehaviorScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorRenderer\", function() { return BehaviorRenderer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorCamera\", function() { return BehaviorCamera; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorScene\", function() { return BehaviorScene; });\n\n\nclass BehaviorRenderer extends THREE.WebGLRenderer {\n\tconstructor(props,blob) {\n\t\tsuper({antialias:true,alpha:XRSupport.supportsARKit()})\n\t\tthis.setSize( window.innerWidth, window.innerHeight )\n\t\tthis.props = props\n\t\tthis.blob = blob\n\t\tthis.clock = new THREE.Clock()\n\t\tthis.scene = 0\n\t\tthis.camera = 0\n\t\tthis.pov = 0\n\n\t\tthis.PASSTHROUGH = XRSupport.supportsARKit()\n\t\tif(!this.PASSTHROUGH) {\n\t\t\tdocument.body.appendChild( this.domElement )\n\t\t\tthis.setAnimationLoop( this.render3.bind(this) )\n\t\t} else {\n\t\t\tthis.xr = new XRSupport({\n\t\t\t\trenderer:this,\n\t\t\t\tupdatePOV:this.updatePOV.bind(this),\n\t\t\t\tupdateCamera:this.updateCamera.bind(this),\n\t\t\t\tupdateScene:this.updateScene.bind(this),\n\t\t\t\trenderScene:this.renderScene.bind(this),\n\t\t\t\tcreateVirtualReality:false,\n\t\t\t\tshouldStartPresenting:true,\n\t\t\t\tuseComputervision:false,\n\t\t\t\tworldSensing:true,\n\t\t\t\talignEUS:true\n\t\t\t})\n\t\t}\n\t}\n\n\tupdatePOV(viewMatrix) {\n\t\tif(!this.pov) return\n\t\tthis.pov.matrixAutoUpdate = false\n\t\tthis.pov.matrix.fromArray(viewMatrix)\n\t\tthis.pov.updateMatrixWorld()\n\t}\n\n\tupdateCamera(projectionMatrix) {\n\t\tif(!this.camera) return\n\t\tthis.camera.projectionMatrix.fromArray(projectionMatrix)\n\t}\n\n\tupdateScene() {\n\t\tif(!this.scene || !this.camera) return\n\t\tthis.blob._tick(this.clock.getElapsedTime())\n\t}\n\n\trenderScene() {\n\t\tif(!this.scene || !this.camera) return\n\t\tthis.render(this.scene,this.camera)\n\t}\n\n\trender3() {\n\t\tif(!this.scene || !this.camera) return\n\t\tthis.updateScene()\n\t\tthis.renderScene()\n\t}\n\n\treset(scene,camera,pov) {\n\t\tthis.scene = scene\n\t\tthis.camera = camera\n\t\tthis.pov = camera\n\t}\n\n}\n\nclass BehaviorCamera extends THREE.PerspectiveCamera {\n\tconstructor(props,blob) {\n\t\tlet camera = super( 45, window.innerWidth/window.innerHeight, 0.1, 1000 )\n\t\tlet position = props.position || {x:0,y:1,z:10}\n\t\tlet lookat = props.lookat || {x:0,y:1,z:0}\n\t\tcamera.position.set(position.x,position.y,position.z)\n\t\tcamera.lookAt(lookat.x,lookat.y,lookat.z)\n\t\tvar light = new THREE.PointLight( 0xffffff, 1, 100 )\n\t\tcamera.add(light)\n\t}\n}\n\nclass BehaviorScene extends THREE.Scene {\n\tconstructor(props,blob) {\n\t\tsuper()\n\t\tblob._listen(\"child_added behavior scene\",this.on_child_added.bind(this))\n\t\t// add renderer by hand\n\t\tthis.renderer = blob.renderer = new BehaviorRenderer({},blob)\n\t\t// add a default camera by hand - can be overridden\n\t\tthis.camera = blob.camera = new BehaviorCamera({},blob)\n\t\t// set renderer to use this scene and default camera for now\n\t\tthis.renderer.reset(this,this.camera,this.camera)\n\t}\n\ton_child_added(args) {\n\t\tif(args.name != \"child_added\") return // TODO could look to see if a behavior_added was a camera also\n\t\tlet scene = this\n\t\tlet blob = args.parent\n\t\tObject.entries(args.child).forEach(([key,value])=>{\n\t\t\tif(value instanceof THREE.Object3D) {\n\t\t\t\tconsole.log(\"Scene: adding object \" + value.constructor.name )\n\t\t\t\tscene.add(value)\n\t\t\t}\n\t\t\tif(value instanceof THREE.PerspectiveCamera) {\n\t\t\t\t// TODO note that this does not notice cameras coming in as children of children etc - need a more global event system\n\t\t\t\tconsole.log(\"Scene: noticed another camera being added - using that instead\")\n\t\t\t\t// tell renderer about new camera\n\t\t\t\tblob.renderer.reset(this,value,value)\n\t\t\t}\n\t\t})\n\t}\n\tsetCamera(camera) {\n\t\tthis.renderer.camera = camera\n\t}\n}\n\n\n//# sourceURL=webpack:///./src/js/BehaviorRenderer.js?");

/***/ }),

/***/ "./src/js/BehaviorSky.js":
/*!*******************************!*\
  !*** ./src/js/BehaviorSky.js ***!
  \*******************************/
/*! exports provided: BehaviorSky */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorSky\", function() { return BehaviorSky; });\nclass BehaviorSky extends THREE.Mesh {\n\n\tconstructor(props={},blob=0) {\n\n\t\tlet sky_vertex = `\n\t\t\tvarying vec2 vUV;\n\t\t\tvoid main() {\n\t\t\t  vUV = uv;\n\t\t\t  vec4 pos = vec4(position, 1.0);\n\t\t\t  gl_Position = projectionMatrix * modelViewMatrix * pos;\n\t\t\t}\n\t\t\t`\n\t\tlet sky_fragment = `\n\t\t\tuniform sampler2D texture;\n\t\t\tvarying vec2 vUV;\n\n\t\t\tvoid main() {\n\t\t\t  vec4 sample = texture2D(texture, vUV);\n\t\t\t  gl_FragColor = vec4(sample.xyz, sample.w);\n\t\t\t}\n\t\t\t`\n\t\tvar geometry = new THREE.SphereGeometry(-500, 60, 40);\n\t\tvar skybox = props.art || '/art/eso0932a.jpg';\n\t\tvar uniforms = {\n\t\t  texture: { type: 't', value: THREE.ImageUtils.loadTexture(skybox) }\n\t\t}\n\t\tvar material = new THREE.ShaderMaterial( {\n\t\t  uniforms:       uniforms,\n\t\t  vertexShader:   sky_vertex,\n\t\t  fragmentShader: sky_fragment,\n\t\t})\n\t\tlet skyBox = super(geometry, material)\n\t\t// skyBox.scale.set(-1, 1, 1) - flipped the above sphere instead\n\t\tskyBox.renderDepth = 1000.0\n\t}\n\n\t/// set or reset qualities of this mesh\n\treset(props) {\n\n\t\tif(!props) return\n\n\t\t// save for future reference on changes\n\t\tthis.props = props\n\t}\n}\n\n\n//# sourceURL=webpack:///./src/js/BehaviorSky.js?");

/***/ }),

/***/ "./src/js/BehaviorText.js":
/*!********************************!*\
  !*** ./src/js/BehaviorText.js ***!
  \********************************/
/*! exports provided: BehaviorText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorText\", function() { return BehaviorText; });\n/* harmony import */ var _BehaviorMesh_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BehaviorMesh.js */ \"./src/js/BehaviorMesh.js\");\n\n\n\n///\n/// Text\n/// - could center TODO\n/// - could offer word wrap TODO\n/// - could combine 2d composited text layouts with this\n\nclass BehaviorText extends _BehaviorMesh_js__WEBPACK_IMPORTED_MODULE_0__[\"BehaviorMesh\"] {\n\tconstructor(props,blob) {\n\t\tprops.art = \"sphere\" // temporary\n\t\tsuper(props,blob)\n\t\tthis.props = props\n\t\tvar loader = new THREE.FontLoader();\n\t\tloader.load( 'fonts/helvetiker_bold.typeface.json', this.attachText.bind(this) )\n\t}\n\n\tattachText(font) {\n\t\tlet props = this.props\n\t\tlet text = props && props.say ? props.say : \"nothing\"\n\t\tlet size = props && props.size ? props.size : 1\n\t\tlet height = props && props.height ? props.height : 1\n\t\tlet color = props && props.color ? props.color : 0xFF00FF\n\t\tvar geometry = new THREE.TextGeometry(text, {\n\t\t\tfont: font,\n\t\t\tsize: size,\n\t\t\theight: height\n\t\t} )\n\t\tif(this.geometry) this.geometry.dispose()\n\t\tthis.geometry = geometry\n\t}\n\n}\n\n//# sourceURL=webpack:///./src/js/BehaviorText.js?");

/***/ }),

/***/ "./src/js/BehaviorTextPanel.js":
/*!*************************************!*\
  !*** ./src/js/BehaviorTextPanel.js ***!
  \*************************************/
/*! exports provided: BehaviorTextPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorTextPanel\", function() { return BehaviorTextPanel; });\n/* harmony import */ var _BehaviorMesh_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BehaviorMesh.js */ \"./src/js/BehaviorMesh.js\");\n\n\n\nclass BehaviorTextPanel extends _BehaviorMesh_js__WEBPACK_IMPORTED_MODULE_0__[\"BehaviorMesh\"] {\n\tconstructor(props,blob) {\n\t\tprops.art = \"sphere\" // temporary\n\t\tsuper(props,blob)\n\t\tthis.props = props\n\n\t\tlet material = this.makeMaterial(props.say || \"hello\")\n\t\tlet geometry = this.makeGeometry(1,1)\n\n\t\tif(this.material) this.material.dispose()\n\t\tthis.material = material\n\n\t\tif(this.geometry) this.geometry.dispose()\n\t\tthis.geometry = geometry\n\n\t}\n\n\tmakeGeometry(w,h) {\n\t\treturn new THREE.PlaneGeometry(w,h,10,10)\n\t}\n\n\tmakeMaterial(prettywords) {\n\n\t\t// Add a nice round rectangle feature\n\n\t\tCanvasRenderingContext2D.prototype.roundRect = function(sx,sy,ex,ey,r) {\n\t\t    var r2d = Math.PI/180;\n\t\t    if( ( ex - sx ) - ( 2 * r ) < 0 ) { r = ( ( ex - sx ) / 2 ); } //ensure that the radius isn't too large for x\n\t\t    if( ( ey - sy ) - ( 2 * r ) < 0 ) { r = ( ( ey - sy ) / 2 ); } //ensure that the radius isn't too large for y\n\t\t    this.beginPath();\n\t\t    this.moveTo(sx+r,sy);\n\t\t    this.lineTo(ex-r,sy);\n\t\t    this.arc(ex-r,sy+r,r,r2d*270,r2d*360,false);\n\t\t    this.lineTo(ex,ey-r);\n\t\t    this.arc(ex-r,ey-r,r,r2d*0,r2d*90,false);\n\t\t    this.lineTo(sx+r,ey);\n\t\t    this.arc(sx+r,ey-r,r,r2d*90,r2d*180,false);\n\t\t    this.lineTo(sx,sy+r);\n\t\t    this.arc(sx+r,sy+r,r,r2d*180,r2d*270,false);\n\t\t    this.closePath();\n\t\t}\n\n\t\t// a convenient bubble drawer\n\n\t\tfunction drawBubble(ctx, x, y, w, h, radius) {\n\t\t\tvar r = x + w;\n\t\t\tvar b = y + h;\n\t\t\tctx.beginPath();\n\t\t\tctx.strokeStyle=\"#30A030\";\n\t\t\tctx.lineWidth=\"6\";\n\t\t\tctx.moveTo(x+radius, y);\n\t\t\t//ctx.lineTo(x+radius/2, y-10);\n\t\t\t//ctx.lineTo(x+radius * 2, y);\n\t\t\tctx.lineTo(r-radius, y);\n\t\t\tctx.quadraticCurveTo(r, y, r, y+radius);\n\t\t\tctx.lineTo(r, y+h-radius);\n\t\t\tctx.quadraticCurveTo(r, b, r-radius, b);\n\t\t\tctx.lineTo(x+radius, b);\n\t\t\tctx.quadraticCurveTo(x, b, x, b-radius);\n\t\t\tctx.lineTo(x, y+radius);\n\t\t\tctx.quadraticCurveTo(x, y, x+radius, y);\n\t\t\tctx.stroke();\n\t\t}\n\n\t\t// a handy dandy text wrapper\n\t\t// TODO support line breaks\n\n\t\tfunction wrapText(context, text, x, y, maxWidth, lineHeight) {\n\t\t\tvar words = text.split(' ');\n\t\t\tvar line = '';\n\t\t\tfor(var n = 0; n < words.length; n++) {\n\t\t\t\tvar testLine = line + words[n] + ' '\n\t\t\t\tvar metrics = context.measureText(testLine);\n\t\t\t\tvar testWidth = metrics.width\n\t\t\t\tif (testWidth > maxWidth && n > 0) {\n\t\t\t\t\tcontext.fillText(line, x, y)\n\t\t\t\t\tline = words[n] + ' '\n\t\t\t\t\ty += lineHeight\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tline = testLine\n\t\t\t\t}\n\t\t\t}\n\t\t\tcontext.fillText(line, x, y)\n\t\t}\n\n\t\t// hack -TODO caller should be able to set these\n\t\tlet fsize = 60\n\t\tlet w = 1024\n\t\tlet h = 1024\n\n\t\t// a scratch canvas\n\t\t// TODO caller needs to be able to set various params here\n\n\t\tlet scratch = document.createElement(\"canvas\")\n\t\tscratch.width = w\n\t\tscratch.height = h\n\t\tlet context = scratch.getContext(\"2d\")\n\t\t//context.clearRect(0,0,w,h);\n\t\tcontext.font = fsize + \"pt Arial\"\n\t\t//context.textAlign = \"center\"\n\t\t//context.fillStyle = \"#000000\"\n\t\t//context.fillRect(0, 0, w, h)\n\t\tcontext.fillStyle = \"#cc00cc\"\n\t\tcontext.strokeStyle = \"#cc00cc\";\n\t\t//context.fillText(args, scratch.width / 2, scratch.height / 2)\n\n\t\t//\tcontext.roundRect(0,0,600,600,10).stroke(); //or .fill() for a filled rect\n\t\t//_cxt.roundRect(35,10,260,120,20);\n\t\t//_cxt.strokeStyle = \"#000\";\n\t\t//_cxt.stroke();\n\n\t\tdrawBubble(context,10,10,w-20,h-20,5)\n\n\t\twrapText(context,prettywords,fsize,fsize*1.5+2,w-fsize*2,fsize+2)\n\n\t\tlet texture = new THREE.Texture(scratch)\n\t\ttexture.needsUpdate = true\n\t\tlet material = new THREE.MeshBasicMaterial({map : texture})\n\n\t\treturn material\n\t}\n}\n\n//# sourceURL=webpack:///./src/js/BehaviorTextPanel.js?");

/***/ }),

/***/ "./src/js/BehaviorTick.js":
/*!********************************!*\
  !*** ./src/js/BehaviorTick.js ***!
  \********************************/
/*! exports provided: BehaviorTick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorTick\", function() { return BehaviorTick; });\nclass BehaviorTick {\n\tconstructor(props,blob) {\n\t\tthis.props = props\n\t}\n\ttick(interval,parent) {\n\t\tthis.props(interval,parent)\n\t}\n}\n\n//# sourceURL=webpack:///./src/js/BehaviorTick.js?");

/***/ }),

/***/ "./src/js/BehaviorWalk.js":
/*!********************************!*\
  !*** ./src/js/BehaviorWalk.js ***!
  \********************************/
/*! exports provided: BehaviorWalk */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorWalk\", function() { return BehaviorWalk; });\n\n///\n/// Associates keyboard control with a mesh\n///\n/// Typically I expect the user to add a camera nearby\n///\n\nclass BehaviorWalk {\n\n\tconstructor(props,blob) {\n\n\t\tthis.parentBehavior = blob._findByProperty(\"isObject3D\")\n\t\tif(!this.parentBehavior) {\n\t\t\tconsole.error(\"There needs to be some mesh associated with this behavior\")\n\t\t\treturn\n\t\t}\n\n\t\t// look around for a camera - TODO maybe user should pass a camera name if not making a camera?\n\t\tthis.camera = blob._findByProperty(\"isPerspectiveCamera\")\n\t\tif(!this.camera && blob._findChildByName(\"camera\")) {\n\t\t\tthis.camera = blob._findChildByName(\"camera\")._findByProperty(\"isPerspectiveCamera\")\n\t\t}\n\t\tif(!this.camera) {\n\t\t\tconsole.error(\"No camera found\")\n\t\t}\n\n\t\tthis.props = props\n\t\tthis.blob = blob\n\t\tthis.forward = new THREE.Vector3(0,0,0.1)\n\t\tthis.backward = new THREE.Vector3(0,0,-0.1)\n\t\tthis.left = new THREE.Euler(0,10*Math.PI/180.0,0)\n\t\tthis.right = new THREE.Euler(0,-10*Math.PI/180.0,0)\n\t\tdocument.addEventListener(\"keydown\", this.onKeyDown.bind(this), false)\n\t}\n\n\tonKeyDown(event) {\n\t\tif(!this.blob || !this.parentBehavior) {\n\t\t\tconsole.error(\"Needs a mesh\")\n\t\t\treturn\n\t\t}\n\t\tlet mesh = this.parentBehavior\n\t    switch(event.key) {\n\t    \tcase 'w': // up\n\t    \t\tmesh.physicsForce(this.forward,0)\n\t    \t\tbreak\n\t    \tcase 's': // down\n\t    \t\tmesh.physicsForce(this.backward,0)\n\t    \t\tbreak\n\t    \tcase 'a': // left\n\t    \t\tmesh.physicsForce(0,this.left)\n\t    \t\tbreak\n\t    \tcase 'd': // right\n\t    \t\tmesh.physicsForce(0,this.right)\n\t    \t\tbreak\n\t    \tcase 32: // space\n\t    \t\tmesh.physicsReset()\n\t    \t\tbreak\n\t    }\n\t}\n\n\ttick(interval,blob) {\n\n\t\tif(!this.camera) return\n\n\t\tlet xrmode = typeof window.webkit !== 'undefined'\n\n\t\t// if in vr mode then move camera to us\n\t\tif(!xrmode) {\n\t\t\tlet mesh = this.parentBehavior\n//\t\t\tthis.material.visible = false\n//\t\t\tthis.visible = false\n\t\t\t// find a position behind the object\n\t\t\tlet v = new THREE.Vector3(0,3,-10)\n\t\t\tv.applyMatrix4(mesh.matrixWorld)\n\t\t\tthis.camera.position.set(v.x,v.y,v.z)\n\t\t\t// look at the target\n\t\t\tthis.camera.lookAt(mesh.position)\n\t\t} else {\n\t\t\t// move this to the camera TODO TBD\n\t\t}\n\t}\n}\n\n\n\n//# sourceURL=webpack:///./src/js/BehaviorWalk.js?");

/***/ }),

/***/ "./src/js/Blob.js":
/*!************************!*\
  !*** ./src/js/Blob.js ***!
  \************************/
/*! exports provided: BehaviorChildren, Blob */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BehaviorChildren\", function() { return BehaviorChildren; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Blob\", function() { return Blob; });\n/* harmony import */ var _BehaviorRenderer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BehaviorRenderer.js */ \"./src/js/BehaviorRenderer.js\");\n/* harmony import */ var _BehaviorLight_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BehaviorLight.js */ \"./src/js/BehaviorLight.js\");\n/* harmony import */ var _BehaviorMesh_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BehaviorMesh.js */ \"./src/js/BehaviorMesh.js\");\n/* harmony import */ var _BehaviorSky_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BehaviorSky.js */ \"./src/js/BehaviorSky.js\");\n/* harmony import */ var _BehaviorHeart_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BehaviorHeart.js */ \"./src/js/BehaviorHeart.js\");\n/* harmony import */ var _BehaviorText_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BehaviorText.js */ \"./src/js/BehaviorText.js\");\n/* harmony import */ var _BehaviorTextPanel_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BehaviorTextPanel.js */ \"./src/js/BehaviorTextPanel.js\");\n/* harmony import */ var _BehaviorOrbit_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./BehaviorOrbit.js */ \"./src/js/BehaviorOrbit.js\");\n/* harmony import */ var _BehaviorWalk_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./BehaviorWalk.js */ \"./src/js/BehaviorWalk.js\");\n/* harmony import */ var _BehaviorBounce_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./BehaviorBounce.js */ \"./src/js/BehaviorBounce.js\");\n/* harmony import */ var _BehaviorParticles_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./BehaviorParticles.js */ \"./src/js/BehaviorParticles.js\");\n/* harmony import */ var _BehaviorProton_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./BehaviorProton.js */ \"./src/js/BehaviorProton.js\");\n/* harmony import */ var _BehaviorEmitter_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./BehaviorEmitter.js */ \"./src/js/BehaviorEmitter.js\");\n/* harmony import */ var _BehaviorPhysics_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./BehaviorPhysics.js */ \"./src/js/BehaviorPhysics.js\");\n/* harmony import */ var _BehaviorEvent_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./BehaviorEvent.js */ \"./src/js/BehaviorEvent.js\");\n/* harmony import */ var _BehaviorTick_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./BehaviorTick.js */ \"./src/js/BehaviorTick.js\");\n/* harmony import */ var _BehaviorCollide_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./BehaviorCollide.js */ \"./src/js/BehaviorCollide.js\");\n// Problem: This way of loading classes isn't available at the time of calling the Blob class:\n// Import to make available to the bundle:\n// Basic\n\n\n\n\n\n// Some fancy objects\n\n\n\n\n\n// Motion models for player\n\n\n\n// Some simple behaviors\n\n\n\n\n\n// Physics\n\n\n// Event handling\n\n\n\n\n///\n/// BlobChildren - a behavior similar to the above but supports nested children\n///\n\nlet UUID = 0\n\nclass BehaviorChildren {\n\tconstructor(props=0,blob=0) {\n\t\tthis._load_children(props,blob)\n\t}\n\t_load_children(props,blob) {\n\t\tif(!props || !blob) {\n\t\t\tconsole.error(\"Children must be attached to a parent\")\n\t\t\treturn\n\t\t}\n\t\tblob.children = this // slight hack, this would normally be set when the constructor returns, set it early so that find() works earlier\n\t\tthis.children = []\n\t\tfor(let i = 0; i < props.length; i++) {\n\t\t\tthis._load_child(props[i],blob)\n\t\t}\n\t}\n\n\t_load_child(details,blob) {\n\t\tlet name = details.name || ++UUID\n\t\tlet child = new Blob(details,blob)\n\t\tchild.name = name\n\t\tconsole.log(\"BlobChildren: adding child named \" + name )\n\t\tthis.children.push(child)\n\t\tblob._speak({ name:\"child_added\", child:child, parent:blob })\n\t}\n\n\tfind(name) {\n\t\tfor(let i = 0; i < this.children.length; i++) {\n\t\t\tif(this.children[i].name == name) return this.children[i]\n\t\t}\n\t\treturn 0\n\t}\n\ttick(interval=0.01) {\n\t\tfor(let i = 0; i < this.children.length; i++) {\n\t\t\tlet blob = this.children[i]\n\t\t\tblob._tick(interval)\n\t\t}\n\t}\n}\n\n///\n/// Blob acts a bucket to hold a collection of named behaviors\n///\n/// Behaviors in a blob have a back reference to the blob\n///\n/// TODO it would be nice to allow multiple instances of a given Behavior in some cases\n/// TODO interval for timing stability at various frame rates\n/// TODO remove having to pass blobs in tick\n///\n\nclass Blob {\n\tconstructor(details=0,parent=0) {\n\t\tconsole.log('building Blob', details, parent, typeof details)\n\t\tthis._details = details // save this so I can regenerate a blob from scratch if desired\n\t\tthis.parent = parent // parent is reserved - I wonder if I should switch this to use an _ to avoid polluting userland? TODO\n\t\tthis.behaviorRegistry = {\n\t\t\t'BehaviorRenderer': 'BehaviorRenderer.js',\n\t\t\t'BehaviorScene': 'BehaviorRenderer.js',\n\t\t\t'BehaviorCamera': 'BehaviorRenderer.js',\n\t\t\t'BehaviorLight': 'BehaviorLight.js',\n\t\t\t'BehaviorMesh': 'BehaviorMesh.js',\n\t\t\t// Some fancy objects\n\t\t\t'BehaviorSky': 'BehaviorSky.js',\n\t\t\t'BehaviorHeart': 'BehaviorHeart.js',\n\t\t\t'BehaviorText': 'BehaviorText.js',\n\t\t\t'BehaviorTextPanel': 'BehaviorTextPanel.js',\n\t\t\t// Motion models for player\n\t\t\t'BehaviorOrbit': 'BehaviorOrbit.js',\n\t\t\t'BehaviorWalk': 'BehaviorWalk.js',\n\t\t\t// Some simple behaviors\n\t\t\t'BehaviorLine': 'BehaviorBounce.js',\n\t\t\t'BehaviorBounce': 'BehaviorBounce.js',\n\t\t\t'BehaviorOscillate': 'BehaviorBounce.js',\n\t\t\t'BehaviorWander': 'BehaviorBounce.js',\n\t\t\t'BehaviorStare': 'BehaviorBounce.js',\n\t\t\t'BehaviorParticles': 'BehaviorParticles.js',\n\t\t\t'BehaviorProton': 'BehaviorProton.js',\n\t\t\t'BehaviorEmitter': 'BehaviorEmitter.js',\n\t\t\t// Physics\n\t\t\t'BehaviorPhysics': 'BehaviorPhysics.js',\n\t\t\t'BehaviorPhysical': 'BehaviorPhysics.js',\n\t\t\t// Event handling\n\t\t\t'BehaviorEvent': 'BehaviorEvent.js',\n\t\t\t'BehaviorTick': 'BehaviorTick.js',\n\t\t\t'BehaviorCollide': 'BehaviorCollide.js'\n\t\t};\n\t\ttry {\n\t\t\tif(!details) details = {}\n\t\t\tif(typeof details == 'string') {\n\t\t\t\t// load from a file\n\t\t\t\tthis._load_module(details)\n\t\t\t} else {\n\t\t\t\t// attach behaviors - behaviors are hashed directly into the blob class not as a .behaviors property\n\t\t\t\tthis._attach_behaviors(details)\n\t\t\t}\n\t\t} catch(e){\n\t\t\tconsole.error(e)\n\t\t}\n\t}\n\t_attach_behaviors(_behaviors={}) {\n\t\tconsole.log('b', _behaviors);\n\t\tObject.entries(_behaviors).forEach(([key,value])=>{\n\t\t\t// evaluate each keypair - a keypair is either a name+class behavior, or a name + literal value\n\t\t\tthis._attach_behavior(key,value)\n\t\t})\n\t}\n\t_attach_behavior(name,props) {\n\t\tlet blob = this\n\t\ttry {\n\t\t\t// skip past existing instances of behavior on object\n\t\t\tlet behavior = null\n\t\t\tlet savename = name\n\t\t\tfor(let count = 0;;count++) {\n\t\t\t\tsavename = name + (count ? count : \"\")\n\t\t\t\tbehavior = blob[savename]\n\t\t\t\tif(!behavior) break\n\t\t\t}\n\t\t\t// instance behavior\n\t\t\tif(true) {\n\t\t\t\tlet className = \"Behavior\"+name.charAt(0).toUpperCase() + name.slice(1);\n\t\t\t\tlet fileName = this.behaviorRegistry[className];\n\t\t\t\t// find the class\n\t\t\t\tlet scope = this\n\t\t\t\tconsole.log('fn', fileName);\n\t\t\t\tif (fileName !== undefined ) {\n\t\t\t\t\t__webpack_require__(\"./src/js lazy recursive ^\\\\.\\\\/.*$\")(\"./\" + fileName).then((module) => {\n\t\t\t\t\t\tlet keys = Object.keys(module)\n\t\t\t\t\t\tlet json = module[keys[0]]\n\t\t\t\t\t\tconsole.log(module);\n\n\t\t\t\t\t\t// let classRef = eval(className)\n\t\t\t\t\t\t// // instance a behavior passing it the bucket itself and the properties for the field\n\t\t\t\t\t\tlet behavior = new module[className](props,blob)\n\t\t\t\t\t\tscope._attach_behaviors(json)\n\n\t\t\t\t\t})\n\t\t\t\t}\n\n\n\t\t\t}\n\t\t} catch(e) {\n\t\t\tif(name == \"name\" || name==\"parent\") { // TODO mark out reserved by a search instead\n\t\t\t\tconsole.error(\"Blob: hit a reserved term\")\n\t\t\t} else {\n\t\t\t\tconsole.error(e)\n\t\t\t\tconsole.error(\"Blob::load: did not find class\")\n\t\t\t\t// store the value as a literal if no class contructor found\n\t\t\t\tblob[name] = props\n\t\t\t}\n\t\t}\n\t}\n\t/// listen for events on this blob with a filter - filter is ignored right now, no percolation of events\n\t_listen(filter,listener) {\n\t\tif(!this._listeners) this._listeners = []\n\t\tthis._listeners.push(listener)\n\t}\n\t/// send event to all listeners - no filtering right now\n\t_speak(args) {\n\t\tfor(let i = 0; this._listeners && i < this._listeners.length;i++) {\n\t\t\tlet listener = this._listeners[i]\n\t\t\tlistener(args)\n\t\t}\n\t}\n\t_tick(interval) {\n\t\t// a blob has a collection of properties, some of which may be behaviors\n\t\ttry {\n\t\t\tObject.entries(this).forEach(([key,value])=>{\n\t\t\t\tif(!value.tick) return\n\t\t\t\tvalue.tick(interval,this)\n\t\t\t})\n\t\t} catch(e) {\n\t\t\tconsole.error(e)\n\t\t}\n\t}\n\t_load_module(filename) {\n\t\tconsole.log('filename', filename);\n\t\tlet scope = this\n\t\t__webpack_require__(\"./src/js lazy recursive\")(filename).then((module) => {\n\t\t\tlet keys = Object.keys(module)\n\t\t\tlet json = module[keys[0]]\n\t\t\tscope._attach_behaviors(json)\n\t\t})\n\t}\n\t/// find a child in children - only searches first collection of children - and only if user named it\n\t/// TODO may want a flat global namespace\n\t/// TODO may want to call this _findGlobalByName or something\n\t_findChildByName(name) {\n\t\tif(!this.parent || !this.parent.children) return 0\n\t\treturn this.parent.children.find(name)\n\t}\n\t/// look at children properties and find first one that has a certain attribute\n\t_findByProperty(field) {\n\t\tlet keys = Object.keys(this)\n\t\tfor(let i = 0 ; i < keys.length; i++) {\n\t\t\tlet value = this[keys[i]]\n\t\t\tif(typeof value  === \"object\" && value[field]) {\n\t\t\t\treturn value\n\t\t\t}\n\t\t}\n\t\treturn 0\n\t}\n\t_copy() {\n\t\tif(!this.parent.children) {\n\t\t\tconsole.error(\"Warning: There's no children in this area to attach your new blob to\")\n\t\t\tlet blob = new Blob(this._details,this.parent)\n\t\t\treturn blob\n\t\t} else {\n\t\t\tlet blob = this.parent.children._load_child(this._details,this.parent)\n\t\t}\n\t}\n}\n\n\n//# sourceURL=webpack:///./src/js/Blob.js?");

/***/ })

/******/ });