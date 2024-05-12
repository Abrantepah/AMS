import{az as E}from"./@ant-design-DX5lgJrN.js";import{r as O}from"./stackframe-yTHhDZ2b.js";var $={exports:{}};(function(p,h){(function(l,c){p.exports=c(O())})(E,function(c){var v=/(^|@)\S+:\d+/,f=/^\s*at .*(\S+:\d+|\(native\))/m,d=/^(eval@)?(\[native code])?$/;return{parse:function(e){if(typeof e.stacktrace<"u"||typeof e["opera#sourceloc"]<"u")return this.parseOpera(e);if(e.stack&&e.stack.match(f))return this.parseV8OrIE(e);if(e.stack)return this.parseFFOrSafari(e);throw new Error("Cannot parse given Error object")},extractLocation:function(e){if(e.indexOf(":")===-1)return[e];var s=/(.+?)(?::(\d+))?(?::(\d+))?$/,r=s.exec(e.replace(/[()]/g,""));return[r[1],r[2]||void 0,r[3]||void 0]},parseV8OrIE:function(e){var s=e.stack.split(`
`).filter(function(r){return!!r.match(f)},this);return s.map(function(r){r.indexOf("(eval ")>-1&&(r=r.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var n=r.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),a=n.match(/ (\(.+\)$)/);n=a?n.replace(a[0],""):n;var i=this.extractLocation(a?a[1]:n),t=a&&n||void 0,u=["eval","<anonymous>"].indexOf(i[0])>-1?void 0:i[0];return new c({functionName:t,fileName:u,lineNumber:i[1],columnNumber:i[2],source:r})},this)},parseFFOrSafari:function(e){var s=e.stack.split(`
`).filter(function(r){return!r.match(d)},this);return s.map(function(r){if(r.indexOf(" > eval")>-1&&(r=r.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),r.indexOf("@")===-1&&r.indexOf(":")===-1)return new c({functionName:r});var n=/((.*".+"[^@]*)?[^@]*)(?:@)/,a=r.match(n),i=a&&a[1]?a[1]:void 0,t=this.extractLocation(r.replace(n,""));return new c({functionName:i,fileName:t[0],lineNumber:t[1],columnNumber:t[2],source:r})},this)},parseOpera:function(e){return!e.stacktrace||e.message.indexOf(`
`)>-1&&e.message.split(`
`).length>e.stacktrace.split(`
`).length?this.parseOpera9(e):e.stack?this.parseOpera11(e):this.parseOpera10(e)},parseOpera9:function(e){for(var s=/Line (\d+).*script (?:in )?(\S+)/i,r=e.message.split(`
`),n=[],a=2,i=r.length;a<i;a+=2){var t=s.exec(r[a]);t&&n.push(new c({fileName:t[2],lineNumber:t[1],source:r[a]}))}return n},parseOpera10:function(e){for(var s=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,r=e.stacktrace.split(`
`),n=[],a=0,i=r.length;a<i;a+=2){var t=s.exec(r[a]);t&&n.push(new c({functionName:t[3]||void 0,fileName:t[2],lineNumber:t[1],source:r[a]}))}return n},parseOpera11:function(e){var s=e.stack.split(`
`).filter(function(r){return!!r.match(v)&&!r.match(/^Error created at/)},this);return s.map(function(r){var n=r.split("@"),a=this.extractLocation(n.pop()),i=n.shift()||"",t=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,u;i.match(/\(([^)]*)\)/)&&(u=i.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var m=u===void 0||u==="[arguments not available]"?void 0:u.split(",");return new c({functionName:t,args:m,fileName:a[0],lineNumber:a[1],columnNumber:a[2],source:r})},this)}}})})($);
