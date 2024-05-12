import{al as ee}from"./@ant-design-OtiXosd2.js";import{r as x}from"./react-DH8gkkhY.js";import{v as te}from"./vfile-fzL750Th.js";import{u as re}from"./unified-DX0a-VcR.js";import{r as ne}from"./remark-parse-ly6Tk_Kz.js";import{r as oe}from"./remark-rehype-B7K5eLTG.js";import{p as le}from"./prop-types-BKNjMPK8.js";import{f as ie,r as se,s as ae,h as ce}from"./property-information-Cytp7ONK.js";import{u as fe}from"./unist-util-visit-parents-Cg8WeLrx.js";import{s as ue}from"./space-separated-tokens-CMBzgJJ4.js";import{c as me}from"./comma-separated-tokens-DgTuumFk.js";import{s as de}from"./style-to-object-BJgLatKQ.js";var pe=O,I=fe,he=I.CONTINUE,ye=I.SKIP,ge=I.EXIT;O.CONTINUE=he;O.SKIP=ye;O.EXIT=ge;function O(e,t,a,o){typeof t=="function"&&typeof a!="function"&&(o=a,a=t,t=null),I(e,t,r,o);function r(i,l){var n=l[l.length-1],$=n?n.children.indexOf(i):null;return a(i,$,n)}}const we=pe;var Ee=be;function be(e){if(e.allowedElements&&e.disallowedElements)throw new TypeError("Only one of `allowedElements` and `disallowedElements` should be defined");if(e.allowedElements||e.disallowedElements||e.allowElement)return a=>{we(a,"element",t)};function t(a,o,r){const i=a,l=r;let n;if(e.allowedElements?n=!e.allowedElements.includes(i.tagName):e.disallowedElements&&(n=e.disallowedElements.includes(i.tagName)),!n&&e.allowElement&&typeof o=="number"&&(n=!e.allowElement(i,o,l)),n&&typeof o=="number")return e.unwrapDisallowed&&i.children?l.children.splice(o,1,...i.children):l.children.splice(o,1),o}}const z=["http","https","mailto","tel"];var ve=Te;function Te(e){const t=(e||"").trim(),a=t.charAt(0);if(a==="#"||a==="/")return t;const o=t.indexOf(":");if(o===-1)return t;let r=-1;for(;++r<z.length;){const i=z[r];if(o===i.length&&t.slice(0,i.length).toLowerCase()===i)return t}return r=t.indexOf("?"),r!==-1&&o>r||(r=t.indexOf("#"),r!==-1&&o>r)?t:"javascript:void(0)"}var H={},K={exports:{}},c={};/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var S=60103,N=60106,p=60107,h=60108,y=60114,g=60109,w=60110,E=60112,b=60113,M=60120,v=60115,T=60116,X=60121,q=60122,W=60117,G=60129,J=60131;if(typeof Symbol=="function"&&Symbol.for){var f=Symbol.for;S=f("react.element"),N=f("react.portal"),p=f("react.fragment"),h=f("react.strict_mode"),y=f("react.profiler"),g=f("react.provider"),w=f("react.context"),E=f("react.forward_ref"),b=f("react.suspense"),M=f("react.suspense_list"),v=f("react.memo"),T=f("react.lazy"),X=f("react.block"),q=f("react.server.block"),W=f("react.fundamental"),G=f("react.debug_trace_mode"),J=f("react.legacy_hidden")}function u(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case S:switch(e=e.type,e){case p:case y:case h:case b:case M:return e;default:switch(e=e&&e.$$typeof,e){case w:case E:case T:case v:case g:return e;default:return t}}case N:return t}}}var $e=g,ke=S,Pe=E,Ie=p,Oe=T,Se=v,Ne=N,Ce=y,Re=h,_e=b;c.ContextConsumer=w;c.ContextProvider=$e;c.Element=ke;c.ForwardRef=Pe;c.Fragment=Ie;c.Lazy=Oe;c.Memo=Se;c.Portal=Ne;c.Profiler=Ce;c.StrictMode=Re;c.Suspense=_e;c.isAsyncMode=function(){return!1};c.isConcurrentMode=function(){return!1};c.isContextConsumer=function(e){return u(e)===w};c.isContextProvider=function(e){return u(e)===g};c.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===S};c.isForwardRef=function(e){return u(e)===E};c.isFragment=function(e){return u(e)===p};c.isLazy=function(e){return u(e)===T};c.isMemo=function(e){return u(e)===v};c.isPortal=function(e){return u(e)===N};c.isProfiler=function(e){return u(e)===y};c.isStrictMode=function(e){return u(e)===h};c.isSuspense=function(e){return u(e)===b};c.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===p||e===y||e===G||e===h||e===b||e===M||e===J||typeof e=="object"&&e!==null&&(e.$$typeof===T||e.$$typeof===v||e.$$typeof===g||e.$$typeof===w||e.$$typeof===E||e.$$typeof===W||e.$$typeof===X||e[0]===q)};c.typeOf=u;K.exports=c;var je=K.exports;const j=x,Ue=je,De=ae,Fe=ie,A=se,He=ue,Me=me,Le=de;H.hastToReact=Y;H.hastChildrenToReact=Q;const F={}.hasOwnProperty,ze=new Set(["table","thead","tbody","tfoot","tr"]);function Q(e,t){const a=[];let o=-1,r;for(;++o<t.children.length;)r=t.children[o],r.type==="element"?a.push(Y(e,r,o,t)):r.type==="text"?(t.type!=="element"||!ze.has(t.tagName)||r.value!==`
`)&&a.push(r.value):r.type==="raw"&&!e.options.skipHtml&&a.push(r.value);return a}function Y(e,t,a,o){const r=e.options,i=e.schema,l=t.tagName,n={};let $=i,k;if(i.space==="html"&&l==="svg"&&($=De,e.schema=$),t.properties)for(k in t.properties)F.call(t.properties,k)&&Be(n,k,t.properties[k],e);(l==="ol"||l==="ul")&&e.listDepth++;const L=Q(e,t);(l==="ol"||l==="ul")&&e.listDepth--,e.schema=i;const R=t.position||{start:{line:null,column:null,offset:null},end:{line:null,column:null,offset:null}},d=r.components&&F.call(r.components,l)?r.components[l]:l,m=typeof d=="string"||d===j.Fragment;if(!Ue.isValidElementType(d))throw new TypeError(`Component for name \`${l}\` not defined or is not renderable`);if(n.key=[l,R.start.line,R.start.column,a].join("-"),l==="a"&&r.linkTarget&&(n.target=typeof r.linkTarget=="function"?r.linkTarget(n.href,t.children,n.title):r.linkTarget),l==="a"&&r.transformLinkUri&&(n.href=r.transformLinkUri(n.href,t.children,n.title)),!m&&l==="code"&&o.type==="element"&&o.tagName!=="pre"&&(n.inline=!0),!m&&(l==="h1"||l==="h2"||l==="h3"||l==="h4"||l==="h5"||l==="h6")&&(n.level=parseInt(l.charAt(1),10)),l==="img"&&r.transformImageUri&&(n.src=r.transformImageUri(n.src,n.alt,n.title)),!m&&l==="li"&&o.type==="element"){const _=Ae(t);n.checked=_&&_.properties?!!_.properties.checked:null,n.index=U(o,t),n.ordered=o.tagName==="ol"}return!m&&(l==="ol"||l==="ul")&&(n.ordered=l==="ol",n.depth=e.listDepth),(l==="td"||l==="th")&&(n.align&&(n.style||(n.style={}),n.style.textAlign=n.align,delete n.align),m||(n.isHeader=l==="th")),!m&&l==="tr"&&o.type==="element"&&(n.isHeader=o.tagName==="thead"),r.sourcePos&&(n["data-sourcepos"]=Ke(R)),!m&&r.rawSourcePos&&(n.sourcePosition=t.position),!m&&r.includeElementIndex&&(n.index=U(o,t),n.siblingCount=U(o)),m||(n.node=t),L.length>0?j.createElement(d,n,L):j.createElement(d,n)}function Ae(e){let t=-1;for(;++t<e.children.length;){const a=e.children[t];if(a.type==="element"&&a.tagName==="input")return a}return null}function U(e,t){let a=-1,o=0;for(;++a<e.children.length&&e.children[a]!==t;)e.children[a].type==="element"&&o++;return o}function Be(e,t,a,o){const r=Fe(o.schema,t);let i=a;i==null||i!==i||(i&&typeof i=="object"&&"length"in i&&(i=(r.commaSeparated?Me:He).stringify(i)),r.property==="style"&&typeof i=="string"&&(i=Ve(i)),r.space&&r.property?e[F.call(A,r.property)?A[r.property]:r.property]=i:r.attribute&&(e[r.attribute]=i))}function Ve(e){const t={};try{Le(e,a)}catch{}return t;function a(o,r){const i=o.slice(0,4)==="-ms-"?`ms-${o.slice(4)}`:o;t[i.replace(/-([a-z])/g,xe)]=r}}function xe(e,t){return t.toUpperCase()}function Ke(e){return[e.start.line,":",e.start.column,"-",e.end.line,":",e.end.column].map(t=>String(t)).join("")}const D=x,B=te,Xe=re,qe=ne,We=oe,s=le,Ge=ce,Je=Ee,Z=ve,Qe=H.hastChildrenToReact;var Ye=C;const V={}.hasOwnProperty,Ze="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",P={renderers:{to:"components",id:"change-renderers-to-components"},astPlugins:{id:"remove-buggy-html-in-markdown-parser"},allowDangerousHtml:{id:"remove-buggy-html-in-markdown-parser"},escapeHtml:{id:"remove-buggy-html-in-markdown-parser"},source:{to:"children",id:"change-source-to-children"},allowNode:{to:"allowElement",id:"replace-allownode-allowedtypes-and-disallowedtypes"},allowedTypes:{to:"allowedElements",id:"replace-allownode-allowedtypes-and-disallowedtypes"},disallowedTypes:{to:"disallowedElements",id:"replace-allownode-allowedtypes-and-disallowedtypes"},includeNodeIndex:{to:"includeElementIndex",id:"change-includenodeindex-to-includeelementindex"}};function C(e){for(const i in P)if(V.call(P,i)&&V.call(e,i)){const l=P[i];console.warn(`[react-markdown] Warning: please ${l.to?`use \`${l.to}\` instead of`:"remove"} \`${i}\` (see <${Ze}#${l.id}> for more info)`),delete P[i]}const t=Xe().use(qe).use(e.remarkPlugins||e.plugins||[]).use(We,{allowDangerousHtml:!0}).use(e.rehypePlugins||[]).use(Je,e);let a;typeof e.children=="string"?a=B(e.children):(e.children!==void 0&&e.children!==null&&console.warn(`[react-markdown] Warning: please pass a string as \`children\` (not: \`${e.children}\`)`),a=B());const o=t.runSync(t.parse(a),a);if(o.type!=="root")throw new TypeError("Expected a `root` node");let r=D.createElement(D.Fragment,{},Qe({options:e,schema:Ge,listDepth:0},o));return e.className&&(r=D.createElement("div",{className:e.className},r)),r}C.defaultProps={transformLinkUri:Z};C.propTypes={children:s.string,className:s.string,allowElement:s.func,allowedElements:s.arrayOf(s.string),disallowedElements:s.arrayOf(s.string),unwrapDisallowed:s.bool,remarkPlugins:s.arrayOf(s.oneOfType([s.object,s.func,s.arrayOf(s.oneOfType([s.object,s.func]))])),rehypePlugins:s.arrayOf(s.oneOfType([s.object,s.func,s.arrayOf(s.oneOfType([s.object,s.func]))])),sourcePos:s.bool,rawSourcePos:s.bool,skipHtml:s.bool,includeElementIndex:s.bool,transformLinkUri:s.oneOfType([s.func,s.bool]),linkTarget:s.oneOfType([s.func,s.string]),transformImageUri:s.func,components:s.object};C.uriTransformer=Z;const mt=ee(Ye);export{mt as S};
