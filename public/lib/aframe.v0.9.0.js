(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AFRAME = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
var str = Object.prototype.toString

module.exports = anArray

function anArray(arr) {
  return (
       arr.BYTES_PER_ELEMENT
    && str.call(arr.buffer) === '[object ArrayBuffer]'
    || Array.isArray(arr)
  )
}

},{}],2:[function(_dereq_,module,exports){
(function (global){
/*
 2017 Julian Garnier
 Released under the MIT license
*/
var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(e,r,p){if(p.get||p.set)throw new TypeError("ES3 does not support getters and setters.");e!=Array.prototype&&e!=Object.prototype&&(e[r]=p.value)};$jscomp.getGlobal=function(e){return"undefined"!=typeof window&&window===e?e:"undefined"!=typeof global&&null!=global?global:e};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(e){return $jscomp.SYMBOL_PREFIX+(e||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var e=$jscomp.global.Symbol.iterator;e||(e=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[e]&&$jscomp.defineProperty(Array.prototype,e,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(e){var r=0;return $jscomp.iteratorPrototype(function(){return r<e.length?{done:!1,value:e[r++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(e){$jscomp.initSymbolIterator();e={next:e};e[$jscomp.global.Symbol.iterator]=function(){return this};return e};$jscomp.array=$jscomp.array||{};$jscomp.iteratorFromArray=function(e,r){$jscomp.initSymbolIterator();e instanceof String&&(e+="");var p=0,m={next:function(){if(p<e.length){var u=p++;return{value:r(u,e[u]),done:!1}}m.next=function(){return{done:!0,value:void 0}};return m.next()}};m[Symbol.iterator]=function(){return m};return m};
$jscomp.polyfill=function(e,r,p,m){if(r){p=$jscomp.global;e=e.split(".");for(m=0;m<e.length-1;m++){var u=e[m];u in p||(p[u]={});p=p[u]}e=e[e.length-1];m=p[e];r=r(m);r!=m&&null!=r&&$jscomp.defineProperty(p,e,{configurable:!0,writable:!0,value:r})}};$jscomp.polyfill("Array.prototype.keys",function(e){return e?e:function(){return $jscomp.iteratorFromArray(this,function(e){return e})}},"es6-impl","es3");var $jscomp$this=this;
(function(e,r){"function"===typeof define&&define.amd?define([],r):"object"===typeof module&&module.exports?module.exports=r():e.anime=r()})(this,function(){function e(a){if(!h.col(a))try{return document.querySelectorAll(a)}catch(c){}}function r(a,c){for(var d=a.length,b=2<=arguments.length?arguments[1]:void 0,f=[],n=0;n<d;n++)if(n in a){var k=a[n];c.call(b,k,n,a)&&f.push(k)}return f}function p(a){return a.reduce(function(a,d){return a.concat(h.arr(d)?p(d):d)},[])}function m(a){if(h.arr(a))return a;
h.str(a)&&(a=e(a)||a);return a instanceof NodeList||a instanceof HTMLCollection?[].slice.call(a):[a]}function u(a,c){return a.some(function(a){return a===c})}function C(a){var c={},d;for(d in a)c[d]=a[d];return c}function D(a,c){var d=C(a),b;for(b in a)d[b]=c.hasOwnProperty(b)?c[b]:a[b];return d}function z(a,c){var d=C(a),b;for(b in c)d[b]=h.und(a[b])?c[b]:a[b];return d}function T(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,c,d,k){return c+c+d+d+k+k});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
a=parseInt(c[1],16);var d=parseInt(c[2],16),c=parseInt(c[3],16);return"rgba("+a+","+d+","+c+",1)"}function U(a){function c(a,c,b){0>b&&(b+=1);1<b&&--b;return b<1/6?a+6*(c-a)*b:.5>b?c:b<2/3?a+(c-a)*(2/3-b)*6:a}var d=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(a);a=parseInt(d[1])/360;var b=parseInt(d[2])/100,f=parseInt(d[3])/100,d=d[4]||1;if(0==b)f=b=a=f;else{var n=.5>f?f*(1+b):f+b-f*b,k=2*f-n,f=c(k,n,a+1/3),b=c(k,n,a);a=c(k,n,a-1/3)}return"rgba("+
255*f+","+255*b+","+255*a+","+d+")"}function y(a){if(a=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(a))return a[2]}function V(a){if(-1<a.indexOf("translate")||"perspective"===a)return"px";if(-1<a.indexOf("rotate")||-1<a.indexOf("skew"))return"deg"}function I(a,c){return h.fnc(a)?a(c.target,c.id,c.total):a}function E(a,c){if(c in a.style)return getComputedStyle(a).getPropertyValue(c.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function J(a,c){if(h.dom(a)&&
u(W,c))return"transform";if(h.dom(a)&&(a.getAttribute(c)||h.svg(a)&&a[c]))return"attribute";if(h.dom(a)&&"transform"!==c&&E(a,c))return"css";if(null!=a[c])return"object"}function X(a,c){var d=V(c),d=-1<c.indexOf("scale")?1:0+d;a=a.style.transform;if(!a)return d;for(var b=[],f=[],n=[],k=/(\w+)\((.+?)\)/g;b=k.exec(a);)f.push(b[1]),n.push(b[2]);a=r(n,function(a,b){return f[b]===c});return a.length?a[0]:d}function K(a,c){switch(J(a,c)){case "transform":return X(a,c);case "css":return E(a,c);case "attribute":return a.getAttribute(c)}return a[c]||
0}function L(a,c){var d=/^(\*=|\+=|-=)/.exec(a);if(!d)return a;var b=y(a)||0;c=parseFloat(c);a=parseFloat(a.replace(d[0],""));switch(d[0][0]){case "+":return c+a+b;case "-":return c-a+b;case "*":return c*a+b}}function F(a,c){return Math.sqrt(Math.pow(c.x-a.x,2)+Math.pow(c.y-a.y,2))}function M(a){a=a.points;for(var c=0,d,b=0;b<a.numberOfItems;b++){var f=a.getItem(b);0<b&&(c+=F(d,f));d=f}return c}function N(a){if(a.getTotalLength)return a.getTotalLength();switch(a.tagName.toLowerCase()){case "circle":return 2*
Math.PI*a.getAttribute("r");case "rect":return 2*a.getAttribute("width")+2*a.getAttribute("height");case "line":return F({x:a.getAttribute("x1"),y:a.getAttribute("y1")},{x:a.getAttribute("x2"),y:a.getAttribute("y2")});case "polyline":return M(a);case "polygon":var c=a.points;return M(a)+F(c.getItem(c.numberOfItems-1),c.getItem(0))}}function Y(a,c){function d(b){b=void 0===b?0:b;return a.el.getPointAtLength(1<=c+b?c+b:0)}var b=d(),f=d(-1),n=d(1);switch(a.property){case "x":return b.x;case "y":return b.y;
case "angle":return 180*Math.atan2(n.y-f.y,n.x-f.x)/Math.PI}}function O(a,c){var d=/-?\d*\.?\d+/g,b;b=h.pth(a)?a.totalLength:a;if(h.col(b))if(h.rgb(b)){var f=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(b);b=f?"rgba("+f[1]+",1)":b}else b=h.hex(b)?T(b):h.hsl(b)?U(b):void 0;else f=(f=y(b))?b.substr(0,b.length-f.length):b,b=c&&!/\s/g.test(b)?f+c:f;b+="";return{original:b,numbers:b.match(d)?b.match(d).map(Number):[0],strings:h.str(a)||c?b.split(d):[]}}function P(a){a=a?p(h.arr(a)?a.map(m):m(a)):[];return r(a,
function(a,d,b){return b.indexOf(a)===d})}function Z(a){var c=P(a);return c.map(function(a,b){return{target:a,id:b,total:c.length}})}function aa(a,c){var d=C(c);if(h.arr(a)){var b=a.length;2!==b||h.obj(a[0])?h.fnc(c.duration)||(d.duration=c.duration/b):a={value:a}}return m(a).map(function(a,b){b=b?0:c.delay;a=h.obj(a)&&!h.pth(a)?a:{value:a};h.und(a.delay)&&(a.delay=b);return a}).map(function(a){return z(a,d)})}function ba(a,c){var d={},b;for(b in a){var f=I(a[b],c);h.arr(f)&&(f=f.map(function(a){return I(a,
c)}),1===f.length&&(f=f[0]));d[b]=f}d.duration=parseFloat(d.duration);d.delay=parseFloat(d.delay);return d}function ca(a){return h.arr(a)?A.apply(this,a):Q[a]}function da(a,c){var d;return a.tweens.map(function(b){b=ba(b,c);var f=b.value,e=K(c.target,a.name),k=d?d.to.original:e,k=h.arr(f)?f[0]:k,w=L(h.arr(f)?f[1]:f,k),e=y(w)||y(k)||y(e);b.from=O(k,e);b.to=O(w,e);b.start=d?d.end:a.offset;b.end=b.start+b.delay+b.duration;b.easing=ca(b.easing);b.elasticity=(1E3-Math.min(Math.max(b.elasticity,1),999))/
1E3;b.isPath=h.pth(f);b.isColor=h.col(b.from.original);b.isColor&&(b.round=1);return d=b})}function ea(a,c){return r(p(a.map(function(a){return c.map(function(b){var c=J(a.target,b.name);if(c){var d=da(b,a);b={type:c,property:b.name,animatable:a,tweens:d,duration:d[d.length-1].end,delay:d[0].delay}}else b=void 0;return b})})),function(a){return!h.und(a)})}function R(a,c,d,b){var f="delay"===a;return c.length?(f?Math.min:Math.max).apply(Math,c.map(function(b){return b[a]})):f?b.delay:d.offset+b.delay+
b.duration}function fa(a){var c=D(ga,a),d=D(S,a),b=Z(a.targets),f=[],e=z(c,d),k;for(k in a)e.hasOwnProperty(k)||"targets"===k||f.push({name:k,offset:e.offset,tweens:aa(a[k],d)});a=ea(b,f);return z(c,{children:[],animatables:b,animations:a,duration:R("duration",a,c,d),delay:R("delay",a,c,d)})}function q(a){function c(){return window.Promise&&new Promise(function(a){return p=a})}function d(a){return g.reversed?g.duration-a:a}function b(a){for(var b=0,c={},d=g.animations,f=d.length;b<f;){var e=d[b],
k=e.animatable,h=e.tweens,n=h.length-1,l=h[n];n&&(l=r(h,function(b){return a<b.end})[0]||l);for(var h=Math.min(Math.max(a-l.start-l.delay,0),l.duration)/l.duration,w=isNaN(h)?1:l.easing(h,l.elasticity),h=l.to.strings,p=l.round,n=[],m=void 0,m=l.to.numbers.length,t=0;t<m;t++){var x=void 0,x=l.to.numbers[t],q=l.from.numbers[t],x=l.isPath?Y(l.value,w*x):q+w*(x-q);p&&(l.isColor&&2<t||(x=Math.round(x*p)/p));n.push(x)}if(l=h.length)for(m=h[0],w=0;w<l;w++)p=h[w+1],t=n[w],isNaN(t)||(m=p?m+(t+p):m+(t+" "));
else m=n[0];ha[e.type](k.target,e.property,m,c,k.id);e.currentValue=m;b++}if(b=Object.keys(c).length)for(d=0;d<b;d++)H||(H=E(document.body,"transform")?"transform":"-webkit-transform"),g.animatables[d].target.style[H]=c[d].join(" ");g.currentTime=a;g.progress=a/g.duration*100}function f(a){if(g[a])g[a](g)}function e(){g.remaining&&!0!==g.remaining&&g.remaining--}function k(a){var k=g.duration,n=g.offset,w=n+g.delay,r=g.currentTime,x=g.reversed,q=d(a);if(g.children.length){var u=g.children,v=u.length;
if(q>=g.currentTime)for(var G=0;G<v;G++)u[G].seek(q);else for(;v--;)u[v].seek(q)}if(q>=w||!k)g.began||(g.began=!0,f("begin")),f("run");if(q>n&&q<k)b(q);else if(q<=n&&0!==r&&(b(0),x&&e()),q>=k&&r!==k||!k)b(k),x||e();f("update");a>=k&&(g.remaining?(t=h,"alternate"===g.direction&&(g.reversed=!g.reversed)):(g.pause(),g.completed||(g.completed=!0,f("complete"),"Promise"in window&&(p(),m=c()))),l=0)}a=void 0===a?{}:a;var h,t,l=0,p=null,m=c(),g=fa(a);g.reset=function(){var a=g.direction,c=g.loop;g.currentTime=
0;g.progress=0;g.paused=!0;g.began=!1;g.completed=!1;g.reversed="reverse"===a;g.remaining="alternate"===a&&1===c?2:c;b(0);for(a=g.children.length;a--;)g.children[a].reset()};g.tick=function(a){h=a;t||(t=h);k((l+h-t)*q.speed)};g.seek=function(a){k(d(a))};g.pause=function(){var a=v.indexOf(g);-1<a&&v.splice(a,1);g.paused=!0};g.play=function(){g.paused&&(g.paused=!1,t=0,l=d(g.currentTime),v.push(g),B||ia())};g.reverse=function(){g.reversed=!g.reversed;t=0;l=d(g.currentTime)};g.restart=function(){g.pause();
g.reset();g.play()};g.finished=m;g.reset();g.autoplay&&g.play();return g}var ga={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},S={duration:1E3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},W="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "),H,h={arr:function(a){return Array.isArray(a)},obj:function(a){return-1<Object.prototype.toString.call(a).indexOf("Object")},
pth:function(a){return h.obj(a)&&a.hasOwnProperty("totalLength")},svg:function(a){return a instanceof SVGElement},dom:function(a){return a.nodeType||h.svg(a)},str:function(a){return"string"===typeof a},fnc:function(a){return"function"===typeof a},und:function(a){return"undefined"===typeof a},hex:function(a){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)},rgb:function(a){return/^rgb/.test(a)},hsl:function(a){return/^hsl/.test(a)},col:function(a){return h.hex(a)||h.rgb(a)||h.hsl(a)}},A=function(){function a(a,
d,b){return(((1-3*b+3*d)*a+(3*b-6*d))*a+3*d)*a}return function(c,d,b,f){if(0<=c&&1>=c&&0<=b&&1>=b){var e=new Float32Array(11);if(c!==d||b!==f)for(var k=0;11>k;++k)e[k]=a(.1*k,c,b);return function(k){if(c===d&&b===f)return k;if(0===k)return 0;if(1===k)return 1;for(var h=0,l=1;10!==l&&e[l]<=k;++l)h+=.1;--l;var l=h+(k-e[l])/(e[l+1]-e[l])*.1,n=3*(1-3*b+3*c)*l*l+2*(3*b-6*c)*l+3*c;if(.001<=n){for(h=0;4>h;++h){n=3*(1-3*b+3*c)*l*l+2*(3*b-6*c)*l+3*c;if(0===n)break;var m=a(l,c,b)-k,l=l-m/n}k=l}else if(0===
n)k=l;else{var l=h,h=h+.1,g=0;do m=l+(h-l)/2,n=a(m,c,b)-k,0<n?h=m:l=m;while(1e-7<Math.abs(n)&&10>++g);k=m}return a(k,d,f)}}}}(),Q=function(){function a(a,b){return 0===a||1===a?a:-Math.pow(2,10*(a-1))*Math.sin(2*(a-1-b/(2*Math.PI)*Math.asin(1))*Math.PI/b)}var c="Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),d={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],a],Out:[[.25,
.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(b,c){return 1-a(1-b,c)}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(b,c){return.5>b?a(2*b,c)/2:1-a(-2*b+2,c)/2}]},b={linear:A(.25,.25,.75,.75)},f={},e;for(e in d)f.type=e,d[f.type].forEach(function(a){return function(d,f){b["ease"+a.type+c[f]]=h.fnc(d)?
d:A.apply($jscomp$this,d)}}(f)),f={type:f.type};return b}(),ha={css:function(a,c,d){return a.style[c]=d},attribute:function(a,c,d){return a.setAttribute(c,d)},object:function(a,c,d){return a[c]=d},transform:function(a,c,d,b,f){b[f]||(b[f]=[]);b[f].push(c+"("+d+")")}},v=[],B=0,ia=function(){function a(){B=requestAnimationFrame(c)}function c(c){var b=v.length;if(b){for(var d=0;d<b;)v[d]&&v[d].tick(c),d++;a()}else cancelAnimationFrame(B),B=0}return a}();q.version="2.2.0";q.speed=1;q.running=v;q.remove=
function(a){a=P(a);for(var c=v.length;c--;)for(var d=v[c],b=d.animations,f=b.length;f--;)u(a,b[f].animatable.target)&&(b.splice(f,1),b.length||d.pause())};q.getValue=K;q.path=function(a,c){var d=h.str(a)?e(a)[0]:a,b=c||100;return function(a){return{el:d,property:a,totalLength:N(d)*(b/100)}}};q.setDashoffset=function(a){var c=N(a);a.setAttribute("stroke-dasharray",c);return c};q.bezier=A;q.easings=Q;q.timeline=function(a){var c=q(a);c.pause();c.duration=0;c.add=function(d){c.children.forEach(function(a){a.began=
!0;a.completed=!0});m(d).forEach(function(b){var d=z(b,D(S,a||{}));d.targets=d.targets||a.targets;b=c.duration;var e=d.offset;d.autoplay=!1;d.direction=c.direction;d.offset=h.und(e)?b:L(e,b);c.began=!0;c.completed=!0;c.seek(d.offset);d=q(d);d.began=!0;d.completed=!0;d.duration>b&&(c.duration=d.duration);c.children.push(d)});c.seek(0);c.reset();c.autoplay&&c.restart();return c};return c};q.random=function(a,c){return Math.floor(Math.random()*(c-a+1))+a};return q});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(_dereq_,module,exports){
module.exports = function numtype(num, def) {
	return typeof num === 'number'
		? num
		: (typeof def === 'number' ? def : 0)
}
},{}],4:[function(_dereq_,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],5:[function(_dereq_,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }

        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            head.appendChild(style);
        } else if (style.styleSheet) { // for IE8 and below
            head.appendChild(style);
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            head.appendChild(style);
        }
    }
};

},{}],6:[function(_dereq_,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],7:[function(_dereq_,module,exports){
var Buffer = _dereq_('buffer').Buffer; // for use with browserify

module.exports = function (a, b) {
    if (!Buffer.isBuffer(a)) return undefined;
    if (!Buffer.isBuffer(b)) return undefined;
    if (typeof a.equals === 'function') return a.equals(b);
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
};

},{"buffer":8}],8:[function(_dereq_,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = _dereq_('base64-js')
var ieee754 = _dereq_('ieee754')
var isArray = _dereq_('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"base64-js":4,"ieee754":19,"isarray":9}],9:[function(_dereq_,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],10:[function(_dereq_,module,exports){
// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

(function() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    var ce = new window.CustomEvent('test', { cancelable: true });
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
      // IE has problems with .preventDefault() on custom events
      // http://stackoverflow.com/questions/23349191
      throw new Error('Could not prevent default');
    }
  } catch (e) {
    var CustomEvent = function(event, params) {
      var evt, origPrevent;
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };

      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      );
      origPrevent = evt.preventDefault;
      evt.preventDefault = function() {
        origPrevent.call(this);
        try {
          Object.defineProperty(this, 'defaultPrevented', {
            get: function() {
              return true;
            }
          });
        } catch (e) {
          this.defaultPrevented = true;
        }
      };
      return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent; // expose definition to window
  }
})();

},{}],11:[function(_dereq_,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = _dereq_('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ');

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

},{"./debug":12}],12:[function(_dereq_,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{}],13:[function(_dereq_,module,exports){
'use strict';
var isObj = _dereq_('is-obj');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Sources cannot be null or undefined');
	}

	return Object(val);
}

function assignKey(to, from, key) {
	var val = from[key];

	if (val === undefined || val === null) {
		return;
	}

	if (hasOwnProperty.call(to, key)) {
		if (to[key] === undefined || to[key] === null) {
			throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
		}
	}

	if (!hasOwnProperty.call(to, key) || !isObj(val)) {
		to[key] = val;
	} else {
		to[key] = assign(Object(to[key]), from[key]);
	}
}

function assign(to, from) {
	if (to === from) {
		return to;
	}

	from = Object(from);

	for (var key in from) {
		if (hasOwnProperty.call(from, key)) {
			assignKey(to, from, key);
		}
	}

	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(from);

		for (var i = 0; i < symbols.length; i++) {
			if (propIsEnumerable.call(from, symbols[i])) {
				assignKey(to, from, symbols[i]);
			}
		}
	}

	return to;
}

module.exports = function deepAssign(target) {
	target = toObject(target);

	for (var s = 1; s < arguments.length; s++) {
		assign(target, arguments[s]);
	}

	return target;
};

},{"is-obj":24}],14:[function(_dereq_,module,exports){
/*! (C) WebReflection Mit Style License */
(function(t,n,r,i){"use strict";function st(e,t){for(var n=0,r=e.length;n<r;n++)gt(e[n],t)}function ot(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],it(r,w[at(r)])}function ut(e){return function(t){F(t)&&(gt(t,e),st(t.querySelectorAll(E),e))}}function at(e){var t=R.call(e,"is"),n=e.nodeName.toUpperCase(),r=x.call(b,t?m+t.toUpperCase():v+n);return t&&-1<r&&!ft(n,t)?-1:r}function ft(e,t){return-1<E.indexOf(e+'[is="'+t+'"]')}function lt(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target;Y&&(!i||i===t)&&t.attributeChangedCallback&&r!=="style"&&e.prevValue!==e.newValue&&t.attributeChangedCallback(r,n===e[f]?null:e.prevValue,n===e[c]?null:e.newValue)}function ct(e){var t=ut(e);return function(e){$.push(t,e.target)}}function ht(e){G&&(G=!1,e.currentTarget.removeEventListener(p,ht)),st((e.target||n).querySelectorAll(E),e.detail===u?u:o),j&&vt()}function pt(e,t){var n=this;U.call(n,e,t),Z.call(n,{target:n})}function dt(e,t){P(e,t),nt?nt.observe(e,X):(Q&&(e.setAttribute=pt,e[s]=tt(e),e.addEventListener(d,Z)),e.addEventListener(h,lt)),e.createdCallback&&Y&&(e.created=!0,e.createdCallback(),e.created=!1)}function vt(){for(var e,t=0,n=I.length;t<n;t++)e=I[t],S.contains(e)||(n--,I.splice(t--,1),gt(e,u))}function mt(e){throw new Error("A "+e+" type is already registered")}function gt(e,t){var n,r=at(e);-1<r&&(rt(e,w[r]),r=0,t===o&&!e[o]?(e[u]=!1,e[o]=!0,r=1,j&&x.call(I,e)<0&&I.push(e)):t===u&&!e[u]&&(e[o]=!1,e[u]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(i in n)return;var s="__"+i+(Math.random()*1e5>>0),o="attached",u="detached",a="extends",f="ADDITION",l="MODIFICATION",c="REMOVAL",h="DOMAttrModified",p="DOMContentLoaded",d="DOMSubtreeModified",v="<",m="=",g=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,y=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],b=[],w=[],E="",S=n.documentElement,x=b.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},T=r.prototype,N=T.hasOwnProperty,C=T.isPrototypeOf,k=r.defineProperty,L=r.getOwnPropertyDescriptor,A=r.getOwnPropertyNames,O=r.getPrototypeOf,M=r.setPrototypeOf,_=!!r.__proto__,D=r.create||function yt(e){return e?(yt.prototype=e,new yt):this},P=M||(_?function(e,t){return e.__proto__=t,e}:A&&L?function(){function e(e,t){for(var n,r=A(t),i=0,s=r.length;i<s;i++)n=r[i],N.call(e,n)||k(e,n,L(t,n))}return function(t,n){do e(t,n);while((n=O(n))&&!C.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),H=t.MutationObserver||t.WebKitMutationObserver,B=(t.HTMLElement||t.Element||t.Node).prototype,j=!C.call(B,S),F=j?function(e){return e.nodeType===1}:function(e){return C.call(B,e)},I=j&&[],q=B.cloneNode,R=B.getAttribute,U=B.setAttribute,z=B.removeAttribute,W=n.createElement,X=H&&{attributes:!0,characterData:!0,attributeOldValue:!0},V=H||function(e){Q=!1,S.removeEventListener(h,V)},$,J=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,10)},K=!1,Q=!0,G=!0,Y=!0,Z,et,tt,nt,rt,it;M||_?(rt=function(e,t){C.call(t,e)||dt(e,t)},it=dt):(rt=function(e,t){e[s]||(e[s]=r(!0),dt(e,t))},it=rt),j?(Q=!1,function(){var t=L(B,"addEventListener"),n=t.value,r=function(e){var t=new CustomEvent(h,{bubbles:!0});t.attrName=e,t.prevValue=R.call(this,e),t.newValue=null,t[c]=t.attrChange=2,z.call(this,e),this.dispatchEvent(t)},i=function(t,n){var r=this.hasAttribute(t),i=r&&R.call(this,t);e=new CustomEvent(h,{bubbles:!0}),U.call(this,t,n),e.attrName=t,e.prevValue=r?i:null,e.newValue=n,r?e[l]=e.attrChange=1:e[f]=e.attrChange=0,this.dispatchEvent(e)},o=function(e){var t=e.currentTarget,n=t[s],r=e.propertyName,i;n.hasOwnProperty(r)&&(n=n[r],i=new CustomEvent(h,{bubbles:!0}),i.attrName=n.name,i.prevValue=n.value||null,i.newValue=n.value=t[r]||null,i.prevValue==null?i[f]=i.attrChange=0:i[l]=i.attrChange=1,t.dispatchEvent(i))};t.value=function(e,t,u){e===h&&this.attributeChangedCallback&&this.setAttribute!==i&&(this[s]={className:{name:"class",value:this.className}},this.setAttribute=i,this.removeAttribute=r,n.call(this,"propertychange",o)),n.call(this,e,t,u)},k(B,"addEventListener",t)}()):H||(S.addEventListener(h,V),S.setAttribute(s,1),S.removeAttribute(s),Q&&(Z=function(e){var t=this,n,r,i;if(t===e.target){n=t[s],t[s]=r=tt(t);for(i in r){if(!(i in n))return et(0,t,i,n[i],r[i],f);if(r[i]!==n[i])return et(1,t,i,n[i],r[i],l)}for(i in n)if(!(i in r))return et(2,t,i,n[i],r[i],c)}},et=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,lt(o)},tt=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),n[i]=function(t,r){c=t.toUpperCase(),K||(K=!0,H?(nt=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new H(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,Y&&s.attributeChangedCallback&&i.attributeName!=="style"&&(o=R.call(s,i.attributeName),o!==i.oldValue&&s.attributeChangedCallback(i.attributeName,i.oldValue,o)))})}(ut(o),ut(u)),nt.observe(n,{childList:!0,subtree:!0})):($=[],J(function d(){while($.length)$.shift().call(null,$.shift());J(d)}),n.addEventListener("DOMNodeInserted",ct(o)),n.addEventListener("DOMNodeRemoved",ct(u))),n.addEventListener(p,ht),n.addEventListener("readystatechange",ht),n.createElement=function(e,t){var r=W.apply(n,arguments),i=""+e,s=x.call(b,(t?m:v)+(t||i).toUpperCase()),o=-1<s;return t&&(r.setAttribute("is",t=t.toLowerCase()),o&&(o=ft(i.toUpperCase(),t))),Y=!n.createElement.innerHTMLHelper,o&&it(r,w[s]),r},B.cloneNode=function(e){var t=q.call(this,!!e),n=at(t);return-1<n&&it(t,w[n]),e&&ot(t.querySelectorAll(E)),t}),-2<x.call(b,m+c)+x.call(b,v+c)&&mt(t);if(!g.test(c)||-1<x.call(y,c))throw new Error("The type "+t+" is invalid");var i=function(){return f?n.createElement(l,c):n.createElement(l)},s=r||T,f=N.call(s,a),l=f?r[a].toUpperCase():c,c,h;return f&&-1<x.call(b,v+l)&&mt(l),h=b.push((f?m:v)+c)-1,E=E.concat(E.length?",":"",f?l+'[is="'+t.toLowerCase()+'"]':l),i.prototype=w[h]=N.call(s,"prototype")?s.prototype:D(B),st(n.querySelectorAll(E),o),i}})(window,document,Object,"registerElement");
},{}],15:[function(_dereq_,module,exports){
module.exports = function(dtype) {
  switch (dtype) {
    case 'int8':
      return Int8Array
    case 'int16':
      return Int16Array
    case 'int32':
      return Int32Array
    case 'uint8':
      return Uint8Array
    case 'uint16':
      return Uint16Array
    case 'uint32':
      return Uint32Array
    case 'float32':
      return Float32Array
    case 'float64':
      return Float64Array
    case 'array':
      return Array
    case 'uint8_clamped':
      return Uint8ClampedArray
  }
}

},{}],16:[function(_dereq_,module,exports){
/*eslint new-cap:0*/
var dtype = _dereq_('dtype')

module.exports = flattenVertexData

function flattenVertexData (data, output, offset) {
  if (!data) throw new TypeError('must specify data as first parameter')
  offset = +(offset || 0) | 0

  if (Array.isArray(data) && (data[0] && typeof data[0][0] === 'number')) {
    var dim = data[0].length
    var length = data.length * dim
    var i, j, k, l

    // no output specified, create a new typed array
    if (!output || typeof output === 'string') {
      output = new (dtype(output || 'float32'))(length + offset)
    }

    var dstLength = output.length - offset
    if (length !== dstLength) {
      throw new Error('source length ' + length + ' (' + dim + 'x' + data.length + ')' +
        ' does not match destination length ' + dstLength)
    }

    for (i = 0, k = offset; i < data.length; i++) {
      for (j = 0; j < dim; j++) {
        output[k++] = data[i][j] === null ? NaN : data[i][j]
      }
    }
  } else {
    if (!output || typeof output === 'string') {
      // no output, create a new one
      var Ctor = dtype(output || 'float32')

      // handle arrays separately due to possible nulls
      if (Array.isArray(data) || output === 'array') {
        output = new Ctor(data.length + offset)
        for (i = 0, k = offset, l = output.length; k < l; k++, i++) {
          output[k] = data[i] === null ? NaN : data[i]
        }
      } else {
        if (offset === 0) {
          output = new Ctor(data)
        } else {
          output = new Ctor(data.length + offset)

          output.set(data, offset)
        }
      }
    } else {
      // store output in existing array
      output.set(data, offset)
    }
  }

  return output
}

},{"dtype":15}],17:[function(_dereq_,module,exports){
'use strict';

var isCallable = _dereq_('is-callable');

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;

},{"is-callable":22}],18:[function(_dereq_,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],19:[function(_dereq_,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],20:[function(_dereq_,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],21:[function(_dereq_,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],22:[function(_dereq_,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],23:[function(_dereq_,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],24:[function(_dereq_,module,exports){
'use strict';
module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};

},{}],25:[function(_dereq_,module,exports){
var wordWrap = _dereq_('word-wrapper')
var xtend = _dereq_('xtend')
var number = _dereq_('as-number')

var X_HEIGHTS = ['x', 'e', 'a', 'o', 'n', 's', 'r', 'c', 'u', 'm', 'v', 'w', 'z']
var M_WIDTHS = ['m', 'w']
var CAP_HEIGHTS = ['H', 'I', 'N', 'E', 'F', 'K', 'L', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


var TAB_ID = '\t'.charCodeAt(0)
var SPACE_ID = ' '.charCodeAt(0)
var ALIGN_LEFT = 0,
    ALIGN_CENTER = 1,
    ALIGN_RIGHT = 2

module.exports = function createLayout(opt) {
  return new TextLayout(opt)
}

function TextLayout(opt) {
  this.glyphs = []
  this._measure = this.computeMetrics.bind(this)
  this.update(opt)
}

TextLayout.prototype.update = function(opt) {
  opt = xtend({
    measure: this._measure
  }, opt)
  this._opt = opt
  this._opt.tabSize = number(this._opt.tabSize, 4)

  if (!opt.font)
    throw new Error('must provide a valid bitmap font')

  var glyphs = this.glyphs
  var text = opt.text||''
  var font = opt.font
  this._setupSpaceGlyphs(font)

  var lines = wordWrap.lines(text, opt)
  var minWidth = opt.width || 0

  //clear glyphs
  glyphs.length = 0

  //get max line width
  var maxLineWidth = lines.reduce(function(prev, line) {
    return Math.max(prev, line.width, minWidth)
  }, 0)

  //the pen position
  var x = 0
  var y = 0
  var lineHeight = number(opt.lineHeight, font.common.lineHeight)
  var baseline = font.common.base
  var descender = lineHeight-baseline
  var letterSpacing = opt.letterSpacing || 0
  var height = lineHeight * lines.length - descender
  var align = getAlignType(this._opt.align)

  //draw text along baseline
  y -= height

  //the metrics for this text layout
  this._width = maxLineWidth
  this._height = height
  this._descender = lineHeight - baseline
  this._baseline = baseline
  this._xHeight = getXHeight(font)
  this._capHeight = getCapHeight(font)
  this._lineHeight = lineHeight
  this._ascender = lineHeight - descender - this._xHeight

  //layout each glyph
  var self = this
  lines.forEach(function(line, lineIndex) {
    var start = line.start
    var end = line.end
    var lineWidth = line.width
    var lastGlyph

    //for each glyph in that line...
    for (var i=start; i<end; i++) {
      var id = text.charCodeAt(i)
      var glyph = self.getGlyph(font, id)
      if (glyph) {
        if (lastGlyph)
          x += getKerning(font, lastGlyph.id, glyph.id)

        var tx = x
        if (align === ALIGN_CENTER)
          tx += (maxLineWidth-lineWidth)/2
        else if (align === ALIGN_RIGHT)
          tx += (maxLineWidth-lineWidth)

        glyphs.push({
          position: [tx, y],
          data: glyph,
          index: i,
          line: lineIndex
        })

        //move pen forward
        x += glyph.xadvance + letterSpacing
        lastGlyph = glyph
      }
    }

    //next line down
    y += lineHeight
    x = 0
  })
  this._linesTotal = lines.length;
}

TextLayout.prototype._setupSpaceGlyphs = function(font) {
  //These are fallbacks, when the font doesn't include
  //' ' or '\t' glyphs
  this._fallbackSpaceGlyph = null
  this._fallbackTabGlyph = null

  if (!font.chars || font.chars.length === 0)
    return

  //try to get space glyph
  //then fall back to the 'm' or 'w' glyphs
  //then fall back to the first glyph available
  var space = getGlyphById(font, SPACE_ID)
          || getMGlyph(font)
          || font.chars[0]

  //and create a fallback for tab
  var tabWidth = this._opt.tabSize * space.xadvance
  this._fallbackSpaceGlyph = space
  this._fallbackTabGlyph = xtend(space, {
    x: 0, y: 0, xadvance: tabWidth, id: TAB_ID,
    xoffset: 0, yoffset: 0, width: 0, height: 0
  })
}

TextLayout.prototype.getGlyph = function(font, id) {
  var glyph = getGlyphById(font, id)
  if (glyph)
    return glyph
  else if (id === TAB_ID)
    return this._fallbackTabGlyph
  else if (id === SPACE_ID)
    return this._fallbackSpaceGlyph
  return null
}

TextLayout.prototype.computeMetrics = function(text, start, end, width) {
  var letterSpacing = this._opt.letterSpacing || 0
  var font = this._opt.font
  var curPen = 0
  var curWidth = 0
  var count = 0
  var glyph
  var lastGlyph

  if (!font.chars || font.chars.length === 0) {
    return {
      start: start,
      end: start,
      width: 0
    }
  }

  end = Math.min(text.length, end)
  for (var i=start; i < end; i++) {
    var id = text.charCodeAt(i)
    var glyph = this.getGlyph(font, id)

    if (glyph) {
      //move pen forward
      var xoff = glyph.xoffset
      var kern = lastGlyph ? getKerning(font, lastGlyph.id, glyph.id) : 0
      curPen += kern

      var nextPen = curPen + glyph.xadvance + letterSpacing
      var nextWidth = curPen + glyph.width

      //we've hit our limit; we can't move onto the next glyph
      if (nextWidth >= width || nextPen >= width)
        break

      //otherwise continue along our line
      curPen = nextPen
      curWidth = nextWidth
      lastGlyph = glyph
    }
    count++
  }

  //make sure rightmost edge lines up with rendered glyphs
  if (lastGlyph)
    curWidth += lastGlyph.xoffset

  return {
    start: start,
    end: start + count,
    width: curWidth
  }
}

//getters for the private vars
;['width', 'height',
  'descender', 'ascender',
  'xHeight', 'baseline',
  'capHeight',
  'lineHeight' ].forEach(addGetter)

function addGetter(name) {
  Object.defineProperty(TextLayout.prototype, name, {
    get: wrapper(name),
    configurable: true
  })
}

//create lookups for private vars
function wrapper(name) {
  return (new Function([
    'return function '+name+'() {',
    '  return this._'+name,
    '}'
  ].join('\n')))()
}

function getGlyphById(font, id) {
  if (!font.chars || font.chars.length === 0)
    return null

  var glyphIdx = findChar(font.chars, id)
  if (glyphIdx >= 0)
    return font.chars[glyphIdx]
  return null
}

function getXHeight(font) {
  for (var i=0; i<X_HEIGHTS.length; i++) {
    var id = X_HEIGHTS[i].charCodeAt(0)
    var idx = findChar(font.chars, id)
    if (idx >= 0)
      return font.chars[idx].height
  }
  return 0
}

function getMGlyph(font) {
  for (var i=0; i<M_WIDTHS.length; i++) {
    var id = M_WIDTHS[i].charCodeAt(0)
    var idx = findChar(font.chars, id)
    if (idx >= 0)
      return font.chars[idx]
  }
  return 0
}

function getCapHeight(font) {
  for (var i=0; i<CAP_HEIGHTS.length; i++) {
    var id = CAP_HEIGHTS[i].charCodeAt(0)
    var idx = findChar(font.chars, id)
    if (idx >= 0)
      return font.chars[idx].height
  }
  return 0
}

function getKerning(font, left, right) {
  if (!font.kernings || font.kernings.length === 0)
    return 0

  var table = font.kernings
  for (var i=0; i<table.length; i++) {
    var kern = table[i]
    if (kern.first === left && kern.second === right)
      return kern.amount
  }
  return 0
}

function getAlignType(align) {
  if (align === 'center')
    return ALIGN_CENTER
  else if (align === 'right')
    return ALIGN_RIGHT
  return ALIGN_LEFT
}

function findChar (array, value, start) {
  start = start || 0
  for (var i = start; i < array.length; i++) {
    if (array[i].id === value) {
      return i
    }
  }
  return -1
}
},{"as-number":3,"word-wrapper":45,"xtend":48}],26:[function(_dereq_,module,exports){
(function (Buffer){
var xhr = _dereq_('xhr')
var noop = function(){}
var parseASCII = _dereq_('parse-bmfont-ascii')
var parseXML = _dereq_('parse-bmfont-xml')
var readBinary = _dereq_('parse-bmfont-binary')
var isBinaryFormat = _dereq_('./lib/is-binary')
var xtend = _dereq_('xtend')

var xml2 = (function hasXML2() {
  return self.XMLHttpRequest && "withCredentials" in new XMLHttpRequest
})()

module.exports = function(opt, cb) {
  cb = typeof cb === 'function' ? cb : noop

  if (typeof opt === 'string')
    opt = { uri: opt }
  else if (!opt)
    opt = {}

  var expectBinary = opt.binary
  if (expectBinary)
    opt = getBinaryOpts(opt)

  xhr(opt, function(err, res, body) {
    if (err)
      return cb(err)
    if (!/^2/.test(res.statusCode))
      return cb(new Error('http status code: '+res.statusCode))
    if (!body)
      return cb(new Error('no body result'))

    var binary = false

    //if the response type is an array buffer,
    //we need to convert it into a regular Buffer object
    if (isArrayBuffer(body)) {
      var array = new Uint8Array(body)
      body = new Buffer(array, 'binary')
    }

    //now check the string/Buffer response
    //and see if it has a binary BMF header
    if (isBinaryFormat(body)) {
      binary = true
      //if we have a string, turn it into a Buffer
      if (typeof body === 'string')
        body = new Buffer(body, 'binary')
    }

    //we are not parsing a binary format, just ASCII/XML/etc
    if (!binary) {
      //might still be a buffer if responseType is 'arraybuffer'
      if (Buffer.isBuffer(body))
        body = body.toString(opt.encoding)
      body = body.trim()
    }

    var result
    try {
      var type = res.headers['content-type']
      if (binary)
        result = readBinary(body)
      else if (/json/.test(type) || body.charAt(0) === '{')
        result = JSON.parse(body)
      else if (/xml/.test(type)  || body.charAt(0) === '<')
        result = parseXML(body)
      else
        result = parseASCII(body)
    } catch (e) {
      cb(new Error('error parsing font '+e.message))
      cb = noop
    }
    cb(null, result)
  })
}

function isArrayBuffer(arr) {
  var str = Object.prototype.toString
  return str.call(arr) === '[object ArrayBuffer]'
}

function getBinaryOpts(opt) {
  //IE10+ and other modern browsers support array buffers
  if (xml2)
    return xtend(opt, { responseType: 'arraybuffer' })

  if (typeof self.XMLHttpRequest === 'undefined')
    throw new Error('your browser does not support XHR loading')

  //IE9 and XML1 browsers could still use an override
  var req = new self.XMLHttpRequest()
  req.overrideMimeType('text/plain; charset=x-user-defined')
  return xtend({
    xhr: req
  }, opt)
}

}).call(this,_dereq_("buffer").Buffer)

},{"./lib/is-binary":27,"buffer":8,"parse-bmfont-ascii":29,"parse-bmfont-binary":30,"parse-bmfont-xml":31,"xhr":46,"xtend":48}],27:[function(_dereq_,module,exports){
(function (Buffer){
var equal = _dereq_('buffer-equal')
var HEADER = new Buffer([66, 77, 70, 3])

module.exports = function(buf) {
  if (typeof buf === 'string')
    return buf.substring(0, 3) === 'BMF'
  return buf.length > 4 && equal(buf.slice(0, 4), HEADER)
}
}).call(this,_dereq_("buffer").Buffer)

},{"buffer":8,"buffer-equal":7}],28:[function(_dereq_,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],29:[function(_dereq_,module,exports){
module.exports = function parseBMFontAscii(data) {
  if (!data)
    throw new Error('no data provided')
  data = data.toString().trim()

  var output = {
    pages: [],
    chars: [],
    kernings: []
  }

  var lines = data.split(/\r\n?|\n/g)

  if (lines.length === 0)
    throw new Error('no data in BMFont file')

  for (var i = 0; i < lines.length; i++) {
    var lineData = splitLine(lines[i], i)
    if (!lineData) //skip empty lines
      continue

    if (lineData.key === 'page') {
      if (typeof lineData.data.id !== 'number')
        throw new Error('malformed file at line ' + i + ' -- needs page id=N')
      if (typeof lineData.data.file !== 'string')
        throw new Error('malformed file at line ' + i + ' -- needs page file="path"')
      output.pages[lineData.data.id] = lineData.data.file
    } else if (lineData.key === 'chars' || lineData.key === 'kernings') {
      //... do nothing for these two ...
    } else if (lineData.key === 'char') {
      output.chars.push(lineData.data)
    } else if (lineData.key === 'kerning') {
      output.kernings.push(lineData.data)
    } else {
      output[lineData.key] = lineData.data
    }
  }

  return output
}

function splitLine(line, idx) {
  line = line.replace(/\t+/g, ' ').trim()
  if (!line)
    return null

  var space = line.indexOf(' ')
  if (space === -1)
    throw new Error("no named row at line " + idx)

  var key = line.substring(0, space)

  line = line.substring(space + 1)
  //clear "letter" field as it is non-standard and
  //requires additional complexity to parse " / = symbols
  line = line.replace(/letter=[\'\"]\S+[\'\"]/gi, '')
  line = line.split("=")
  line = line.map(function(str) {
    return str.trim().match((/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g))
  })

  var data = []
  for (var i = 0; i < line.length; i++) {
    var dt = line[i]
    if (i === 0) {
      data.push({
        key: dt[0],
        data: ""
      })
    } else if (i === line.length - 1) {
      data[data.length - 1].data = parseData(dt[0])
    } else {
      data[data.length - 1].data = parseData(dt[0])
      data.push({
        key: dt[1],
        data: ""
      })
    }
  }

  var out = {
    key: key,
    data: {}
  }

  data.forEach(function(v) {
    out.data[v.key] = v.data;
  })

  return out
}

function parseData(data) {
  if (!data || data.length === 0)
    return ""

  if (data.indexOf('"') === 0 || data.indexOf("'") === 0)
    return data.substring(1, data.length - 1)
  if (data.indexOf(',') !== -1)
    return parseIntList(data)
  return parseInt(data, 10)
}

function parseIntList(data) {
  return data.split(',').map(function(val) {
    return parseInt(val, 10)
  })
}
},{}],30:[function(_dereq_,module,exports){
var HEADER = [66, 77, 70]

module.exports = function readBMFontBinary(buf) {
  if (buf.length < 6)
    throw new Error('invalid buffer length for BMFont')

  var header = HEADER.every(function(byte, i) {
    return buf.readUInt8(i) === byte
  })

  if (!header)
    throw new Error('BMFont missing BMF byte header')

  var i = 3
  var vers = buf.readUInt8(i++)
  if (vers > 3)
    throw new Error('Only supports BMFont Binary v3 (BMFont App v1.10)')

  var target = { kernings: [], chars: [] }
  for (var b=0; b<5; b++)
    i += readBlock(target, buf, i)
  return target
}

function readBlock(target, buf, i) {
  if (i > buf.length-1)
    return 0

  var blockID = buf.readUInt8(i++)
  var blockSize = buf.readInt32LE(i)
  i += 4

  switch(blockID) {
    case 1:
      target.info = readInfo(buf, i)
      break
    case 2:
      target.common = readCommon(buf, i)
      break
    case 3:
      target.pages = readPages(buf, i, blockSize)
      break
    case 4:
      target.chars = readChars(buf, i, blockSize)
      break
    case 5:
      target.kernings = readKernings(buf, i, blockSize)
      break
  }
  return 5 + blockSize
}

function readInfo(buf, i) {
  var info = {}
  info.size = buf.readInt16LE(i)

  var bitField = buf.readUInt8(i+2)
  info.smooth = (bitField >> 7) & 1
  info.unicode = (bitField >> 6) & 1
  info.italic = (bitField >> 5) & 1
  info.bold = (bitField >> 4) & 1

  //fixedHeight is only mentioned in binary spec
  if ((bitField >> 3) & 1)
    info.fixedHeight = 1

  info.charset = buf.readUInt8(i+3) || ''
  info.stretchH = buf.readUInt16LE(i+4)
  info.aa = buf.readUInt8(i+6)
  info.padding = [
    buf.readInt8(i+7),
    buf.readInt8(i+8),
    buf.readInt8(i+9),
    buf.readInt8(i+10)
  ]
  info.spacing = [
    buf.readInt8(i+11),
    buf.readInt8(i+12)
  ]
  info.outline = buf.readUInt8(i+13)
  info.face = readStringNT(buf, i+14)
  return info
}

function readCommon(buf, i) {
  var common = {}
  common.lineHeight = buf.readUInt16LE(i)
  common.base = buf.readUInt16LE(i+2)
  common.scaleW = buf.readUInt16LE(i+4)
  common.scaleH = buf.readUInt16LE(i+6)
  common.pages = buf.readUInt16LE(i+8)
  var bitField = buf.readUInt8(i+10)
  common.packed = 0
  common.alphaChnl = buf.readUInt8(i+11)
  common.redChnl = buf.readUInt8(i+12)
  common.greenChnl = buf.readUInt8(i+13)
  common.blueChnl = buf.readUInt8(i+14)
  return common
}

function readPages(buf, i, size) {
  var pages = []
  var text = readNameNT(buf, i)
  var len = text.length+1
  var count = size / len
  for (var c=0; c<count; c++) {
    pages[c] = buf.slice(i, i+text.length).toString('utf8')
    i += len
  }
  return pages
}

function readChars(buf, i, blockSize) {
  var chars = []

  var count = blockSize / 20
  for (var c=0; c<count; c++) {
    var char = {}
    var off = c*20
    char.id = buf.readUInt32LE(i + 0 + off)
    char.x = buf.readUInt16LE(i + 4 + off)
    char.y = buf.readUInt16LE(i + 6 + off)
    char.width = buf.readUInt16LE(i + 8 + off)
    char.height = buf.readUInt16LE(i + 10 + off)
    char.xoffset = buf.readInt16LE(i + 12 + off)
    char.yoffset = buf.readInt16LE(i + 14 + off)
    char.xadvance = buf.readInt16LE(i + 16 + off)
    char.page = buf.readUInt8(i + 18 + off)
    char.chnl = buf.readUInt8(i + 19 + off)
    chars[c] = char
  }
  return chars
}

function readKernings(buf, i, blockSize) {
  var kernings = []
  var count = blockSize / 10
  for (var c=0; c<count; c++) {
    var kern = {}
    var off = c*10
    kern.first = buf.readUInt32LE(i + 0 + off)
    kern.second = buf.readUInt32LE(i + 4 + off)
    kern.amount = buf.readInt16LE(i + 8 + off)
    kernings[c] = kern
  }
  return kernings
}

function readNameNT(buf, offset) {
  var pos=offset
  for (; pos<buf.length; pos++) {
    if (buf[pos] === 0x00)
      break
  }
  return buf.slice(offset, pos)
}

function readStringNT(buf, offset) {
  return readNameNT(buf, offset).toString('utf8')
}
},{}],31:[function(_dereq_,module,exports){
var parseAttributes = _dereq_('./parse-attribs')
var parseFromString = _dereq_('xml-parse-from-string')

//In some cases element.attribute.nodeName can return
//all lowercase values.. so we need to map them to the correct
//case
var NAME_MAP = {
  scaleh: 'scaleH',
  scalew: 'scaleW',
  stretchh: 'stretchH',
  lineheight: 'lineHeight',
  alphachnl: 'alphaChnl',
  redchnl: 'redChnl',
  greenchnl: 'greenChnl',
  bluechnl: 'blueChnl'
}

module.exports = function parse(data) {
  data = data.toString()

  var xmlRoot = parseFromString(data)
  var output = {
    pages: [],
    chars: [],
    kernings: []
  }

  //get config settings
  ;['info', 'common'].forEach(function(key) {
    var element = xmlRoot.getElementsByTagName(key)[0]
    if (element)
      output[key] = parseAttributes(getAttribs(element))
  })

  //get page info
  var pageRoot = xmlRoot.getElementsByTagName('pages')[0]
  if (!pageRoot)
    throw new Error('malformed file -- no <pages> element')
  var pages = pageRoot.getElementsByTagName('page')
  for (var i=0; i<pages.length; i++) {
    var p = pages[i]
    var id = parseInt(p.getAttribute('id'), 10)
    var file = p.getAttribute('file')
    if (isNaN(id))
      throw new Error('malformed file -- page "id" attribute is NaN')
    if (!file)
      throw new Error('malformed file -- needs page "file" attribute')
    output.pages[parseInt(id, 10)] = file
  }

  //get kernings / chars
  ;['chars', 'kernings'].forEach(function(key) {
    var element = xmlRoot.getElementsByTagName(key)[0]
    if (!element)
      return
    var childTag = key.substring(0, key.length-1)
    var children = element.getElementsByTagName(childTag)
    for (var i=0; i<children.length; i++) {
      var child = children[i]
      output[key].push(parseAttributes(getAttribs(child)))
    }
  })
  return output
}

function getAttribs(element) {
  var attribs = getAttribList(element)
  return attribs.reduce(function(dict, attrib) {
    var key = mapName(attrib.nodeName)
    dict[key] = attrib.nodeValue
    return dict
  }, {})
}

function getAttribList(element) {
  //IE8+ and modern browsers
  var attribs = []
  for (var i=0; i<element.attributes.length; i++)
    attribs.push(element.attributes[i])
  return attribs
}

function mapName(nodeName) {
  return NAME_MAP[nodeName.toLowerCase()] || nodeName
}
},{"./parse-attribs":32,"xml-parse-from-string":47}],32:[function(_dereq_,module,exports){
//Some versions of GlyphDesigner have a typo
//that causes some bugs with parsing.
//Need to confirm with recent version of the software
//to see whether this is still an issue or not.
var GLYPH_DESIGNER_ERROR = 'chasrset'

module.exports = function parseAttributes(obj) {
  if (GLYPH_DESIGNER_ERROR in obj) {
    obj['charset'] = obj[GLYPH_DESIGNER_ERROR]
    delete obj[GLYPH_DESIGNER_ERROR]
  }

  for (var k in obj) {
    if (k === 'face' || k === 'charset')
      continue
    else if (k === 'padding' || k === 'spacing')
      obj[k] = parseIntList(obj[k])
    else
      obj[k] = parseInt(obj[k], 10)
  }
  return obj
}

function parseIntList(data) {
  return data.split(',').map(function(val) {
    return parseInt(val, 10)
  })
}
},{}],33:[function(_dereq_,module,exports){
var trim = _dereq_('trim')
  , forEach = _dereq_('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":17,"trim":43}],34:[function(_dereq_,module,exports){
(function (global){
var performance = global.performance || {};

var present = (function () {
  var names = ['now', 'webkitNow', 'msNow', 'mozNow', 'oNow'];
  while (names.length) {
    var name = names.shift();
    if (name in performance) {
      return performance[name].bind(performance);
    }
  }

  var dateNow = Date.now || function () { return new Date().getTime(); };
  var navigationStart = (performance.timing || {}).navigationStart || dateNow();
  return function () {
    return dateNow() - navigationStart;
  };
}());

present.performanceNow = performance.now;
present.noConflict = function () {
  performance.now = present.performanceNow;
};
present.conflict = function () {
  performance.now = present;
};
present.conflict();

module.exports = present;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],35:[function(_dereq_,module,exports){
(function (setImmediate){
(function(root) {

	// Store setTimeout reference so promise-polyfill will be unaffected by
	// other code modifying setTimeout (like sinon.useFakeTimers())
	var setTimeoutFunc = setTimeout;

	// Use polyfill for setImmediate for performance gains
	var asap = (typeof setImmediate === 'function' && setImmediate) ||
		function(fn) { setTimeoutFunc(fn, 1); };

	// Polyfill for Function.prototype.bind
	function bind(fn, thisArg) {
		return function() {
			fn.apply(thisArg, arguments);
		}
	}

	var isArray = Array.isArray || function(value) { return Object.prototype.toString.call(value) === "[object Array]" };

	function Promise(fn) {
		if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
		if (typeof fn !== 'function') throw new TypeError('not a function');
		this._state = null;
		this._value = null;
		this._deferreds = []

		doResolve(fn, bind(resolve, this), bind(reject, this))
	}

	function handle(deferred) {
		var me = this;
		if (this._state === null) {
			this._deferreds.push(deferred);
			return
		}
		asap(function() {
			var cb = me._state ? deferred.onFulfilled : deferred.onRejected
			if (cb === null) {
				(me._state ? deferred.resolve : deferred.reject)(me._value);
				return;
			}
			var ret;
			try {
				ret = cb(me._value);
			}
			catch (e) {
				deferred.reject(e);
				return;
			}
			deferred.resolve(ret);
		})
	}

	function resolve(newValue) {
		try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
			if (newValue === this) throw new TypeError('A promise cannot be resolved with itself.');
			if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
				var then = newValue.then;
				if (typeof then === 'function') {
					doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
					return;
				}
			}
			this._state = true;
			this._value = newValue;
			finale.call(this);
		} catch (e) { reject.call(this, e); }
	}

	function reject(newValue) {
		this._state = false;
		this._value = newValue;
		finale.call(this);
	}

	function finale() {
		for (var i = 0, len = this._deferreds.length; i < len; i++) {
			handle.call(this, this._deferreds[i]);
		}
		this._deferreds = null;
	}

	function Handler(onFulfilled, onRejected, resolve, reject){
		this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
		this.onRejected = typeof onRejected === 'function' ? onRejected : null;
		this.resolve = resolve;
		this.reject = reject;
	}

	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, onFulfilled, onRejected) {
		var done = false;
		try {
			fn(function (value) {
				if (done) return;
				done = true;
				onFulfilled(value);
			}, function (reason) {
				if (done) return;
				done = true;
				onRejected(reason);
			})
		} catch (ex) {
			if (done) return;
			done = true;
			onRejected(ex);
		}
	}

	Promise.prototype['catch'] = function (onRejected) {
		return this.then(null, onRejected);
	};

	Promise.prototype.then = function(onFulfilled, onRejected) {
		var me = this;
		return new Promise(function(resolve, reject) {
			handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
		})
	};

	Promise.all = function () {
		var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);

		return new Promise(function (resolve, reject) {
			if (args.length === 0) return resolve([]);
			var remaining = args.length;
			function res(i, val) {
				try {
					if (val && (typeof val === 'object' || typeof val === 'function')) {
						var then = val.then;
						if (typeof then === 'function') {
							then.call(val, function (val) { res(i, val) }, reject);
							return;
						}
					}
					args[i] = val;
					if (--remaining === 0) {
						resolve(args);
					}
				} catch (ex) {
					reject(ex);
				}
			}
			for (var i = 0; i < args.length; i++) {
				res(i, args[i]);
			}
		});
	};

	Promise.resolve = function (value) {
		if (value && typeof value === 'object' && value.constructor === Promise) {
			return value;
		}

		return new Promise(function (resolve) {
			resolve(value);
		});
	};

	Promise.reject = function (value) {
		return new Promise(function (resolve, reject) {
			reject(value);
		});
	};

	Promise.race = function (values) {
		return new Promise(function (resolve, reject) {
			for(var i = 0, len = values.length; i < len; i++) {
				values[i].then(resolve, reject);
			}
		});
	};

	/**
	 * Set the immediate function to execute callbacks
	 * @param fn {function} Function to execute
	 * @private
	 */
	Promise._setImmediateFn = function _setImmediateFn(fn) {
		asap = fn;
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Promise;
	} else if (!root.Promise) {
		root.Promise = Promise;
	}

})(this);

}).call(this,_dereq_("timers").setImmediate)

},{"timers":41}],36:[function(_dereq_,module,exports){
var dtype = _dereq_('dtype')
var anArray = _dereq_('an-array')
var isBuffer = _dereq_('is-buffer')

var CW = [0, 2, 3]
var CCW = [2, 1, 3]

module.exports = function createQuadElements(array, opt) {
    //if user didn't specify an output array
    if (!array || !(anArray(array) || isBuffer(array))) {
        opt = array || {}
        array = null
    }

    if (typeof opt === 'number') //backwards-compatible
        opt = { count: opt }
    else
        opt = opt || {}

    var type = typeof opt.type === 'string' ? opt.type : 'uint16'
    var count = typeof opt.count === 'number' ? opt.count : 1
    var start = (opt.start || 0)

    var dir = opt.clockwise !== false ? CW : CCW,
        a = dir[0],
        b = dir[1],
        c = dir[2]

    var numIndices = count * 6

    var indices = array || new (dtype(type))(numIndices)
    for (var i = 0, j = 0; i < numIndices; i += 6, j += 4) {
        var x = i + start
        indices[x + 0] = j + 0
        indices[x + 1] = j + 1
        indices[x + 2] = j + 2
        indices[x + 3] = j + a
        indices[x + 4] = j + b
        indices[x + 5] = j + c
    }
    return indices
}
},{"an-array":1,"dtype":15,"is-buffer":21}],37:[function(_dereq_,module,exports){
var createLayout = _dereq_('layout-bmfont-text')
var inherits = _dereq_('inherits')
var createIndices = _dereq_('quad-indices')
var buffer = _dereq_('three-buffer-vertex-data')
var assign = _dereq_('object-assign')

var vertices = _dereq_('./lib/vertices')
var utils = _dereq_('./lib/utils')

var Base = THREE.BufferGeometry

module.exports = function createTextGeometry (opt) {
  return new TextGeometry(opt)
}

function TextGeometry (opt) {
  Base.call(this)

  if (typeof opt === 'string') {
    opt = { text: opt }
  }

  // use these as default values for any subsequent
  // calls to update()
  this._opt = assign({}, opt)

  // also do an initial setup...
  if (opt) this.update(opt)
}

inherits(TextGeometry, Base)

TextGeometry.prototype.update = function (opt) {
  if (typeof opt === 'string') {
    opt = { text: opt }
  }

  // use constructor defaults
  opt = assign({}, this._opt, opt)

  if (!opt.font) {
    throw new TypeError('must specify a { font } in options')
  }

  this.layout = createLayout(opt)

  // get vec2 texcoords
  var flipY = opt.flipY !== false

  // the desired BMFont data
  var font = opt.font

  // determine texture size from font file
  var texWidth = font.common.scaleW
  var texHeight = font.common.scaleH

  // get visible glyphs
  var glyphs = this.layout.glyphs.filter(function (glyph) {
    var bitmap = glyph.data
    return bitmap.width * bitmap.height > 0
  })

  // provide visible glyphs for convenience
  this.visibleGlyphs = glyphs

  // get common vertex data
  var positions = vertices.positions(glyphs)
  var uvs = vertices.uvs(glyphs, texWidth, texHeight, flipY)
  var indices = createIndices({
    clockwise: true,
    type: 'uint16',
    count: glyphs.length
  })

  // update vertex data
  buffer.index(this, indices, 1, 'uint16')
  buffer.attr(this, 'position', positions, 2)
  buffer.attr(this, 'uv', uvs, 2)

  // update multipage data
  if (!opt.multipage && 'page' in this.attributes) {
    // disable multipage rendering
    this.removeAttribute('page')
  } else if (opt.multipage) {
    var pages = vertices.pages(glyphs)
    // enable multipage rendering
    buffer.attr(this, 'page', pages, 1)
  }
}

TextGeometry.prototype.computeBoundingSphere = function () {
  if (this.boundingSphere === null) {
    this.boundingSphere = new THREE.Sphere()
  }

  var positions = this.attributes.position.array
  var itemSize = this.attributes.position.itemSize
  if (!positions || !itemSize || positions.length < 2) {
    this.boundingSphere.radius = 0
    this.boundingSphere.center.set(0, 0, 0)
    return
  }
  utils.computeSphere(positions, this.boundingSphere)
  if (isNaN(this.boundingSphere.radius)) {
    console.error('THREE.BufferGeometry.computeBoundingSphere(): ' +
      'Computed radius is NaN. The ' +
      '"position" attribute is likely to have NaN values.')
  }
}

TextGeometry.prototype.computeBoundingBox = function () {
  if (this.boundingBox === null) {
    this.boundingBox = new THREE.Box3()
  }

  var bbox = this.boundingBox
  var positions = this.attributes.position.array
  var itemSize = this.attributes.position.itemSize
  if (!positions || !itemSize || positions.length < 2) {
    bbox.makeEmpty()
    return
  }
  utils.computeBox(positions, bbox)
}

},{"./lib/utils":38,"./lib/vertices":39,"inherits":20,"layout-bmfont-text":25,"object-assign":28,"quad-indices":36,"three-buffer-vertex-data":40}],38:[function(_dereq_,module,exports){
var itemSize = 2
var box = { min: [0, 0], max: [0, 0] }

function bounds (positions) {
  var count = positions.length / itemSize
  box.min[0] = positions[0]
  box.min[1] = positions[1]
  box.max[0] = positions[0]
  box.max[1] = positions[1]

  for (var i = 0; i < count; i++) {
    var x = positions[i * itemSize + 0]
    var y = positions[i * itemSize + 1]
    box.min[0] = Math.min(x, box.min[0])
    box.min[1] = Math.min(y, box.min[1])
    box.max[0] = Math.max(x, box.max[0])
    box.max[1] = Math.max(y, box.max[1])
  }
}

module.exports.computeBox = function (positions, output) {
  bounds(positions)
  output.min.set(box.min[0], box.min[1], 0)
  output.max.set(box.max[0], box.max[1], 0)
}

module.exports.computeSphere = function (positions, output) {
  bounds(positions)
  var minX = box.min[0]
  var minY = box.min[1]
  var maxX = box.max[0]
  var maxY = box.max[1]
  var width = maxX - minX
  var height = maxY - minY
  var length = Math.sqrt(width * width + height * height)
  output.center.set(minX + width / 2, minY + height / 2, 0)
  output.radius = length / 2
}

},{}],39:[function(_dereq_,module,exports){
module.exports.pages = function pages (glyphs) {
  var pages = new Float32Array(glyphs.length * 4 * 1)
  var i = 0
  glyphs.forEach(function (glyph) {
    var id = glyph.data.page || 0
    pages[i++] = id
    pages[i++] = id
    pages[i++] = id
    pages[i++] = id
  })
  return pages
}

module.exports.uvs = function uvs (glyphs, texWidth, texHeight, flipY) {
  var uvs = new Float32Array(glyphs.length * 4 * 2)
  var i = 0
  glyphs.forEach(function (glyph) {
    var bitmap = glyph.data
    var bw = (bitmap.x + bitmap.width)
    var bh = (bitmap.y + bitmap.height)

    // top left position
    var u0 = bitmap.x / texWidth
    var v1 = bitmap.y / texHeight
    var u1 = bw / texWidth
    var v0 = bh / texHeight

    if (flipY) {
      v1 = (texHeight - bitmap.y) / texHeight
      v0 = (texHeight - bh) / texHeight
    }

    // BL
    uvs[i++] = u0
    uvs[i++] = v1
    // TL
    uvs[i++] = u0
    uvs[i++] = v0
    // TR
    uvs[i++] = u1
    uvs[i++] = v0
    // BR
    uvs[i++] = u1
    uvs[i++] = v1
  })
  return uvs
}

module.exports.positions = function positions (glyphs) {
  var positions = new Float32Array(glyphs.length * 4 * 2)
  var i = 0
  glyphs.forEach(function (glyph) {
    var bitmap = glyph.data

    // bottom left position
    var x = glyph.position[0] + bitmap.xoffset
    var y = glyph.position[1] + bitmap.yoffset

    // quad size
    var w = bitmap.width
    var h = bitmap.height

    // BL
    positions[i++] = x
    positions[i++] = y
    // TL
    positions[i++] = x
    positions[i++] = y + h
    // TR
    positions[i++] = x + w
    positions[i++] = y + h
    // BR
    positions[i++] = x + w
    positions[i++] = y
  })
  return positions
}

},{}],40:[function(_dereq_,module,exports){
var flatten = _dereq_('flatten-vertex-data')
var warned = false;

module.exports.attr = setAttribute
module.exports.index = setIndex

function setIndex (geometry, data, itemSize, dtype) {
  if (typeof itemSize !== 'number') itemSize = 1
  if (typeof dtype !== 'string') dtype = 'uint16'

  var isR69 = !geometry.index && typeof geometry.setIndex !== 'function'
  var attrib = isR69 ? geometry.getAttribute('index') : geometry.index
  var newAttrib = updateAttribute(attrib, data, itemSize, dtype)
  if (newAttrib) {
    if (isR69) geometry.addAttribute('index', newAttrib)
    else geometry.index = newAttrib
  }
}

function setAttribute (geometry, key, data, itemSize, dtype) {
  if (typeof itemSize !== 'number') itemSize = 3
  if (typeof dtype !== 'string') dtype = 'float32'
  if (Array.isArray(data) &&
    Array.isArray(data[0]) &&
    data[0].length !== itemSize) {
    throw new Error('Nested vertex array has unexpected size; expected ' +
      itemSize + ' but found ' + data[0].length)
  }

  var attrib = geometry.getAttribute(key)
  var newAttrib = updateAttribute(attrib, data, itemSize, dtype)
  if (newAttrib) {
    geometry.addAttribute(key, newAttrib)
  }
}

function updateAttribute (attrib, data, itemSize, dtype) {
  data = data || []
  if (!attrib || rebuildAttribute(attrib, data, itemSize)) {
    // create a new array with desired type
    data = flatten(data, dtype)

    var needsNewBuffer = attrib && typeof attrib.setArray !== 'function'
    if (!attrib || needsNewBuffer) {
      // We are on an old version of ThreeJS which can't
      // support growing / shrinking buffers, so we need
      // to build a new buffer
      if (needsNewBuffer && !warned) {
        warned = true
        console.warn([
          'A WebGL buffer is being updated with a new size or itemSize, ',
          'however this version of ThreeJS only supports fixed-size buffers.',
          '\nThe old buffer may still be kept in memory.\n',
          'To avoid memory leaks, it is recommended that you dispose ',
          'your geometries and create new ones, or update to ThreeJS r82 or newer.\n',
          'See here for discussion:\n',
          'https://github.com/mrdoob/three.js/pull/9631'
        ].join(''))
      }

      // Build a new attribute
      attrib = new THREE.BufferAttribute(data, itemSize);
    }

    attrib.itemSize = itemSize
    attrib.needsUpdate = true

    // New versions of ThreeJS suggest using setArray
    // to change the data. It will use bufferData internally,
    // so you can change the array size without any issues
    if (typeof attrib.setArray === 'function') {
      attrib.setArray(data)
    }

    return attrib
  } else {
    // copy data into the existing array
    flatten(data, attrib.array)
    attrib.needsUpdate = true
    return null
  }
}

// Test whether the attribute needs to be re-created,
// returns false if we can re-use it as-is.
function rebuildAttribute (attrib, data, itemSize) {
  if (attrib.itemSize !== itemSize) return true
  if (!attrib.array) return true
  var attribLength = attrib.array.length
  if (Array.isArray(data) && Array.isArray(data[0])) {
    // [ [ x, y, z ] ]
    return attribLength !== data.length * itemSize
  } else {
    // [ x, y, z ]
    return attribLength !== data.length
  }
  return false
}

},{"flatten-vertex-data":16}],41:[function(_dereq_,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = _dereq_('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,_dereq_("timers").setImmediate,_dereq_("timers").clearImmediate)

},{"process/browser.js":42,"timers":41}],42:[function(_dereq_,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],43:[function(_dereq_,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],44:[function(_dereq_,module,exports){
(function (global){
/**
 * @license
 * webvr-polyfill
 * Copyright (c) 2015-2017 Google
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * cardboard-vr-display
 * Copyright (c) 2015-2017 Google
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * webvr-polyfill-dpdb
 * Copyright (c) 2017 Google
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * wglu-preserve-state
 * Copyright (c) 2016, Brandon Jones.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @license
 * nosleep.js
 * Copyright (c) 2017, Rich Tibbett
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.WebVRPolyfill = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var isMobile = function isMobile() {
  return (/Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
};
var copyArray = function copyArray(source, dest) {
  for (var i = 0, n = source.length; i < n; i++) {
    dest[i] = source[i];
  }
};
var extend = function extend(dest, src) {
  for (var key in src) {
    if (src.hasOwnProperty(key)) {
      dest[key] = src[key];
    }
  }
  return dest;
};

var cardboardVrDisplay = createCommonjsModule(function (module, exports) {
/**
 * @license
 * cardboard-vr-display
 * Copyright (c) 2015-2017 Google
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * gl-preserve-state
 * Copyright (c) 2016, Brandon Jones.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @license
 * webvr-polyfill-dpdb
 * Copyright (c) 2015-2017 Google
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * nosleep.js
 * Copyright (c) 2017, Rich Tibbett
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function (global, factory) {
	module.exports = factory();
}(commonjsGlobal, (function () { var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
var MIN_TIMESTEP = 0.001;
var MAX_TIMESTEP = 1;
var dataUri = function dataUri(mimeType, svg) {
  return 'data:' + mimeType + ',' + encodeURIComponent(svg);
};
var lerp = function lerp(a, b, t) {
  return a + (b - a) * t;
};
var isIOS = function () {
  var isIOS = /iPad|iPhone|iPod/.test(navigator.platform);
  return function () {
    return isIOS;
  };
}();
var isWebViewAndroid = function () {
  var isWebViewAndroid = navigator.userAgent.indexOf('Version') !== -1 && navigator.userAgent.indexOf('Android') !== -1 && navigator.userAgent.indexOf('Chrome') !== -1;
  return function () {
    return isWebViewAndroid;
  };
}();
var isSafari = function () {
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  return function () {
    return isSafari;
  };
}();
var isFirefoxAndroid = function () {
  var isFirefoxAndroid = navigator.userAgent.indexOf('Firefox') !== -1 && navigator.userAgent.indexOf('Android') !== -1;
  return function () {
    return isFirefoxAndroid;
  };
}();
var getChromeVersion = function () {
  var match = navigator.userAgent.match(/.*Chrome\/([0-9]+)/);
  var value = match ? parseInt(match[1], 10) : null;
  return function () {
    return value;
  };
}();
var isChromeWithoutDeviceMotion = function () {
  var value = false;
  if (getChromeVersion() === 65) {
    var match = navigator.userAgent.match(/.*Chrome\/([0-9\.]*)/);
    if (match) {
      var _match$1$split = match[1].split('.'),
          _match$1$split2 = slicedToArray(_match$1$split, 4),
          major = _match$1$split2[0],
          minor = _match$1$split2[1],
          branch = _match$1$split2[2],
          build = _match$1$split2[3];
      value = parseInt(branch, 10) === 3325 && parseInt(build, 10) < 148;
    }
  }
  return function () {
    return value;
  };
}();
var isR7 = function () {
  var isR7 = navigator.userAgent.indexOf('R7 Build') !== -1;
  return function () {
    return isR7;
  };
}();
var isLandscapeMode = function isLandscapeMode() {
  var rtn = window.orientation == 90 || window.orientation == -90;
  return isR7() ? !rtn : rtn;
};
var isTimestampDeltaValid = function isTimestampDeltaValid(timestampDeltaS) {
  if (isNaN(timestampDeltaS)) {
    return false;
  }
  if (timestampDeltaS <= MIN_TIMESTEP) {
    return false;
  }
  if (timestampDeltaS > MAX_TIMESTEP) {
    return false;
  }
  return true;
};
var getScreenWidth = function getScreenWidth() {
  return Math.max(window.screen.width, window.screen.height) * window.devicePixelRatio;
};
var getScreenHeight = function getScreenHeight() {
  return Math.min(window.screen.width, window.screen.height) * window.devicePixelRatio;
};
var requestFullscreen = function requestFullscreen(element) {
  if (isWebViewAndroid()) {
    return false;
  }
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else {
    return false;
  }
  return true;
};
var exitFullscreen = function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else {
    return false;
  }
  return true;
};
var getFullscreenElement = function getFullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
};
var linkProgram = function linkProgram(gl, vertexSource, fragmentSource, attribLocationMap) {
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexSource);
  gl.compileShader(vertexShader);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentSource);
  gl.compileShader(fragmentShader);
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  for (var attribName in attribLocationMap) {
    gl.bindAttribLocation(program, attribLocationMap[attribName], attribName);
  }gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  return program;
};
var getProgramUniforms = function getProgramUniforms(gl, program) {
  var uniforms = {};
  var uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  var uniformName = '';
  for (var i = 0; i < uniformCount; i++) {
    var uniformInfo = gl.getActiveUniform(program, i);
    uniformName = uniformInfo.name.replace('[0]', '');
    uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
  }
  return uniforms;
};
var orthoMatrix = function orthoMatrix(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right),
      bt = 1 / (bottom - top),
      nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
};
var isMobile = function isMobile() {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
var extend = function extend(dest, src) {
  for (var key in src) {
    if (src.hasOwnProperty(key)) {
      dest[key] = src[key];
    }
  }
  return dest;
};
var safariCssSizeWorkaround = function safariCssSizeWorkaround(canvas) {
  if (isIOS()) {
    var width = canvas.style.width;
    var height = canvas.style.height;
    canvas.style.width = parseInt(width) + 1 + 'px';
    canvas.style.height = parseInt(height) + 'px';
    setTimeout(function () {
      canvas.style.width = width;
      canvas.style.height = height;
    }, 100);
  }
  window.canvas = canvas;
};
var frameDataFromPose = function () {
  var piOver180 = Math.PI / 180.0;
  var rad45 = Math.PI * 0.25;
  function mat4_perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov ? fov.upDegrees * piOver180 : rad45),
        downTan = Math.tan(fov ? fov.downDegrees * piOver180 : rad45),
        leftTan = Math.tan(fov ? fov.leftDegrees * piOver180 : rad45),
        rightTan = Math.tan(fov ? fov.rightDegrees * piOver180 : rad45),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);
    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = far * near / (near - far);
    out[15] = 0.0;
    return out;
  }
  function mat4_fromRotationTranslation(out, q, v) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function mat4_translate(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2],
        a00,
        a01,
        a02,
        a03,
        a10,
        a11,
        a12,
        a13,
        a20,
        a21,
        a22,
        a23;
    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
      a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
      a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];
      out[0] = a00;out[1] = a01;out[2] = a02;out[3] = a03;
      out[4] = a10;out[5] = a11;out[6] = a12;out[7] = a13;
      out[8] = a20;out[9] = a21;out[10] = a22;out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
  }
  function mat4_invert(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,
    det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  var defaultOrientation = new Float32Array([0, 0, 0, 1]);
  var defaultPosition = new Float32Array([0, 0, 0]);
  function updateEyeMatrices(projection, view, pose, fov, offset, vrDisplay) {
    mat4_perspectiveFromFieldOfView(projection, fov || null, vrDisplay.depthNear, vrDisplay.depthFar);
    var orientation = pose.orientation || defaultOrientation;
    var position = pose.position || defaultPosition;
    mat4_fromRotationTranslation(view, orientation, position);
    if (offset) mat4_translate(view, view, offset);
    mat4_invert(view, view);
  }
  return function (frameData, pose, vrDisplay) {
    if (!frameData || !pose) return false;
    frameData.pose = pose;
    frameData.timestamp = pose.timestamp;
    updateEyeMatrices(frameData.leftProjectionMatrix, frameData.leftViewMatrix, pose, vrDisplay._getFieldOfView("left"), vrDisplay._getEyeOffset("left"), vrDisplay);
    updateEyeMatrices(frameData.rightProjectionMatrix, frameData.rightViewMatrix, pose, vrDisplay._getFieldOfView("right"), vrDisplay._getEyeOffset("right"), vrDisplay);
    return true;
  };
}();
var isInsideCrossOriginIFrame = function isInsideCrossOriginIFrame() {
  var isFramed = window.self !== window.top;
  var refOrigin = getOriginFromUrl(document.referrer);
  var thisOrigin = getOriginFromUrl(window.location.href);
  return isFramed && refOrigin !== thisOrigin;
};
var getOriginFromUrl = function getOriginFromUrl(url) {
  var domainIdx;
  var protoSepIdx = url.indexOf("://");
  if (protoSepIdx !== -1) {
    domainIdx = protoSepIdx + 3;
  } else {
    domainIdx = 0;
  }
  var domainEndIdx = url.indexOf('/', domainIdx);
  if (domainEndIdx === -1) {
    domainEndIdx = url.length;
  }
  return url.substring(0, domainEndIdx);
};
var getQuaternionAngle = function getQuaternionAngle(quat) {
  if (quat.w > 1) {
    console.warn('getQuaternionAngle: w > 1');
    return 0;
  }
  var angle = 2 * Math.acos(quat.w);
  return angle;
};
var warnOnce = function () {
  var observedWarnings = {};
  return function (key, message) {
    if (observedWarnings[key] === undefined) {
      console.warn('webvr-polyfill: ' + message);
      observedWarnings[key] = true;
    }
  };
}();
var deprecateWarning = function deprecateWarning(deprecated, suggested) {
  var alternative = suggested ? 'Please use ' + suggested + ' instead.' : '';
  warnOnce(deprecated, deprecated + ' has been deprecated. ' + 'This may not work on native WebVR displays. ' + alternative);
};
function WGLUPreserveGLState(gl, bindings, callback) {
  if (!bindings) {
    callback(gl);
    return;
  }
  var boundValues = [];
  var activeTexture = null;
  for (var i = 0; i < bindings.length; ++i) {
    var binding = bindings[i];
    switch (binding) {
      case gl.TEXTURE_BINDING_2D:
      case gl.TEXTURE_BINDING_CUBE_MAP:
        var textureUnit = bindings[++i];
        if (textureUnit < gl.TEXTURE0 || textureUnit > gl.TEXTURE31) {
          console.error("TEXTURE_BINDING_2D or TEXTURE_BINDING_CUBE_MAP must be followed by a valid texture unit");
          boundValues.push(null, null);
          break;
        }
        if (!activeTexture) {
          activeTexture = gl.getParameter(gl.ACTIVE_TEXTURE);
        }
        gl.activeTexture(textureUnit);
        boundValues.push(gl.getParameter(binding), null);
        break;
      case gl.ACTIVE_TEXTURE:
        activeTexture = gl.getParameter(gl.ACTIVE_TEXTURE);
        boundValues.push(null);
        break;
      default:
        boundValues.push(gl.getParameter(binding));
        break;
    }
  }
  callback(gl);
  for (var i = 0; i < bindings.length; ++i) {
    var binding = bindings[i];
    var boundValue = boundValues[i];
    switch (binding) {
      case gl.ACTIVE_TEXTURE:
        break;
      case gl.ARRAY_BUFFER_BINDING:
        gl.bindBuffer(gl.ARRAY_BUFFER, boundValue);
        break;
      case gl.COLOR_CLEAR_VALUE:
        gl.clearColor(boundValue[0], boundValue[1], boundValue[2], boundValue[3]);
        break;
      case gl.COLOR_WRITEMASK:
        gl.colorMask(boundValue[0], boundValue[1], boundValue[2], boundValue[3]);
        break;
      case gl.CURRENT_PROGRAM:
        gl.useProgram(boundValue);
        break;
      case gl.ELEMENT_ARRAY_BUFFER_BINDING:
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boundValue);
        break;
      case gl.FRAMEBUFFER_BINDING:
        gl.bindFramebuffer(gl.FRAMEBUFFER, boundValue);
        break;
      case gl.RENDERBUFFER_BINDING:
        gl.bindRenderbuffer(gl.RENDERBUFFER, boundValue);
        break;
      case gl.TEXTURE_BINDING_2D:
        var textureUnit = bindings[++i];
        if (textureUnit < gl.TEXTURE0 || textureUnit > gl.TEXTURE31)
          break;
        gl.activeTexture(textureUnit);
        gl.bindTexture(gl.TEXTURE_2D, boundValue);
        break;
      case gl.TEXTURE_BINDING_CUBE_MAP:
        var textureUnit = bindings[++i];
        if (textureUnit < gl.TEXTURE0 || textureUnit > gl.TEXTURE31)
          break;
        gl.activeTexture(textureUnit);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, boundValue);
        break;
      case gl.VIEWPORT:
        gl.viewport(boundValue[0], boundValue[1], boundValue[2], boundValue[3]);
        break;
      case gl.BLEND:
      case gl.CULL_FACE:
      case gl.DEPTH_TEST:
      case gl.SCISSOR_TEST:
      case gl.STENCIL_TEST:
        if (boundValue) {
          gl.enable(binding);
        } else {
          gl.disable(binding);
        }
        break;
      default:
        console.log("No GL restore behavior for 0x" + binding.toString(16));
        break;
    }
    if (activeTexture) {
      gl.activeTexture(activeTexture);
    }
  }
}
var glPreserveState = WGLUPreserveGLState;
var distortionVS = ['attribute vec2 position;', 'attribute vec3 texCoord;', 'varying vec2 vTexCoord;', 'uniform vec4 viewportOffsetScale[2];', 'void main() {', '  vec4 viewport = viewportOffsetScale[int(texCoord.z)];', '  vTexCoord = (texCoord.xy * viewport.zw) + viewport.xy;', '  gl_Position = vec4( position, 1.0, 1.0 );', '}'].join('\n');
var distortionFS = ['precision mediump float;', 'uniform sampler2D diffuse;', 'varying vec2 vTexCoord;', 'void main() {', '  gl_FragColor = texture2D(diffuse, vTexCoord);', '}'].join('\n');
function CardboardDistorter(gl, cardboardUI, bufferScale, dirtySubmitFrameBindings) {
  this.gl = gl;
  this.cardboardUI = cardboardUI;
  this.bufferScale = bufferScale;
  this.dirtySubmitFrameBindings = dirtySubmitFrameBindings;
  this.ctxAttribs = gl.getContextAttributes();
  this.meshWidth = 20;
  this.meshHeight = 20;
  this.bufferWidth = gl.drawingBufferWidth;
  this.bufferHeight = gl.drawingBufferHeight;
  this.realBindFramebuffer = gl.bindFramebuffer;
  this.realEnable = gl.enable;
  this.realDisable = gl.disable;
  this.realColorMask = gl.colorMask;
  this.realClearColor = gl.clearColor;
  this.realViewport = gl.viewport;
  if (!isIOS()) {
    this.realCanvasWidth = Object.getOwnPropertyDescriptor(gl.canvas.__proto__, 'width');
    this.realCanvasHeight = Object.getOwnPropertyDescriptor(gl.canvas.__proto__, 'height');
  }
  this.isPatched = false;
  this.lastBoundFramebuffer = null;
  this.cullFace = false;
  this.depthTest = false;
  this.blend = false;
  this.scissorTest = false;
  this.stencilTest = false;
  this.viewport = [0, 0, 0, 0];
  this.colorMask = [true, true, true, true];
  this.clearColor = [0, 0, 0, 0];
  this.attribs = {
    position: 0,
    texCoord: 1
  };
  this.program = linkProgram(gl, distortionVS, distortionFS, this.attribs);
  this.uniforms = getProgramUniforms(gl, this.program);
  this.viewportOffsetScale = new Float32Array(8);
  this.setTextureBounds();
  this.vertexBuffer = gl.createBuffer();
  this.indexBuffer = gl.createBuffer();
  this.indexCount = 0;
  this.renderTarget = gl.createTexture();
  this.framebuffer = gl.createFramebuffer();
  this.depthStencilBuffer = null;
  this.depthBuffer = null;
  this.stencilBuffer = null;
  if (this.ctxAttribs.depth && this.ctxAttribs.stencil) {
    this.depthStencilBuffer = gl.createRenderbuffer();
  } else if (this.ctxAttribs.depth) {
    this.depthBuffer = gl.createRenderbuffer();
  } else if (this.ctxAttribs.stencil) {
    this.stencilBuffer = gl.createRenderbuffer();
  }
  this.patch();
  this.onResize();
}
CardboardDistorter.prototype.destroy = function () {
  var gl = this.gl;
  this.unpatch();
  gl.deleteProgram(this.program);
  gl.deleteBuffer(this.vertexBuffer);
  gl.deleteBuffer(this.indexBuffer);
  gl.deleteTexture(this.renderTarget);
  gl.deleteFramebuffer(this.framebuffer);
  if (this.depthStencilBuffer) {
    gl.deleteRenderbuffer(this.depthStencilBuffer);
  }
  if (this.depthBuffer) {
    gl.deleteRenderbuffer(this.depthBuffer);
  }
  if (this.stencilBuffer) {
    gl.deleteRenderbuffer(this.stencilBuffer);
  }
  if (this.cardboardUI) {
    this.cardboardUI.destroy();
  }
};
CardboardDistorter.prototype.onResize = function () {
  var gl = this.gl;
  var self = this;
  var glState = [gl.RENDERBUFFER_BINDING, gl.TEXTURE_BINDING_2D, gl.TEXTURE0];
  glPreserveState(gl, glState, function (gl) {
    self.realBindFramebuffer.call(gl, gl.FRAMEBUFFER, null);
    if (self.scissorTest) {
      self.realDisable.call(gl, gl.SCISSOR_TEST);
    }
    self.realColorMask.call(gl, true, true, true, true);
    self.realViewport.call(gl, 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    self.realClearColor.call(gl, 0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    self.realBindFramebuffer.call(gl, gl.FRAMEBUFFER, self.framebuffer);
    gl.bindTexture(gl.TEXTURE_2D, self.renderTarget);
    gl.texImage2D(gl.TEXTURE_2D, 0, self.ctxAttribs.alpha ? gl.RGBA : gl.RGB, self.bufferWidth, self.bufferHeight, 0, self.ctxAttribs.alpha ? gl.RGBA : gl.RGB, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, self.renderTarget, 0);
    if (self.ctxAttribs.depth && self.ctxAttribs.stencil) {
      gl.bindRenderbuffer(gl.RENDERBUFFER, self.depthStencilBuffer);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, self.bufferWidth, self.bufferHeight);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, self.depthStencilBuffer);
    } else if (self.ctxAttribs.depth) {
      gl.bindRenderbuffer(gl.RENDERBUFFER, self.depthBuffer);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, self.bufferWidth, self.bufferHeight);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, self.depthBuffer);
    } else if (self.ctxAttribs.stencil) {
      gl.bindRenderbuffer(gl.RENDERBUFFER, self.stencilBuffer);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.STENCIL_INDEX8, self.bufferWidth, self.bufferHeight);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.STENCIL_ATTACHMENT, gl.RENDERBUFFER, self.stencilBuffer);
    }
    if (!gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE) {
      console.error('Framebuffer incomplete!');
    }
    self.realBindFramebuffer.call(gl, gl.FRAMEBUFFER, self.lastBoundFramebuffer);
    if (self.scissorTest) {
      self.realEnable.call(gl, gl.SCISSOR_TEST);
    }
    self.realColorMask.apply(gl, self.colorMask);
    self.realViewport.apply(gl, self.viewport);
    self.realClearColor.apply(gl, self.clearColor);
  });
  if (this.cardboardUI) {
    this.cardboardUI.onResize();
  }
};
CardboardDistorter.prototype.patch = function () {
  if (this.isPatched) {
    return;
  }
  var self = this;
  var canvas = this.gl.canvas;
  var gl = this.gl;
  if (!isIOS()) {
    canvas.width = getScreenWidth() * this.bufferScale;
    canvas.height = getScreenHeight() * this.bufferScale;
    Object.defineProperty(canvas, 'width', {
      configurable: true,
      enumerable: true,
      get: function get() {
        return self.bufferWidth;
      },
      set: function set(value) {
        self.bufferWidth = value;
        self.realCanvasWidth.set.call(canvas, value);
        self.onResize();
      }
    });
    Object.defineProperty(canvas, 'height', {
      configurable: true,
      enumerable: true,
      get: function get() {
        return self.bufferHeight;
      },
      set: function set(value) {
        self.bufferHeight = value;
        self.realCanvasHeight.set.call(canvas, value);
        self.onResize();
      }
    });
  }
  this.lastBoundFramebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
  if (this.lastBoundFramebuffer == null) {
    this.lastBoundFramebuffer = this.framebuffer;
    this.gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
  }
  this.gl.bindFramebuffer = function (target, framebuffer) {
    self.lastBoundFramebuffer = framebuffer ? framebuffer : self.framebuffer;
    self.realBindFramebuffer.call(gl, target, self.lastBoundFramebuffer);
  };
  this.cullFace = gl.getParameter(gl.CULL_FACE);
  this.depthTest = gl.getParameter(gl.DEPTH_TEST);
  this.blend = gl.getParameter(gl.BLEND);
  this.scissorTest = gl.getParameter(gl.SCISSOR_TEST);
  this.stencilTest = gl.getParameter(gl.STENCIL_TEST);
  gl.enable = function (pname) {
    switch (pname) {
      case gl.CULL_FACE:
        self.cullFace = true;break;
      case gl.DEPTH_TEST:
        self.depthTest = true;break;
      case gl.BLEND:
        self.blend = true;break;
      case gl.SCISSOR_TEST:
        self.scissorTest = true;break;
      case gl.STENCIL_TEST:
        self.stencilTest = true;break;
    }
    self.realEnable.call(gl, pname);
  };
  gl.disable = function (pname) {
    switch (pname) {
      case gl.CULL_FACE:
        self.cullFace = false;break;
      case gl.DEPTH_TEST:
        self.depthTest = false;break;
      case gl.BLEND:
        self.blend = false;break;
      case gl.SCISSOR_TEST:
        self.scissorTest = false;break;
      case gl.STENCIL_TEST:
        self.stencilTest = false;break;
    }
    self.realDisable.call(gl, pname);
  };
  this.colorMask = gl.getParameter(gl.COLOR_WRITEMASK);
  gl.colorMask = function (r, g, b, a) {
    self.colorMask[0] = r;
    self.colorMask[1] = g;
    self.colorMask[2] = b;
    self.colorMask[3] = a;
    self.realColorMask.call(gl, r, g, b, a);
  };
  this.clearColor = gl.getParameter(gl.COLOR_CLEAR_VALUE);
  gl.clearColor = function (r, g, b, a) {
    self.clearColor[0] = r;
    self.clearColor[1] = g;
    self.clearColor[2] = b;
    self.clearColor[3] = a;
    self.realClearColor.call(gl, r, g, b, a);
  };
  this.viewport = gl.getParameter(gl.VIEWPORT);
  gl.viewport = function (x, y, w, h) {
    self.viewport[0] = x;
    self.viewport[1] = y;
    self.viewport[2] = w;
    self.viewport[3] = h;
    self.realViewport.call(gl, x, y, w, h);
  };
  this.isPatched = true;
  safariCssSizeWorkaround(canvas);
};
CardboardDistorter.prototype.unpatch = function () {
  if (!this.isPatched) {
    return;
  }
  var gl = this.gl;
  var canvas = this.gl.canvas;
  if (!isIOS()) {
    Object.defineProperty(canvas, 'width', this.realCanvasWidth);
    Object.defineProperty(canvas, 'height', this.realCanvasHeight);
  }
  canvas.width = this.bufferWidth;
  canvas.height = this.bufferHeight;
  gl.bindFramebuffer = this.realBindFramebuffer;
  gl.enable = this.realEnable;
  gl.disable = this.realDisable;
  gl.colorMask = this.realColorMask;
  gl.clearColor = this.realClearColor;
  gl.viewport = this.realViewport;
  if (this.lastBoundFramebuffer == this.framebuffer) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }
  this.isPatched = false;
  setTimeout(function () {
    safariCssSizeWorkaround(canvas);
  }, 1);
};
CardboardDistorter.prototype.setTextureBounds = function (leftBounds, rightBounds) {
  if (!leftBounds) {
    leftBounds = [0, 0, 0.5, 1];
  }
  if (!rightBounds) {
    rightBounds = [0.5, 0, 0.5, 1];
  }
  this.viewportOffsetScale[0] = leftBounds[0];
  this.viewportOffsetScale[1] = leftBounds[1];
  this.viewportOffsetScale[2] = leftBounds[2];
  this.viewportOffsetScale[3] = leftBounds[3];
  this.viewportOffsetScale[4] = rightBounds[0];
  this.viewportOffsetScale[5] = rightBounds[1];
  this.viewportOffsetScale[6] = rightBounds[2];
  this.viewportOffsetScale[7] = rightBounds[3];
};
CardboardDistorter.prototype.submitFrame = function () {
  var gl = this.gl;
  var self = this;
  var glState = [];
  if (!this.dirtySubmitFrameBindings) {
    glState.push(gl.CURRENT_PROGRAM, gl.ARRAY_BUFFER_BINDING, gl.ELEMENT_ARRAY_BUFFER_BINDING, gl.TEXTURE_BINDING_2D, gl.TEXTURE0);
  }
  glPreserveState(gl, glState, function (gl) {
    self.realBindFramebuffer.call(gl, gl.FRAMEBUFFER, null);
    if (self.cullFace) {
      self.realDisable.call(gl, gl.CULL_FACE);
    }
    if (self.depthTest) {
      self.realDisable.call(gl, gl.DEPTH_TEST);
    }
    if (self.blend) {
      self.realDisable.call(gl, gl.BLEND);
    }
    if (self.scissorTest) {
      self.realDisable.call(gl, gl.SCISSOR_TEST);
    }
    if (self.stencilTest) {
      self.realDisable.call(gl, gl.STENCIL_TEST);
    }
    self.realColorMask.call(gl, true, true, true, true);
    self.realViewport.call(gl, 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    if (self.ctxAttribs.alpha || isIOS()) {
      self.realClearColor.call(gl, 0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    gl.useProgram(self.program);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.indexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, self.vertexBuffer);
    gl.enableVertexAttribArray(self.attribs.position);
    gl.enableVertexAttribArray(self.attribs.texCoord);
    gl.vertexAttribPointer(self.attribs.position, 2, gl.FLOAT, false, 20, 0);
    gl.vertexAttribPointer(self.attribs.texCoord, 3, gl.FLOAT, false, 20, 8);
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(self.uniforms.diffuse, 0);
    gl.bindTexture(gl.TEXTURE_2D, self.renderTarget);
    gl.uniform4fv(self.uniforms.viewportOffsetScale, self.viewportOffsetScale);
    gl.drawElements(gl.TRIANGLES, self.indexCount, gl.UNSIGNED_SHORT, 0);
    if (self.cardboardUI) {
      self.cardboardUI.renderNoState();
    }
    self.realBindFramebuffer.call(self.gl, gl.FRAMEBUFFER, self.framebuffer);
    if (!self.ctxAttribs.preserveDrawingBuffer) {
      self.realClearColor.call(gl, 0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    if (!self.dirtySubmitFrameBindings) {
      self.realBindFramebuffer.call(gl, gl.FRAMEBUFFER, self.lastBoundFramebuffer);
    }
    if (self.cullFace) {
      self.realEnable.call(gl, gl.CULL_FACE);
    }
    if (self.depthTest) {
      self.realEnable.call(gl, gl.DEPTH_TEST);
    }
    if (self.blend) {
      self.realEnable.call(gl, gl.BLEND);
    }
    if (self.scissorTest) {
      self.realEnable.call(gl, gl.SCISSOR_TEST);
    }
    if (self.stencilTest) {
      self.realEnable.call(gl, gl.STENCIL_TEST);
    }
    self.realColorMask.apply(gl, self.colorMask);
    self.realViewport.apply(gl, self.viewport);
    if (self.ctxAttribs.alpha || !self.ctxAttribs.preserveDrawingBuffer) {
      self.realClearColor.apply(gl, self.clearColor);
    }
  });
  if (isIOS()) {
    var canvas = gl.canvas;
    if (canvas.width != self.bufferWidth || canvas.height != self.bufferHeight) {
      self.bufferWidth = canvas.width;
      self.bufferHeight = canvas.height;
      self.onResize();
    }
  }
};
CardboardDistorter.prototype.updateDeviceInfo = function (deviceInfo) {
  var gl = this.gl;
  var self = this;
  var glState = [gl.ARRAY_BUFFER_BINDING, gl.ELEMENT_ARRAY_BUFFER_BINDING];
  glPreserveState(gl, glState, function (gl) {
    var vertices = self.computeMeshVertices_(self.meshWidth, self.meshHeight, deviceInfo);
    gl.bindBuffer(gl.ARRAY_BUFFER, self.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    if (!self.indexCount) {
      var indices = self.computeMeshIndices_(self.meshWidth, self.meshHeight);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
      self.indexCount = indices.length;
    }
  });
};
CardboardDistorter.prototype.computeMeshVertices_ = function (width, height, deviceInfo) {
  var vertices = new Float32Array(2 * width * height * 5);
  var lensFrustum = deviceInfo.getLeftEyeVisibleTanAngles();
  var noLensFrustum = deviceInfo.getLeftEyeNoLensTanAngles();
  var viewport = deviceInfo.getLeftEyeVisibleScreenRect(noLensFrustum);
  var vidx = 0;
  for (var e = 0; e < 2; e++) {
    for (var j = 0; j < height; j++) {
      for (var i = 0; i < width; i++, vidx++) {
        var u = i / (width - 1);
        var v = j / (height - 1);
        var s = u;
        var t = v;
        var x = lerp(lensFrustum[0], lensFrustum[2], u);
        var y = lerp(lensFrustum[3], lensFrustum[1], v);
        var d = Math.sqrt(x * x + y * y);
        var r = deviceInfo.distortion.distortInverse(d);
        var p = x * r / d;
        var q = y * r / d;
        u = (p - noLensFrustum[0]) / (noLensFrustum[2] - noLensFrustum[0]);
        v = (q - noLensFrustum[3]) / (noLensFrustum[1] - noLensFrustum[3]);
        u = (viewport.x + u * viewport.width - 0.5) * 2.0;
        v = (viewport.y + v * viewport.height - 0.5) * 2.0;
        vertices[vidx * 5 + 0] = u;
        vertices[vidx * 5 + 1] = v;
        vertices[vidx * 5 + 2] = s;
        vertices[vidx * 5 + 3] = t;
        vertices[vidx * 5 + 4] = e;
      }
    }
    var w = lensFrustum[2] - lensFrustum[0];
    lensFrustum[0] = -(w + lensFrustum[0]);
    lensFrustum[2] = w - lensFrustum[2];
    w = noLensFrustum[2] - noLensFrustum[0];
    noLensFrustum[0] = -(w + noLensFrustum[0]);
    noLensFrustum[2] = w - noLensFrustum[2];
    viewport.x = 1 - (viewport.x + viewport.width);
  }
  return vertices;
};
CardboardDistorter.prototype.computeMeshIndices_ = function (width, height) {
  var indices = new Uint16Array(2 * (width - 1) * (height - 1) * 6);
  var halfwidth = width / 2;
  var halfheight = height / 2;
  var vidx = 0;
  var iidx = 0;
  for (var e = 0; e < 2; e++) {
    for (var j = 0; j < height; j++) {
      for (var i = 0; i < width; i++, vidx++) {
        if (i == 0 || j == 0) continue;
        if (i <= halfwidth == j <= halfheight) {
          indices[iidx++] = vidx;
          indices[iidx++] = vidx - width - 1;
          indices[iidx++] = vidx - width;
          indices[iidx++] = vidx - width - 1;
          indices[iidx++] = vidx;
          indices[iidx++] = vidx - 1;
        } else {
          indices[iidx++] = vidx - 1;
          indices[iidx++] = vidx - width;
          indices[iidx++] = vidx;
          indices[iidx++] = vidx - width;
          indices[iidx++] = vidx - 1;
          indices[iidx++] = vidx - width - 1;
        }
      }
    }
  }
  return indices;
};
CardboardDistorter.prototype.getOwnPropertyDescriptor_ = function (proto, attrName) {
  var descriptor = Object.getOwnPropertyDescriptor(proto, attrName);
  if (descriptor.get === undefined || descriptor.set === undefined) {
    descriptor.configurable = true;
    descriptor.enumerable = true;
    descriptor.get = function () {
      return this.getAttribute(attrName);
    };
    descriptor.set = function (val) {
      this.setAttribute(attrName, val);
    };
  }
  return descriptor;
};
var uiVS = ['attribute vec2 position;', 'uniform mat4 projectionMat;', 'void main() {', '  gl_Position = projectionMat * vec4( position, -1.0, 1.0 );', '}'].join('\n');
var uiFS = ['precision mediump float;', 'uniform vec4 color;', 'void main() {', '  gl_FragColor = color;', '}'].join('\n');
var DEG2RAD = Math.PI / 180.0;
var kAnglePerGearSection = 60;
var kOuterRimEndAngle = 12;
var kInnerRimBeginAngle = 20;
var kOuterRadius = 1;
var kMiddleRadius = 0.75;
var kInnerRadius = 0.3125;
var kCenterLineThicknessDp = 4;
var kButtonWidthDp = 28;
var kTouchSlopFactor = 1.5;
function CardboardUI(gl) {
  this.gl = gl;
  this.attribs = {
    position: 0
  };
  this.program = linkProgram(gl, uiVS, uiFS, this.attribs);
  this.uniforms = getProgramUniforms(gl, this.program);
  this.vertexBuffer = gl.createBuffer();
  this.gearOffset = 0;
  this.gearVertexCount = 0;
  this.arrowOffset = 0;
  this.arrowVertexCount = 0;
  this.projMat = new Float32Array(16);
  this.listener = null;
  this.onResize();
}
CardboardUI.prototype.destroy = function () {
  var gl = this.gl;
  if (this.listener) {
    gl.canvas.removeEventListener('click', this.listener, false);
  }
  gl.deleteProgram(this.program);
  gl.deleteBuffer(this.vertexBuffer);
};
CardboardUI.prototype.listen = function (optionsCallback, backCallback) {
  var canvas = this.gl.canvas;
  this.listener = function (event) {
    var midline = canvas.clientWidth / 2;
    var buttonSize = kButtonWidthDp * kTouchSlopFactor;
    if (event.clientX > midline - buttonSize && event.clientX < midline + buttonSize && event.clientY > canvas.clientHeight - buttonSize) {
      optionsCallback(event);
    }
    else if (event.clientX < buttonSize && event.clientY < buttonSize) {
        backCallback(event);
      }
  };
  canvas.addEventListener('click', this.listener, false);
};
CardboardUI.prototype.onResize = function () {
  var gl = this.gl;
  var self = this;
  var glState = [gl.ARRAY_BUFFER_BINDING];
  glPreserveState(gl, glState, function (gl) {
    var vertices = [];
    var midline = gl.drawingBufferWidth / 2;
    var physicalPixels = Math.max(screen.width, screen.height) * window.devicePixelRatio;
    var scalingRatio = gl.drawingBufferWidth / physicalPixels;
    var dps = scalingRatio * window.devicePixelRatio;
    var lineWidth = kCenterLineThicknessDp * dps / 2;
    var buttonSize = kButtonWidthDp * kTouchSlopFactor * dps;
    var buttonScale = kButtonWidthDp * dps / 2;
    var buttonBorder = (kButtonWidthDp * kTouchSlopFactor - kButtonWidthDp) * dps;
    vertices.push(midline - lineWidth, buttonSize);
    vertices.push(midline - lineWidth, gl.drawingBufferHeight);
    vertices.push(midline + lineWidth, buttonSize);
    vertices.push(midline + lineWidth, gl.drawingBufferHeight);
    self.gearOffset = vertices.length / 2;
    function addGearSegment(theta, r) {
      var angle = (90 - theta) * DEG2RAD;
      var x = Math.cos(angle);
      var y = Math.sin(angle);
      vertices.push(kInnerRadius * x * buttonScale + midline, kInnerRadius * y * buttonScale + buttonScale);
      vertices.push(r * x * buttonScale + midline, r * y * buttonScale + buttonScale);
    }
    for (var i = 0; i <= 6; i++) {
      var segmentTheta = i * kAnglePerGearSection;
      addGearSegment(segmentTheta, kOuterRadius);
      addGearSegment(segmentTheta + kOuterRimEndAngle, kOuterRadius);
      addGearSegment(segmentTheta + kInnerRimBeginAngle, kMiddleRadius);
      addGearSegment(segmentTheta + (kAnglePerGearSection - kInnerRimBeginAngle), kMiddleRadius);
      addGearSegment(segmentTheta + (kAnglePerGearSection - kOuterRimEndAngle), kOuterRadius);
    }
    self.gearVertexCount = vertices.length / 2 - self.gearOffset;
    self.arrowOffset = vertices.length / 2;
    function addArrowVertex(x, y) {
      vertices.push(buttonBorder + x, gl.drawingBufferHeight - buttonBorder - y);
    }
    var angledLineWidth = lineWidth / Math.sin(45 * DEG2RAD);
    addArrowVertex(0, buttonScale);
    addArrowVertex(buttonScale, 0);
    addArrowVertex(buttonScale + angledLineWidth, angledLineWidth);
    addArrowVertex(angledLineWidth, buttonScale + angledLineWidth);
    addArrowVertex(angledLineWidth, buttonScale - angledLineWidth);
    addArrowVertex(0, buttonScale);
    addArrowVertex(buttonScale, buttonScale * 2);
    addArrowVertex(buttonScale + angledLineWidth, buttonScale * 2 - angledLineWidth);
    addArrowVertex(angledLineWidth, buttonScale - angledLineWidth);
    addArrowVertex(0, buttonScale);
    addArrowVertex(angledLineWidth, buttonScale - lineWidth);
    addArrowVertex(kButtonWidthDp * dps, buttonScale - lineWidth);
    addArrowVertex(angledLineWidth, buttonScale + lineWidth);
    addArrowVertex(kButtonWidthDp * dps, buttonScale + lineWidth);
    self.arrowVertexCount = vertices.length / 2 - self.arrowOffset;
    gl.bindBuffer(gl.ARRAY_BUFFER, self.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  });
};
CardboardUI.prototype.render = function () {
  var gl = this.gl;
  var self = this;
  var glState = [gl.CULL_FACE, gl.DEPTH_TEST, gl.BLEND, gl.SCISSOR_TEST, gl.STENCIL_TEST, gl.COLOR_WRITEMASK, gl.VIEWPORT, gl.CURRENT_PROGRAM, gl.ARRAY_BUFFER_BINDING];
  glPreserveState(gl, glState, function (gl) {
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.disable(gl.SCISSOR_TEST);
    gl.disable(gl.STENCIL_TEST);
    gl.colorMask(true, true, true, true);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    self.renderNoState();
  });
};
CardboardUI.prototype.renderNoState = function () {
  var gl = this.gl;
  gl.useProgram(this.program);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.enableVertexAttribArray(this.attribs.position);
  gl.vertexAttribPointer(this.attribs.position, 2, gl.FLOAT, false, 8, 0);
  gl.uniform4f(this.uniforms.color, 1.0, 1.0, 1.0, 1.0);
  orthoMatrix(this.projMat, 0, gl.drawingBufferWidth, 0, gl.drawingBufferHeight, 0.1, 1024.0);
  gl.uniformMatrix4fv(this.uniforms.projectionMat, false, this.projMat);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.drawArrays(gl.TRIANGLE_STRIP, this.gearOffset, this.gearVertexCount);
  gl.drawArrays(gl.TRIANGLE_STRIP, this.arrowOffset, this.arrowVertexCount);
};
function Distortion(coefficients) {
  this.coefficients = coefficients;
}
Distortion.prototype.distortInverse = function (radius) {
  var r0 = 0;
  var r1 = 1;
  var dr0 = radius - this.distort(r0);
  while (Math.abs(r1 - r0) > 0.0001             ) {
    var dr1 = radius - this.distort(r1);
    var r2 = r1 - dr1 * ((r1 - r0) / (dr1 - dr0));
    r0 = r1;
    r1 = r2;
    dr0 = dr1;
  }
  return r1;
};
Distortion.prototype.distort = function (radius) {
  var r2 = radius * radius;
  var ret = 0;
  for (var i = 0; i < this.coefficients.length; i++) {
    ret = r2 * (ret + this.coefficients[i]);
  }
  return (ret + 1) * radius;
};
var degToRad = Math.PI / 180;
var radToDeg = 180 / Math.PI;
var Vector3 = function Vector3(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
};
Vector3.prototype = {
  constructor: Vector3,
  set: function set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  },
  copy: function copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  },
  length: function length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  },
  normalize: function normalize() {
    var scalar = this.length();
    if (scalar !== 0) {
      var invScalar = 1 / scalar;
      this.multiplyScalar(invScalar);
    } else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }
    return this;
  },
  multiplyScalar: function multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
  },
  applyQuaternion: function applyQuaternion(q) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var qx = q.x;
    var qy = q.y;
    var qz = q.z;
    var qw = q.w;
    var ix = qw * x + qy * z - qz * y;
    var iy = qw * y + qz * x - qx * z;
    var iz = qw * z + qx * y - qy * x;
    var iw = -qx * x - qy * y - qz * z;
    this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return this;
  },
  dot: function dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },
  crossVectors: function crossVectors(a, b) {
    var ax = a.x,
        ay = a.y,
        az = a.z;
    var bx = b.x,
        by = b.y,
        bz = b.z;
    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  }
};
var Quaternion = function Quaternion(x, y, z, w) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.w = w !== undefined ? w : 1;
};
Quaternion.prototype = {
  constructor: Quaternion,
  set: function set(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  },
  copy: function copy(quaternion) {
    this.x = quaternion.x;
    this.y = quaternion.y;
    this.z = quaternion.z;
    this.w = quaternion.w;
    return this;
  },
  setFromEulerXYZ: function setFromEulerXYZ(x, y, z) {
    var c1 = Math.cos(x / 2);
    var c2 = Math.cos(y / 2);
    var c3 = Math.cos(z / 2);
    var s1 = Math.sin(x / 2);
    var s2 = Math.sin(y / 2);
    var s3 = Math.sin(z / 2);
    this.x = s1 * c2 * c3 + c1 * s2 * s3;
    this.y = c1 * s2 * c3 - s1 * c2 * s3;
    this.z = c1 * c2 * s3 + s1 * s2 * c3;
    this.w = c1 * c2 * c3 - s1 * s2 * s3;
    return this;
  },
  setFromEulerYXZ: function setFromEulerYXZ(x, y, z) {
    var c1 = Math.cos(x / 2);
    var c2 = Math.cos(y / 2);
    var c3 = Math.cos(z / 2);
    var s1 = Math.sin(x / 2);
    var s2 = Math.sin(y / 2);
    var s3 = Math.sin(z / 2);
    this.x = s1 * c2 * c3 + c1 * s2 * s3;
    this.y = c1 * s2 * c3 - s1 * c2 * s3;
    this.z = c1 * c2 * s3 - s1 * s2 * c3;
    this.w = c1 * c2 * c3 + s1 * s2 * s3;
    return this;
  },
  setFromAxisAngle: function setFromAxisAngle(axis, angle) {
    var halfAngle = angle / 2,
        s = Math.sin(halfAngle);
    this.x = axis.x * s;
    this.y = axis.y * s;
    this.z = axis.z * s;
    this.w = Math.cos(halfAngle);
    return this;
  },
  multiply: function multiply(q) {
    return this.multiplyQuaternions(this, q);
  },
  multiplyQuaternions: function multiplyQuaternions(a, b) {
    var qax = a.x,
        qay = a.y,
        qaz = a.z,
        qaw = a.w;
    var qbx = b.x,
        qby = b.y,
        qbz = b.z,
        qbw = b.w;
    this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
    return this;
  },
  inverse: function inverse() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
    this.normalize();
    return this;
  },
  normalize: function normalize() {
    var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    if (l === 0) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 1;
    } else {
      l = 1 / l;
      this.x = this.x * l;
      this.y = this.y * l;
      this.z = this.z * l;
      this.w = this.w * l;
    }
    return this;
  },
  slerp: function slerp(qb, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(qb);
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w;
    var cosHalfTheta = w * qb.w + x * qb.x + y * qb.y + z * qb.z;
    if (cosHalfTheta < 0) {
      this.w = -qb.w;
      this.x = -qb.x;
      this.y = -qb.y;
      this.z = -qb.z;
      cosHalfTheta = -cosHalfTheta;
    } else {
      this.copy(qb);
    }
    if (cosHalfTheta >= 1.0) {
      this.w = w;
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
    var halfTheta = Math.acos(cosHalfTheta);
    var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
    if (Math.abs(sinHalfTheta) < 0.001) {
      this.w = 0.5 * (w + this.w);
      this.x = 0.5 * (x + this.x);
      this.y = 0.5 * (y + this.y);
      this.z = 0.5 * (z + this.z);
      return this;
    }
    var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
        ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
    this.w = w * ratioA + this.w * ratioB;
    this.x = x * ratioA + this.x * ratioB;
    this.y = y * ratioA + this.y * ratioB;
    this.z = z * ratioA + this.z * ratioB;
    return this;
  },
  setFromUnitVectors: function () {
    var v1, r;
    var EPS = 0.000001;
    return function (vFrom, vTo) {
      if (v1 === undefined) v1 = new Vector3();
      r = vFrom.dot(vTo) + 1;
      if (r < EPS) {
        r = 0;
        if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
          v1.set(-vFrom.y, vFrom.x, 0);
        } else {
          v1.set(0, -vFrom.z, vFrom.y);
        }
      } else {
        v1.crossVectors(vFrom, vTo);
      }
      this.x = v1.x;
      this.y = v1.y;
      this.z = v1.z;
      this.w = r;
      this.normalize();
      return this;
    };
  }()
};
function Device(params) {
  this.width = params.width || getScreenWidth();
  this.height = params.height || getScreenHeight();
  this.widthMeters = params.widthMeters;
  this.heightMeters = params.heightMeters;
  this.bevelMeters = params.bevelMeters;
}
var DEFAULT_ANDROID = new Device({
  widthMeters: 0.110,
  heightMeters: 0.062,
  bevelMeters: 0.004
});
var DEFAULT_IOS = new Device({
  widthMeters: 0.1038,
  heightMeters: 0.0584,
  bevelMeters: 0.004
});
var Viewers = {
  CardboardV1: new CardboardViewer({
    id: 'CardboardV1',
    label: 'Cardboard I/O 2014',
    fov: 40,
    interLensDistance: 0.060,
    baselineLensDistance: 0.035,
    screenLensDistance: 0.042,
    distortionCoefficients: [0.441, 0.156],
    inverseCoefficients: [-0.4410035, 0.42756155, -0.4804439, 0.5460139, -0.58821183, 0.5733938, -0.48303202, 0.33299083, -0.17573841, 0.0651772, -0.01488963, 0.001559834]
  }),
  CardboardV2: new CardboardViewer({
    id: 'CardboardV2',
    label: 'Cardboard I/O 2015',
    fov: 60,
    interLensDistance: 0.064,
    baselineLensDistance: 0.035,
    screenLensDistance: 0.039,
    distortionCoefficients: [0.34, 0.55],
    inverseCoefficients: [-0.33836704, -0.18162185, 0.862655, -1.2462051, 1.0560602, -0.58208317, 0.21609078, -0.05444823, 0.009177956, -9.904169E-4, 6.183535E-5, -1.6981803E-6]
  })
};
function DeviceInfo(deviceParams, additionalViewers) {
  this.viewer = Viewers.CardboardV2;
  this.updateDeviceParams(deviceParams);
  this.distortion = new Distortion(this.viewer.distortionCoefficients);
  for (var i = 0; i < additionalViewers.length; i++) {
    var viewer = additionalViewers[i];
    Viewers[viewer.id] = new CardboardViewer(viewer);
  }
}
DeviceInfo.prototype.updateDeviceParams = function (deviceParams) {
  this.device = this.determineDevice_(deviceParams) || this.device;
};
DeviceInfo.prototype.getDevice = function () {
  return this.device;
};
DeviceInfo.prototype.setViewer = function (viewer) {
  this.viewer = viewer;
  this.distortion = new Distortion(this.viewer.distortionCoefficients);
};
DeviceInfo.prototype.determineDevice_ = function (deviceParams) {
  if (!deviceParams) {
    if (isIOS()) {
      console.warn('Using fallback iOS device measurements.');
      return DEFAULT_IOS;
    } else {
      console.warn('Using fallback Android device measurements.');
      return DEFAULT_ANDROID;
    }
  }
  var METERS_PER_INCH = 0.0254;
  var metersPerPixelX = METERS_PER_INCH / deviceParams.xdpi;
  var metersPerPixelY = METERS_PER_INCH / deviceParams.ydpi;
  var width = getScreenWidth();
  var height = getScreenHeight();
  return new Device({
    widthMeters: metersPerPixelX * width,
    heightMeters: metersPerPixelY * height,
    bevelMeters: deviceParams.bevelMm * 0.001
  });
};
DeviceInfo.prototype.getDistortedFieldOfViewLeftEye = function () {
  var viewer = this.viewer;
  var device = this.device;
  var distortion = this.distortion;
  var eyeToScreenDistance = viewer.screenLensDistance;
  var outerDist = (device.widthMeters - viewer.interLensDistance) / 2;
  var innerDist = viewer.interLensDistance / 2;
  var bottomDist = viewer.baselineLensDistance - device.bevelMeters;
  var topDist = device.heightMeters - bottomDist;
  var outerAngle = radToDeg * Math.atan(distortion.distort(outerDist / eyeToScreenDistance));
  var innerAngle = radToDeg * Math.atan(distortion.distort(innerDist / eyeToScreenDistance));
  var bottomAngle = radToDeg * Math.atan(distortion.distort(bottomDist / eyeToScreenDistance));
  var topAngle = radToDeg * Math.atan(distortion.distort(topDist / eyeToScreenDistance));
  return {
    leftDegrees: Math.min(outerAngle, viewer.fov),
    rightDegrees: Math.min(innerAngle, viewer.fov),
    downDegrees: Math.min(bottomAngle, viewer.fov),
    upDegrees: Math.min(topAngle, viewer.fov)
  };
};
DeviceInfo.prototype.getLeftEyeVisibleTanAngles = function () {
  var viewer = this.viewer;
  var device = this.device;
  var distortion = this.distortion;
  var fovLeft = Math.tan(-degToRad * viewer.fov);
  var fovTop = Math.tan(degToRad * viewer.fov);
  var fovRight = Math.tan(degToRad * viewer.fov);
  var fovBottom = Math.tan(-degToRad * viewer.fov);
  var halfWidth = device.widthMeters / 4;
  var halfHeight = device.heightMeters / 2;
  var verticalLensOffset = viewer.baselineLensDistance - device.bevelMeters - halfHeight;
  var centerX = viewer.interLensDistance / 2 - halfWidth;
  var centerY = -verticalLensOffset;
  var centerZ = viewer.screenLensDistance;
  var screenLeft = distortion.distort((centerX - halfWidth) / centerZ);
  var screenTop = distortion.distort((centerY + halfHeight) / centerZ);
  var screenRight = distortion.distort((centerX + halfWidth) / centerZ);
  var screenBottom = distortion.distort((centerY - halfHeight) / centerZ);
  var result = new Float32Array(4);
  result[0] = Math.max(fovLeft, screenLeft);
  result[1] = Math.min(fovTop, screenTop);
  result[2] = Math.min(fovRight, screenRight);
  result[3] = Math.max(fovBottom, screenBottom);
  return result;
};
DeviceInfo.prototype.getLeftEyeNoLensTanAngles = function () {
  var viewer = this.viewer;
  var device = this.device;
  var distortion = this.distortion;
  var result = new Float32Array(4);
  var fovLeft = distortion.distortInverse(Math.tan(-degToRad * viewer.fov));
  var fovTop = distortion.distortInverse(Math.tan(degToRad * viewer.fov));
  var fovRight = distortion.distortInverse(Math.tan(degToRad * viewer.fov));
  var fovBottom = distortion.distortInverse(Math.tan(-degToRad * viewer.fov));
  var halfWidth = device.widthMeters / 4;
  var halfHeight = device.heightMeters / 2;
  var verticalLensOffset = viewer.baselineLensDistance - device.bevelMeters - halfHeight;
  var centerX = viewer.interLensDistance / 2 - halfWidth;
  var centerY = -verticalLensOffset;
  var centerZ = viewer.screenLensDistance;
  var screenLeft = (centerX - halfWidth) / centerZ;
  var screenTop = (centerY + halfHeight) / centerZ;
  var screenRight = (centerX + halfWidth) / centerZ;
  var screenBottom = (centerY - halfHeight) / centerZ;
  result[0] = Math.max(fovLeft, screenLeft);
  result[1] = Math.min(fovTop, screenTop);
  result[2] = Math.min(fovRight, screenRight);
  result[3] = Math.max(fovBottom, screenBottom);
  return result;
};
DeviceInfo.prototype.getLeftEyeVisibleScreenRect = function (undistortedFrustum) {
  var viewer = this.viewer;
  var device = this.device;
  var dist = viewer.screenLensDistance;
  var eyeX = (device.widthMeters - viewer.interLensDistance) / 2;
  var eyeY = viewer.baselineLensDistance - device.bevelMeters;
  var left = (undistortedFrustum[0] * dist + eyeX) / device.widthMeters;
  var top = (undistortedFrustum[1] * dist + eyeY) / device.heightMeters;
  var right = (undistortedFrustum[2] * dist + eyeX) / device.widthMeters;
  var bottom = (undistortedFrustum[3] * dist + eyeY) / device.heightMeters;
  return {
    x: left,
    y: bottom,
    width: right - left,
    height: top - bottom
  };
};
DeviceInfo.prototype.getFieldOfViewLeftEye = function (opt_isUndistorted) {
  return opt_isUndistorted ? this.getUndistortedFieldOfViewLeftEye() : this.getDistortedFieldOfViewLeftEye();
};
DeviceInfo.prototype.getFieldOfViewRightEye = function (opt_isUndistorted) {
  var fov = this.getFieldOfViewLeftEye(opt_isUndistorted);
  return {
    leftDegrees: fov.rightDegrees,
    rightDegrees: fov.leftDegrees,
    upDegrees: fov.upDegrees,
    downDegrees: fov.downDegrees
  };
};
DeviceInfo.prototype.getUndistortedFieldOfViewLeftEye = function () {
  var p = this.getUndistortedParams_();
  return {
    leftDegrees: radToDeg * Math.atan(p.outerDist),
    rightDegrees: radToDeg * Math.atan(p.innerDist),
    downDegrees: radToDeg * Math.atan(p.bottomDist),
    upDegrees: radToDeg * Math.atan(p.topDist)
  };
};
DeviceInfo.prototype.getUndistortedViewportLeftEye = function () {
  var p = this.getUndistortedParams_();
  var viewer = this.viewer;
  var device = this.device;
  var eyeToScreenDistance = viewer.screenLensDistance;
  var screenWidth = device.widthMeters / eyeToScreenDistance;
  var screenHeight = device.heightMeters / eyeToScreenDistance;
  var xPxPerTanAngle = device.width / screenWidth;
  var yPxPerTanAngle = device.height / screenHeight;
  var x = Math.round((p.eyePosX - p.outerDist) * xPxPerTanAngle);
  var y = Math.round((p.eyePosY - p.bottomDist) * yPxPerTanAngle);
  return {
    x: x,
    y: y,
    width: Math.round((p.eyePosX + p.innerDist) * xPxPerTanAngle) - x,
    height: Math.round((p.eyePosY + p.topDist) * yPxPerTanAngle) - y
  };
};
DeviceInfo.prototype.getUndistortedParams_ = function () {
  var viewer = this.viewer;
  var device = this.device;
  var distortion = this.distortion;
  var eyeToScreenDistance = viewer.screenLensDistance;
  var halfLensDistance = viewer.interLensDistance / 2 / eyeToScreenDistance;
  var screenWidth = device.widthMeters / eyeToScreenDistance;
  var screenHeight = device.heightMeters / eyeToScreenDistance;
  var eyePosX = screenWidth / 2 - halfLensDistance;
  var eyePosY = (viewer.baselineLensDistance - device.bevelMeters) / eyeToScreenDistance;
  var maxFov = viewer.fov;
  var viewerMax = distortion.distortInverse(Math.tan(degToRad * maxFov));
  var outerDist = Math.min(eyePosX, viewerMax);
  var innerDist = Math.min(halfLensDistance, viewerMax);
  var bottomDist = Math.min(eyePosY, viewerMax);
  var topDist = Math.min(screenHeight - eyePosY, viewerMax);
  return {
    outerDist: outerDist,
    innerDist: innerDist,
    topDist: topDist,
    bottomDist: bottomDist,
    eyePosX: eyePosX,
    eyePosY: eyePosY
  };
};
function CardboardViewer(params) {
  this.id = params.id;
  this.label = params.label;
  this.fov = params.fov;
  this.interLensDistance = params.interLensDistance;
  this.baselineLensDistance = params.baselineLensDistance;
  this.screenLensDistance = params.screenLensDistance;
  this.distortionCoefficients = params.distortionCoefficients;
  this.inverseCoefficients = params.inverseCoefficients;
}
DeviceInfo.Viewers = Viewers;
var format = 1;
var last_updated = "2018-12-10T17:01:42Z";
var devices = [{"type":"android","rules":[{"mdmh":"asus/*/Nexus 7/*"},{"ua":"Nexus 7"}],"dpi":[320.8,323],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"asus/*/ASUS_Z00AD/*"},{"ua":"ASUS_Z00AD"}],"dpi":[403,404.6],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Google/*/Pixel 2 XL/*"},{"ua":"Pixel 2 XL"}],"dpi":537.9,"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Google/*/Pixel 3 XL/*"},{"ua":"Pixel 3 XL"}],"dpi":[558.5,553.8],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Google/*/Pixel XL/*"},{"ua":"Pixel XL"}],"dpi":[537.9,533],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Google/*/Pixel 3/*"},{"ua":"Pixel 3"}],"dpi":442.4,"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Google/*/Pixel 2/*"},{"ua":"Pixel 2"}],"dpi":441,"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"Google/*/Pixel/*"},{"ua":"Pixel"}],"dpi":[432.6,436.7],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"HTC/*/HTC6435LVW/*"},{"ua":"HTC6435LVW"}],"dpi":[449.7,443.3],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"HTC/*/HTC One XL/*"},{"ua":"HTC One XL"}],"dpi":[315.3,314.6],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"htc/*/Nexus 9/*"},{"ua":"Nexus 9"}],"dpi":289,"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"HTC/*/HTC One M9/*"},{"ua":"HTC One M9"}],"dpi":[442.5,443.3],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"HTC/*/HTC One_M8/*"},{"ua":"HTC One_M8"}],"dpi":[449.7,447.4],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"HTC/*/HTC One/*"},{"ua":"HTC One"}],"dpi":472.8,"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Huawei/*/Nexus 6P/*"},{"ua":"Nexus 6P"}],"dpi":[515.1,518],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Huawei/*/BLN-L24/*"},{"ua":"HONORBLN-L24"}],"dpi":480,"bw":4,"ac":500},{"type":"android","rules":[{"mdmh":"Huawei/*/BKL-L09/*"},{"ua":"BKL-L09"}],"dpi":403,"bw":3.47,"ac":500},{"type":"android","rules":[{"mdmh":"LENOVO/*/Lenovo PB2-690Y/*"},{"ua":"Lenovo PB2-690Y"}],"dpi":[457.2,454.713],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"LGE/*/Nexus 5X/*"},{"ua":"Nexus 5X"}],"dpi":[422,419.9],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"LGE/*/LGMS345/*"},{"ua":"LGMS345"}],"dpi":[221.7,219.1],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"LGE/*/LG-D800/*"},{"ua":"LG-D800"}],"dpi":[422,424.1],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"LGE/*/LG-D850/*"},{"ua":"LG-D850"}],"dpi":[537.9,541.9],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"LGE/*/VS985 4G/*"},{"ua":"VS985 4G"}],"dpi":[537.9,535.6],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"LGE/*/Nexus 5/*"},{"ua":"Nexus 5 B"}],"dpi":[442.4,444.8],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"LGE/*/Nexus 4/*"},{"ua":"Nexus 4"}],"dpi":[319.8,318.4],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"LGE/*/LG-P769/*"},{"ua":"LG-P769"}],"dpi":[240.6,247.5],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"LGE/*/LGMS323/*"},{"ua":"LGMS323"}],"dpi":[206.6,204.6],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"LGE/*/LGLS996/*"},{"ua":"LGLS996"}],"dpi":[403.4,401.5],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Micromax/*/4560MMX/*"},{"ua":"4560MMX"}],"dpi":[240,219.4],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Micromax/*/A250/*"},{"ua":"Micromax A250"}],"dpi":[480,446.4],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Micromax/*/Micromax AQ4501/*"},{"ua":"Micromax AQ4501"}],"dpi":240,"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"motorola/*/G5/*"},{"ua":"Moto G (5) Plus"}],"dpi":[403.4,403],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"motorola/*/DROID RAZR/*"},{"ua":"DROID RAZR"}],"dpi":[368.1,256.7],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"motorola/*/XT830C/*"},{"ua":"XT830C"}],"dpi":[254,255.9],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"motorola/*/XT1021/*"},{"ua":"XT1021"}],"dpi":[254,256.7],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"motorola/*/XT1023/*"},{"ua":"XT1023"}],"dpi":[254,256.7],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"motorola/*/XT1028/*"},{"ua":"XT1028"}],"dpi":[326.6,327.6],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"motorola/*/XT1034/*"},{"ua":"XT1034"}],"dpi":[326.6,328.4],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"motorola/*/XT1053/*"},{"ua":"XT1053"}],"dpi":[315.3,316.1],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"motorola/*/XT1562/*"},{"ua":"XT1562"}],"dpi":[403.4,402.7],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"motorola/*/Nexus 6/*"},{"ua":"Nexus 6 B"}],"dpi":[494.3,489.7],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"motorola/*/XT1063/*"},{"ua":"XT1063"}],"dpi":[295,296.6],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"motorola/*/XT1064/*"},{"ua":"XT1064"}],"dpi":[295,295.6],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"motorola/*/XT1092/*"},{"ua":"XT1092"}],"dpi":[422,424.1],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"motorola/*/XT1095/*"},{"ua":"XT1095"}],"dpi":[422,423.4],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"motorola/*/G4/*"},{"ua":"Moto G (4)"}],"dpi":401,"bw":4,"ac":1000},{"type":"android","rules":[{"mdmh":"OnePlus/*/A0001/*"},{"ua":"A0001"}],"dpi":[403.4,401],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"OnePlus/*/ONE E1005/*"},{"ua":"ONE E1005"}],"dpi":[442.4,441.4],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"OnePlus/*/ONE A2005/*"},{"ua":"ONE A2005"}],"dpi":[391.9,405.4],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"OnePlus/*/ONEPLUS A5000/*"},{"ua":"ONEPLUS A5000 "}],"dpi":[403.411,399.737],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"OnePlus/*/ONE A5010/*"},{"ua":"ONEPLUS A5010"}],"dpi":[403,400],"bw":2,"ac":1000},{"type":"android","rules":[{"mdmh":"OPPO/*/X909/*"},{"ua":"X909"}],"dpi":[442.4,444.1],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/GT-I9082/*"},{"ua":"GT-I9082"}],"dpi":[184.7,185.4],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G360P/*"},{"ua":"SM-G360P"}],"dpi":[196.7,205.4],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/Nexus S/*"},{"ua":"Nexus S"}],"dpi":[234.5,229.8],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/GT-I9300/*"},{"ua":"GT-I9300"}],"dpi":[304.8,303.9],"bw":5,"ac":500},{"type":"android","rules":[{"mdmh":"samsung/*/SM-T230NU/*"},{"ua":"SM-T230NU"}],"dpi":216,"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"samsung/*/SGH-T399/*"},{"ua":"SGH-T399"}],"dpi":[217.7,231.4],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SGH-M919/*"},{"ua":"SGH-M919"}],"dpi":[440.8,437.7],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-N9005/*"},{"ua":"SM-N9005"}],"dpi":[386.4,387],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"samsung/*/SAMSUNG-SM-N900A/*"},{"ua":"SAMSUNG-SM-N900A"}],"dpi":[386.4,387.7],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/GT-I9500/*"},{"ua":"GT-I9500"}],"dpi":[442.5,443.3],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"samsung/*/GT-I9505/*"},{"ua":"GT-I9505"}],"dpi":439.4,"bw":4,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G900F/*"},{"ua":"SM-G900F"}],"dpi":[415.6,431.6],"bw":5,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G900M/*"},{"ua":"SM-G900M"}],"dpi":[415.6,431.6],"bw":5,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G800F/*"},{"ua":"SM-G800F"}],"dpi":326.8,"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G906S/*"},{"ua":"SM-G906S"}],"dpi":[562.7,572.4],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/GT-I9300/*"},{"ua":"GT-I9300"}],"dpi":[306.7,304.8],"bw":5,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-T535/*"},{"ua":"SM-T535"}],"dpi":[142.6,136.4],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"samsung/*/SM-N920C/*"},{"ua":"SM-N920C"}],"dpi":[515.1,518.4],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-N920P/*"},{"ua":"SM-N920P"}],"dpi":[386.3655,390.144],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-N920W8/*"},{"ua":"SM-N920W8"}],"dpi":[515.1,518.4],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/GT-I9300I/*"},{"ua":"GT-I9300I"}],"dpi":[304.8,305.8],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/GT-I9195/*"},{"ua":"GT-I9195"}],"dpi":[249.4,256.7],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"samsung/*/SPH-L520/*"},{"ua":"SPH-L520"}],"dpi":[249.4,255.9],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SAMSUNG-SGH-I717/*"},{"ua":"SAMSUNG-SGH-I717"}],"dpi":285.8,"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SPH-D710/*"},{"ua":"SPH-D710"}],"dpi":[217.7,204.2],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/GT-N7100/*"},{"ua":"GT-N7100"}],"dpi":265.1,"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SCH-I605/*"},{"ua":"SCH-I605"}],"dpi":265.1,"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/Galaxy Nexus/*"},{"ua":"Galaxy Nexus"}],"dpi":[315.3,314.2],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-N910H/*"},{"ua":"SM-N910H"}],"dpi":[515.1,518],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-N910C/*"},{"ua":"SM-N910C"}],"dpi":[515.2,520.2],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G130M/*"},{"ua":"SM-G130M"}],"dpi":[165.9,164.8],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G928I/*"},{"ua":"SM-G928I"}],"dpi":[515.1,518.4],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G920F/*"},{"ua":"SM-G920F"}],"dpi":580.6,"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G920P/*"},{"ua":"SM-G920P"}],"dpi":[522.5,577],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G925F/*"},{"ua":"SM-G925F"}],"dpi":580.6,"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G925V/*"},{"ua":"SM-G925V"}],"dpi":[522.5,576.6],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G930F/*"},{"ua":"SM-G930F"}],"dpi":576.6,"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G935F/*"},{"ua":"SM-G935F"}],"dpi":533,"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G950F/*"},{"ua":"SM-G950F"}],"dpi":[562.707,565.293],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G955U/*"},{"ua":"SM-G955U"}],"dpi":[522.514,525.762],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"samsung/*/SM-G955F/*"},{"ua":"SM-G955F"}],"dpi":[522.514,525.762],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"Sony/*/C6903/*"},{"ua":"C6903"}],"dpi":[442.5,443.3],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"Sony/*/D6653/*"},{"ua":"D6653"}],"dpi":[428.6,427.6],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Sony/*/E6653/*"},{"ua":"E6653"}],"dpi":[428.6,425.7],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Sony/*/E6853/*"},{"ua":"E6853"}],"dpi":[403.4,401.9],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Sony/*/SGP321/*"},{"ua":"SGP321"}],"dpi":[224.7,224.1],"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"TCT/*/ALCATEL ONE TOUCH Fierce/*"},{"ua":"ALCATEL ONE TOUCH Fierce"}],"dpi":[240,247.5],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"THL/*/thl 5000/*"},{"ua":"thl 5000"}],"dpi":[480,443.3],"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"Fly/*/IQ4412/*"},{"ua":"IQ4412"}],"dpi":307.9,"bw":3,"ac":1000},{"type":"android","rules":[{"mdmh":"ZTE/*/ZTE Blade L2/*"},{"ua":"ZTE Blade L2"}],"dpi":240,"bw":3,"ac":500},{"type":"android","rules":[{"mdmh":"BENEVE/*/VR518/*"},{"ua":"VR518"}],"dpi":480,"bw":3,"ac":500},{"type":"ios","rules":[{"res":[640,960]}],"dpi":[325.1,328.4],"bw":4,"ac":1000},{"type":"ios","rules":[{"res":[640,1136]}],"dpi":[317.1,320.2],"bw":3,"ac":1000},{"type":"ios","rules":[{"res":[750,1334]}],"dpi":326.4,"bw":4,"ac":1000},{"type":"ios","rules":[{"res":[1242,2208]}],"dpi":[453.6,458.4],"bw":4,"ac":1000},{"type":"ios","rules":[{"res":[1125,2001]}],"dpi":[410.9,415.4],"bw":4,"ac":1000},{"type":"ios","rules":[{"res":[1125,2436]}],"dpi":458,"bw":4,"ac":1000}];
var DPDB_CACHE = {
	format: format,
	last_updated: last_updated,
	devices: devices
};
function Dpdb(url, onDeviceParamsUpdated) {
  this.dpdb = DPDB_CACHE;
  this.recalculateDeviceParams_();
  if (url) {
    this.onDeviceParamsUpdated = onDeviceParamsUpdated;
    var xhr = new XMLHttpRequest();
    var obj = this;
    xhr.open('GET', url, true);
    xhr.addEventListener('load', function () {
      obj.loading = false;
      if (xhr.status >= 200 && xhr.status <= 299) {
        obj.dpdb = JSON.parse(xhr.response);
        obj.recalculateDeviceParams_();
      } else {
        console.error('Error loading online DPDB!');
      }
    });
    xhr.send();
  }
}
Dpdb.prototype.getDeviceParams = function () {
  return this.deviceParams;
};
Dpdb.prototype.recalculateDeviceParams_ = function () {
  var newDeviceParams = this.calcDeviceParams_();
  if (newDeviceParams) {
    this.deviceParams = newDeviceParams;
    if (this.onDeviceParamsUpdated) {
      this.onDeviceParamsUpdated(this.deviceParams);
    }
  } else {
    console.error('Failed to recalculate device parameters.');
  }
};
Dpdb.prototype.calcDeviceParams_ = function () {
  var db = this.dpdb;
  if (!db) {
    console.error('DPDB not available.');
    return null;
  }
  if (db.format != 1) {
    console.error('DPDB has unexpected format version.');
    return null;
  }
  if (!db.devices || !db.devices.length) {
    console.error('DPDB does not have a devices section.');
    return null;
  }
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  var width = getScreenWidth();
  var height = getScreenHeight();
  if (!db.devices) {
    console.error('DPDB has no devices section.');
    return null;
  }
  for (var i = 0; i < db.devices.length; i++) {
    var device = db.devices[i];
    if (!device.rules) {
      console.warn('Device[' + i + '] has no rules section.');
      continue;
    }
    if (device.type != 'ios' && device.type != 'android') {
      console.warn('Device[' + i + '] has invalid type.');
      continue;
    }
    if (isIOS() != (device.type == 'ios')) continue;
    var matched = false;
    for (var j = 0; j < device.rules.length; j++) {
      var rule = device.rules[j];
      if (this.ruleMatches_(rule, userAgent, width, height)) {
        matched = true;
        break;
      }
    }
    if (!matched) continue;
    var xdpi = device.dpi[0] || device.dpi;
    var ydpi = device.dpi[1] || device.dpi;
    return new DeviceParams({ xdpi: xdpi, ydpi: ydpi, bevelMm: device.bw });
  }
  console.warn('No DPDB device match.');
  return null;
};
Dpdb.prototype.ruleMatches_ = function (rule, ua, screenWidth, screenHeight) {
  if (!rule.ua && !rule.res) return false;
  if (rule.ua && rule.ua.substring(0, 2) === 'SM') rule.ua = rule.ua.substring(0, 7);
  if (rule.ua && ua.indexOf(rule.ua) < 0) return false;
  if (rule.res) {
    if (!rule.res[0] || !rule.res[1]) return false;
    var resX = rule.res[0];
    var resY = rule.res[1];
    if (Math.min(screenWidth, screenHeight) != Math.min(resX, resY) || Math.max(screenWidth, screenHeight) != Math.max(resX, resY)) {
      return false;
    }
  }
  return true;
};
function DeviceParams(params) {
  this.xdpi = params.xdpi;
  this.ydpi = params.ydpi;
  this.bevelMm = params.bevelMm;
}
function SensorSample(sample, timestampS) {
  this.set(sample, timestampS);
}
SensorSample.prototype.set = function (sample, timestampS) {
  this.sample = sample;
  this.timestampS = timestampS;
};
SensorSample.prototype.copy = function (sensorSample) {
  this.set(sensorSample.sample, sensorSample.timestampS);
};
function ComplementaryFilter(kFilter, isDebug) {
  this.kFilter = kFilter;
  this.isDebug = isDebug;
  this.currentAccelMeasurement = new SensorSample();
  this.currentGyroMeasurement = new SensorSample();
  this.previousGyroMeasurement = new SensorSample();
  if (isIOS()) {
    this.filterQ = new Quaternion(-1, 0, 0, 1);
  } else {
    this.filterQ = new Quaternion(1, 0, 0, 1);
  }
  this.previousFilterQ = new Quaternion();
  this.previousFilterQ.copy(this.filterQ);
  this.accelQ = new Quaternion();
  this.isOrientationInitialized = false;
  this.estimatedGravity = new Vector3();
  this.measuredGravity = new Vector3();
  this.gyroIntegralQ = new Quaternion();
}
ComplementaryFilter.prototype.addAccelMeasurement = function (vector, timestampS) {
  this.currentAccelMeasurement.set(vector, timestampS);
};
ComplementaryFilter.prototype.addGyroMeasurement = function (vector, timestampS) {
  this.currentGyroMeasurement.set(vector, timestampS);
  var deltaT = timestampS - this.previousGyroMeasurement.timestampS;
  if (isTimestampDeltaValid(deltaT)) {
    this.run_();
  }
  this.previousGyroMeasurement.copy(this.currentGyroMeasurement);
};
ComplementaryFilter.prototype.run_ = function () {
  if (!this.isOrientationInitialized) {
    this.accelQ = this.accelToQuaternion_(this.currentAccelMeasurement.sample);
    this.previousFilterQ.copy(this.accelQ);
    this.isOrientationInitialized = true;
    return;
  }
  var deltaT = this.currentGyroMeasurement.timestampS - this.previousGyroMeasurement.timestampS;
  var gyroDeltaQ = this.gyroToQuaternionDelta_(this.currentGyroMeasurement.sample, deltaT);
  this.gyroIntegralQ.multiply(gyroDeltaQ);
  this.filterQ.copy(this.previousFilterQ);
  this.filterQ.multiply(gyroDeltaQ);
  var invFilterQ = new Quaternion();
  invFilterQ.copy(this.filterQ);
  invFilterQ.inverse();
  this.estimatedGravity.set(0, 0, -1);
  this.estimatedGravity.applyQuaternion(invFilterQ);
  this.estimatedGravity.normalize();
  this.measuredGravity.copy(this.currentAccelMeasurement.sample);
  this.measuredGravity.normalize();
  var deltaQ = new Quaternion();
  deltaQ.setFromUnitVectors(this.estimatedGravity, this.measuredGravity);
  deltaQ.inverse();
  if (this.isDebug) {
    console.log('Delta: %d deg, G_est: (%s, %s, %s), G_meas: (%s, %s, %s)', radToDeg * getQuaternionAngle(deltaQ), this.estimatedGravity.x.toFixed(1), this.estimatedGravity.y.toFixed(1), this.estimatedGravity.z.toFixed(1), this.measuredGravity.x.toFixed(1), this.measuredGravity.y.toFixed(1), this.measuredGravity.z.toFixed(1));
  }
  var targetQ = new Quaternion();
  targetQ.copy(this.filterQ);
  targetQ.multiply(deltaQ);
  this.filterQ.slerp(targetQ, 1 - this.kFilter);
  this.previousFilterQ.copy(this.filterQ);
};
ComplementaryFilter.prototype.getOrientation = function () {
  return this.filterQ;
};
ComplementaryFilter.prototype.accelToQuaternion_ = function (accel) {
  var normAccel = new Vector3();
  normAccel.copy(accel);
  normAccel.normalize();
  var quat = new Quaternion();
  quat.setFromUnitVectors(new Vector3(0, 0, -1), normAccel);
  quat.inverse();
  return quat;
};
ComplementaryFilter.prototype.gyroToQuaternionDelta_ = function (gyro, dt) {
  var quat = new Quaternion();
  var axis = new Vector3();
  axis.copy(gyro);
  axis.normalize();
  quat.setFromAxisAngle(axis, gyro.length() * dt);
  return quat;
};
function PosePredictor(predictionTimeS, isDebug) {
  this.predictionTimeS = predictionTimeS;
  this.isDebug = isDebug;
  this.previousQ = new Quaternion();
  this.previousTimestampS = null;
  this.deltaQ = new Quaternion();
  this.outQ = new Quaternion();
}
PosePredictor.prototype.getPrediction = function (currentQ, gyro, timestampS) {
  if (!this.previousTimestampS) {
    this.previousQ.copy(currentQ);
    this.previousTimestampS = timestampS;
    return currentQ;
  }
  var axis = new Vector3();
  axis.copy(gyro);
  axis.normalize();
  var angularSpeed = gyro.length();
  if (angularSpeed < degToRad * 20) {
    if (this.isDebug) {
      console.log('Moving slowly, at %s deg/s: no prediction', (radToDeg * angularSpeed).toFixed(1));
    }
    this.outQ.copy(currentQ);
    this.previousQ.copy(currentQ);
    return this.outQ;
  }
  var predictAngle = angularSpeed * this.predictionTimeS;
  this.deltaQ.setFromAxisAngle(axis, predictAngle);
  this.outQ.copy(this.previousQ);
  this.outQ.multiply(this.deltaQ);
  this.previousQ.copy(currentQ);
  this.previousTimestampS = timestampS;
  return this.outQ;
};
function FusionPoseSensor(kFilter, predictionTime, yawOnly, isDebug) {
  this.yawOnly = yawOnly;
  this.accelerometer = new Vector3();
  this.gyroscope = new Vector3();
  this.filter = new ComplementaryFilter(kFilter, isDebug);
  this.posePredictor = new PosePredictor(predictionTime, isDebug);
  this.isFirefoxAndroid = isFirefoxAndroid();
  this.isIOS = isIOS();
  var chromeVersion = getChromeVersion();
  this.isDeviceMotionInRadians = !this.isIOS && chromeVersion && chromeVersion < 66;
  this.isWithoutDeviceMotion = isChromeWithoutDeviceMotion();
  this.filterToWorldQ = new Quaternion();
  if (isIOS()) {
    this.filterToWorldQ.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);
  } else {
    this.filterToWorldQ.setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);
  }
  this.inverseWorldToScreenQ = new Quaternion();
  this.worldToScreenQ = new Quaternion();
  this.originalPoseAdjustQ = new Quaternion();
  this.originalPoseAdjustQ.setFromAxisAngle(new Vector3(0, 0, 1), -window.orientation * Math.PI / 180);
  this.setScreenTransform_();
  if (isLandscapeMode()) {
    this.filterToWorldQ.multiply(this.inverseWorldToScreenQ);
  }
  this.resetQ = new Quaternion();
  this.orientationOut_ = new Float32Array(4);
  this.start();
}
FusionPoseSensor.prototype.getPosition = function () {
  return null;
};
FusionPoseSensor.prototype.getOrientation = function () {
  var orientation = void 0;
  if (this.isWithoutDeviceMotion && this._deviceOrientationQ) {
    this.deviceOrientationFixQ = this.deviceOrientationFixQ || function () {
      var z = new Quaternion().setFromAxisAngle(new Vector3(0, 0, -1), 0);
      var y = new Quaternion();
      if (window.orientation === -90) {
        y.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / -2);
      } else {
        y.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
      }
      return z.multiply(y);
    }();
    this.deviceOrientationFilterToWorldQ = this.deviceOrientationFilterToWorldQ || function () {
      var q = new Quaternion();
      q.setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);
      return q;
    }();
    orientation = this._deviceOrientationQ;
    var out = new Quaternion();
    out.copy(orientation);
    out.multiply(this.deviceOrientationFilterToWorldQ);
    out.multiply(this.resetQ);
    out.multiply(this.worldToScreenQ);
    out.multiplyQuaternions(this.deviceOrientationFixQ, out);
    if (this.yawOnly) {
      out.x = 0;
      out.z = 0;
      out.normalize();
    }
    this.orientationOut_[0] = out.x;
    this.orientationOut_[1] = out.y;
    this.orientationOut_[2] = out.z;
    this.orientationOut_[3] = out.w;
    return this.orientationOut_;
  } else {
    var filterOrientation = this.filter.getOrientation();
    orientation = this.posePredictor.getPrediction(filterOrientation, this.gyroscope, this.previousTimestampS);
  }
  var out = new Quaternion();
  out.copy(this.filterToWorldQ);
  out.multiply(this.resetQ);
  out.multiply(orientation);
  out.multiply(this.worldToScreenQ);
  if (this.yawOnly) {
    out.x = 0;
    out.z = 0;
    out.normalize();
  }
  this.orientationOut_[0] = out.x;
  this.orientationOut_[1] = out.y;
  this.orientationOut_[2] = out.z;
  this.orientationOut_[3] = out.w;
  return this.orientationOut_;
};
FusionPoseSensor.prototype.resetPose = function () {
  this.resetQ.copy(this.filter.getOrientation());
  this.resetQ.x = 0;
  this.resetQ.y = 0;
  this.resetQ.z *= -1;
  this.resetQ.normalize();
  if (isLandscapeMode()) {
    this.resetQ.multiply(this.inverseWorldToScreenQ);
  }
  this.resetQ.multiply(this.originalPoseAdjustQ);
};
FusionPoseSensor.prototype.onDeviceOrientation_ = function (e) {
  this._deviceOrientationQ = this._deviceOrientationQ || new Quaternion();
  var alpha = e.alpha,
      beta = e.beta,
      gamma = e.gamma;
  alpha = (alpha || 0) * Math.PI / 180;
  beta = (beta || 0) * Math.PI / 180;
  gamma = (gamma || 0) * Math.PI / 180;
  this._deviceOrientationQ.setFromEulerYXZ(beta, alpha, -gamma);
};
FusionPoseSensor.prototype.onDeviceMotion_ = function (deviceMotion) {
  this.updateDeviceMotion_(deviceMotion);
};
FusionPoseSensor.prototype.updateDeviceMotion_ = function (deviceMotion) {
  var accGravity = deviceMotion.accelerationIncludingGravity;
  var rotRate = deviceMotion.rotationRate;
  var timestampS = deviceMotion.timeStamp / 1000;
  var deltaS = timestampS - this.previousTimestampS;
  if (deltaS < 0) {
    warnOnce('fusion-pose-sensor:invalid:non-monotonic', 'Invalid timestamps detected: non-monotonic timestamp from devicemotion');
    this.previousTimestampS = timestampS;
    return;
  } else if (deltaS <= MIN_TIMESTEP || deltaS > MAX_TIMESTEP) {
    warnOnce('fusion-pose-sensor:invalid:outside-threshold', 'Invalid timestamps detected: Timestamp from devicemotion outside expected range.');
    this.previousTimestampS = timestampS;
    return;
  }
  this.accelerometer.set(-accGravity.x, -accGravity.y, -accGravity.z);
  if (isR7()) {
    this.gyroscope.set(-rotRate.beta, rotRate.alpha, rotRate.gamma);
  } else {
    this.gyroscope.set(rotRate.alpha, rotRate.beta, rotRate.gamma);
  }
  if (!this.isDeviceMotionInRadians) {
    this.gyroscope.multiplyScalar(Math.PI / 180);
  }
  this.filter.addAccelMeasurement(this.accelerometer, timestampS);
  this.filter.addGyroMeasurement(this.gyroscope, timestampS);
  this.previousTimestampS = timestampS;
};
FusionPoseSensor.prototype.onOrientationChange_ = function (screenOrientation) {
  this.setScreenTransform_();
};
FusionPoseSensor.prototype.onMessage_ = function (event) {
  var message = event.data;
  if (!message || !message.type) {
    return;
  }
  var type = message.type.toLowerCase();
  if (type !== 'devicemotion') {
    return;
  }
  this.updateDeviceMotion_(message.deviceMotionEvent);
};
FusionPoseSensor.prototype.setScreenTransform_ = function () {
  this.worldToScreenQ.set(0, 0, 0, 1);
  switch (window.orientation) {
    case 0:
      break;
    case 90:
      this.worldToScreenQ.setFromAxisAngle(new Vector3(0, 0, 1), -Math.PI / 2);
      break;
    case -90:
      this.worldToScreenQ.setFromAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
      break;
    case 180:
      break;
  }
  this.inverseWorldToScreenQ.copy(this.worldToScreenQ);
  this.inverseWorldToScreenQ.inverse();
};
FusionPoseSensor.prototype.start = function () {
  this.onDeviceMotionCallback_ = this.onDeviceMotion_.bind(this);
  this.onOrientationChangeCallback_ = this.onOrientationChange_.bind(this);
  this.onMessageCallback_ = this.onMessage_.bind(this);
  this.onDeviceOrientationCallback_ = this.onDeviceOrientation_.bind(this);
  if (isIOS() && isInsideCrossOriginIFrame()) {
    window.addEventListener('message', this.onMessageCallback_);
  }
  window.addEventListener('orientationchange', this.onOrientationChangeCallback_);
  if (this.isWithoutDeviceMotion) {
    window.addEventListener('deviceorientation', this.onDeviceOrientationCallback_);
  } else {
    window.addEventListener('devicemotion', this.onDeviceMotionCallback_);
  }
};
FusionPoseSensor.prototype.stop = function () {
  window.removeEventListener('devicemotion', this.onDeviceMotionCallback_);
  window.removeEventListener('deviceorientation', this.onDeviceOrientationCallback_);
  window.removeEventListener('orientationchange', this.onOrientationChangeCallback_);
  window.removeEventListener('message', this.onMessageCallback_);
};
var SENSOR_FREQUENCY = 60;
var X_AXIS = new Vector3(1, 0, 0);
var Z_AXIS = new Vector3(0, 0, 1);
var SENSOR_TO_VR = new Quaternion();
SENSOR_TO_VR.setFromAxisAngle(X_AXIS, -Math.PI / 2);
SENSOR_TO_VR.multiply(new Quaternion().setFromAxisAngle(Z_AXIS, Math.PI / 2));
var PoseSensor = function () {
  function PoseSensor(config) {
    classCallCheck(this, PoseSensor);
    this.config = config;
    this.sensor = null;
    this.fusionSensor = null;
    this._out = new Float32Array(4);
    this.api = null;
    this.errors = [];
    this._sensorQ = new Quaternion();
    this._outQ = new Quaternion();
    this._onSensorRead = this._onSensorRead.bind(this);
    this._onSensorError = this._onSensorError.bind(this);
    this.init();
  }
  createClass(PoseSensor, [{
    key: 'init',
    value: function init() {
      var sensor = null;
      try {
        sensor = new RelativeOrientationSensor({
          frequency: SENSOR_FREQUENCY,
          referenceFrame: 'screen'
        });
        sensor.addEventListener('error', this._onSensorError);
      } catch (error) {
        this.errors.push(error);
        if (error.name === 'SecurityError') {
          console.error('Cannot construct sensors due to the Feature Policy');
          console.warn('Attempting to fall back using "devicemotion"; however this will ' + 'fail in the future without correct permissions.');
          this.useDeviceMotion();
        } else if (error.name === 'ReferenceError') {
          this.useDeviceMotion();
        } else {
          console.error(error);
        }
      }
      if (sensor) {
        this.api = 'sensor';
        this.sensor = sensor;
        this.sensor.addEventListener('reading', this._onSensorRead);
        this.sensor.start();
      }
    }
  }, {
    key: 'useDeviceMotion',
    value: function useDeviceMotion() {
      this.api = 'devicemotion';
      this.fusionSensor = new FusionPoseSensor(this.config.K_FILTER, this.config.PREDICTION_TIME_S, this.config.YAW_ONLY, this.config.DEBUG);
      if (this.sensor) {
        this.sensor.removeEventListener('reading', this._onSensorRead);
        this.sensor.removeEventListener('error', this._onSensorError);
        this.sensor = null;
      }
    }
  }, {
    key: 'getOrientation',
    value: function getOrientation() {
      if (this.fusionSensor) {
        return this.fusionSensor.getOrientation();
      }
      if (!this.sensor || !this.sensor.quaternion) {
        this._out[0] = this._out[1] = this._out[2] = 0;
        this._out[3] = 1;
        return this._out;
      }
      var q = this.sensor.quaternion;
      this._sensorQ.set(q[0], q[1], q[2], q[3]);
      var out = this._outQ;
      out.copy(SENSOR_TO_VR);
      out.multiply(this._sensorQ);
      if (this.config.YAW_ONLY) {
        out.x = out.z = 0;
        out.normalize();
      }
      this._out[0] = out.x;
      this._out[1] = out.y;
      this._out[2] = out.z;
      this._out[3] = out.w;
      return this._out;
    }
  }, {
    key: '_onSensorError',
    value: function _onSensorError(event) {
      this.errors.push(event.error);
      if (event.error.name === 'NotAllowedError') {
        console.error('Permission to access sensor was denied');
      } else if (event.error.name === 'NotReadableError') {
        console.error('Sensor could not be read');
      } else {
        console.error(event.error);
      }
      this.useDeviceMotion();
    }
  }, {
    key: '_onSensorRead',
    value: function _onSensorRead() {}
  }]);
  return PoseSensor;
}();
var rotateInstructionsAsset = "<svg width='198' height='240' viewBox='0 0 198 240' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><path d='M149.625 109.527l6.737 3.891v.886c0 .177.013.36.038.549.01.081.02.162.027.242.14 1.415.974 2.998 2.105 3.999l5.72 5.062.081-.09s4.382-2.53 5.235-3.024l25.97 14.993v54.001c0 .771-.386 1.217-.948 1.217-.233 0-.495-.076-.772-.236l-23.967-13.838-.014.024-27.322 15.775-.85-1.323c-4.731-1.529-9.748-2.74-14.951-3.61a.27.27 0 0 0-.007.024l-5.067 16.961-7.891 4.556-.037-.063v27.59c0 .772-.386 1.217-.948 1.217-.232 0-.495-.076-.772-.236l-42.473-24.522c-.95-.549-1.72-1.877-1.72-2.967v-1.035l-.021.047a5.111 5.111 0 0 0-1.816-.399 5.682 5.682 0 0 0-.546.001 13.724 13.724 0 0 1-1.918-.041c-1.655-.153-3.2-.6-4.404-1.296l-46.576-26.89.005.012-10.278-18.75c-1.001-1.827-.241-4.216 1.698-5.336l56.011-32.345a4.194 4.194 0 0 1 2.099-.572c1.326 0 2.572.659 3.227 1.853l.005-.003.227.413-.006.004a9.63 9.63 0 0 0 1.477 2.018l.277.27c1.914 1.85 4.468 2.801 7.113 2.801 1.949 0 3.948-.517 5.775-1.572.013 0 7.319-4.219 7.319-4.219a4.194 4.194 0 0 1 2.099-.572c1.326 0 2.572.658 3.226 1.853l3.25 5.928.022-.018 6.785 3.917-.105-.182 46.881-26.965m0-1.635c-.282 0-.563.073-.815.218l-46.169 26.556-5.41-3.124-3.005-5.481c-.913-1.667-2.699-2.702-4.66-2.703-1.011 0-2.02.274-2.917.792a3825 3825 0 0 1-7.275 4.195l-.044.024a9.937 9.937 0 0 1-4.957 1.353c-2.292 0-4.414-.832-5.976-2.342l-.252-.245a7.992 7.992 0 0 1-1.139-1.534 1.379 1.379 0 0 0-.06-.122l-.227-.414a1.718 1.718 0 0 0-.095-.154c-.938-1.574-2.673-2.545-4.571-2.545-1.011 0-2.02.274-2.917.792L3.125 155.502c-2.699 1.559-3.738 4.94-2.314 7.538l10.278 18.75c.177.323.448.563.761.704l46.426 26.804c1.403.81 3.157 1.332 5.072 1.508a15.661 15.661 0 0 0 2.146.046 4.766 4.766 0 0 1 .396 0c.096.004.19.011.283.022.109 1.593 1.159 3.323 2.529 4.114l42.472 24.522c.524.302 1.058.455 1.59.455 1.497 0 2.583-1.2 2.583-2.852v-26.562l7.111-4.105a1.64 1.64 0 0 0 .749-.948l4.658-15.593c4.414.797 8.692 1.848 12.742 3.128l.533.829a1.634 1.634 0 0 0 2.193.531l26.532-15.317L193 192.433c.523.302 1.058.455 1.59.455 1.497 0 2.583-1.199 2.583-2.852v-54.001c0-.584-.312-1.124-.818-1.416l-25.97-14.993a1.633 1.633 0 0 0-1.636.001c-.606.351-2.993 1.73-4.325 2.498l-4.809-4.255c-.819-.725-1.461-1.933-1.561-2.936a7.776 7.776 0 0 0-.033-.294 2.487 2.487 0 0 1-.023-.336v-.886c0-.584-.312-1.123-.817-1.416l-6.739-3.891a1.633 1.633 0 0 0-.817-.219' fill='#455A64'/><path d='M96.027 132.636l46.576 26.891c1.204.695 1.979 1.587 2.242 2.541l-.01.007-81.374 46.982h-.001c-1.654-.152-3.199-.6-4.403-1.295l-46.576-26.891 83.546-48.235' fill='#FAFAFA'/><path d='M63.461 209.174c-.008 0-.015 0-.022-.002-1.693-.156-3.228-.609-4.441-1.309l-46.576-26.89a.118.118 0 0 1 0-.203l83.546-48.235a.117.117 0 0 1 .117 0l46.576 26.891c1.227.708 2.021 1.612 2.296 2.611a.116.116 0 0 1-.042.124l-.021.016-81.375 46.981a.11.11 0 0 1-.058.016zm-50.747-28.303l46.401 26.79c1.178.68 2.671 1.121 4.32 1.276l81.272-46.922c-.279-.907-1.025-1.73-2.163-2.387l-46.517-26.857-83.313 48.1z' fill='#607D8B'/><path d='M148.327 165.471a5.85 5.85 0 0 1-.546.001c-1.894-.083-3.302-1.038-3.145-2.132a2.693 2.693 0 0 0-.072-1.105l-81.103 46.822c.628.058 1.272.073 1.918.042.182-.009.364-.009.546-.001 1.894.083 3.302 1.038 3.145 2.132l79.257-45.759' fill='#FFF'/><path d='M69.07 211.347a.118.118 0 0 1-.115-.134c.045-.317-.057-.637-.297-.925-.505-.61-1.555-1.022-2.738-1.074a5.966 5.966 0 0 0-.535.001 14.03 14.03 0 0 1-1.935-.041.117.117 0 0 1-.103-.092.116.116 0 0 1 .055-.126l81.104-46.822a.117.117 0 0 1 .171.07c.104.381.129.768.074 1.153-.045.316.057.637.296.925.506.61 1.555 1.021 2.739 1.073.178.008.357.008.535-.001a.117.117 0 0 1 .064.218l-79.256 45.759a.114.114 0 0 1-.059.016zm-3.405-2.372c.089 0 .177.002.265.006 1.266.056 2.353.488 2.908 1.158.227.274.35.575.36.882l78.685-45.429c-.036 0-.072-.001-.107-.003-1.267-.056-2.354-.489-2.909-1.158-.282-.34-.402-.724-.347-1.107a2.604 2.604 0 0 0-.032-.91L63.846 208.97a13.91 13.91 0 0 0 1.528.012c.097-.005.194-.007.291-.007z' fill='#607D8B'/><path d='M2.208 162.134c-1.001-1.827-.241-4.217 1.698-5.337l56.011-32.344c1.939-1.12 4.324-.546 5.326 1.281l.232.41a9.344 9.344 0 0 0 1.47 2.021l.278.27c3.325 3.214 8.583 3.716 12.888 1.23l7.319-4.22c1.94-1.119 4.324-.546 5.325 1.282l3.25 5.928-83.519 48.229-10.278-18.75z' fill='#FAFAFA'/><path d='M12.486 181.001a.112.112 0 0 1-.031-.005.114.114 0 0 1-.071-.056L2.106 162.19c-1.031-1.88-.249-4.345 1.742-5.494l56.01-32.344a4.328 4.328 0 0 1 2.158-.588c1.415 0 2.65.702 3.311 1.882.01.008.018.017.024.028l.227.414a.122.122 0 0 1 .013.038 9.508 9.508 0 0 0 1.439 1.959l.275.266c1.846 1.786 4.344 2.769 7.031 2.769 1.977 0 3.954-.538 5.717-1.557a.148.148 0 0 1 .035-.013l7.284-4.206a4.321 4.321 0 0 1 2.157-.588c1.427 0 2.672.716 3.329 1.914l3.249 5.929a.116.116 0 0 1-.044.157l-83.518 48.229a.116.116 0 0 1-.059.016zm49.53-57.004c-.704 0-1.41.193-2.041.557l-56.01 32.345c-1.882 1.086-2.624 3.409-1.655 5.179l10.221 18.645 83.317-48.112-3.195-5.829c-.615-1.122-1.783-1.792-3.124-1.792a4.08 4.08 0 0 0-2.04.557l-7.317 4.225a.148.148 0 0 1-.035.013 11.7 11.7 0 0 1-5.801 1.569c-2.748 0-5.303-1.007-7.194-2.835l-.278-.27a9.716 9.716 0 0 1-1.497-2.046.096.096 0 0 1-.013-.037l-.191-.347a.11.11 0 0 1-.023-.029c-.615-1.123-1.783-1.793-3.124-1.793z' fill='#607D8B'/><path d='M42.434 155.808c-2.51-.001-4.697-1.258-5.852-3.365-1.811-3.304-.438-7.634 3.059-9.654l12.291-7.098a7.599 7.599 0 0 1 3.789-1.033c2.51 0 4.697 1.258 5.852 3.365 1.811 3.304.439 7.634-3.059 9.654l-12.291 7.098a7.606 7.606 0 0 1-3.789 1.033zm13.287-20.683a7.128 7.128 0 0 0-3.555.971l-12.291 7.098c-3.279 1.893-4.573 5.942-2.883 9.024 1.071 1.955 3.106 3.122 5.442 3.122a7.13 7.13 0 0 0 3.556-.97l12.291-7.098c3.279-1.893 4.572-5.942 2.883-9.024-1.072-1.955-3.106-3.123-5.443-3.123z' fill='#607D8B'/><path d='M149.588 109.407l6.737 3.89v.887c0 .176.013.36.037.549.011.081.02.161.028.242.14 1.415.973 2.998 2.105 3.999l7.396 6.545c.177.156.358.295.541.415 1.579 1.04 2.95.466 3.062-1.282.049-.784.057-1.595.023-2.429l-.003-.16v-1.151l25.987 15.003v54c0 1.09-.77 1.53-1.72.982l-42.473-24.523c-.95-.548-1.72-1.877-1.72-2.966v-34.033' fill='#FAFAFA'/><path d='M194.553 191.25c-.257 0-.54-.085-.831-.253l-42.472-24.521c-.981-.567-1.779-1.943-1.779-3.068v-34.033h.234v34.033c0 1.051.745 2.336 1.661 2.866l42.473 24.521c.424.245.816.288 1.103.122.285-.164.442-.52.442-1.002v-53.933l-25.753-14.868.003 1.106c.034.832.026 1.654-.024 2.439-.054.844-.396 1.464-.963 1.746-.619.309-1.45.173-2.28-.373a5.023 5.023 0 0 1-.553-.426l-7.397-6.544c-1.158-1.026-1.999-2.625-2.143-4.076a9.624 9.624 0 0 0-.027-.238 4.241 4.241 0 0 1-.038-.564v-.82l-6.68-3.856.117-.202 6.738 3.89.058.034v.954c0 .171.012.351.036.533.011.083.021.165.029.246.138 1.395.948 2.935 2.065 3.923l7.397 6.545c.173.153.35.289.527.406.758.499 1.504.63 2.047.359.49-.243.786-.795.834-1.551.05-.778.057-1.591.024-2.417l-.004-.163v-1.355l.175.1 25.987 15.004.059.033v54.068c0 .569-.198.996-.559 1.204a1.002 1.002 0 0 1-.506.131' fill='#607D8B'/><path d='M145.685 163.161l24.115 13.922-25.978 14.998-1.462-.307c-6.534-2.17-13.628-3.728-21.019-4.616-4.365-.524-8.663 1.096-9.598 3.62a2.746 2.746 0 0 0-.011 1.928c1.538 4.267 4.236 8.363 7.995 12.135l.532.845-25.977 14.997-24.115-13.922 75.518-43.6' fill='#FFF'/><path d='M94.282 220.818l-.059-.033-24.29-14.024.175-.101 75.577-43.634.058.033 24.29 14.024-26.191 15.122-.045-.01-1.461-.307c-6.549-2.174-13.613-3.725-21.009-4.614a13.744 13.744 0 0 0-1.638-.097c-3.758 0-7.054 1.531-7.837 3.642a2.62 2.62 0 0 0-.01 1.848c1.535 4.258 4.216 8.326 7.968 12.091l.016.021.526.835.006.01.064.102-.105.061-25.977 14.998-.058.033zm-23.881-14.057l23.881 13.788 24.802-14.32c.546-.315.846-.489 1.017-.575l-.466-.74c-3.771-3.787-6.467-7.881-8.013-12.168a2.851 2.851 0 0 1 .011-2.008c.815-2.199 4.203-3.795 8.056-3.795.557 0 1.117.033 1.666.099 7.412.891 14.491 2.445 21.041 4.621.836.175 1.215.254 1.39.304l25.78-14.884-23.881-13.788-75.284 43.466z' fill='#607D8B'/><path d='M167.23 125.979v50.871l-27.321 15.773-6.461-14.167c-.91-1.996-3.428-1.738-5.624.574a10.238 10.238 0 0 0-2.33 4.018l-6.46 21.628-27.322 15.774v-50.871l75.518-43.6' fill='#FFF'/><path d='M91.712 220.567a.127.127 0 0 1-.059-.016.118.118 0 0 1-.058-.101v-50.871c0-.042.023-.08.058-.101l75.519-43.6a.117.117 0 0 1 .175.101v50.871c0 .041-.023.08-.059.1l-27.321 15.775a.118.118 0 0 1-.094.01.12.12 0 0 1-.071-.063l-6.46-14.168c-.375-.822-1.062-1.275-1.934-1.275-1.089 0-2.364.686-3.5 1.881a10.206 10.206 0 0 0-2.302 3.972l-6.46 21.627a.118.118 0 0 1-.054.068L91.77 220.551a.12.12 0 0 1-.058.016zm.117-50.92v50.601l27.106-15.65 6.447-21.583a10.286 10.286 0 0 1 2.357-4.065c1.18-1.242 2.517-1.954 3.669-1.954.969 0 1.731.501 2.146 1.411l6.407 14.051 27.152-15.676v-50.601l-75.284 43.466z' fill='#607D8B'/><path d='M168.543 126.213v50.87l-27.322 15.774-6.46-14.168c-.91-1.995-3.428-1.738-5.624.574a10.248 10.248 0 0 0-2.33 4.019l-6.461 21.627-27.321 15.774v-50.87l75.518-43.6' fill='#FFF'/><path d='M93.025 220.8a.123.123 0 0 1-.059-.015.12.12 0 0 1-.058-.101v-50.871c0-.042.023-.08.058-.101l75.518-43.6a.112.112 0 0 1 .117 0c.036.02.059.059.059.1v50.871a.116.116 0 0 1-.059.101l-27.321 15.774a.111.111 0 0 1-.094.01.115.115 0 0 1-.071-.062l-6.46-14.168c-.375-.823-1.062-1.275-1.935-1.275-1.088 0-2.363.685-3.499 1.881a10.19 10.19 0 0 0-2.302 3.971l-6.461 21.628a.108.108 0 0 1-.053.067l-27.322 15.775a.12.12 0 0 1-.058.015zm.117-50.919v50.6l27.106-15.649 6.447-21.584a10.293 10.293 0 0 1 2.357-4.065c1.179-1.241 2.516-1.954 3.668-1.954.969 0 1.732.502 2.147 1.412l6.407 14.051 27.152-15.676v-50.601l-75.284 43.466z' fill='#607D8B'/><path d='M169.8 177.083l-27.322 15.774-6.46-14.168c-.91-1.995-3.428-1.738-5.625.574a10.246 10.246 0 0 0-2.329 4.019l-6.461 21.627-27.321 15.774v-50.87l75.518-43.6v50.87z' fill='#FAFAFA'/><path d='M94.282 220.917a.234.234 0 0 1-.234-.233v-50.871c0-.083.045-.161.117-.202l75.518-43.601a.234.234 0 1 1 .35.202v50.871a.233.233 0 0 1-.116.202l-27.322 15.775a.232.232 0 0 1-.329-.106l-6.461-14.168c-.36-.789-.992-1.206-1.828-1.206-1.056 0-2.301.672-3.415 1.844a10.099 10.099 0 0 0-2.275 3.924l-6.46 21.628a.235.235 0 0 1-.107.136l-27.322 15.774a.23.23 0 0 1-.116.031zm.233-50.969v50.331l26.891-15.525 6.434-21.539a10.41 10.41 0 0 1 2.384-4.112c1.201-1.265 2.569-1.991 3.753-1.991 1.018 0 1.818.526 2.253 1.48l6.354 13.934 26.982-15.578v-50.331l-75.051 43.331z' fill='#607D8B'/><path d='M109.894 199.943c-1.774 0-3.241-.725-4.244-2.12a.224.224 0 0 1 .023-.294.233.233 0 0 1 .301-.023c.78.547 1.705.827 2.75.827 1.323 0 2.754-.439 4.256-1.306 5.311-3.067 9.631-10.518 9.631-16.611 0-1.927-.442-3.56-1.278-4.724a.232.232 0 0 1 .323-.327c1.671 1.172 2.591 3.381 2.591 6.219 0 6.242-4.426 13.863-9.865 17.003-1.574.908-3.084 1.356-4.488 1.356zm-2.969-1.542c.813.651 1.82.877 2.968.877h.001c1.321 0 2.753-.327 4.254-1.194 5.311-3.067 9.632-10.463 9.632-16.556 0-1.979-.463-3.599-1.326-4.761.411 1.035.625 2.275.625 3.635 0 6.243-4.426 13.883-9.865 17.023-1.574.909-3.084 1.317-4.49 1.317-.641 0-1.243-.149-1.799-.341z' fill='#607D8B'/><path d='M113.097 197.23c5.384-3.108 9.748-10.636 9.748-16.814 0-2.051-.483-3.692-1.323-4.86-1.784-1.252-4.374-1.194-7.257.47-5.384 3.108-9.748 10.636-9.748 16.814 0 2.051.483 3.692 1.323 4.86 1.784 1.252 4.374 1.194 7.257-.47' fill='#FAFAFA'/><path d='M108.724 198.614c-1.142 0-2.158-.213-3.019-.817-.021-.014-.04.014-.055-.007-.894-1.244-1.367-2.948-1.367-4.973 0-6.242 4.426-13.864 9.865-17.005 1.574-.908 3.084-1.363 4.49-1.363 1.142 0 2.158.309 3.018.913a.23.23 0 0 1 .056.056c.894 1.244 1.367 2.972 1.367 4.997 0 6.243-4.426 13.783-9.865 16.923-1.574.909-3.084 1.276-4.49 1.276zm-2.718-1.109c.774.532 1.688.776 2.718.776 1.323 0 2.754-.413 4.256-1.28 5.311-3.066 9.631-10.505 9.631-16.598 0-1.909-.434-3.523-1.255-4.685-.774-.533-1.688-.799-2.718-.799-1.323 0-2.755.441-4.256 1.308-5.311 3.066-9.631 10.506-9.631 16.599 0 1.909.434 3.517 1.255 4.679z' fill='#607D8B'/><path d='M149.318 114.262l-9.984 8.878 15.893 11.031 5.589-6.112-11.498-13.797' fill='#FAFAFA'/><path d='M169.676 120.84l-9.748 5.627c-3.642 2.103-9.528 2.113-13.147.024-3.62-2.089-3.601-5.488.041-7.591l9.495-5.608-6.729-3.885-81.836 47.071 45.923 26.514 3.081-1.779c.631-.365.869-.898.618-1.39-2.357-4.632-2.593-9.546-.683-14.262 5.638-13.92 24.509-24.815 48.618-28.07 8.169-1.103 16.68-.967 24.704.394.852.145 1.776.008 2.407-.357l3.081-1.778-25.825-14.91' fill='#FAFAFA'/><path d='M113.675 183.459a.47.47 0 0 1-.233-.062l-45.924-26.515a.468.468 0 0 1 .001-.809l81.836-47.071a.467.467 0 0 1 .466 0l6.729 3.885a.467.467 0 0 1-.467.809l-6.496-3.75-80.9 46.533 44.988 25.973 2.848-1.644c.192-.111.62-.409.435-.773-2.416-4.748-2.658-9.814-.7-14.65 2.806-6.927 8.885-13.242 17.582-18.263 8.657-4.998 19.518-8.489 31.407-10.094 8.198-1.107 16.79-.97 24.844.397.739.125 1.561.007 2.095-.301l2.381-1.374-25.125-14.506a.467.467 0 0 1 .467-.809l25.825 14.91a.467.467 0 0 1 0 .809l-3.081 1.779c-.721.417-1.763.575-2.718.413-7.963-1.351-16.457-1.486-24.563-.392-11.77 1.589-22.512 5.039-31.065 9.977-8.514 4.916-14.456 11.073-17.183 17.805-1.854 4.578-1.623 9.376.666 13.875.37.725.055 1.513-.8 2.006l-3.081 1.78a.476.476 0 0 1-.234.062' fill='#455A64'/><path d='M153.316 128.279c-2.413 0-4.821-.528-6.652-1.586-1.818-1.049-2.82-2.461-2.82-3.975 0-1.527 1.016-2.955 2.861-4.02l9.493-5.607a.233.233 0 1 1 .238.402l-9.496 5.609c-1.696.979-2.628 2.263-2.628 3.616 0 1.34.918 2.608 2.585 3.571 3.549 2.049 9.343 2.038 12.914-.024l9.748-5.628a.234.234 0 0 1 .234.405l-9.748 5.628c-1.858 1.072-4.296 1.609-6.729 1.609' fill='#607D8B'/><path d='M113.675 182.992l-45.913-26.508M113.675 183.342a.346.346 0 0 1-.175-.047l-45.913-26.508a.35.35 0 1 1 .35-.607l45.913 26.508a.35.35 0 0 1-.175.654' fill='#455A64'/><path d='M67.762 156.484v54.001c0 1.09.77 2.418 1.72 2.967l42.473 24.521c.95.549 1.72.11 1.72-.98v-54.001' fill='#FAFAFA'/><path d='M112.727 238.561c-.297 0-.62-.095-.947-.285l-42.473-24.521c-1.063-.613-1.895-2.05-1.895-3.27v-54.001a.35.35 0 1 1 .701 0v54.001c0 .96.707 2.18 1.544 2.663l42.473 24.522c.344.198.661.243.87.122.206-.119.325-.411.325-.799v-54.001a.35.35 0 1 1 .7 0v54.001c0 .655-.239 1.154-.675 1.406a1.235 1.235 0 0 1-.623.162' fill='#455A64'/><path d='M112.86 147.512h-.001c-2.318 0-4.499-.522-6.142-1.471-1.705-.984-2.643-2.315-2.643-3.749 0-1.445.952-2.791 2.68-3.788l12.041-6.953c1.668-.962 3.874-1.493 6.212-1.493 2.318 0 4.499.523 6.143 1.472 1.704.984 2.643 2.315 2.643 3.748 0 1.446-.952 2.791-2.68 3.789l-12.042 6.952c-1.668.963-3.874 1.493-6.211 1.493zm12.147-16.753c-2.217 0-4.298.497-5.861 1.399l-12.042 6.952c-1.502.868-2.33 1.998-2.33 3.182 0 1.173.815 2.289 2.293 3.142 1.538.889 3.596 1.378 5.792 1.378h.001c2.216 0 4.298-.497 5.861-1.399l12.041-6.953c1.502-.867 2.33-1.997 2.33-3.182 0-1.172-.814-2.288-2.292-3.142-1.539-.888-3.596-1.377-5.793-1.377z' fill='#607D8B'/><path d='M165.63 123.219l-5.734 3.311c-3.167 1.828-8.286 1.837-11.433.02-3.147-1.817-3.131-4.772.036-6.601l5.734-3.31 11.397 6.58' fill='#FAFAFA'/><path d='M154.233 117.448l9.995 5.771-4.682 2.704c-1.434.827-3.352 1.283-5.399 1.283-2.029 0-3.923-.449-5.333-1.263-1.29-.744-2-1.694-2-2.674 0-.991.723-1.955 2.036-2.713l5.383-3.108m0-.809l-5.734 3.31c-3.167 1.829-3.183 4.784-.036 6.601 1.568.905 3.623 1.357 5.684 1.357 2.077 0 4.159-.46 5.749-1.377l5.734-3.311-11.397-6.58M145.445 179.667c-1.773 0-3.241-.85-4.243-2.245-.067-.092-.057-.275.023-.356.08-.081.207-.12.3-.055.781.548 1.706.812 2.751.811 1.322 0 2.754-.446 4.256-1.313 5.31-3.066 9.631-10.522 9.631-16.615 0-1.927-.442-3.562-1.279-4.726a.235.235 0 0 1 .024-.301.232.232 0 0 1 .3-.027c1.67 1.172 2.59 3.38 2.59 6.219 0 6.242-4.425 13.987-9.865 17.127-1.573.908-3.083 1.481-4.488 1.481zM142.476 178c.814.651 1.82 1.002 2.969 1.002 1.322 0 2.753-.452 4.255-1.32 5.31-3.065 9.631-10.523 9.631-16.617 0-1.98-.463-3.63-1.325-4.793.411 1.035.624 2.26.624 3.62 0 6.242-4.425 13.875-9.865 17.015-1.573.909-3.084 1.376-4.489 1.376a5.49 5.49 0 0 1-1.8-.283z' fill='#607D8B'/><path d='M148.648 176.704c5.384-3.108 9.748-10.636 9.748-16.813 0-2.052-.483-3.693-1.322-4.861-1.785-1.252-4.375-1.194-7.258.471-5.383 3.108-9.748 10.636-9.748 16.813 0 2.051.484 3.692 1.323 4.86 1.785 1.253 4.374 1.195 7.257-.47' fill='#FAFAFA'/><path d='M144.276 178.276c-1.143 0-2.158-.307-3.019-.911a.217.217 0 0 1-.055-.054c-.895-1.244-1.367-2.972-1.367-4.997 0-6.241 4.425-13.875 9.865-17.016 1.573-.908 3.084-1.369 4.489-1.369 1.143 0 2.158.307 3.019.91a.24.24 0 0 1 .055.055c.894 1.244 1.367 2.971 1.367 4.997 0 6.241-4.425 13.875-9.865 17.016-1.573.908-3.084 1.369-4.489 1.369zm-2.718-1.172c.773.533 1.687.901 2.718.901 1.322 0 2.754-.538 4.256-1.405 5.31-3.066 9.631-10.567 9.631-16.661 0-1.908-.434-3.554-1.256-4.716-.774-.532-1.688-.814-2.718-.814-1.322 0-2.754.433-4.256 1.3-5.31 3.066-9.631 10.564-9.631 16.657 0 1.91.434 3.576 1.256 4.738z' fill='#607D8B'/><path d='M150.72 172.361l-.363-.295a24.105 24.105 0 0 0 2.148-3.128 24.05 24.05 0 0 0 1.977-4.375l.443.149a24.54 24.54 0 0 1-2.015 4.46 24.61 24.61 0 0 1-2.19 3.189M115.917 191.514l-.363-.294a24.174 24.174 0 0 0 2.148-3.128 24.038 24.038 0 0 0 1.976-4.375l.443.148a24.48 24.48 0 0 1-2.015 4.461 24.662 24.662 0 0 1-2.189 3.188M114 237.476V182.584 237.476' fill='#607D8B'/><g><path d='M81.822 37.474c.017-.135-.075-.28-.267-.392-.327-.188-.826-.21-1.109-.045l-6.012 3.471c-.131.076-.194.178-.191.285.002.132.002.461.002.578v.043l-.007.128-6.591 3.779c-.001 0-2.077 1.046-2.787 5.192 0 0-.912 6.961-.898 19.745.015 12.57.606 17.07 1.167 21.351.22 1.684 3.001 2.125 3.001 2.125.331.04.698-.027 1.08-.248l75.273-43.551c1.808-1.069 2.667-3.719 3.056-6.284 1.213-7.99 1.675-32.978-.275-39.878-.196-.693-.51-1.083-.868-1.282l-2.086-.79c-.727.028-1.416.467-1.534.535L82.032 37.072l-.21.402' fill='#FFF'/><path d='M144.311 1.701l2.085.79c.358.199.672.589.868 1.282 1.949 6.9 1.487 31.887.275 39.878-.39 2.565-1.249 5.215-3.056 6.284L69.21 93.486a1.78 1.78 0 0 1-.896.258l-.183-.011c0 .001-2.782-.44-3.003-2.124-.56-4.282-1.151-8.781-1.165-21.351-.015-12.784.897-19.745.897-19.745.71-4.146 2.787-5.192 2.787-5.192l6.591-3.779.007-.128v-.043c0-.117 0-.446-.002-.578-.003-.107.059-.21.191-.285l6.012-3.472a.98.98 0 0 1 .481-.11c.218 0 .449.053.627.156.193.112.285.258.268.392l.211-.402 60.744-34.836c.117-.068.806-.507 1.534-.535m0-.997l-.039.001c-.618.023-1.283.244-1.974.656l-.021.012-60.519 34.706a2.358 2.358 0 0 0-.831-.15c-.365 0-.704.084-.98.244l-6.012 3.471c-.442.255-.699.69-.689 1.166l.001.15-6.08 3.487c-.373.199-2.542 1.531-3.29 5.898l-.006.039c-.009.07-.92 7.173-.906 19.875.014 12.62.603 17.116 1.172 21.465l.002.015c.308 2.355 3.475 2.923 3.836 2.98l.034.004c.101.013.204.019.305.019a2.77 2.77 0 0 0 1.396-.392l75.273-43.552c1.811-1.071 2.999-3.423 3.542-6.997 1.186-7.814 1.734-33.096-.301-40.299-.253-.893-.704-1.527-1.343-1.882l-.132-.062-2.085-.789a.973.973 0 0 0-.353-.065' fill='#455A64'/><path d='M128.267 11.565l1.495.434-56.339 32.326' fill='#FFF'/><path d='M74.202 90.545a.5.5 0 0 1-.25-.931l18.437-10.645a.499.499 0 1 1 .499.864L74.451 90.478l-.249.067M75.764 42.654l-.108-.062.046-.171 5.135-2.964.17.045-.045.171-5.135 2.964-.063.017M70.52 90.375V46.421l.063-.036L137.84 7.554v43.954l-.062.036L70.52 90.375zm.25-43.811v43.38l66.821-38.579V7.985L70.77 46.564z' fill='#607D8B'/><path d='M86.986 83.182c-.23.149-.612.384-.849.523l-11.505 6.701c-.237.139-.206.252.068.252h.565c.275 0 .693-.113.93-.252L87.7 83.705c.237-.139.428-.253.425-.256a11.29 11.29 0 0 1-.006-.503c0-.274-.188-.377-.418-.227l-.715.463' fill='#607D8B'/><path d='M75.266 90.782H74.7c-.2 0-.316-.056-.346-.166-.03-.11.043-.217.215-.317l11.505-6.702c.236-.138.615-.371.844-.519l.715-.464a.488.488 0 0 1 .266-.089c.172 0 .345.13.345.421 0 .214.001.363.003.437l.006.004-.004.069c-.003.075-.003.075-.486.356l-11.505 6.702a2.282 2.282 0 0 1-.992.268zm-.6-.25l.034.001h.566c.252 0 .649-.108.866-.234l11.505-6.702c.168-.098.294-.173.361-.214-.004-.084-.004-.218-.004-.437l-.095-.171-.131.049-.714.463c-.232.15-.616.386-.854.525l-11.505 6.702-.029.018z' fill='#607D8B'/><path d='M75.266 89.871H74.7c-.2 0-.316-.056-.346-.166-.03-.11.043-.217.215-.317l11.505-6.702c.258-.151.694-.268.993-.268h.565c.2 0 .316.056.346.166.03.11-.043.217-.215.317l-11.505 6.702a2.282 2.282 0 0 1-.992.268zm-.6-.25l.034.001h.566c.252 0 .649-.107.866-.234l11.505-6.702.03-.018-.035-.001h-.565c-.252 0-.649.108-.867.234l-11.505 6.702-.029.018zM74.37 90.801v-1.247 1.247' fill='#607D8B'/><path d='M68.13 93.901c-.751-.093-1.314-.737-1.439-1.376-.831-4.238-1.151-8.782-1.165-21.352-.015-12.784.897-19.745.897-19.745.711-4.146 2.787-5.192 2.787-5.192l74.859-43.219c.223-.129 2.487-1.584 3.195.923 1.95 6.9 1.488 31.887.275 39.878-.389 2.565-1.248 5.215-3.056 6.283L69.21 93.653c-.382.221-.749.288-1.08.248 0 0-2.781-.441-3.001-2.125-.561-4.281-1.152-8.781-1.167-21.351-.014-12.784.898-19.745.898-19.745.71-4.146 2.787-5.191 2.787-5.191l6.598-3.81.871-.119 6.599-3.83.046-.461L68.13 93.901' fill='#FAFAFA'/><path d='M68.317 94.161l-.215-.013h-.001l-.244-.047c-.719-.156-2.772-.736-2.976-2.292-.568-4.34-1.154-8.813-1.168-21.384-.014-12.654.891-19.707.9-19.777.725-4.231 2.832-5.338 2.922-5.382l6.628-3.827.87-.119 6.446-3.742.034-.334a.248.248 0 0 1 .273-.223.248.248 0 0 1 .223.272l-.059.589-6.752 3.919-.87.118-6.556 3.785c-.031.016-1.99 1.068-2.666 5.018-.007.06-.908 7.086-.894 19.702.014 12.539.597 16.996 1.161 21.305.091.691.689 1.154 1.309 1.452a1.95 1.95 0 0 1-.236-.609c-.781-3.984-1.155-8.202-1.17-21.399-.014-12.653.891-19.707.9-19.777.725-4.231 2.832-5.337 2.922-5.382-.004.001 74.444-42.98 74.846-43.212l.028-.017c.904-.538 1.72-.688 2.36-.433.555.221.949.733 1.172 1.52 2.014 7.128 1.46 32.219.281 39.983-.507 3.341-1.575 5.515-3.175 6.462L69.335 93.869a2.023 2.023 0 0 1-1.018.292zm-.147-.507c.293.036.604-.037.915-.217l75.273-43.551c1.823-1.078 2.602-3.915 2.934-6.106 1.174-7.731 1.731-32.695-.268-39.772-.178-.631-.473-1.032-.876-1.192-.484-.193-1.166-.052-1.921.397l-.034.021-74.858 43.218c-.031.017-1.989 1.069-2.666 5.019-.007.059-.908 7.085-.894 19.702.015 13.155.386 17.351 1.161 21.303.09.461.476.983 1.037 1.139.114.025.185.037.196.039h.001z' fill='#455A64'/><path d='M69.317 68.982c.489-.281.885-.056.885.505 0 .56-.396 1.243-.885 1.525-.488.282-.884.057-.884-.504 0-.56.396-1.243.884-1.526' fill='#FFF'/><path d='M68.92 71.133c-.289 0-.487-.228-.487-.625 0-.56.396-1.243.884-1.526a.812.812 0 0 1 .397-.121c.289 0 .488.229.488.626 0 .56-.396 1.243-.885 1.525a.812.812 0 0 1-.397.121m.794-2.459a.976.976 0 0 0-.49.147c-.548.317-.978 1.058-.978 1.687 0 .486.271.812.674.812a.985.985 0 0 0 .491-.146c.548-.317.978-1.057.978-1.687 0-.486-.272-.813-.675-.813' fill='#8097A2'/><path d='M68.92 70.947c-.271 0-.299-.307-.299-.439 0-.491.361-1.116.79-1.363a.632.632 0 0 1 .303-.096c.272 0 .301.306.301.438 0 .491-.363 1.116-.791 1.364a.629.629 0 0 1-.304.096m.794-2.086a.812.812 0 0 0-.397.121c-.488.283-.884.966-.884 1.526 0 .397.198.625.487.625a.812.812 0 0 0 .397-.121c.489-.282.885-.965.885-1.525 0-.397-.199-.626-.488-.626' fill='#8097A2'/><path d='M69.444 85.35c.264-.152.477-.031.477.272 0 .303-.213.67-.477.822-.263.153-.477.031-.477-.271 0-.302.214-.671.477-.823' fill='#FFF'/><path d='M69.23 86.51c-.156 0-.263-.123-.263-.337 0-.302.214-.671.477-.823a.431.431 0 0 1 .214-.066c.156 0 .263.124.263.338 0 .303-.213.67-.477.822a.431.431 0 0 1-.214.066m.428-1.412c-.1 0-.203.029-.307.09-.32.185-.57.618-.57.985 0 .309.185.524.449.524a.63.63 0 0 0 .308-.09c.32-.185.57-.618.57-.985 0-.309-.185-.524-.45-.524' fill='#8097A2'/><path d='M69.23 86.322l-.076-.149c0-.235.179-.544.384-.661l.12-.041.076.151c0 .234-.179.542-.383.66l-.121.04m.428-1.038a.431.431 0 0 0-.214.066c-.263.152-.477.521-.477.823 0 .214.107.337.263.337a.431.431 0 0 0 .214-.066c.264-.152.477-.519.477-.822 0-.214-.107-.338-.263-.338' fill='#8097A2'/><path d='M139.278 7.769v43.667L72.208 90.16V46.493l67.07-38.724' fill='#455A64'/><path d='M72.083 90.375V46.421l.063-.036 67.257-38.831v43.954l-.062.036-67.258 38.831zm.25-43.811v43.38l66.821-38.579V7.985L72.333 46.564z' fill='#607D8B'/></g><path d='M125.737 88.647l-7.639 3.334V84l-11.459 4.713v8.269L99 100.315l13.369 3.646 13.368-15.314' fill='#455A64'/></g></svg>";
function RotateInstructions() {
  this.loadIcon_();
  var overlay = document.createElement('div');
  var s = overlay.style;
  s.position = 'fixed';
  s.top = 0;
  s.right = 0;
  s.bottom = 0;
  s.left = 0;
  s.backgroundColor = 'gray';
  s.fontFamily = 'sans-serif';
  s.zIndex = 1000000;
  var img = document.createElement('img');
  img.src = this.icon;
  var s = img.style;
  s.marginLeft = '25%';
  s.marginTop = '25%';
  s.width = '50%';
  overlay.appendChild(img);
  var text = document.createElement('div');
  var s = text.style;
  s.textAlign = 'center';
  s.fontSize = '16px';
  s.lineHeight = '24px';
  s.margin = '24px 25%';
  s.width = '50%';
  text.innerHTML = 'Place your phone into your Cardboard viewer.';
  overlay.appendChild(text);
  var snackbar = document.createElement('div');
  var s = snackbar.style;
  s.backgroundColor = '#CFD8DC';
  s.position = 'fixed';
  s.bottom = 0;
  s.width = '100%';
  s.height = '48px';
  s.padding = '14px 24px';
  s.boxSizing = 'border-box';
  s.color = '#656A6B';
  overlay.appendChild(snackbar);
  var snackbarText = document.createElement('div');
  snackbarText.style.float = 'left';
  snackbarText.innerHTML = 'No Cardboard viewer?';
  var snackbarButton = document.createElement('a');
  snackbarButton.href = 'https://www.google.com/get/cardboard/get-cardboard/';
  snackbarButton.innerHTML = 'get one';
  snackbarButton.target = '_blank';
  var s = snackbarButton.style;
  s.float = 'right';
  s.fontWeight = 600;
  s.textTransform = 'uppercase';
  s.borderLeft = '1px solid gray';
  s.paddingLeft = '24px';
  s.textDecoration = 'none';
  s.color = '#656A6B';
  snackbar.appendChild(snackbarText);
  snackbar.appendChild(snackbarButton);
  this.overlay = overlay;
  this.text = text;
  this.hide();
}
RotateInstructions.prototype.show = function (parent) {
  if (!parent && !this.overlay.parentElement) {
    document.body.appendChild(this.overlay);
  } else if (parent) {
    if (this.overlay.parentElement && this.overlay.parentElement != parent) this.overlay.parentElement.removeChild(this.overlay);
    parent.appendChild(this.overlay);
  }
  this.overlay.style.display = 'block';
  var img = this.overlay.querySelector('img');
  var s = img.style;
  if (isLandscapeMode()) {
    s.width = '20%';
    s.marginLeft = '40%';
    s.marginTop = '3%';
  } else {
    s.width = '50%';
    s.marginLeft = '25%';
    s.marginTop = '25%';
  }
};
RotateInstructions.prototype.hide = function () {
  this.overlay.style.display = 'none';
};
RotateInstructions.prototype.showTemporarily = function (ms, parent) {
  this.show(parent);
  this.timer = setTimeout(this.hide.bind(this), ms);
};
RotateInstructions.prototype.disableShowTemporarily = function () {
  clearTimeout(this.timer);
};
RotateInstructions.prototype.update = function () {
  this.disableShowTemporarily();
  if (!isLandscapeMode() && isMobile()) {
    this.show();
  } else {
    this.hide();
  }
};
RotateInstructions.prototype.loadIcon_ = function () {
  this.icon = dataUri('image/svg+xml', rotateInstructionsAsset);
};
var DEFAULT_VIEWER = 'CardboardV1';
var VIEWER_KEY = 'WEBVR_CARDBOARD_VIEWER';
var CLASS_NAME = 'webvr-polyfill-viewer-selector';
function ViewerSelector(defaultViewer) {
  try {
    this.selectedKey = localStorage.getItem(VIEWER_KEY);
  } catch (error) {
    console.error('Failed to load viewer profile: %s', error);
  }
  if (!this.selectedKey) {
    this.selectedKey = defaultViewer || DEFAULT_VIEWER;
  }
  this.dialog = this.createDialog_(DeviceInfo.Viewers);
  this.root = null;
  this.onChangeCallbacks_ = [];
}
ViewerSelector.prototype.show = function (root) {
  this.root = root;
  root.appendChild(this.dialog);
  var selected = this.dialog.querySelector('#' + this.selectedKey);
  selected.checked = true;
  this.dialog.style.display = 'block';
};
ViewerSelector.prototype.hide = function () {
  if (this.root && this.root.contains(this.dialog)) {
    this.root.removeChild(this.dialog);
  }
  this.dialog.style.display = 'none';
};
ViewerSelector.prototype.getCurrentViewer = function () {
  return DeviceInfo.Viewers[this.selectedKey];
};
ViewerSelector.prototype.getSelectedKey_ = function () {
  var input = this.dialog.querySelector('input[name=field]:checked');
  if (input) {
    return input.id;
  }
  return null;
};
ViewerSelector.prototype.onChange = function (cb) {
  this.onChangeCallbacks_.push(cb);
};
ViewerSelector.prototype.fireOnChange_ = function (viewer) {
  for (var i = 0; i < this.onChangeCallbacks_.length; i++) {
    this.onChangeCallbacks_[i](viewer);
  }
};
ViewerSelector.prototype.onSave_ = function () {
  this.selectedKey = this.getSelectedKey_();
  if (!this.selectedKey || !DeviceInfo.Viewers[this.selectedKey]) {
    console.error('ViewerSelector.onSave_: this should never happen!');
    return;
  }
  this.fireOnChange_(DeviceInfo.Viewers[this.selectedKey]);
  try {
    localStorage.setItem(VIEWER_KEY, this.selectedKey);
  } catch (error) {
    console.error('Failed to save viewer profile: %s', error);
  }
  this.hide();
};
ViewerSelector.prototype.createDialog_ = function (options) {
  var container = document.createElement('div');
  container.classList.add(CLASS_NAME);
  container.style.display = 'none';
  var overlay = document.createElement('div');
  var s = overlay.style;
  s.position = 'fixed';
  s.left = 0;
  s.top = 0;
  s.width = '100%';
  s.height = '100%';
  s.background = 'rgba(0, 0, 0, 0.3)';
  overlay.addEventListener('click', this.hide.bind(this));
  var width = 280;
  var dialog = document.createElement('div');
  var s = dialog.style;
  s.boxSizing = 'border-box';
  s.position = 'fixed';
  s.top = '24px';
  s.left = '50%';
  s.marginLeft = -width / 2 + 'px';
  s.width = width + 'px';
  s.padding = '24px';
  s.overflow = 'hidden';
  s.background = '#fafafa';
  s.fontFamily = "'Roboto', sans-serif";
  s.boxShadow = '0px 5px 20px #666';
  dialog.appendChild(this.createH1_('Select your viewer'));
  for (var id in options) {
    dialog.appendChild(this.createChoice_(id, options[id].label));
  }
  dialog.appendChild(this.createButton_('Save', this.onSave_.bind(this)));
  container.appendChild(overlay);
  container.appendChild(dialog);
  return container;
};
ViewerSelector.prototype.createH1_ = function (name) {
  var h1 = document.createElement('h1');
  var s = h1.style;
  s.color = 'black';
  s.fontSize = '20px';
  s.fontWeight = 'bold';
  s.marginTop = 0;
  s.marginBottom = '24px';
  h1.innerHTML = name;
  return h1;
};
ViewerSelector.prototype.createChoice_ = function (id, name) {
  var div = document.createElement('div');
  div.style.marginTop = '8px';
  div.style.color = 'black';
  var input = document.createElement('input');
  input.style.fontSize = '30px';
  input.setAttribute('id', id);
  input.setAttribute('type', 'radio');
  input.setAttribute('value', id);
  input.setAttribute('name', 'field');
  var label = document.createElement('label');
  label.style.marginLeft = '4px';
  label.setAttribute('for', id);
  label.innerHTML = name;
  div.appendChild(input);
  div.appendChild(label);
  return div;
};
ViewerSelector.prototype.createButton_ = function (label, onclick) {
  var button = document.createElement('button');
  button.innerHTML = label;
  var s = button.style;
  s.float = 'right';
  s.textTransform = 'uppercase';
  s.color = '#1094f7';
  s.fontSize = '14px';
  s.letterSpacing = 0;
  s.border = 0;
  s.background = 'none';
  s.marginTop = '16px';
  button.addEventListener('click', onclick);
  return button;
};
var commonjsGlobal$$1 = typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};
function unwrapExports$$1 (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}
function createCommonjsModule$$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var NoSleep = createCommonjsModule$$1(function (module, exports) {
(function webpackUniversalModuleDefinition(root, factory) {
	module.exports = factory();
})(commonjsGlobal$$1, function() {
return          (function(modules) {
         	var installedModules = {};
         	function __webpack_require__(moduleId) {
         		if(installedModules[moduleId]) {
         			return installedModules[moduleId].exports;
         		}
         		var module = installedModules[moduleId] = {
         			i: moduleId,
         			l: false,
         			exports: {}
         		};
         		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
         		module.l = true;
         		return module.exports;
         	}
         	__webpack_require__.m = modules;
         	__webpack_require__.c = installedModules;
         	__webpack_require__.d = function(exports, name, getter) {
         		if(!__webpack_require__.o(exports, name)) {
         			Object.defineProperty(exports, name, {
         				configurable: false,
         				enumerable: true,
         				get: getter
         			});
         		}
         	};
         	__webpack_require__.n = function(module) {
         		var getter = module && module.__esModule ?
         			function getDefault() { return module['default']; } :
         			function getModuleExports() { return module; };
         		__webpack_require__.d(getter, 'a', getter);
         		return getter;
         	};
         	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
         	__webpack_require__.p = "";
         	return __webpack_require__(__webpack_require__.s = 0);
         })
         ([
      (function(module, exports, __webpack_require__) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var mediaFile = __webpack_require__(1);
var oldIOS = typeof navigator !== 'undefined' && parseFloat(('' + (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', '')) < 10 && !window.MSStream;
var NoSleep = function () {
  function NoSleep() {
    _classCallCheck(this, NoSleep);
    if (oldIOS) {
      this.noSleepTimer = null;
    } else {
      this.noSleepVideo = document.createElement('video');
      this.noSleepVideo.setAttribute('playsinline', '');
      this.noSleepVideo.setAttribute('src', mediaFile);
      this.noSleepVideo.addEventListener('timeupdate', function (e) {
        if (this.noSleepVideo.currentTime > 0.5) {
          this.noSleepVideo.currentTime = Math.random();
        }
      }.bind(this));
    }
  }
  _createClass(NoSleep, [{
    key: 'enable',
    value: function enable() {
      if (oldIOS) {
        this.disable();
        this.noSleepTimer = window.setInterval(function () {
          window.location.href = '/';
          window.setTimeout(window.stop, 0);
        }, 15000);
      } else {
        this.noSleepVideo.play();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      if (oldIOS) {
        if (this.noSleepTimer) {
          window.clearInterval(this.noSleepTimer);
          this.noSleepTimer = null;
        }
      } else {
        this.noSleepVideo.pause();
      }
    }
  }]);
  return NoSleep;
}();
module.exports = NoSleep;
      }),
      (function(module, exports, __webpack_require__) {
module.exports = 'data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC8wYF///v3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiByMjQ3OSBkZDc5YTYxIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTEgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MToweDExMSBtZT1oZXggc3VibWU9MiBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0wIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MCA4eDhkY3Q9MCBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0wIHRocmVhZHM9NiBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTMgYl9weXJhbWlkPTIgYl9hZGFwdD0xIGJfYmlhcz0wIGRpcmVjdD0xIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MSBrZXlpbnQ9MzAwIGtleWludF9taW49MzAgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD0xMCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIwLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IHZidl9tYXhyYXRlPTIwMDAwIHZidl9idWZzaXplPTI1MDAwIGNyZl9tYXg9MC4wIG5hbF9ocmQ9bm9uZSBmaWxsZXI9MCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAOWWIhAA3//p+C7v8tDDSTjf97w55i3SbRPO4ZY+hkjD5hbkAkL3zpJ6h/LR1CAABzgB1kqqzUorlhQAAAAxBmiQYhn/+qZYADLgAAAAJQZ5CQhX/AAj5IQADQGgcIQADQGgcAAAACQGeYUQn/wALKCEAA0BoHAAAAAkBnmNEJ/8ACykhAANAaBwhAANAaBwAAAANQZpoNExDP/6plgAMuSEAA0BoHAAAAAtBnoZFESwr/wAI+SEAA0BoHCEAA0BoHAAAAAkBnqVEJ/8ACykhAANAaBwAAAAJAZ6nRCf/AAsoIQADQGgcIQADQGgcAAAADUGarDRMQz/+qZYADLghAANAaBwAAAALQZ7KRRUsK/8ACPkhAANAaBwAAAAJAZ7pRCf/AAsoIQADQGgcIQADQGgcAAAACQGe60Qn/wALKCEAA0BoHAAAAA1BmvA0TEM//qmWAAy5IQADQGgcIQADQGgcAAAAC0GfDkUVLCv/AAj5IQADQGgcAAAACQGfLUQn/wALKSEAA0BoHCEAA0BoHAAAAAkBny9EJ/8ACyghAANAaBwAAAANQZs0NExDP/6plgAMuCEAA0BoHAAAAAtBn1JFFSwr/wAI+SEAA0BoHCEAA0BoHAAAAAkBn3FEJ/8ACyghAANAaBwAAAAJAZ9zRCf/AAsoIQADQGgcIQADQGgcAAAADUGbeDRMQz/+qZYADLkhAANAaBwAAAALQZ+WRRUsK/8ACPghAANAaBwhAANAaBwAAAAJAZ+1RCf/AAspIQADQGgcAAAACQGft0Qn/wALKSEAA0BoHCEAA0BoHAAAAA1Bm7w0TEM//qmWAAy4IQADQGgcAAAAC0Gf2kUVLCv/AAj5IQADQGgcAAAACQGf+UQn/wALKCEAA0BoHCEAA0BoHAAAAAkBn/tEJ/8ACykhAANAaBwAAAANQZvgNExDP/6plgAMuSEAA0BoHCEAA0BoHAAAAAtBnh5FFSwr/wAI+CEAA0BoHAAAAAkBnj1EJ/8ACyghAANAaBwhAANAaBwAAAAJAZ4/RCf/AAspIQADQGgcAAAADUGaJDRMQz/+qZYADLghAANAaBwAAAALQZ5CRRUsK/8ACPkhAANAaBwhAANAaBwAAAAJAZ5hRCf/AAsoIQADQGgcAAAACQGeY0Qn/wALKSEAA0BoHCEAA0BoHAAAAA1Bmmg0TEM//qmWAAy5IQADQGgcAAAAC0GehkUVLCv/AAj5IQADQGgcIQADQGgcAAAACQGepUQn/wALKSEAA0BoHAAAAAkBnqdEJ/8ACyghAANAaBwAAAANQZqsNExDP/6plgAMuCEAA0BoHCEAA0BoHAAAAAtBnspFFSwr/wAI+SEAA0BoHAAAAAkBnulEJ/8ACyghAANAaBwhAANAaBwAAAAJAZ7rRCf/AAsoIQADQGgcAAAADUGa8DRMQz/+qZYADLkhAANAaBwhAANAaBwAAAALQZ8ORRUsK/8ACPkhAANAaBwAAAAJAZ8tRCf/AAspIQADQGgcIQADQGgcAAAACQGfL0Qn/wALKCEAA0BoHAAAAA1BmzQ0TEM//qmWAAy4IQADQGgcAAAAC0GfUkUVLCv/AAj5IQADQGgcIQADQGgcAAAACQGfcUQn/wALKCEAA0BoHAAAAAkBn3NEJ/8ACyghAANAaBwhAANAaBwAAAANQZt4NExC//6plgAMuSEAA0BoHAAAAAtBn5ZFFSwr/wAI+CEAA0BoHCEAA0BoHAAAAAkBn7VEJ/8ACykhAANAaBwAAAAJAZ+3RCf/AAspIQADQGgcAAAADUGbuzRMQn/+nhAAYsAhAANAaBwhAANAaBwAAAAJQZ/aQhP/AAspIQADQGgcAAAACQGf+UQn/wALKCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHAAACiFtb292AAAAbG12aGQAAAAA1YCCX9WAgl8AAAPoAAAH/AABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAGGlvZHMAAAAAEICAgAcAT////v7/AAAF+XRyYWsAAABcdGtoZAAAAAPVgIJf1YCCXwAAAAEAAAAAAAAH0AAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAygAAAMoAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAB9AAABdwAAEAAAAABXFtZGlhAAAAIG1kaGQAAAAA1YCCX9WAgl8AAV+QAAK/IFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAUcbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAE3HN0YmwAAACYc3RzZAAAAAAAAAABAAAAiGF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAygDKAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAyYXZjQwFNQCj/4QAbZ01AKOyho3ySTUBAQFAAAAMAEAAr8gDxgxlgAQAEaO+G8gAAABhzdHRzAAAAAAAAAAEAAAA8AAALuAAAABRzdHNzAAAAAAAAAAEAAAABAAAB8GN0dHMAAAAAAAAAPAAAAAEAABdwAAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAAC7gAAAAAQAAF3AAAAABAAAAAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAEEc3RzegAAAAAAAAAAAAAAPAAAAzQAAAAQAAAADQAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAANAAAADQAAAQBzdGNvAAAAAAAAADwAAAAwAAADZAAAA3QAAAONAAADoAAAA7kAAAPQAAAD6wAAA/4AAAQXAAAELgAABEMAAARcAAAEbwAABIwAAAShAAAEugAABM0AAATkAAAE/wAABRIAAAUrAAAFQgAABV0AAAVwAAAFiQAABaAAAAW1AAAFzgAABeEAAAX+AAAGEwAABiwAAAY/AAAGVgAABnEAAAaEAAAGnQAABrQAAAbPAAAG4gAABvUAAAcSAAAHJwAAB0AAAAdTAAAHcAAAB4UAAAeeAAAHsQAAB8gAAAfjAAAH9gAACA8AAAgmAAAIQQAACFQAAAhnAAAIhAAACJcAAAMsdHJhawAAAFx0a2hkAAAAA9WAgl/VgIJfAAAAAgAAAAAAAAf8AAAAAAAAAAAAAAABAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAACsm1kaWEAAAAgbWRoZAAAAADVgIJf1YCCXwAArEQAAWAAVcQAAAAAACdoZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU3RlcmVvAAAAAmNtaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAidzdGJsAAAAZ3N0c2QAAAAAAAAAAQAAAFdtcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAADNlc2RzAAAAAAOAgIAiAAIABICAgBRAFQAAAAADDUAAAAAABYCAgAISEAaAgIABAgAAABhzdHRzAAAAAAAAAAEAAABYAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAAGAAAAWAAAAXBzdGNvAAAAAAAAAFgAAAOBAAADhwAAA5oAAAOtAAADswAAA8oAAAPfAAAD5QAAA/gAAAQLAAAEEQAABCgAAAQ9AAAEUAAABFYAAARpAAAEgAAABIYAAASbAAAErgAABLQAAATHAAAE3gAABPMAAAT5AAAFDAAABR8AAAUlAAAFPAAABVEAAAVXAAAFagAABX0AAAWDAAAFmgAABa8AAAXCAAAFyAAABdsAAAXyAAAF+AAABg0AAAYgAAAGJgAABjkAAAZQAAAGZQAABmsAAAZ+AAAGkQAABpcAAAauAAAGwwAABskAAAbcAAAG7wAABwYAAAcMAAAHIQAABzQAAAc6AAAHTQAAB2QAAAdqAAAHfwAAB5IAAAeYAAAHqwAAB8IAAAfXAAAH3QAAB/AAAAgDAAAICQAACCAAAAg1AAAIOwAACE4AAAhhAAAIeAAACH4AAAiRAAAIpAAACKoAAAiwAAAItgAACLwAAAjCAAAAFnVkdGEAAAAObmFtZVN0ZXJlbwAAAHB1ZHRhAAAAaG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAO2lsc3QAAAAzqXRvbwAAACtkYXRhAAAAAQAAAABIYW5kQnJha2UgMC4xMC4yIDIwMTUwNjExMDA=';
      })
         ]);
});
});
var NoSleep$1 = unwrapExports$$1(NoSleep);
var nextDisplayId = 1000;
var defaultLeftBounds = [0, 0, 0.5, 1];
var defaultRightBounds = [0.5, 0, 0.5, 1];
var raf = window.requestAnimationFrame;
var caf = window.cancelAnimationFrame;
function VRFrameData() {
  this.leftProjectionMatrix = new Float32Array(16);
  this.leftViewMatrix = new Float32Array(16);
  this.rightProjectionMatrix = new Float32Array(16);
  this.rightViewMatrix = new Float32Array(16);
  this.pose = null;
}
function VRDisplayCapabilities(config) {
  Object.defineProperties(this, {
    hasPosition: {
      writable: false, enumerable: true, value: config.hasPosition
    },
    hasExternalDisplay: {
      writable: false, enumerable: true, value: config.hasExternalDisplay
    },
    canPresent: {
      writable: false, enumerable: true, value: config.canPresent
    },
    maxLayers: {
      writable: false, enumerable: true, value: config.maxLayers
    },
    hasOrientation: {
      enumerable: true, get: function get() {
        deprecateWarning('VRDisplayCapabilities.prototype.hasOrientation', 'VRDisplay.prototype.getFrameData');
        return config.hasOrientation;
      }
    }
  });
}
function VRDisplay(config) {
  config = config || {};
  var USE_WAKELOCK = 'wakelock' in config ? config.wakelock : true;
  this.isPolyfilled = true;
  this.displayId = nextDisplayId++;
  this.displayName = '';
  this.depthNear = 0.01;
  this.depthFar = 10000.0;
  this.isPresenting = false;
  Object.defineProperty(this, 'isConnected', {
    get: function get() {
      deprecateWarning('VRDisplay.prototype.isConnected', 'VRDisplayCapabilities.prototype.hasExternalDisplay');
      return false;
    }
  });
  this.capabilities = new VRDisplayCapabilities({
    hasPosition: false,
    hasOrientation: false,
    hasExternalDisplay: false,
    canPresent: false,
    maxLayers: 1
  });
  this.stageParameters = null;
  this.waitingForPresent_ = false;
  this.layer_ = null;
  this.originalParent_ = null;
  this.fullscreenElement_ = null;
  this.fullscreenWrapper_ = null;
  this.fullscreenElementCachedStyle_ = null;
  this.fullscreenEventTarget_ = null;
  this.fullscreenChangeHandler_ = null;
  this.fullscreenErrorHandler_ = null;
  if (USE_WAKELOCK && isMobile()) {
    this.wakelock_ = new NoSleep$1();
  }
}
VRDisplay.prototype.getFrameData = function (frameData) {
  return frameDataFromPose(frameData, this._getPose(), this);
};
VRDisplay.prototype.getPose = function () {
  deprecateWarning('VRDisplay.prototype.getPose', 'VRDisplay.prototype.getFrameData');
  return this._getPose();
};
VRDisplay.prototype.resetPose = function () {
  deprecateWarning('VRDisplay.prototype.resetPose');
  return this._resetPose();
};
VRDisplay.prototype.getImmediatePose = function () {
  deprecateWarning('VRDisplay.prototype.getImmediatePose', 'VRDisplay.prototype.getFrameData');
  return this._getPose();
};
VRDisplay.prototype.requestAnimationFrame = function (callback) {
  return raf(callback);
};
VRDisplay.prototype.cancelAnimationFrame = function (id) {
  return caf(id);
};
VRDisplay.prototype.wrapForFullscreen = function (element) {
  if (isIOS()) {
    return element;
  }
  if (!this.fullscreenWrapper_) {
    this.fullscreenWrapper_ = document.createElement('div');
    var cssProperties = ['height: ' + Math.min(screen.height, screen.width) + 'px !important', 'top: 0 !important', 'left: 0 !important', 'right: 0 !important', 'border: 0', 'margin: 0', 'padding: 0', 'z-index: 999999 !important', 'position: fixed'];
    this.fullscreenWrapper_.setAttribute('style', cssProperties.join('; ') + ';');
    this.fullscreenWrapper_.classList.add('webvr-polyfill-fullscreen-wrapper');
  }
  if (this.fullscreenElement_ == element) {
    return this.fullscreenWrapper_;
  }
  if (this.fullscreenElement_) {
    if (this.originalParent_) {
      this.originalParent_.appendChild(this.fullscreenElement_);
    } else {
      this.fullscreenElement_.parentElement.removeChild(this.fullscreenElement_);
    }
  }
  this.fullscreenElement_ = element;
  this.originalParent_ = element.parentElement;
  if (!this.originalParent_) {
    document.body.appendChild(element);
  }
  if (!this.fullscreenWrapper_.parentElement) {
    var parent = this.fullscreenElement_.parentElement;
    parent.insertBefore(this.fullscreenWrapper_, this.fullscreenElement_);
    parent.removeChild(this.fullscreenElement_);
  }
  this.fullscreenWrapper_.insertBefore(this.fullscreenElement_, this.fullscreenWrapper_.firstChild);
  this.fullscreenElementCachedStyle_ = this.fullscreenElement_.getAttribute('style');
  var self = this;
  function applyFullscreenElementStyle() {
    if (!self.fullscreenElement_) {
      return;
    }
    var cssProperties = ['position: absolute', 'top: 0', 'left: 0', 'width: ' + Math.max(screen.width, screen.height) + 'px', 'height: ' + Math.min(screen.height, screen.width) + 'px', 'border: 0', 'margin: 0', 'padding: 0'];
    self.fullscreenElement_.setAttribute('style', cssProperties.join('; ') + ';');
  }
  applyFullscreenElementStyle();
  return this.fullscreenWrapper_;
};
VRDisplay.prototype.removeFullscreenWrapper = function () {
  if (!this.fullscreenElement_) {
    return;
  }
  var element = this.fullscreenElement_;
  if (this.fullscreenElementCachedStyle_) {
    element.setAttribute('style', this.fullscreenElementCachedStyle_);
  } else {
    element.removeAttribute('style');
  }
  this.fullscreenElement_ = null;
  this.fullscreenElementCachedStyle_ = null;
  var parent = this.fullscreenWrapper_.parentElement;
  this.fullscreenWrapper_.removeChild(element);
  if (this.originalParent_ === parent) {
    parent.insertBefore(element, this.fullscreenWrapper_);
  }
  else if (this.originalParent_) {
      this.originalParent_.appendChild(element);
    }
  parent.removeChild(this.fullscreenWrapper_);
  return element;
};
VRDisplay.prototype.requestPresent = function (layers) {
  var wasPresenting = this.isPresenting;
  var self = this;
  if (!(layers instanceof Array)) {
    deprecateWarning('VRDisplay.prototype.requestPresent with non-array argument', 'an array of VRLayers as the first argument');
    layers = [layers];
  }
  return new Promise(function (resolve, reject) {
    if (!self.capabilities.canPresent) {
      reject(new Error('VRDisplay is not capable of presenting.'));
      return;
    }
    if (layers.length == 0 || layers.length > self.capabilities.maxLayers) {
      reject(new Error('Invalid number of layers.'));
      return;
    }
    var incomingLayer = layers[0];
    if (!incomingLayer.source) {
      resolve();
      return;
    }
    var leftBounds = incomingLayer.leftBounds || defaultLeftBounds;
    var rightBounds = incomingLayer.rightBounds || defaultRightBounds;
    if (wasPresenting) {
      var layer = self.layer_;
      if (layer.source !== incomingLayer.source) {
        layer.source = incomingLayer.source;
      }
      for (var i = 0; i < 4; i++) {
        layer.leftBounds[i] = leftBounds[i];
        layer.rightBounds[i] = rightBounds[i];
      }
      self.wrapForFullscreen(self.layer_.source);
      self.updatePresent_();
      resolve();
      return;
    }
    self.layer_ = {
      predistorted: incomingLayer.predistorted,
      source: incomingLayer.source,
      leftBounds: leftBounds.slice(0),
      rightBounds: rightBounds.slice(0)
    };
    self.waitingForPresent_ = false;
    if (self.layer_ && self.layer_.source) {
      var fullscreenElement = self.wrapForFullscreen(self.layer_.source);
      var onFullscreenChange = function onFullscreenChange() {
        var actualFullscreenElement = getFullscreenElement();
        self.isPresenting = fullscreenElement === actualFullscreenElement;
        if (self.isPresenting) {
          if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape-primary').catch(function (error) {
              console.error('screen.orientation.lock() failed due to', error.message);
            });
          }
          self.waitingForPresent_ = false;
          self.beginPresent_();
          resolve();
        } else {
          if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
          }
          self.removeFullscreenWrapper();
          self.disableWakeLock();
          self.endPresent_();
          self.removeFullscreenListeners_();
        }
        self.fireVRDisplayPresentChange_();
      };
      var onFullscreenError = function onFullscreenError() {
        if (!self.waitingForPresent_) {
          return;
        }
        self.removeFullscreenWrapper();
        self.removeFullscreenListeners_();
        self.disableWakeLock();
        self.waitingForPresent_ = false;
        self.isPresenting = false;
        reject(new Error('Unable to present.'));
      };
      self.addFullscreenListeners_(fullscreenElement, onFullscreenChange, onFullscreenError);
      if (requestFullscreen(fullscreenElement)) {
        self.enableWakeLock();
        self.waitingForPresent_ = true;
      } else if (isIOS() || isWebViewAndroid()) {
        self.enableWakeLock();
        self.isPresenting = true;
        self.beginPresent_();
        self.fireVRDisplayPresentChange_();
        resolve();
      }
    }
    if (!self.waitingForPresent_ && !isIOS()) {
      exitFullscreen();
      reject(new Error('Unable to present.'));
    }
  });
};
VRDisplay.prototype.exitPresent = function () {
  var wasPresenting = this.isPresenting;
  var self = this;
  this.isPresenting = false;
  this.layer_ = null;
  this.disableWakeLock();
  return new Promise(function (resolve, reject) {
    if (wasPresenting) {
      if (!exitFullscreen() && isIOS()) {
        self.endPresent_();
        self.fireVRDisplayPresentChange_();
      }
      if (isWebViewAndroid()) {
        self.removeFullscreenWrapper();
        self.removeFullscreenListeners_();
        self.endPresent_();
        self.fireVRDisplayPresentChange_();
      }
      resolve();
    } else {
      reject(new Error('Was not presenting to VRDisplay.'));
    }
  });
};
VRDisplay.prototype.getLayers = function () {
  if (this.layer_) {
    return [this.layer_];
  }
  return [];
};
VRDisplay.prototype.fireVRDisplayPresentChange_ = function () {
  var event = new CustomEvent('vrdisplaypresentchange', { detail: { display: this } });
  window.dispatchEvent(event);
};
VRDisplay.prototype.fireVRDisplayConnect_ = function () {
  var event = new CustomEvent('vrdisplayconnect', { detail: { display: this } });
  window.dispatchEvent(event);
};
VRDisplay.prototype.addFullscreenListeners_ = function (element, changeHandler, errorHandler) {
  this.removeFullscreenListeners_();
  this.fullscreenEventTarget_ = element;
  this.fullscreenChangeHandler_ = changeHandler;
  this.fullscreenErrorHandler_ = errorHandler;
  if (changeHandler) {
    if (document.fullscreenEnabled) {
      element.addEventListener('fullscreenchange', changeHandler, false);
    } else if (document.webkitFullscreenEnabled) {
      element.addEventListener('webkitfullscreenchange', changeHandler, false);
    } else if (document.mozFullScreenEnabled) {
      document.addEventListener('mozfullscreenchange', changeHandler, false);
    } else if (document.msFullscreenEnabled) {
      element.addEventListener('msfullscreenchange', changeHandler, false);
    }
  }
  if (errorHandler) {
    if (document.fullscreenEnabled) {
      element.addEventListener('fullscreenerror', errorHandler, false);
    } else if (document.webkitFullscreenEnabled) {
      element.addEventListener('webkitfullscreenerror', errorHandler, false);
    } else if (document.mozFullScreenEnabled) {
      document.addEventListener('mozfullscreenerror', errorHandler, false);
    } else if (document.msFullscreenEnabled) {
      element.addEventListener('msfullscreenerror', errorHandler, false);
    }
  }
};
VRDisplay.prototype.removeFullscreenListeners_ = function () {
  if (!this.fullscreenEventTarget_) return;
  var element = this.fullscreenEventTarget_;
  if (this.fullscreenChangeHandler_) {
    var changeHandler = this.fullscreenChangeHandler_;
    element.removeEventListener('fullscreenchange', changeHandler, false);
    element.removeEventListener('webkitfullscreenchange', changeHandler, false);
    document.removeEventListener('mozfullscreenchange', changeHandler, false);
    element.removeEventListener('msfullscreenchange', changeHandler, false);
  }
  if (this.fullscreenErrorHandler_) {
    var errorHandler = this.fullscreenErrorHandler_;
    element.removeEventListener('fullscreenerror', errorHandler, false);
    element.removeEventListener('webkitfullscreenerror', errorHandler, false);
    document.removeEventListener('mozfullscreenerror', errorHandler, false);
    element.removeEventListener('msfullscreenerror', errorHandler, false);
  }
  this.fullscreenEventTarget_ = null;
  this.fullscreenChangeHandler_ = null;
  this.fullscreenErrorHandler_ = null;
};
VRDisplay.prototype.enableWakeLock = function () {
  if (this.wakelock_) {
    this.wakelock_.enable();
  }
};
VRDisplay.prototype.disableWakeLock = function () {
  if (this.wakelock_) {
    this.wakelock_.disable();
  }
};
VRDisplay.prototype.beginPresent_ = function () {
};
VRDisplay.prototype.endPresent_ = function () {
};
VRDisplay.prototype.submitFrame = function (pose) {
};
VRDisplay.prototype.getEyeParameters = function (whichEye) {
  return null;
};
var config = {
  ADDITIONAL_VIEWERS: [],
  DEFAULT_VIEWER: '',
  MOBILE_WAKE_LOCK: true,
  DEBUG: false,
  DPDB_URL: 'https://dpdb.webvr.rocks/dpdb.json',
  K_FILTER: 0.98,
  PREDICTION_TIME_S: 0.040,
  CARDBOARD_UI_DISABLED: false,
  ROTATE_INSTRUCTIONS_DISABLED: false,
  YAW_ONLY: false,
  BUFFER_SCALE: 0.5,
  DIRTY_SUBMIT_FRAME_BINDINGS: false
};
var Eye = {
  LEFT: 'left',
  RIGHT: 'right'
};
function CardboardVRDisplay(config$$1) {
  var defaults = extend({}, config);
  config$$1 = extend(defaults, config$$1 || {});
  VRDisplay.call(this, {
    wakelock: config$$1.MOBILE_WAKE_LOCK
  });
  this.config = config$$1;
  this.displayName = 'Cardboard VRDisplay';
  this.capabilities = new VRDisplayCapabilities({
    hasPosition: false,
    hasOrientation: true,
    hasExternalDisplay: false,
    canPresent: true,
    maxLayers: 1
  });
  this.stageParameters = null;
  this.bufferScale_ = this.config.BUFFER_SCALE;
  this.poseSensor_ = new PoseSensor(this.config);
  this.distorter_ = null;
  this.cardboardUI_ = null;
  this.dpdb_ = new Dpdb(this.config.DPDB_URL, this.onDeviceParamsUpdated_.bind(this));
  this.deviceInfo_ = new DeviceInfo(this.dpdb_.getDeviceParams(), config$$1.ADDITIONAL_VIEWERS);
  this.viewerSelector_ = new ViewerSelector(config$$1.DEFAULT_VIEWER);
  this.viewerSelector_.onChange(this.onViewerChanged_.bind(this));
  this.deviceInfo_.setViewer(this.viewerSelector_.getCurrentViewer());
  if (!this.config.ROTATE_INSTRUCTIONS_DISABLED) {
    this.rotateInstructions_ = new RotateInstructions();
  }
  if (isIOS()) {
    window.addEventListener('resize', this.onResize_.bind(this));
  }
}
CardboardVRDisplay.prototype = Object.create(VRDisplay.prototype);
CardboardVRDisplay.prototype._getPose = function () {
  return {
    position: null,
    orientation: this.poseSensor_.getOrientation(),
    linearVelocity: null,
    linearAcceleration: null,
    angularVelocity: null,
    angularAcceleration: null
  };
};
CardboardVRDisplay.prototype._resetPose = function () {
  if (this.poseSensor_.resetPose) {
    this.poseSensor_.resetPose();
  }
};
CardboardVRDisplay.prototype._getFieldOfView = function (whichEye) {
  var fieldOfView;
  if (whichEye == Eye.LEFT) {
    fieldOfView = this.deviceInfo_.getFieldOfViewLeftEye();
  } else if (whichEye == Eye.RIGHT) {
    fieldOfView = this.deviceInfo_.getFieldOfViewRightEye();
  } else {
    console.error('Invalid eye provided: %s', whichEye);
    return null;
  }
  return fieldOfView;
};
CardboardVRDisplay.prototype._getEyeOffset = function (whichEye) {
  var offset;
  if (whichEye == Eye.LEFT) {
    offset = [-this.deviceInfo_.viewer.interLensDistance * 0.5, 0.0, 0.0];
  } else if (whichEye == Eye.RIGHT) {
    offset = [this.deviceInfo_.viewer.interLensDistance * 0.5, 0.0, 0.0];
  } else {
    console.error('Invalid eye provided: %s', whichEye);
    return null;
  }
  return offset;
};
CardboardVRDisplay.prototype.getEyeParameters = function (whichEye) {
  var offset = this._getEyeOffset(whichEye);
  var fieldOfView = this._getFieldOfView(whichEye);
  var eyeParams = {
    offset: offset,
    renderWidth: this.deviceInfo_.device.width * 0.5 * this.bufferScale_,
    renderHeight: this.deviceInfo_.device.height * this.bufferScale_
  };
  Object.defineProperty(eyeParams, 'fieldOfView', {
    enumerable: true,
    get: function get() {
      deprecateWarning('VRFieldOfView', 'VRFrameData\'s projection matrices');
      return fieldOfView;
    }
  });
  return eyeParams;
};
CardboardVRDisplay.prototype.onDeviceParamsUpdated_ = function (newParams) {
  if (this.config.DEBUG) {
    console.log('DPDB reported that device params were updated.');
  }
  this.deviceInfo_.updateDeviceParams(newParams);
  if (this.distorter_) {
    this.distorter_.updateDeviceInfo(this.deviceInfo_);
  }
};
CardboardVRDisplay.prototype.updateBounds_ = function () {
  if (this.layer_ && this.distorter_ && (this.layer_.leftBounds || this.layer_.rightBounds)) {
    this.distorter_.setTextureBounds(this.layer_.leftBounds, this.layer_.rightBounds);
  }
};
CardboardVRDisplay.prototype.beginPresent_ = function () {
  var gl = this.layer_.source.getContext('webgl');
  if (!gl) gl = this.layer_.source.getContext('experimental-webgl');
  if (!gl) gl = this.layer_.source.getContext('webgl2');
  if (!gl) return;
  if (this.layer_.predistorted) {
    if (!this.config.CARDBOARD_UI_DISABLED) {
      gl.canvas.width = getScreenWidth() * this.bufferScale_;
      gl.canvas.height = getScreenHeight() * this.bufferScale_;
      this.cardboardUI_ = new CardboardUI(gl);
    }
  } else {
    if (!this.config.CARDBOARD_UI_DISABLED) {
      this.cardboardUI_ = new CardboardUI(gl);
    }
    this.distorter_ = new CardboardDistorter(gl, this.cardboardUI_, this.config.BUFFER_SCALE, this.config.DIRTY_SUBMIT_FRAME_BINDINGS);
    this.distorter_.updateDeviceInfo(this.deviceInfo_);
  }
  if (this.cardboardUI_) {
    this.cardboardUI_.listen(function (e) {
      this.viewerSelector_.show(this.layer_.source.parentElement);
      e.stopPropagation();
      e.preventDefault();
    }.bind(this), function (e) {
      this.exitPresent();
      e.stopPropagation();
      e.preventDefault();
    }.bind(this));
  }
  if (this.rotateInstructions_) {
    if (isLandscapeMode() && isMobile()) {
      this.rotateInstructions_.showTemporarily(3000, this.layer_.source.parentElement);
    } else {
      this.rotateInstructions_.update();
    }
  }
  this.orientationHandler = this.onOrientationChange_.bind(this);
  window.addEventListener('orientationchange', this.orientationHandler);
  this.vrdisplaypresentchangeHandler = this.updateBounds_.bind(this);
  window.addEventListener('vrdisplaypresentchange', this.vrdisplaypresentchangeHandler);
  this.fireVRDisplayDeviceParamsChange_();
};
CardboardVRDisplay.prototype.endPresent_ = function () {
  if (this.distorter_) {
    this.distorter_.destroy();
    this.distorter_ = null;
  }
  if (this.cardboardUI_) {
    this.cardboardUI_.destroy();
    this.cardboardUI_ = null;
  }
  if (this.rotateInstructions_) {
    this.rotateInstructions_.hide();
  }
  this.viewerSelector_.hide();
  window.removeEventListener('orientationchange', this.orientationHandler);
  window.removeEventListener('vrdisplaypresentchange', this.vrdisplaypresentchangeHandler);
};
CardboardVRDisplay.prototype.updatePresent_ = function () {
  this.endPresent_();
  this.beginPresent_();
};
CardboardVRDisplay.prototype.submitFrame = function (pose) {
  if (this.distorter_) {
    this.updateBounds_();
    this.distorter_.submitFrame();
  } else if (this.cardboardUI_ && this.layer_) {
    var canvas = this.layer_.source.getContext('webgl').canvas;
    if (canvas.width != this.lastWidth || canvas.height != this.lastHeight) {
      this.cardboardUI_.onResize();
    }
    this.lastWidth = canvas.width;
    this.lastHeight = canvas.height;
    this.cardboardUI_.render();
  }
};
CardboardVRDisplay.prototype.onOrientationChange_ = function (e) {
  this.viewerSelector_.hide();
  if (this.rotateInstructions_) {
    this.rotateInstructions_.update();
  }
  this.onResize_();
};
CardboardVRDisplay.prototype.onResize_ = function (e) {
  if (this.layer_) {
    var gl = this.layer_.source.getContext('webgl');
    var cssProperties = ['position: absolute', 'top: 0', 'left: 0',
    'width: 100vw', 'height: 100vh', 'border: 0', 'margin: 0',
    'padding: 0px', 'box-sizing: content-box'];
    gl.canvas.setAttribute('style', cssProperties.join('; ') + ';');
    safariCssSizeWorkaround(gl.canvas);
  }
};
CardboardVRDisplay.prototype.onViewerChanged_ = function (viewer) {
  this.deviceInfo_.setViewer(viewer);
  if (this.distorter_) {
    this.distorter_.updateDeviceInfo(this.deviceInfo_);
  }
  this.fireVRDisplayDeviceParamsChange_();
};
CardboardVRDisplay.prototype.fireVRDisplayDeviceParamsChange_ = function () {
  var event = new CustomEvent('vrdisplaydeviceparamschange', {
    detail: {
      vrdisplay: this,
      deviceInfo: this.deviceInfo_
    }
  });
  window.dispatchEvent(event);
};
CardboardVRDisplay.VRFrameData = VRFrameData;
CardboardVRDisplay.VRDisplay = VRDisplay;
return CardboardVRDisplay;
})));
});
var CardboardVRDisplay = unwrapExports(cardboardVrDisplay);

var version = "0.10.10";

var DefaultConfig = {
  ADDITIONAL_VIEWERS: [],
  DEFAULT_VIEWER: '',
  PROVIDE_MOBILE_VRDISPLAY: true,
  MOBILE_WAKE_LOCK: true,
  DEBUG: false,
  DPDB_URL: 'https://dpdb.webvr.rocks/dpdb.json',
  K_FILTER: 0.98,
  PREDICTION_TIME_S: 0.040,
  CARDBOARD_UI_DISABLED: false,
  ROTATE_INSTRUCTIONS_DISABLED: false,
  YAW_ONLY: false,
  BUFFER_SCALE: 0.5,
  DIRTY_SUBMIT_FRAME_BINDINGS: false
};

function WebVRPolyfill(config) {
  this.config = extend(extend({}, DefaultConfig), config);
  this.polyfillDisplays = [];
  this.enabled = false;
  this.hasNative = 'getVRDisplays' in navigator;
  this.native = {};
  this.native.getVRDisplays = navigator.getVRDisplays;
  this.native.VRFrameData = window.VRFrameData;
  this.native.VRDisplay = window.VRDisplay;
  if (!this.hasNative || this.config.PROVIDE_MOBILE_VRDISPLAY && isMobile()) {
    this.enable();
    this.getVRDisplays().then(function (displays) {
      if (displays && displays[0] && displays[0].fireVRDisplayConnect_) {
        displays[0].fireVRDisplayConnect_();
      }
    });
  }
}
WebVRPolyfill.prototype.getPolyfillDisplays = function () {
  if (this._polyfillDisplaysPopulated) {
    return this.polyfillDisplays;
  }
  if (isMobile()) {
    var vrDisplay = new CardboardVRDisplay({
      ADDITIONAL_VIEWERS: this.config.ADDITIONAL_VIEWERS,
      DEFAULT_VIEWER: this.config.DEFAULT_VIEWER,
      MOBILE_WAKE_LOCK: this.config.MOBILE_WAKE_LOCK,
      DEBUG: this.config.DEBUG,
      DPDB_URL: this.config.DPDB_URL,
      CARDBOARD_UI_DISABLED: this.config.CARDBOARD_UI_DISABLED,
      K_FILTER: this.config.K_FILTER,
      PREDICTION_TIME_S: this.config.PREDICTION_TIME_S,
      ROTATE_INSTRUCTIONS_DISABLED: this.config.ROTATE_INSTRUCTIONS_DISABLED,
      YAW_ONLY: this.config.YAW_ONLY,
      BUFFER_SCALE: this.config.BUFFER_SCALE,
      DIRTY_SUBMIT_FRAME_BINDINGS: this.config.DIRTY_SUBMIT_FRAME_BINDINGS
    });
    this.polyfillDisplays.push(vrDisplay);
  }
  this._polyfillDisplaysPopulated = true;
  return this.polyfillDisplays;
};
WebVRPolyfill.prototype.enable = function () {
  this.enabled = true;
  if (this.hasNative && this.native.VRFrameData) {
    var NativeVRFrameData = this.native.VRFrameData;
    var nativeFrameData = new this.native.VRFrameData();
    var nativeGetFrameData = this.native.VRDisplay.prototype.getFrameData;
    window.VRDisplay.prototype.getFrameData = function (frameData) {
      if (frameData instanceof NativeVRFrameData) {
        nativeGetFrameData.call(this, frameData);
        return;
      }
      nativeGetFrameData.call(this, nativeFrameData);
      frameData.pose = nativeFrameData.pose;
      copyArray(nativeFrameData.leftProjectionMatrix, frameData.leftProjectionMatrix);
      copyArray(nativeFrameData.rightProjectionMatrix, frameData.rightProjectionMatrix);
      copyArray(nativeFrameData.leftViewMatrix, frameData.leftViewMatrix);
      copyArray(nativeFrameData.rightViewMatrix, frameData.rightViewMatrix);
    };
  }
  navigator.getVRDisplays = this.getVRDisplays.bind(this);
  window.VRDisplay = CardboardVRDisplay.VRDisplay;
  window.VRFrameData = CardboardVRDisplay.VRFrameData;
};
WebVRPolyfill.prototype.getVRDisplays = function () {
  var _this = this;
  var config = this.config;
  if (!this.hasNative) {
    return Promise.resolve(this.getPolyfillDisplays());
  }
  return this.native.getVRDisplays.call(navigator).then(function (nativeDisplays) {
    return nativeDisplays.length > 0 ? nativeDisplays : _this.getPolyfillDisplays();
  });
};
WebVRPolyfill.version = version;
WebVRPolyfill.VRFrameData = CardboardVRDisplay.VRFrameData;
WebVRPolyfill.VRDisplay = CardboardVRDisplay.VRDisplay;


var webvrPolyfill = Object.freeze({
	default: WebVRPolyfill
});

var require$$0 = ( webvrPolyfill && WebVRPolyfill ) || webvrPolyfill;

if (typeof commonjsGlobal !== 'undefined' && commonjsGlobal.window) {
  if (!commonjsGlobal.document) {
    commonjsGlobal.document = commonjsGlobal.window.document;
  }
  if (!commonjsGlobal.navigator) {
    commonjsGlobal.navigator = commonjsGlobal.window.navigator;
  }
}
var src = require$$0;

return src;

})));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],45:[function(_dereq_,module,exports){
var newline = /\n/
var newlineChar = '\n'
var whitespace = /\s/

module.exports = function(text, opt) {
    var lines = module.exports.lines(text, opt)
    return lines.map(function(line) {
        return text.substring(line.start, line.end)
    }).join('\n')
}

module.exports.lines = function wordwrap(text, opt) {
    opt = opt||{}

    //zero width results in nothing visible
    if (opt.width === 0 && opt.mode !== 'nowrap')
        return []

    text = text||''
    var width = typeof opt.width === 'number' ? opt.width : Number.MAX_VALUE
    var start = Math.max(0, opt.start||0)
    var end = typeof opt.end === 'number' ? opt.end : text.length
    var mode = opt.mode

    var measure = opt.measure || monospace
    if (mode === 'pre')
        return pre(measure, text, start, end, width)
    else
        return greedy(measure, text, start, end, width, mode)
}

function idxOf(text, chr, start, end) {
    var idx = text.indexOf(chr, start)
    if (idx === -1 || idx > end)
        return end
    return idx
}

function isWhitespace(chr) {
    return whitespace.test(chr)
}

function pre(measure, text, start, end, width) {
    var lines = []
    var lineStart = start
    for (var i=start; i<end && i<text.length; i++) {
        var chr = text.charAt(i)
        var isNewline = newline.test(chr)

        //If we've reached a newline, then step down a line
        //Or if we've reached the EOF
        if (isNewline || i===end-1) {
            var lineEnd = isNewline ? i : i+1
            var measured = measure(text, lineStart, lineEnd, width)
            lines.push(measured)

            lineStart = i+1
        }
    }
    return lines
}

function greedy(measure, text, start, end, width, mode) {
    //A greedy word wrapper based on LibGDX algorithm
    //https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/BitmapFontCache.java
    var lines = []

    var testWidth = width
    //if 'nowrap' is specified, we only wrap on newline chars
    if (mode === 'nowrap')
        testWidth = Number.MAX_VALUE

    while (start < end && start < text.length) {
        //get next newline position
        var newLine = idxOf(text, newlineChar, start, end)

        //eat whitespace at start of line
        while (start < newLine) {
            if (!isWhitespace( text.charAt(start) ))
                break
            start++
        }

        //determine visible # of glyphs for the available width
        var measured = measure(text, start, newLine, testWidth)

        var lineEnd = start + (measured.end-measured.start)
        var nextStart = lineEnd + newlineChar.length

        //if we had to cut the line before the next newline...
        if (lineEnd < newLine) {
            //find char to break on
            while (lineEnd > start) {
                if (isWhitespace(text.charAt(lineEnd)))
                    break
                lineEnd--
            }
            if (lineEnd === start) {
                if (nextStart > start + newlineChar.length) nextStart--
                lineEnd = nextStart // If no characters to break, show all.
            } else {
                nextStart = lineEnd
                //eat whitespace at end of line
                while (lineEnd > start) {
                    if (!isWhitespace(text.charAt(lineEnd - newlineChar.length)))
                        break
                    lineEnd--
                }
            }
        }
        if (lineEnd >= start) {
            var result = measure(text, start, lineEnd, testWidth)
            lines.push(result)
        }
        start = nextStart
    }
    return lines
}

//determines the visible number of glyphs within a given width
function monospace(text, start, end, width) {
    var glyphs = Math.min(width, end-start)
    return {
        start: start,
        end: start+glyphs
    }
}
},{}],46:[function(_dereq_,module,exports){
"use strict";
var window = _dereq_("global/window")
var isFunction = _dereq_("is-function")
var parseHeaders = _dereq_("parse-headers")
var xtend = _dereq_("xtend")

module.exports = createXHR
// Allow use of default import syntax in TypeScript
module.exports.default = createXHR;
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            setTimeout(loadFunc, 0)
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer
    var failureResponse = {
        body: undefined,
        headers: {},
        statusCode: 0,
        method: method,
        url: uri,
        rawRequest: xhr
    }

    if ("json" in options && options.json !== false) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json === true ? body : options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.onabort = function(){
        aborted = true;
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            if (aborted) return
            aborted = true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    // Microsoft Edge browser sends "undefined" when send is called with undefined value.
    // XMLHttpRequest spec says to pass null as body to indicate no body
    // See https://github.com/naugtur/xhr/issues/100.
    xhr.send(body || null)

    return xhr


}

function getXml(xhr) {
    // xhr.responseXML will throw Exception "InvalidStateError" or "DOMException"
    // See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseXML.
    try {
        if (xhr.responseType === "document") {
            return xhr.responseXML
        }
        var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
        if (xhr.responseType === "" && !firefoxBugTakenEffect) {
            return xhr.responseXML
        }
    } catch (e) {}

    return null
}

function noop() {}

},{"global/window":18,"is-function":23,"parse-headers":33,"xtend":48}],47:[function(_dereq_,module,exports){
module.exports = (function xmlparser() {
  //common browsers
  if (typeof self.DOMParser !== 'undefined') {
    return function(str) {
      var parser = new self.DOMParser()
      return parser.parseFromString(str, 'application/xml')
    }
  }

  //IE8 fallback
  if (typeof self.ActiveXObject !== 'undefined'
      && new self.ActiveXObject('Microsoft.XMLDOM')) {
    return function(str) {
      var xmlDoc = new self.ActiveXObject("Microsoft.XMLDOM")
      xmlDoc.async = "false"
      xmlDoc.loadXML(str)
      return xmlDoc
    }
  }

  //last resort fallback
  return function(str) {
    var div = document.createElement('div')
    div.innerHTML = str
    return div
  }
})()

},{}],48:[function(_dereq_,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],49:[function(_dereq_,module,exports){
module.exports={
  "name": "aframe",
  "version": "0.9.0",
  "description": "A web framework for building virtual reality experiences.",
  "homepage": "https://aframe.io/",
  "main": "dist/aframe-master.js",
  "scripts": {
    "browserify": "browserify src/index.js -s 'AFRAME' -p browserify-derequire",
    "build": "shx mkdir -p build/ && npm run browserify -- --debug -t [envify --INSPECTOR_VERSION dev] -o build/aframe.js",
    "codecov": "codecov",
    "dev": "npm run build && cross-env INSPECTOR_VERSION=dev node ./scripts/budo -t envify",
    "dist": "node scripts/updateVersionLog.js && npm run dist:min && npm run dist:max",
    "dist:max": "npm run browserify -s -- --debug | exorcist dist/aframe-master.js.map > dist/aframe-master.js",
    "dist:min": "npm run browserify -s -- --debug -p [minifyify --map aframe-master.min.js.map --output dist/aframe-master.min.js.map] -o dist/aframe-master.min.js",
    "docs": "markserv --dir docs --port 9001",
    "preghpages": "node ./scripts/preghpages.js",
    "ghpages": "ghpages -p gh-pages/",
    "lint": "semistandard -v | snazzy",
    "lint:fix": "semistandard --fix",
    "precommit": "npm run lint",
    "prepush": "node scripts/testOnlyCheck.js",
    "prerelease": "node scripts/release.js 0.8.2 0.9.0",
    "start": "npm run dev",
    "start:https": "cross-env SSL=true npm run dev",
    "test": "karma start ./tests/karma.conf.js",
    "test:docs": "node scripts/docsLint.js",
    "test:firefox": "npm test -- --browsers Firefox",
    "test:chrome": "npm test -- --browsers Chrome",
    "test:nobrowser": "NO_BROWSER=true npm test",
    "test:node": "mocha --ui tdd tests/node"
  },
  "repository": "aframevr/aframe",
  "license": "MIT",
  "files": [
    "dist/*",
    "docs/**/*",
    "src/**/*",
    "vendor/**/*"
  ],
  "dependencies": {
    "animejs": "^2.2.0",
    "browserify-css": "^0.8.4",
    "custom-event-polyfill": "^1.0.6",
    "debug": "ngokevin/debug#noTimestamp",
    "deep-assign": "^2.0.0",
    "document-register-element": "dmarcos/document-register-element#8ccc532b7f3744be954574caf3072a5fd260ca90",
    "envify": "^3.4.1",
    "load-bmfont": "^1.2.3",
    "object-assign": "^4.0.1",
    "present": "0.0.6",
    "promise-polyfill": "^3.1.0",
    "style-attr": "^1.0.2",
    "super-three": "^0.101.0",
    "three-bmfont-text": "^2.1.0",
    "webvr-polyfill": "^0.10.10"
  },
  "devDependencies": {
    "browserify": "^13.1.0",
    "browserify-derequire": "^0.9.4",
    "browserify-istanbul": "^2.0.0",
    "budo": "^9.2.0",
    "chai": "^3.5.0",
    "chai-shallow-deep-equal": "^1.4.0",
    "chalk": "^1.1.3",
    "codecov": "^1.0.1",
    "cross-env": "^5.0.1",
    "exorcist": "^0.4.0",
    "ghpages": "0.0.8",
    "git-rev": "^0.2.1",
    "glob": "^7.1.1",
    "husky": "^0.11.7",
    "istanbul": "^0.4.5",
    "jsdom": "^9.11.0",
    "karma": "1.4.1",
    "karma-browserify": "^5.1.0",
    "karma-chai-shallow-deep-equal": "0.0.4",
    "karma-chrome-launcher": "^2.0.0",
    "karma-coverage": "^1.1.1",
    "karma-env-preprocessor": "^0.1.1",
    "karma-firefox-launcher": "^1.0.0",
    "karma-mocha": "^1.1.1",
    "karma-mocha-reporter": "^2.1.0",
    "karma-sinon-chai": "1.2.4",
    "lolex": "^1.5.1",
    "markserv": "github:sukima/markserv#feature/fix-broken-websoketio-link",
    "minifyify": "^7.3.3",
    "mocha": "^3.0.2",
    "mozilla-download": "^1.1.1",
    "replace-in-file": "^2.5.3",
    "semistandard": "^9.0.0",
    "shelljs": "^0.7.7",
    "shx": "^0.2.2",
    "sinon": "^1.17.5",
    "sinon-chai": "2.8.0",
    "snazzy": "^5.0.0",
    "too-wordy": "ngokevin/too-wordy",
    "uglifyjs": "^2.4.10",
    "write-good": "^0.9.1"
  },
  "link": true,
  "browserify": {
    "transform": [
      "browserify-css",
      "envify"
    ]
  },
  "semistandard": {
    "ignore": [
      "build/**",
      "dist/**",
      "examples/**/shaders/*.js",
      "**/vendor/**"
    ]
  },
  "keywords": [
    "3d",
    "aframe",
    "cardboard",
    "components",
    "oculus",
    "three",
    "three.js",
    "rift",
    "vive",
    "vr",
    "web-components",
    "webvr"
  ],
  "browserify-css": {
    "minify": true
  },
  "engines": {
    "node": ">= 4.6.0",
    "npm": "^2.15.9"
  }
}

},{}],50:[function(_dereq_,module,exports){
var anime = _dereq_('animejs');
var components = _dereq_('../core/component').components;
var registerComponent = _dereq_('../core/component').registerComponent;
var THREE = _dereq_('../lib/three');
var utils = _dereq_('../utils');

var colorHelperFrom = new THREE.Color();
var colorHelperTo = new THREE.Color();

var getComponentProperty = utils.entity.getComponentProperty;
var setComponentProperty = utils.entity.setComponentProperty;
var splitCache = {};

var TYPE_COLOR = 'color';
var PROP_POSITION = 'position';
var PROP_ROTATION = 'rotation';
var PROP_SCALE = 'scale';
var STRING_COMPONENTS = 'components';
var STRING_OBJECT3D = 'object3D';

/**
 * Animation component for A-Frame using anime.js.
 *
 * The component manually controls the tick by setting `autoplay: false` on anime.js and
 * manually * calling `animation.tick()` in the tick handler. To pause or resume, we toggle a
 * boolean * flag * `isAnimationPlaying`.
 *
 * anime.js animation config for tweenining Javascript objects and values works as:
 *
 *  config = {
 *    targets: {foo: 0.0, bar: '#000'},
 *    foo: 1.0,
 *    bar: '#FFF'
 *  }
 *
 * The above will tween each property in `targets`. The `to` values are set in the root of
 * the config.
 *
 * @member {object} animation - anime.js instance.
 * @member {boolean} animationIsPlaying - Control if animation is playing.
 */
module.exports.Component = registerComponent('animation', {
  schema: {
    autoplay: {default: true},
    delay: {default: 0},
    dir: {default: ''},
    dur: {default: 1000},
    easing: {default: 'easeInQuad'},
    elasticity: {default: 400},
    enabled: {default: true},
    from: {default: ''},
    loop: {
      default: 0,
      parse: function (value) {
        // Boolean or integer.
        if (value === true || value === 'true') { return true; }
        if (value === false || value === 'false') { return false; }
        return parseInt(value, 10);
      }
    },
    property: {default: ''},
    startEvents: {type: 'array'},
    pauseEvents: {type: 'array'},
    resumeEvents: {type: 'array'},
    round: {default: false},
    to: {default: ''},
    type: {default: ''},
    isRawProperty: {default: false}
  },

  multiple: true,

  init: function () {
    var self = this;

    this.eventDetail = {name: this.attrName};
    this.time = 0;

    this.animation = null;
    this.animationIsPlaying = false;
    this.onStartEvent = this.onStartEvent.bind(this);
    this.beginAnimation = this.beginAnimation.bind(this);
    this.pauseAnimation = this.pauseAnimation.bind(this);
    this.resumeAnimation = this.resumeAnimation.bind(this);

    this.fromColor = {};
    this.toColor = {};
    this.targets = {};
    this.targetsArray = [];

    this.updateConfigForDefault = this.updateConfigForDefault.bind(this);
    this.updateConfigForRawColor = this.updateConfigForRawColor.bind(this);

    this.config = {
      complete: function () {
        self.animationIsPlaying = false;
        self.el.emit('animationcomplete', self.eventDetail, false);
        if (self.id) {
          self.el.emit('animationcomplete__' + self.id, self.eventDetail, false);
        }
      }
    };
  },

  update: function (oldData) {
    var config = this.config;
    var data = this.data;

    this.animationIsPlaying = false;

    if (!this.data.enabled) { return; }

    if (!data.property) { return; }

    // Base config.
    config.autoplay = false;
    config.direction = data.dir;
    config.duration = data.dur;
    config.easing = data.easing;
    config.elasticity = data.elasticity;
    config.loop = data.loop;
    config.round = data.round;

    // Start new animation.
    this.createAndStartAnimation();
  },

  tick: function (t, dt) {
    if (!this.animationIsPlaying) { return; }
    this.time += dt;
    this.animation.tick(this.time);
  },

  remove: function () {
    this.pauseAnimation();
    this.removeEventListeners();
  },

  pause: function () {
    this.paused = true;
    this.pausedWasPlaying = this.animationIsPlaying;
    this.pauseAnimation();
    this.removeEventListeners();
  },

  /**
   * `play` handler only for resuming scene.
   */
  play: function () {
    if (!this.paused) { return; }
    this.paused = false;
    this.addEventListeners();
    if (this.pausedWasPlaying) {
      this.resumeAnimation();
      this.pausedWasPlaying = false;
    }
  },

  /**
   * Start animation from scratch.
   */
  createAndStartAnimation: function () {
    var data = this.data;

    this.updateConfig();
    this.animationIsPlaying = false;
    this.animation = anime(this.config);

    this.removeEventListeners();
    this.addEventListeners();

    // Wait for start events for animation.
    if (!data.autoplay || data.startEvents && data.startEvents.length) { return; }

    // Delay animation.
    if (data.delay) {
      setTimeout(this.beginAnimation, data.delay);
      return;
    }

    // Play animation.
    this.beginAnimation();
  },

  /**
   * This is before animation start (including from startEvents).
   * Set to initial state (config.from, time = 0, seekTime = 0).
   */
  beginAnimation: function () {
    this.updateConfig();
    this.time = 0;
    this.animationIsPlaying = true;
    this.stopRelatedAnimations();
    this.el.emit('animationbegin', this.eventDetail, false);
  },

  pauseAnimation: function () {
    this.animationIsPlaying = false;
  },

  resumeAnimation: function () {
    this.animationIsPlaying = true;
  },

  /**
   * startEvents callback.
   */
  onStartEvent: function () {
    if (!this.data.enabled) { return; }

    this.updateConfig();
    if (this.animation) {
      this.animation.pause();
    }
    this.animation = anime(this.config);

    // Include the delay before each start event.
    if (this.data.delay) {
      setTimeout(this.beginAnimation, this.data.delay);
      return;
    }
    this.beginAnimation();
  },

  /**
   * rawProperty: true and type: color;
   */
  updateConfigForRawColor: function () {
    var config = this.config;
    var data = this.data;
    var el = this.el;
    var from;
    var key;
    var to;

    if (this.waitComponentInitRawProperty(this.updateConfigForRawColor)) {
      return;
    }

    from = data.from === '' ? getRawProperty(el, data.property) : data.from;
    to = data.to;

    // Use r/g/b vector for color type.
    this.setColorConfig(from, to);
    from = this.fromColor;
    to = this.toColor;

    this.targetsArray.length = 0;
    this.targetsArray.push(from);
    config.targets = this.targetsArray;
    for (key in to) { config[key] = to[key]; }

    config.update = (function () {
      var lastValue = {};
      return function (anim) {
        var value;
        value = anim.animatables[0].target;
        // For animation timeline.
        if (value.r === lastValue.r &&
            value.g === lastValue.g &&
            value.b === lastValue.b) { return; }

        setRawProperty(el, data.property, value, data.type);
      };
    })();
  },

  /**
   * Stuff property into generic `property` key.
   */
  updateConfigForDefault: function () {
    var config = this.config;
    var data = this.data;
    var el = this.el;
    var from;
    var isBoolean;
    var isNumber;
    var to;

    if (this.waitComponentInitRawProperty(this.updateConfigForDefault)) {
      return;
    }

    if (data.from === '') {
      // Infer from.
      from = isRawProperty(data)
        ? getRawProperty(el, data.property)
        : getComponentProperty(el, data.property);
    } else {
      // Explicit from.
      from = data.from;
    }

    to = data.to;

    isNumber = !isNaN(from || to);
    if (isNumber) {
      from = parseFloat(from);
      to = parseFloat(to);
    } else {
      from = from ? from.toString() : from;
      to = to ? to.toString() : to;
    }

    // Convert booleans to integer to allow boolean flipping.
    isBoolean = data.to === 'true' || data.to === 'false' ||
                data.to === true || data.to === false;
    if (isBoolean) {
      from = data.from === 'true' || data.from === true ? 1 : 0;
      to = data.to === 'true' || data.to === true ? 1 : 0;
    }

    this.targets.aframeProperty = from;
    config.targets = this.targets;
    config.aframeProperty = to;
    config.update = (function () {
      var lastValue;

      return function (anim) {
        var value;
        value = anim.animatables[0].target.aframeProperty;

        // Need to do a last value check for animation timeline since all the tweening
        // begins simultaenously even if the value has not changed. Also better for perf
        // anyways.
        if (value === lastValue) { return; }
        lastValue = value;

        if (isBoolean) { value = value >= 1; }

        if (isRawProperty(data)) {
          setRawProperty(el, data.property, value, data.type);
        } else {
          setComponentProperty(el, data.property, value);
        }
      };
    })();
  },

  /**
   * Extend x/y/z/w onto the config.
   * Update vector by modifying object3D.
   */
  updateConfigForVector: function () {
    var config = this.config;
    var data = this.data;
    var el = this.el;
    var key;
    var from;
    var to;

    // Parse coordinates.
    from = data.from !== ''
      ? utils.coordinates.parse(data.from)  // If data.from defined, use that.
      : getComponentProperty(el, data.property);  // If data.from not defined, get on the fly.
    to = utils.coordinates.parse(data.to);

    if (data.property === PROP_ROTATION) {
      toRadians(from);
      toRadians(to);
    }

    // Set to and from.
    this.targetsArray.length = 0;
    this.targetsArray.push(from);
    config.targets = this.targetsArray;
    for (key in to) { config[key] = to[key]; }

    // If animating object3D transformation, run more optimized updater.
    if (data.property === PROP_POSITION || data.property === PROP_ROTATION ||
        data.property === PROP_SCALE) {
      config.update = (function () {
        var lastValue = {};
        return function (anim) {
          var value = anim.animatables[0].target;

          if (data.property === PROP_SCALE) {
            value.x = Math.max(0.0001, value.x);
            value.y = Math.max(0.0001, value.y);
            value.z = Math.max(0.0001, value.z);
          }

          // For animation timeline.
          if (value.x === lastValue.x &&
              value.y === lastValue.y &&
              value.z === lastValue.z) { return; }

          lastValue.x = value.x;
          lastValue.y = value.y;
          lastValue.z = value.z;

          el.object3D[data.property].set(value.x, value.y, value.z);
        };
      })();
      return;
    }

    // Animating some vector.
    config.update = (function () {
      var lastValue = {};
      return function (anim) {
        var value = anim.animations[0].target;

        // Animate rotation through radians.
        // For animation timeline.
        if (value.x === lastValue.x &&
            value.y === lastValue.y &&
            value.z === lastValue.z) { return; }
        lastValue.x = value.x;
        lastValue.y = value.y;
        lastValue.z = value.z;
        setComponentProperty(el, data.property, value);
      };
    })();
  },

  /**
   * Update the config before each run.
   */
  updateConfig: function () {
    var propType;

    // Route config type.
    propType = getPropertyType(this.el, this.data.property);
    if (isRawProperty(this.data) && this.data.type === TYPE_COLOR) {
      this.updateConfigForRawColor();
    } else if (propType === 'vec2' || propType === 'vec3' || propType === 'vec4') {
      this.updateConfigForVector();
    } else {
      this.updateConfigForDefault();
    }
  },

  /**
   * Wait for component to initialize.
   */
  waitComponentInitRawProperty: function (cb) {
    var componentName;
    var data = this.data;
    var el = this.el;
    var self = this;

    if (data.from !== '') { return false; }

    if (!data.property.startsWith(STRING_COMPONENTS)) { return false; }

    componentName = splitDot(data.property)[1];
    if (el.components[componentName]) { return false; }

    el.addEventListener('componentinitialized', function wait (evt) {
      if (evt.detail.name !== componentName) { return; }
      cb();
      // Since the config was created async, create the animation now since we missed it
      // earlier.
      self.animation = anime(self.config);
      el.removeEventListener('componentinitialized', wait);
    });
    return true;
  },

  /**
   * Make sure two animations on the same property don't fight each other.
   * e.g., animation__mouseenter="property: material.opacity"
   *       animation__mouseleave="property: material.opacity"
   */
  stopRelatedAnimations: function () {
    var component;
    var componentName;
    for (componentName in this.el.components) {
      component = this.el.components[componentName];
      if (componentName === this.attrName) { continue; }
      if (component.name !== 'animation') { continue; }
      if (!component.animationIsPlaying) { continue; }
      if (component.data.property !== this.data.property) { continue; }
      component.animationIsPlaying = false;
    }
  },

  addEventListeners: function () {
    var data = this.data;
    var el = this.el;
    addEventListeners(el, data.startEvents, this.onStartEvent);
    addEventListeners(el, data.pauseEvents, this.pauseAnimation);
    addEventListeners(el, data.resumeEvents, this.resumeAnimation);
  },

  removeEventListeners: function () {
    var data = this.data;
    var el = this.el;
    removeEventListeners(el, data.startEvents, this.onStartEvent);
    removeEventListeners(el, data.pauseEvents, this.pauseAnimation);
    removeEventListeners(el, data.resumeEvents, this.resumeAnimation);
  },

  setColorConfig: function (from, to) {
    colorHelperFrom.set(from);
    colorHelperTo.set(to);
    from = this.fromColor;
    to = this.toColor;
    from.r = colorHelperFrom.r;
    from.g = colorHelperFrom.g;
    from.b = colorHelperFrom.b;
    to.r = colorHelperTo.r;
    to.g = colorHelperTo.g;
    to.b = colorHelperTo.b;
  }
});

/**
 * Given property name, check schema to see what type we are animating.
 * We just care whether the property is a vector.
 */
function getPropertyType (el, property) {
  var component;
  var componentName;
  var split;
  var propertyName;

  split = property.split('.');
  componentName = split[0];
  propertyName = split[1];
  component = el.components[componentName] || components[componentName];

  // Primitives.
  if (!component) { return null; }

  // Dynamic schema. We only care about vectors anyways.
  if (propertyName && !component.schema[propertyName]) { return null; }

  // Multi-prop.
  if (propertyName) { return component.schema[propertyName].type; }

  // Single-prop.
  return component.schema.type;
}

/**
 * Convert object to radians.
 */
function toRadians (obj) {
  obj.x = THREE.Math.degToRad(obj.x);
  obj.y = THREE.Math.degToRad(obj.y);
  obj.z = THREE.Math.degToRad(obj.z);
}

function addEventListeners (el, eventNames, handler) {
  var i;
  for (i = 0; i < eventNames.length; i++) {
    el.addEventListener(eventNames[i], handler);
  }
}

function removeEventListeners (el, eventNames, handler) {
  var i;
  for (i = 0; i < eventNames.length; i++) {
    el.removeEventListener(eventNames[i], handler);
  }
}

function getRawProperty (el, path) {
  var i;
  var split;
  var value;
  split = splitDot(path);
  value = el;
  for (i = 0; i < split.length; i++) {
    value = value[split[i]];
  }
  return value;
}

function setRawProperty (el, path, value, type) {
  var i;
  var split;
  var propertyName;
  var targetValue;

  if (path.startsWith('object3D.rotation')) {
    value = THREE.Math.degToRad(value);
  }

  // Walk.
  split = splitDot(path);
  targetValue = el;
  for (i = 0; i < split.length - 1; i++) { targetValue = targetValue[split[i]]; }
  propertyName = split[split.length - 1];

  // Raw color.
  if (type === TYPE_COLOR) {
    if ('r' in targetValue[propertyName]) {
      targetValue[propertyName].r = value.r;
      targetValue[propertyName].g = value.g;
      targetValue[propertyName].b = value.b;
    } else {
      targetValue[propertyName].x = value.r;
      targetValue[propertyName].y = value.g;
      targetValue[propertyName].z = value.b;
    }
    return;
  }

  targetValue[propertyName] = value;
}

function splitDot (path) {
  if (path in splitCache) { return splitCache[path]; }
  splitCache[path] = path.split('.');
  return splitCache[path];
}

function isRawProperty (data) {
  return data.isRawProperty || data.property.startsWith(STRING_COMPONENTS) ||
         data.property.startsWith(STRING_OBJECT3D);
}

},{"../core/component":101,"../lib/three":149,"../utils":174,"animejs":2}],51:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;
var THREE = _dereq_('../lib/three');

/**
 * Camera component.
 * Pairs along with camera system to handle tracking the active camera.
 */
module.exports.Component = registerComponent('camera', {
  schema: {
    active: {default: true},
    far: {default: 10000},
    fov: {default: 80, min: 0},
    near: {default: 0.005, min: 0},
    spectator: {default: false},
    zoom: {default: 1, min: 0}
  },

  /**
   * Initialize three.js camera and add it to the entity.
   * Add reference from scene to this entity as the camera.
   */
  init: function () {
    var camera;
    var el = this.el;

    // Create camera.
    camera = this.camera = new THREE.PerspectiveCamera();
    el.setObject3D('camera', camera);
  },

  /**
   * Update three.js camera.
   */
  update: function (oldData) {
    var data = this.data;
    var camera = this.camera;

    // Update properties.
    camera.aspect = data.aspect || (window.innerWidth / window.innerHeight);
    camera.far = data.far;
    camera.fov = data.fov;
    camera.near = data.near;
    camera.zoom = data.zoom;
    camera.updateProjectionMatrix();

    this.updateActiveCamera(oldData);
    this.updateSpectatorCamera(oldData);
  },

  updateActiveCamera: function (oldData) {
    var data = this.data;
    var el = this.el;
    var system = this.system;
    // Active property did not change.
    if (oldData && oldData.active === data.active || data.spectator) { return; }

    // If `active` property changes, or first update, handle active camera with system.
    if (data.active && system.activeCameraEl !== el) {
      // Camera enabled. Set camera to this camera.
      system.setActiveCamera(el);
    } else if (!data.active && system.activeCameraEl === el) {
      // Camera disabled. Set camera to another camera.
      system.disableActiveCamera();
    }
  },

  updateSpectatorCamera: function (oldData) {
    var data = this.data;
    var el = this.el;
    var system = this.system;
    // spectator property did not change.
    if (oldData && oldData.spectator === data.spectator) { return; }

    // If `spectator` property changes, or first update, handle spectator camera with system.
    if (data.spectator && system.spectatorCameraEl !== el) {
      // Camera enabled. Set camera to this camera.
      system.setSpectatorCamera(el);
    } else if (!data.spectator && system.spectatorCameraEl === el) {
      // Camera disabled. Set camera to another camera.
      system.disableSpectatorCamera();
    }
  },

  /**
   * Remove camera on remove (callback).
   */
  remove: function () {
    this.el.removeObject3D('camera');
  }
});

},{"../core/component":101,"../lib/three":149}],52:[function(_dereq_,module,exports){
/* global THREE */
var registerComponent = _dereq_('../core/component').registerComponent;
var utils = _dereq_('../utils/');

var bind = utils.bind;

var EVENTS = {
  CLICK: 'click',
  FUSING: 'fusing',
  MOUSEENTER: 'mouseenter',
  MOUSEDOWN: 'mousedown',
  MOUSELEAVE: 'mouseleave',
  MOUSEUP: 'mouseup'
};

var STATES = {
  FUSING: 'cursor-fusing',
  HOVERING: 'cursor-hovering',
  HOVERED: 'cursor-hovered'
};

var CANVAS_EVENTS = {
  DOWN: ['mousedown', 'touchstart'],
  UP: ['mouseup', 'touchend']
};

var CANVAS_HOVER_CLASS = 'a-mouse-cursor-hover';

/**
 * Cursor component. Applies the raycaster component specifically for starting the raycaster
 * from the camera and pointing from camera's facing direction, and then only returning the
 * closest intersection. Cursor can be fine-tuned by setting raycaster properties.
 *
 * @member {object} fuseTimeout - Timeout to trigger fuse-click.
 * @member {Element} cursorDownEl - Entity that was last mousedowned during current click.
 * @member {object} intersection - Attributes of the current intersection event, including
 *         3D- and 2D-space coordinates. See: http://threejs.org/docs/api/core/Raycaster.html
 * @member {Element} intersectedEl - Currently-intersected entity. Used to keep track to
 *         emit events when unintersecting.
 */
module.exports.Component = registerComponent('cursor', {
  dependencies: ['raycaster'],

  schema: {
    downEvents: {default: []},
    fuse: {default: utils.device.isMobile()},
    fuseTimeout: {default: 1500, min: 0},
    mouseCursorStylesEnabled: {default: true},
    upEvents: {default: []},
    rayOrigin: {default: 'entity', oneOf: ['mouse', 'entity']}
  },

  init: function () {
    var self = this;

    this.fuseTimeout = undefined;
    this.cursorDownEl = null;
    this.intersectedEl = null;
    this.canvasBounds = document.body.getBoundingClientRect();

    // Debounce.
    this.updateCanvasBounds = utils.debounce(function updateCanvasBounds () {
      self.canvasBounds = self.el.sceneEl.canvas.getBoundingClientRect();
    }, 500);

    this.eventDetail = {};
    this.intersectedEventDetail = {cursorEl: this.el};

    // Bind methods.
    this.onCursorDown = bind(this.onCursorDown, this);
    this.onCursorUp = bind(this.onCursorUp, this);
    this.onIntersection = bind(this.onIntersection, this);
    this.onIntersectionCleared = bind(this.onIntersectionCleared, this);
    this.onMouseMove = bind(this.onMouseMove, this);
  },

  update: function (oldData) {
    if (this.data.rayOrigin === oldData.rayOrigin) { return; }
    this.updateMouseEventListeners();
  },

  play: function () {
    this.addEventListeners();
  },

  pause: function () {
    this.removeEventListeners();
  },

  remove: function () {
    var el = this.el;
    el.removeState(STATES.HOVERING);
    el.removeState(STATES.FUSING);
    clearTimeout(this.fuseTimeout);
    if (this.intersectedEl) { this.intersectedEl.removeState(STATES.HOVERED); }
    this.removeEventListeners();
  },

  addEventListeners: function () {
    var canvas;
    var data = this.data;
    var el = this.el;
    var self = this;

    function addCanvasListeners () {
      canvas = el.sceneEl.canvas;
      if (data.downEvents.length || data.upEvents.length) { return; }
      CANVAS_EVENTS.DOWN.forEach(function (downEvent) {
        canvas.addEventListener(downEvent, self.onCursorDown);
      });
      CANVAS_EVENTS.UP.forEach(function (upEvent) {
        canvas.addEventListener(upEvent, self.onCursorUp);
      });
    }

    canvas = el.sceneEl.canvas;
    if (canvas) {
      addCanvasListeners();
    } else {
      el.sceneEl.addEventListener('render-target-loaded', addCanvasListeners);
    }

    data.downEvents.forEach(function (downEvent) {
      el.addEventListener(downEvent, self.onCursorDown);
    });
    data.upEvents.forEach(function (upEvent) {
      el.addEventListener(upEvent, self.onCursorUp);
    });
    el.addEventListener('raycaster-intersection', this.onIntersection);
    el.addEventListener('raycaster-intersection-cleared', this.onIntersectionCleared);

    el.sceneEl.addEventListener('rendererresize', this.updateCanvasBounds);
    window.addEventListener('resize', this.updateCanvasBounds);
    window.addEventListener('scroll', this.updateCanvasBounds);

    this.updateMouseEventListeners();
  },

  removeEventListeners: function () {
    var canvas;
    var data = this.data;
    var el = this.el;
    var self = this;

    canvas = el.sceneEl.canvas;
    if (canvas && !data.downEvents.length && !data.upEvents.length) {
      CANVAS_EVENTS.DOWN.forEach(function (downEvent) {
        canvas.removeEventListener(downEvent, self.onCursorDown);
      });
      CANVAS_EVENTS.UP.forEach(function (upEvent) {
        canvas.removeEventListener(upEvent, self.onCursorUp);
      });
    }

    data.downEvents.forEach(function (downEvent) {
      el.removeEventListener(downEvent, self.onCursorDown);
    });
    data.upEvents.forEach(function (upEvent) {
      el.removeEventListener(upEvent, self.onCursorUp);
    });
    el.removeEventListener('raycaster-intersection', this.onIntersection);
    el.removeEventListener('raycaster-intersection-cleared', this.onIntersectionCleared);
    canvas.removeEventListener('mousemove', this.onMouseMove);
    canvas.removeEventListener('touchstart', this.onMouseMove);
    canvas.removeEventListener('touchmove', this.onMouseMove);

    el.sceneEl.removeEventListener('rendererresize', this.updateCanvasBounds);
    window.removeEventListener('resize', this.updateCanvasBounds);
    window.removeEventListener('scroll', this.updateCanvasBounds);
  },

  updateMouseEventListeners: function () {
    var canvas;
    var el = this.el;

    canvas = el.sceneEl.canvas;
    canvas.removeEventListener('mousemove', this.onMouseMove);
    canvas.removeEventListener('touchmove', this.onMouseMove);
    el.setAttribute('raycaster', 'useWorldCoordinates', false);
    if (this.data.rayOrigin !== 'mouse') { return; }
    canvas.addEventListener('mousemove', this.onMouseMove, false);
    canvas.addEventListener('touchmove', this.onMouseMove, false);
    el.setAttribute('raycaster', 'useWorldCoordinates', true);
    this.updateCanvasBounds();
  },

  onMouseMove: (function () {
    var direction = new THREE.Vector3();
    var mouse = new THREE.Vector2();
    var origin = new THREE.Vector3();
    var rayCasterConfig = {origin: origin, direction: direction};

    return function (evt) {
      var bounds = this.canvasBounds;
      var camera = this.el.sceneEl.camera;
      var left;
      var point;
      var top;

      camera.parent.updateMatrixWorld();

      // Calculate mouse position based on the canvas element
      if (evt.type === 'touchmove' || evt.type === 'touchstart') {
        // Track the first touch for simplicity.
        point = evt.touches.item(0);
      } else {
        point = evt;
      }

      left = point.clientX - bounds.left;
      top = point.clientY - bounds.top;
      mouse.x = (left / bounds.width) * 2 - 1;
      mouse.y = -(top / bounds.height) * 2 + 1;

      origin.setFromMatrixPosition(camera.matrixWorld);
      direction.set(mouse.x, mouse.y, 0.5).unproject(camera).sub(origin).normalize();
      this.el.setAttribute('raycaster', rayCasterConfig);
      if (evt.type === 'touchmove') { evt.preventDefault(); }
    };
  })(),

  /**
   * Trigger mousedown and keep track of the mousedowned entity.
   */
  onCursorDown: function (evt) {
    // Raycast again for touch.
    if (this.data.rayOrigin === 'mouse' && evt.type === 'touchstart') {
      this.onMouseMove(evt);
      this.el.components.raycaster.checkIntersections();
      evt.preventDefault();
    }

    this.twoWayEmit(EVENTS.MOUSEDOWN);
    this.cursorDownEl = this.intersectedEl;
  },

  /**
   * Trigger mouseup if:
   * - Not fusing (mobile has no mouse).
   * - Currently intersecting an entity.
   * - Currently-intersected entity is the same as the one when mousedown was triggered,
   *   in case user mousedowned one entity, dragged to another, and mouseupped.
   */
  onCursorUp: function (evt) {
    var data = this.data;
    this.twoWayEmit(EVENTS.MOUSEUP);

    // If intersected entity has changed since the cursorDown, still emit mouseUp on the
    // previously cursorUp entity.
    if (this.cursorDownEl && this.cursorDownEl !== this.intersectedEl) {
      this.intersectedEventDetail.intersection = null;
      this.cursorDownEl.emit(EVENTS.MOUSEUP, this.intersectedEventDetail);
    }

    if ((!data.fuse || data.rayOrigin === 'mouse') &&
        this.intersectedEl && this.cursorDownEl === this.intersectedEl) {
      this.twoWayEmit(EVENTS.CLICK);
    }

    this.cursorDownEl = null;
    if (evt.type === 'touchend') { evt.preventDefault(); }
  },

  /**
   * Handle intersection.
   */
  onIntersection: function (evt) {
    var currentIntersection;
    var cursorEl = this.el;
    var index;
    var intersectedEl;
    var intersection;

    // Select closest object, excluding the cursor.
    index = evt.detail.els[0] === cursorEl ? 1 : 0;
    intersection = evt.detail.intersections[index];
    intersectedEl = evt.detail.els[index];

    // If cursor is the only intersected object, ignore the event.
    if (!intersectedEl) { return; }

    // Already intersecting this entity.
    if (this.intersectedEl === intersectedEl) { return; }

    // Ignore events further away than active intersection.
    if (this.intersectedEl) {
      currentIntersection = this.el.components.raycaster.getIntersection(this.intersectedEl);
      if (currentIntersection && currentIntersection.distance <= intersection.distance) { return; }
    }

    // Unset current intersection.
    this.clearCurrentIntersection(true);

    this.setIntersection(intersectedEl, intersection);
  },

  /**
   * Handle intersection cleared.
   */
  onIntersectionCleared: function (evt) {
    var clearedEls = evt.detail.clearedEls;
    // Check if the current intersection has ended
    if (clearedEls.indexOf(this.intersectedEl) === -1) { return; }
    this.clearCurrentIntersection();
  },

  setIntersection: function (intersectedEl, intersection) {
    var cursorEl = this.el;
    var data = this.data;
    var self = this;

    // Already intersecting.
    if (this.intersectedEl === intersectedEl) { return; }

    // Set new intersection.
    this.intersectedEl = intersectedEl;

    // Hovering.
    cursorEl.addState(STATES.HOVERING);
    intersectedEl.addState(STATES.HOVERED);
    this.twoWayEmit(EVENTS.MOUSEENTER);

    if (this.data.mouseCursorStylesEnabled && this.data.rayOrigin === 'mouse') {
      this.el.sceneEl.canvas.classList.add(CANVAS_HOVER_CLASS);
    }

    // Begin fuse if necessary.
    if (data.fuseTimeout === 0 || !data.fuse) { return; }
    cursorEl.addState(STATES.FUSING);
    this.twoWayEmit(EVENTS.FUSING);
    this.fuseTimeout = setTimeout(function fuse () {
      cursorEl.removeState(STATES.FUSING);
      self.twoWayEmit(EVENTS.CLICK);
    }, data.fuseTimeout);
  },

  clearCurrentIntersection: function (ignoreRemaining) {
    var index;
    var intersection;
    var intersections;
    var cursorEl = this.el;

    // Nothing to be cleared.
    if (!this.intersectedEl) { return; }

    // No longer hovering (or fusing).
    this.intersectedEl.removeState(STATES.HOVERED);
    cursorEl.removeState(STATES.HOVERING);
    cursorEl.removeState(STATES.FUSING);
    this.twoWayEmit(EVENTS.MOUSELEAVE);

    if (this.data.mouseCursorStylesEnabled && this.data.rayOrigin === 'mouse') {
      this.el.sceneEl.canvas.classList.remove(CANVAS_HOVER_CLASS);
    }

    // Unset intersected entity (after emitting the event).
    this.intersectedEl = null;

    // Clear fuseTimeout.
    clearTimeout(this.fuseTimeout);

    // Set intersection to another raycasted element if any.
    if (ignoreRemaining === true) { return; }
    intersections = this.el.components.raycaster.intersections;
    if (intersections.length === 0) { return; }
    // Exclude the cursor.
    index = intersections[0].object.el === cursorEl ? 1 : 0;
    intersection = intersections[index];
    if (!intersection) { return; }
    this.setIntersection(intersection.object.el, intersection);
  },

  /**
   * Helper to emit on both the cursor and the intersected entity (if exists).
   */
  twoWayEmit: function (evtName) {
    var el = this.el;
    var intersectedEl = this.intersectedEl;
    var intersection;

    intersection = this.el.components.raycaster.getIntersection(intersectedEl);
    this.eventDetail.intersectedEl = intersectedEl;
    this.eventDetail.intersection = intersection;
    el.emit(evtName, this.eventDetail);

    if (!intersectedEl) { return; }

    this.intersectedEventDetail.intersection = intersection;
    intersectedEl.emit(evtName, this.intersectedEventDetail);
  }
});

},{"../core/component":101,"../utils/":174}],53:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;
var bind = _dereq_('../utils/bind');
var checkControllerPresentAndSetup = _dereq_('../utils/tracked-controls').checkControllerPresentAndSetup;
var trackedControlsUtils = _dereq_('../utils/tracked-controls');
var emitIfAxesChanged = trackedControlsUtils.emitIfAxesChanged;
var onButtonEvent = trackedControlsUtils.onButtonEvent;

var DAYDREAM_CONTROLLER_MODEL_BASE_URL = 'https://cdn.aframe.io/controllers/google/';
var DAYDREAM_CONTROLLER_MODEL_OBJ_URL = DAYDREAM_CONTROLLER_MODEL_BASE_URL + 'vr_controller_daydream.obj';
var DAYDREAM_CONTROLLER_MODEL_OBJ_MTL = DAYDREAM_CONTROLLER_MODEL_BASE_URL + 'vr_controller_daydream.mtl';

var GAMEPAD_ID_PREFIX = 'Daydream Controller';

/**
 * Daydream controls.
 * Interface with Daydream controller and map Gamepad events to
 * controller buttons: trackpad, menu, system
 * Load a controller model and highlight the pressed buttons.
 */
module.exports.Component = registerComponent('daydream-controls', {
  schema: {
    hand: {default: ''},  // This informs the degenerate arm model.
    buttonColor: {type: 'color', default: '#000000'},
    buttonTouchedColor: {type: 'color', default: '#777777'},
    buttonHighlightColor: {type: 'color', default: '#FFFFFF'},
    model: {default: true},
    orientationOffset: {type: 'vec3'},
    armModel: {default: true}
  },

  /**
   * Button IDs:
   * 0 - trackpad
   * 1 - menu (never dispatched on this layer)
   * 2 - system (never dispatched on this layer)
   */
  mapping: {
    axes: {trackpad: [0, 1]},
    buttons: ['trackpad', 'menu', 'system']
  },

  bindMethods: function () {
    this.onModelLoaded = bind(this.onModelLoaded, this);
    this.onControllersUpdate = bind(this.onControllersUpdate, this);
    this.checkIfControllerPresent = bind(this.checkIfControllerPresent, this);
    this.removeControllersUpdateListener = bind(this.removeControllersUpdateListener, this);
    this.onAxisMoved = bind(this.onAxisMoved, this);
  },

  init: function () {
    var self = this;
    this.animationActive = 'pointing';
    this.onButtonChanged = bind(this.onButtonChanged, this);
    this.onButtonDown = function (evt) { onButtonEvent(evt.detail.id, 'down', self); };
    this.onButtonUp = function (evt) { onButtonEvent(evt.detail.id, 'up', self); };
    this.onButtonTouchStart = function (evt) { onButtonEvent(evt.detail.id, 'touchstart', self); };
    this.onButtonTouchEnd = function (evt) { onButtonEvent(evt.detail.id, 'touchend', self); };
    this.onAxisMoved = bind(this.onAxisMoved, this);
    this.controllerPresent = false;
    this.lastControllerCheck = 0;
    this.bindMethods();
    this.checkControllerPresentAndSetup = checkControllerPresentAndSetup;  // To allow mock.
    this.emitIfAxesChanged = emitIfAxesChanged;  // To allow mock.
  },

  addEventListeners: function () {
    var el = this.el;
    el.addEventListener('buttonchanged', this.onButtonChanged);
    el.addEventListener('buttondown', this.onButtonDown);
    el.addEventListener('buttonup', this.onButtonUp);
    el.addEventListener('touchstart', this.onButtonTouchStart);
    el.addEventListener('touchend', this.onButtonTouchEnd);
    el.addEventListener('model-loaded', this.onModelLoaded);
    el.addEventListener('axismove', this.onAxisMoved);
    this.controllerEventsActive = true;
  },

  removeEventListeners: function () {
    var el = this.el;
    el.removeEventListener('buttonchanged', this.onButtonChanged);
    el.removeEventListener('buttondown', this.onButtonDown);
    el.removeEventListener('buttonup', this.onButtonUp);
    el.removeEventListener('touchstart', this.onButtonTouchStart);
    el.removeEventListener('touchend', this.onButtonTouchEnd);
    el.removeEventListener('model-loaded', this.onModelLoaded);
    el.removeEventListener('axismove', this.onAxisMoved);
    this.controllerEventsActive = false;
  },

  checkIfControllerPresent: function () {
    this.checkControllerPresentAndSetup(this, GAMEPAD_ID_PREFIX, {hand: this.data.hand});
  },

  play: function () {
    this.checkIfControllerPresent();
    this.addControllersUpdateListener();
  },

  pause: function () {
    this.removeEventListeners();
    this.removeControllersUpdateListener();
  },

  injectTrackedControls: function () {
    var el = this.el;
    var data = this.data;
    el.setAttribute('tracked-controls', {
      armModel: data.armModel,
      hand: data.hand,
      idPrefix: GAMEPAD_ID_PREFIX,
      orientationOffset: data.orientationOffset
    });
    if (!this.data.model) { return; }
    this.el.setAttribute('obj-model', {
      obj: DAYDREAM_CONTROLLER_MODEL_OBJ_URL,
      mtl: DAYDREAM_CONTROLLER_MODEL_OBJ_MTL
    });
  },

  addControllersUpdateListener: function () {
    this.el.sceneEl.addEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  removeControllersUpdateListener: function () {
    this.el.sceneEl.removeEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  onControllersUpdate: function () {
    this.checkIfControllerPresent();
  },

  onModelLoaded: function (evt) {
    var controllerObject3D = evt.detail.model;
    var buttonMeshes;
    if (!this.data.model) { return; }
    buttonMeshes = this.buttonMeshes = {};
    buttonMeshes.menu = controllerObject3D.getObjectByName('AppButton_AppButton_Cylinder.004');
    buttonMeshes.system = controllerObject3D.getObjectByName('HomeButton_HomeButton_Cylinder.005');
    buttonMeshes.trackpad = controllerObject3D.getObjectByName('TouchPad_TouchPad_Cylinder.003');
    // Offset pivot point.
    controllerObject3D.position.set(0, 0, -0.04);
  },

  onAxisMoved: function (evt) {
    this.emitIfAxesChanged(this, this.mapping.axes, evt);
  },

  onButtonChanged: function (evt) {
    var button = this.mapping.buttons[evt.detail.id];
    if (!button) return;
    // Pass along changed event with button state, using button mapping for convenience.
    this.el.emit(button + 'changed', evt.detail.state);
  },

  updateModel: function (buttonName, evtName) {
    if (!this.data.model) { return; }
    this.updateButtonModel(buttonName, evtName);
  },

  updateButtonModel: function (buttonName, state) {
    var buttonMeshes = this.buttonMeshes;
    if (!buttonMeshes || !buttonMeshes[buttonName]) { return; }
    var color;
    switch (state) {
      case 'down':
        color = this.data.buttonHighlightColor;
        break;
      case 'touchstart':
        color = this.data.buttonTouchedColor;
        break;
      default:
        color = this.data.buttonColor;
    }
    buttonMeshes[buttonName].material.color.set(color);
  }
});

},{"../core/component":101,"../utils/bind":168,"../utils/tracked-controls":182}],54:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;
var bind = _dereq_('../utils/bind');
var trackedControlsUtils = _dereq_('../utils/tracked-controls');
var checkControllerPresentAndSetup = trackedControlsUtils.checkControllerPresentAndSetup;
var emitIfAxesChanged = trackedControlsUtils.emitIfAxesChanged;
var onButtonEvent = trackedControlsUtils.onButtonEvent;

var GEARVR_CONTROLLER_MODEL_BASE_URL = 'https://cdn.aframe.io/controllers/samsung/';
var GEARVR_CONTROLLER_MODEL_OBJ_URL = GEARVR_CONTROLLER_MODEL_BASE_URL + 'gear_vr_controller.obj';
var GEARVR_CONTROLLER_MODEL_OBJ_MTL = GEARVR_CONTROLLER_MODEL_BASE_URL + 'gear_vr_controller.mtl';

var GAMEPAD_ID_PREFIX = 'Gear VR';

/**
 * Gear VR controls.
 * Interface with Gear VR controller and map Gamepad events to
 * controller buttons: trackpad, trigger
 * Load a controller model and highlight the pressed buttons.
 */
module.exports.Component = registerComponent('gearvr-controls', {
  schema: {
    hand: {default: ''},  // This informs the degenerate arm model.
    buttonColor: {type: 'color', default: '#000000'},
    buttonTouchedColor: {type: 'color', default: '#777777'},
    buttonHighlightColor: {type: 'color', default: '#FFFFFF'},
    model: {default: true},
    orientationOffset: {type: 'vec3'},
    armModel: {default: true}
  },

  /**
   * Button IDs:
   * 0 - trackpad
   * 1 - trigger
   */
  mapping: {
    axes: {trackpad: [0, 1]},
    buttons: ['trackpad', 'trigger']
  },

  bindMethods: function () {
    this.onModelLoaded = bind(this.onModelLoaded, this);
    this.onControllersUpdate = bind(this.onControllersUpdate, this);
    this.checkIfControllerPresent = bind(this.checkIfControllerPresent, this);
    this.removeControllersUpdateListener = bind(this.removeControllersUpdateListener, this);
    this.onAxisMoved = bind(this.onAxisMoved, this);
  },

  init: function () {
    var self = this;
    this.animationActive = 'pointing';
    this.onButtonChanged = bind(this.onButtonChanged, this);
    this.onButtonDown = function (evt) { onButtonEvent(evt.detail.id, 'down', self); };
    this.onButtonUp = function (evt) { onButtonEvent(evt.detail.id, 'up', self); };
    this.onButtonTouchStart = function (evt) { onButtonEvent(evt.detail.id, 'touchstart', self); };
    this.onButtonTouchEnd = function (evt) { onButtonEvent(evt.detail.id, 'touchend', self); };
    this.onAxisMoved = bind(this.onAxisMoved, this);
    this.controllerPresent = false;
    this.lastControllerCheck = 0;
    this.bindMethods();
    this.checkControllerPresentAndSetup = checkControllerPresentAndSetup;  // To allow mock.
    this.emitIfAxesChanged = emitIfAxesChanged;  // To allow mock.
  },

  addEventListeners: function () {
    var el = this.el;
    el.addEventListener('buttonchanged', this.onButtonChanged);
    el.addEventListener('buttondown', this.onButtonDown);
    el.addEventListener('buttonup', this.onButtonUp);
    el.addEventListener('touchstart', this.onButtonTouchStart);
    el.addEventListener('touchend', this.onButtonTouchEnd);
    el.addEventListener('model-loaded', this.onModelLoaded);
    el.addEventListener('axismove', this.onAxisMoved);
    this.controllerEventsActive = true;
  },

  removeEventListeners: function () {
    var el = this.el;
    el.removeEventListener('buttonchanged', this.onButtonChanged);
    el.removeEventListener('buttondown', this.onButtonDown);
    el.removeEventListener('buttonup', this.onButtonUp);
    el.removeEventListener('touchstart', this.onButtonTouchStart);
    el.removeEventListener('touchend', this.onButtonTouchEnd);
    el.removeEventListener('model-loaded', this.onModelLoaded);
    el.removeEventListener('axismove', this.onAxisMoved);
    this.controllerEventsActive = false;
  },

  checkIfControllerPresent: function () {
    this.checkControllerPresentAndSetup(this, GAMEPAD_ID_PREFIX,
                                        this.data.hand ? {hand: this.data.hand} : {});
  },

  play: function () {
    this.checkIfControllerPresent();
    this.addControllersUpdateListener();
  },

  pause: function () {
    this.removeEventListeners();
    this.removeControllersUpdateListener();
  },

  injectTrackedControls: function () {
    var el = this.el;
    var data = this.data;
    el.setAttribute('tracked-controls', {
      armModel: data.armModel,
      idPrefix: GAMEPAD_ID_PREFIX,
      orientationOffset: data.orientationOffset
    });
    if (!this.data.model) { return; }
    this.el.setAttribute('obj-model', {
      obj: GEARVR_CONTROLLER_MODEL_OBJ_URL,
      mtl: GEARVR_CONTROLLER_MODEL_OBJ_MTL
    });
  },

  addControllersUpdateListener: function () {
    this.el.sceneEl.addEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  removeControllersUpdateListener: function () {
    this.el.sceneEl.removeEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  onControllersUpdate: function () {
    this.checkIfControllerPresent();
  },

  // No need for onButtonChanged, since Gear VR controller has no analog buttons.

  onModelLoaded: function (evt) {
    var controllerObject3D = evt.detail.model;
    var buttonMeshes;
    if (!this.data.model) { return; }
    buttonMeshes = this.buttonMeshes = {};
    buttonMeshes.trigger = controllerObject3D.children[2];
    buttonMeshes.trackpad = controllerObject3D.children[1];
  },

  onButtonChanged: function (evt) {
    var button = this.mapping.buttons[evt.detail.id];
    if (!button) return;
    // Pass along changed event with button state, using button mapping for convenience.
    this.el.emit(button + 'changed', evt.detail.state);
  },

  onAxisMoved: function (evt) {
    this.emitIfAxesChanged(this, this.mapping.axes, evt);
  },

  updateModel: function (buttonName, evtName) {
    if (!this.data.model) { return; }
    this.updateButtonModel(buttonName, evtName);
  },

  updateButtonModel: function (buttonName, state) {
    var buttonMeshes = this.buttonMeshes;
    if (!buttonMeshes || !buttonMeshes[buttonName]) { return; }
    var color;
    switch (state) {
      case 'down':
        color = this.data.buttonHighlightColor;
        break;
      case 'touchstart':
        color = this.data.buttonTouchedColor;
        break;
      default:
        color = this.data.buttonColor;
    }
    buttonMeshes[buttonName].material.color.set(color);
  }
});

},{"../core/component":101,"../utils/bind":168,"../utils/tracked-controls":182}],55:[function(_dereq_,module,exports){
var geometries = _dereq_('../core/geometry').geometries;
var geometryNames = _dereq_('../core/geometry').geometryNames;
var registerComponent = _dereq_('../core/component').registerComponent;
var THREE = _dereq_('../lib/three');

var dummyGeometry = new THREE.Geometry();

/**
 * Geometry component. Combined with material component to make a mesh in 3D object.
 * Extended with registered geometries.
 */
module.exports.Component = registerComponent('geometry', {
  schema: {
    buffer: {default: true},
    primitive: {default: 'box', oneOf: geometryNames, schemaChange: true},
    skipCache: {default: false}
  },

  init: function () {
    this.geometry = null;
  },

  /**
   * Talk to geometry system to get or create geometry.
   */
  update: function (previousData) {
    var data = this.data;
    var el = this.el;
    var mesh;
    var system = this.system;

    // Dispose old geometry if we created one.
    if (this.geometry) {
      system.unuseGeometry(previousData);
      this.geometry = null;
    }

    // Create new geometry.
    this.geometry = system.getOrCreateGeometry(data);

    // Set on mesh. If mesh does not exist, create it.
    mesh = el.getObject3D('mesh');
    if (mesh) {
      mesh.geometry = this.geometry;
    } else {
      mesh = new THREE.Mesh();
      mesh.geometry = this.geometry;
      el.setObject3D('mesh', mesh);
    }
  },

  /**
   * Tell geometry system that entity is no longer using the geometry.
   * Unset the geometry on the mesh
   */
  remove: function () {
    this.system.unuseGeometry(this.data);
    this.el.getObject3D('mesh').geometry = dummyGeometry;
    this.geometry = null;
  },

  /**
   * Update geometry component schema based on geometry type.
   */
  updateSchema: function (data) {
    var currentGeometryType = this.oldData && this.oldData.primitive;
    var newGeometryType = data.primitive;
    var schema = geometries[newGeometryType] && geometries[newGeometryType].schema;

    // Geometry has no schema.
    if (!schema) { throw new Error('Unknown geometry schema `' + newGeometryType + '`'); }
    // Nothing has changed.
    if (currentGeometryType && currentGeometryType === newGeometryType) { return; }

    this.extendSchema(schema);
  }
});

},{"../core/component":101,"../core/geometry":102,"../lib/three":149}],56:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;
var THREE = _dereq_('../lib/three');
var utils = _dereq_('../utils/');
var warn = utils.debug('components:gltf-model:warn');

/**
 * glTF model loader.
 */
module.exports.Component = registerComponent('gltf-model', {
  schema: {type: 'model'},

  init: function () {
    var dracoLoader = this.system.getDRACOLoader();
    this.model = null;
    this.loader = new THREE.GLTFLoader();
    if (dracoLoader) {
      this.loader.setDRACOLoader(dracoLoader);
    }
  },

  update: function () {
    var self = this;
    var el = this.el;
    var src = this.data;

    if (!src) { return; }

    this.remove();

    this.loader.load(src, function gltfLoaded (gltfModel) {
      self.model = gltfModel.scene || gltfModel.scenes[0];
      self.model.animations = gltfModel.animations;
      el.setObject3D('mesh', self.model);
      el.emit('model-loaded', {format: 'gltf', model: self.model});
    }, undefined /* onProgress */, function gltfFailed (error) {
      var message = (error && error.message) ? error.message : 'Failed to load glTF model';
      warn(message);
      el.emit('model-error', {format: 'gltf', src: src});
    });
  },

  remove: function () {
    if (!this.model) { return; }
    this.el.removeObject3D('mesh');
  }
});

},{"../core/component":101,"../lib/three":149,"../utils/":174}],57:[function(_dereq_,module,exports){
/* global THREE */
var registerComponent = _dereq_('../core/component').registerComponent;

// Found at https://github.com/aframevr/assets.
var MODEL_URLS = {
  left: 'https://cdn.aframe.io/controllers/oculus-hands/v2/leftHand.json',
  right: 'https://cdn.aframe.io/controllers/oculus-hands/v2/rightHand.json'
};

// Poses.
var ANIMATIONS = {
  open: 'Open',
  // point: grip active, trackpad surface active, trigger inactive.
  point: 'Point',
  // pointThumb: grip active, trigger inactive, trackpad surface inactive.
  pointThumb: 'Point + Thumb',
  // fist: grip active, trigger active, trackpad surface active.
  fist: 'Fist',
  // hold: trigger active, grip inactive.
  hold: 'Hold',
  // thumbUp: grip active, trigger active, trackpad surface inactive.
  thumbUp: 'Thumb Up'
};

// Map animation to public events for the API.
var EVENTS = {};
EVENTS[ANIMATIONS.fist] = 'grip';
EVENTS[ANIMATIONS.thumbUp] = 'pistol';
EVENTS[ANIMATIONS.point] = 'pointing';
EVENTS[ANIMATIONS.thumb] = 'thumb';

/**
 * Hand controls component that abstracts 6DoF controls:
 *   oculus-touch-controls, vive-controls, windows-motion-controls.
 *
 * Originally meant to be a sample implementation of applications-specific controls that
 * abstracts multiple types of controllers.
 *
 * Auto-detect appropriate controller.
 * Handle common events coming from the detected vendor-specific controls.
 * Translate button events to semantic hand-related event names:
 *   (gripclose, gripopen, thumbup, thumbdown, pointup, pointdown)
 * Load hand model with gestures that are applied based on the button pressed.
 *
 * @property {string} Hand mapping (`left`, `right`).
 */
module.exports.Component = registerComponent('hand-controls', {
  schema: {default: 'left'},

  init: function () {
    var self = this;
    var el = this.el;
    // Current pose.
    this.gesture = ANIMATIONS.open;
    // Active buttons populated by events provided by the attached controls.
    this.pressedButtons = {};
    this.touchedButtons = {};
    this.loader = new THREE.ObjectLoader();
    this.loader.setCrossOrigin('anonymous');

    this.onGripDown = function () { self.handleButton('grip', 'down'); };
    this.onGripUp = function () { self.handleButton('grip', 'up'); };
    this.onTrackpadDown = function () { self.handleButton('trackpad', 'down'); };
    this.onTrackpadUp = function () { self.handleButton('trackpad', 'up'); };
    this.onTrackpadTouchStart = function () { self.handleButton('trackpad', 'touchstart'); };
    this.onTrackpadTouchEnd = function () { self.handleButton('trackpad', 'touchend'); };
    this.onTriggerDown = function () { self.handleButton('trigger', 'down'); };
    this.onTriggerUp = function () { self.handleButton('trigger', 'up'); };
    this.onTriggerTouchStart = function () { self.handleButton('trigger', 'touchstart'); };
    this.onTriggerTouchEnd = function () { self.handleButton('trigger', 'touchend'); };
    this.onGripTouchStart = function () { self.handleButton('grip', 'touchstart'); };
    this.onGripTouchEnd = function () { self.handleButton('grip', 'touchend'); };
    this.onThumbstickDown = function () { self.handleButton('thumbstick', 'down'); };
    this.onThumbstickUp = function () { self.handleButton('thumbstick', 'up'); };
    this.onAorXTouchStart = function () { self.handleButton('AorX', 'touchstart'); };
    this.onAorXTouchEnd = function () { self.handleButton('AorX', 'touchend'); };
    this.onBorYTouchStart = function () { self.handleButton('BorY', 'touchstart'); };
    this.onBorYTouchEnd = function () { self.handleButton('BorY', 'touchend'); };
    this.onSurfaceTouchStart = function () { self.handleButton('surface', 'touchstart'); };
    this.onSurfaceTouchEnd = function () { self.handleButton('surface', 'touchend'); };

    el.addEventListener('controllerconnected', this.onControllerConnected);
    el.addEventListener('controllerdisconnected', this.onControllerDisconnected);

    // Hidden by default.
    el.object3D.visible = false;
  },

  play: function () {
    this.addEventListeners();
  },

  pause: function () {
    this.removeEventListeners();
  },

  tick: function (time, delta) {
    var mesh = this.el.getObject3D('mesh');

    if (!mesh || !mesh.mixer) { return; }

    mesh.mixer.update(delta / 1000);
  },

  addEventListeners: function () {
    var el = this.el;
    el.addEventListener('gripdown', this.onGripDown);
    el.addEventListener('gripup', this.onGripUp);
    el.addEventListener('trackpaddown', this.onTrackpadDown);
    el.addEventListener('trackpadup', this.onTrackpadUp);
    el.addEventListener('trackpadtouchstart', this.onTrackpadTouchStart);
    el.addEventListener('trackpadtouchend', this.onTrackpadTouchEnd);
    el.addEventListener('triggerdown', this.onTriggerDown);
    el.addEventListener('triggerup', this.onTriggerUp);
    el.addEventListener('triggertouchstart', this.onTriggerTouchStart);
    el.addEventListener('triggertouchend', this.onTriggerTouchEnd);
    el.addEventListener('griptouchstart', this.onGripTouchStart);
    el.addEventListener('griptouchend', this.onGripTouchEnd);
    el.addEventListener('thumbstickdown', this.onThumbstickDown);
    el.addEventListener('thumbstickup', this.onThumbstickUp);
    el.addEventListener('abuttontouchstart', this.onAorXTouchStart);
    el.addEventListener('abuttontouchend', this.onAorXTouchEnd);
    el.addEventListener('bbuttontouchstart', this.onBorYTouchStart);
    el.addEventListener('bbuttontouchend', this.onBorYTouchEnd);
    el.addEventListener('xbuttontouchstart', this.onAorXTouchStart);
    el.addEventListener('xbuttontouchend', this.onAorXTouchEnd);
    el.addEventListener('ybuttontouchstart', this.onBorYTouchStart);
    el.addEventListener('ybuttontouchend', this.onBorYTouchEnd);
    el.addEventListener('surfacetouchstart', this.onSurfaceTouchStart);
    el.addEventListener('surfacetouchend', this.onSurfaceTouchEnd);
  },

  removeEventListeners: function () {
    var el = this.el;
    el.removeEventListener('gripdown', this.onGripDown);
    el.removeEventListener('gripup', this.onGripUp);
    el.removeEventListener('trackpaddown', this.onTrackpadDown);
    el.removeEventListener('trackpadup', this.onTrackpadUp);
    el.removeEventListener('trackpadtouchstart', this.onTrackpadTouchStart);
    el.removeEventListener('trackpadtouchend', this.onTrackpadTouchEnd);
    el.removeEventListener('triggerdown', this.onTriggerDown);
    el.removeEventListener('triggerup', this.onTriggerUp);
    el.removeEventListener('triggertouchstart', this.onTriggerTouchStart);
    el.removeEventListener('triggertouchend', this.onTriggerTouchEnd);
    el.removeEventListener('griptouchstart', this.onGripTouchStart);
    el.removeEventListener('griptouchend', this.onGripTouchEnd);
    el.removeEventListener('thumbstickdown', this.onThumbstickDown);
    el.removeEventListener('thumbstickup', this.onThumbstickUp);
    el.removeEventListener('abuttontouchstart', this.onAorXTouchStart);
    el.removeEventListener('abuttontouchend', this.onAorXTouchEnd);
    el.removeEventListener('bbuttontouchstart', this.onBorYTouchStart);
    el.removeEventListener('bbuttontouchend', this.onBorYTouchEnd);
    el.removeEventListener('xbuttontouchstart', this.onAorXTouchStart);
    el.removeEventListener('xbuttontouchend', this.onAorXTouchEnd);
    el.removeEventListener('ybuttontouchstart', this.onBorYTouchStart);
    el.removeEventListener('ybuttontouchend', this.onBorYTouchEnd);
    el.removeEventListener('surfacetouchstart', this.onSurfaceTouchStart);
    el.removeEventListener('surfacetouchend', this.onSurfaceTouchEnd);
  },

  /**
   * Update handler. More like the `init` handler since the only property is the hand, and
   * that won't be changing much.
   */
  update: function (previousHand) {
    var controlConfiguration;
    var el = this.el;
    var hand = this.data;

    // Get common configuration to abstract different vendor controls.
    controlConfiguration = {
      hand: hand,
      model: false,
      orientationOffset: {x: 0, y: 0, z: hand === 'left' ? 90 : -90}
    };

    // Set model.
    if (hand !== previousHand) {
      this.loader.load(MODEL_URLS[hand], function (scene) {
        var mesh = scene.getObjectByName('Hand');
        mesh.material.skinning = true;
        mesh.mixer = new THREE.AnimationMixer(mesh);
        el.setObject3D('mesh', mesh);
        mesh.position.set(0, 0, 0);
        mesh.rotation.set(0, 0, 0);
        el.setAttribute('vive-controls', controlConfiguration);
        el.setAttribute('oculus-touch-controls', controlConfiguration);
        el.setAttribute('windows-motion-controls', controlConfiguration);
      });
    }
  },

  remove: function () {
    this.el.removeObject3D('mesh');
  },

  /**
   * Play model animation, based on which button was pressed and which kind of event.
   *
   * 1. Process buttons.
   * 2. Determine gesture (this.determineGesture()).
   * 3. Animation gesture (this.animationGesture()).
   * 4. Emit gesture events (this.emitGestureEvents()).
   *
   * @param {string} button - Name of the button.
   * @param {string} evt - Type of event for the button (i.e., down/up/touchstart/touchend).
   */
  handleButton: function (button, evt) {
    var lastGesture;
    var isPressed = evt === 'down';
    var isTouched = evt === 'touchstart';

    // Update objects.
    if (evt.indexOf('touch') === 0) {
      // Update touch object.
      if (isTouched === this.touchedButtons[button]) { return; }
      this.touchedButtons[button] = isTouched;
    } else {
      // Update button object.
      if (isPressed === this.pressedButtons[button]) { return; }
      this.pressedButtons[button] = isPressed;
    }

    // Determine the gesture.
    lastGesture = this.gesture;
    this.gesture = this.determineGesture();

    // Same gesture.
    if (this.gesture === lastGesture) { return; }

    // Animate gesture.
    this.animateGesture(this.gesture, lastGesture);

    // Emit events.
    this.emitGestureEvents(this.gesture, lastGesture);
  },

  /**
   * Determine which pose hand should be in considering active and touched buttons.
   */
  determineGesture: function () {
    var gesture;
    var isGripActive = this.pressedButtons['grip'];
    var isSurfaceActive = this.pressedButtons['surface'] || this.touchedButtons['surface'];
    var isTrackpadActive = this.pressedButtons['trackpad'] || this.touchedButtons['trackpad'];
    var isTriggerActive = this.pressedButtons['trigger'] || this.touchedButtons['trigger'];
    var isABXYActive = this.touchedButtons['AorX'] || this.touchedButtons['BorY'];
    var isVive = isViveController(this.el.components['tracked-controls']);

    // Works well with Oculus Touch and Windows Motion Controls, but Vive needs tweaks.
    if (isGripActive) {
      if (isVive) {
        gesture = ANIMATIONS.fist;
      } else
        if (isSurfaceActive || isABXYActive || isTrackpadActive) {
          gesture = isTriggerActive ? ANIMATIONS.fist : ANIMATIONS.point;
        } else {
          gesture = isTriggerActive ? ANIMATIONS.thumbUp : ANIMATIONS.pointThumb;
        }
    } else {
      if (isTriggerActive) {
        gesture = !isVive ? ANIMATIONS.hold : ANIMATIONS.fist;
      } else if (isVive && isTrackpadActive) {
        gesture = ANIMATIONS.point;
      }
    }

    return gesture;
  },

  /**
   * Play gesture animation.
   *
   * @param {string} gesture - Which pose to animate to. If absent, then animate to open.
   * @param {string} lastGesture - Previous gesture, to reverse back to open if needed.
   */
  animateGesture: function (gesture, lastGesture) {
    if (gesture) {
      this.playAnimation(gesture || ANIMATIONS.open, lastGesture, false);
      return;
    }
    // If no gesture, then reverse the current gesture back to open pose.
    this.playAnimation(lastGesture, lastGesture, true);
  },

  /**
   * Emit `hand-controls`-specific events.
   */
  emitGestureEvents: function (gesture, lastGesture) {
    var el = this.el;
    var eventName;

    if (lastGesture === gesture) { return; }

    // Emit event for lastGesture not inactive.
    eventName = getGestureEventName(lastGesture, false);
    if (eventName) { el.emit(eventName); }

    // Emit event for current gesture now active.
    eventName = getGestureEventName(gesture, true);
    if (eventName) { el.emit(eventName); }
  },

/**
  * Play hand animation based on button state.
  *
  * @param {string} gesture - Name of the animation as specified by the model.
  * @param {string} lastGesture - Previous pose.
  * @param {boolean} reverse - Whether animation should play in reverse.
  */
  playAnimation: function (gesture, lastGesture, reverse) {
    var fromAction;
    var mesh = this.el.getObject3D('mesh');
    var toAction;

    if (!mesh) { return; }

    // Grab clip action.
    toAction = mesh.mixer.clipAction(gesture);
    toAction.clampWhenFinished = true;
    toAction.loop = THREE.LoopRepeat;
    toAction.repetitions = 0;
    toAction.timeScale = reverse ? -1 : 1;
    toAction.weight = 1;

    // No gesture to gesture or gesture to no gesture.
    if (!lastGesture || gesture === lastGesture) {
      // Stop all current animations.
      mesh.mixer.stopAllAction();

      // Play animation.
      toAction.play();
      return;
    }

    // Animate or crossfade from gesture to gesture.
    fromAction = mesh.mixer.clipAction(lastGesture);
    mesh.mixer.stopAllAction();
    fromAction.weight = 0.15;
    fromAction.play();
    toAction.play();
    fromAction.crossFadeTo(toAction, 0.15, true);
  }
});

/**
 * Suffix gestures based on toggle state (e.g., open/close, up/down, start/end).
 *
 * @param {string} gesture
 * @param {boolean} active
 */
function getGestureEventName (gesture, active) {
  var eventName;

  if (!gesture) { return; }

  eventName = EVENTS[gesture];
  if (eventName === 'grip') {
    return eventName + (active ? 'close' : 'open');
  }
  if (eventName === 'point' || eventName === 'thumb') {
    return eventName + (active ? 'up' : 'down');
  }
  if (eventName === 'pointing' || eventName === 'pistol') {
    return eventName + (active ? 'start' : 'end');
  }
  return;
}

function isViveController (trackedControls) {
  var controllerId = trackedControls && trackedControls.controller &&
                     trackedControls.controller.id;
  return controllerId && controllerId.indexOf('OpenVR ') === 0;
}

},{"../core/component":101}],58:[function(_dereq_,module,exports){
_dereq_('./animation');
_dereq_('./camera');
_dereq_('./cursor');
_dereq_('./daydream-controls');
_dereq_('./gearvr-controls');
_dereq_('./geometry');
_dereq_('./gltf-model');
_dereq_('./hand-controls');
_dereq_('./laser-controls');
_dereq_('./light');
_dereq_('./line');
_dereq_('./link');
_dereq_('./look-controls');
_dereq_('./material');
_dereq_('./obj-model');
_dereq_('./oculus-go-controls');
_dereq_('./oculus-touch-controls');
_dereq_('./position');
_dereq_('./raycaster');
_dereq_('./rotation');
_dereq_('./scale');
_dereq_('./shadow');
_dereq_('./sound');
_dereq_('./text');
_dereq_('./tracked-controls');
_dereq_('./tracked-controls-webvr');
_dereq_('./tracked-controls-webxr');
_dereq_('./visible');
_dereq_('./vive-controls');
_dereq_('./vive-focus-controls');
_dereq_('./wasd-controls');
_dereq_('./windows-motion-controls');

_dereq_('./scene/background');
_dereq_('./scene/debug');
_dereq_('./scene/embedded');
_dereq_('./scene/inspector');
_dereq_('./scene/fog');
_dereq_('./scene/keyboard-shortcuts');
_dereq_('./scene/pool');
_dereq_('./scene/screenshot');
_dereq_('./scene/stats');
_dereq_('./scene/vr-mode-ui');

},{"./animation":50,"./camera":51,"./cursor":52,"./daydream-controls":53,"./gearvr-controls":54,"./geometry":55,"./gltf-model":56,"./hand-controls":57,"./laser-controls":59,"./light":60,"./line":61,"./link":62,"./look-controls":63,"./material":64,"./obj-model":65,"./oculus-go-controls":66,"./oculus-touch-controls":67,"./position":68,"./raycaster":69,"./rotation":70,"./scale":71,"./scene/background":72,"./scene/debug":73,"./scene/embedded":74,"./scene/fog":75,"./scene/inspector":76,"./scene/keyboard-shortcuts":77,"./scene/pool":78,"./scene/screenshot":79,"./scene/stats":80,"./scene/vr-mode-ui":81,"./shadow":82,"./sound":83,"./text":84,"./tracked-controls":87,"./tracked-controls-webvr":85,"./tracked-controls-webxr":86,"./visible":88,"./vive-controls":89,"./vive-focus-controls":90,"./wasd-controls":91,"./windows-motion-controls":92}],59:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;
var utils = _dereq_('../utils/');

registerComponent('laser-controls', {
  schema: {
    hand: {default: 'right'},
    model: {default: true},
    defaultModelColor: {type: 'color', default: 'grey'}
  },

  init: function () {
    var config = this.config;
    var data = this.data;
    var el = this.el;
    var self = this;
    var modelEnabled = this.data.model && !this.el.sceneEl.hasWebXR;
    var controlsConfiguration = {hand: data.hand, model: modelEnabled};

    // Set all controller models.
    el.setAttribute('daydream-controls', controlsConfiguration);
    el.setAttribute('gearvr-controls', controlsConfiguration);
    el.setAttribute('oculus-go-controls', controlsConfiguration);
    el.setAttribute('oculus-touch-controls', controlsConfiguration);
    el.setAttribute('vive-controls', controlsConfiguration);
    el.setAttribute('vive-focus-controls', controlsConfiguration);
    el.setAttribute('windows-motion-controls', controlsConfiguration);

    // WebXR doesn't allow to discriminate between controllers, a default model is used.
    if (this.data.model && this.el.sceneEl.hasWebXR) { this.initDefaultModel(); }

    // Wait for controller to connect, or have a valid pointing pose, before creating ray
    el.addEventListener('controllerconnected', createRay);
    el.addEventListener('controllerdisconnected', hideRay);
    el.addEventListener('controllermodelready', function (evt) {
      createRay(evt);
      self.modelReady = true;
    });

    function createRay (evt) {
      var controllerConfig = config[evt.detail.name];

      if (!controllerConfig) { return; }

      // Show the line unless a particular config opts to hide it, until a controllermodelready
      // event comes through.
      var raycasterConfig = utils.extend({
        showLine: true
      }, controllerConfig.raycaster || {});

      // The controllermodelready event contains a rayOrigin that takes into account
      // offsets specific to the loaded model.
      if (evt.detail.rayOrigin) {
        raycasterConfig.origin = evt.detail.rayOrigin.origin;
        raycasterConfig.direction = evt.detail.rayOrigin.direction;
        raycasterConfig.showLine = true;
      }

      // Only apply a default raycaster if it does not yet exist. This prevents it overwriting
      // config applied from a controllermodelready event.
      if (evt.detail.rayOrigin || !self.modelReady) {
        el.setAttribute('raycaster', raycasterConfig);
      } else {
        el.setAttribute('raycaster', 'showLine', true);
      }

      el.setAttribute('cursor', utils.extend({
        fuse: false
      }, controllerConfig.cursor));
    }

    function hideRay () {
      el.setAttribute('raycaster', 'showLine', false);
    }
  },

  config: {
    'daydream-controls': {
      cursor: {downEvents: ['trackpaddown', 'triggerdown'], upEvents: ['trackpadup', 'triggerup']}
    },

    'gearvr-controls': {
      cursor: {downEvents: ['triggerdown'], upEvents: ['triggerup']},
      raycaster: {origin: {x: 0, y: 0.0005, z: 0}}
    },

    'oculus-go-controls': {
      cursor: {downEvents: ['triggerdown'], upEvents: ['triggerup']},
      raycaster: {origin: {x: 0, y: 0.0005, z: 0}}
    },

    'oculus-touch-controls': {
      cursor: {downEvents: ['triggerdown'], upEvents: ['triggerup']},
      raycaster: {origin: {x: 0, y: 0, z: 0}}
    },

    'vive-controls': {
      cursor: {downEvents: ['triggerdown'], upEvents: ['triggerup']}
    },

    'vive-focus-controls': {
      cursor: {downEvents: ['trackpaddown', 'triggerdown'], upEvents: ['trackpadup', 'triggerup']}
    },

    'windows-motion-controls': {
      cursor: {downEvents: ['triggerdown'], upEvents: ['triggerup']},
      raycaster: {showLine: false}
    }
  },

  initDefaultModel: function () {
    var modelEl = this.modelEl = document.createElement('a-entity');
    modelEl.setAttribute('geometry', {
      primitive: 'sphere',
      radius: 0.03
    });
    modelEl.setAttribute('material', {color: this.data.color});
    this.el.appendChild(modelEl);
  }
});

},{"../core/component":101,"../utils/":174}],60:[function(_dereq_,module,exports){
var bind = _dereq_('../utils/bind');
var diff = _dereq_('../utils').diff;
var debug = _dereq_('../utils/debug');
var registerComponent = _dereq_('../core/component').registerComponent;
var THREE = _dereq_('../lib/three');

var degToRad = THREE.Math.degToRad;
var warn = debug('components:light:warn');

/**
 * Light component.
 */
module.exports.Component = registerComponent('light', {
  schema: {
    angle: {default: 60, if: {type: ['spot']}},
    color: {type: 'color'},
    groundColor: {type: 'color', if: {type: ['hemisphere']}},
    decay: {default: 1, if: {type: ['point', 'spot']}},
    distance: {default: 0.0, min: 0, if: {type: ['point', 'spot']}},
    intensity: {default: 1.0, min: 0, if: {type: ['ambient', 'directional', 'hemisphere', 'point', 'spot']}},
    penumbra: {default: 0, min: 0, max: 1, if: {type: ['spot']}},
    type: {
      default: 'directional',
      oneOf: ['ambient', 'directional', 'hemisphere', 'point', 'spot'],
      schemaChange: true
    },
    target: {type: 'selector', if: {type: ['spot', 'directional']}},

    // Shadows.
    castShadow: {default: false, if: {type: ['point', 'spot', 'directional']}},
    shadowBias: {default: 0, if: {castShadow: true}},
    shadowCameraFar: {default: 500, if: {castShadow: true}},
    shadowCameraFov: {default: 90, if: {castShadow: true}},
    shadowCameraNear: {default: 0.5, if: {castShadow: true}},
    shadowCameraTop: {default: 5, if: {castShadow: true}},
    shadowCameraRight: {default: 5, if: {castShadow: true}},
    shadowCameraBottom: {default: -5, if: {castShadow: true}},
    shadowCameraLeft: {default: -5, if: {castShadow: true}},
    shadowCameraVisible: {default: false, if: {castShadow: true}},
    shadowMapHeight: {default: 512, if: {castShadow: true}},
    shadowMapWidth: {default: 512, if: {castShadow: true}},
    shadowRadius: {default: 1, if: {castShadow: true}}
  },

  /**
   * Notifies scene a light has been added to remove default lighting.
   */
  init: function () {
    var el = this.el;
    this.light = null;
    this.defaultTarget = null;
    this.rendererSystem = this.el.sceneEl.systems.renderer;
    this.system.registerLight(el);
  },

  /**
   * (Re)create or update light.
   */
  update: function (oldData) {
    var data = this.data;
    var diffData = diff(data, oldData);
    var light = this.light;
    var rendererSystem = this.rendererSystem;
    var self = this;

    // Existing light.
    if (light && !('type' in diffData)) {
      var shadowsLoaded = false;
      // Light type has not changed. Update light.
      Object.keys(diffData).forEach(function (key) {
        var value = data[key];

        switch (key) {
          case 'color': {
            light.color.set(value);
            rendererSystem.applyColorCorrection(light.color);
            break;
          }

          case 'groundColor': {
            light.groundColor.set(value);
            rendererSystem.applyColorCorrection(light.groundColor);
            break;
          }

          case 'angle': {
            light.angle = degToRad(value);
            break;
          }

          case 'target': {
            // Reset target if selector is null.
            if (value === null) {
              if (data.type === 'spot' || data.type === 'directional') {
                light.target = self.defaultTarget;
              }
            } else {
              // Target specified, set target to entity's `object3D` when it is loaded.
              if (value.hasLoaded) {
                self.onSetTarget(value, light);
              } else {
                value.addEventListener('loaded', bind(self.onSetTarget, self, value, light));
              }
            }
            break;
          }

          case 'castShadow':
          case 'shadowBias':
          case 'shadowCameraFar':
          case 'shadowCameraFov':
          case 'shadowCameraNear':
          case 'shadowCameraTop':
          case 'shadowCameraRight':
          case 'shadowCameraBottom':
          case 'shadowCameraLeft':
          case 'shadowCameraVisible':
          case 'shadowMapHeight':
          case 'shadowMapWidth':
          case 'shadowRadius':
            if (!shadowsLoaded) {
              self.updateShadow();
              shadowsLoaded = true;
            }
            break;

          default: {
            light[key] = value;
          }
        }
      });
      return;
    }

    // No light yet or light type has changed. Create and add light.
    this.setLight(this.data);
    this.updateShadow();
  },

  setLight: function (data) {
    var el = this.el;
    var newLight = this.getLight(data);
    if (newLight) {
      if (this.light) {
        el.removeObject3D('light');
      }

      this.light = newLight;
      this.light.el = el;
      el.setObject3D('light', this.light);

      // HACK solution for issue #1624
      if (data.type === 'spot' || data.type === 'directional' || data.type === 'hemisphere') {
        el.getObject3D('light').translateY(-1);
      }

      // set and position default lighttarget as a child to enable spotlight orientation
      if (data.type === 'spot') {
        el.setObject3D('light-target', this.defaultTarget);
        el.getObject3D('light-target').position.set(0, 0, -1);
      }
    }
  },

  /**
   * Updates shadow-related properties on the current light.
   */
  updateShadow: function () {
    var el = this.el;
    var data = this.data;
    var light = this.light;

    light.castShadow = data.castShadow;

    // Shadow camera helper.
    var cameraHelper = el.getObject3D('cameraHelper');
    if (data.shadowCameraVisible && !cameraHelper) {
      el.setObject3D('cameraHelper', new THREE.CameraHelper(light.shadow.camera));
    } else if (!data.shadowCameraVisible && cameraHelper) {
      el.removeObject3D('cameraHelper');
    }

    if (!data.castShadow) { return light; }

    // Shadow appearance.
    light.shadow.bias = data.shadowBias;
    light.shadow.radius = data.shadowRadius;
    light.shadow.mapSize.height = data.shadowMapHeight;
    light.shadow.mapSize.width = data.shadowMapWidth;

    // Shadow camera.
    light.shadow.camera.near = data.shadowCameraNear;
    light.shadow.camera.far = data.shadowCameraFar;
    if (light.shadow.camera instanceof THREE.OrthographicCamera) {
      light.shadow.camera.top = data.shadowCameraTop;
      light.shadow.camera.right = data.shadowCameraRight;
      light.shadow.camera.bottom = data.shadowCameraBottom;
      light.shadow.camera.left = data.shadowCameraLeft;
    } else {
      light.shadow.camera.fov = data.shadowCameraFov;
    }
    light.shadow.camera.updateProjectionMatrix();

    if (cameraHelper) { cameraHelper.update(); }
  },

  /**
   * Creates a new three.js light object given data object defining the light.
   *
   * @param {object} data
   */
  getLight: function (data) {
    var angle = data.angle;
    var color = new THREE.Color(data.color);
    this.rendererSystem.applyColorCorrection(color);
    color = color.getHex();
    var decay = data.decay;
    var distance = data.distance;
    var groundColor = new THREE.Color(data.groundColor);
    this.rendererSystem.applyColorCorrection(groundColor);
    groundColor = groundColor.getHex();
    var intensity = data.intensity;
    var type = data.type;
    var target = data.target;
    var light = null;

    switch (type.toLowerCase()) {
      case 'ambient': {
        return new THREE.AmbientLight(color, intensity);
      }

      case 'directional': {
        light = new THREE.DirectionalLight(color, intensity);
        this.defaultTarget = light.target;
        if (target) {
          if (target.hasLoaded) {
            this.onSetTarget(target, light);
          } else {
            target.addEventListener('loaded', bind(this.onSetTarget, this, target, light));
          }
        }
        return light;
      }

      case 'hemisphere': {
        return new THREE.HemisphereLight(color, groundColor, intensity);
      }

      case 'point': {
        return new THREE.PointLight(color, intensity, distance, decay);
      }

      case 'spot': {
        light = new THREE.SpotLight(color, intensity, distance, degToRad(angle), data.penumbra, decay);
        this.defaultTarget = light.target;
        if (target) {
          if (target.hasLoaded) {
            this.onSetTarget(target, light);
          } else {
            target.addEventListener('loaded', bind(this.onSetTarget, this, target, light));
          }
        }
        return light;
      }

      default: {
        warn('%s is not a valid light type. ' +
           'Choose from ambient, directional, hemisphere, point, spot.', type);
      }
    }
  },

  onSetTarget: function (targetEl, light) {
    light.target = targetEl.object3D;
  },

  /**
   * Remove light on remove (callback).
   */
  remove: function () {
    var el = this.el;
    el.removeObject3D('light');
    if (el.getObject3D('cameraHelper')) {
      el.removeObject3D('cameraHelper');
    }
  }
});

},{"../core/component":101,"../lib/three":149,"../utils":174,"../utils/bind":168,"../utils/debug":170}],61:[function(_dereq_,module,exports){
/* global THREE */
var registerComponent = _dereq_('../core/component').registerComponent;

module.exports.Component = registerComponent('line', {
  schema: {
    start: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    end: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    color: {type: 'color', default: '#74BEC1'},
    opacity: {type: 'number', default: 1},
    visible: {default: true}
  },

  multiple: true,

  init: function () {
    var data = this.data;
    var geometry;
    var material;
    this.rendererSystem = this.el.sceneEl.systems.renderer;
    material = this.material = new THREE.LineBasicMaterial({
      color: data.color,
      opacity: data.opacity,
      transparent: data.opacity < 1,
      visible: data.visible
    });
    geometry = this.geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(2 * 3), 3));

    this.rendererSystem.applyColorCorrection(material.color);
    this.line = new THREE.Line(geometry, material);
    this.el.setObject3D(this.attrName, this.line);
  },

  update: function (oldData) {
    var data = this.data;
    var geometry = this.geometry;
    var geoNeedsUpdate = false;
    var material = this.material;
    var positionArray = geometry.attributes.position.array;

    // Update geometry.
    if (!isEqualVec3(data.start, oldData.start)) {
      positionArray[0] = data.start.x;
      positionArray[1] = data.start.y;
      positionArray[2] = data.start.z;
      geoNeedsUpdate = true;
    }

    if (!isEqualVec3(data.end, oldData.end)) {
      positionArray[3] = data.end.x;
      positionArray[4] = data.end.y;
      positionArray[5] = data.end.z;
      geoNeedsUpdate = true;
    }

    if (geoNeedsUpdate) {
      geometry.attributes.position.needsUpdate = true;
      geometry.computeBoundingSphere();
    }

    material.color.setStyle(data.color);
    this.rendererSystem.applyColorCorrection(material.color);
    material.opacity = data.opacity;
    material.transparent = data.opacity < 1;
    material.visible = data.visible;
  },

  remove: function () {
    this.el.removeObject3D('line', this.line);
  }
});

function isEqualVec3 (a, b) {
  if (!a || !b) { return false; }
  return (a.x === b.x && a.y === b.y && a.z === b.z);
}

},{"../core/component":101}],62:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;
var registerShader = _dereq_('../core/shader').registerShader;
var THREE = _dereq_('../lib/three');

/**
 * Link component. Connect experiences and traverse between them in VR
 *
 * @member {object} hiddenEls - Store the hidden elements during peek mode.
 */
module.exports.Component = registerComponent('link', {
  schema: {
    backgroundColor: {default: 'red', type: 'color'},
    borderColor: {default: 'white', type: 'color'},
    highlighted: {default: false},
    highlightedColor: {default: '#24CAFF', type: 'color'},
    href: {default: ''},
    image: {type: 'asset'},
    on: {default: 'click'},
    peekMode: {default: false},
    title: {default: ''},
    titleColor: {default: 'white', type: 'color'},
    visualAspectEnabled: {default: false}
  },

  init: function () {
    this.navigate = this.navigate.bind(this);
    this.previousQuaternion = undefined;
    this.quaternionClone = new THREE.Quaternion();
    // Store hidden elements during peek mode so we can show them again later.
    this.hiddenEls = [];
  },

  update: function (oldData) {
    var data = this.data;
    var el = this.el;
    var backgroundColor;
    var strokeColor;

    if (!data.visualAspectEnabled) { return; }

    this.initVisualAspect();

    backgroundColor = data.highlighted ? data.highlightedColor : data.backgroundColor;
    strokeColor = data.highlighted ? data.highlightedColor : data.borderColor;
    el.setAttribute('material', 'backgroundColor', backgroundColor);
    el.setAttribute('material', 'strokeColor', strokeColor);

    if (data.on !== oldData.on) { this.updateEventListener(); }

    if (oldData.peekMode !== undefined &&
        data.peekMode !== oldData.peekMode) { this.updatePeekMode(); }

    if (!data.image || oldData.image === data.image) { return; }

    el.setAttribute('material', 'pano',
                    typeof data.image === 'string' ? data.image : data.image.src);
  },

  /*
   * Toggle all elements and full 360 preview of the linked page.
   */
  updatePeekMode: function () {
    var el = this.el;
    var sphereEl = this.sphereEl;
    if (this.data.peekMode) {
      this.hideAll();
      el.getObject3D('mesh').visible = false;
      sphereEl.setAttribute('visible', true);
    } else {
      this.showAll();
      el.getObject3D('mesh').visible = true;
      sphereEl.setAttribute('visible', false);
    }
  },

  play: function () {
    this.updateEventListener();
  },

  pause: function () {
    this.removeEventListener();
  },

  updateEventListener: function () {
    var el = this.el;
    if (!el.isPlaying) { return; }
    this.removeEventListener();
    el.addEventListener(this.data.on, this.navigate);
  },

  removeEventListener: function () {
    var on = this.data.on;
    if (!on) { return; }
    this.el.removeEventListener(on, this.navigate);
  },

  initVisualAspect: function () {
    var el = this.el;
    var semiSphereEl;
    var sphereEl;
    var textEl;

    if (!this.data.visualAspectEnabled || this.visualAspectInitialized) { return; }

    textEl = this.textEl = this.textEl || document.createElement('a-entity');
    sphereEl = this.sphereEl = this.sphereEl || document.createElement('a-entity');
    semiSphereEl = this.semiSphereEl = this.semiSphereEl || document.createElement('a-entity');

    // Set portal.
    el.setAttribute('geometry', {primitive: 'circle', radius: 1.0, segments: 64});
    el.setAttribute('material', {shader: 'portal', pano: this.data.image, side: 'double'});

    // Set text that displays the link title and URL.
    textEl.setAttribute('text', {
      color: this.data.titleColor,
      align: 'center',
      font: 'kelsonsans',
      value: this.data.title || this.data.href,
      width: 4
    });
    textEl.setAttribute('position', '0 1.5 0');
    el.appendChild(textEl);

    // Set sphere rendered when camera is close to portal to allow user to peek inside.
    semiSphereEl.setAttribute('geometry', {
      primitive: 'sphere',
      radius: 1.0,
      phiStart: 0,
      segmentsWidth: 64,
      segmentsHeight: 64,
      phiLength: 180,
      thetaStart: 0,
      thetaLength: 360
    });
    semiSphereEl.setAttribute('material', {
      shader: 'portal',
      borderEnabled: 0.0,
      pano: this.data.image,
      side: 'back'
    });
    semiSphereEl.setAttribute('rotation', '0 180 0');
    semiSphereEl.setAttribute('position', '0 0 0');
    semiSphereEl.setAttribute('visible', false);
    el.appendChild(semiSphereEl);

    // Set sphere rendered when camera is close to portal to allow user to peek inside.
    sphereEl.setAttribute('geometry', {
      primitive: 'sphere',
      radius: 10,
      segmentsWidth: 64,
      segmentsHeight: 64
    });
    sphereEl.setAttribute('material', {
      shader: 'portal',
      borderEnabled: 0.0,
      pano: this.data.image,
      side: 'back'
    });
    sphereEl.setAttribute('visible', false);
    el.appendChild(sphereEl);

    this.visualAspectInitialized = true;
  },

  navigate: function () {
    window.location = this.data.href;
  },

  /**
   * 1. Swap plane that represents portal with sphere with a hole when the camera is close
   * so user can peek inside portal. Sphere is rendered on oposite side of portal
   * from where user enters.
   * 2. Place the url/title above or inside portal depending on distance to camera.
   * 3. Face portal to camera when far away from user.
   */
  tick: (function () {
    var cameraWorldPosition = new THREE.Vector3();
    var elWorldPosition = new THREE.Vector3();
    var quaternion = new THREE.Quaternion();
    var scale = new THREE.Vector3();

    return function () {
      var el = this.el;
      var object3D = el.object3D;
      var camera = el.sceneEl.camera;
      var cameraPortalOrientation;
      var distance;
      var textEl = this.textEl;

      if (!this.data.visualAspectEnabled) { return; }

      // Update matrices
      object3D.updateMatrixWorld();
      camera.parent.updateMatrixWorld();
      camera.updateMatrixWorld();

      object3D.matrix.decompose(elWorldPosition, quaternion, scale);
      elWorldPosition.setFromMatrixPosition(object3D.matrixWorld);
      cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld);
      distance = elWorldPosition.distanceTo(cameraWorldPosition);

      if (distance > 20) {
        // Store original orientation to be restored when the portal stops facing the camera.
        if (!this.previousQuaternion) {
          this.quaternionClone.copy(quaternion);
          this.previousQuaternion = this.quaternionClone;
        }
        // If the portal is far away from the user, face portal to camera.
        object3D.lookAt(cameraWorldPosition);
      } else {
        // When portal is close to the user/camera.
        cameraPortalOrientation = this.calculateCameraPortalOrientation();
        // If user gets very close to portal, replace with holed sphere they can peek in.
        if (distance < 0.5) {
          // Configure text size and sphere orientation depending side user approaches portal.
          if (this.semiSphereEl.getAttribute('visible') === true) { return; }
          textEl.setAttribute('text', 'width', 1.5);
          if (cameraPortalOrientation <= 0.0) {
            textEl.setAttribute('position', '0 0 0.75');
            textEl.setAttribute('rotation', '0 180 0');
            this.semiSphereEl.setAttribute('rotation', '0 0 0');
          } else {
            textEl.setAttribute('position', '0 0 -0.75');
            textEl.setAttribute('rotation', '0 0 0');
            this.semiSphereEl.setAttribute('rotation', '0 180 0');
          }
          el.getObject3D('mesh').visible = false;
          this.semiSphereEl.setAttribute('visible', true);
          this.peekCameraPortalOrientation = cameraPortalOrientation;
        } else {
          // Calculate wich side the camera is approaching the camera (back / front).
          // Adjust text orientation based on camera position.
          if (cameraPortalOrientation <= 0.0) {
            textEl.setAttribute('rotation', '0 180 0');
          } else {
            textEl.setAttribute('rotation', '0 0 0');
          }
          textEl.setAttribute('text', 'width', 5);
          textEl.setAttribute('position', '0 1.5 0');
          el.getObject3D('mesh').visible = true;
          this.semiSphereEl.setAttribute('visible', false);
          this.peekCameraPortalOrientation = undefined;
        }
        if (this.previousQuaternion) {
          object3D.quaternion.copy(this.previousQuaternion);
          this.previousQuaternion = undefined;
        }
      }
    };
  })(),

  hideAll: function () {
    var el = this.el;
    var hiddenEls = this.hiddenEls;
    var self = this;
    if (hiddenEls.length > 0) { return; }
    el.sceneEl.object3D.traverse(function (object) {
      if (object && object.el && object.el.hasAttribute('link-controls')) { return; }
      if (!object.el || object === el.sceneEl.object3D || object.el === el ||
          object.el === self.sphereEl || object.el === el.sceneEl.cameraEl ||
          object.el.getAttribute('visible') === false || object.el === self.textEl ||
          object.el === self.semiSphereEl) {
        return;
      }
      object.el.setAttribute('visible', false);
      hiddenEls.push(object.el);
    });
  },

  showAll: function () {
    this.hiddenEls.forEach(function (el) { el.setAttribute('visible', true); });
    this.hiddenEls = [];
  },

  /**
   * Calculate whether the camera faces the front or back face of the portal.
   * @returns {number} > 0 if camera faces front of portal, < 0 if it faces back of portal.
   */
  calculateCameraPortalOrientation: (function () {
    var mat4 = new THREE.Matrix4();
    var cameraPosition = new THREE.Vector3();
    var portalNormal = new THREE.Vector3(0, 0, 1);
    var portalPosition = new THREE.Vector3(0, 0, 0);

    return function () {
      var el = this.el;
      var camera = el.sceneEl.camera;

      // Reset tmp variables.
      cameraPosition.set(0, 0, 0);
      portalNormal.set(0, 0, 1);
      portalPosition.set(0, 0, 0);

      // Apply portal orientation to the normal.
      el.object3D.matrixWorld.extractRotation(mat4);
      portalNormal.applyMatrix4(mat4);

      // Calculate portal world position.
      el.object3D.updateMatrixWorld();
      el.object3D.localToWorld(portalPosition);

      // Calculate camera world position.
      camera.parent.parent.updateMatrixWorld();
      camera.parent.updateMatrixWorld();
      camera.updateMatrixWorld();
      camera.localToWorld(cameraPosition);

      // Calculate vector from portal to camera.
      // (portal) -------> (camera)
      cameraPosition.sub(portalPosition).normalize();
      portalNormal.normalize();

      // Side where camera approaches portal is given by sign of dot product of portal normal
      // and portal to camera vectors.
      return Math.sign(portalNormal.dot(cameraPosition));
    };
  })(),

  remove: function () {
    this.removeEventListener();
  }
});

/* eslint-disable */
registerShader('portal', {
  schema: {
    borderEnabled: {default: 1.0, type: 'int', is: 'uniform'},
    backgroundColor: {default: 'red', type: 'color', is: 'uniform'},
    pano: {type: 'map', is: 'uniform'},
    strokeColor: {default: 'white', type: 'color', is: 'uniform'}
  },

  vertexShader: [
    'vec3 portalPosition;',
    'varying vec3 vWorldPosition;',
    'varying float vDistanceToCenter;',
    'varying float vDistance;',
    'void main() {',
    'vDistanceToCenter = clamp(length(position - vec3(0.0, 0.0, 0.0)), 0.0, 1.0);',
    'portalPosition = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;',
    'vDistance = length(portalPosition - cameraPosition);',
    'vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n'),

  fragmentShader: [
    '#define RECIPROCAL_PI2 0.15915494',
    'uniform sampler2D pano;',
    'uniform vec3 strokeColor;',
    'uniform vec3 backgroundColor;',
    'uniform float borderEnabled;',
    'varying float vDistanceToCenter;',
    'varying float vDistance;',
    'varying vec3 vWorldPosition;',
    'void main() {',
    'vec3 direction = normalize(vWorldPosition - cameraPosition);',
    'vec2 sampleUV;',
    'float borderThickness = clamp(exp(-vDistance / 50.0), 0.6, 0.95);',
    'sampleUV.y = saturate(direction.y * 0.5  + 0.5);',
    'sampleUV.x = atan(direction.z, -direction.x) * -RECIPROCAL_PI2 + 0.5;',
    'if (vDistanceToCenter > borderThickness && borderEnabled == 1.0) {',
    'gl_FragColor = vec4(strokeColor, 1.0);',
    '} else {',
    'gl_FragColor = mix(texture2D(pano, sampleUV), vec4(backgroundColor, 1.0), clamp(pow((vDistance / 15.0), 2.0), 0.0, 1.0));',
    '}',
    '}'
  ].join('\n')
});
/* eslint-enable */

},{"../core/component":101,"../core/shader":111,"../lib/three":149}],63:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;
var THREE = _dereq_('../lib/three');
var utils = _dereq_('../utils/');
var bind = utils.bind;
var PolyfillControls = _dereq_('../utils').device.PolyfillControls;

// To avoid recalculation at every mouse movement tick
var PI_2 = Math.PI / 2;

/**
 * look-controls. Update entity pose, factoring mouse, touch, and WebVR API data.
 */
module.exports.Component = registerComponent('look-controls', {
  dependencies: ['position', 'rotation'],

  schema: {
    enabled: {default: true},
    hmdEnabled: {default: true},
    pointerLockEnabled: {default: false},
    reverseMouseDrag: {default: false},
    reverseTouchDrag: {default: false},
    touchEnabled: {default: true}
  },

  init: function () {
    this.previousHMDPosition = new THREE.Vector3();
    this.hmdQuaternion = new THREE.Quaternion();
    this.hmdEuler = new THREE.Euler();
    this.position = new THREE.Vector3();
    // To save / restore camera pose
    this.savedRotation = new THREE.Vector3();
    this.savedPosition = new THREE.Vector3();
    this.polyfillObject = new THREE.Object3D();
    this.polyfillControls = new PolyfillControls(this.polyfillObject);
    this.rotation = {};
    this.deltaRotation = {};
    this.savedPose = null;
    this.pointerLocked = false;
    this.setupMouseControls();
    this.bindMethods();
    this.el.object3D.matrixAutoUpdate = false;

    this.savedPose = {
      position: new THREE.Vector3(),
      rotation: new THREE.Euler()
    };

    // Call enter VR handler if the scene has entered VR before the event listeners attached.
    if (this.el.sceneEl.is('vr-mode')) { this.onEnterVR(); }
  },

  update: function (oldData) {
    var data = this.data;

    // Disable grab cursor classes if no longer enabled.
    if (data.enabled !== oldData.enabled) {
      this.updateGrabCursor(data.enabled);
    }

    // Reset pitch and yaw if disabling HMD.
    if (oldData && !data.hmdEnabled && !oldData.hmdEnabled) {
      this.pitchObject.rotation.set(0, 0, 0);
      this.yawObject.rotation.set(0, 0, 0);
    }

    if (oldData && !data.pointerLockEnabled !== oldData.pointerLockEnabled) {
      this.removeEventListeners();
      this.addEventListeners();
      if (this.pointerLocked) { this.exitPointerLock(); }
    }
  },

  tick: function (t) {
    var data = this.data;
    if (!data.enabled) { return; }
    this.updateOrientation();
  },

  play: function () {
    this.addEventListeners();
  },

  pause: function () {
    this.removeEventListeners();
    if (this.pointerLocked) { this.exitPointerLock(); }
  },

  remove: function () {
    this.removeEventListeners();
    if (this.pointerLocked) { this.exitPointerLock(); }
  },

  bindMethods: function () {
    this.onMouseDown = bind(this.onMouseDown, this);
    this.onMouseMove = bind(this.onMouseMove, this);
    this.onMouseUp = bind(this.onMouseUp, this);
    this.onTouchStart = bind(this.onTouchStart, this);
    this.onTouchMove = bind(this.onTouchMove, this);
    this.onTouchEnd = bind(this.onTouchEnd, this);
    this.onEnterVR = bind(this.onEnterVR, this);
    this.onExitVR = bind(this.onExitVR, this);
    this.onPointerLockChange = bind(this.onPointerLockChange, this);
    this.onPointerLockError = bind(this.onPointerLockError, this);
  },

 /**
  * Set up states and Object3Ds needed to store rotation data.
  */
  setupMouseControls: function () {
    this.mouseDown = false;
    this.pitchObject = new THREE.Object3D();
    this.yawObject = new THREE.Object3D();
    this.yawObject.position.y = 10;
    this.yawObject.add(this.pitchObject);
  },

  /**
   * Add mouse and touch event listeners to canvas.
   */
  addEventListeners: function () {
    var sceneEl = this.el.sceneEl;
    var canvasEl = sceneEl.canvas;

    // Wait for canvas to load.
    if (!canvasEl) {
      sceneEl.addEventListener('render-target-loaded', bind(this.addEventListeners, this));
      return;
    }

    // Mouse events.
    canvasEl.addEventListener('mousedown', this.onMouseDown, false);
    window.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('mouseup', this.onMouseUp, false);

    // Touch events.
    canvasEl.addEventListener('touchstart', this.onTouchStart);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onTouchEnd);

    // sceneEl events.
    sceneEl.addEventListener('enter-vr', this.onEnterVR);
    sceneEl.addEventListener('exit-vr', this.onExitVR);

    // Pointer Lock events.
    if (this.data.pointerLockEnabled) {
      document.addEventListener('pointerlockchange', this.onPointerLockChange, false);
      document.addEventListener('mozpointerlockchange', this.onPointerLockChange, false);
      document.addEventListener('pointerlockerror', this.onPointerLockError, false);
    }
  },

  /**
   * Remove mouse and touch event listeners from canvas.
   */
  removeEventListeners: function () {
    var sceneEl = this.el.sceneEl;
    var canvasEl = sceneEl && sceneEl.canvas;

    if (!canvasEl) { return; }

    // Mouse events.
    canvasEl.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);

    // Touch events.
    canvasEl.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);

    // sceneEl events.
    sceneEl.removeEventListener('enter-vr', this.onEnterVR);
    sceneEl.removeEventListener('exit-vr', this.onExitVR);

    // Pointer Lock events.
    document.removeEventListener('pointerlockchange', this.onPointerLockChange, false);
    document.removeEventListener('mozpointerlockchange', this.onPointerLockChange, false);
    document.removeEventListener('pointerlockerror', this.onPointerLockError, false);
  },

  /**
   * Update orientation for mobile, mouse drag, and headset.
   * Mouse-drag only enabled if HMD is not active.
   */
  updateOrientation: (function () {
    var poseMatrix = new THREE.Matrix4();

    return function () {
      var hmdEuler = this.hmdEuler;
      var object3D = this.el.object3D;
      var pitchObject = this.pitchObject;
      var yawObject = this.yawObject;
      var pose;
      var sceneEl = this.el.sceneEl;

      // WebXR API updates applies headset pose to the object3D matrixWorld internally.
      // Reflect values back on position, rotation, scale so setAttribute returns expected values.
      if (sceneEl.is('vr-mode') && sceneEl.hasWebXR) {
        pose = sceneEl.renderer.vr.getCameraPose();
        if (pose) {
          poseMatrix.elements = pose.poseModelMatrix;
          poseMatrix.decompose(object3D.position, object3D.rotation, object3D.scale);
        }
      } else {
        object3D.updateMatrix();
      }

      // In VR mode, THREE is in charge of updating the camera rotation.
      if (sceneEl.is('vr-mode') && sceneEl.checkHeadsetConnected()) { return; }
      // Calculate polyfilled HMD quaternion.
      this.polyfillControls.update();
      hmdEuler.setFromQuaternion(this.polyfillObject.quaternion, 'YXZ');

      // On mobile, do camera rotation with touch events and sensors.
      object3D.rotation.x = hmdEuler.x + pitchObject.rotation.x;
      object3D.rotation.y = hmdEuler.y + yawObject.rotation.y;
    };
  })(),

  /**
   * Translate mouse drag into rotation.
   *
   * Dragging up and down rotates the camera around the X-axis (yaw).
   * Dragging left and right rotates the camera around the Y-axis (pitch).
   */
  onMouseMove: function (event) {
    var direction;
    var movementX;
    var movementY;
    var pitchObject = this.pitchObject;
    var previousMouseEvent = this.previousMouseEvent;
    var yawObject = this.yawObject;

    // Not dragging or not enabled.
    if (!this.data.enabled || (!this.mouseDown && !this.pointerLocked)) { return; }

    // Calculate delta.
    if (this.pointerLocked) {
      movementX = event.movementX || event.mozMovementX || 0;
      movementY = event.movementY || event.mozMovementY || 0;
    } else {
      movementX = event.screenX - previousMouseEvent.screenX;
      movementY = event.screenY - previousMouseEvent.screenY;
    }
    this.previousMouseEvent = event;

    // Calculate rotation.
    direction = this.data.reverseMouseDrag ? 1 : -1;
    yawObject.rotation.y += movementX * 0.002 * direction;
    pitchObject.rotation.x += movementY * 0.002 * direction;
    pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
  },

  /**
   * Register mouse down to detect mouse drag.
   */
  onMouseDown: function (evt) {
    if (!this.data.enabled) { return; }
    // Handle only primary button.
    if (evt.button !== 0) { return; }

    var sceneEl = this.el.sceneEl;
    var canvasEl = sceneEl && sceneEl.canvas;

    this.mouseDown = true;
    this.previousMouseEvent = evt;
    this.showGrabbingCursor();

    if (this.data.pointerLockEnabled && !this.pointerLocked) {
      if (canvasEl.requestPointerLock) {
        canvasEl.requestPointerLock();
      } else if (canvasEl.mozRequestPointerLock) {
        canvasEl.mozRequestPointerLock();
      }
    }
  },

  /**
   * Shows grabbing cursor on scene
   */
  showGrabbingCursor: function () {
    this.el.sceneEl.canvas.style.cursor = 'grabbing';
  },

  /**
   * Hides grabbing cursor on scene
   */
  hideGrabbingCursor: function () {
    this.el.sceneEl.canvas.style.cursor = '';
  },

  /**
   * Register mouse up to detect release of mouse drag.
   */
  onMouseUp: function () {
    this.mouseDown = false;
    this.hideGrabbingCursor();
  },

  /**
   * Register touch down to detect touch drag.
   */
  onTouchStart: function (evt) {
    if (evt.touches.length !== 1 || !this.data.touchEnabled) { return; }
    this.touchStart = {
      x: evt.touches[0].pageX,
      y: evt.touches[0].pageY
    };
    this.touchStarted = true;
  },

  /**
   * Translate touch move to Y-axis rotation.
   */
  onTouchMove: function (evt) {
    var direction;
    var canvas = this.el.sceneEl.canvas;
    var deltaY;
    var yawObject = this.yawObject;

    if (!this.touchStarted || !this.data.touchEnabled) { return; }

    deltaY = 2 * Math.PI * (evt.touches[0].pageX - this.touchStart.x) / canvas.clientWidth;

    direction = this.data.reverseTouchDrag ? 1 : -1;
    // Limit touch orientaion to to yaw (y axis).
    yawObject.rotation.y -= deltaY * 0.5 * direction;
    this.touchStart = {
      x: evt.touches[0].pageX,
      y: evt.touches[0].pageY
    };
  },

  /**
   * Register touch end to detect release of touch drag.
   */
  onTouchEnd: function () {
    this.touchStarted = false;
  },

  /**
   * Save pose.
   */
  onEnterVR: function () {
    if (!this.el.sceneEl.checkHeadsetConnected()) { return; }
    this.saveCameraPose();
    this.el.object3D.position.set(0, 0, 0);
    this.el.object3D.updateMatrix();
  },

  /**
   * Restore the pose.
   */
  onExitVR: function () {
    if (!this.el.sceneEl.checkHeadsetConnected()) { return; }
    this.restoreCameraPose();
    this.previousHMDPosition.set(0, 0, 0);
  },

  /**
   * Update Pointer Lock state.
   */
  onPointerLockChange: function () {
    this.pointerLocked = !!(document.pointerLockElement || document.mozPointerLockElement);
  },

  /**
   * Recover from Pointer Lock error.
   */
  onPointerLockError: function () {
    this.pointerLocked = false;
  },

  // Exits pointer-locked mode.
  exitPointerLock: function () {
    document.exitPointerLock();
    this.pointerLocked = false;
  },

  /**
   * Toggle the feature of showing/hiding the grab cursor.
   */
  updateGrabCursor: function (enabled) {
    var sceneEl = this.el.sceneEl;

    function enableGrabCursor () { sceneEl.canvas.classList.add('a-grab-cursor'); }
    function disableGrabCursor () { sceneEl.canvas.classList.remove('a-grab-cursor'); }

    if (!sceneEl.canvas) {
      if (enabled) {
        sceneEl.addEventListener('render-target-loaded', enableGrabCursor);
      } else {
        sceneEl.addEventListener('render-target-loaded', disableGrabCursor);
      }
      return;
    }

    if (enabled) {
      enableGrabCursor();
      return;
    }
    disableGrabCursor();
  },

  /**
   * Save camera pose before entering VR to restore later if exiting.
   */
  saveCameraPose: function () {
    var el = this.el;

    this.savedPose.position.copy(el.object3D.position);
    this.savedPose.rotation.copy(el.object3D.rotation);
    this.hasSavedPose = true;
  },

  /**
   * Reset camera pose to before entering VR.
   */
  restoreCameraPose: function () {
    var el = this.el;
    var savedPose = this.savedPose;

    if (!this.hasSavedPose) { return; }

    // Reset camera orientation.
    el.object3D.position.copy(savedPose.position);
    el.object3D.rotation.copy(savedPose.rotation);
    this.hasSavedPose = false;
  }
});

},{"../core/component":101,"../lib/three":149,"../utils":174,"../utils/":174}],64:[function(_dereq_,module,exports){
/* global Promise */
var utils = _dereq_('../utils/');
var component = _dereq_('../core/component');
var THREE = _dereq_('../lib/three');
var shader = _dereq_('../core/shader');

var error = utils.debug('components:material:error');
var registerComponent = component.registerComponent;
var shaders = shader.shaders;
var shaderNames = shader.shaderNames;

/**
 * Material component.
 *
 * @member {object} shader - Determines how material is shaded. Defaults to `standard`,
 *         three.js's implementation of PBR. Another standard shading model is `flat` which
 *         uses MeshBasicMaterial.
 */
module.exports.Component = registerComponent('material', {
  schema: {
    alphaTest: {default: 0.0, min: 0.0, max: 1.0},
    depthTest: {default: true},
    depthWrite: {default: true},
    flatShading: {default: false},
    npot: {default: false},
    offset: {type: 'vec2', default: {x: 0, y: 0}},
    opacity: {default: 1.0, min: 0.0, max: 1.0},
    repeat: {type: 'vec2', default: {x: 1, y: 1}},
    shader: {default: 'standard', oneOf: shaderNames, schemaChange: true},
    side: {default: 'front', oneOf: ['front', 'back', 'double']},
    transparent: {default: false},
    vertexColors: {type: 'string', default: 'none', oneOf: ['face', 'vertex']},
    visible: {default: true},
    blending: {default: 'normal', oneOf: ['none', 'normal', 'additive', 'subtractive', 'multiply']}
  },

  init: function () {
    this.material = null;
  },

  /**
   * Update or create material.
   *
   * @param {object|null} oldData
   */
  update: function (oldData) {
    var data = this.data;
    if (!this.shader || data.shader !== oldData.shader) {
      this.updateShader(data.shader);
    }
    this.shader.update(this.data);
    this.updateMaterial(oldData);
  },

  updateSchema: function (data) {
    var currentShader;
    var newShader;
    var schema;
    var shader;

    newShader = data && data.shader;
    currentShader = this.oldData && this.oldData.shader;
    shader = newShader || currentShader;
    schema = shaders[shader] && shaders[shader].schema;

    if (!schema) { error('Unknown shader schema ' + shader); }
    if (currentShader && newShader === currentShader) { return; }
    this.extendSchema(schema);
    this.updateBehavior();
  },

  updateBehavior: function () {
    var key;
    var sceneEl = this.el.sceneEl;
    var schema = this.schema;
    var self = this;
    var tickProperties;

    function tickTime (time, delta) {
      var key;
      for (key in tickProperties) {
        tickProperties[key] = time;
      }
      self.shader.update(tickProperties);
    }

    this.tick = undefined;

    tickProperties = {};
    for (key in schema) {
      if (schema[key].type === 'time') {
        this.tick = tickTime;
        tickProperties[key] = true;
      }
    }

    if (!sceneEl) { return; }
    if (this.tick) {
      sceneEl.addBehavior(this);
    } else {
      sceneEl.removeBehavior(this);
    }
  },

  updateShader: function (shaderName) {
    var data = this.data;
    var Shader = shaders[shaderName] && shaders[shaderName].Shader;
    var shaderInstance;

    if (!Shader) { throw new Error('Unknown shader ' + shaderName); }

    // Get material from A-Frame shader.
    shaderInstance = this.shader = new Shader();
    shaderInstance.el = this.el;
    shaderInstance.init(data);
    this.setMaterial(shaderInstance.material);
    this.updateSchema(data);
  },

  /**
   * Set and update base material properties.
   * Set `needsUpdate` when needed.
   */
  updateMaterial: function (oldData) {
    var data = this.data;
    var material = this.material;
    var oldDataHasKeys;

    // Base material properties.
    material.alphaTest = data.alphaTest;
    material.depthTest = data.depthTest !== false;
    material.depthWrite = data.depthWrite !== false;
    material.opacity = data.opacity;
    material.flatShading = data.flatShading;
    material.side = parseSide(data.side);
    material.transparent = data.transparent !== false || data.opacity < 1.0;
    material.vertexColors = parseVertexColors(data.vertexColors);
    material.visible = data.visible;
    material.blending = parseBlending(data.blending);

    // Check if material needs update.
    for (oldDataHasKeys in oldData) { break; }
    if (oldDataHasKeys &&
        (oldData.alphaTest !== data.alphaTest ||
         oldData.side !== data.side ||
         oldData.vertexColors !== data.vertexColors)) {
      material.needsUpdate = true;
    }
  },

  /**
   * Remove material on remove (callback).
   * Dispose of it from memory and unsubscribe from scene updates.
   */
  remove: function () {
    var defaultMaterial = new THREE.MeshBasicMaterial();
    var material = this.material;
    var object3D = this.el.getObject3D('mesh');
    if (object3D) { object3D.material = defaultMaterial; }
    disposeMaterial(material, this.system);
  },

  /**
   * (Re)create new material. Has side-effects of setting `this.material` and updating
   * material registration in scene.
   *
   * @param {object} data - Material component data.
   * @param {object} type - Material type to create.
   * @returns {object} Material.
   */
  setMaterial: function (material) {
    var el = this.el;
    var mesh;
    var system = this.system;

    if (this.material) { disposeMaterial(this.material, system); }

    this.material = material;
    system.registerMaterial(material);

    // Set on mesh. If mesh does not exist, wait for it.
    mesh = el.getObject3D('mesh');
    if (mesh) {
      mesh.material = material;
    } else {
      el.addEventListener('object3dset', function waitForMesh (evt) {
        if (evt.detail.type !== 'mesh' || evt.target !== el) { return; }
        el.getObject3D('mesh').material = material;
        el.removeEventListener('object3dset', waitForMesh);
      });
    }
  }
});

/**
 * Return a three.js constant determining which material face sides to render
 * based on the side parameter (passed as a component property).
 *
 * @param {string} [side=front] - `front`, `back`, or `double`.
 * @returns {number} THREE.FrontSide, THREE.BackSide, or THREE.DoubleSide.
 */
function parseSide (side) {
  switch (side) {
    case 'back': {
      return THREE.BackSide;
    }
    case 'double': {
      return THREE.DoubleSide;
    }
    default: {
      // Including case `front`.
      return THREE.FrontSide;
    }
  }
}

/**
 * Return a three.js constant determining vertex coloring.
 */
function parseVertexColors (coloring) {
  switch (coloring) {
    case 'face': {
      return THREE.FaceColors;
    }
    case 'vertex': {
      return THREE.VertexColors;
    }
    default: {
      return THREE.NoColors;
    }
  }
}

/**
 * Return a three.js constant determining blending
 *
 * @param {string} [blending=normal]
 * - `none`, additive`, `subtractive`,`multiply` or `normal`.
 * @returns {number}
 */
function parseBlending (blending) {
  switch (blending) {
    case 'none': {
      return THREE.NoBlending;
    }
    case 'additive': {
      return THREE.AdditiveBlending;
    }
    case 'subtractive': {
      return THREE.SubtractiveBlending;
    }
    case 'multiply': {
      return THREE.MultiplyBlending;
    }
    default: {
      return THREE.NormalBlending;
    }
  }
}

/**
 * Dispose of material from memory and unsubscribe material from scene updates like fog.
 */
function disposeMaterial (material, system) {
  material.dispose();
  system.unregisterMaterial(material);
}

},{"../core/component":101,"../core/shader":111,"../lib/three":149,"../utils/":174}],65:[function(_dereq_,module,exports){
var debug = _dereq_('../utils/debug');
var registerComponent = _dereq_('../core/component').registerComponent;
var THREE = _dereq_('../lib/three');

var warn = debug('components:obj-model:warn');

module.exports.Component = registerComponent('obj-model', {
  schema: {
    mtl: {type: 'model'},
    obj: {type: 'model'}
  },

  init: function () {
    this.model = null;
    this.objLoader = new THREE.OBJLoader();
    this.mtlLoader = new THREE.MTLLoader(this.objLoader.manager);
    // Allow cross-origin images to be loaded.
    this.mtlLoader.crossOrigin = '';
  },

  update: function () {
    var data = this.data;
    if (!data.obj) { return; }
    this.resetMesh();
    this.loadObj(data.obj, data.mtl);
  },

  remove: function () {
    if (!this.model) { return; }
    this.resetMesh();
  },

  resetMesh: function () {
    this.el.removeObject3D('mesh');
  },

  loadObj: function (objUrl, mtlUrl) {
    var self = this;
    var el = this.el;
    var mtlLoader = this.mtlLoader;
    var objLoader = this.objLoader;
    var rendererSystem = this.el.sceneEl.systems.renderer;

    if (mtlUrl) {
      // .OBJ with an .MTL.
      if (el.hasAttribute('material')) {
        warn('Material component properties are ignored when a .MTL is provided');
      }
      mtlLoader.setTexturePath(mtlUrl.substr(0, mtlUrl.lastIndexOf('/') + 1));
      mtlLoader.load(mtlUrl, function (materials) {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(objUrl, function (objModel) {
          self.model = objModel;
          self.model.traverse(function (object) {
            if (object.isMesh) {
              var material = object.material;
              if (material.color) rendererSystem.applyColorCorrection(material.color);
              if (material.map) rendererSystem.applyColorCorrection(material.map);
              if (material.emissive) rendererSystem.applyColorCorrection(material.emissive);
              if (material.emissiveMap) rendererSystem.applyColorCorrection(material.emissiveMap);
            }
          });
          el.setObject3D('mesh', objModel);
          el.emit('model-loaded', {format: 'obj', model: objModel});
        });
      });
      return;
    }

    // .OBJ only.
    objLoader.load(objUrl, function loadObjOnly (objModel) {
      // Apply material.
      var material = el.components.material;
      if (material) {
        objModel.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = material.material;
          }
        });
      }

      self.model = objModel;
      el.setObject3D('mesh', objModel);
      el.emit('model-loaded', {format: 'obj', model: objModel});
    });
  }
});

},{"../core/component":101,"../lib/three":149,"../utils/debug":170}],66:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;
var bind = _dereq_('../utils/bind');
var trackedControlsUtils = _dereq_('../utils/tracked-controls');
var checkControllerPresentAndSetup = trackedControlsUtils.checkControllerPresentAndSetup;
var emitIfAxesChanged = trackedControlsUtils.emitIfAxesChanged;
var onButtonEvent = trackedControlsUtils.onButtonEvent;

var GAMEPAD_ID_PREFIX = 'Oculus Go';

var OCULUS_GO_CONTROLLER_MODEL_URL = 'https://cdn.aframe.io/controllers/oculus/go/oculus-go-controller.gltf';

/**
 * Oculus Go controls.
 * Interface with Oculus Go controller and map Gamepad events to
 * controller buttons: trackpad, trigger
 * Load a controller model and highlight the pressed buttons.
 */
module.exports.Component = registerComponent('oculus-go-controls', {
  schema: {
    hand: {default: ''},  // This informs the degenerate arm model.
    buttonColor: {type: 'color', default: '#FFFFFF'},
    buttonTouchedColor: {type: 'color', default: '#BBBBBB'},
    buttonHighlightColor: {type: 'color', default: '#7A7A7A'},
    model: {default: true},
    rotationOffset: {default: 0},
    armModel: {default: true}
  },

  /**
   * Button IDs:
   * 0 - trackpad
   * 1 - trigger
   */
  mapping: {
    axes: {trackpad: [0, 1]},
    buttons: ['trackpad', 'trigger']
  },

  bindMethods: function () {
    this.onModelLoaded = bind(this.onModelLoaded, this);
    this.onControllersUpdate = bind(this.onControllersUpdate, this);
    this.checkIfControllerPresent = bind(this.checkIfControllerPresent, this);
    this.removeControllersUpdateListener = bind(this.removeControllersUpdateListener, this);
    this.onAxisMoved = bind(this.onAxisMoved, this);
  },

  init: function () {
    var self = this;
    this.animationActive = 'pointing';
    this.onButtonChanged = bind(this.onButtonChanged, this);
    this.onButtonDown = function (evt) { onButtonEvent(evt.detail.id, 'down', self); };
    this.onButtonUp = function (evt) { onButtonEvent(evt.detail.id, 'up', self); };
    this.onButtonTouchStart = function (evt) { onButtonEvent(evt.detail.id, 'touchstart', self); };
    this.onButtonTouchEnd = function (evt) { onButtonEvent(evt.detail.id, 'touchend', self); };
    this.onAxisMoved = bind(this.onAxisMoved, this);
    this.controllerPresent = false;
    this.lastControllerCheck = 0;
    this.rendererSystem = this.el.sceneEl.systems.renderer;
    this.bindMethods();
    this.checkControllerPresentAndSetup = checkControllerPresentAndSetup;  // To allow mock.
    this.emitIfAxesChanged = emitIfAxesChanged;  // To allow mock.
  },

  addEventListeners: function () {
    var el = this.el;
    el.addEventListener('buttonchanged', this.onButtonChanged);
    el.addEventListener('buttondown', this.onButtonDown);
    el.addEventListener('buttonup', this.onButtonUp);
    el.addEventListener('touchstart', this.onButtonTouchStart);
    el.addEventListener('touchend', this.onButtonTouchEnd);
    el.addEventListener('model-loaded', this.onModelLoaded);
    el.addEventListener('axismove', this.onAxisMoved);
    this.controllerEventsActive = true;
  },

  removeEventListeners: function () {
    var el = this.el;
    el.removeEventListener('buttonchanged', this.onButtonChanged);
    el.removeEventListener('buttondown', this.onButtonDown);
    el.removeEventListener('buttonup', this.onButtonUp);
    el.removeEventListener('touchstart', this.onButtonTouchStart);
    el.removeEventListener('touchend', this.onButtonTouchEnd);
    el.removeEventListener('model-loaded', this.onModelLoaded);
    el.removeEventListener('axismove', this.onAxisMoved);
    this.controllerEventsActive = false;
  },

  checkIfControllerPresent: function () {
    this.checkControllerPresentAndSetup(this, GAMEPAD_ID_PREFIX,
                                        this.data.hand ? {hand: this.data.hand} : {});
  },

  play: function () {
    this.checkIfControllerPresent();
    this.addControllersUpdateListener();
  },

  pause: function () {
    this.removeEventListeners();
    this.removeControllersUpdateListener();
  },

  injectTrackedControls: function () {
    var el = this.el;
    var data = this.data;
    el.setAttribute('tracked-controls', {
      armModel: data.armModel,
      idPrefix: GAMEPAD_ID_PREFIX,
      rotationOffset: data.rotationOffset
    });
    if (!this.data.model) { return; }
    this.el.setAttribute('gltf-model', OCULUS_GO_CONTROLLER_MODEL_URL);
  },

  addControllersUpdateListener: function () {
    this.el.sceneEl.addEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  removeControllersUpdateListener: function () {
    this.el.sceneEl.removeEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  onControllersUpdate: function () {
    this.checkIfControllerPresent();
  },

  // No need for onButtonChanged, since Oculus Go controller has no analog buttons.

  onModelLoaded: function (evt) {
    var controllerObject3D = evt.detail.model;
    var buttonMeshes;

    if (!this.data.model) { return; }
    buttonMeshes = this.buttonMeshes = {};
    buttonMeshes.trigger = controllerObject3D.getObjectByName('oculus_go_button_trigger');
    buttonMeshes.trackpad = controllerObject3D.getObjectByName('oculus_go_touchpad');
  },

  onButtonChanged: function (evt) {
    var button = this.mapping.buttons[evt.detail.id];
    if (!button) return;
    // Pass along changed event with button state, using button mapping for convenience.
    this.el.emit(button + 'changed', evt.detail.state);
  },

  onAxisMoved: function (evt) {
    this.emitIfAxesChanged(this, this.mapping.axes, evt);
  },

  updateModel: function (buttonName, evtName) {
    if (!this.data.model) { return; }
    this.updateButtonModel(buttonName, evtName);
  },

  updateButtonModel: function (buttonName, state) {
    var buttonMeshes = this.buttonMeshes;
    if (!buttonMeshes || !buttonMeshes[buttonName]) { return; }
    var color;
    var button;
    switch (state) {
      case 'down':
        color = this.data.buttonHighlightColor;
        break;
      case 'touchstart':
        color = this.data.buttonTouchedColor;
        break;
      default:
        color = this.data.buttonColor;
    }
    button = buttonMeshes[buttonName];
    button.material.color.set(color);
    this.rendererSystem.applyColorCorrection(button.material.color);
  }
});

},{"../core/component":101,"../utils/bind":168,"../utils/tracked-controls":182}],67:[function(_dereq_,module,exports){
var bind = _dereq_('../utils/bind');
var registerComponent = _dereq_('../core/component').registerComponent;
var trackedControlsUtils = _dereq_('../utils/tracked-controls');
var THREE = _dereq_('../lib/three');
var onButtonEvent = trackedControlsUtils.onButtonEvent;

var TOUCH_CONTROLLER_MODEL_BASE_URL = 'https://cdn.aframe.io/controllers/oculus/oculus-touch-controller-';
var TOUCH_CONTROLLER_MODEL_URL = {
  left: TOUCH_CONTROLLER_MODEL_BASE_URL + 'left.gltf',
  right: TOUCH_CONTROLLER_MODEL_BASE_URL + 'right.gltf'
};

var GAMEPAD_ID_PREFIX = 'Oculus Touch';

var DEFAULT_MODEL_PIVOT_OFFSET = new THREE.Vector3(0, 0, -0.053);
var RAY_ORIGIN = {
  left: {origin: {x: 0.008, y: -0.004, z: 0}, direction: {x: 0, y: -0.8, z: -1}},
  right: {origin: {x: -0.008, y: -0.004, z: 0}, direction: {x: 0, y: -0.8, z: -1}}
};

/**
 * Oculus Touch controls.
 * Interface with Oculus Touch controllers and map Gamepad events to
 * controller buttons: thumbstick, trigger, grip, xbutton, ybutton, surface
 * Load a controller model and highlight the pressed buttons.
 */
module.exports.Component = registerComponent('oculus-touch-controls', {
  schema: {
    hand: {default: 'left'},
    buttonColor: {type: 'color', default: '#999'},  // Off-white.
    buttonTouchColor: {type: 'color', default: '#8AB'},
    buttonHighlightColor: {type: 'color', default: '#2DF'},  // Light blue.
    model: {default: true},
    orientationOffset: {type: 'vec3', default: {x: 43, y: 0, z: 0}}
  },

  /**
   * Button IDs:
   * 0 - thumbstick (which has separate axismove / thumbstickmoved events)
   * 1 - trigger (with analog value, which goes up to 1)
   * 2 - grip (with analog value, which goes up to 1)
   * 3 - X (left) or A (right)
   * 4 - Y (left) or B (right)
   * 5 - surface (touch only)
   */
  mapping: {
    left: {
      axes: {thumbstick: [0, 1]},
      buttons: ['thumbstick', 'trigger', 'grip', 'xbutton', 'ybutton', 'surface']
    },
    right: {
      axes: {thumbstick: [0, 1]},
      buttons: ['thumbstick', 'trigger', 'grip', 'abutton', 'bbutton', 'surface']
    }
  },

  bindMethods: function () {
    this.onModelLoaded = bind(this.onModelLoaded, this);
    this.onControllersUpdate = bind(this.onControllersUpdate, this);
    this.checkIfControllerPresent = bind(this.checkIfControllerPresent, this);
    this.onAxisMoved = bind(this.onAxisMoved, this);
  },

  init: function () {
    var self = this;
    this.onButtonChanged = bind(this.onButtonChanged, this);
    this.onButtonDown = function (evt) { onButtonEvent(evt.detail.id, 'down', self, self.data.hand); };
    this.onButtonUp = function (evt) { onButtonEvent(evt.detail.id, 'up', self, self.data.hand); };
    this.onButtonTouchStart = function (evt) { onButtonEvent(evt.detail.id, 'touchstart', self, self.data.hand); };
    this.onButtonTouchEnd = function (evt) { onButtonEvent(evt.detail.id, 'touchend', self, self.data.hand); };
    this.controllerPresent = false;
    this.lastControllerCheck = 0;
    this.previousButtonValues = {};
    this.rendererSystem = this.el.sceneEl.systems.renderer;
    this.bindMethods();

    // Allow mock.
    this.emitIfAxesChanged = trackedControlsUtils.emitIfAxesChanged;
    this.checkControllerPresentAndSetup = trackedControlsUtils.checkControllerPresentAndSetup;
  },

  addEventListeners: function () {
    var el = this.el;
    el.addEventListener('buttonchanged', this.onButtonChanged);
    el.addEventListener('buttondown', this.onButtonDown);
    el.addEventListener('buttonup', this.onButtonUp);
    el.addEventListener('touchstart', this.onButtonTouchStart);
    el.addEventListener('touchend', this.onButtonTouchEnd);
    el.addEventListener('axismove', this.onAxisMoved);
    el.addEventListener('model-loaded', this.onModelLoaded);
    this.controllerEventsActive = true;
  },

  removeEventListeners: function () {
    var el = this.el;
    el.removeEventListener('buttonchanged', this.onButtonChanged);
    el.removeEventListener('buttondown', this.onButtonDown);
    el.removeEventListener('buttonup', this.onButtonUp);
    el.removeEventListener('touchstart', this.onButtonTouchStart);
    el.removeEventListener('touchend', this.onButtonTouchEnd);
    el.removeEventListener('axismove', this.onAxisMoved);
    el.removeEventListener('model-loaded', this.onModelLoaded);
    this.controllerEventsActive = false;
  },

  checkIfControllerPresent: function () {
    this.checkControllerPresentAndSetup(this, GAMEPAD_ID_PREFIX, {
      hand: this.data.hand
    });
  },

  play: function () {
    this.checkIfControllerPresent();
    this.addControllersUpdateListener();
  },

  pause: function () {
    this.removeEventListeners();
    this.removeControllersUpdateListener();
  },

  loadModel: function () {
    var data = this.data;
    if (!data.model) { return; }
    this.el.setAttribute('gltf-model', 'url(' + TOUCH_CONTROLLER_MODEL_URL[data.hand] + ')');
  },

  injectTrackedControls: function () {
    var data = this.data;
    this.el.setAttribute('tracked-controls', {
      id: data.hand === 'right' ? 'Oculus Touch (Right)' : 'Oculus Touch (Left)',
      controller: 0,
      hand: data.hand,
      orientationOffset: data.orientationOffset
    });
    this.loadModel();
  },

  addControllersUpdateListener: function () {
    this.el.sceneEl.addEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  removeControllersUpdateListener: function () {
    this.el.sceneEl.removeEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  onControllersUpdate: function () {
    // Note that due to gamepadconnected event propagation issues, we don't rely on events.
    this.checkIfControllerPresent();
  },

  onButtonChanged: function (evt) {
    var button = this.mapping[this.data.hand].buttons[evt.detail.id];
    var buttonMeshes = this.buttonMeshes;
    var analogValue;

    if (!button) { return; }

    if (button === 'trigger' || button === 'grip') { analogValue = evt.detail.state.value; }

    // Update trigger and/or grip meshes, if any.
    if (buttonMeshes) {
      if (button === 'trigger' && buttonMeshes.trigger) {
        buttonMeshes.trigger.rotation.x = this.originalXRotationTrigger - analogValue * (Math.PI / 26);
      }
      if (button === 'grip' && buttonMeshes.grip) {
        buttonMeshes.grip.position.x = this.originalXPositionGrip + (this.data.hand === 'left' ? -1 : 1) * analogValue * 0.004;
      }
    }

    // Pass along changed event with button state, using the buttom mapping for convenience.
    this.el.emit(button + 'changed', evt.detail.state);
  },

  onModelLoaded: function (evt) {
    var controllerObject3D = evt.detail.model;
    var buttonMeshes;
    if (!this.data.model) { return; }

    buttonMeshes = this.buttonMeshes = {};

    buttonMeshes.grip = controllerObject3D.getObjectByName('buttonHand');
    this.originalXPositionGrip = buttonMeshes.grip.position.x;
    buttonMeshes.thumbstick = controllerObject3D.getObjectByName('stick');
    buttonMeshes.trigger = controllerObject3D.getObjectByName('buttonTrigger');
    this.originalXRotationTrigger = buttonMeshes.trigger.rotation.x;
    buttonMeshes.xbutton = controllerObject3D.getObjectByName('buttonX');
    buttonMeshes.abutton = controllerObject3D.getObjectByName('buttonA');
    buttonMeshes.ybutton = controllerObject3D.getObjectByName('buttonY');
    buttonMeshes.bbutton = controllerObject3D.getObjectByName('buttonB');

    // Offset pivot point
    controllerObject3D.position.copy(DEFAULT_MODEL_PIVOT_OFFSET);

    this.el.emit('controllermodelready', {
      name: 'oculus-touch-controls',
      model: this.data.model,
      rayOrigin: RAY_ORIGIN[this.data.hand]
    });
  },

  onAxisMoved: function (evt) {
    this.emitIfAxesChanged(this, this.mapping[this.data.hand].axes, evt);
  },

  updateModel: function (buttonName, evtName) {
    if (!this.data.model) { return; }
    this.updateButtonModel(buttonName, evtName);
  },

  updateButtonModel: function (buttonName, state) {
    var button;
    var color = (state === 'up' || state === 'touchend') ? this.data.buttonColor : state === 'touchstart' ? this.data.buttonTouchColor : this.data.buttonHighlightColor;
    var buttonMeshes = this.buttonMeshes;
    if (!this.data.model) { return; }
    if (buttonMeshes && buttonMeshes[buttonName]) {
      button = buttonMeshes[buttonName];
      button.material.color.set(color);
      this.rendererSystem.applyColorCorrection(button.material.color);
    }
  }
});

},{"../core/component":101,"../lib/three":149,"../utils/bind":168,"../utils/tracked-controls":182}],68:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;

module.exports.Component = registerComponent('position', {
  schema: {type: 'vec3'},

  update: function () {
    var object3D = this.el.object3D;
    var data = this.data;
    object3D.position.set(data.x, data.y, data.z);
  },

  remove: function () {
    // Pretty much for mixins.
    this.el.object3D.position.set(0, 0, 0);
  }
});

},{"../core/component":101}],69:[function(_dereq_,module,exports){
/* global MutationObserver */

var registerComponent = _dereq_('../core/component').registerComponent;
var THREE = _dereq_('../lib/three');
var utils = _dereq_('../utils/');

var warn = utils.debug('components:raycaster:warn');

// Defines selectors that should be 'safe' for the MutationObserver used to
// refresh the whitelist. Matches classnames, IDs, and presence of attributes.
// Selectors for the value of an attribute, like [position=0 2 0], cannot be
// reliably detected and are therefore disallowed.
var OBSERVER_SELECTOR_RE = /^[\w\s-.,[\]#]*$/;

// Configuration for the MutationObserver used to refresh the whitelist.
// Listens for addition/removal of elements and attributes within the scene.
var OBSERVER_CONFIG = {
  childList: true,
  attributes: true,
  subtree: true
};

var EVENTS = {
  INTERSECT: 'raycaster-intersected',
  INTERSECTION: 'raycaster-intersection',
  INTERSECT_CLEAR: 'raycaster-intersected-cleared',
  INTERSECTION_CLEAR: 'raycaster-intersection-cleared'
};

/**
 * Raycaster component.
 *
 * Pass options to three.js Raycaster including which objects to test.
 * Poll for intersections.
 * Emit event on origin entity and on target entity on intersect.
 *
 * @member {array} intersectedEls - List of currently intersected entities.
 * @member {array} objects - Cached list of meshes to intersect.
 * @member {number} prevCheckTime - Previous time intersection was checked. To help interval.
 * @member {object} raycaster - three.js Raycaster.
 */
module.exports.Component = registerComponent('raycaster', {
  schema: {
    autoRefresh: {default: true},
    direction: {type: 'vec3', default: {x: 0, y: 0, z: -1}},
    enabled: {default: true},
    far: {default: 1000},
    interval: {default: 0},
    near: {default: 0},
    objects: {default: ''},
    origin: {type: 'vec3'},
    showLine: {default: false},
    useWorldCoordinates: {default: false}
  },

  multiple: true,

  init: function () {
    this.clearedIntersectedEls = [];
    this.unitLineEndVec3 = new THREE.Vector3();
    this.intersectedEls = [];
    this.intersections = [];
    this.newIntersectedEls = [];
    this.newIntersections = [];
    this.objects = [];
    this.prevCheckTime = undefined;
    this.prevIntersectedEls = [];
    this.rawIntersections = [];
    this.raycaster = new THREE.Raycaster();
    this.updateOriginDirection();
    this.setDirty = this.setDirty.bind(this);
    this.updateLine = this.updateLine.bind(this);
    this.observer = new MutationObserver(this.setDirty);
    this.dirty = true;
    this.lineEndVec3 = new THREE.Vector3();
    this.otherLineEndVec3 = new THREE.Vector3();
    this.lineData = {end: this.lineEndVec3};

    this.getIntersection = this.getIntersection.bind(this);
    this.intersectedDetail = {el: this.el, getIntersection: this.getIntersection};
    this.intersectedClearedDetail = {el: this.el};
    this.intersectionClearedDetail = {clearedEls: this.clearedIntersectedEls};
    this.intersectionDetail = {};
  },

  /**
   * Create or update raycaster object.
   */
  update: function (oldData) {
    var data = this.data;
    var el = this.el;
    var raycaster = this.raycaster;

    // Set raycaster properties.
    raycaster.far = data.far;
    raycaster.near = data.near;

    // Draw line.
    if (data.showLine &&
        (data.far !== oldData.far || data.origin !== oldData.origin ||
         data.direction !== oldData.direction || !oldData.showLine)) {
      // Calculate unit vector for line direction. Can be multiplied via scalar to performantly
      // adjust line length.
      this.unitLineEndVec3.copy(data.origin).add(data.direction).normalize();
      this.drawLine();
    }

    if (!data.showLine && oldData.showLine) {
      el.removeAttribute('line');
    }

    if (data.objects !== oldData.objects && !OBSERVER_SELECTOR_RE.test(data.objects)) {
      warn('[raycaster] Selector "' + data.objects +
           '" may not update automatically with DOM changes.');
    }

    if (!data.objects) {
      warn('[raycaster] For performance, please define raycaster.objects when using ' +
           'raycaster or cursor components to whitelist which entities to intersect with. ' +
           'e.g., raycaster="objects: [data-raycastable]".');
    }

    if (data.autoRefresh !== oldData.autoRefresh && el.isPlaying) {
      data.autoRefresh
        ? this.addEventListeners()
        : this.removeEventListeners();
    }

    if (oldData.enabled && !data.enabled) { this.clearAllIntersections(); }

    this.setDirty();
  },

  play: function () {
    this.addEventListeners();
  },

  pause: function () {
    this.removeEventListeners();
  },

  remove: function () {
    if (this.data.showLine) {
      this.el.removeAttribute('line');
    }
    this.clearAllIntersections();
  },

  addEventListeners: function () {
    if (!this.data.autoRefresh) { return; }
    this.observer.observe(this.el.sceneEl, OBSERVER_CONFIG);
    this.el.sceneEl.addEventListener('object3dset', this.setDirty);
    this.el.sceneEl.addEventListener('object3dremove', this.setDirty);
  },

  removeEventListeners: function () {
    this.observer.disconnect();
    this.el.sceneEl.removeEventListener('object3dset', this.setDirty);
    this.el.sceneEl.removeEventListener('object3dremove', this.setDirty);
  },

  /**
   * Mark the object list as dirty, to be refreshed before next raycast.
   */
  setDirty: function () {
    this.dirty = true;
  },

  /**
   * Update list of objects to test for intersection.
   */
  refreshObjects: function () {
    var data = this.data;
    var els;

    // If objects not defined, intersect with everything.
    els = data.objects
      ? this.el.sceneEl.querySelectorAll(data.objects)
      : this.el.sceneEl.querySelectorAll('*');
    this.objects = this.flattenObject3DMaps(els);
    this.dirty = false;
  },

  /**
   * Check for intersections and cleared intersections on an interval.
   */
  tick: function (time) {
    var data = this.data;
    var prevCheckTime = this.prevCheckTime;

    if (!data.enabled) { return; }

    // Only check for intersection if interval time has passed.
    if (prevCheckTime && (time - prevCheckTime < data.interval)) { return; }

    // Update check time.
    this.prevCheckTime = time;
    this.checkIntersections();
  },

  /**
   * Raycast for intersections and emit events for current and cleared inersections.
   */
  checkIntersections: function () {
    var clearedIntersectedEls = this.clearedIntersectedEls;
    var el = this.el;
    var data = this.data;
    var i;
    var intersectedEls = this.intersectedEls;
    var intersection;
    var intersections = this.intersections;
    var newIntersectedEls = this.newIntersectedEls;
    var newIntersections = this.newIntersections;
    var prevIntersectedEls = this.prevIntersectedEls;
    var rawIntersections = this.rawIntersections;

    // Refresh the object whitelist if needed.
    if (this.dirty) { this.refreshObjects(); }

    // Store old previously intersected entities.
    copyArray(this.prevIntersectedEls, this.intersectedEls);

    // Raycast.
    this.updateOriginDirection();
    rawIntersections.length = 0;
    this.raycaster.intersectObjects(this.objects, true, rawIntersections);

    // Only keep intersections against objects that have a reference to an entity.
    intersections.length = 0;
    intersectedEls.length = 0;
    for (i = 0; i < rawIntersections.length; i++) {
      intersection = rawIntersections[i];
      // Don't intersect with own line.
      if (data.showLine && intersection.object === el.getObject3D('line')) {
        continue;
      }
      if (intersection.object.el) {
        intersections.push(intersection);
        intersectedEls.push(intersection.object.el);
      }
    }

    // Get newly intersected entities.
    newIntersections.length = 0;
    newIntersectedEls.length = 0;
    for (i = 0; i < intersections.length; i++) {
      if (prevIntersectedEls.indexOf(intersections[i].object.el) === -1) {
        newIntersections.push(intersections[i]);
        newIntersectedEls.push(intersections[i].object.el);
      }
    }

    // Emit intersection cleared on both entities per formerly intersected entity.
    clearedIntersectedEls.length = 0;
    for (i = 0; i < prevIntersectedEls.length; i++) {
      if (intersectedEls.indexOf(prevIntersectedEls[i]) !== -1) { continue; }
      prevIntersectedEls[i].emit(EVENTS.INTERSECT_CLEAR,
                                 this.intersectedClearedDetail);
      clearedIntersectedEls.push(prevIntersectedEls[i]);
    }
    if (clearedIntersectedEls.length) {
      el.emit(EVENTS.INTERSECTION_CLEAR, this.intersectionClearedDetail);
    }

    // Emit intersected on intersected entity per intersected entity.
    for (i = 0; i < newIntersectedEls.length; i++) {
      newIntersectedEls[i].emit(EVENTS.INTERSECT, this.intersectedDetail);
    }

    // Emit all intersections at once on raycasting entity.
    if (newIntersections.length) {
      this.intersectionDetail.els = newIntersectedEls;
      this.intersectionDetail.intersections = newIntersections;
      el.emit(EVENTS.INTERSECTION, this.intersectionDetail);
    }

    // Update line length.
    setTimeout(this.updateLine);
  },

  updateLine: function () {
    var el = this.el;
    var intersections = this.intersections;
    var lineLength;

    if (this.data.showLine) {
      if (intersections.length) {
        if (intersections[0].object.el === el && intersections[1]) {
          lineLength = intersections[1].distance;
        } else {
          lineLength = intersections[0].distance;
        }
      }
      this.drawLine(lineLength);
    }
  },

  /**
   * Return the most recent intersection details for a given entity, if any.
   * @param {AEntity} el
   * @return {Object}
   */
  getIntersection: function (el) {
    var i;
    var intersection;
    for (i = 0; i < this.intersections.length; i++) {
      intersection = this.intersections[i];
      if (intersection.object.el === el) { return intersection; }
    }
    return null;
  },

  /**
   * Update origin and direction of raycaster using entity transforms and supplied origin or
   * direction offsets.
   */
  updateOriginDirection: (function () {
    var direction = new THREE.Vector3();
    var originVec3 = new THREE.Vector3();

    // Closure to make quaternion/vector3 objects private.
    return function updateOriginDirection () {
      var el = this.el;
      var data = this.data;

      if (data.useWorldCoordinates) {
        this.raycaster.set(data.origin, data.direction);
        return;
      }

      // Grab the position and rotation. (As a side effect, this updates el.object3D.matrixWorld.)
      el.object3D.getWorldPosition(originVec3);

      // If non-zero origin, translate the origin into world space.
      if (data.origin.x !== 0 || data.origin.y !== 0 || data.origin.z !== 0) {
        originVec3 = el.object3D.localToWorld(originVec3.copy(data.origin));
      }

      // three.js raycaster direction is relative to 0, 0, 0 NOT the origin / offset we
      // provide. Apply the offset to the direction, then rotation from the object,
      // and normalize.
      direction.copy(data.direction).transformDirection(el.object3D.matrixWorld).normalize();

      // Apply offset and direction, in world coordinates.
      this.raycaster.set(originVec3, direction);
    };
  })(),

  /**
   * Create or update line to give raycaster visual representation.
   * Customize the line through through line component.
   * We draw the line in the raycaster component to customize the line to the
   * raycaster's origin, direction, and far.
   *
   * Unlike the raycaster, we create the line as a child of the object. The line will
   * be affected by the transforms of the objects, so we don't have to calculate transforms
   * like we do with the raycaster.
   *
   * @param {number} length - Length of line. Pass in to shorten the line to the intersection
   *   point. If not provided, length will default to the max length, `raycaster.far`.
   */
  drawLine: function (length) {
    var data = this.data;
    var el = this.el;
    var endVec3;

    // Switch each time vector so line update triggered and to avoid unnecessary vector clone.
    endVec3 = this.lineData.end === this.lineEndVec3
      ? this.otherLineEndVec3
      : this.lineEndVec3;

    // Treat Infinity as 1000m for the line.
    if (length === undefined) {
      length = data.far === Infinity ? 1000 : data.far;
    }

    // Update the length of the line if given. `unitLineEndVec3` is the direction
    // given by data.direction, then we apply a scalar to give it a length.
    this.lineData.start = data.origin;
    this.lineData.end = endVec3.copy(this.unitLineEndVec3).multiplyScalar(length);
    el.setAttribute('line', this.lineData);
  },

  /**
   * Return A-Frame attachments of each element's object3D group (e.g., mesh).
   * Children are flattened by one level, removing the THREE.Group wrapper,
   * so that non-recursive raycasting remains useful.
   *
   * Only push children defined as component attachemnts (e.g., setObject3D),
   * NOT actual children in the scene graph hierarchy.
   *
   * @param  {Array<Element>} els
   * @return {Array<THREE.Object3D>}
   */
  flattenObject3DMaps: function (els) {
    var key;
    var i;
    var objects = this.objects;

    // Push meshes and other attachments onto list of objects to intersect.
    objects.length = 0;
    for (i = 0; i < els.length; i++) {
      if (els[i].isEntity && els[i].object3D) {
        for (key in els[i].object3DMap) {
          objects.push(els[i].getObject3D(key));
        }
      }
    }

    return objects;
  },

  clearAllIntersections: function () {
    var i;
    for (i = 0; i < this.intersectedEls.length; i++) {
      this.intersectedEls[i].emit(EVENTS.INTERSECT_CLEAR,
                                  this.intersectedClearedDetail);
    }
    copyArray(this.clearedIntersectedEls, this.intersectedEls);
    this.intersectedEls.length = 0;
    this.intersections.length = 0;
    this.el.emit(EVENTS.INTERSECTION_CLEAR, this.intersectionClearedDetail);
  }
});

/**
 * Copy contents of one array to another without allocating new array.
 */
function copyArray (a, b) {
  var i;
  a.length = b.length;
  for (i = 0; i < b.length; i++) {
    a[i] = b[i];
  }
}

},{"../core/component":101,"../lib/three":149,"../utils/":174}],70:[function(_dereq_,module,exports){
var degToRad = _dereq_('../lib/three').Math.degToRad;
var registerComponent = _dereq_('../core/component').registerComponent;

module.exports.Component = registerComponent('rotation', {
  schema: {type: 'vec3'},

  /**
   * Updates object3D rotation.
   */
  update: function () {
    var data = this.data;
    var object3D = this.el.object3D;
    object3D.rotation.set(degToRad(data.x), degToRad(data.y), degToRad(data.z));
    object3D.rotation.order = 'YXZ';
  },

  remove: function () {
    // Pretty much for mixins.
    this.el.object3D.rotation.set(0, 0, 0);
  }
});

},{"../core/component":101,"../lib/three":149}],71:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;

// Avoids triggering a zero-determinant which makes object3D matrix non-invertible.
var zeroScale = 0.00001;

module.exports.Component = registerComponent('scale', {
  schema: {
    type: 'vec3',
    default: {x: 1, y: 1, z: 1}
  },

  update: function () {
    var data = this.data;
    var object3D = this.el.object3D;
    var x = data.x === 0 ? zeroScale : data.x;
    var y = data.y === 0 ? zeroScale : data.y;
    var z = data.z === 0 ? zeroScale : data.z;
    object3D.scale.set(x, y, z);
  },

  remove: function () {
    // Pretty much for mixins.
    this.el.object3D.scale.set(1, 1, 1);
  }
});

},{"../core/component":101}],72:[function(_dereq_,module,exports){
/* global THREE */
var register = _dereq_('../../core/component').registerComponent;

module.exports.Component = register('background', {
  schema: {
    color: {type: 'color', default: 'black'},
    transparent: {default: false}
  },
  update: function () {
    var data = this.data;
    var object3D = this.el.object3D;
    if (data.transparent) {
      object3D.background = null;
      return;
    }
    object3D.background = new THREE.Color(data.color);
  }
});

},{"../../core/component":101}],73:[function(_dereq_,module,exports){
var register = _dereq_('../../core/component').registerComponent;

module.exports.Component = register('debug', {
  schema: {default: true}
});

},{"../../core/component":101}],74:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../../core/component').registerComponent;

/**
 * Component to embed an a-frame scene within the layout of a 2D page.
 */
module.exports.Component = registerComponent('embedded', {
  dependencies: ['vr-mode-ui'],

  schema: {default: true},

  update: function () {
    var sceneEl = this.el;
    var enterVREl = sceneEl.querySelector('.a-enter-vr');
    if (this.data === true) {
      if (enterVREl) { enterVREl.classList.add('embedded'); }
      sceneEl.removeFullScreenStyles();
    } else {
      if (enterVREl) { enterVREl.classList.remove('embedded'); }
      sceneEl.addFullScreenStyles();
    }
  }

});

},{"../../core/component":101}],75:[function(_dereq_,module,exports){
var register = _dereq_('../../core/component').registerComponent;
var THREE = _dereq_('../../lib/three');
var debug = _dereq_('../../utils/debug');

var warn = debug('components:fog:warn');

/**
 * Fog component.
 * Applies only to the scene entity.
 */
module.exports.Component = register('fog', {
  schema: {
    color: {type: 'color', default: '#000'},
    density: {default: 0.00025},
    far: {default: 1000, min: 0},
    near: {default: 1, min: 0},
    type: {default: 'linear', oneOf: ['linear', 'exponential']}
  },

  update: function () {
    var data = this.data;
    var el = this.el;
    var fog = this.el.object3D.fog;

    if (!el.isScene) {
      warn('Fog component can only be applied to <a-scene>');
      return;
    }

    // (Re)create fog if fog doesn't exist or fog type changed.
    if (!fog || data.type !== fog.name) {
      el.object3D.fog = getFog(data);
      el.systems.material.updateMaterials();
      return;
    }

    // Fog data changed. Update fog.
    Object.keys(this.schema).forEach(function (key) {
      var value = data[key];
      if (key === 'color') { value = new THREE.Color(value); }
      fog[key] = value;
    });
  },

  /**
   * Remove fog on remove (callback).
   */
  remove: function () {
    var fog = this.el.object3D.fog;
    if (!fog) { return; }
    fog.far = 0;
    fog.near = 0.1;
  }
});

/**
 * Creates a fog object. Sets fog.name to be able to detect fog type changes.
 *
 * @param {object} data - Fog data.
 * @returns {object} fog
 */
function getFog (data) {
  var fog;
  if (data.type === 'exponential') {
    fog = new THREE.FogExp2(data.color, data.density);
  } else {
    fog = new THREE.Fog(data.color, data.near, data.far);
  }
  fog.name = data.type;
  return fog;
}

},{"../../core/component":101,"../../lib/three":149,"../../utils/debug":170}],76:[function(_dereq_,module,exports){
(function (process){
/* global AFRAME */
var AFRAME_INJECTED = _dereq_('../../constants').AFRAME_INJECTED;
var pkg = _dereq_('../../../package');
var registerComponent = _dereq_('../../core/component').registerComponent;
var utils = _dereq_('../../utils/');

/**
 * 0.4.2 to 0.4.x
 * Will need to update this when A-Frame goes to 1.x.x.
 */
function getFuzzyPatchVersion (version) {
  var split = version.split('.');
  split[2] = 'x';
  return split.join('.');
}

var INSPECTOR_DEV_URL = 'https://aframe.io/aframe-inspector/dist/aframe-inspector.js';
var INSPECTOR_RELEASE_URL = 'https://unpkg.com/aframe-inspector@' + getFuzzyPatchVersion(pkg.version) + '/dist/aframe-inspector.min.js';
var INSPECTOR_URL = process.env.INSPECTOR_VERSION === 'dev' ? INSPECTOR_DEV_URL : INSPECTOR_RELEASE_URL;
var LOADING_MESSAGE = 'Loading Inspector';
var LOADING_ERROR_MESSAGE = 'Error loading Inspector';

module.exports.Component = registerComponent('inspector', {
  schema: {
    url: {default: INSPECTOR_URL}
  },

  init: function () {
    this.firstPlay = true;
    this.onKeydown = this.onKeydown.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.initOverlay();
    window.addEventListener('keydown', this.onKeydown);
    window.addEventListener('message', this.onMessage);
  },

  play: function () {
    var urlParam;
    if (!this.firstPlay) { return; }
    urlParam = utils.getUrlParameter('inspector');
    if (urlParam !== 'false' && !!urlParam) {
      this.openInspector();
      this.firstPlay = false;
    }
  },

  initOverlay: function () {
    var dotsHTML = '<span class="dots"><span>.</span><span>.</span><span>.</span></span>';
    this.loadingMessageEl = document.createElement('div');
    this.loadingMessageEl.classList.add('a-inspector-loader');
    this.loadingMessageEl.innerHTML = LOADING_MESSAGE + dotsHTML;
  },

  remove: function () {
    this.removeEventListeners();
  },

  /**
   * <ctrl> + <alt> + i keyboard shortcut.
   */
  onKeydown: function (evt) {
    var shortcutPressed = evt.keyCode === 73 && evt.ctrlKey && evt.altKey;
    if (!shortcutPressed) { return; }
    this.openInspector();
  },

  showLoader: function () {
    document.body.appendChild(this.loadingMessageEl);
  },

  hideLoader: function () {
    document.body.removeChild(this.loadingMessageEl);
  },

  /**
   * postMessage. aframe.io uses this to create a button on examples to open Inspector.
   */
  onMessage: function (evt) {
    if (evt.data === 'INJECT_AFRAME_INSPECTOR') { this.openInspector(); }
  },

  openInspector: function (focusEl) {
    var self = this;
    var script;

    // Already injected. Open.
    if (AFRAME.INSPECTOR || AFRAME.inspectorInjected) {
      AFRAME.INSPECTOR.open(focusEl);
      return;
    }

    this.showLoader();

    // Inject.
    script = document.createElement('script');
    script.src = this.data.url;
    script.setAttribute('data-name', 'aframe-inspector');
    script.setAttribute(AFRAME_INJECTED, '');
    script.onload = function () {
      AFRAME.INSPECTOR.open(focusEl);
      self.hideLoader();
      self.removeEventListeners();
    };
    script.onerror = function () {
      self.loadingMessageEl.innerHTML = LOADING_ERROR_MESSAGE;
    };
    document.head.appendChild(script);
    AFRAME.inspectorInjected = true;
  },

  removeEventListeners: function () {
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('message', this.onMessage);
  }
});

}).call(this,_dereq_('_process'))

},{"../../../package":49,"../../constants":93,"../../core/component":101,"../../utils/":174,"_process":6}],77:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../../core/component').registerComponent;
var shouldCaptureKeyEvent = _dereq_('../../utils/').shouldCaptureKeyEvent;

module.exports.Component = registerComponent('keyboard-shortcuts', {
  schema: {
    enterVR: {default: true},
    exitVR: {default: true}
  },

  init: function () {
    this.onKeyup = this.onKeyup.bind(this);
  },

  update: function (oldData) {
    var data = this.data;
    this.enterVREnabled = data.enterVR;
  },

  play: function () {
    window.addEventListener('keyup', this.onKeyup, false);
  },

  pause: function () {
    window.removeEventListener('keyup', this.onKeyup);
  },

  onKeyup: function (evt) {
    var scene = this.el;
    if (!shouldCaptureKeyEvent(evt)) { return; }
    if (this.enterVREnabled && evt.keyCode === 70) {  // f.
      scene.enterVR();
    }
    if (this.enterVREnabled && evt.keyCode === 27) {  // escape.
      scene.exitVR();
    }
  }
});

},{"../../core/component":101,"../../utils/":174}],78:[function(_dereq_,module,exports){
var debug = _dereq_('../../utils/debug');
var registerComponent = _dereq_('../../core/component').registerComponent;

var warn = debug('components:pool:warn');

/**
 * Pool component to reuse entities.
 * Avoids creating and destroying the same kind of entities.
 * Helps reduce GC pauses. For example in a game to reuse enemies entities.
 *
 * @member {array} availableEls - Available entities in the pool.
 * @member {array} usedEls - Entities of the pool in use.
 */
module.exports.Component = registerComponent('pool', {
  schema: {
    container: {default: ''},
    mixin: {default: ''},
    size: {default: 0},
    dynamic: {default: false}
  },

  multiple: true,

  initPool: function () {
    var i;

    this.availableEls = [];
    this.usedEls = [];

    if (!this.data.mixin) {
      warn('No mixin provided for pool component.');
    }

    if (this.data.container) {
      this.container = document.querySelector(this.data.container);
      if (!this.container) {
        warn('Container ' + this.data.container + ' not found.');
      }
    }
    this.container = this.container || this.el;

    for (i = 0; i < this.data.size; ++i) {
      this.createEntity();
    }
  },

  update: function (oldData) {
    var data = this.data;
    if (oldData.mixin !== data.mixin || oldData.size !== data.size) {
      this.initPool();
    }
  },

  /**
   * Add a new entity to the list of available entities.
   */
  createEntity: function () {
    var el;
    el = document.createElement('a-entity');
    el.play = this.wrapPlay(el.play);
    el.setAttribute('mixin', this.data.mixin);
    el.object3D.visible = false;
    el.pause();
    this.container.appendChild(el);
    this.availableEls.push(el);
  },

  /**
   * Play wrapper for pooled entities. When pausing and playing a scene, don't want to play
   * entities that are not in use.
   */
  wrapPlay: function (playMethod) {
    var usedEls = this.usedEls;
    return function () {
      if (usedEls.indexOf(this) === -1) { return; }
      playMethod.call(this);
    };
  },

  /**
   * Used to request one of the available entities of the pool.
   */
  requestEntity: function () {
    var el;
    if (this.availableEls.length === 0) {
      if (this.data.dynamic === false) {
        warn('Requested entity from empty pool: ' + this.attrName);
        return;
      } else {
        warn('Requested entity from empty pool. This pool is dynamic and will resize ' +
             'automatically. You might want to increase its initial size: ' + this.attrName);
      }
      this.createEntity();
    }
    el = this.availableEls.shift();
    this.usedEls.push(el);
    el.object3D.visible = true;
    return el;
  },

  /**
   * Used to return a used entity to the pool.
   */
  returnEntity: function (el) {
    var index = this.usedEls.indexOf(el);
    if (index === -1) {
      warn('The returned entity was not previously pooled from ' + this.attrName);
      return;
    }
    this.usedEls.splice(index, 1);
    this.availableEls.push(el);
    el.object3D.visible = false;
    el.pause();
    return el;
  }
});

},{"../../core/component":101,"../../utils/debug":170}],79:[function(_dereq_,module,exports){
/* global ImageData, URL */
var registerComponent = _dereq_('../../core/component').registerComponent;
var THREE = _dereq_('../../lib/three');

var VERTEX_SHADER = [
  'attribute vec3 position;',
  'attribute vec2 uv;',
  'uniform mat4 projectionMatrix;',
  'uniform mat4 modelViewMatrix;',
  'varying vec2 vUv;',
  'void main()  {',
  '  vUv = vec2( 1.- uv.x, uv.y );',
  '  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
  '}'
].join('\n');

var FRAGMENT_SHADER = [
  'precision mediump float;',
  'uniform samplerCube map;',
  'varying vec2 vUv;',
  '#define M_PI 3.141592653589793238462643383279',
  'void main() {',
  '  vec2 uv = vUv;',
  '  float longitude = uv.x * 2. * M_PI - M_PI + M_PI / 2.;',
  '  float latitude = uv.y * M_PI;',
  '  vec3 dir = vec3(',
  '    - sin( longitude ) * sin( latitude ),',
  '    cos( latitude ),',
  '    - cos( longitude ) * sin( latitude )',
  '  );',
  '  normalize( dir );',
  '  gl_FragColor = vec4( textureCube( map, dir ).rgb, 1.0 );',
  '}'
].join('\n');

/**
 * Component to take screenshots of the scene using a keboard shortcut (alt+s).
 * It can be configured to either take 360&deg; captures (`equirectangular`)
 * or regular screenshots (`projection`)
 *
 * This is based on https://github.com/spite/THREE.CubemapToEquirectangular
 * To capture an equirectangular projection of the scene a THREE.CubeCamera is used
 * The cube map produced by the CubeCamera is projected on a quad and then rendered to
 * WebGLRenderTarget with an ortographic camera.
 */
module.exports.Component = registerComponent('screenshot', {
  schema: {
    width: {default: 4096},
    height: {default: 2048},
    camera: {type: 'selector'}
  },

  init: function () {
    var el = this.el;
    var self = this;

    if (el.renderer) {
      setup();
    } else {
      el.addEventListener('render-target-loaded', setup);
    }

    function setup () {
      var gl = el.renderer.getContext();
      if (!gl) { return; }
      self.cubeMapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
      self.material = new THREE.RawShaderMaterial({
        uniforms: {map: {type: 't', value: null}},
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        side: THREE.DoubleSide
      });
      self.quad = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1, 1),
        self.material
      );
      self.quad.visible = false;
      self.camera = new THREE.OrthographicCamera(-1 / 2, 1 / 2, 1 / 2, -1 / 2, -10000, 10000);
      self.canvas = document.createElement('canvas');
      self.ctx = self.canvas.getContext('2d');
      el.object3D.add(self.quad);
      self.onKeyDown = self.onKeyDown.bind(self);
    }
  },

  getRenderTarget: function (width, height) {
    return new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType
    });
  },

  resize: function (width, height) {
    // Resize quad.
    this.quad.scale.set(width, height, 1);

    // Resize camera.
    this.camera.left = -1 * width / 2;
    this.camera.right = width / 2;
    this.camera.top = height / 2;
    this.camera.bottom = -1 * height / 2;
    this.camera.updateProjectionMatrix();

    // Resize canvas.
    this.canvas.width = width;
    this.canvas.height = height;
  },

  play: function () {
    window.addEventListener('keydown', this.onKeyDown);
  },

  /**
   * <ctrl> + <alt> + s = Regular screenshot.
   * <ctrl> + <alt> + <shift> + s = Equirectangular screenshot.
  */
  onKeyDown: function (evt) {
    var shortcutPressed = evt.keyCode === 83 && evt.ctrlKey && evt.altKey;
    if (!this.data || !shortcutPressed) { return; }
    var projection = evt.shiftKey ? 'equirectangular' : 'perspective';
    this.capture(projection);
  },

  /**
   * Capture a screenshot of the scene.
   *
   * @param {string} projection - Screenshot projection (equirectangular or perspective).
   */
  setCapture: function (projection) {
    var el = this.el;
    var size;
    var camera;
    var cubeCamera;
    // Configure camera.
    if (projection === 'perspective') {
      // Quad is only used in equirectangular mode. Hide it in this case.
      this.quad.visible = false;
      // Use scene camera.
      camera = (this.data.camera && this.data.camera.components.camera.camera) || el.camera;
      size = {width: this.data.width, height: this.data.height};
    } else {
      // Use ortho camera.
      camera = this.camera;
      // Create cube camera and copy position from scene camera.
      cubeCamera = new THREE.CubeCamera(el.camera.near, el.camera.far,
                                        Math.min(this.cubeMapSize, 2048));
      // Copy camera position into cube camera;
      el.camera.getWorldPosition(cubeCamera.position);
      el.camera.getWorldQuaternion(cubeCamera.quaternion);
      // Render scene with cube camera.
      cubeCamera.update(el.renderer, el.object3D);
      this.quad.material.uniforms.map.value = cubeCamera.renderTarget.texture;
      size = {width: this.data.width, height: this.data.height};
      // Use quad to project image taken by the cube camera.
      this.quad.visible = true;
    }
    return {
      camera: camera,
      size: size,
      projection: projection
    };
  },

  /**
   * Maintained for backwards compatibility.
   */
  capture: function (projection) {
    var isVREnabled = this.el.renderer.vr.enabled;
    var renderer = this.el.renderer;
    var params;
    // Disable VR.
    renderer.vr.enabled = false;
    params = this.setCapture(projection);
    this.renderCapture(params.camera, params.size, params.projection);
    // Trigger file download.
    this.saveCapture();
    // Restore VR.
    renderer.vr.enabled = isVREnabled;
  },

  /**
   * Return canvas instead of triggering download (e.g., for uploading blob to server).
   */
  getCanvas: function (projection) {
    var params = this.setCapture(projection);
    this.renderCapture(params.camera, params.size, params.projection);
    return this.canvas;
  },

  renderCapture: function (camera, size, projection) {
    var autoClear = this.el.renderer.autoClear;
    var el = this.el;
    var imageData;
    var output;
    var pixels;
    var renderer = el.renderer;
    // Create rendering target and buffer to store the read pixels.
    output = this.getRenderTarget(size.width, size.height);
    pixels = new Uint8Array(4 * size.width * size.height);
    // Resize quad, camera, and canvas.
    this.resize(size.width, size.height);
    // Render scene to render target.
    renderer.autoClear = true;
    renderer.render(el.object3D, camera, output, true);
    renderer.autoClear = autoClear;
    // Read image pizels back.
    renderer.readRenderTargetPixels(output, 0, 0, size.width, size.height, pixels);
    if (projection === 'perspective') {
      pixels = this.flipPixelsVertically(pixels, size.width, size.height);
    }
    imageData = new ImageData(new Uint8ClampedArray(pixels), size.width, size.height);
    // Hide quad after projecting the image.
    this.quad.visible = false;
    // Copy pixels into canvas.
    this.ctx.putImageData(imageData, 0, 0);
  },

  flipPixelsVertically: function (pixels, width, height) {
    var flippedPixels = pixels.slice(0);
    for (var x = 0; x < width; ++x) {
      for (var y = 0; y < height; ++y) {
        flippedPixels[x * 4 + y * width * 4] = pixels[x * 4 + (height - y) * width * 4];
        flippedPixels[x * 4 + 1 + y * width * 4] = pixels[x * 4 + 1 + (height - y) * width * 4];
        flippedPixels[x * 4 + 2 + y * width * 4] = pixels[x * 4 + 2 + (height - y) * width * 4];
        flippedPixels[x * 4 + 3 + y * width * 4] = pixels[x * 4 + 3 + (height - y) * width * 4];
      }
    }
    return flippedPixels;
  },

  /**
   * Download capture to file.
   */
  saveCapture: function () {
    this.canvas.toBlob(function (blob) {
      var fileName = 'screenshot-' + document.title.toLowerCase() + '-' + Date.now() + '.png';
      var linkEl = document.createElement('a');
      var url = URL.createObjectURL(blob);
      linkEl.href = url;
      linkEl.setAttribute('download', fileName);
      linkEl.innerHTML = 'downloading...';
      linkEl.style.display = 'none';
      document.body.appendChild(linkEl);
      setTimeout(function () {
        linkEl.click();
        document.body.removeChild(linkEl);
      }, 1);
    }, 'image/png');
  }
});

},{"../../core/component":101,"../../lib/three":149}],80:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../../core/component').registerComponent;
var RStats = _dereq_('../../../vendor/rStats');
var utils = _dereq_('../../utils');
_dereq_('../../../vendor/rStats.extras');
_dereq_('../../lib/rStatsAframe');

var AFrameStats = window.aframeStats;
var bind = utils.bind;
var HIDDEN_CLASS = 'a-hidden';
var ThreeStats = window.threeStats;

/**
 * Stats appended to document.body by RStats.
 */
module.exports.Component = registerComponent('stats', {
  schema: {default: true},

  init: function () {
    var scene = this.el;

    if (utils.getUrlParameter('stats') === 'false') { return; }

    this.stats = createStats(scene);
    this.statsEl = document.querySelector('.rs-base');

    this.hideBound = bind(this.hide, this);
    this.showBound = bind(this.show, this);

    scene.addEventListener('enter-vr', this.hideBound);
    scene.addEventListener('exit-vr', this.showBound);
  },

  update: function () {
    if (!this.stats) { return; }
    return (!this.data) ? this.hide() : this.show();
  },

  remove: function () {
    this.el.removeEventListener('enter-vr', this.hideBound);
    this.el.removeEventListener('exit-vr', this.showBound);
    if (!this.statsEl) { return; }  // Scene detached.
    this.statsEl.parentNode.removeChild(this.statsEl);
  },

  tick: function () {
    var stats = this.stats;

    if (!stats) { return; }

    stats('rAF').tick();
    stats('FPS').frame();
    stats().update();
  },

  hide: function () {
    this.statsEl.classList.add(HIDDEN_CLASS);
  },

  show: function () {
    this.statsEl.classList.remove(HIDDEN_CLASS);
  }
});

function createStats (scene) {
  var threeStats = new ThreeStats(scene.renderer);
  var aframeStats = new AFrameStats(scene);
  var plugins = scene.isMobile ? [] : [threeStats, aframeStats];
  return new RStats({
    css: [],  // Our stylesheet is injected from `src/index.js`.
    values: {
      fps: {caption: 'fps', below: 30}
    },
    groups: [
      {caption: 'Framerate', values: ['fps', 'raf']}
    ],
    plugins: plugins
  });
}

},{"../../../vendor/rStats":184,"../../../vendor/rStats.extras":183,"../../core/component":101,"../../lib/rStatsAframe":148,"../../utils":174}],81:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../../core/component').registerComponent;
var constants = _dereq_('../../constants/');
var utils = _dereq_('../../utils/');
var bind = utils.bind;

var ENTER_VR_CLASS = 'a-enter-vr';
var ENTER_VR_BTN_CLASS = 'a-enter-vr-button';
var HIDDEN_CLASS = 'a-hidden';
var ORIENTATION_MODAL_CLASS = 'a-orientation-modal';

/**
 * UI for entering VR mode.
 */
module.exports.Component = registerComponent('vr-mode-ui', {
  dependencies: ['canvas'],

  schema: {
    enabled: {default: true},
    enterVRButton: {default: ''}
  },

  init: function () {
    var self = this;
    var sceneEl = this.el;

    if (utils.getUrlParameter('ui') === 'false') { return; }

    this.insideLoader = false;
    this.enterVREl = null;
    this.orientationModalEl = null;
    this.bindMethods();

    // Hide/show VR UI when entering/exiting VR mode.
    sceneEl.addEventListener('enter-vr', this.updateEnterVRInterface);
    sceneEl.addEventListener('exit-vr', this.updateEnterVRInterface);

    window.addEventListener('message', function (event) {
      if (event.data.type === 'loaderReady') {
        self.insideLoader = true;
        self.remove();
      }
    });

    // Modal that tells the user to change orientation if in portrait.
    window.addEventListener('orientationchange', this.toggleOrientationModalIfNeeded);
  },

  bindMethods: function () {
    this.onEnterVRButtonClick = bind(this.onEnterVRButtonClick, this);
    this.onModalClick = bind(this.onModalClick, this);
    this.toggleOrientationModalIfNeeded = bind(this.toggleOrientationModalIfNeeded, this);
    this.updateEnterVRInterface = bind(this.updateEnterVRInterface, this);
  },

  /**
   * Exit VR when modal clicked.
   */
  onModalClick: function () {
    this.el.exitVR();
  },

  /**
   * Enter VR when modal clicked.
   */
  onEnterVRButtonClick: function () {
    this.el.enterVR();
  },

  update: function () {
    var data = this.data;
    var sceneEl = this.el;

    if (!data.enabled || this.insideLoader || utils.getUrlParameter('ui') === 'false') {
      return this.remove();
    }
    if (this.enterVREl || this.orientationModalEl) { return; }

    // Add UI if enabled and not already present.
    if (data.enterVRButton) {
      // Custom button.
      this.enterVREl = document.querySelector(data.enterVRButton);
      this.enterVREl.addEventListener('click', this.onEnterVRButtonClick);
    } else {
      this.enterVREl = createEnterVRButton(this.onEnterVRButtonClick);
      sceneEl.appendChild(this.enterVREl);
    }

    this.orientationModalEl = createOrientationModal(this.onModalClick);
    sceneEl.appendChild(this.orientationModalEl);

    this.updateEnterVRInterface();
  },

  remove: function () {
    [this.enterVREl, this.orientationModalEl].forEach(function (uiElement) {
      if (uiElement && uiElement.parentNode) {
        uiElement.parentNode.removeChild(uiElement);
      }
    });
  },

  updateEnterVRInterface: function () {
    this.toggleEnterVRButtonIfNeeded();
    this.toggleOrientationModalIfNeeded();
  },

  toggleEnterVRButtonIfNeeded: function () {
    var sceneEl = this.el;
    if (!this.enterVREl) { return; }
    if (sceneEl.is('vr-mode')) {
      this.enterVREl.classList.add(HIDDEN_CLASS);
    } else {
      this.enterVREl.classList.remove(HIDDEN_CLASS);
    }
  },

  toggleOrientationModalIfNeeded: function () {
    var sceneEl = this.el;
    var orientationModalEl = this.orientationModalEl;
    if (!orientationModalEl || !sceneEl.isMobile) { return; }
    if (!utils.device.isLandscape() && sceneEl.is('vr-mode')) {
      // Show if in VR mode on portrait.
      orientationModalEl.classList.remove(HIDDEN_CLASS);
    } else {
      orientationModalEl.classList.add(HIDDEN_CLASS);
    }
  }
});

/**
 * Create a button that when clicked will enter into stereo-rendering mode for VR.
 *
 * Structure: <div><button></div>
 *
 * @param {function} onClick - click event handler
 * @returns {Element} Wrapper <div>.
 */
function createEnterVRButton (onClick) {
  var vrButton;
  var wrapper;

  // Create elements.
  wrapper = document.createElement('div');
  wrapper.classList.add(ENTER_VR_CLASS);
  wrapper.setAttribute(constants.AFRAME_INJECTED, '');
  vrButton = document.createElement('button');
  vrButton.className = ENTER_VR_BTN_CLASS;
  vrButton.setAttribute('title',
    'Enter VR mode with a headset or fullscreen mode on a desktop. ' +
    'Visit https://webvr.rocks or https://webvr.info for more information.');
  vrButton.setAttribute(constants.AFRAME_INJECTED, '');

  // Insert elements.
  wrapper.appendChild(vrButton);
  vrButton.addEventListener('click', function (evt) {
    onClick();
    evt.stopPropagation();
  });
  return wrapper;
}

/**
 * Creates a modal dialog to request the user to switch to landscape orientation.
 *
 * @param {function} onClick - click event handler
 * @returns {Element} Wrapper <div>.
 */
function createOrientationModal (onClick) {
  var modal = document.createElement('div');
  modal.className = ORIENTATION_MODAL_CLASS;
  modal.classList.add(HIDDEN_CLASS);
  modal.setAttribute(constants.AFRAME_INJECTED, '');

  var exit = document.createElement('button');
  exit.setAttribute(constants.AFRAME_INJECTED, '');
  exit.innerHTML = 'Exit VR';

  // Exit VR on close.
  exit.addEventListener('click', onClick);

  modal.appendChild(exit);

  return modal;
}

},{"../../constants/":93,"../../core/component":101,"../../utils/":174}],82:[function(_dereq_,module,exports){
var component = _dereq_('../core/component');
var THREE = _dereq_('../lib/three');
var bind = _dereq_('../utils/bind');
var registerComponent = component.registerComponent;

/**
 * Shadow component.
 *
 * When applied to an entity, that entity's geometry and any descendants will cast or receive
 * shadows as specified by the `cast` and `receive` properties.
 */
module.exports.Component = registerComponent('shadow', {
  schema: {
    cast: {default: true},
    receive: {default: true}
  },

  init: function () {
    this.onMeshChanged = bind(this.update, this);
    this.el.addEventListener('object3dset', this.onMeshChanged);
    this.system.setShadowMapEnabled(true);
  },

  update: function () {
    var data = this.data;
    this.updateDescendants(data.cast, data.receive);
  },

  remove: function () {
    var el = this.el;
    el.removeEventListener('object3dset', this.onMeshChanged);
    this.updateDescendants(false, false);
  },

  updateDescendants: function (cast, receive) {
    var sceneEl = this.el.sceneEl;
    this.el.object3D.traverse(function (node) {
      if (!(node instanceof THREE.Mesh)) { return; }

      node.castShadow = cast;
      node.receiveShadow = receive;

      // If scene has already rendered, materials must be updated.
      if (sceneEl.hasLoaded && node.material) {
        var materials = Array.isArray(node.material) ? node.material : [node.material];
        for (var i = 0; i < materials.length; i++) {
          materials[i].needsUpdate = true;
        }
      }
    });
  }
});

},{"../core/component":101,"../lib/three":149,"../utils/bind":168}],83:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;
var debug = _dereq_('../utils/debug');
var THREE = _dereq_('../lib/three');

var warn = debug('components:sound:warn');

/**
 * Sound component.
 */
module.exports.Component = registerComponent('sound', {
  schema: {
    autoplay: {default: false},
    distanceModel: {default: 'inverse', oneOf: ['linear', 'inverse', 'exponential']},
    loop: {default: false},
    maxDistance: {default: 10000},
    on: {default: ''},
    poolSize: {default: 1},
    positional: {default: true},
    refDistance: {default: 1},
    rolloffFactor: {default: 1},
    src: {type: 'audio'},
    volume: {default: 1}
  },

  multiple: true,

  init: function () {
    var self = this;

    this.listener = null;
    this.audioLoader = new THREE.AudioLoader();
    this.pool = new THREE.Group();
    this.loaded = false;
    this.mustPlay = false;

    // Don't pass evt because playSound takes a function as parameter.
    this.playSoundBound = function () { self.playSound(); };
  },

  update: function (oldData) {
    var data = this.data;
    var i;
    var sound;
    var srcChanged = data.src !== oldData.src;

    // Create new sound if not yet created or changing `src`.
    if (srcChanged) {
      if (!data.src) { return; }
      this.setupSound();
    }

    for (i = 0; i < this.pool.children.length; i++) {
      sound = this.pool.children[i];
      if (data.positional) {
        sound.setDistanceModel(data.distanceModel);
        sound.setMaxDistance(data.maxDistance);
        sound.setRefDistance(data.refDistance);
        sound.setRolloffFactor(data.rolloffFactor);
      }
      sound.setLoop(data.loop);
      sound.setVolume(data.volume);
      sound.isPaused = false;
    }

    if (data.on !== oldData.on) {
      this.updateEventListener(oldData.on);
    }

    // All sound values set. Load in `src`.
    if (srcChanged) {
      var self = this;

      this.loaded = false;
      this.audioLoader.load(data.src, function (buffer) {
        for (i = 0; i < self.pool.children.length; i++) {
          sound = self.pool.children[i];
          sound.setBuffer(buffer);
        }
        self.loaded = true;

        // Remove this key from cache, otherwise we can't play it again
        THREE.Cache.remove(data.src);
        if (self.data.autoplay || self.mustPlay) { self.playSound(); }
        self.el.emit('sound-loaded', self.evtDetail, false);
      });
    }
  },

  pause: function () {
    this.stopSound();
    this.removeEventListener();
  },

  play: function () {
    if (this.data.autoplay) { this.playSound(); }
    this.updateEventListener();
  },

  remove: function () {
    var i;
    var sound;

    this.removeEventListener();

    if (this.el.getObject3D(this.attrName)) {
      this.el.removeObject3D(this.attrName);
    }

    try {
      for (i = 0; i < this.pool.children.length; i++) {
        sound = this.pool.children[i];
        sound.disconnect();
      }
    } catch (e) {
      // disconnect() will throw if it was never connected initially.
      warn('Audio source not properly disconnected');
    }
  },

  /**
  *  Update listener attached to the user defined on event.
  */
  updateEventListener: function (oldEvt) {
    var el = this.el;
    if (oldEvt) { el.removeEventListener(oldEvt, this.playSoundBound); }
    el.addEventListener(this.data.on, this.playSoundBound);
  },

  removeEventListener: function () {
    this.el.removeEventListener(this.data.on, this.playSoundBound);
  },

  /**
   * Removes current sound object, creates new sound object, adds to entity.
   *
   * @returns {object} sound
   */
  setupSound: function () {
    var self = this;
    var el = this.el;
    var i;
    var sceneEl = el.sceneEl;
    var sound;

    if (this.pool.children.length > 0) {
      this.stopSound();
      el.removeObject3D('sound');
    }

    // Only want one AudioListener. Cache it on the scene.
    var listener = this.listener = sceneEl.audioListener || new THREE.AudioListener();
    sceneEl.audioListener = listener;

    if (sceneEl.camera) {
      sceneEl.camera.add(listener);
    }

    // Wait for camera if necessary.
    sceneEl.addEventListener('camera-set-active', function (evt) {
      evt.detail.cameraEl.getObject3D('camera').add(listener);
    });

    // Create [poolSize] audio instances and attach them to pool
    this.pool = new THREE.Group();
    for (i = 0; i < this.data.poolSize; i++) {
      sound = this.data.positional
        ? new THREE.PositionalAudio(listener)
        : new THREE.Audio(listener);
      this.pool.add(sound);
    }
    el.setObject3D(this.attrName, this.pool);

    for (i = 0; i < this.pool.children.length; i++) {
      sound = this.pool.children[i];
      sound.onEnded = function () {
        this.isPlaying = false;
        el.emit('sound-ended', self.evtDetail, false);
      };
    }
  },

  /**
   * Pause all the sounds in the pool.
   */
  pauseSound: function () {
    var i;
    var sound;

    this.isPlaying = false;
    for (i = 0; i < this.pool.children.length; i++) {
      sound = this.pool.children[i];
      if (!sound.source || !sound.source.buffer || !sound.isPlaying || sound.isPaused) {
        continue;
      }
      sound.isPaused = true;
      sound.pause();
    }
  },

  /**
   * Look for an unused sound in the pool and play it if found.
   */
  playSound: function (processSound) {
    var found;
    var i;
    var sound;

    if (!this.loaded) {
      warn('Sound not loaded yet. It will be played once it finished loading');
      this.mustPlay = true;
      return;
    }

    found = false;
    this.isPlaying = true;
    for (i = 0; i < this.pool.children.length; i++) {
      sound = this.pool.children[i];
      if (!sound.isPlaying && sound.buffer && !found) {
        if (processSound) { processSound(sound); }
        sound.play();
        sound.isPaused = false;
        found = true;
        continue;
      }
    }

    if (!found) {
      warn('All the sounds are playing. If you need to play more sounds simultaneously ' +
           'consider increasing the size of pool with the `poolSize` attribute.', this.el);
      return;
    }

    this.mustPlay = false;
  },

  /**
   * Stop all the sounds in the pool.
   */
  stopSound: function () {
    var i;
    var sound;
    this.isPlaying = false;
    for (i = 0; i < this.pool.children.length; i++) {
      sound = this.pool.children[i];
      if (!sound.source || !sound.source.buffer) { return; }
      sound.stop();
    }
  }
});

},{"../core/component":101,"../lib/three":149,"../utils/debug":170}],84:[function(_dereq_,module,exports){
var createTextGeometry = _dereq_('three-bmfont-text');
var loadBMFont = _dereq_('load-bmfont');

var registerComponent = _dereq_('../core/component').registerComponent;
var coreShader = _dereq_('../core/shader');
var THREE = _dereq_('../lib/three');
var utils = _dereq_('../utils/');

var error = utils.debug('components:text:error');
var shaders = coreShader.shaders;
var warn = utils.debug('components:text:warn');

// 1 to match other A-Frame default widths.
var DEFAULT_WIDTH = 1;

// @bryik set anisotropy to 16. Improves look of large amounts of text when viewed from angle.
var MAX_ANISOTROPY = 16;

var FONT_BASE_URL = 'https://cdn.aframe.io/fonts/';
var FONTS = {
  aileronsemibold: FONT_BASE_URL + 'Aileron-Semibold.fnt',
  dejavu: FONT_BASE_URL + 'DejaVu-sdf.fnt',
  exo2bold: FONT_BASE_URL + 'Exo2Bold.fnt',
  exo2semibold: FONT_BASE_URL + 'Exo2SemiBold.fnt',
  kelsonsans: FONT_BASE_URL + 'KelsonSans.fnt',
  monoid: FONT_BASE_URL + 'Monoid.fnt',
  mozillavr: FONT_BASE_URL + 'mozillavr.fnt',
  roboto: FONT_BASE_URL + 'Roboto-msdf.json',
  sourcecodepro: FONT_BASE_URL + 'SourceCodePro.fnt'
};
var MSDF_FONTS = ['roboto'];
var DEFAULT_FONT = 'roboto';
module.exports.FONTS = FONTS;

var cache = new PromiseCache();
var fontWidthFactors = {};
var textures = {};

// Regular expression for detecting a URLs with a protocol prefix.
var protocolRe = /^\w+:/;

/**
 * SDF-based text component.
 * Based on https://github.com/Jam3/three-bmfont-text.
 *
 * All the stock fonts are for the `sdf` registered shader, an improved version of jam3's
 * original `sdf` shader.
 */
module.exports.Component = registerComponent('text', {
  multiple: true,

  schema: {
    align: {type: 'string', default: 'left', oneOf: ['left', 'right', 'center']},
    alphaTest: {default: 0.5},
    // `anchor` defaults to center to match geometries.
    anchor: {default: 'center', oneOf: ['left', 'right', 'center', 'align']},
    baseline: {default: 'center', oneOf: ['top', 'center', 'bottom']},
    color: {type: 'color', default: '#FFF'},
    font: {type: 'string', default: DEFAULT_FONT},
    // `fontImage` defaults to the font name as a .png (e.g., mozillavr.fnt -> mozillavr.png).
    fontImage: {type: 'string'},
    // `height` has no default, will be populated at layout.
    height: {type: 'number'},
    letterSpacing: {type: 'number', default: 0},
    // `lineHeight` defaults to font's `lineHeight` value.
    lineHeight: {type: 'number'},
    // `negate` must be true for fonts generated with older versions of msdfgen (white background).
    negate: {type: 'boolean', default: true},
    opacity: {type: 'number', default: 1.0},
    shader: {default: 'sdf', oneOf: shaders},
    side: {default: 'front', oneOf: ['front', 'back', 'double']},
    tabSize: {default: 4},
    transparent: {default: true},
    value: {type: 'string'},
    whiteSpace: {default: 'normal', oneOf: ['normal', 'pre', 'nowrap']},
    // `width` defaults to geometry width if present, else `DEFAULT_WIDTH`.
    width: {type: 'number'},
    // `wrapCount` units are about one default font character. Wrap roughly at this number.
    wrapCount: {type: 'number', default: 40},
    // `wrapPixels` will wrap using bmfont pixel units (e.g., dejavu's is 32 pixels).
    wrapPixels: {type: 'number'},
    // `xOffset` to add padding.
    xOffset: {type: 'number', default: 0},
    // `yOffset` to adjust generated fonts from tools that may have incorrect metrics.
    yOffset: {type: 'number', default: 0},
    // `zOffset` will provide a small z offset to avoid z-fighting.
    zOffset: {type: 'number', default: 0.001}
  },

  init: function () {
    this.shaderData = {};
    this.geometry = createTextGeometry();
    this.createOrUpdateMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.el.setObject3D(this.attrName, this.mesh);
  },

  update: function (oldData) {
    var data = this.data;
    var font = this.currentFont;

    if (textures[data.font]) {
      this.texture = textures[data.font];
    } else {
      // Create texture per font.
      this.texture = textures[data.font] = new THREE.Texture();
      this.texture.anisotropy = MAX_ANISOTROPY;
    }

    // Update material.
    this.createOrUpdateMaterial();

    // New font. `updateFont` will later change data and layout.
    if (oldData.font !== data.font) {
      this.updateFont();
      return;
    }

    // Update geometry and layout.
    if (font) {
      this.updateGeometry(this.geometry, font);
      this.updateLayout();
    }
  },

  /**
   * Clean up geometry, material, texture, mesh, objects.
   */
  remove: function () {
    this.geometry.dispose();
    this.geometry = null;
    this.el.removeObject3D(this.attrName);
    this.material.dispose();
    this.material = null;
    this.texture.dispose();
    this.texture = null;
    if (this.shaderObject) {
      delete this.shaderObject;
    }
  },

  /**
   * Update the shader of the material.
   */
  createOrUpdateMaterial: function () {
    var data = this.data;
    var hasChangedShader;
    var material = this.material;
    var NewShader;
    var shaderData = this.shaderData;
    var shaderName;

    // Infer shader if using a stock font (or from `-msdf` filename convention).
    shaderName = data.shader;
    if (MSDF_FONTS.indexOf(data.font) !== -1 || data.font.indexOf('-msdf.') >= 0) {
      shaderName = 'msdf';
    } else if (data.font in FONTS && MSDF_FONTS.indexOf(data.font) === -1) {
      shaderName = 'sdf';
    }

    hasChangedShader = (this.shaderObject && this.shaderObject.name) !== shaderName;

    shaderData.alphaTest = data.alphaTest;
    shaderData.color = data.color;
    shaderData.map = this.texture;
    shaderData.opacity = data.opacity;
    shaderData.side = parseSide(data.side);
    shaderData.transparent = data.transparent;
    shaderData.negate = data.negate;

    // Shader has not changed, do an update.
    if (!hasChangedShader) {
      // Update shader material.
      this.shaderObject.update(shaderData);
      // Apparently, was not set on `init` nor `update`.
      material.transparent = shaderData.transparent;
      material.side = shaderData.side;
      return;
    }

    // Shader has changed. Create a shader material.
    NewShader = createShader(this.el, shaderName, shaderData);
    this.material = NewShader.material;
    this.shaderObject = NewShader.shader;

    // Set new shader material.
    this.material.side = shaderData.side;
    if (this.mesh) { this.mesh.material = this.material; }
  },

  /**
   * Load font for geometry, load font image for material, and apply.
   */
  updateFont: function () {
    var data = this.data;
    var el = this.el;
    var fontSrc;
    var geometry = this.geometry;
    var self = this;

    if (!data.font) { warn('No font specified. Using the default font.'); }

    // Make invisible during font swap.
    this.mesh.visible = false;

    // Look up font URL to use, and perform cached load.
    fontSrc = this.lookupFont(data.font || DEFAULT_FONT) || data.font;
    cache.get(fontSrc, function doLoadFont () {
      return loadFont(fontSrc, data.yOffset);
    }).then(function setFont (font) {
      var fontImgSrc;

      if (font.pages.length !== 1) {
        throw new Error('Currently only single-page bitmap fonts are supported.');
      }

      if (!fontWidthFactors[fontSrc]) {
        font.widthFactor = fontWidthFactors[font] = computeFontWidthFactor(font);
      }

      // Update geometry given font metrics.
      self.updateGeometry(geometry, font);

      // Set font and update layout.
      self.currentFont = font;
      self.updateLayout();

      // Look up font image URL to use, and perform cached load.
      fontImgSrc = self.getFontImageSrc();
      cache.get(fontImgSrc, function () {
        return loadTexture(fontImgSrc);
      }).then(function (image) {
        // Make mesh visible and apply font image as texture.
        var texture = self.texture;
        texture.image = image;
        texture.needsUpdate = true;
        textures[data.font] = texture;
        self.texture = texture;
        self.mesh.visible = true;
        el.emit('textfontset', {font: data.font, fontObj: font});
      }).catch(function (err) {
        error(err.message);
        error(err.stack);
      });
    }).catch(function (err) {
      error(err.message);
      error(err.stack);
    });
  },

  getFontImageSrc: function () {
    if (this.data.fontImage) { return this.data.fontImage; }
    var fontSrc = this.lookupFont(this.data.font || DEFAULT_FONT) || this.data.font;
    var imageSrc = this.currentFont.pages[0];
    // If the image URL contains a non-HTTP(S) protocol, assume it's an absolute
    // path on disk and try to infer the path from the font source instead.
    if (imageSrc.match(protocolRe) && imageSrc.indexOf('http') !== 0) {
      return fontSrc.replace(/(\.fnt)|(\.json)/, '.png');
    }
    return THREE.LoaderUtils.extractUrlBase(fontSrc) + imageSrc;
  },

  /**
   * Update layout with anchor, alignment, baseline, and considering any meshes.
   */
  updateLayout: function () {
    var anchor;
    var baseline;
    var el = this.el;
    var data = this.data;
    var geometry = this.geometry;
    var geometryComponent;
    var height;
    var layout;
    var mesh = this.mesh;
    var textRenderWidth;
    var textScale;
    var width;
    var x;
    var y;

    if (!geometry.layout) { return; }

    // Determine width to use (defined width, geometry's width, or default width).
    geometryComponent = el.getAttribute('geometry');
    width = data.width || (geometryComponent && geometryComponent.width) || DEFAULT_WIDTH;

    // Determine wrap pixel count. Either specified or by experimental fudge factor.
    // Note that experimental factor will never be correct for variable width fonts.
    textRenderWidth = computeWidth(data.wrapPixels, data.wrapCount,
                                   this.currentFont.widthFactor);
    textScale = width / textRenderWidth;

    // Determine height to use.
    layout = geometry.layout;
    height = textScale * (layout.height + layout.descender);

    // Update geometry dimensions to match text layout if width and height are set to 0.
    // For example, scales a plane to fit text.
    if (geometryComponent && geometryComponent.primitive === 'plane') {
      if (!geometryComponent.width) { el.setAttribute('geometry', 'width', width); }
      if (!geometryComponent.height) { el.setAttribute('geometry', 'height', height); }
    }

    // Calculate X position to anchor text left, center, or right.
    anchor = data.anchor === 'align' ? data.align : data.anchor;
    if (anchor === 'left') {
      x = 0;
    } else if (anchor === 'right') {
      x = -1 * layout.width;
    } else if (anchor === 'center') {
      x = -1 * layout.width / 2;
    } else {
      throw new TypeError('Invalid text.anchor property value', anchor);
    }

    // Calculate Y position to anchor text top, center, or bottom.
    baseline = data.baseline;
    if (baseline === 'bottom') {
      y = 0;
    } else if (baseline === 'top') {
      y = -1 * layout.height + layout.ascender;
    } else if (baseline === 'center') {
      y = -1 * layout.height / 2;
    } else {
      throw new TypeError('Invalid text.baseline property value', baseline);
    }

    // Position and scale mesh to apply layout.
    mesh.position.x = x * textScale + data.xOffset;
    mesh.position.y = y * textScale;
    // Place text slightly in front to avoid Z-fighting.
    mesh.position.z = data.zOffset;
    mesh.scale.set(textScale, -1 * textScale, textScale);
  },

  /**
   * Grab font from the constant.
   * Set as a method for test stubbing purposes.
   */
  lookupFont: function (key) {
    return FONTS[key];
  },

  /**
   * Update the text geometry using `three-bmfont-text.update`.
   */
  updateGeometry: (function () {
    var geometryUpdateBase = {};
    var geometryUpdateData = {};
    var newLineRegex = /\\n/g;
    var tabRegex = /\\t/g;

    return function (geometry, font) {
      var data = this.data;

      geometryUpdateData.font = font;
      geometryUpdateData.lineHeight = data.lineHeight && isFinite(data.lineHeight)
        ? data.lineHeight
        : font.common.lineHeight;
      geometryUpdateData.text = data.value.toString().replace(newLineRegex, '\n')
                                                     .replace(tabRegex, '\t');
      geometryUpdateData.width = computeWidth(data.wrapPixels, data.wrapCount,
                                              font.widthFactor);
      geometry.update(utils.extend(geometryUpdateBase, data, geometryUpdateData));
    };
  })()
});

/**
 * Due to using negative scale, we return the opposite side specified.
 * https://github.com/mrdoob/three.js/pull/12787/
 */
function parseSide (side) {
  switch (side) {
    case 'back': {
      return THREE.FrontSide;
    }
    case 'double': {
      return THREE.DoubleSide;
    }
    default: {
      return THREE.BackSide;
    }
  }
}

/**
 * @returns {Promise}
 */
function loadFont (src, yOffset) {
  return new Promise(function (resolve, reject) {
    loadBMFont(src, function (err, font) {
      if (err) {
        error('Error loading font', src);
        reject(err);
        return;
      }

      // Fix negative Y offsets for Roboto MSDF font from tool. Experimentally determined.
      if (src.indexOf('/Roboto-msdf.json') >= 0) { yOffset = 30; }
      if (yOffset) { font.chars.map(function doOffset (ch) { ch.yoffset += yOffset; }); }

      resolve(font);
    });
  });
}

/**
 * @returns {Promise}
 */
function loadTexture (src) {
  return new Promise(function (resolve, reject) {
    new THREE.ImageLoader().load(src, function (image) {
      resolve(image);
    }, undefined, function () {
      error('Error loading font image', src);
      reject(null);
    });
  });
}

function createShader (el, shaderName, data) {
  var shader;
  var shaderObject;

  // Set up Shader.
  shaderObject = new shaders[shaderName].Shader();
  shaderObject.el = el;
  shaderObject.init(data);
  shaderObject.update(data);

  // Get material.
  shader = shaderObject.material;
  // Apparently, was not set on `init` nor `update`.
  shader.transparent = data.transparent;

  return {
    material: shader,
    shader: shaderObject
  };
}

/**
 * Determine wrap pixel count. Either specified or by experimental fudge factor.
 * Note that experimental factor will never be correct for variable width fonts.
 */
function computeWidth (wrapPixels, wrapCount, widthFactor) {
  return wrapPixels || ((0.5 + wrapCount) * widthFactor);
}

/**
 * Compute default font width factor to use.
 */
function computeFontWidthFactor (font) {
  var sum = 0;
  var digitsum = 0;
  var digits = 0;
  font.chars.map(function (ch) {
    sum += ch.xadvance;
    if (ch.id >= 48 && ch.id <= 57) {
      digits++;
      digitsum += ch.xadvance;
    }
  });
  return digits ? digitsum / digits : sum / font.chars.length;
}

/**
 * Get or create a promise given a key and promise generator.
 * @todo Move to a utility and use in other parts of A-Frame.
 */
function PromiseCache () {
  var cache = this.cache = {};

  this.get = function (key, promiseGenerator) {
    if (key in cache) {
      return cache[key];
    }
    cache[key] = promiseGenerator();
    return cache[key];
  };
}

},{"../core/component":101,"../core/shader":111,"../lib/three":149,"../utils/":174,"load-bmfont":26,"three-bmfont-text":37}],85:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;
var controllerUtils = _dereq_('../utils/tracked-controls');
var DEFAULT_CAMERA_HEIGHT = _dereq_('../constants').DEFAULT_CAMERA_HEIGHT;
var THREE = _dereq_('../lib/three');

var DEFAULT_HANDEDNESS = _dereq_('../constants').DEFAULT_HANDEDNESS;
// Vector from eyes to elbow (divided by user height).
var EYES_TO_ELBOW = {x: 0.175, y: -0.3, z: -0.03};
// Vector from eyes to elbow (divided by user height).
var FOREARM = {x: 0, y: 0, z: -0.175};

// Due to unfortunate name collision, add empty touches array to avoid Daydream error.
var EMPTY_DAYDREAM_TOUCHES = {touches: []};

var EVENTS = {
  AXISMOVE: 'axismove',
  BUTTONCHANGED: 'buttonchanged',
  BUTTONDOWN: 'buttondown',
  BUTTONUP: 'buttonup',
  TOUCHSTART: 'touchstart',
  TOUCHEND: 'touchend'
};

/**
 * Tracked controls component.
 * Wrap the gamepad API for pose and button states.
 * Select the appropriate controller and apply pose to the entity.
 * Observe button states and emit appropriate events.
 *
 * @property {number} controller - Index of controller in array returned by Gamepad API.
 *  Only used if hand property is not set.
 * @property {string} id - Selected controller among those returned by Gamepad API.
 * @property {number} hand - If multiple controllers found with id, choose the one with the
 *  given value for hand. If set, we ignore 'controller' property
 */
module.exports.Component = registerComponent('tracked-controls-webvr', {
  schema: {
    autoHide: {default: true},
    controller: {default: 0},
    id: {type: 'string', default: ''},
    hand: {type: 'string', default: ''},
    idPrefix: {type: 'string', default: ''},
    orientationOffset: {type: 'vec3'},
    // Arm model parameters when not 6DoF.
    armModel: {default: true},
    headElement: {type: 'selector'}
  },

  init: function () {
    // Copy variables back to tracked-controls for backwards compatibility.
    // Some 3rd components rely on them.
    this.axis = this.el.components['tracked-controls'].axis = [0, 0, 0];
    this.buttonStates = this.el.components['tracked-controls'].buttonStates = {};
    this.changedAxes = [];
    this.targetControllerNumber = this.data.controller;

    this.axisMoveEventDetail = {axis: this.axis, changed: this.changedAxes};
    this.deltaControllerPosition = new THREE.Vector3();
    this.controllerQuaternion = new THREE.Quaternion();
    this.controllerEuler = new THREE.Euler();

    this.updateGamepad();

    this.buttonEventDetails = {};
  },

  tick: function (time, delta) {
    var mesh = this.el.getObject3D('mesh');
    // Update mesh animations.
    if (mesh && mesh.update) { mesh.update(delta / 1000); }
    this.updateGamepad();
    this.updatePose();
    this.updateButtons();
  },

  /**
   * Return default user height to use for non-6DOF arm model.
   */
  defaultUserHeight: function () {
    return DEFAULT_CAMERA_HEIGHT;
  },

  /**
   * Return head element to use for non-6DOF arm model.
   */
  getHeadElement: function () {
    return this.data.headElement || this.el.sceneEl.camera.el;
  },

  /**
   * Handle update controller match criteria (such as `id`, `idPrefix`, `hand`, `controller`)
   */
  updateGamepad: function () {
    var data = this.data;
    var controller = controllerUtils.findMatchingControllerWebVR(
      this.system.controllers,
      data.id,
      data.idPrefix,
      data.hand,
      data.controller
    );

    this.controller = controller;
    // Legacy handle to the controller for old components.
    this.el.components['tracked-controls'].controller = controller;

    if (this.data.autoHide) { this.el.object3D.visible = !!this.controller; }
  },

  /**
   * Applies an artificial arm model to simulate elbow to wrist positioning
   * based on the orientation of the controller.
   *
   * @param {object} controllerPosition - Existing vector to update with controller position.
   */
  applyArmModel: function (controllerPosition) {
    // Use controllerPosition and deltaControllerPosition to avoid creating variables.
    var controller = this.controller;
    var controllerEuler = this.controllerEuler;
    var controllerQuaternion = this.controllerQuaternion;
    var deltaControllerPosition = this.deltaControllerPosition;
    var hand;
    var headEl;
    var headObject3D;
    var pose;
    var userHeight;

    headEl = this.getHeadElement();
    headObject3D = headEl.object3D;
    userHeight = this.defaultUserHeight();

    pose = controller.pose;
    hand = (controller ? controller.hand : undefined) || DEFAULT_HANDEDNESS;

    // Use camera position as head position.
    controllerPosition.copy(headObject3D.position);
    // Set offset for degenerate "arm model" to elbow.
    deltaControllerPosition.set(
      EYES_TO_ELBOW.x * (hand === 'left' ? -1 : hand === 'right' ? 1 : 0),
      EYES_TO_ELBOW.y,  // Lower than our eyes.
      EYES_TO_ELBOW.z);  // Slightly out in front.
    // Scale offset by user height.
    deltaControllerPosition.multiplyScalar(userHeight);
    // Apply camera Y rotation (not X or Z, so you can look down at your hand).
    deltaControllerPosition.applyAxisAngle(headObject3D.up, headObject3D.rotation.y);
    // Apply rotated offset to position.
    controllerPosition.add(deltaControllerPosition);

    // Set offset for degenerate "arm model" forearm. Forearm sticking out from elbow.
    deltaControllerPosition.set(FOREARM.x, FOREARM.y, FOREARM.z);
    // Scale offset by user height.
    deltaControllerPosition.multiplyScalar(userHeight);
    // Apply controller X/Y rotation (tilting up/down/left/right is usually moving the arm).
    if (pose.orientation) {
      controllerQuaternion.fromArray(pose.orientation);
    } else {
      controllerQuaternion.copy(headObject3D.quaternion);
    }
    controllerEuler.setFromQuaternion(controllerQuaternion);
    controllerEuler.set(controllerEuler.x, controllerEuler.y, 0);
    deltaControllerPosition.applyEuler(controllerEuler);
    // Apply rotated offset to position.
    controllerPosition.add(deltaControllerPosition);
  },

  /**
   * Read pose from controller (from Gamepad API), apply transforms, apply to entity.
   */
  updatePose: function () {
    var controller = this.controller;
    var data = this.data;
    var object3D = this.el.object3D;
    var pose;
    var vrDisplay = this.system.vrDisplay;
    var standingMatrix;

    if (!controller) { return; }

    // Compose pose from Gamepad.
    pose = controller.pose;

    if (pose.position) {
      object3D.position.fromArray(pose.position);
    } else {
      // Controller not 6DOF, apply arm model.
      if (data.armModel) { this.applyArmModel(object3D.position); }
    }

    if (pose.orientation) {
      object3D.quaternion.fromArray(pose.orientation);
    }

    // Apply transforms, if 6DOF and in VR.
    if (vrDisplay && pose.position) {
      standingMatrix = this.el.sceneEl.renderer.vr.getStandingMatrix();
      object3D.matrix.compose(object3D.position, object3D.quaternion, object3D.scale);
      object3D.matrix.multiplyMatrices(standingMatrix, object3D.matrix);
      object3D.matrix.decompose(object3D.position, object3D.quaternion, object3D.scale);
    }

    object3D.rotateX(this.data.orientationOffset.x * THREE.Math.DEG2RAD);
    object3D.rotateY(this.data.orientationOffset.y * THREE.Math.DEG2RAD);
    object3D.rotateZ(this.data.orientationOffset.z * THREE.Math.DEG2RAD);
  },

  /**
   * Handle button changes including axes, presses, touches, values.
   */
  updateButtons: function () {
    var buttonState;
    var controller = this.controller;
    var id;

    if (!controller) { return; }

    // Check every button.
    for (id = 0; id < controller.buttons.length; ++id) {
      // Initialize button state.
      if (!this.buttonStates[id]) {
        this.buttonStates[id] = {pressed: false, touched: false, value: 0};
      }
      if (!this.buttonEventDetails[id]) {
        this.buttonEventDetails[id] = {id: id, state: this.buttonStates[id]};
      }

      buttonState = controller.buttons[id];
      this.handleButton(id, buttonState);
    }
    // Check axes.
    this.handleAxes();
  },

  /**
   * Handle presses and touches for a single button.
   *
   * @param {number} id - Index of button in Gamepad button array.
   * @param {number} buttonState - Value of button state from 0 to 1.
   * @returns {boolean} Whether button has changed in any way.
   */
  handleButton: function (id, buttonState) {
    var changed;
    changed = this.handlePress(id, buttonState) |
              this.handleTouch(id, buttonState) |
              this.handleValue(id, buttonState);
    if (!changed) { return false; }
    this.el.emit(EVENTS.BUTTONCHANGED, this.buttonEventDetails[id], false);
    return true;
  },

  /**
   * An axis is an array of values from -1 (up, left) to 1 (down, right).
   * Compare each component of the axis to the previous value to determine change.
   *
   * @returns {boolean} Whether axes changed.
   */
  handleAxes: function () {
    var changed = false;
    var controllerAxes = this.controller.axes;
    var i;
    var previousAxis = this.axis;
    var changedAxes = this.changedAxes;

    // Check if axis changed.
    this.changedAxes.length = 0;
    for (i = 0; i < controllerAxes.length; ++i) {
      changedAxes.push(previousAxis[i] !== controllerAxes[i]);
      if (changedAxes[i]) { changed = true; }
    }
    if (!changed) { return false; }

    this.axis.length = 0;
    for (i = 0; i < controllerAxes.length; i++) {
      this.axis.push(controllerAxes[i]);
    }
    this.el.emit(EVENTS.AXISMOVE, this.axisMoveEventDetail, false);
    return true;
  },

  /**
   * Determine whether a button press has occured and emit events as appropriate.
   *
   * @param {string} id - ID of the button to check.
   * @param {object} buttonState - State of the button to check.
   * @returns {boolean} Whether button press state changed.
   */
  handlePress: function (id, buttonState) {
    var evtName;
    var previousButtonState = this.buttonStates[id];

    // Not changed.
    if (buttonState.pressed === previousButtonState.pressed) { return false; }

    evtName = buttonState.pressed ? EVENTS.BUTTONDOWN : EVENTS.BUTTONUP;
    this.el.emit(evtName, this.buttonEventDetails[id], false);
    previousButtonState.pressed = buttonState.pressed;
    return true;
  },

  /**
   * Determine whether a button touch has occured and emit events as appropriate.
   *
   * @param {string} id - ID of the button to check.
   * @param {object} buttonState - State of the button to check.
   * @returns {boolean} Whether button touch state changed.
   */
  handleTouch: function (id, buttonState) {
    var evtName;
    var previousButtonState = this.buttonStates[id];

    // Not changed.
    if (buttonState.touched === previousButtonState.touched) { return false; }

    evtName = buttonState.touched ? EVENTS.TOUCHSTART : EVENTS.TOUCHEND;
    this.el.emit(evtName, this.buttonEventDetails[id], false, EMPTY_DAYDREAM_TOUCHES);
    previousButtonState.touched = buttonState.touched;
    return true;
  },

  /**
   * Determine whether a button value has changed.
   *
   * @param {string} id - Id of the button to check.
   * @param {object} buttonState - State of the button to check.
   * @returns {boolean} Whether button value changed.
   */
  handleValue: function (id, buttonState) {
    var previousButtonState = this.buttonStates[id];

    // Not changed.
    if (buttonState.value === previousButtonState.value) { return false; }

    previousButtonState.value = buttonState.value;
    return true;
  }
});

},{"../constants":93,"../core/component":101,"../lib/three":149,"../utils/tracked-controls":182}],86:[function(_dereq_,module,exports){
var controllerUtils = _dereq_('../utils/tracked-controls');
var registerComponent = _dereq_('../core/component').registerComponent;

module.exports.Component = registerComponent('tracked-controls-webxr', {
  schema: {
    hand: {type: 'string', default: ''}
  },

  init: function () {
    this.addSessionEventListeners = this.addSessionEventListeners.bind(this);
    this.updateController = this.updateController.bind(this);
    this.emitButtonUpEvent = this.emitButtonUpEvent.bind(this);
    this.emitButtonDownEvent = this.emitButtonDownEvent.bind(this);
    this.buttonEventDetails = {id: 'trigger', state: {pressed: false}};
  },

  play: function () {
    var sceneEl = this.el.sceneEl;
    this.updateController();
    this.addSessionEventListeners();
    sceneEl.addEventListener('enter-vr', this.addSessionEventListeners);
    sceneEl.addEventListener('controllersupdated', this.updateController);
  },

  pause: function () {
    var sceneEl = this.el.sceneEl;
    this.removeSessionEventListeners();
    sceneEl.removeEventListener('enter-vr', this.addSessionEventListeners);
    sceneEl.removeEventListener('controllersupdated', this.updateController);
  },

  addSessionEventListeners: function () {
    var sceneEl = this.el.sceneEl;
    if (!sceneEl.xrSession) { return; }
    sceneEl.xrSession.addEventListener('selectstart', this.emitButtonDownEvent);
    sceneEl.xrSession.addEventListener('selectend', this.emitButtonUpEvent);
  },

  removeSessionEventListeners: function () {
    var sceneEl = this.el.sceneEl;
    if (!sceneEl.xrSession) { return; }
    sceneEl.xrSession.addEventListener('selectstart', this.emitButtonDownEvent);
    sceneEl.xrSession.addEventListener('selectend', this.emitButtonUpEvent);
  },

  emitButtonDownEvent: function (evt) {
    if (!this.controller || evt.inputSource.handedness !== this.data.hand) { return; }
    this.buttonEventDetails.state.pressed = true;
    this.el.emit('buttondown', this.buttonEventDetails);
    this.el.emit('buttonchanged', this.buttonEventDetails);
    this.el.emit('triggerdown');
  },

  emitButtonUpEvent: function (evt) {
    if (!this.controller || evt.inputSource.handedness !== this.data.hand) { return; }
    this.buttonEventDetails.state.pressed = false;
    this.el.emit('buttonup', this.buttonEventDetails);
    this.el.emit('buttonchanged', this.buttonEventDetails);
    this.el.emit('triggerup');
  },

  /**
   * Handle update controller match criteria (such as `id`, `idPrefix`, `hand`, `controller`)
   */
  updateController: function () {
    this.controller = controllerUtils.findMatchingControllerWebXR(
      this.system.controllers,
      this.data.hand
    );
    // Legacy handle to the controller for old components.
    this.el.components['tracked-controls'].controller = this.controller;

    if (this.data.autoHide) { this.el.object3D.visible = !!this.controller; }
  },

  tick: function () {
    var pose;
    var sceneEl = this.el.sceneEl;
    var object3D = this.el.object3D;
    if (!this.controller || !sceneEl.frame) { return; }
    pose = sceneEl.frame.getInputPose(this.controller, sceneEl.frameOfReference);
    if (!pose) { return; }
    object3D.matrix.elements = pose.targetRay.transformMatrix;
    object3D.matrix.decompose(object3D.position, object3D.rotation, object3D.scale);
  }
});

},{"../core/component":101,"../utils/tracked-controls":182}],87:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;

/**
 * Tracked controls.
 * Abstract controls that decide if the WebVR or WebXR version is going to be applied.
 *
 * @property {number} controller - Index of controller in array returned by Gamepad API.
 *  Only used if hand property is not set.
 * @property {string} id - Selected controller among those returned by Gamepad API.
 * @property {number} hand - If multiple controllers found with id, choose the one with the
 *  given value for hand. If set, we ignore 'controller' property
 */
module.exports.Component = registerComponent('tracked-controls', {
  schema: {
    autoHide: {default: true},
    controller: {default: 0},
    id: {type: 'string', default: ''},
    hand: {type: 'string', default: ''},
    idPrefix: {type: 'string', default: ''},
    orientationOffset: {type: 'vec3'},
    // Arm model parameters when not 6DoF.
    armModel: {default: true},
    headElement: {type: 'selector'}
  },

  update: function () {
    var data = this.data;
    var el = this.el;
    if (el.sceneEl.hasWebXR) {
      el.setAttribute('tracked-controls-webxr', data);
    } else {
      el.setAttribute('tracked-controls-webvr', data);
    }
  }
});

},{"../core/component":101}],88:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;

/**
 * Visibility component.
 */
module.exports.Component = registerComponent('visible', {
  schema: {default: true},

  update: function () {
    this.el.object3D.visible = this.data;
  }
});

},{"../core/component":101}],89:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;
var utils = _dereq_('../utils/');

var bind = utils.bind;
var trackedControlsUtils = _dereq_('../utils/tracked-controls');
var checkControllerPresentAndSetup = trackedControlsUtils.checkControllerPresentAndSetup;
var emitIfAxesChanged = trackedControlsUtils.emitIfAxesChanged;
var onButtonEvent = trackedControlsUtils.onButtonEvent;

var VIVE_CONTROLLER_MODEL_OBJ_URL = 'https://cdn.aframe.io/controllers/vive/vr_controller_vive.obj';
var VIVE_CONTROLLER_MODEL_OBJ_MTL = 'https://cdn.aframe.io/controllers/vive/vr_controller_vive.mtl';

var GAMEPAD_ID_PREFIX = 'OpenVR ';

/**
 * Vive controls.
 * Interface with Vive controllers and map Gamepad events to controller buttons:
 * trackpad, trigger, grip, menu, system
 * Load a controller model and highlight the pressed buttons.
 */
module.exports.Component = registerComponent('vive-controls', {
  schema: {
    hand: {default: 'left'},
    buttonColor: {type: 'color', default: '#FAFAFA'},  // Off-white.
    buttonHighlightColor: {type: 'color', default: '#22D1EE'},  // Light blue.
    model: {default: true},
    orientationOffset: {type: 'vec3'}
  },

  /**
   * Button IDs:
   * 0 - trackpad
   * 1 - trigger (intensity value from 0.5 to 1)
   * 2 - grip
   * 3 - menu (dispatch but better for menu options)
   * 4 - system (never dispatched on this layer)
   */
  mapping: {
    axes: {trackpad: [0, 1]},
    buttons: ['trackpad', 'trigger', 'grip', 'menu', 'system']
  },

  init: function () {
    var self = this;
    this.animationActive = 'pointing';
    this.checkControllerPresentAndSetup = checkControllerPresentAndSetup;  // To allow mock.
    this.controllerPresent = false;
    this.emitIfAxesChanged = emitIfAxesChanged;  // To allow mock.
    this.lastControllerCheck = 0;
    this.onButtonChanged = bind(this.onButtonChanged, this);
    this.onButtonDown = function (evt) { onButtonEvent(evt.detail.id, 'down', self); };
    this.onButtonUp = function (evt) { onButtonEvent(evt.detail.id, 'up', self); };
    this.onButtonTouchEnd = function (evt) { onButtonEvent(evt.detail.id, 'touchend', self); };
    this.onButtonTouchStart = function (evt) { onButtonEvent(evt.detail.id, 'touchstart', self); };
    this.onAxisMoved = bind(this.onAxisMoved, this);
    this.previousButtonValues = {};
    this.rendererSystem = this.el.sceneEl.systems.renderer;

    this.bindMethods();
  },

  play: function () {
    this.checkIfControllerPresent();
    this.addControllersUpdateListener();
  },

  pause: function () {
    this.removeEventListeners();
    this.removeControllersUpdateListener();
  },

  bindMethods: function () {
    this.onModelLoaded = bind(this.onModelLoaded, this);
    this.onControllersUpdate = bind(this.onControllersUpdate, this);
    this.checkIfControllerPresent = bind(this.checkIfControllerPresent, this);
    this.removeControllersUpdateListener = bind(this.removeControllersUpdateListener, this);
    this.onAxisMoved = bind(this.onAxisMoved, this);
  },

  addEventListeners: function () {
    var el = this.el;
    el.addEventListener('buttonchanged', this.onButtonChanged);
    el.addEventListener('buttondown', this.onButtonDown);
    el.addEventListener('buttonup', this.onButtonUp);
    el.addEventListener('touchend', this.onButtonTouchEnd);
    el.addEventListener('touchstart', this.onButtonTouchStart);
    el.addEventListener('model-loaded', this.onModelLoaded);
    el.addEventListener('axismove', this.onAxisMoved);
    this.controllerEventsActive = true;
  },

  removeEventListeners: function () {
    var el = this.el;
    el.removeEventListener('buttonchanged', this.onButtonChanged);
    el.removeEventListener('buttondown', this.onButtonDown);
    el.removeEventListener('buttonup', this.onButtonUp);
    el.removeEventListener('touchend', this.onButtonTouchEnd);
    el.removeEventListener('touchstart', this.onButtonTouchStart);
    el.removeEventListener('model-loaded', this.onModelLoaded);
    el.removeEventListener('axismove', this.onAxisMoved);
    this.controllerEventsActive = false;
  },

  /**
   * Once OpenVR returns correct hand data in supporting browsers, we can use hand property.
   * var isPresent = this.checkControllerPresentAndSetup(this.el.sceneEl, GAMEPAD_ID_PREFIX,
                                                        { hand: data.hand });
   * Until then, use hardcoded index.
   */
  checkIfControllerPresent: function () {
    var data = this.data;
    var controllerIndex = data.hand === 'right' ? 0 : data.hand === 'left' ? 1 : 2;
    this.checkControllerPresentAndSetup(this, GAMEPAD_ID_PREFIX, {index: controllerIndex});
  },

  injectTrackedControls: function () {
    var el = this.el;
    var data = this.data;

    // If we have an OpenVR Gamepad, use the fixed mapping.
    el.setAttribute('tracked-controls', {
      idPrefix: GAMEPAD_ID_PREFIX,
      // Hand IDs: 0 = right, 1 = left, 2 = anything else.
      controller: data.hand === 'right' ? 0 : data.hand === 'left' ? 1 : 2,
      hand: data.hand,
      orientationOffset: data.orientationOffset
    });

    // Load model.
    if (!this.data.model) { return; }
    this.el.setAttribute('obj-model', {
      obj: VIVE_CONTROLLER_MODEL_OBJ_URL,
      mtl: VIVE_CONTROLLER_MODEL_OBJ_MTL
    });
  },

  addControllersUpdateListener: function () {
    this.el.sceneEl.addEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  removeControllersUpdateListener: function () {
    this.el.sceneEl.removeEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  onControllersUpdate: function () {
    this.checkIfControllerPresent();
  },

  /**
   * Rotate the trigger button based on how hard the trigger is pressed.
   */
  onButtonChanged: function (evt) {
    var button = this.mapping.buttons[evt.detail.id];
    var buttonMeshes = this.buttonMeshes;
    var analogValue;

    if (!button) { return; }

    if (button === 'trigger') {
      analogValue = evt.detail.state.value;
      // Update trigger rotation depending on button value.
      if (buttonMeshes && buttonMeshes.trigger) {
        buttonMeshes.trigger.rotation.x = -analogValue * (Math.PI / 12);
      }
    }

    // Pass along changed event with button state, using button mapping for convenience.
    this.el.emit(button + 'changed', evt.detail.state);
  },

  onModelLoaded: function (evt) {
    var buttonMeshes;
    var controllerObject3D = evt.detail.model;
    var self = this;

    if (!this.data.model) { return; }

    // Store button meshes object to be able to change their colors.
    buttonMeshes = this.buttonMeshes = {};
    buttonMeshes.grip = {
      left: controllerObject3D.getObjectByName('leftgrip'),
      right: controllerObject3D.getObjectByName('rightgrip')
    };
    buttonMeshes.menu = controllerObject3D.getObjectByName('menubutton');
    buttonMeshes.system = controllerObject3D.getObjectByName('systembutton');
    buttonMeshes.trackpad = controllerObject3D.getObjectByName('touchpad');
    buttonMeshes.trigger = controllerObject3D.getObjectByName('trigger');

    // Set default colors.
    Object.keys(buttonMeshes).forEach(function (buttonName) {
      self.setButtonColor(buttonName, self.data.buttonColor);
    });

    // Offset pivot point.
    controllerObject3D.position.set(0, -0.015, 0.04);
  },

  onAxisMoved: function (evt) {
    this.emitIfAxesChanged(this, this.mapping.axes, evt);
  },

  updateModel: function (buttonName, evtName) {
    var color;
    var isTouch;
    if (!this.data.model) { return; }

    isTouch = evtName.indexOf('touch') !== -1;
    // Don't change color for trackpad touch.
    if (isTouch) { return; }

    // Update colors.
    color = evtName === 'up' ? this.data.buttonColor : this.data.buttonHighlightColor;
    this.setButtonColor(buttonName, color);
  },

  setButtonColor: function (buttonName, color) {
    var buttonMeshes = this.buttonMeshes;
    var rendererSystem = this.rendererSystem;

    if (!buttonMeshes) { return; }

    // Need to do both left and right sides for grip.
    if (buttonName === 'grip') {
      buttonMeshes.grip.left.material.color.set(color);
      buttonMeshes.grip.right.material.color.set(color);
      rendererSystem.applyColorCorrection(buttonMeshes.grip.left.material.color);
      rendererSystem.applyColorCorrection(buttonMeshes.grip.right.material.color);
      return;
    }
    buttonMeshes[buttonName].material.color.set(color);
    rendererSystem.applyColorCorrection(buttonMeshes[buttonName].material.color);
  }
});

},{"../core/component":101,"../utils/":174,"../utils/tracked-controls":182}],90:[function(_dereq_,module,exports){
var registerComponent = _dereq_('../core/component').registerComponent;
var bind = _dereq_('../utils/bind');
var trackedControlsUtils = _dereq_('../utils/tracked-controls');
var checkControllerPresentAndSetup = trackedControlsUtils.checkControllerPresentAndSetup;
var emitIfAxesChanged = trackedControlsUtils.emitIfAxesChanged;
var onButtonEvent = trackedControlsUtils.onButtonEvent;

var GAMEPAD_ID_PREFIX = 'HTC Vive Focus';

var VIVE_FOCUS_CONTROLLER_MODEL_URL = 'https://cdn.aframe.io/controllers/vive/focus-controller/focus-controller.gltf';

/**
 * Vive Focus controls.
 * Interface with Vive Focus controller and map Gamepad events to
 * controller buttons: trackpad, trigger
 * Load a controller model and highlight the pressed buttons.
 */
module.exports.Component = registerComponent('vive-focus-controls', {
  schema: {
    hand: {default: ''},  // This informs the degenerate arm model.
    buttonTouchedColor: {type: 'color', default: '#BBBBBB'},
    buttonHighlightColor: {type: 'color', default: '#7A7A7A'},
    model: {default: true},
    rotationOffset: {default: 0},
    armModel: {default: true}
  },

  /**
   * Button IDs:
   * 0 - trackpad
   * 1 - trigger
   */
  mapping: {
    axes: {trackpad: [0, 1]},
    buttons: ['trigger', 'trackpad']
  },

  bindMethods: function () {
    this.onModelLoaded = bind(this.onModelLoaded, this);
    this.onControllersUpdate = bind(this.onControllersUpdate, this);
    this.checkIfControllerPresent = bind(this.checkIfControllerPresent, this);
    this.removeControllersUpdateListener = bind(this.removeControllersUpdateListener, this);
    this.onAxisMoved = bind(this.onAxisMoved, this);
  },

  init: function () {
    var self = this;
    this.animationActive = 'pointing';
    this.onButtonChanged = bind(this.onButtonChanged, this);
    this.onButtonDown = function (evt) { onButtonEvent(evt.detail.id, 'down', self); };
    this.onButtonUp = function (evt) { onButtonEvent(evt.detail.id, 'up', self); };
    this.onButtonTouchStart = function (evt) { onButtonEvent(evt.detail.id, 'touchstart', self); };
    this.onButtonTouchEnd = function (evt) { onButtonEvent(evt.detail.id, 'touchend', self); };
    this.onAxisMoved = bind(this.onAxisMoved, this);
    this.controllerPresent = false;
    this.lastControllerCheck = 0;
    this.bindMethods();
    this.checkControllerPresentAndSetup = checkControllerPresentAndSetup;  // To allow mock.
    this.emitIfAxesChanged = emitIfAxesChanged;  // To allow mock.
  },

  addEventListeners: function () {
    var el = this.el;
    el.addEventListener('buttonchanged', this.onButtonChanged);
    el.addEventListener('buttondown', this.onButtonDown);
    el.addEventListener('buttonup', this.onButtonUp);
    el.addEventListener('touchstart', this.onButtonTouchStart);
    el.addEventListener('touchend', this.onButtonTouchEnd);
    el.addEventListener('model-loaded', this.onModelLoaded);
    el.addEventListener('axismove', this.onAxisMoved);
    this.controllerEventsActive = true;
    this.addControllersUpdateListener();
  },

  removeEventListeners: function () {
    var el = this.el;
    el.removeEventListener('buttonchanged', this.onButtonChanged);
    el.removeEventListener('buttondown', this.onButtonDown);
    el.removeEventListener('buttonup', this.onButtonUp);
    el.removeEventListener('touchstart', this.onButtonTouchStart);
    el.removeEventListener('touchend', this.onButtonTouchEnd);
    el.removeEventListener('model-loaded', this.onModelLoaded);
    el.removeEventListener('axismove', this.onAxisMoved);
    this.controllerEventsActive = false;
    this.removeControllersUpdateListener();
  },

  checkIfControllerPresent: function () {
    this.checkControllerPresentAndSetup(this, GAMEPAD_ID_PREFIX,
                                        this.data.hand ? {hand: this.data.hand} : {});
  },

  play: function () {
    this.checkIfControllerPresent();
    this.addControllersUpdateListener();
  },

  pause: function () {
    this.removeEventListeners();
    this.removeControllersUpdateListener();
  },

  injectTrackedControls: function () {
    var el = this.el;
    var data = this.data;
    el.setAttribute('tracked-controls', {
      armModel: data.armModel,
      idPrefix: GAMEPAD_ID_PREFIX,
      rotationOffset: data.rotationOffset
    });
    if (!this.data.model) { return; }
    this.el.setAttribute('gltf-model', VIVE_FOCUS_CONTROLLER_MODEL_URL);
  },

  addControllersUpdateListener: function () {
    this.el.sceneEl.addEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  removeControllersUpdateListener: function () {
    this.el.sceneEl.removeEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  onControllersUpdate: function () {
    this.checkIfControllerPresent();
  },

  onModelLoaded: function (evt) {
    var controllerObject3D = evt.detail.model;
    var buttonMeshes;

    if (!this.data.model) { return; }
    buttonMeshes = this.buttonMeshes = {};
    buttonMeshes.trigger = controllerObject3D.getObjectByName('BumperKey');
    buttonMeshes.triggerPressed = controllerObject3D.getObjectByName('BumperKey_Press');
    if (buttonMeshes.triggerPressed) {
      buttonMeshes.triggerPressed.visible = false;
    }
    buttonMeshes.trackpad = controllerObject3D.getObjectByName('TouchPad');
    buttonMeshes.trackpadPressed = controllerObject3D.getObjectByName('TouchPad_Press');
    if (buttonMeshes.trackpadPressed) {
      buttonMeshes.trackpadPressed.visible = false;
    }
  },

  // No analog buttons, only emits 0/1 values
  onButtonChanged: function (evt) {
    var button = this.mapping.buttons[evt.detail.id];
    if (!button) return;
    // Pass along changed event with button state, using button mapping for convenience.
    this.el.emit(button + 'changed', evt.detail.state);
  },

  onAxisMoved: function (evt) {
    this.emitIfAxesChanged(this, this.mapping.axes, evt);
  },

  updateModel: function (buttonName, evtName) {
    if (!this.data.model) { return; }
    this.updateButtonModel(buttonName, evtName);
  },

  updateButtonModel: function (buttonName, state) {
    var buttonMeshes = this.buttonMeshes;
    var pressedName = buttonName + 'Pressed';
    if (!buttonMeshes || !buttonMeshes[buttonName] || !buttonMeshes[pressedName]) {
      return;
    }
    var color;
    switch (state) {
      case 'down':
        color = this.data.buttonHighlightColor;
        break;
      case 'touchstart':
        color = this.data.buttonTouchedColor;
        break;
    }
    if (color) {
      buttonMeshes[pressedName].material.color.set(color);
    }
    buttonMeshes[pressedName].visible = !!color;
    buttonMeshes[buttonName].visible = !color;
  }
});

},{"../core/component":101,"../utils/bind":168,"../utils/tracked-controls":182}],91:[function(_dereq_,module,exports){
var KEYCODE_TO_CODE = _dereq_('../constants').keyboardevent.KEYCODE_TO_CODE;
var registerComponent = _dereq_('../core/component').registerComponent;
var THREE = _dereq_('../lib/three');
var utils = _dereq_('../utils/');

var bind = utils.bind;
var shouldCaptureKeyEvent = utils.shouldCaptureKeyEvent;

var CLAMP_VELOCITY = 0.00001;
var MAX_DELTA = 0.2;
var KEYS = [
  'KeyW', 'KeyA', 'KeyS', 'KeyD',
  'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'
];

/**
 * WASD component to control entities using WASD keys.
 */
module.exports.Component = registerComponent('wasd-controls', {
  schema: {
    acceleration: {default: 65},
    adAxis: {default: 'x', oneOf: ['x', 'y', 'z']},
    adEnabled: {default: true},
    adInverted: {default: false},
    enabled: {default: true},
    fly: {default: false},
    wsAxis: {default: 'z', oneOf: ['x', 'y', 'z']},
    wsEnabled: {default: true},
    wsInverted: {default: false}
  },

  init: function () {
    // To keep track of the pressed keys.
    this.keys = {};
    this.easing = 1.1;

    this.velocity = new THREE.Vector3();

    // Bind methods and add event listeners.
    this.onBlur = bind(this.onBlur, this);
    this.onFocus = bind(this.onFocus, this);
    this.onKeyDown = bind(this.onKeyDown, this);
    this.onKeyUp = bind(this.onKeyUp, this);
    this.onVisibilityChange = bind(this.onVisibilityChange, this);
    this.attachVisibilityEventListeners();
  },

  tick: function (time, delta) {
    var data = this.data;
    var el = this.el;
    var velocity = this.velocity;

    if (!velocity[data.adAxis] && !velocity[data.wsAxis] &&
        isEmptyObject(this.keys)) { return; }

    // Update velocity.
    delta = delta / 1000;
    this.updateVelocity(delta);

    if (!velocity[data.adAxis] && !velocity[data.wsAxis]) { return; }

    // Get movement vector and translate position.
    el.object3D.position.add(this.getMovementVector(delta));
  },

  remove: function () {
    this.removeKeyEventListeners();
    this.removeVisibilityEventListeners();
  },

  play: function () {
    this.attachKeyEventListeners();
  },

  pause: function () {
    this.keys = {};
    this.removeKeyEventListeners();
  },

  updateVelocity: function (delta) {
    var acceleration;
    var adAxis;
    var adSign;
    var data = this.data;
    var keys = this.keys;
    var velocity = this.velocity;
    var wsAxis;
    var wsSign;

    adAxis = data.adAxis;
    wsAxis = data.wsAxis;

    // If FPS too low, reset velocity.
    if (delta > MAX_DELTA) {
      velocity[adAxis] = 0;
      velocity[wsAxis] = 0;
      return;
    }

    // https://gamedev.stackexchange.com/questions/151383/frame-rate-independant-movement-with-acceleration
    var scaledEasing = Math.pow(1 / this.easing, delta * 60);
    // Velocity Easing.
    if (velocity[adAxis] !== 0) {
      velocity[adAxis] -= velocity[adAxis] * scaledEasing;
    }
    if (velocity[wsAxis] !== 0) {
      velocity[wsAxis] -= velocity[wsAxis] * scaledEasing;
    }

    // Clamp velocity easing.
    if (Math.abs(velocity[adAxis]) < CLAMP_VELOCITY) { velocity[adAxis] = 0; }
    if (Math.abs(velocity[wsAxis]) < CLAMP_VELOCITY) { velocity[wsAxis] = 0; }

    if (!data.enabled) { return; }

    // Update velocity using keys pressed.
    acceleration = data.acceleration;
    if (data.adEnabled) {
      adSign = data.adInverted ? -1 : 1;
      if (keys.KeyA || keys.ArrowLeft) { velocity[adAxis] -= adSign * acceleration * delta; }
      if (keys.KeyD || keys.ArrowRight) { velocity[adAxis] += adSign * acceleration * delta; }
    }
    if (data.wsEnabled) {
      wsSign = data.wsInverted ? -1 : 1;
      if (keys.KeyW || keys.ArrowUp) { velocity[wsAxis] -= wsSign * acceleration * delta; }
      if (keys.KeyS || keys.ArrowDown) { velocity[wsAxis] += wsSign * acceleration * delta; }
    }
  },

  getMovementVector: (function () {
    var directionVector = new THREE.Vector3(0, 0, 0);
    var rotationEuler = new THREE.Euler(0, 0, 0, 'YXZ');

    return function (delta) {
      var rotation = this.el.getAttribute('rotation');
      var velocity = this.velocity;
      var xRotation;

      directionVector.copy(velocity);
      directionVector.multiplyScalar(delta);

      // Absolute.
      if (!rotation) { return directionVector; }

      xRotation = this.data.fly ? rotation.x : 0;

      // Transform direction relative to heading.
      rotationEuler.set(THREE.Math.degToRad(xRotation), THREE.Math.degToRad(rotation.y), 0);
      directionVector.applyEuler(rotationEuler);
      return directionVector;
    };
  })(),

  attachVisibilityEventListeners: function () {
    window.addEventListener('blur', this.onBlur);
    window.addEventListener('focus', this.onFocus);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  },

  removeVisibilityEventListeners: function () {
    window.removeEventListener('blur', this.onBlur);
    window.removeEventListener('focus', this.onFocus);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  },

  attachKeyEventListeners: function () {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },

  removeKeyEventListeners: function () {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  },

  onBlur: function () {
    this.pause();
  },

  onFocus: function () {
    this.play();
  },

  onVisibilityChange: function () {
    if (document.hidden) {
      this.onBlur();
    } else {
      this.onFocus();
    }
  },

  onKeyDown: function (event) {
    var code;
    if (!shouldCaptureKeyEvent(event)) { return; }
    code = event.code || KEYCODE_TO_CODE[event.keyCode];
    if (KEYS.indexOf(code) !== -1) { this.keys[code] = true; }
  },

  onKeyUp: function (event) {
    var code;
    code = event.code || KEYCODE_TO_CODE[event.keyCode];
    delete this.keys[code];
  }
});

function isEmptyObject (keys) {
  var key;
  for (key in keys) { return false; }
  return true;
}

},{"../constants":93,"../core/component":101,"../lib/three":149,"../utils/":174}],92:[function(_dereq_,module,exports){
/* global THREE */
var bind = _dereq_('../utils/bind');
var registerComponent = _dereq_('../core/component').registerComponent;
var trackedControlsUtils = _dereq_('../utils/tracked-controls');
var onButtonEvent = trackedControlsUtils.onButtonEvent;
var utils = _dereq_('../utils/');

var debug = utils.debug('components:windows-motion-controls:debug');
var warn = utils.debug('components:windows-motion-controls:warn');

var DEFAULT_HANDEDNESS = _dereq_('../constants').DEFAULT_HANDEDNESS;

var MODEL_BASE_URL = 'https://cdn.aframe.io/controllers/microsoft/';
var MODEL_FILENAMES = { left: 'left.glb', right: 'right.glb', default: 'universal.glb' };

var GAMEPAD_ID_PREFIX = 'Spatial Controller (Spatial Interaction Source) ';
var GAMEPAD_ID_PATTERN = /([0-9a-zA-Z]+-[0-9a-zA-Z]+)$/;

/**
 * Windows Motion Controller controls.
 * Interface with Windows Motion Controller controllers and map Gamepad events to
 * controller buttons: trackpad, trigger, grip, menu, thumbstick
 * Load a controller model and transform the pressed buttons.
 */
module.exports.Component = registerComponent('windows-motion-controls', {
  schema: {
    hand: {default: DEFAULT_HANDEDNESS},
    // It is possible to have multiple pairs of controllers attached (a pair has both left and right).
    // Set this to 1 to use a controller from the second pair, 2 from the third pair, etc.
    pair: {default: 0},
    // If true, loads the controller glTF asset.
    model: {default: true},
    // If true, will hide the model from the scene if no matching gamepad (based on ID & hand) is connected.
    hideDisconnected: {default: true}
  },

  mapping: {
    // A-Frame specific semantic axis names
    axes: {'thumbstick': [0, 1], 'trackpad': [2, 3]},
    // A-Frame specific semantic button names
    buttons: ['thumbstick', 'trigger', 'grip', 'menu', 'trackpad'],
    // A mapping of the semantic name to node name in the glTF model file,
    // that should be transformed by axis value.
    // This array mirrors the browser Gamepad.axes array, such that
    // the mesh corresponding to axis 0 is in this array index 0.
    axisMeshNames: [
      'THUMBSTICK_X',
      'THUMBSTICK_Y',
      'TOUCHPAD_TOUCH_X',
      'TOUCHPAD_TOUCH_Y'
    ],
    // A mapping of the semantic name to button node name in the glTF model file,
    // that should be transformed by button value.
    buttonMeshNames: {
      'trigger': 'SELECT',
      'menu': 'MENU',
      'grip': 'GRASP',
      'thumbstick': 'THUMBSTICK_PRESS',
      'trackpad': 'TOUCHPAD_PRESS'
    },
    pointingPoseMeshName: 'POINTING_POSE'
  },

  bindMethods: function () {
    this.onModelError = bind(this.onModelError, this);
    this.onModelLoaded = bind(this.onModelLoaded, this);
    this.onControllersUpdate = bind(this.onControllersUpdate, this);
    this.checkIfControllerPresent = bind(this.checkIfControllerPresent, this);
    this.onAxisMoved = bind(this.onAxisMoved, this);
  },

  init: function () {
    var self = this;
    var el = this.el;
    this.onButtonChanged = bind(this.onButtonChanged, this);
    this.onButtonDown = function (evt) { onButtonEvent(evt.detail.id, 'down', self); };
    this.onButtonUp = function (evt) { onButtonEvent(evt.detail.id, 'up', self); };
    this.onButtonTouchStart = function (evt) { onButtonEvent(evt.detail.id, 'touchstart', self); };
    this.onButtonTouchEnd = function (evt) { onButtonEvent(evt.detail.id, 'touchend', self); };
    this.onControllerConnected = function () { self.setModelVisibility(true); };
    this.onControllerDisconnected = function () { self.setModelVisibility(false); };
    this.controllerPresent = false;
    this.lastControllerCheck = 0;
    this.previousButtonValues = {};
    this.bindMethods();

    // Cache for submeshes that we have looked up by name.
    this.loadedMeshInfo = {
      buttonMeshes: null,
      axisMeshes: null
    };

    // Pointing poses
    this.rayOrigin = {
      origin: new THREE.Vector3(),
      direction: new THREE.Vector3(0, 0, -1),
      createdFromMesh: false
    };

    // Stored on object to allow for mocking in tests
    this.emitIfAxesChanged = trackedControlsUtils.emitIfAxesChanged;
    this.checkControllerPresentAndSetup = trackedControlsUtils.checkControllerPresentAndSetup;

    el.addEventListener('controllerconnected', this.onControllerConnected);
    el.addEventListener('controllerdisconnected', this.onControllerDisconnected);
  },

  addEventListeners: function () {
    var el = this.el;
    el.addEventListener('buttonchanged', this.onButtonChanged);
    el.addEventListener('buttondown', this.onButtonDown);
    el.addEventListener('buttonup', this.onButtonUp);
    el.addEventListener('touchstart', this.onButtonTouchStart);
    el.addEventListener('touchend', this.onButtonTouchEnd);
    el.addEventListener('axismove', this.onAxisMoved);
    el.addEventListener('model-error', this.onModelError);
    el.addEventListener('model-loaded', this.onModelLoaded);
    this.controllerEventsActive = true;
  },

  removeEventListeners: function () {
    var el = this.el;
    el.removeEventListener('buttonchanged', this.onButtonChanged);
    el.removeEventListener('buttondown', this.onButtonDown);
    el.removeEventListener('buttonup', this.onButtonUp);
    el.removeEventListener('touchstart', this.onButtonTouchStart);
    el.removeEventListener('touchend', this.onButtonTouchEnd);
    el.removeEventListener('axismove', this.onAxisMoved);
    el.removeEventListener('model-error', this.onModelError);
    el.removeEventListener('model-loaded', this.onModelLoaded);
    this.controllerEventsActive = false;
  },

  checkIfControllerPresent: function () {
    this.checkControllerPresentAndSetup(this, GAMEPAD_ID_PREFIX, {
      hand: this.data.hand,
      index: this.data.pair
    });
  },

  play: function () {
    this.checkIfControllerPresent();
    this.addControllersUpdateListener();
  },

  pause: function () {
    this.removeEventListeners();
    this.removeControllersUpdateListener();
  },

  updateControllerModel: function () {
    // If we do not want to load a model, or, have already loaded the model, emit the controllermodelready event.
    if (!this.data.model || this.rayOrigin.createdFromMesh) {
      this.modelReady();
      return;
    }

    var sourceUrl = this.createControllerModelUrl();
    this.loadModel(sourceUrl);
  },

  /**
   * Helper function that constructs a URL from the controller ID suffix, for future proofed
   * art assets.
   */
  createControllerModelUrl: function (forceDefault) {
    // Determine the device specific folder based on the ID suffix
    var trackedControlsComponent = this.el.components['tracked-controls'];
    var controller = trackedControlsComponent ? trackedControlsComponent.controller : null;
    var device = 'default';
    var hand = this.data.hand;
    var filename;

    if (controller) {
      // Read hand directly from the controller, rather than this.data, as in the case that the controller
      // is unhanded this.data will still have 'left' or 'right' (depending on what the user inserted in to the scene).
      // In this case, we want to load the universal model, so need to get the '' from the controller.
      hand = controller.hand;

      if (!forceDefault) {
        var match = controller.id.match(GAMEPAD_ID_PATTERN);
        device = ((match && match[0]) || device);
      }
    }

    // Hand
    filename = MODEL_FILENAMES[hand] || MODEL_FILENAMES.default;

    // Final url
    return MODEL_BASE_URL + device + '/' + filename;
  },

  injectTrackedControls: function () {
    var data = this.data;
    this.el.setAttribute('tracked-controls', {
      idPrefix: GAMEPAD_ID_PREFIX,
      controller: data.pair,
      hand: data.hand,
      armModel: false
    });

    this.updateControllerModel();
  },

  addControllersUpdateListener: function () {
    this.el.sceneEl.addEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  removeControllersUpdateListener: function () {
    this.el.sceneEl.removeEventListener('controllersupdated', this.onControllersUpdate, false);
  },

  onControllersUpdate: function () {
    this.checkIfControllerPresent();
  },

  onModelError: function (evt) {
    var defaultUrl = this.createControllerModelUrl(true);
    if (evt.detail.src !== defaultUrl) {
      warn('Failed to load controller model for device, attempting to load default.');
      this.loadModel(defaultUrl);
    } else {
      warn('Failed to load default controller model.');
    }
  },

  loadModel: function (url) {
    // The model is loaded by the gltf-model compoent when this attribute is initially set,
    // removed and re-loaded if the given url changes.
    this.el.setAttribute('gltf-model', 'url(' + url + ')');
  },

  onModelLoaded: function (evt) {
    var rootNode = this.controllerModel = evt.detail.model;
    var loadedMeshInfo = this.loadedMeshInfo;
    var i;
    var meshName;
    var mesh;
    var meshInfo;

    debug('Processing model');

    // Reset the caches
    loadedMeshInfo.buttonMeshes = {};
    loadedMeshInfo.axisMeshes = {};

    // Cache our meshes so we aren't traversing the hierarchy per frame
    if (rootNode) {
      // Button Meshes
      for (i = 0; i < this.mapping.buttons.length; i++) {
        meshName = this.mapping.buttonMeshNames[this.mapping.buttons[i]];
        if (!meshName) {
          debug('Skipping unknown button at index: ' + i + ' with mapped name: ' + this.mapping.buttons[i]);
          continue;
        }

        mesh = rootNode.getObjectByName(meshName);
        if (!mesh) {
          warn('Missing button mesh with name: ' + meshName);
          continue;
        }

        meshInfo = {
          index: i,
          value: getImmediateChildByName(mesh, 'VALUE'),
          pressed: getImmediateChildByName(mesh, 'PRESSED'),
          unpressed: getImmediateChildByName(mesh, 'UNPRESSED')
        };
        if (meshInfo.value && meshInfo.pressed && meshInfo.unpressed) {
          loadedMeshInfo.buttonMeshes[this.mapping.buttons[i]] = meshInfo;
        } else {
          // If we didn't find the mesh, it simply means this button won't have transforms applied as mapped button value changes.
          warn('Missing button submesh under mesh with name: ' + meshName +
            '(VALUE: ' + !!meshInfo.value +
            ', PRESSED: ' + !!meshInfo.pressed +
            ', UNPRESSED:' + !!meshInfo.unpressed +
            ')');
        }
      }

      // Axis Meshes
      for (i = 0; i < this.mapping.axisMeshNames.length; i++) {
        meshName = this.mapping.axisMeshNames[i];
        if (!meshName) {
          debug('Skipping unknown axis at index: ' + i);
          continue;
        }

        mesh = rootNode.getObjectByName(meshName);
        if (!mesh) {
          warn('Missing axis mesh with name: ' + meshName);
          continue;
        }

        meshInfo = {
          index: i,
          value: getImmediateChildByName(mesh, 'VALUE'),
          min: getImmediateChildByName(mesh, 'MIN'),
          max: getImmediateChildByName(mesh, 'MAX')
        };
        if (meshInfo.value && meshInfo.min && meshInfo.max) {
          loadedMeshInfo.axisMeshes[i] = meshInfo;
        } else {
          // If we didn't find the mesh, it simply means this axis won't have transforms applied as mapped axis values change.
          warn('Missing axis submesh under mesh with name: ' + meshName +
            '(VALUE: ' + !!meshInfo.value +
            ', MIN: ' + !!meshInfo.min +
            ', MAX:' + !!meshInfo.max +
            ')');
        }
      }

      this.calculateRayOriginFromMesh(rootNode);
      // Determine if the model has to be visible or not.
      this.setModelVisibility();
    }

    debug('Model load complete.');

    // Look through only immediate children. This will return null if no mesh exists with the given name.
    function getImmediateChildByName (object3d, value) {
      for (var i = 0, l = object3d.children.length; i < l; i++) {
        var obj = object3d.children[i];
        if (obj && obj['name'] === value) {
          return obj;
        }
      }
      return undefined;
    }
  },

  calculateRayOriginFromMesh: (function () {
    var quaternion = new THREE.Quaternion();
    return function (rootNode) {
      var mesh;

      // Calculate the pointer pose (used for rays), by applying the world transform of th POINTER_POSE node
      // in the glTF (assumes that root node is at world origin)
      this.rayOrigin.origin.set(0, 0, 0);
      this.rayOrigin.direction.set(0, 0, -1);
      this.rayOrigin.createdFromMesh = true;

      // Try to read Pointing pose from the source model
      mesh = rootNode.getObjectByName(this.mapping.pointingPoseMeshName);
      if (mesh) {
        var parent = rootNode.parent;

        // We need to read pose transforms accumulated from the root of the glTF, not the scene.
        if (parent) {
          rootNode.parent = null;
          rootNode.updateMatrixWorld(true);
          rootNode.parent = parent;
        }

        mesh.getWorldPosition(this.rayOrigin.origin);
        mesh.getWorldQuaternion(quaternion);
        this.rayOrigin.direction.applyQuaternion(quaternion);

        // Recalculate the world matrices now that the rootNode is re-attached to the parent.
        if (parent) {
          rootNode.updateMatrixWorld(true);
        }
      } else {
        debug('Mesh does not contain pointing origin data, defaulting to none.');
      }

      // Emit event stating that our pointing ray is now accurate.
      this.modelReady();
    };
  })(),

  lerpAxisTransform: (function () {
    var quaternion = new THREE.Quaternion();
    return function (axis, axisValue) {
      var axisMeshInfo = this.loadedMeshInfo.axisMeshes[axis];
      if (!axisMeshInfo) return;

      var min = axisMeshInfo.min;
      var max = axisMeshInfo.max;
      var target = axisMeshInfo.value;

      // Convert from gamepad value range (-1 to +1) to lerp range (0 to 1)
      var lerpValue = axisValue * 0.5 + 0.5;
      target.setRotationFromQuaternion(quaternion.copy(min.quaternion).slerp(max.quaternion, lerpValue));
      target.position.lerpVectors(min.position, max.position, lerpValue);
    };
  })(),

  lerpButtonTransform: (function () {
    var quaternion = new THREE.Quaternion();
    return function (buttonName, buttonValue) {
      var buttonMeshInfo = this.loadedMeshInfo.buttonMeshes[buttonName];
      if (!buttonMeshInfo) return;

      var min = buttonMeshInfo.unpressed;
      var max = buttonMeshInfo.pressed;
      var target = buttonMeshInfo.value;

      target.setRotationFromQuaternion(quaternion.copy(min.quaternion).slerp(max.quaternion, buttonValue));
      target.position.lerpVectors(min.position, max.position, buttonValue);
    };
  })(),

  modelReady: function () {
    this.el.emit('controllermodelready', {
      name: 'windows-motion-controls',
      model: this.data.model,
      rayOrigin: this.rayOrigin
    });
  },

  onButtonChanged: function (evt) {
    var buttonName = this.mapping.buttons[evt.detail.id];

    if (buttonName) {
      // Update the button mesh transform
      if (this.loadedMeshInfo && this.loadedMeshInfo.buttonMeshes) {
        this.lerpButtonTransform(buttonName, evt.detail.state.value);
      }

      // Only emit events for buttons that we know how to map from index to name
      this.el.emit(buttonName + 'changed', evt.detail.state);
    }
  },

  onAxisMoved: function (evt) {
    var numAxes = this.mapping.axisMeshNames.length;

    // Only attempt to update meshes if we have valid data.
    if (this.loadedMeshInfo && this.loadedMeshInfo.axisMeshes) {
      for (var axis = 0; axis < numAxes; axis++) {
        // Update the button mesh transform
        this.lerpAxisTransform(axis, evt.detail.axis[axis] || 0.0);
      }
    }

    this.emitIfAxesChanged(this, this.mapping.axes, evt);
  },

  setModelVisibility: function (visible) {
    var model = this.el.getObject3D('mesh');
    visible = visible !== undefined ? visible : this.modelVisible;
    this.modelVisible = visible;
    if (!model) { return; }
    model.visible = visible;
  }
});

},{"../constants":93,"../core/component":101,"../utils/":174,"../utils/bind":168,"../utils/tracked-controls":182}],93:[function(_dereq_,module,exports){
module.exports = {
  AFRAME_INJECTED: 'aframe-injected',
  DEFAULT_CAMERA_HEIGHT: 1.6,
  DEFAULT_HANDEDNESS: 'right',
  keyboardevent: _dereq_('./keyboardevent')
};

},{"./keyboardevent":94}],94:[function(_dereq_,module,exports){
module.exports = {
  // Tiny KeyboardEvent.code polyfill.
  KEYCODE_TO_CODE: {
    '38': 'ArrowUp',
    '37': 'ArrowLeft',
    '40': 'ArrowDown',
    '39': 'ArrowRight',
    '87': 'KeyW',
    '65': 'KeyA',
    '83': 'KeyS',
    '68': 'KeyD'
  }
};

},{}],95:[function(_dereq_,module,exports){
var ANode = _dereq_('./a-node');
var bind = _dereq_('../utils/bind');
var debug = _dereq_('../utils/debug');
var registerElement = _dereq_('./a-register-element').registerElement;
var THREE = _dereq_('../lib/three');

var fileLoader = new THREE.FileLoader();
var warn = debug('core:a-assets:warn');

/**
 * Asset management system. Handles blocking on asset loading.
 */
module.exports = registerElement('a-assets', {
  prototype: Object.create(ANode.prototype, {
    createdCallback: {
      value: function () {
        this.isAssets = true;
        this.fileLoader = fileLoader;
        this.timeout = null;
      }
    },

    attachedCallback: {
      value: function () {
        var self = this;
        var i;
        var loaded = [];
        var mediaEl;
        var mediaEls;
        var imgEl;
        var imgEls;
        var timeout;

        if (!this.parentNode.isScene) {
          throw new Error('<a-assets> must be a child of a <a-scene>.');
        }

        // Wait for <img>s.
        imgEls = this.querySelectorAll('img');
        for (i = 0; i < imgEls.length; i++) {
          imgEl = fixUpMediaElement(imgEls[i]);
          loaded.push(new Promise(function (resolve, reject) {
            // Set in cache because we won't be needing to call three.js loader if we have.
            // a loaded media element.
            THREE.Cache.files[imgEls[i].getAttribute('src')] = imgEl;
            imgEl.onload = resolve;
            imgEl.onerror = reject;
          }));
        }

        // Wait for <audio>s and <video>s.
        mediaEls = this.querySelectorAll('audio, video');
        for (i = 0; i < mediaEls.length; i++) {
          mediaEl = fixUpMediaElement(mediaEls[i]);
          if (!mediaEl.src && !mediaEl.srcObject) {
            warn('Audio/video asset has neither `src` nor `srcObject` attributes.');
          }
          loaded.push(mediaElementLoaded(mediaEl));
        }

        // Trigger loaded for scene to start rendering.
        Promise.all(loaded).then(bind(this.load, this));

        // Timeout to start loading anyways.
        timeout = parseInt(this.getAttribute('timeout'), 10) || 3000;
        this.timeout = setTimeout(function () {
          if (self.hasLoaded) { return; }
          warn('Asset loading timed out in ', timeout, 'ms');
          self.emit('timeout');
          self.load();
        }, timeout);
      }
    },

    detachedCallback: {
      value: function () {
        if (this.timeout) { clearTimeout(this.timeout); }
      }
    },

    load: {
      value: function () {
        ANode.prototype.load.call(this, null, function waitOnFilter (el) {
          return el.isAssetItem && el.hasAttribute('src');
        });
      }
    }
  })
});

/**
 * Preload using XHRLoader for any type of asset.
 */
registerElement('a-asset-item', {
  prototype: Object.create(ANode.prototype, {
    createdCallback: {
      value: function () {
        this.data = null;
        this.isAssetItem = true;
      }
    },

    attachedCallback: {
      value: function () {
        var self = this;
        var src = this.getAttribute('src');
        fileLoader.setResponseType(
          this.getAttribute('response-type') || inferResponseType(src));
        fileLoader.load(src, function handleOnLoad (response) {
          self.data = response;
          /*
            Workaround for a Chrome bug. If another XHR is sent to the same url before the
            previous one closes, the second request never finishes.
            setTimeout finishes the first request and lets the logic triggered by load open
            subsequent requests.
            setTimeout can be removed once the fix for the bug below ships:
            https://bugs.chromium.org/p/chromium/issues/detail?id=633696&q=component%3ABlink%3ENetwork%3EXHR%20&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified
          */
          setTimeout(function load () { ANode.prototype.load.call(self); });
        }, function handleOnProgress (xhr) {
          self.emit('progress', {
            loadedBytes: xhr.loaded,
            totalBytes: xhr.total,
            xhr: xhr
          });
        }, function handleOnError (xhr) {
          self.emit('error', {xhr: xhr});
        });
      }
    }
  })
});

/**
 * Create a Promise that resolves once the media element has finished buffering.
 *
 * @param {Element} el - HTMLMediaElement.
 * @returns {Promise}
 */
function mediaElementLoaded (el) {
  if (!el.hasAttribute('autoplay') && el.getAttribute('preload') !== 'auto') {
    return;
  }

  // If media specifies autoplay or preload, wait until media is completely buffered.
  return new Promise(function (resolve, reject) {
    if (el.readyState === 4) { return resolve(); }  // Already loaded.
    if (el.error) { return reject(); }  // Error.

    el.addEventListener('loadeddata', checkProgress, false);
    el.addEventListener('progress', checkProgress, false);
    el.addEventListener('error', reject, false);

    function checkProgress () {
      // Add up the seconds buffered.
      var secondsBuffered = 0;
      for (var i = 0; i < el.buffered.length; i++) {
        secondsBuffered += el.buffered.end(i) - el.buffered.start(i);
      }

      // Compare seconds buffered to media duration.
      if (secondsBuffered >= el.duration) {
        // Set in cache because we won't be needing to call three.js loader if we have.
        // a loaded media element.
        // Store video elements only. three.js loader is used for audio elements.
        // See assetParse too.
        if (el.tagName === 'VIDEO') {
          THREE.Cache.files[el.getAttribute('src')] = el;
        }
        resolve();
      }
    }
  });
}

/**
 * Automatically add attributes to media elements where convenient.
 * crossorigin, playsinline.
 */
function fixUpMediaElement (mediaEl) {
  // Cross-origin.
  var newMediaEl = setCrossOrigin(mediaEl);

  // Plays inline for mobile.
  if (newMediaEl.tagName && newMediaEl.tagName.toLowerCase() === 'video') {
    newMediaEl.setAttribute('playsinline', '');
    newMediaEl.setAttribute('webkit-playsinline', '');
  }

  if (newMediaEl !== mediaEl) {
    mediaEl.parentNode.appendChild(newMediaEl);
    mediaEl.parentNode.removeChild(mediaEl);
  }
  return newMediaEl;
}

/**
 * Automatically set `crossorigin` if not defined on the media element.
 * If it is not defined, we must create and re-append a new media element <img> and
 * have the browser re-request it with `crossorigin` set.
 *
 * @param {Element} Media element (e.g., <img>, <audio>, <video>).
 * @returns {Element} Media element to be used to listen to for loaded events.
 */
function setCrossOrigin (mediaEl) {
  var newMediaEl;
  var src;

  // Already has crossorigin set.
  if (mediaEl.hasAttribute('crossorigin')) { return mediaEl; }

  src = mediaEl.getAttribute('src');

  if (src !== null) {
    // Does not have protocol.
    if (src.indexOf('://') === -1) { return mediaEl; }

    // Determine if cross origin is actually needed.
    if (extractDomain(src) === window.location.host) { return mediaEl; }
  }

  warn('Cross-origin element (e.g., <img>) was requested without `crossorigin` set. ' +
       'A-Frame will re-request the asset with `crossorigin` attribute set. ' +
       'Please set `crossorigin` on the element (e.g., <img crossorigin="anonymous">)', src);
  mediaEl.crossOrigin = 'anonymous';
  newMediaEl = mediaEl.cloneNode(true);
  return newMediaEl;
}

/**
 * Extract domain out of URL.
 *
 * @param {string} url
 * @returns {string}
 */
function extractDomain (url) {
  // Find and remove protocol (e.g., http, ftp, etc.) to get domain.
  var domain = url.indexOf('://') > -1 ? url.split('/')[2] : url.split('/')[0];

  // Find and remove port number.
  return domain.substring(0, domain.indexOf(':'));
}

/**
 * Infer response-type attribute from src.
 * Default is text(default XMLHttpRequest.responseType)
 * but we use arraybuffer for .gltf and .glb files
 * because of THREE.GLTFLoader specification.
 *
 * @param {string} src
 * @returns {string}
 */
function inferResponseType (src) {
  var dotLastIndex = src.lastIndexOf('.');
  if (dotLastIndex >= 0) {
    var extension = src.slice(dotLastIndex, src.length);
    if (extension === '.gltf' || extension === '.glb') {
      return 'arraybuffer';
    }
  }
  return 'text';
}
module.exports.inferResponseType = inferResponseType;

},{"../lib/three":149,"../utils/bind":168,"../utils/debug":170,"./a-node":99,"./a-register-element":100}],96:[function(_dereq_,module,exports){
var debug = _dereq_('../utils/debug');
var registerElement = _dereq_('./a-register-element').registerElement;

var warn = debug('core:cubemap:warn');

/**
 * Cubemap element that handles validation and exposes list of URLs.
 * Does not listen to updates.
 */
module.exports = registerElement('a-cubemap', {
  prototype: Object.create(window.HTMLElement.prototype, {
    /**
     * Calculates this.srcs.
     */
    attachedCallback: {
      value: function () {
        this.srcs = this.validate();
      },
      writable: window.debug
    },

    /**
     * Checks for exactly six elements with [src].
     * Does not check explicitly for <img>s in case user does not want
     * prefetching.
     *
     * @returns {Array|null} - six URLs if valid, else null.
     */
    validate: {
      value: function () {
        var elements = this.querySelectorAll('[src]');
        var i;
        var srcs = [];
        if (elements.length === 6) {
          for (i = 0; i < elements.length; i++) {
            srcs.push(elements[i].getAttribute('src'));
          }
          return srcs;
        }
        // Else if there are not six elements, throw a warning.
        warn(
          '<a-cubemap> did not contain exactly six elements each with a ' +
          '`src` attribute.');
      },
      writable: window.debug
    }
  })
});

},{"../utils/debug":170,"./a-register-element":100}],97:[function(_dereq_,module,exports){
var ANode = _dereq_('./a-node');
var COMPONENTS = _dereq_('./component').components;
var registerElement = _dereq_('./a-register-element').registerElement;
var THREE = _dereq_('../lib/three');
var utils = _dereq_('../utils/');

var AEntity;
var debug = utils.debug('core:a-entity:debug');
var warn = utils.debug('core:a-entity:warn');

var MULTIPLE_COMPONENT_DELIMITER = '__';
var OBJECT3D_COMPONENTS = ['position', 'rotation', 'scale', 'visible'];
var ONCE = {once: true};

/**
 * Entity is a container object that components are plugged into to comprise everything in
 * the scene. In A-Frame, they inherently have position, rotation, and scale.
 *
 * To be able to take components, the scene element inherits from the entity definition.
 *
 * @member {object} components - entity's currently initialized components.
 * @member {object} object3D - three.js object.
 * @member {array} states
 * @member {boolean} isPlaying - false if dynamic behavior of the entity is paused.
 */
var proto = Object.create(ANode.prototype, {
  createdCallback: {
    value: function () {
      this.components = {};
      // To avoid double initializations and infinite loops.
      this.initializingComponents = {};
      this.componentsToUpdate = {};
      this.isEntity = true;
      this.isPlaying = false;
      this.object3D = new THREE.Group();
      this.object3D.el = this;
      this.object3DMap = {};
      this.parentEl = null;
      this.rotationObj = {};
      this.states = [];
    }
  },

  /**
   * Handle changes coming from the browser DOM inspector.
   */
  attributeChangedCallback: {
    value: function (attr, oldVal, newVal) {
      var component = this.components[attr];
      // If the empty string is passed by the component initialization
      // logic we ignore the component update.
      if (component && component.justInitialized && newVal === '') {
        delete component.justInitialized;
        return;
      }
      // When a component is removed after calling el.removeAttribute('material')
      if (!component && newVal === null) { return; }
      this.setEntityAttribute(attr, oldVal, newVal);
    }
  },

  /**
   * Add to parent, load, play.
   */
  attachedCallback: {
    value: function () {
      var assetsEl;  // Asset management system element.
      var sceneEl = this.sceneEl;
      var self = this;  // Component.

      this.addToParent();

      // Don't .load() scene on attachedCallback.
      if (this.isScene) { return; }

      // Gracefully not error when outside of <a-scene> (e.g., tests).
      if (!sceneEl) {
        this.load();
        return;
      }

      // Wait for asset management system to finish before loading.
      assetsEl = sceneEl.querySelector('a-assets');
      if (assetsEl && !assetsEl.hasLoaded) {
        assetsEl.addEventListener('loaded', function () { self.load(); });
        return;
      }
      this.load();
    }
  },

  /**
   * Tell parent to remove this element's object3D from its object3D.
   * Do not call on scene element because that will cause a call to document.body.remove().
   */
  detachedCallback: {
    value: function () {
      var componentName;

      if (!this.parentEl) { return; }

      // Remove components.
      for (componentName in this.components) { this.removeComponent(componentName); }

      if (this.isScene) { return; }

      this.removeFromParent();
      ANode.prototype.detachedCallback.call(this);

      // Remove cyclic reference.
      this.object3D.el = null;
    }
  },

  getObject3D: {
    value: function (type) {
      return this.object3DMap[type];
    }
  },

  /**
   * Set a THREE.Object3D into the map.
   *
   * @param {string} type - Developer-set name of the type of object, will be unique per type.
   * @param {object} obj - A THREE.Object3D.
   */
  setObject3D: {
    value: function (type, obj) {
      var oldObj;
      var self = this;

      if (!(obj instanceof THREE.Object3D)) {
        throw new Error(
          '`Entity.setObject3D` was called with an object that was not an instance of ' +
          'THREE.Object3D.'
        );
      }

      // Remove existing object of the type.
      oldObj = this.getObject3D(type);
      if (oldObj) { this.object3D.remove(oldObj); }

      // Set references to A-Frame entity.
      obj.el = this;
      if (obj.children.length) {
        obj.traverse(function bindEl (child) {
          child.el = self;
        });
      }

      // Add.
      this.object3D.add(obj);
      this.object3DMap[type] = obj;
      this.emit('object3dset', {object: obj, type: type});
    }
  },

  /**
   * Remove object from scene and entity object3D map.
   */
  removeObject3D: {
    value: function (type) {
      var obj = this.getObject3D(type);
      if (!obj) {
        warn('Tried to remove `Object3D` of type:', type, 'which was not defined.');
        return;
      }
      this.object3D.remove(obj);
      delete this.object3DMap[type];
      this.emit('object3dremove', {type: type});
    }
  },

  /**
   * Gets or creates an object3D of a given type.
   *
   * @param {string} type - Type of the object3D.
   * @param {string} Constructor - Constructor to use to create the object3D if needed.
   * @returns {object}
   */
  getOrCreateObject3D: {
    value: function (type, Constructor) {
      var object3D = this.getObject3D(type);
      if (!object3D && Constructor) {
        object3D = new Constructor();
        this.setObject3D(type, object3D);
      }
      warn('`getOrCreateObject3D` has been deprecated. Use `setObject3D()` ' +
           'and `object3dset` event instead.');
      return object3D;
    }
  },

  /**
   * Add child entity.
   *
   * @param {Element} el - Child entity.
   */
  add: {
    value: function (el) {
      if (!el.object3D) {
        throw new Error("Trying to add an element that doesn't have an `object3D`");
      }
      this.object3D.add(el.object3D);
      this.emit('child-attached', {el: el});
    }
  },

  /**
   * Tell parentNode to add this entity to itself.
   */
  addToParent: {
    value: function () {
      var parentNode = this.parentEl = this.parentNode;

      // `!parentNode` check primarily for unit tests.
      if (!parentNode || !parentNode.add || this.attachedToParent) { return; }

      parentNode.add(this);
      this.attachedToParent = true;  // To prevent multiple attachments to same parent.
    }
  },

  /**
   * Tell parentNode to remove this entity from itself.
   */
  removeFromParent: {
    value: function () {
      var parentEl = this.parentEl;
      this.parentEl.remove(this);
      this.attachedToParent = false;
      this.parentEl = null;
      parentEl.emit('child-detached', {el: this});
    }
  },

  load: {
    value: function () {
      var self = this;

      if (this.hasLoaded || !this.parentEl) { return; }

      ANode.prototype.load.call(this, function entityLoadCallback () {
        // Check if entity was detached while it was waiting to load.
        if (!self.parentEl) { return; }

        self.updateComponents();
        if (self.isScene || self.parentEl.isPlaying) { self.play(); }
      });
    },
    writable: window.debug
  },

  /**
   * Remove child entity.
   *
   * @param {Element} el - Child entity.
   */
  remove: {
    value: function (el) {
      this.object3D.remove(el.object3D);
    }
  },

  /**
   * @returns {array} Direct children that are entities.
   */
  getChildEntities: {
    value: function () {
      var children = this.children;
      var childEntities = [];

      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child instanceof AEntity) {
          childEntities.push(child);
        }
      }

      return childEntities;
    }
  },

  /**
   * Initialize component.
   *
   * @param {string} attrName - Attribute name asociated to the component.
   * @param {object} data - Component data
   * @param {boolean} isDependency - True if the component is a dependency.
   */
  initComponent: {
    value: function (attrName, data, isDependency) {
      var component;
      var componentId;
      var componentInfo;
      var componentName;
      var isComponentDefined;

      componentInfo = utils.split(attrName, MULTIPLE_COMPONENT_DELIMITER);
      componentName = componentInfo[0];
      componentId = componentInfo.length > 2
        ? componentInfo.slice(1).join('__')
        : componentInfo[1];

      // Not a registered component.
      if (!COMPONENTS[componentName]) { return; }

      // Component is not a dependency and is undefined.
      // If a component is a dependency, then it is okay to have no data.
      isComponentDefined = checkComponentDefined(this, attrName) ||
                           data !== undefined;
      if (!isComponentDefined && !isDependency) { return; }

      // Component already initialized.
      if (attrName in this.components) { return; }

      // Initialize dependencies first
      this.initComponentDependencies(componentName);

      // If component name has an id we check component type multiplic
      if (componentId && !COMPONENTS[componentName].multiple) {
        throw new Error('Trying to initialize multiple ' +
                        'components of type `' + componentName +
                        '`. There can only be one component of this type per entity.');
      }
      component = new COMPONENTS[componentName].Component(this, data, componentId);
      if (this.isPlaying) { component.play(); }

      // Components are reflected in the DOM as attributes but the state is not shown
      // hence we set the attribute to empty string.
      // The flag justInitialized is for attributeChangedCallback to not overwrite
      // the component with the empty string.
      if (!this.hasAttribute(attrName)) {
        component.justInitialized = true;
        window.HTMLElement.prototype.setAttribute.call(this, attrName, '');
      }

      debug('Component initialized: %s', attrName);
    },
    writable: window.debug
  },

  /**
   * Initialize dependencies of a component.
   *
   * @param {string} name - Root component name.
   */
  initComponentDependencies: {
    value: function (name) {
      var self = this;
      var component = COMPONENTS[name];
      var dependencies;
      var i;

      // Not a component.
      if (!component) { return; }

      // No dependencies.
      dependencies = COMPONENTS[name].dependencies;

      if (!dependencies) { return; }

      // Initialize dependencies.
      for (i = 0; i < dependencies.length; i++) {
        // Call getAttribute to initialize the data from the DOM.
        self.initComponent(
          dependencies[i],
          window.HTMLElement.prototype.getAttribute.call(self, dependencies[i]) || undefined,
          true
        );
      }
    }
  },

  removeComponent: {
    value: function (name) {
      var component;

      component = this.components[name];
      if (!component) { return; }

      // Wait for component to initialize.
      if (!component.initialized) {
        this.addEventListener('componentinitialized', function tryRemoveLater (evt) {
          if (evt.detail.name !== name) { return; }
          this.removeComponent(name);
          this.removeEventListener('componentinitialized', tryRemoveLater);
        });
        return;
      }

      component.pause();
      component.remove();
      delete this.components[name];
      this.emit('componentremoved', component.evtDetail);
    },
    writable: window.debug
  },

  /**
   * Initialize or update all components.
   * Build data using initial components, defined attributes, mixins, and defaults.
   * Update default components before the rest.
   *
   * @member {function} getExtraComponents - Can be implemented to include component data
   *   from other sources (e.g., implemented by primitives).
   */
  updateComponents: {
    value: function () {
      var data;
      var extraComponents;
      var i;
      var name;
      var componentsToUpdate = this.componentsToUpdate;

      if (!this.hasLoaded) { return; }

      // Gather mixin-defined components.
      for (i = 0; i < this.mixinEls.length; i++) {
        for (name in this.mixinEls[i].componentCache) {
          if (isComponent(name)) { componentsToUpdate[name] = true; }
        }
      }

      // Gather from extra initial component data if defined (e.g., primitives).
      if (this.getExtraComponents) {
        extraComponents = this.getExtraComponents();
        for (name in extraComponents) {
          if (isComponent(name)) { componentsToUpdate[name] = true; }
        }
      }

      // Gather entity-defined components.
      for (i = 0; i < this.attributes.length; ++i) {
        name = this.attributes[i].name;
        if (OBJECT3D_COMPONENTS.indexOf(name) !== -1) { continue; }
        if (isComponent(name)) { componentsToUpdate[name] = true; }
      }

      // object3D components first (position, rotation, scale, visible).
      for (i = 0; i < OBJECT3D_COMPONENTS.length; i++) {
        name = OBJECT3D_COMPONENTS[i];
        if (!this.hasAttribute(name)) { continue; }
        this.updateComponent(name, this.getDOMAttribute(name));
      }

      // Initialize or update rest of components.
      for (name in componentsToUpdate) {
        data = mergeComponentData(this.getDOMAttribute(name),
                                  extraComponents && extraComponents[name]);
        this.updateComponent(name, data);
        delete componentsToUpdate[name];
      }
    },
    writable: window.debug
  },

  /**
   * Initialize, update, or remove a single component.
   *
   * When initializing, we set the component on `this.components`.
   *
   * @param {string} attr - Component name.
   * @param {object} attrValue - Value of the DOM attribute.
   * @param {boolean} clobber - If new attrValue completely replaces previous properties.
   */
  updateComponent: {
    value: function (attr, attrValue, clobber) {
      var component = this.components[attr];

      if (component) {
        // Remove component.
        if (attrValue === null && !checkComponentDefined(this, attr)) {
          this.removeComponent(attr);
          return;
        }
        // Component already initialized. Update component.
        component.updateProperties(attrValue, clobber);
        return;
      }

      // Component not yet initialized. Initialize component.
      this.initComponent(attr, attrValue, false);
    }
  },

  /**
   * If `attr` is a component name, detach the component from the entity.
   *
   * If `propertyName` is given, reset the component property value to its default.
   *
   * @param {string} attr - Attribute name, which could also be a component name.
   * @param {string} propertyName - Component prop name, if resetting an individual prop.
   */
  removeAttribute: {
    value: function (attr, propertyName) {
      var component = this.components[attr];

      // Remove component.
      if (component && propertyName === undefined) {
        this.removeComponent(attr);
      }

      // Reset component property value.
      if (component && propertyName !== undefined) {
        component.resetProperty(propertyName);
        return;
      }

      // Remove mixins.
      if (attr === 'mixin') {
        this.mixinUpdate('');
      }

      window.HTMLElement.prototype.removeAttribute.call(this, attr);
    }
  },

  /**
   * Start dynamic behavior associated with entity such as dynamic components and animations.
   * Tell all children entities to also play.
   */
  play: {
    value: function () {
      var entities;
      var i;
      var key;

      // Already playing.
      if (this.isPlaying || !this.hasLoaded) { return; }
      this.isPlaying = true;

      // Wake up all components.
      for (key in this.components) { this.components[key].play(); }

      // Tell all child entities to play.
      entities = this.getChildEntities();
      for (i = 0; i < entities.length; i++) { entities[i].play(); }

      this.emit('play');
    },
    writable: true
  },

  /**
   * Pause dynamic behavior associated with entity such as dynamic components and animations.
   * Tell all children entities to also pause.
   */
  pause: {
    value: function () {
      var entities;
      var i;
      var key;

      if (!this.isPlaying) { return; }
      this.isPlaying = false;

      // Sleep all components.
      for (key in this.components) { this.components[key].pause(); }

      // Tell all child entities to pause.
      entities = this.getChildEntities();
      for (i = 0; i < entities.length; i++) { entities[i].pause(); }

      this.emit('pause');
    },
    writable: true
  },

  /**
   * Deals with updates on entity-specific attributes (i.e., components and mixins).
   *
   * @param {string} attr
   * @param {string} oldVal
   * @param {string|object} newVal
   */
  setEntityAttribute: {
    value: function (attr, oldVal, newVal) {
      if (COMPONENTS[attr] || this.components[attr]) {
        this.updateComponent(attr, newVal);
        return;
      }
      if (attr === 'mixin') {
        // Ignore if `<a-node>` code is just updating computed mixin in the DOM.
        if (newVal === this.computedMixinStr) { return; }
        this.mixinUpdate(newVal, oldVal);
      }
    }
  },

  /**
   * When mixins updated, trigger init or optimized-update of relevant components.
   */
  mixinUpdate: {
    value: (function () {
      var componentsUpdated = [];

      return function (newMixins, oldMixins) {
        var component;
        var mixinEl;
        var mixinIds;
        var i;
        var self = this;

        if (!this.hasLoaded) {
          this.addEventListener('loaded', function () {
            self.mixinUpdate(newMixins, oldMixins);
          }, ONCE);
          return;
        }

        oldMixins = oldMixins || this.getAttribute('mixin');
        mixinIds = this.updateMixins(newMixins, oldMixins);

        // Loop over current mixins.
        componentsUpdated.length = 0;
        for (i = 0; i < this.mixinEls.length; i++) {
          for (component in this.mixinEls[i].componentCache) {
            if (componentsUpdated.indexOf(component) === -1) {
              if (this.components[component]) {
                // Update. Just rebuild data.
                this.components[component].handleMixinUpdate();
              } else {
                // Init. buildData will gather mixin values.
                this.initComponent(component, null);
              }
              componentsUpdated.push(component);
            }
          }
        }

        // Loop over old mixins to call for data rebuild.
        for (i = 0; i < mixinIds.oldMixinIds.length; i++) {
          mixinEl = document.getElementById(mixinIds.oldMixinIds[i]);
          if (!mixinEl) { continue; }
          for (component in mixinEl.componentCache) {
            if (componentsUpdated.indexOf(component) === -1) {
              if (this.components[component]) {
                if (this.getDOMAttribute(component)) {
                  // Update component if explicitly defined.
                  this.components[component].handleMixinUpdate();
                } else {
                  // Remove component if not explicitly defined.
                  this.removeComponent(component);
                }
              }
            }
          }
        }
      };
    })()
  },

  /**
   * setAttribute can:
   *
   * 1. Set a single property of a multi-property component.
   * 2. Set multiple properties of a multi-property component.
   * 3. Replace properties of a multi-property component.
   * 4. Set a value for a single-property component, mixin, or normal HTML attribute.
   *
   * @param {string} attrName - Component or attribute name.
   * @param {*} arg1 - Can be a value, property name, CSS-style property string, or
   *   object of properties.
   * @param {*|bool} arg2 - If arg1 is a property name, this should be a value. Otherwise,
   *   it is a boolean indicating whether to clobber previous values (defaults to false).
   */
  setAttribute: {
    value: (function () {
      var singlePropUpdate = {};

      return function (attrName, arg1, arg2) {
        var newAttrValue;
        var clobber;
        var componentName;
        var delimiterIndex;
        var isDebugMode;
        var key;

        delimiterIndex = attrName.indexOf(MULTIPLE_COMPONENT_DELIMITER);
        componentName = delimiterIndex > 0 ? attrName.substring(0, delimiterIndex) : attrName;

        // Not a component. Normal set attribute.
        if (!COMPONENTS[componentName]) {
          if (attrName === 'mixin') { this.mixinUpdate(arg1); }
          ANode.prototype.setAttribute.call(this, attrName, arg1);
          return;
        }

        // Initialize component first if not yet initialized.
        if (!this.components[attrName] && this.hasAttribute(attrName)) {
          this.updateComponent(
            attrName,
            window.HTMLElement.prototype.getAttribute.call(this, attrName));
        }

        // Determine new attributes from the arguments
        if (typeof arg2 !== 'undefined' &&
            typeof arg1 === 'string' &&
            arg1.length > 0 &&
            typeof utils.styleParser.parse(arg1) === 'string') {
          // Update a single property of a multi-property component
          for (key in singlePropUpdate) { delete singlePropUpdate[key]; }
          newAttrValue = singlePropUpdate;
          newAttrValue[arg1] = arg2;
          clobber = false;
        } else {
          // Update with a value, object, or CSS-style property string, with the possiblity
          // of clobbering previous values.
          newAttrValue = arg1;
          clobber = (arg2 === true);
        }

        // Update component
        this.updateComponent(attrName, newAttrValue, clobber);

        // In debug mode, write component data up to the DOM.
        isDebugMode = this.sceneEl && this.sceneEl.getAttribute('debug');
        if (isDebugMode) { this.components[attrName].flushToDOM(); }
      };
    })(),
    writable: window.debug
  },

  /**
   * Reflect component data in the DOM (as seen from the browser DOM Inspector).
   *
   * @param {bool} recursive - Also flushToDOM on the children.
   **/
  flushToDOM: {
    value: function (recursive) {
      var components = this.components;
      var child;
      var children = this.children;
      var i;
      var key;

      // Flush entity's components to DOM.
      for (key in components) {
        components[key].flushToDOM();
      }

      // Recurse.
      if (!recursive) { return; }
      for (i = 0; i < children.length; ++i) {
        child = children[i];
        if (!child.flushToDOM) { continue; }
        child.flushToDOM(recursive);
      }
    }
  },

  /**
   * If `attr` is a component, returns ALL component data including applied mixins and
   * defaults.
   *
   * If `attr` is not a component, fall back to HTML getAttribute.
   *
   * @param {string} attr
   * @returns {object|string} Object if component, else string.
   */
  getAttribute: {
    value: function (attr) {
      // If component, return component data.
      var component;
      if (attr === 'position') { return this.object3D.position; }
      if (attr === 'rotation') { return getRotation(this); }
      if (attr === 'scale') { return this.object3D.scale; }
      if (attr === 'visible') { return this.object3D.visible; }
      component = this.components[attr];
      if (component) { return component.data; }
      return window.HTMLElement.prototype.getAttribute.call(this, attr);
    },
    writable: window.debug
  },

  /**
   * If `attr` is a component, returns JUST the component data defined on the entity.
   * Like a partial version of `getComputedAttribute` as returned component data
   * does not include applied mixins or defaults.
   *
   * If `attr` is not a component, fall back to HTML getAttribute.
   *
   * @param {string} attr
   * @returns {object|string} Object if component, else string.
   */
  getDOMAttribute: {
    value: function (attr) {
      // If cached value exists, return partial component data.
      var component = this.components[attr];
      if (component) { return component.attrValue; }
      return window.HTMLElement.prototype.getAttribute.call(this, attr);
    },
    writable: window.debug
  },

  addState: {
    value: function (state) {
      if (this.is(state)) { return; }
      this.states.push(state);
      this.emit('stateadded', state);
    }
  },

  removeState: {
    value: function (state) {
      var stateIndex = this.states.indexOf(state);
      if (stateIndex === -1) { return; }
      this.states.splice(stateIndex, 1);
      this.emit('stateremoved', state);
    }
  },

  /**
   * Checks if the element is in a given state. e.g. el.is('alive');
   * @type {string} state - Name of the state we want to check
   */
  is: {
    value: function (state) {
      return this.states.indexOf(state) !== -1;
    }
  },

  /**
   * Open Inspector to this entity.
   */
  inspect: {
    value: function () {
      this.sceneEl.components.inspector.openInspector(this);
    }
  }
});

/**
 * Check if a component is *defined* for an entity, including defaults and mixins.
 * Does not check whether the component has been *initialized* for an entity.
 *
 * @param {string} el - Entity.
 * @param {string} name - Component name.
 * @returns {boolean}
 */
function checkComponentDefined (el, name) {
  // Check if element contains the component.
  if (el.components[name] && el.components[name].attrValue) { return true; }

  return isComponentMixedIn(name, el.mixinEls);
}

/**
 * Check if any mixins contains a component.
 *
 * @param {string} name - Component name.
 * @param {array} mixinEls - Array of <a-mixin>s.
 */
function isComponentMixedIn (name, mixinEls) {
  var i;
  var inMixin = false;
  for (i = 0; i < mixinEls.length; ++i) {
    inMixin = mixinEls[i].hasAttribute(name);
    if (inMixin) { break; }
  }
  return inMixin;
}

/**
 * Given entity defined value, merge in extra data if necessary.
 * Handle both single and multi-property components.
 *
 * @param {string} attrValue - Entity data.
 * @param extraData - Entity data from another source to merge in.
 */
function mergeComponentData (attrValue, extraData) {
  // Extra data not defined, just return attrValue.
  if (!extraData) { return attrValue; }

  // Merge multi-property data.
  if (extraData.constructor === Object) {
    return utils.extend(extraData, utils.styleParser.parse(attrValue || {}));
  }

  // Return data, precendence to the defined value.
  return attrValue || extraData;
}

function isComponent (componentName) {
  if (componentName.indexOf(MULTIPLE_COMPONENT_DELIMITER) !== -1) {
    componentName = utils.split(componentName, MULTIPLE_COMPONENT_DELIMITER)[0];
  }
  if (!COMPONENTS[componentName]) { return false; }
  return true;
}

function getRotation (entityEl) {
  var radToDeg = THREE.Math.radToDeg;
  var rotation = entityEl.object3D.rotation;
  var rotationObj = entityEl.rotationObj;
  rotationObj.x = radToDeg(rotation.x);
  rotationObj.y = radToDeg(rotation.y);
  rotationObj.z = radToDeg(rotation.z);
  return rotationObj;
}

AEntity = registerElement('a-entity', {prototype: proto});
module.exports = AEntity;

},{"../lib/three":149,"../utils/":174,"./a-node":99,"./a-register-element":100,"./component":101}],98:[function(_dereq_,module,exports){
var ANode = _dereq_('./a-node');
var registerElement = _dereq_('./a-register-element').registerElement;
var components = _dereq_('./component').components;
var utils = _dereq_('../utils');

var MULTIPLE_COMPONENT_DELIMITER = '__';

/**
 * @member {object} componentCache - Cache of pre-parsed values. An object where the keys
 *         are component names and the values are already parsed by the component.
 */
module.exports = registerElement('a-mixin', {
  prototype: Object.create(ANode.prototype, {
    createdCallback: {
      value: function () {
        this.componentCache = {};
        this.id = this.getAttribute('id');
        this.isMixin = true;
      }
    },

    attributeChangedCallback: {
      value: function (attr, oldVal, newVal) {
        this.cacheAttribute(attr, newVal);
        this.updateEntities();
      }
    },

    attachedCallback: {
      value: function () {
        this.sceneEl = this.closestScene();
        this.cacheAttributes();
        this.updateEntities();
        this.load();
      }
    },

    /**
     * setAttribute that parses and caches component values.
     */
    setAttribute: {
      value: function (attr, value) {
        window.HTMLElement.prototype.setAttribute.call(this, attr, value);
        this.cacheAttribute(attr, value);
      }
    },

    /**
     * If `attr` is a component, then parse the value using the schema and store it.
     */
    cacheAttribute: {
      value: function (attr, value) {
        var component;
        var componentName;

        // Get component data.
        componentName = utils.split(attr, MULTIPLE_COMPONENT_DELIMITER)[0];
        component = components[componentName];
        if (!component) { return; }
        if (value === undefined) {
          value = window.HTMLElement.prototype.getAttribute.call(this, attr);
        }
        this.componentCache[attr] = component.parseAttrValueForCache(value);
      }
    },

    /**
     * If `attr` is a component, then grab pre-parsed value from the cache.
     * Else do a normal getAttribute.
     */
    getAttribute: {
      value: function (attr) {
        return this.componentCache[attr] ||
               window.HTMLElement.prototype.getAttribute.call(this, attr);
      }
    },

    /**
     * Parse and cache every component defined on the mixin.
     */
    cacheAttributes: {
      value: function () {
        var attributes = this.attributes;
        var attrName;
        var i;
        for (i = 0; i < attributes.length; i++) {
          attrName = attributes[i].name;
          this.cacheAttribute(attrName);
        }
      }
    },

    /**
     * For entities that already have been loaded by the time the mixin was attached, tell
     * those entities to register the mixin and refresh their component data.
     */
    updateEntities: {
      value: function () {
        var entity;
        var entities;
        var i;

        if (!this.sceneEl) { return; }

        entities = this.sceneEl.querySelectorAll('[mixin~=' + this.id + ']');
        for (i = 0; i < entities.length; i++) {
          entity = entities[i];
          if (!entity.hasLoaded || entity.isMixin) { continue; }
          entity.mixinUpdate(this.id);
        }
      }
    }
  })
});

},{"../utils":174,"./a-node":99,"./a-register-element":100,"./component":101}],99:[function(_dereq_,module,exports){
/* global CustomEvent */
var registerElement = _dereq_('./a-register-element').registerElement;
var isNode = _dereq_('./a-register-element').isNode;
var utils = _dereq_('../utils/');

var warn = utils.debug('core:a-node:warn');
var error = utils.debug('core:a-node:error');

/**
 * Base class for A-Frame that manages loading of objects.
 *
 * Nodes can be modified using mixins.
 * Nodes emit a `loaded` event when they and their children have initialized.
 */
module.exports = registerElement('a-node', {
  prototype: Object.create(window.HTMLElement.prototype, {
    createdCallback: {
      value: function () {
        this.computedMixinStr = '';
        this.hasLoaded = false;
        this.isNode = true;
        this.mixinEls = [];
      },
      writable: window.debug
    },

    attachedCallback: {
      value: function () {
        var mixins;
        this.sceneEl = this.closestScene();

        if (!this.sceneEl) {
          warn('You are attempting to attach <' + this.tagName + '> outside of an A-Frame ' +
               'scene. Append this element to `<a-scene>` instead.');
        }

        this.hasLoaded = false;
        this.emit('nodeready', undefined, false);

        if (!this.isMixin) {
          mixins = this.getAttribute('mixin');
          if (mixins) { this.updateMixins(mixins); }
        }
      },
      writable: window.debug
    },

    /**
     * Handle mixin.
     */
    attributeChangedCallback: {
      value: function (attr, oldVal, newVal) {
        // Ignore if `<a-node>` code is just updating computed mixin in the DOM.
        if (newVal === this.computedMixinStr) { return; }

        if (attr === 'mixin' && !this.isMixin) {
          this.updateMixins(newVal, oldVal);
        }
      }
    },

   /**
    * Returns the first scene by traversing up the tree starting from and
    * including receiver element.
    */
    closestScene: {
      value: function closest () {
        var element = this;
        while (element) {
          if (element.isScene) { break; }
          element = element.parentElement;
        }
        return element;
      }
    },

    /**
     * Returns first element matching a selector by traversing up the tree starting
     * from and including receiver element.
     *
     * @param {string} selector - Selector of element to find.
     */
    closest: {
      value: function closest (selector) {
        var matches = this.matches || this.mozMatchesSelector ||
          this.msMatchesSelector || this.oMatchesSelector || this.webkitMatchesSelector;
        var element = this;
        while (element) {
          if (matches.call(element, selector)) { break; }
          element = element.parentElement;
        }
        return element;
      }
    },

    detachedCallback: {
      value: function () {
        this.hasLoaded = false;
      }
    },

    /**
     * Wait for children to load, if any.
     * Then emit `loaded` event and set `hasLoaded`.
     */
    load: {
      value: function (cb, childFilter) {
        var children;
        var childrenLoaded;
        var self = this;

        if (this.hasLoaded) { return; }

        // Default to waiting for all nodes.
        childFilter = childFilter || isNode;
        // Wait for children to load (if any), then load.
        children = this.getChildren();
        childrenLoaded = children.filter(childFilter).map(function (child) {
          return new Promise(function waitForLoaded (resolve) {
            if (child.hasLoaded) { return resolve(); }
            child.addEventListener('loaded', resolve);
          });
        });

        Promise.all(childrenLoaded).then(function emitLoaded () {
          self.hasLoaded = true;
          if (cb) { cb(); }
          self.emit('loaded', undefined, false);
        }).catch(function (err) {
          error('Failure loading node: ', err);
        });
      },
      writable: true
    },

    getChildren: {
      value: function () {
        return Array.prototype.slice.call(this.children, 0);
      }
    },

    /**
     * Unregister old mixins and listeners.
     * Register new mixins and listeners.
     * Registering means to update `this.mixinEls` with listeners.
     */
    updateMixins: {
      value: (function () {
        var newMixinIdArray = [];
        var oldMixinIdArray = [];
        var mixinIds = {};

        return function (newMixins, oldMixins) {
          var i;
          var newMixinIds;
          var oldMixinIds;

          newMixinIdArray.length = 0;
          oldMixinIdArray.length = 0;
          newMixinIds = newMixins ? utils.split(newMixins.trim(), /\s+/) : newMixinIdArray;
          oldMixinIds = oldMixins ? utils.split(oldMixins.trim(), /\s+/) : oldMixinIdArray;

          mixinIds.newMixinIds = newMixinIds;
          mixinIds.oldMixinIds = oldMixinIds;

          // Unregister old mixins.
          for (i = 0; i < oldMixinIds.length; i++) {
            if (newMixinIds.indexOf(oldMixinIds[i]) === -1) {
              this.unregisterMixin(oldMixinIds[i]);
            }
          }

          // Register new mixins.
          this.computedMixinStr = '';
          this.mixinEls.length = 0;
          for (i = 0; i < newMixinIds.length; i++) {
            this.registerMixin(document.getElementById(newMixinIds[i]));
          }

          // Update DOM. Keep track of `computedMixinStr` to not recurse back here after
          // update.
          if (this.computedMixinStr) {
            this.computedMixinStr = this.computedMixinStr.trim();
            window.HTMLElement.prototype.setAttribute.call(this, 'mixin',
                                                           this.computedMixinStr);
          }

          return mixinIds;
        };
      })()
    },

    /**
     * From mixin ID, add mixin element to `mixinEls`.
     *
     * @param {Element} mixinEl
     */
    registerMixin: {
      value: function (mixinEl) {
        var compositedMixinIds;
        var i;
        var mixin;

        if (!mixinEl) { return; }

        // Register composited mixins (if mixin has mixins).
        mixin = mixinEl.getAttribute('mixin');
        if (mixin) {
          compositedMixinIds = utils.split(mixin.trim(), /\s+/);
          for (i = 0; i < compositedMixinIds.length; i++) {
            this.registerMixin(document.getElementById(compositedMixinIds[i]));
          }
        }

        // Register mixin.
        this.computedMixinStr = this.computedMixinStr + ' ' + mixinEl.id;
        this.mixinEls.push(mixinEl);
      }
    },

    setAttribute: {
      value: function (attr, newValue) {
        if (attr === 'mixin') { this.updateMixins(newValue); }
        window.HTMLElement.prototype.setAttribute.call(this, attr, newValue);
      }
    },

    unregisterMixin: {
      value: function (mixinId) {
        var i;
        var mixinEls = this.mixinEls;
        var mixinEl;
        for (i = 0; i < mixinEls.length; ++i) {
          mixinEl = mixinEls[i];
          if (mixinId === mixinEl.id) {
            mixinEls.splice(i, 1);
            break;
          }
        }
      }
    },

    /**
     * Emit a DOM event.
     *
     * @param {string} name - Name of event.
     * @param {object} [detail={}] - Custom data to pass as `detail` to the event.
     * @param {boolean} [bubbles=true] - Whether the event should bubble.
     * @param {object} [extraData] - Extra data to pass to the event, if any.
     */
    emit: {
      value: (function () {
        var data = {};

        return function (name, detail, bubbles, extraData) {
          if (bubbles === undefined) { bubbles = true; }
          data.bubbles = !!bubbles;
          data.detail = detail;

          // If extra data is present, we need to create a new object.
          if (extraData) { data = utils.extend({}, extraData, data); }

          this.dispatchEvent(new CustomEvent(name, data));
        };
      })(),
      writable: window.debug
    }
  })
});

},{"../utils/":174,"./a-register-element":100}],100:[function(_dereq_,module,exports){
/*
  ------------------------------------------------------------
  ------------- WARNING WARNING WARNING WARNING --------------
  ------------------------------------------------------------

  This module wraps registerElement to deal with components that inherit from
  `ANode` and `AEntity`.  It's a pass through in any other case.

  It wraps some of the prototype methods of the created element to make sure
  that the corresponding functions in the base prototypes (`AEntity` and `ANode`)
  are also invoked. The method in the base prototype is always called before the one
  in the derived prototype.
*/

// Polyfill `document.registerElement`.
_dereq_('document-register-element');

var ANode;  // Must declare before AEntity. Initialized at the bottom.
var AEntity;
var knownTags = module.exports.knownTags = {};

function addTagName (tagName) {
  knownTags[tagName.toLowerCase()] = true;
}

/**
 * Return whether the element type is one of our known registered ones.
 *
 * @param {string} node - The name of the tag to register.
 * @returns {boolean} Whether the tag name matches that of our registered custom elements.
 */
module.exports.isNode = function (node) {
  return node.tagName.toLowerCase() in knownTags || node.isNode;
};

/**
 * @param {string} tagName - The name of the tag to register.
 * @param {object} obj - The prototype of the new element.
 * @returns {object} The prototype of the new element.
 */
module.exports.registerElement = function (tagName, obj) {
  var proto = Object.getPrototypeOf(obj.prototype);
  var newObj = obj;
  var isANode = ANode && proto === ANode.prototype;
  var isAEntity = AEntity && proto === AEntity.prototype;

  if (isANode || isAEntity) { addTagName(tagName); }

  // Wrap if element inherits from `ANode`.
  if (isANode) {
    newObj = wrapANodeMethods(obj.prototype);
    newObj = {prototype: Object.create(proto, newObj)};
  }

  // Wrap if element inherits from `AEntity`.
  if (isAEntity) {
    newObj = wrapAEntityMethods(obj.prototype);
    newObj = {prototype: Object.create(proto, newObj)};
  }

  // Give all functions their proper name.
  Object.getOwnPropertyNames(newObj.prototype).forEach(function (propName) {
    var propVal = newObj.prototype[propName];
    if (typeof propVal === 'function') {
      propVal.displayName = propName;
    }
  });

  return document.registerElement(tagName, newObj);
};

/**
 * Wrap some obj methods to call those on `ANode` base prototype.
 *
 * @param {object} obj - Object that contains the methods that will be wrapped.
 * @return {object} An object with the same properties as the input parameter but
 * with some of methods wrapped.
 */
function wrapANodeMethods (obj) {
  var newObj = {};
  var ANodeMethods = [
    'attachedCallback',
    'attributeChangedCallback',
    'createdCallback',
    'detachedCallback'
  ];
  wrapMethods(newObj, ANodeMethods, obj, ANode.prototype);
  copyProperties(obj, newObj);
  return newObj;
}

/**
 * This wraps some of the obj methods to call those on `AEntity` base prototype.
 *
 * @param {object} obj - The objects that contains the methods that will be wrapped.
 * @return {object} - An object with the same properties as the input parameter but
 * with some of methods wrapped.
 */
function wrapAEntityMethods (obj) {
  var newObj = {};
  var ANodeMethods = [
    'attachedCallback',
    'attributeChangedCallback',
    'createdCallback',
    'detachedCallback'
  ];
  var AEntityMethods = [
    'attachedCallback',
    'attributeChangedCallback',
    'createdCallback',
    'detachedCallback'
  ];

  wrapMethods(newObj, ANodeMethods, obj, ANode.prototype);
  wrapMethods(newObj, AEntityMethods, obj, AEntity.prototype);
  // Copies the remaining properties into the new object.
  copyProperties(obj, newObj);
  return newObj;
}

/**
 * Wrap a list a methods to ensure that those in the base prototype are called
 * before the derived one.
 *
 * @param {object} targetObj - Object that will contain the wrapped methods.
 * @param {array} methodList - List of methods from the derivedObj that will be wrapped.
 * @param {object} derivedObject - Object that inherits from the baseObj.
 * @param {object} baseObj - Object that derivedObj inherits from.
 */
function wrapMethods (targetObj, methodList, derivedObj, baseObj) {
  methodList.forEach(function (methodName) {
    wrapMethod(targetObj, methodName, derivedObj, baseObj);
  });
}
module.exports.wrapMethods = wrapMethods;

/**
 * Wrap one method to ensure that the one in the base prototype is called before
 * the one in the derived one.
 *
 * @param {object} obj - Object that will contain the wrapped method.
 * @param {string} methodName - The name of the method that will be wrapped.
 * @param {object} derivedObject - Object that inherits from the baseObj.
 * @param {object} baseObj - Object that derivedObj inherits from.
 */
function wrapMethod (obj, methodName, derivedObj, baseObj) {
  var derivedMethod = derivedObj[methodName];
  var baseMethod = baseObj[methodName];

  // Derived prototype does not define method, no need to wrap.
  if (!derivedMethod || !baseMethod) { return; }

  // Derived prototype doesn't override the one in the base one, no need to wrap.
  if (derivedMethod === baseMethod) { return; }

  // Wrap to ensure the base method is called before the one in the derived prototype.
  obj[methodName] = {
    value: function wrappedMethod () {
      baseMethod.apply(this, arguments);
      return derivedMethod.apply(this, arguments);
    },
    writable: window.debug
  };
}

/**
 * It copies the properties from source to destination object if they don't
 * exist already.
 *
 * @param {object} source - The object where properties are copied from.
 * @param {type} destination - The object where properties are copied to.
 */
function copyProperties (source, destination) {
  var props = Object.getOwnPropertyNames(source);
  props.forEach(function (prop) {
    var desc;
    if (!destination[prop]) {
      desc = Object.getOwnPropertyDescriptor(source, prop);
      destination[prop] = {value: source[prop], writable: desc.writable};
    }
  });
}

ANode = _dereq_('./a-node');
AEntity = _dereq_('./a-entity');

},{"./a-entity":97,"./a-node":99,"document-register-element":14}],101:[function(_dereq_,module,exports){
/* global Node */
var schema = _dereq_('./schema');
var scenes = _dereq_('./scene/scenes');
var systems = _dereq_('./system');
var utils = _dereq_('../utils/');

var components = module.exports.components = {};  // Keep track of registered components.
var parseProperties = schema.parseProperties;
var parseProperty = schema.parseProperty;
var processSchema = schema.process;
var isSingleProp = schema.isSingleProperty;
var stringifyProperties = schema.stringifyProperties;
var stringifyProperty = schema.stringifyProperty;
var styleParser = utils.styleParser;
var warn = utils.debug('core:component:warn');

var aframeScript = document.currentScript;
var upperCaseRegExp = new RegExp('[A-Z]+');

// Object pools by component, created upon registration.
var objectPools = {};

/**
 * Component class definition.
 *
 * Components configure appearance, modify behavior, or add functionality to
 * entities. The behavior and appearance of an entity can be changed at runtime
 * by adding, removing, or updating components. Entities do not share instances
 * of components.
 *
 * @member {object} el - Reference to the entity element.
 * @member {string} attrValue - Value of the corresponding HTML attribute.
 * @member {object} data - Component data populated by parsing the
 *         mapped attribute of the component plus applying defaults and mixins.
 */
var Component = module.exports.Component = function (el, attrValue, id) {
  var self = this;
  this.el = el;
  this.id = id;
  this.attrName = this.name + (id ? '__' + id : '');
  this.evtDetail = {id: this.id, name: this.name};
  this.initialized = false;
  this.isSingleProperty = isSingleProp(this.schema);
  this.isSinglePropertyObject = this.isSingleProperty &&
                                isObject(parseProperty(undefined, this.schema)) &&
                                !(this.schema.default instanceof window.HTMLElement);
  this.isObjectBased = !this.isSingleProperty || this.isSinglePropertyObject;
  this.el.components[this.attrName] = this;
  this.objectPool = objectPools[this.name];

  // Store component data from previous update call.
  this.attrValue = undefined;
  this.nextData = this.isObjectBased ? this.objectPool.use() : undefined;
  this.oldData = this.isObjectBased ? this.objectPool.use() : undefined;
  this.previousOldData = this.isObjectBased ? this.objectPool.use() : undefined;
  this.parsingAttrValue = this.isObjectBased ? this.objectPool.use() : undefined;

  // Last value passed to updateProperties.
  this.throttledEmitComponentChanged = utils.throttle(function emitChange () {
    el.emit('componentchanged', self.evtDetail, false);
  }, 200);
  this.updateProperties(attrValue);
};

Component.prototype = {
  /**
   * Contains the type schema and defaults for the data values.
   * Data is coerced into the types of the values of the defaults.
   */
  schema: {},

  /**
   * Init handler. Similar to attachedCallback.
   * Called during component initialization and is only run once.
   * Components can use this to set initial state.
   */
  init: function () { /* no-op */ },

  /**
   * Update handler. Similar to attributeChangedCallback.
   * Called whenever component's data changes.
   * Also called on component initialization when the component receives initial data.
   *
   * @param {object} prevData - Previous attributes of the component.
   */
  update: function (prevData) { /* no-op */ },

  updateSchema: undefined,

  /**
   * Tick handler.
   * Called on each tick of the scene render loop.
   * Affected by play and pause.
   *
   * @param {number} time - Scene tick time.
   * @param {number} timeDelta - Difference in current render time and previous render time.
   */
  tick: undefined,

  /**
   * Tock handler.
   * Called on each tock of the scene render loop.
   * Affected by play and pause.
   *
   * @param {number} time - Scene tick time.
   * @param {number} timeDelta - Difference in current render time and previous render time.
   * @param {object} camera - Camera used to render the last frame.
   */
  tock: undefined,

  /**
   * Called to start any dynamic behavior (e.g., animation, AI, events, physics).
   */
  play: function () { /* no-op */ },

  /**
   * Called to stop any dynamic behavior (e.g., animation, AI, events, physics).
   */
  pause: function () { /* no-op */ },

  /**
   * Remove handler. Similar to detachedCallback.
   * Called whenever component is removed from the entity (i.e., removeAttribute).
   * Components can use this to reset behavior on the entity.
   */
  remove: function () { /* no-op */ },

  /**
   * Parses each property based on property type.
   * If component is single-property, then parses the single property value.
   *
   * @param {string} value - HTML attribute value.
   * @param {boolean} silent - Suppress warning messages.
   * @returns {object} Component data.
   */
  parse: function (value, silent) {
    var schema = this.schema;
    if (this.isSingleProperty) { return parseProperty(value, schema); }
    return parseProperties(styleParser.parse(value), schema, true, this.name, silent);
  },

  /**
   * Stringify properties if necessary.
   *
   * Only called from `Entity.setAttribute` for properties whose parsers accept a non-string
   * value (e.g., selector, vec3 property types).
   *
   * @param {object} data - Complete component data.
   * @returns {string}
   */
  stringify: function (data) {
    var schema = this.schema;
    if (typeof data === 'string') { return data; }
    if (this.isSingleProperty) { return stringifyProperty(data, schema); }
    data = stringifyProperties(data, schema);
    return styleParser.stringify(data);
  },

  /**
   * Update the cache of the pre-parsed attribute value.
   *
   * @param {string} value - New data.
   * @param {boolean } clobber - Whether to wipe out and replace previous data.
   */
  updateCachedAttrValue: function (value, clobber) {
    var newAttrValue;
    var tempObject;
    var property;

    if (value === undefined) { return; }

    // If null value is the new attribute value, make the attribute value falsy.
    if (value === null) {
      if (this.isObjectBased && this.attrValue) {
        this.objectPool.recycle(this.attrValue);
      }
      this.attrValue = undefined;
      return;
    }

    if (value instanceof Object && !(value instanceof window.HTMLElement)) {
      // If value is an object, copy it to our pooled newAttrValue object to use to update
      // the attrValue.
      tempObject = this.objectPool.use();
      newAttrValue = utils.extend(tempObject, value);
    } else {
      newAttrValue = this.parseAttrValueForCache(value);
    }

    // Merge new data with previous `attrValue` if updating and not clobbering.
    if (this.isObjectBased && !clobber && this.attrValue) {
      for (property in this.attrValue) {
        if (newAttrValue[property] === undefined) {
          newAttrValue[property] = this.attrValue[property];
        }
      }
    }

    // Update attrValue.
    if (this.isObjectBased && !this.attrValue) {
      this.attrValue = this.objectPool.use();
    }
    utils.objectPool.clearObject(this.attrValue);
    this.attrValue = extendProperties(this.attrValue, newAttrValue, this.isObjectBased);
    utils.objectPool.clearObject(tempObject);
  },

  /**
   * Given an HTML attribute value parses the string based on the component schema.
   * To avoid double parsings of strings into strings we store the original instead
   * of the parsed one
   *
   * @param {string} value - HTML attribute value
   */
  parseAttrValueForCache: function (value) {
    var parsedValue;
    if (typeof value !== 'string') { return value; }
    if (this.isSingleProperty) {
      parsedValue = this.schema.parse(value);
      /**
       * To avoid bogus double parsings. Cached values will be parsed when building
       * component data. For instance when parsing a src id to its url, we want to cache
       * original string and not the parsed one (#monster -> models/monster.dae)
       * so when building data we parse the expected value.
       */
      if (typeof parsedValue === 'string') { parsedValue = value; }
    } else {
      // Parse using the style parser to avoid double parsing of individual properties.
      utils.objectPool.clearObject(this.parsingAttrValue);
      parsedValue = styleParser.parse(value, this.parsingAttrValue);
    }
    return parsedValue;
  },

  /**
   * Write cached attribute data to the entity DOM element.
   *
   * @param {boolean} isDefault - Whether component is a default component. Always flush for
   *   default components.
   */
  flushToDOM: function (isDefault) {
    var attrValue = isDefault ? this.data : this.attrValue;
    if (!attrValue) { return; }
    window.HTMLElement.prototype.setAttribute.call(this.el, this.attrName,
                                                   this.stringify(attrValue));
  },

  /**
   * Apply new component data if data has changed (from setAttribute).
   *
   * @param {string} attrValue - HTML attribute value.
   *        If undefined, use the cached attribute value and continue updating properties.
   * @param {boolean} clobber - The previous component data is overwritten by the atrrValue
   */
  updateProperties: function (attrValue, clobber) {
    var el = this.el;

    // Just cache the attribute if the entity has not loaded
    // Components are not initialized until the entity has loaded
    if (!el.hasLoaded) {
      this.updateCachedAttrValue(attrValue);
      return;
    }

    // Parse the attribute value.
    // Cache current attrValue for future updates. Updates `this.attrValue`.
    // `null` means no value on purpose, do not set a default value, let mixins take over.
    if (attrValue !== null) {
      attrValue = this.parseAttrValueForCache(attrValue);
    }

    // Cache current attrValue for future updates.
    this.updateCachedAttrValue(attrValue, clobber);

    if (this.initialized) {
      this.updateComponent(attrValue, clobber);
      this.callUpdateHandler();
    } else {
      this.initComponent();
    }
  },

  initComponent: function () {
    var el = this.el;
    var initialOldData;

    // Build data.
    if (this.updateSchema) { this.updateSchema(this.buildData(this.attrValue, false, true)); }
    this.data = this.buildData(this.attrValue);

    // Component is being already initialized.
    if (el.initializingComponents[this.name]) { return; }

    // Prevent infinite loop in case of init method setting same component on the entity.
    el.initializingComponents[this.name] = true;
    // Initialize component.
    this.init();
    this.initialized = true;
    delete el.initializingComponents[this.name];

    // Store current data as previous data for future updates.
    this.oldData = extendProperties(this.oldData, this.data, this.isObjectBased);

    // For oldData, pass empty object to multiple-prop schemas or object single-prop schema.
    // Pass undefined to rest of types.
    initialOldData = this.isObjectBased ? this.objectPool.use() : undefined;
    this.update(initialOldData);
    if (this.isObjectBased) { this.objectPool.recycle(initialOldData); }

    // Play the component if the entity is playing.
    if (el.isPlaying) { this.play(); }
    el.emit('componentinitialized', this.evtDetail, false);
  },

  /**
   * @param attrValue - Passed argument from setAttribute.
   */
  updateComponent: function (attrValue, clobber) {
    var key;
    var mayNeedSchemaUpdate;

    if (clobber) {
      // Clobber. Rebuild.
      if (this.updateSchema) {
        this.updateSchema(this.buildData(this.attrValue, true, true));
      }
      this.data = this.buildData(this.attrValue, true, false);
      return;
    }

    // Apply new value to this.data in place since direct update.
    if (this.isSingleProperty) {
      if (this.isObjectBased) {
        parseProperty(attrValue, this.schema);
      }
      // Single-property (already parsed).
      this.data = attrValue;
      return;
    }

    parseProperties(attrValue, this.schema, true, this.name);

    // Check if we need to update schema.
    if (this.schemaChangeKeys.length) {
      for (key in attrValue) {
        if (this.schema[key].schemaChange) {
          mayNeedSchemaUpdate = true;
          break;
        }
      }
    }
    if (mayNeedSchemaUpdate) {
      // Rebuild data if need schema update.
      if (this.updateSchema) {
        this.updateSchema(this.buildData(thi
