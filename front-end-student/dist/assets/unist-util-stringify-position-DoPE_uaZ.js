var n={}.hasOwnProperty,c=f;function f(t){return!t||typeof t!="object"?"":n.call(t,"position")||n.call(t,"type")?i(t.position):n.call(t,"start")||n.call(t,"end")?i(t):n.call(t,"line")||n.call(t,"column")?r(t):""}function r(t){return(!t||typeof t!="object")&&(t={}),o(t.line)+":"+o(t.column)}function i(t){return(!t||typeof t!="object")&&(t={}),r(t.start)+"-"+r(t.end)}function o(t){return t&&typeof t=="number"?t:1}export{c as u};
