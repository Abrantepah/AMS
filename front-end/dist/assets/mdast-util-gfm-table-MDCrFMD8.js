import{a as k,i as D}from"./mdast-util-to-markdown-CNf13Pp0.js";import{m as R}from"./markdown-table-CS3BmPel.js";var g={};g.enter={table:_,tableData:f,tableHeader:f,tableRow:A};g.exit={codeText:B,table:y,tableData:u,tableHeader:u,tableRow:u};function _(e){this.enter({type:"table",align:e._align,children:[]},e),this.setData("inTable",!0)}function y(e){this.exit(e),this.setData("inTable")}function A(e){this.enter({type:"tableRow",children:[]},e)}function u(e){this.exit(e)}function f(e){this.enter({type:"tableCell",children:[]},e)}function B(e){var l=this.resume();this.getData("inTable")&&(l=l.replace(/\\([\\|])/g,L)),this.stack[this.stack.length-1].value=l,this.exit(e)}function L(e,l){return l==="|"?l:e}var M=k,P=D,H=R,W=O;function O(e){var l=e||{},c=l.tableCellPadding,C=l.tablePipeAlign,w=l.stringLength,o=c?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{table:T,tableRow:p,tableCell:b,inlineCode:m}};function T(a,n,t){return d(x(a,t),a.align)}function p(a,n,t){var r=v(a,t),i=d([r]);return i.slice(0,i.indexOf(`
`))}function b(a,n,t){var r=t.enter("tableCell"),i=M(a,t,{before:o,after:o});return r(),i}function d(a,n){return H(a,{align:n,alignDelimiters:C,padding:c,stringLength:w})}function x(a,n){for(var t=a.children,r=-1,i=t.length,s=[],h=n.enter("table");++r<i;)s[r]=v(t[r],n);return h(),s}function v(a,n){for(var t=a.children,r=-1,i=t.length,s=[],h=n.enter("tableRow");++r<i;)s[r]=b(t[r],a,n);return h(),s}function m(a,n,t){var r=P(a,n,t);return t.stack.indexOf("tableCell")!==-1&&(r=r.replace(/\|/g,"\\$&")),r}}export{g as f,W as t};
