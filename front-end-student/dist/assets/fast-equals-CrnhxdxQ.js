import{am as Z}from"./@ant-design-OtiXosd2.js";var g={exports:{}};(function($,A){(function(s,y){y(A)})(Z,function(s){var y=typeof WeakSet=="function",d=Object.keys;function v(r,t){return r===t||r!==r&&t!==t}function w(r){return r.constructor===Object||r.constructor==null}function O(r){return!!r&&typeof r.then=="function"}function C(r){return!!(r&&r.$$typeof)}function p(){var r=[];return{add:function(t){r.push(t)},has:function(t){return r.indexOf(t)!==-1}}}var R=function(r){return r?function(){return new WeakSet}:p}(y);function P(r){return function(l){var u=r||l;return function(o,i,e){e===void 0&&(e=R());var f=!!o&&typeof o=="object",c=!!i&&typeof i=="object";if(f||c){var E=f&&e.has(o),q=c&&e.has(i);if(E||q)return E&&q;f&&e.add(o),c&&e.add(i)}return u(o,i,e)}}}function T(r,t,l,u){var n=r.length;if(t.length!==n)return!1;for(;n-- >0;)if(!l(r[n],t[n],u))return!1;return!0}function z(r,t,l,u){var n=r.size===t.size;if(n&&r.size){var o={};r.forEach(function(i,e){if(n){var f=!1,c=0;t.forEach(function(E,q){!f&&!o[c]&&(f=l(e,q,u)&&l(i,E,u),f&&(o[c]=!0)),c++}),n=f}})}return n}var k="_owner",m=Function.prototype.bind.call(Function.prototype.call,Object.prototype.hasOwnProperty);function j(r,t,l,u){var n=d(r),o=n.length;if(d(t).length!==o)return!1;if(o)for(var i=void 0;o-- >0;){if(i=n[o],i===k){var e=C(r),f=C(t);if((e||f)&&e!==f)return!1}if(!m(t,i)||!l(r[i],t[i],u))return!1}return!0}function D(r,t){return r.source===t.source&&r.global===t.global&&r.ignoreCase===t.ignoreCase&&r.multiline===t.multiline&&r.unicode===t.unicode&&r.sticky===t.sticky&&r.lastIndex===t.lastIndex}function N(r,t,l,u){var n=r.size===t.size;if(n&&r.size){var o={};r.forEach(function(i){if(n){var e=!1,f=0;t.forEach(function(c){!e&&!o[f]&&(e=l(i,c,u),e&&(o[f]=!0)),f++}),n=e}})}return n}var V=typeof Map=="function",W=typeof Set=="function";function a(r){var t=typeof r=="function"?r(l):l;function l(u,n,o){if(u===n)return!0;if(u&&n&&typeof u=="object"&&typeof n=="object"){if(w(u)&&w(n))return j(u,n,t,o);var i=Array.isArray(u),e=Array.isArray(n);return i||e?i===e&&T(u,n,t,o):(i=u instanceof Date,e=n instanceof Date,i||e?i===e&&v(u.getTime(),n.getTime()):(i=u instanceof RegExp,e=n instanceof RegExp,i||e?i===e&&D(u,n):O(u)||O(n)?u===n:V&&(i=u instanceof Map,e=n instanceof Map,i||e)?i===e&&z(u,n,t,o):W&&(i=u instanceof Set,e=n instanceof Set,i||e)?i===e&&N(u,n,t,o):j(u,n,t,o)))}return u!==u&&n!==n}return l}var x=a(),F=a(function(){return v}),H=a(P()),U=a(P(v));s.circularDeepEqual=H,s.circularShallowEqual=U,s.createCustomEqual=a,s.deepEqual=x,s.sameValueZeroEqual=v,s.shallowEqual=F,Object.defineProperty(s,"__esModule",{value:!0})})})(g,g.exports);var K=g.exports;export{K as f};
