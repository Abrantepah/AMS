import{e as P,g as oa,h as ba,d as q,c as Ta}from"./@babel-BaQnMuoD.js";import{r as t}from"./react-DH8gkkhY.js";import{r as Wa}from"./react-dom-BYO5wvSL.js";import{c as qr,a as j,g as Ea,b as za,r as va,s as Pa,h as Da,j as Ba,k as Ha,l as Qe,m as ia,n as xa,o as ua,p as _a,q as Fa}from"./rc-util-CWnEaukB.js";import{c as rr}from"./classnames-Bswp8e6k.js";import{R as ka}from"./rc-resize-observer-DKP4nymf.js";import{C as $a}from"./rc-motion-B3L3gIwS.js";var La=t.createContext(null),ca=[];function qa(e,a){var r=t.useState(function(){if(!qr())return null;var g=document.createElement("div");return g}),n=P(r,1),i=n[0],u=t.useRef(!1),s=t.useContext(La),c=t.useState(ca),m=P(c,2),f=m[0],M=m[1],d=s||(u.current?void 0:function(g){M(function(S){var L=[g].concat(oa(S));return L})});function D(){i.parentElement||document.body.appendChild(i),u.current=!0}function h(){var g;(g=i.parentElement)===null||g===void 0||g.removeChild(i),u.current=!1}return j(function(){return e?s?s(D):D():h(),h},[e]),j(function(){f.length&&(f.forEach(function(g){return g()}),M(ca))},[f]),[i,d]}function Aa(){return document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)&&window.innerWidth>document.body.offsetWidth}var Ua="rc-util-locker-".concat(Date.now()),fa=0;function Va(e){var a=!!e,r=t.useState(function(){return fa+=1,"".concat(Ua,"_").concat(fa)}),n=P(r,1),i=n[0];j(function(){if(a){var u=Ea(document.body).width,s=Aa();za(`
html body {
  overflow-y: hidden;
  `.concat(s?"width: calc(100% - ".concat(u,"px);"):"",`
}`),i)}else va(i);return function(){va(i)}},[a,i])}var da=!1;function Qa(e){return typeof e=="boolean"&&(da=e),da}var ha=function(a){return a===!1?!1:!qr()||!a?null:typeof a=="string"?document.querySelector(a):typeof a=="function"?a():a},Na=t.forwardRef(function(e,a){var r=e.open,n=e.autoLock,i=e.getContainer;e.debug;var u=e.autoDestroy,s=u===void 0?!0:u,c=e.children,m=t.useState(r),f=P(m,2),M=f[0],d=f[1],D=M||r;t.useEffect(function(){(s||r)&&d(r)},[r,s]);var h=t.useState(function(){return ha(i)}),g=P(h,2),S=g[0],L=g[1];t.useEffect(function(){var ee=ha(i);L(ee??null)});var x=qa(D&&!S),W=P(x,2),w=W[0],v=W[1],_=S??w;Va(n&&r&&qr()&&(_===w||_===document.body));var O=null;if(c&&Pa(c)&&a){var p=c;O=p.ref}var ue=Da(O,a);if(!D||!qr()||S===void 0)return null;var de=_===!1||Qa(),J=c;return a&&(J=t.cloneElement(c,{ref:ue})),t.createElement(La.Provider,{value:v},de?J:Wa.createPortal(J,_))});function ja(e){var a=e.prefixCls,r=e.align,n=e.arrow,i=e.arrowPos,u=n||{},s=u.className,c=u.content,m=i.x,f=m===void 0?0:m,M=i.y,d=M===void 0?0:M,D=t.useRef();if(!r||!r.points)return null;var h={position:"absolute"};if(r.autoArrow!==!1){var g=r.points[0],S=r.points[1],L=g[0],x=g[1],W=S[0],w=S[1];L===W||!["t","b"].includes(L)?h.top=d:L==="t"?h.top=0:h.bottom=0,x===w||!["l","r"].includes(x)?h.left=f:x==="l"?h.left=0:h.right=0}return t.createElement("div",{ref:D,className:rr("".concat(a,"-arrow"),s),style:h},c)}function Ja(e){var a=e.prefixCls,r=e.open,n=e.zIndex,i=e.mask,u=e.motion;return i?t.createElement($a,ba({},u,{motionAppear:!0,visible:r,removeOnLeave:!0}),function(s){var c=s.className;return t.createElement("div",{style:{zIndex:n},className:rr("".concat(a,"-mask"),c)})}):null}var Ga=t.memo(function(e){var a=e.children;return a},function(e,a){return a.cache}),Ka=t.forwardRef(function(e,a){var r=e.popup,n=e.className,i=e.prefixCls,u=e.style,s=e.target,c=e.onVisibleChanged,m=e.open,f=e.keepDom,M=e.fresh,d=e.onClick,D=e.mask,h=e.arrow,g=e.arrowPos,S=e.align,L=e.motion,x=e.maskMotion,W=e.forceRender,w=e.getPopupContainer,v=e.autoDestroy,_=e.portal,O=e.zIndex,p=e.onMouseEnter,ue=e.onMouseLeave,de=e.onPointerEnter,J=e.ready,ee=e.offsetX,he=e.offsetY,me=e.offsetR,le=e.offsetB,ge=e.onAlign,E=e.onPrepare,B=e.stretch,y=e.targetWidth,G=e.targetHeight,b=typeof r=="function"?r():r,se=m||f,re=(w==null?void 0:w.length)>0,ar=t.useState(!w||!re),je=P(ar,2),ye=je[0],Je=je[1];if(j(function(){!ye&&re&&s&&Je(!0)},[ye,re,s]),!ye)return null;var ae="auto",H={left:"-1000vw",top:"-1000vh",right:ae,bottom:ae};if(J||!m){var K,ve=S.points,ce=S.dynamicInset||((K=S._experimental)===null||K===void 0?void 0:K.dynamicInset),Ge=ce&&ve[0][1]==="r",tr=ce&&ve[0][0]==="b";Ge?(H.right=me,H.left=ae):(H.left=ee,H.right=ae),tr?(H.bottom=le,H.top=ae):(H.top=he,H.bottom=ae)}var F={};return B&&(B.includes("height")&&G?F.height=G:B.includes("minHeight")&&G&&(F.minHeight=G),B.includes("width")&&y?F.width=y:B.includes("minWidth")&&y&&(F.minWidth=y)),m||(F.pointerEvents="none"),t.createElement(_,{open:W||se,getContainer:w&&function(){return w(s)},autoDestroy:v},t.createElement(Ja,{prefixCls:i,open:m,zIndex:O,mask:D,motion:x}),t.createElement(ka,{onResize:ge,disabled:!m},function(Ke){return t.createElement($a,ba({motionAppear:!0,motionEnter:!0,motionLeave:!0,removeOnLeave:!1,forceRender:W,leavedClassName:"".concat(i,"-hidden")},L,{onAppearPrepare:E,onEnterPrepare:E,visible:m,onVisibleChanged:function(V){var Ce;L==null||(Ce=L.onVisibleChanged)===null||Ce===void 0||Ce.call(L,V),c(V)}}),function(De,V){var Ce=De.className,C=De.style,Te=rr(i,Ce,n);return t.createElement("div",{ref:Ba(Ke,a,V),className:Te,style:q(q(q(q({"--arrow-x":"".concat(g.x||0,"px"),"--arrow-y":"".concat(g.y||0,"px")},H),F),C),{},{boxSizing:"border-box",zIndex:O},u),onMouseEnter:p,onMouseLeave:ue,onPointerEnter:de,onClick:d},h&&t.createElement(ja,{prefixCls:i,arrow:h,arrowPos:g,align:S}),t.createElement(Ga,{cache:!m&&!M},b))})}))}),Za=t.forwardRef(function(e,a){var r=e.children,n=e.getTriggerDOMNode,i=Pa(r),u=t.useCallback(function(c){Ha(a,n?n(c):c)},[n]),s=Da(u,r.ref);return i?t.cloneElement(r,{ref:s}):r}),ma=t.createContext(null);function ga(e){return e?Array.isArray(e)?e:[e]:[]}function Ia(e,a,r,n){return t.useMemo(function(){var i=ga(r??a),u=ga(n??a),s=new Set(i),c=new Set(u);return e&&(s.has("hover")&&(s.delete("hover"),s.add("click")),c.has("hover")&&(c.delete("hover"),c.add("click"))),[s,c]},[e,a,r,n])}function Ya(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],r=arguments.length>2?arguments[2]:void 0;return r?e[0]===a[0]:e[0]===a[0]&&e[1]===a[1]}function Xa(e,a,r,n){for(var i=r.points,u=Object.keys(e),s=0;s<u.length;s+=1){var c,m=u[s];if(Ya((c=e[m])===null||c===void 0?void 0:c.points,i,n))return"".concat(a,"-placement-").concat(m)}return""}function ya(e,a,r,n){return a||(r?{motionName:"".concat(e,"-").concat(r)}:n?{motionName:n}:null)}function mr(e){return e.ownerDocument.defaultView}function la(e){for(var a=[],r=e==null?void 0:e.parentElement,n=["hidden","scroll","clip","auto"];r;){var i=mr(r).getComputedStyle(r),u=i.overflowX,s=i.overflowY,c=i.overflow;[u,s,c].some(function(m){return n.includes(m)})&&a.push(r),r=r.parentElement}return a}function hr(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;return Number.isNaN(e)?a:e}function dr(e){return hr(parseFloat(e),0)}function Ca(e,a){var r=q({},e);return(a||[]).forEach(function(n){if(!(n instanceof HTMLBodyElement||n instanceof HTMLHtmlElement)){var i=mr(n).getComputedStyle(n),u=i.overflow,s=i.overflowClipMargin,c=i.borderTopWidth,m=i.borderBottomWidth,f=i.borderLeftWidth,M=i.borderRightWidth,d=n.getBoundingClientRect(),D=n.offsetHeight,h=n.clientHeight,g=n.offsetWidth,S=n.clientWidth,L=dr(c),x=dr(m),W=dr(f),w=dr(M),v=hr(Math.round(d.width/g*1e3)/1e3),_=hr(Math.round(d.height/D*1e3)/1e3),O=(g-S-W-w)*v,p=(D-h-L-x)*_,ue=L*_,de=x*_,J=W*v,ee=w*v,he=0,me=0;if(u==="clip"){var le=dr(s);he=le*v,me=le*_}var ge=d.x+J-he,E=d.y+ue-me,B=ge+d.width+2*he-J-ee-O,y=E+d.height+2*me-ue-de-p;r.left=Math.max(r.left,ge),r.top=Math.max(r.top,E),r.right=Math.min(r.right,B),r.bottom=Math.min(r.bottom,y)}}),r}function Ma(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r="".concat(a),n=r.match(/^(.*)\%$/);return n?e*(parseFloat(n[1])/100):parseFloat(r)}function wa(e,a){var r=a||[],n=P(r,2),i=n[0],u=n[1];return[Ma(e.width,i),Ma(e.height,u)]}function Sa(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";return[e[0],e[1]]}function er(e,a){var r=a[0],n=a[1],i,u;return r==="t"?u=e.y:r==="b"?u=e.y+e.height:u=e.y+e.height/2,n==="l"?i=e.x:n==="r"?i=e.x+e.width:i=e.x+e.width/2,{x:i,y:u}}function Re(e,a){var r={t:"b",b:"t",l:"r",r:"l"};return e.map(function(n,i){return i===a?r[n]||"c":n}).join("")}function Oa(e,a,r,n,i,u,s){var c=t.useState({ready:!1,offsetX:0,offsetY:0,offsetR:0,offsetB:0,arrowX:0,arrowY:0,scaleX:1,scaleY:1,align:i[n]||{}}),m=P(c,2),f=m[0],M=m[1],d=t.useRef(0),D=t.useMemo(function(){return a?la(a):[]},[a]),h=t.useRef({}),g=function(){h.current={}};e||g();var S=Qe(function(){if(a&&r&&e){let Y=function(zr,X){var Oe=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Te,Br=b.x+zr,pe=b.y+X,Hr=Br+K,fr=pe+H,xr=Math.max(Br,Oe.left),ra=Math.max(pe,Oe.top),aa=Math.min(Hr,Oe.right),ta=Math.min(fr,Oe.bottom);return Math.max(0,(aa-xr)*(ta-ra))},Er=function(){xe=b.y+N,_e=xe+H,Se=b.x+T,Fe=Se+K};var W,w,v=a,_=v.ownerDocument,O=mr(v),p=O.getComputedStyle(v),ue=p.width,de=p.height,J=p.position,ee=v.style.left,he=v.style.top,me=v.style.right,le=v.style.bottom,ge=v.style.overflow,E=q(q({},i[n]),u),B=_.createElement("div");(W=v.parentElement)===null||W===void 0||W.appendChild(B),B.style.left="".concat(v.offsetLeft,"px"),B.style.top="".concat(v.offsetTop,"px"),B.style.position=J,B.style.height="".concat(v.offsetHeight,"px"),B.style.width="".concat(v.offsetWidth,"px"),v.style.left="0",v.style.top="0",v.style.right="auto",v.style.bottom="auto",v.style.overflow="hidden";var y;if(Array.isArray(r))y={x:r[0],y:r[1],width:0,height:0};else{var G=r.getBoundingClientRect();y={x:G.x,y:G.y,width:G.width,height:G.height}}var b=v.getBoundingClientRect(),se=_.documentElement,re=se.clientWidth,ar=se.clientHeight,je=se.scrollWidth,ye=se.scrollHeight,Je=se.scrollTop,ae=se.scrollLeft,H=b.height,K=b.width,ve=y.height,ce=y.width,Ge={left:0,top:0,right:re,bottom:ar},tr={left:-ae,top:-Je,right:je-ae,bottom:ye-Je},F=E.htmlRegion,Ke="visible",De="visibleFirst";F!=="scroll"&&F!==De&&(F=Ke);var V=F===De,Ce=Ca(tr,D),C=Ca(Ge,D),Te=F===Ke?C:Ce,Z=V?C:Te;v.style.left="auto",v.style.top="auto",v.style.right="0",v.style.bottom="0";var gr=v.getBoundingClientRect();v.style.left=ee,v.style.top=he,v.style.right=me,v.style.bottom=le,v.style.overflow=ge,(w=v.parentElement)===null||w===void 0||w.removeChild(B);var We=hr(Math.round(K/parseFloat(ue)*1e3)/1e3),Ee=hr(Math.round(H/parseFloat(de)*1e3)/1e3);if(We===0||Ee===0||ia(r)&&!xa(r))return;var yr=E.offset,A=E.targetOffset,Ar=wa(b,yr),nr=P(Ar,2),te=nr[0],ne=nr[1],Cr=wa(y,A),oe=P(Cr,2),Ur=oe[0],Mr=oe[1];y.x-=Ur,y.y-=Mr;var Vr=E.points||[],ze=P(Vr,2),I=ze[0],ke=ze[1],Me=Sa(ke),Q=Sa(I),wr=er(y,Me),Sr=er(b,Q),we=q({},E),T=wr.x-Sr.x+te,N=wr.y-Sr.y+ne,R=Y(T,N),Ze=Y(T,N,C),$e=er(y,["t","l"]),Be=er(b,["t","l"]),or=er(y,["b","r"]),ir=er(b,["b","r"]),He=E.overflow||{},ie=He.adjustX,Qr=He.adjustY,ur=He.shiftX,Ie=He.shiftY,lr=function(X){return typeof X=="boolean"?X:X>=0},xe,_e,Se,Fe;Er();var br=lr(Qr),sr=Q[0]===Me[0];if(br&&Q[0]==="t"&&(_e>Z.bottom||h.current.bt)){var Le=N;sr?Le-=H-ve:Le=$e.y-ir.y-ne;var Pr=Y(T,Le),Ye=Y(T,Le,C);Pr>R||Pr===R&&(!V||Ye>=Ze)?(h.current.bt=!0,N=Le,ne=-ne,we.points=[Re(Q,0),Re(Me,0)]):h.current.bt=!1}if(br&&Q[0]==="b"&&(xe<Z.top||h.current.tb)){var qe=N;sr?qe+=H-ve:qe=or.y-Be.y-ne;var U=Y(T,qe),jr=Y(T,qe,C);U>R||U===R&&(!V||jr>=Ze)?(h.current.tb=!0,N=qe,ne=-ne,we.points=[Re(Q,0),Re(Me,0)]):h.current.tb=!1}var Dr=lr(ie),kr=Q[1]===Me[1];if(Dr&&Q[1]==="l"&&(Fe>Z.right||h.current.rl)){var Ae=T;kr?Ae-=K-ce:Ae=$e.x-ir.x-te;var $r=Y(Ae,N),Jr=Y(Ae,N,C);$r>R||$r===R&&(!V||Jr>=Ze)?(h.current.rl=!0,T=Ae,te=-te,we.points=[Re(Q,1),Re(Me,1)]):h.current.rl=!1}if(Dr&&Q[1]==="r"&&(Se<Z.left||h.current.lr)){var Ue=T;kr?Ue+=K-ce:Ue=or.x-Be.x-te;var Lr=Y(Ue,N),Gr=Y(Ue,N,C);Lr>R||Lr===R&&(!V||Gr>=Ze)?(h.current.lr=!0,T=Ue,te=-te,we.points=[Re(Q,1),Re(Me,1)]):h.current.lr=!1}Er();var fe=ur===!0?0:ur;typeof fe=="number"&&(Se<C.left&&(T-=Se-C.left-te,y.x+ce<C.left+fe&&(T+=y.x-C.left+ce-fe)),Fe>C.right&&(T-=Fe-C.right-te,y.x>C.right-fe&&(T+=y.x-C.right+fe)));var be=Ie===!0?0:Ie;typeof be=="number"&&(xe<C.top&&(N-=xe-C.top-ne,y.y+ve<C.top+be&&(N+=y.y-C.top+ve-be)),_e>C.bottom&&(N-=_e-C.bottom-ne,y.y>C.bottom-be&&(N+=y.y-C.bottom+be)));var vr=b.x+T,Nr=vr+K,Ne=b.y+N,Ve=Ne+H,cr=y.x,Xe=cr+ce,Pe=y.y,Kr=Pe+ve,Zr=Math.max(vr,cr),Ir=Math.min(Nr,Xe),Rr=(Zr+Ir)/2,Yr=Rr-vr,Xr=Math.max(Ne,Pe),Or=Math.min(Ve,Kr),Tr=(Xr+Or)/2,pr=Tr-Ne;s==null||s(a,we);var ea=gr.right-b.x-(T+b.width),Wr=gr.bottom-b.y-(N+b.height);M({ready:!0,offsetX:T/We,offsetY:N/Ee,offsetR:ea/We,offsetB:Wr/Ee,arrowX:Yr/We,arrowY:pr/Ee,scaleX:We,scaleY:Ee,align:we})}}),L=function(){d.current+=1;var w=d.current;Promise.resolve().then(function(){d.current===w&&S()})},x=function(){M(function(w){return q(q({},w),{},{ready:!1})})};return j(x,[n]),j(function(){e||x()},[e]),[f.ready,f.offsetX,f.offsetY,f.offsetR,f.offsetB,f.arrowX,f.arrowY,f.scaleX,f.scaleY,f.align,L]}function pa(e,a,r,n,i){j(function(){if(e&&a&&r){let d=function(){n(),i()};var u=a,s=r,c=la(u),m=la(s),f=mr(s),M=new Set([f].concat(oa(c),oa(m)));return M.forEach(function(D){D.addEventListener("scroll",d,{passive:!0})}),f.addEventListener("resize",d,{passive:!0}),n(),function(){M.forEach(function(D){D.removeEventListener("scroll",d),f.removeEventListener("resize",d)})}}},[e,a,r])}function et(e,a,r,n,i,u,s,c){var m=t.useRef(e);m.current=e,t.useEffect(function(){if(a&&n&&(!i||u)){var f=function(h){var g=h.target;m.current&&!s(g)&&c(!1)},M=mr(n);M.addEventListener("mousedown",f,!0),M.addEventListener("contextmenu",f,!0);var d=ua(r);return d&&(d.addEventListener("mousedown",f,!0),d.addEventListener("contextmenu",f,!0)),function(){M.removeEventListener("mousedown",f,!0),M.removeEventListener("contextmenu",f,!0),d&&(d.removeEventListener("mousedown",f,!0),d.removeEventListener("contextmenu",f,!0))}}},[a,r,n,i,u])}var rt=["prefixCls","children","action","showAction","hideAction","popupVisible","defaultPopupVisible","onPopupVisibleChange","afterPopupVisibleChange","mouseEnterDelay","mouseLeaveDelay","focusDelay","blurDelay","mask","maskClosable","getPopupContainer","forceRender","autoDestroy","destroyPopupOnHide","popup","popupClassName","popupStyle","popupPlacement","builtinPlacements","popupAlign","zIndex","stretch","getPopupClassNameFromAlign","fresh","alignPoint","onPopupClick","onPopupAlign","arrow","popupMotion","maskMotion","popupTransitionName","popupAnimation","maskTransitionName","maskAnimation","className","getTriggerDOMNode"];function at(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Na,a=t.forwardRef(function(r,n){var i=r.prefixCls,u=i===void 0?"rc-trigger-popup":i,s=r.children,c=r.action,m=c===void 0?"hover":c,f=r.showAction,M=r.hideAction,d=r.popupVisible,D=r.defaultPopupVisible,h=r.onPopupVisibleChange,g=r.afterPopupVisibleChange,S=r.mouseEnterDelay,L=r.mouseLeaveDelay,x=L===void 0?.1:L,W=r.focusDelay,w=r.blurDelay,v=r.mask,_=r.maskClosable,O=_===void 0?!0:_,p=r.getPopupContainer,ue=r.forceRender,de=r.autoDestroy,J=r.destroyPopupOnHide,ee=r.popup,he=r.popupClassName,me=r.popupStyle,le=r.popupPlacement,ge=r.builtinPlacements,E=ge===void 0?{}:ge,B=r.popupAlign,y=r.zIndex,G=r.stretch,b=r.getPopupClassNameFromAlign,se=r.fresh,re=r.alignPoint,ar=r.onPopupClick,je=r.onPopupAlign,ye=r.arrow,Je=r.popupMotion,ae=r.maskMotion,H=r.popupTransitionName,K=r.popupAnimation,ve=r.maskTransitionName,ce=r.maskAnimation,Ge=r.className,tr=r.getTriggerDOMNode,F=Ta(r,rt),Ke=de||J||!1,De=t.useState(!1),V=P(De,2),Ce=V[0],C=V[1];j(function(){C(_a())},[]);var Te=t.useRef({}),Z=t.useContext(ma),gr=t.useMemo(function(){return{registerSubPopup:function(l,k){Te.current[l]=k,Z==null||Z.registerSubPopup(l,k)}}},[Z]),We=Fa(),Ee=t.useState(null),yr=P(Ee,2),A=yr[0],Ar=yr[1],nr=t.useRef(null),te=Qe(function(o){nr.current=o,ia(o)&&A!==o&&Ar(o),Z==null||Z.registerSubPopup(We,o)}),ne=t.useState(null),Cr=P(ne,2),oe=Cr[0],Ur=Cr[1],Mr=t.useRef(null),Vr=Qe(function(o){ia(o)&&oe!==o&&(Ur(o),Mr.current=o)}),ze=t.Children.only(s),I=(ze==null?void 0:ze.props)||{},ke={},Me=Qe(function(o){var l,k,z=oe;return(z==null?void 0:z.contains(o))||((l=ua(z))===null||l===void 0?void 0:l.host)===o||o===z||(A==null?void 0:A.contains(o))||((k=ua(A))===null||k===void 0?void 0:k.host)===o||o===A||Object.values(Te.current).some(function($){return($==null?void 0:$.contains(o))||o===$})}),Q=ya(u,Je,K,H),wr=ya(u,ae,ce,ve),Sr=t.useState(D||!1),we=P(Sr,2),T=we[0],N=we[1],R=d??T,Ze=Qe(function(o){d===void 0&&N(o)});j(function(){N(d||!1)},[d]);var $e=t.useRef(R);$e.current=R;var Be=t.useRef([]);Be.current=[];var or=Qe(function(o){var l;Ze(o),((l=Be.current[Be.current.length-1])!==null&&l!==void 0?l:R)!==o&&(Be.current.push(o),h==null||h(o))}),ir=t.useRef(),He=function(){clearTimeout(ir.current)},ie=function(l){var k=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;He(),k===0?or(l):ir.current=setTimeout(function(){or(l)},k*1e3)};t.useEffect(function(){return He},[]);var Qr=t.useState(!1),ur=P(Qr,2),Ie=ur[0],lr=ur[1];j(function(o){(!o||R)&&lr(!0)},[R]);var xe=t.useState(null),_e=P(xe,2),Se=_e[0],Fe=_e[1],br=t.useState([0,0]),sr=P(br,2),Le=sr[0],Pr=sr[1],Ye=function(l){Pr([l.clientX,l.clientY])},qe=Oa(R,A,re?Le:oe,le,E,B,je),U=P(qe,11),jr=U[0],Dr=U[1],kr=U[2],Ae=U[3],$r=U[4],Jr=U[5],Ue=U[6],Lr=U[7],Gr=U[8],fe=U[9],be=U[10],vr=Ia(Ce,m,f,M),Nr=P(vr,2),Ne=Nr[0],Ve=Nr[1],cr=Ne.has("click"),Xe=Ve.has("click")||Ve.has("contextMenu"),Pe=Qe(function(){Ie||be()}),Kr=function(){$e.current&&re&&Xe&&ie(!1)};pa(R,oe,A,Pe,Kr),j(function(){Pe()},[Le,le]),j(function(){R&&!(E!=null&&E[le])&&Pe()},[JSON.stringify(B)]);var Zr=t.useMemo(function(){var o=Xa(E,u,fe,re);return rr(o,b==null?void 0:b(fe))},[fe,b,E,u,re]);t.useImperativeHandle(n,function(){return{nativeElement:Mr.current,popupElement:nr.current,forceAlign:Pe}});var Ir=t.useState(0),Rr=P(Ir,2),Yr=Rr[0],Xr=Rr[1],Or=t.useState(0),Tr=P(Or,2),pr=Tr[0],ea=Tr[1],Wr=function(){if(G&&oe){var l=oe.getBoundingClientRect();Xr(l.width),ea(l.height)}},Y=function(){Wr(),Pe()},Er=function(l){lr(!1),be(),g==null||g(l)},zr=function(){return new Promise(function(l){Wr(),Fe(function(){return l})})};j(function(){Se&&(be(),Se(),Fe(null))},[Se]);function X(o,l,k,z){ke[o]=function($){var _r;z==null||z($),ie(l,k);for(var na=arguments.length,sa=new Array(na>1?na-1:0),Fr=1;Fr<na;Fr++)sa[Fr-1]=arguments[Fr];(_r=I[o])===null||_r===void 0||_r.call.apply(_r,[I,$].concat(sa))}}(cr||Xe)&&(ke.onClick=function(o){var l;$e.current&&Xe?ie(!1):!$e.current&&cr&&(Ye(o),ie(!0));for(var k=arguments.length,z=new Array(k>1?k-1:0),$=1;$<k;$++)z[$-1]=arguments[$];(l=I.onClick)===null||l===void 0||l.call.apply(l,[I,o].concat(z))}),et(R,Xe,oe,A,v,O,Me,ie);var Oe=Ne.has("hover"),Br=Ve.has("hover"),pe,Hr;Oe&&(X("onMouseEnter",!0,S,function(o){Ye(o)}),X("onPointerEnter",!0,S,function(o){Ye(o)}),pe=function(l){(R||Ie)&&A!==null&&A!==void 0&&A.contains(l.target)&&ie(!0,S)},re&&(ke.onMouseMove=function(o){var l;(l=I.onMouseMove)===null||l===void 0||l.call(I,o)})),Br&&(X("onMouseLeave",!1,x),X("onPointerLeave",!1,x),Hr=function(){ie(!1,x)}),Ne.has("focus")&&X("onFocus",!0,W),Ve.has("focus")&&X("onBlur",!1,w),Ne.has("contextMenu")&&(ke.onContextMenu=function(o){var l;$e.current&&Ve.has("contextMenu")?ie(!1):(Ye(o),ie(!0)),o.preventDefault();for(var k=arguments.length,z=new Array(k>1?k-1:0),$=1;$<k;$++)z[$-1]=arguments[$];(l=I.onContextMenu)===null||l===void 0||l.call.apply(l,[I,o].concat(z))}),Ge&&(ke.className=rr(I.className,Ge));var fr=q(q({},I),ke),xr={},ra=["onContextMenu","onClick","onMouseDown","onTouchStart","onMouseEnter","onMouseLeave","onFocus","onBlur"];ra.forEach(function(o){F[o]&&(xr[o]=function(){for(var l,k=arguments.length,z=new Array(k),$=0;$<k;$++)z[$]=arguments[$];(l=fr[o])===null||l===void 0||l.call.apply(l,[fr].concat(z)),F[o].apply(F,z)})});var aa=t.cloneElement(ze,q(q({},fr),xr)),ta={x:Jr,y:Ue},Ra=ye?q({},ye!==!0?ye:{}):null;return t.createElement(t.Fragment,null,t.createElement(ka,{disabled:!R,ref:Vr,onResize:Y},t.createElement(Za,{getTriggerDOMNode:tr},aa)),t.createElement(ma.Provider,{value:gr},t.createElement(Ka,{portal:e,ref:te,prefixCls:u,popup:ee,className:rr(he,Zr),style:me,target:oe,onMouseEnter:pe,onMouseLeave:Hr,onPointerEnter:pe,zIndex:y,open:R,keepDom:Ie,fresh:se,onClick:ar,mask:v,motion:Q,maskMotion:wr,onVisibleChanged:Er,onPrepare:zr,forceRender:ue,autoDestroy:Ke,getPopupContainer:p,align:fe,arrow:Ra,arrowPos:ta,ready:jr,offsetX:Dr,offsetY:kr,offsetR:Ae,offsetB:$r,onAlign:Pe,stretch:G,targetWidth:Yr/Lr,targetHeight:pr/Gr})))});return a}const vt=at(Na);export{Na as P,vt as T};
