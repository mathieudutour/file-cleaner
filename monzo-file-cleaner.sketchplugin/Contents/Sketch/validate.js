var that=this;function __skpm_run(e,t){that.context=t;var r=function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s="./src/cmd/validate.js")}({"./src/cmd/validate.js":
/*!*****************************!*\
  !*** ./src/cmd/validate.js ***!
  \*****************************/
/*! exports provided: default */function(e,t,r){"use strict";r.r(t),r.d(t,"default",function(){return a});var n=r(/*! sketch */"sketch"),s=r(/*! ../validators */"./src/validators.js");function a(){var e=Object(s.validateAll)(Object(n.getSelectedDocument)());e.success?n.UI.message("😍 Looks good!"):n.UI.message("‼️ ".concat(e.message))}},"./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getMasterPage */function(e,t,r){"use strict";function n(e){return e.pages.find(function(e){return"Master"===e.name})}r.r(t),r.d(t,"getMasterPage",function(){return n})},"./src/validators.js":
/*!***************************!*\
  !*** ./src/validators.js ***!
  \***************************/
/*! exports provided: validateMasterPresence, validatePageNames, validateArtboardNames, default, validateAll */function(e,t,r){"use strict";r.r(t),r.d(t,"validateMasterPresence",function(){return s}),r.d(t,"validatePageNames",function(){return a}),r.d(t,"validateArtboardNames",function(){return u}),r.d(t,"validateAll",function(){return o});var n=r(/*! ./utils */"./src/utils.js");function s(e){return Object(n.getMasterPage)(e)?{success:!0}:{success:!1,message:"Missing page 'Master'"}}function a(e){for(var t=["Master","Symbols"],r=e.pages,n=0;n<r.length;n++){var s=r[n].name;if(-1===t.indexOf(s))return{success:!1,message:"Invalid page name '".concat(s,"'")}}return{success:!0}}function u(e){for(var t=Object(n.getMasterPage)(e).layers.filter(function(e){return"Artboard"===e.type}),r={},s=0;s<t.length;s++){var a=t[s].name;if(r[a])return{success:!1,message:"Duplicate artboard name '".concat(a,"'")};if(r[a]=a,!a.match(/^\d{3,4}(\.[A-Z]{1,2})?/))return{success:!1,message:"Invalid artboard name '".concat(a,"'")}}return{success:!0}}var c=[s,a,u];function o(e){for(var t=0;t<c.length;t++){var r=(0,c[t])(e);if(!r.success)return r}return{success:!0}}t.default=c},sketch:
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */function(e,t){e.exports=require("sketch")}});"default"===e&&"function"==typeof r?r(t):r[e](t)}that.onRun=__skpm_run.bind(this,"default");