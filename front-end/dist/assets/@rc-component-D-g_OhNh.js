import{e as C,g as ct,h as gr,d as H,c as Vt,_ as It,a as _t,b as de}from"./@babel-twuf1KuW.js";import{r as i}from"./react-DeXQEnMH.js";import{r as Tt}from"./react-dom-C-Hl01Sv.js";import{c as Gr,a as z,g as qt,b as Gt,r as yt,s as Ur,h as $t,j as Ut,k as jt,l as Te,m as vt,n as Qt,o as ft,p as Jt,q as Kt,i as Zt}from"./rc-util-Dg-Jfa6i.js";import{c as tr}from"./classnames-BFJNR4kU.js";import{R as xt}from"./rc-resize-observer-DmxcSgq6.js";import{C as Lt}from"./rc-motion-DnRgflKg.js";var At=i.createContext(null),St=[];function Xt(e,t){var r=i.useState(function(){if(!Gr())return null;var S=document.createElement("div");return S}),n=C(r,1),a=n[0],u=i.useRef(!1),s=i.useContext(At),l=i.useState(St),m=C(l,2),c=m[0],g=m[1],v=s||(u.current?void 0:function(S){g(function(w){var D=[S].concat(ct(w));return D})});function y(){a.parentElement||document.body.appendChild(a),u.current=!0}function f(){var S;(S=a.parentElement)===null||S===void 0||S.removeChild(a),u.current=!1}return z(function(){return e?s?s(y):y():f(),f},[e]),z(function(){c.length&&(c.forEach(function(S){return S()}),g(St))},[c]),[a,v]}function Yt(){return document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)&&window.innerWidth>document.body.offsetWidth}var Ot="rc-util-locker-".concat(Date.now()),bt=0;function pt(e){var t=!!e,r=i.useState(function(){return bt+=1,"".concat(Ot,"_").concat(bt)}),n=C(r,1),a=n[0];z(function(){if(t){var u=qt(document.body).width,s=Yt();Gt(`
html body {
  overflow-y: hidden;
  `.concat(s?"width: calc(100% - ".concat(u,"px);"):"",`
}`),a)}else yt(a);return function(){yt(a)}},[t,a])}var Nt=!1;function en(e){return typeof e=="boolean"&&(Nt=e),Nt}var Ct=function(t){return t===!1?!1:!Gr()||!t?null:typeof t=="string"?document.querySelector(t):typeof t=="function"?t():t},Bt=i.forwardRef(function(e,t){var r=e.open,n=e.autoLock,a=e.getContainer;e.debug;var u=e.autoDestroy,s=u===void 0?!0:u,l=e.children,m=i.useState(r),c=C(m,2),g=c[0],v=c[1],y=g||r;i.useEffect(function(){(s||r)&&v(r)},[r,s]);var f=i.useState(function(){return Ct(a)}),S=C(f,2),w=S[0],D=S[1];i.useEffect(function(){var ee=Ct(a);D(ee??null)});var B=Xt(y&&!w),T=C(B,2),M=T[0],h=T[1],W=w??M;pt(n&&r&&Gr()&&(W===M||W===document.body));var O=null;if(l&&Ur(l)&&t){var p=l;O=p.ref}var oe=$t(O,t);if(!y||!Gr()||w===void 0)return null;var me=W===!1||en(),j=l;return t&&(j=i.cloneElement(l,{ref:oe})),i.createElement(At.Provider,{value:h},me?j:Tt.createPortal(j,W))});function rn(e){var t=e.prefixCls,r=e.align,n=e.arrow,a=e.arrowPos,u=n||{},s=u.className,l=u.content,m=a.x,c=m===void 0?0:m,g=a.y,v=g===void 0?0:g,y=i.useRef();if(!r||!r.points)return null;var f={position:"absolute"};if(r.autoArrow!==!1){var S=r.points[0],w=r.points[1],D=S[0],B=S[1],T=w[0],M=w[1];D===T||!["t","b"].includes(D)?f.top=v:D==="t"?f.top=0:f.bottom=0,B===M||!["l","r"].includes(B)?f.left=c:B==="l"?f.left=0:f.right=0}return i.createElement("div",{ref:y,className:tr("".concat(t,"-arrow"),s),style:f},l)}function tn(e){var t=e.prefixCls,r=e.open,n=e.zIndex,a=e.mask,u=e.motion;return a?i.createElement(Lt,gr({},u,{motionAppear:!0,visible:r,removeOnLeave:!0}),function(s){var l=s.className;return i.createElement("div",{style:{zIndex:n},className:tr("".concat(t,"-mask"),l)})}):null}var nn=i.memo(function(e){var t=e.children;return t},function(e,t){return t.cache}),an=i.forwardRef(function(e,t){var r=e.popup,n=e.className,a=e.prefixCls,u=e.style,s=e.target,l=e.onVisibleChanged,m=e.open,c=e.keepDom,g=e.fresh,v=e.onClick,y=e.mask,f=e.arrow,S=e.arrowPos,w=e.align,D=e.motion,B=e.maskMotion,T=e.forceRender,M=e.getPopupContainer,h=e.autoDestroy,W=e.portal,O=e.zIndex,p=e.onMouseEnter,oe=e.onMouseLeave,me=e.onPointerEnter,j=e.ready,ee=e.offsetX,he=e.offsetY,ge=e.offsetR,le=e.offsetB,ye=e.onAlign,$=e.onPrepare,L=e.stretch,b=e.targetWidth,Q=e.targetHeight,E=typeof r=="function"?r():r,se=m||c,re=(M==null?void 0:M.length)>0,nr=i.useState(!M||!re),je=C(nr,2),Se=je[0],Qe=je[1];if(z(function(){!Se&&re&&s&&Qe(!0)},[Se,re,s]),!Se)return null;var te="auto",A={left:"-1000vw",top:"-1000vh",right:te,bottom:te};if(j||!m){var J,ce=w.points,ve=w.dynamicInset||((J=w._experimental)===null||J===void 0?void 0:J.dynamicInset),Je=ve&&ce[0][1]==="r",ar=ve&&ce[0][0]==="b";Je?(A.right=ge,A.left=te):(A.left=ee,A.right=te),ar?(A.bottom=le,A.top=te):(A.top=he,A.bottom=te)}var F={};return L&&(L.includes("height")&&Q?F.height=Q:L.includes("minHeight")&&Q&&(F.minHeight=Q),L.includes("width")&&b?F.width=b:L.includes("minWidth")&&b&&(F.minWidth=b)),m||(F.pointerEvents="none"),i.createElement(W,{open:T||se,getContainer:M&&function(){return M(s)},autoDestroy:h},i.createElement(tn,{prefixCls:a,open:m,zIndex:O,mask:y,motion:B}),i.createElement(xt,{onResize:ye,disabled:!m},function(Ke){return i.createElement(Lt,gr({motionAppear:!0,motionEnter:!0,motionLeave:!0,removeOnLeave:!1,forceRender:T,leavedClassName:"".concat(a,"-hidden")},D,{onAppearPrepare:$,onEnterPrepare:$,visible:m,onVisibleChanged:function(G){var be;D==null||(be=D.onVisibleChanged)===null||be===void 0||be.call(D,G),l(G)}}),function(Pe,G){var be=Pe.className,N=Pe.style,$e=tr(a,be,n);return i.createElement("div",{ref:Ut(Ke,t,G),className:$e,style:H(H(H(H({"--arrow-x":"".concat(S.x||0,"px"),"--arrow-y":"".concat(S.y||0,"px")},A),F),N),{},{boxSizing:"border-box",zIndex:O},u),onMouseEnter:p,onMouseLeave:oe,onPointerEnter:me,onClick:v},f&&i.createElement(rn,{prefixCls:a,arrow:f,arrowPos:S,align:w}),i.createElement(nn,{cache:!m&&!g},E))})}))}),un=i.forwardRef(function(e,t){var r=e.children,n=e.getTriggerDOMNode,a=Ur(r),u=i.useCallback(function(l){jt(t,n?n(l):l)},[n]),s=$t(u,r.ref);return a?i.cloneElement(r,{ref:s}):r}),Mt=i.createContext(null);function wt(e){return e?Array.isArray(e)?e:[e]:[]}function on(e,t,r,n){return i.useMemo(function(){var a=wt(r??t),u=wt(n??t),s=new Set(a),l=new Set(u);return e&&(s.has("hover")&&(s.delete("hover"),s.add("click")),l.has("hover")&&(l.delete("hover"),l.add("click"))),[s,l]},[e,t,r,n])}function ln(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],r=arguments.length>2?arguments[2]:void 0;return r?e[0]===t[0]:e[0]===t[0]&&e[1]===t[1]}function sn(e,t,r,n){for(var a=r.points,u=Object.keys(e),s=0;s<u.length;s+=1){var l,m=u[s];if(ln((l=e[m])===null||l===void 0?void 0:l.points,a,n))return"".concat(t,"-placement-").concat(m)}return""}function Et(e,t,r,n){return t||(r?{motionName:"".concat(e,"-").concat(r)}:n?{motionName:n}:null)}function br(e){return e.ownerDocument.defaultView}function dt(e){for(var t=[],r=e==null?void 0:e.parentElement,n=["hidden","scroll","clip","auto"];r;){var a=br(r).getComputedStyle(r),u=a.overflowX,s=a.overflowY,l=a.overflow;[u,s,l].some(function(m){return n.includes(m)})&&t.push(r),r=r.parentElement}return t}function Sr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;return Number.isNaN(e)?t:e}function mr(e){return Sr(parseFloat(e),0)}function Pt(e,t){var r=H({},e);return(t||[]).forEach(function(n){if(!(n instanceof HTMLBodyElement||n instanceof HTMLHtmlElement)){var a=br(n).getComputedStyle(n),u=a.overflow,s=a.overflowClipMargin,l=a.borderTopWidth,m=a.borderBottomWidth,c=a.borderLeftWidth,g=a.borderRightWidth,v=n.getBoundingClientRect(),y=n.offsetHeight,f=n.clientHeight,S=n.offsetWidth,w=n.clientWidth,D=mr(l),B=mr(m),T=mr(c),M=mr(g),h=Sr(Math.round(v.width/S*1e3)/1e3),W=Sr(Math.round(v.height/y*1e3)/1e3),O=(S-w-T-M)*h,p=(y-f-D-B)*W,oe=D*W,me=B*W,j=T*h,ee=M*h,he=0,ge=0;if(u==="clip"){var le=mr(s);he=le*h,ge=le*W}var ye=v.x+j-he,$=v.y+oe-ge,L=ye+v.width+2*he-j-ee-O,b=$+v.height+2*ge-oe-me-p;r.left=Math.max(r.left,ye),r.top=Math.max(r.top,$),r.right=Math.min(r.right,L),r.bottom=Math.min(r.bottom,b)}}),r}function kt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r="".concat(t),n=r.match(/^(.*)\%$/);return n?e*(parseFloat(n[1])/100):parseFloat(r)}function Dt(e,t){var r=t||[],n=C(r,2),a=n[0],u=n[1];return[kt(e.width,a),kt(e.height,u)]}function Rt(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";return[e[0],e[1]]}function rr(e,t){var r=t[0],n=t[1],a,u;return r==="t"?u=e.y:r==="b"?u=e.y+e.height:u=e.y+e.height/2,n==="l"?a=e.x:n==="r"?a=e.x+e.width:a=e.x+e.width/2,{x:a,y:u}}function _e(e,t){var r={t:"b",b:"t",l:"r",r:"l"};return e.map(function(n,a){return a===t?r[n]||"c":n}).join("")}function cn(e,t,r,n,a,u,s){var l=i.useState({ready:!1,offsetX:0,offsetY:0,offsetR:0,offsetB:0,arrowX:0,arrowY:0,scaleX:1,scaleY:1,align:a[n]||{}}),m=C(l,2),c=m[0],g=m[1],v=i.useRef(0),y=i.useMemo(function(){return t?dt(t):[]},[t]),f=i.useRef({}),S=function(){f.current={}};e||S();var w=Te(function(){if(t&&r&&e){let X=function(Wr,Y){var pe=arguments.length>2&&arguments[2]!==void 0?arguments[2]:$e,Fr=E.x+Wr,er=E.y+Y,zr=Fr+J,dr=er+A,Hr=Math.max(Fr,pe.left),ut=Math.max(er,pe.top),ot=Math.min(zr,pe.right),lt=Math.min(dr,pe.bottom);return Math.max(0,(ot-Hr)*(lt-ut))},Br=function(){Fe=E.y+R,ze=Fe+A,Me=E.x+_,He=Me+J};var T,M,h=t,W=h.ownerDocument,O=br(h),p=O.getComputedStyle(h),oe=p.width,me=p.height,j=p.position,ee=h.style.left,he=h.style.top,ge=h.style.right,le=h.style.bottom,ye=h.style.overflow,$=H(H({},a[n]),u),L=W.createElement("div");(T=h.parentElement)===null||T===void 0||T.appendChild(L),L.style.left="".concat(h.offsetLeft,"px"),L.style.top="".concat(h.offsetTop,"px"),L.style.position=j,L.style.height="".concat(h.offsetHeight,"px"),L.style.width="".concat(h.offsetWidth,"px"),h.style.left="0",h.style.top="0",h.style.right="auto",h.style.bottom="auto",h.style.overflow="hidden";var b;if(Array.isArray(r))b={x:r[0],y:r[1],width:0,height:0};else{var Q=r.getBoundingClientRect();b={x:Q.x,y:Q.y,width:Q.width,height:Q.height}}var E=h.getBoundingClientRect(),se=W.documentElement,re=se.clientWidth,nr=se.clientHeight,je=se.scrollWidth,Se=se.scrollHeight,Qe=se.scrollTop,te=se.scrollLeft,A=E.height,J=E.width,ce=b.height,ve=b.width,Je={left:0,top:0,right:re,bottom:nr},ar={left:-te,top:-Qe,right:je-te,bottom:Se-Qe},F=$.htmlRegion,Ke="visible",Pe="visibleFirst";F!=="scroll"&&F!==Pe&&(F=Ke);var G=F===Pe,be=Pt(ar,y),N=Pt(Je,y),$e=F===Ke?N:be,K=G?N:$e;h.style.left="auto",h.style.top="auto",h.style.right="0",h.style.bottom="0";var Nr=h.getBoundingClientRect();h.style.left=ee,h.style.top=he,h.style.right=ge,h.style.bottom=le,h.style.overflow=ye,(M=h.parentElement)===null||M===void 0||M.removeChild(L);var xe=Sr(Math.round(J/parseFloat(oe)*1e3)/1e3),Le=Sr(Math.round(A/parseFloat(me)*1e3)/1e3);if(xe===0||Le===0||vt(r)&&!Qt(r))return;var Cr=$.offset,V=$.targetOffset,jr=Dt(E,Cr),ir=C(jr,2),ne=ir[0],ae=ir[1],Mr=Dt(b,V),ie=C(Mr,2),Qr=ie[0],wr=ie[1];b.x-=Qr,b.y-=wr;var Jr=$.points||[],Ae=C(Jr,2),Z=Ae[0],ke=Ae[1],Ne=Rt(ke),U=Rt(Z),Er=rr(b,Ne),Pr=rr(E,U),Ce=H({},$),_=Er.x-Pr.x+ne,R=Er.y-Pr.y+ae,I=X(_,R),Ze=X(_,R,N),De=rr(b,["t","l"]),Be=rr(E,["t","l"]),ur=rr(b,["b","r"]),or=rr(E,["b","r"]),We=$.overflow||{},ue=We.adjustX,Kr=We.adjustY,lr=We.shiftX,Xe=We.shiftY,sr=function(Y){return typeof Y=="boolean"?Y:Y>=0},Fe,ze,Me,He;Br();var kr=sr(Kr),cr=U[0]===Ne[0];if(kr&&U[0]==="t"&&(ze>K.bottom||f.current.bt)){var Re=R;cr?Re-=A-ce:Re=De.y-or.y-ae;var Dr=X(_,Re),Ye=X(_,Re,N);Dr>I||Dr===I&&(!G||Ye>=Ze)?(f.current.bt=!0,R=Re,ae=-ae,Ce.points=[_e(U,0),_e(Ne,0)]):f.current.bt=!1}if(kr&&U[0]==="b"&&(Fe<K.top||f.current.tb)){var Ve=R;cr?Ve+=A-ce:Ve=ur.y-Be.y-ae;var q=X(_,Ve),Zr=X(_,Ve,N);q>I||q===I&&(!G||Zr>=Ze)?(f.current.tb=!0,R=Ve,ae=-ae,Ce.points=[_e(U,0),_e(Ne,0)]):f.current.tb=!1}var Rr=sr(ue),Ir=U[1]===Ne[1];if(Rr&&U[1]==="l"&&(He>K.right||f.current.rl)){var qe=_;Ir?qe-=J-ve:qe=De.x-or.x-ne;var _r=X(qe,R),Xr=X(qe,R,N);_r>I||_r===I&&(!G||Xr>=Ze)?(f.current.rl=!0,_=qe,ne=-ne,Ce.points=[_e(U,1),_e(Ne,1)]):f.current.rl=!1}if(Rr&&U[1]==="r"&&(Me<K.left||f.current.lr)){var Ge=_;Ir?Ge+=J-ve:Ge=ur.x-Be.x-ne;var Tr=X(Ge,R),Yr=X(Ge,R,N);Tr>I||Tr===I&&(!G||Yr>=Ze)?(f.current.lr=!0,_=Ge,ne=-ne,Ce.points=[_e(U,1),_e(Ne,1)]):f.current.lr=!1}Br();var fe=lr===!0?0:lr;typeof fe=="number"&&(Me<N.left&&(_-=Me-N.left-ne,b.x+ve<N.left+fe&&(_+=b.x-N.left+ve-fe)),He>N.right&&(_-=He-N.right-ne,b.x>N.right-fe&&(_+=b.x-N.right+fe)));var we=Xe===!0?0:Xe;typeof we=="number"&&(Fe<N.top&&(R-=Fe-N.top-ae,b.y+ce<N.top+we&&(R+=b.y-N.top+ce-we)),ze>N.bottom&&(R-=ze-N.bottom-ae,b.y>N.bottom-we&&(R+=b.y-N.bottom+we)));var vr=E.x+_,$r=vr+J,Ie=E.y+R,Ue=Ie+A,fr=b.x,Oe=fr+ve,Ee=b.y,Or=Ee+ce,pr=Math.max(vr,fr),et=Math.min($r,Oe),xr=(pr+et)/2,rt=xr-vr,tt=Math.max(Ie,Ee),nt=Math.min(Ue,Or),Lr=(tt+nt)/2,at=Lr-Ie;s==null||s(t,Ce);var it=Nr.right-E.x-(_+E.width),Ar=Nr.bottom-E.y-(R+E.height);g({ready:!0,offsetX:_/xe,offsetY:R/Le,offsetR:it/xe,offsetB:Ar/Le,arrowX:rt/xe,arrowY:at/Le,scaleX:xe,scaleY:Le,align:Ce})}}),D=function(){v.current+=1;var M=v.current;Promise.resolve().then(function(){v.current===M&&w()})},B=function(){g(function(M){return H(H({},M),{},{ready:!1})})};return z(B,[n]),z(function(){e||B()},[e]),[c.ready,c.offsetX,c.offsetY,c.offsetR,c.offsetB,c.arrowX,c.arrowY,c.scaleX,c.scaleY,c.align,D]}function vn(e,t,r,n,a){z(function(){if(e&&t&&r){let v=function(){n(),a()};var u=t,s=r,l=dt(u),m=dt(s),c=br(s),g=new Set([c].concat(ct(l),ct(m)));return g.forEach(function(y){y.addEventListener("scroll",v,{passive:!0})}),c.addEventListener("resize",v,{passive:!0}),n(),function(){g.forEach(function(y){y.removeEventListener("scroll",v),c.removeEventListener("resize",v)})}}},[e,t,r])}function fn(e,t,r,n,a,u,s,l){var m=i.useRef(e);m.current=e,i.useEffect(function(){if(t&&n&&(!a||u)){var c=function(f){var S=f.target;m.current&&!s(S)&&l(!1)},g=br(n);g.addEventListener("mousedown",c,!0),g.addEventListener("contextmenu",c,!0);var v=ft(r);return v&&(v.addEventListener("mousedown",c,!0),v.addEventListener("contextmenu",c,!0)),function(){g.removeEventListener("mousedown",c,!0),g.removeEventListener("contextmenu",c,!0),v&&(v.removeEventListener("mousedown",c,!0),v.removeEventListener("contextmenu",c,!0))}}},[t,r,n,a,u])}var dn=["prefixCls","children","action","showAction","hideAction","popupVisible","defaultPopupVisible","onPopupVisibleChange","afterPopupVisibleChange","mouseEnterDelay","mouseLeaveDelay","focusDelay","blurDelay","mask","maskClosable","getPopupContainer","forceRender","autoDestroy","destroyPopupOnHide","popup","popupClassName","popupStyle","popupPlacement","builtinPlacements","popupAlign","zIndex","stretch","getPopupClassNameFromAlign","fresh","alignPoint","onPopupClick","onPopupAlign","arrow","popupMotion","maskMotion","popupTransitionName","popupAnimation","maskTransitionName","maskAnimation","className","getTriggerDOMNode"];function mn(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Bt,t=i.forwardRef(function(r,n){var a=r.prefixCls,u=a===void 0?"rc-trigger-popup":a,s=r.children,l=r.action,m=l===void 0?"hover":l,c=r.showAction,g=r.hideAction,v=r.popupVisible,y=r.defaultPopupVisible,f=r.onPopupVisibleChange,S=r.afterPopupVisibleChange,w=r.mouseEnterDelay,D=r.mouseLeaveDelay,B=D===void 0?.1:D,T=r.focusDelay,M=r.blurDelay,h=r.mask,W=r.maskClosable,O=W===void 0?!0:W,p=r.getPopupContainer,oe=r.forceRender,me=r.autoDestroy,j=r.destroyPopupOnHide,ee=r.popup,he=r.popupClassName,ge=r.popupStyle,le=r.popupPlacement,ye=r.builtinPlacements,$=ye===void 0?{}:ye,L=r.popupAlign,b=r.zIndex,Q=r.stretch,E=r.getPopupClassNameFromAlign,se=r.fresh,re=r.alignPoint,nr=r.onPopupClick,je=r.onPopupAlign,Se=r.arrow,Qe=r.popupMotion,te=r.maskMotion,A=r.popupTransitionName,J=r.popupAnimation,ce=r.maskTransitionName,ve=r.maskAnimation,Je=r.className,ar=r.getTriggerDOMNode,F=Vt(r,dn),Ke=me||j||!1,Pe=i.useState(!1),G=C(Pe,2),be=G[0],N=G[1];z(function(){N(Jt())},[]);var $e=i.useRef({}),K=i.useContext(Mt),Nr=i.useMemo(function(){return{registerSubPopup:function(d,P){$e.current[d]=P,K==null||K.registerSubPopup(d,P)}}},[K]),xe=Kt(),Le=i.useState(null),Cr=C(Le,2),V=Cr[0],jr=Cr[1],ir=i.useRef(null),ne=Te(function(o){ir.current=o,vt(o)&&V!==o&&jr(o),K==null||K.registerSubPopup(xe,o)}),ae=i.useState(null),Mr=C(ae,2),ie=Mr[0],Qr=Mr[1],wr=i.useRef(null),Jr=Te(function(o){vt(o)&&ie!==o&&(Qr(o),wr.current=o)}),Ae=i.Children.only(s),Z=(Ae==null?void 0:Ae.props)||{},ke={},Ne=Te(function(o){var d,P,x=ie;return(x==null?void 0:x.contains(o))||((d=ft(x))===null||d===void 0?void 0:d.host)===o||o===x||(V==null?void 0:V.contains(o))||((P=ft(V))===null||P===void 0?void 0:P.host)===o||o===V||Object.values($e.current).some(function(k){return(k==null?void 0:k.contains(o))||o===k})}),U=Et(u,Qe,J,A),Er=Et(u,te,ve,ce),Pr=i.useState(y||!1),Ce=C(Pr,2),_=Ce[0],R=Ce[1],I=v??_,Ze=Te(function(o){v===void 0&&R(o)});z(function(){R(v||!1)},[v]);var De=i.useRef(I);De.current=I;var Be=i.useRef([]);Be.current=[];var ur=Te(function(o){var d;Ze(o),((d=Be.current[Be.current.length-1])!==null&&d!==void 0?d:I)!==o&&(Be.current.push(o),f==null||f(o))}),or=i.useRef(),We=function(){clearTimeout(or.current)},ue=function(d){var P=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;We(),P===0?ur(d):or.current=setTimeout(function(){ur(d)},P*1e3)};i.useEffect(function(){return We},[]);var Kr=i.useState(!1),lr=C(Kr,2),Xe=lr[0],sr=lr[1];z(function(o){(!o||I)&&sr(!0)},[I]);var Fe=i.useState(null),ze=C(Fe,2),Me=ze[0],He=ze[1],kr=i.useState([0,0]),cr=C(kr,2),Re=cr[0],Dr=cr[1],Ye=function(d){Dr([d.clientX,d.clientY])},Ve=cn(I,V,re?Re:ie,le,$,L,je),q=C(Ve,11),Zr=q[0],Rr=q[1],Ir=q[2],qe=q[3],_r=q[4],Xr=q[5],Ge=q[6],Tr=q[7],Yr=q[8],fe=q[9],we=q[10],vr=on(be,m,c,g),$r=C(vr,2),Ie=$r[0],Ue=$r[1],fr=Ie.has("click"),Oe=Ue.has("click")||Ue.has("contextMenu"),Ee=Te(function(){Xe||we()}),Or=function(){De.current&&re&&Oe&&ue(!1)};vn(I,ie,V,Ee,Or),z(function(){Ee()},[Re,le]),z(function(){I&&!($!=null&&$[le])&&Ee()},[JSON.stringify(L)]);var pr=i.useMemo(function(){var o=sn($,u,fe,re);return tr(o,E==null?void 0:E(fe))},[fe,E,$,u,re]);i.useImperativeHandle(n,function(){return{nativeElement:wr.current,popupElement:ir.current,forceAlign:Ee}});var et=i.useState(0),xr=C(et,2),rt=xr[0],tt=xr[1],nt=i.useState(0),Lr=C(nt,2),at=Lr[0],it=Lr[1],Ar=function(){if(Q&&ie){var d=ie.getBoundingClientRect();tt(d.width),it(d.height)}},X=function(){Ar(),Ee()},Br=function(d){sr(!1),we(),S==null||S(d)},Wr=function(){return new Promise(function(d){Ar(),He(function(){return d})})};z(function(){Me&&(we(),Me(),He(null))},[Me]);function Y(o,d,P,x){ke[o]=function(k){var Vr;x==null||x(k),ue(d,P);for(var st=arguments.length,gt=new Array(st>1?st-1:0),qr=1;qr<st;qr++)gt[qr-1]=arguments[qr];(Vr=Z[o])===null||Vr===void 0||Vr.call.apply(Vr,[Z,k].concat(gt))}}(fr||Oe)&&(ke.onClick=function(o){var d;De.current&&Oe?ue(!1):!De.current&&fr&&(Ye(o),ue(!0));for(var P=arguments.length,x=new Array(P>1?P-1:0),k=1;k<P;k++)x[k-1]=arguments[k];(d=Z.onClick)===null||d===void 0||d.call.apply(d,[Z,o].concat(x))}),fn(I,Oe,ie,V,h,O,Ne,ue);var pe=Ie.has("hover"),Fr=Ue.has("hover"),er,zr;pe&&(Y("onMouseEnter",!0,w,function(o){Ye(o)}),Y("onPointerEnter",!0,w,function(o){Ye(o)}),er=function(d){(I||Xe)&&V!==null&&V!==void 0&&V.contains(d.target)&&ue(!0,w)},re&&(ke.onMouseMove=function(o){var d;(d=Z.onMouseMove)===null||d===void 0||d.call(Z,o)})),Fr&&(Y("onMouseLeave",!1,B),Y("onPointerLeave",!1,B),zr=function(){ue(!1,B)}),Ie.has("focus")&&Y("onFocus",!0,T),Ue.has("focus")&&Y("onBlur",!1,M),Ie.has("contextMenu")&&(ke.onContextMenu=function(o){var d;De.current&&Ue.has("contextMenu")?ue(!1):(Ye(o),ue(!0)),o.preventDefault();for(var P=arguments.length,x=new Array(P>1?P-1:0),k=1;k<P;k++)x[k-1]=arguments[k];(d=Z.onContextMenu)===null||d===void 0||d.call.apply(d,[Z,o].concat(x))}),Je&&(ke.className=tr(Z.className,Je));var dr=H(H({},Z),ke),Hr={},ut=["onContextMenu","onClick","onMouseDown","onTouchStart","onMouseEnter","onMouseLeave","onFocus","onBlur"];ut.forEach(function(o){F[o]&&(Hr[o]=function(){for(var d,P=arguments.length,x=new Array(P),k=0;k<P;k++)x[k]=arguments[k];(d=dr[o])===null||d===void 0||d.call.apply(d,[dr].concat(x)),F[o].apply(F,x)})});var ot=i.cloneElement(Ae,H(H({},dr),Hr)),lt={x:Xr,y:Ge},Ht=Se?H({},Se!==!0?Se:{}):null;return i.createElement(i.Fragment,null,i.createElement(xt,{disabled:!I,ref:Jr,onResize:X},i.createElement(un,{getTriggerDOMNode:ar},ot)),i.createElement(Mt.Provider,{value:Nr},i.createElement(an,{portal:e,ref:ne,prefixCls:u,popup:ee,className:tr(he,pr),style:ge,target:ie,onMouseEnter:er,onMouseLeave:zr,onPointerEnter:er,zIndex:b,open:I,keepDom:Xe,fresh:se,onClick:nr,mask:h,motion:U,maskMotion:Er,onVisibleChanged:Br,onPrepare:Wr,forceRender:oe,autoDestroy:Ke,getPopupContainer:p,align:fe,arrow:Ht,arrowPos:lt,ready:Zr,offsetX:Rr,offsetY:Ir,offsetR:qe,offsetB:_r,onAlign:Ee,stretch:Q,targetWidth:rt/Tr,targetHeight:at/Yr})))});return t}const kn=mn(Bt);function mt(){return typeof BigInt=="function"}function Wt(e){return!e&&e!==0&&!Number.isNaN(e)||!String(e).trim()}function yr(e){var t=e.trim(),r=t.startsWith("-");r&&(t=t.slice(1)),t=t.replace(/(\.\d*[^0])0*$/,"$1").replace(/\.0*$/,"").replace(/^0+/,""),t.startsWith(".")&&(t="0".concat(t));var n=t||"0",a=n.split("."),u=a[0]||"0",s=a[1]||"0";u==="0"&&s==="0"&&(r=!1);var l=r?"-":"";return{negative:r,negativeStr:l,trimStr:n,integerStr:u,decimalStr:s,fullStr:"".concat(l).concat(n)}}function ht(e){var t=String(e);return!Number.isNaN(Number(t))&&t.includes("e")}function hr(e){var t=String(e);if(ht(e)){var r=Number(t.slice(t.indexOf("e-")+2)),n=t.match(/\.(\d+)/);return n!=null&&n[1]&&(r+=n[1].length),r}return t.includes(".")&&zt(t)?t.length-t.indexOf(".")-1:0}function Ft(e){var t=String(e);if(ht(e)){if(e>Number.MAX_SAFE_INTEGER)return String(mt()?BigInt(e).toString():Number.MAX_SAFE_INTEGER);if(e<Number.MIN_SAFE_INTEGER)return String(mt()?BigInt(e).toString():Number.MIN_SAFE_INTEGER);t=e.toFixed(hr(t))}return yr(t).fullStr}function zt(e){return typeof e=="number"?!Number.isNaN(e):e?/^\s*-?\d+(\.\d+)?\s*$/.test(e)||/^\s*-?\d+\.\s*$/.test(e)||/^\s*-?\.\d+\s*$/.test(e):!1}var hn=function(){function e(t){if(_t(this,e),de(this,"origin",""),de(this,"negative",void 0),de(this,"integer",void 0),de(this,"decimal",void 0),de(this,"decimalLen",void 0),de(this,"empty",void 0),de(this,"nan",void 0),Wt(t)){this.empty=!0;return}if(this.origin=String(t),t==="-"||Number.isNaN(t)){this.nan=!0;return}var r=t;if(ht(r)&&(r=Number(r)),r=typeof r=="string"?r:Ft(r),zt(r)){var n=yr(r);this.negative=n.negative;var a=n.trimStr.split(".");this.integer=BigInt(a[0]);var u=a[1]||"0";this.decimal=BigInt(u),this.decimalLen=u.length}else this.nan=!0}return It(e,[{key:"getMark",value:function(){return this.negative?"-":""}},{key:"getIntegerStr",value:function(){return this.integer.toString()}},{key:"getDecimalStr",value:function(){return this.decimal.toString().padStart(this.decimalLen,"0")}},{key:"alignDecimal",value:function(r){var n="".concat(this.getMark()).concat(this.getIntegerStr()).concat(this.getDecimalStr().padEnd(r,"0"));return BigInt(n)}},{key:"negate",value:function(){var r=new e(this.toString());return r.negative=!r.negative,r}},{key:"cal",value:function(r,n,a){var u=Math.max(this.getDecimalStr().length,r.getDecimalStr().length),s=this.alignDecimal(u),l=r.alignDecimal(u),m=n(s,l).toString(),c=a(u),g=yr(m),v=g.negativeStr,y=g.trimStr,f="".concat(v).concat(y.padStart(c+1,"0"));return new e("".concat(f.slice(0,-c),".").concat(f.slice(-c)))}},{key:"add",value:function(r){if(this.isInvalidate())return new e(r);var n=new e(r);return n.isInvalidate()?this:this.cal(n,function(a,u){return a+u},function(a){return a})}},{key:"multi",value:function(r){var n=new e(r);return this.isInvalidate()||n.isInvalidate()?new e(NaN):this.cal(n,function(a,u){return a*u},function(a){return a*2})}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return this.nan}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(r){return this.toString()===(r==null?void 0:r.toString())}},{key:"lessEquals",value:function(r){return this.add(r.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.isNaN()?NaN:Number(this.toString())}},{key:"toString",value:function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return r?this.isInvalidate()?"":yr("".concat(this.getMark()).concat(this.getIntegerStr(),".").concat(this.getDecimalStr())).fullStr:this.origin}}]),e}(),gn=function(){function e(t){if(_t(this,e),de(this,"origin",""),de(this,"number",void 0),de(this,"empty",void 0),Wt(t)){this.empty=!0;return}this.origin=String(t),this.number=Number(t)}return It(e,[{key:"negate",value:function(){return new e(-this.toNumber())}},{key:"add",value:function(r){if(this.isInvalidate())return new e(r);var n=Number(r);if(Number.isNaN(n))return this;var a=this.number+n;if(a>Number.MAX_SAFE_INTEGER)return new e(Number.MAX_SAFE_INTEGER);if(a<Number.MIN_SAFE_INTEGER)return new e(Number.MIN_SAFE_INTEGER);var u=Math.max(hr(this.number),hr(n));return new e(a.toFixed(u))}},{key:"multi",value:function(r){var n=Number(r);if(this.isInvalidate()||Number.isNaN(n))return new e(NaN);var a=this.number*n;if(a>Number.MAX_SAFE_INTEGER)return new e(Number.MAX_SAFE_INTEGER);if(a<Number.MIN_SAFE_INTEGER)return new e(Number.MIN_SAFE_INTEGER);var u=Math.max(hr(this.number),hr(n));return new e(a.toFixed(u))}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return Number.isNaN(this.number)}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(r){return this.toNumber()===(r==null?void 0:r.toNumber())}},{key:"lessEquals",value:function(r){return this.add(r.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.number}},{key:"toString",value:function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return r?this.isInvalidate()?"":Ft(this.number):this.origin}}]),e}();function yn(e){return mt()?new hn(e):new gn(e)}function Sn(e,t,r){var n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;if(e==="")return"";var a=yr(e),u=a.negativeStr,s=a.integerStr,l=a.decimalStr,m="".concat(t).concat(l),c="".concat(u).concat(s);if(r>=0){var g=Number(l[r]);if(g>=5&&!n){var v=yn(e).add("".concat(u,"0.").concat("0".repeat(r)).concat(10-g));return Sn(v.toString(),t,r,n)}return r===0?c:"".concat(c).concat(t).concat(l.padEnd(r,"0").slice(0,r))}return m===".0"?c:"".concat(c).concat(m)}function Dn(e){var t=i.createContext(void 0),r=function(a){var u=a.value,s=a.children,l=i.useRef(u);l.current=u;var m=i.useState(function(){return{getValue:function(){return l.current},listeners:new Set}}),c=C(m,1),g=c[0];return z(function(){Tt.unstable_batchedUpdates(function(){g.listeners.forEach(function(v){v(u)})})},[u]),i.createElement(t.Provider,{value:g},s)};return{Context:t,Provider:r,defaultValue:e}}function Rn(e,t){var r=Te(typeof t=="function"?t:function(v){if(t===void 0)return v;if(!Array.isArray(t))return v[t];var y={};return t.forEach(function(f){y[f]=v[f]}),y}),n=i.useContext(e==null?void 0:e.Context),a=n||{},u=a.listeners,s=a.getValue,l=i.useRef();l.current=r(n?s():e==null?void 0:e.defaultValue);var m=i.useState({}),c=C(m,2),g=c[1];return z(function(){if(!n)return;function v(y){var f=r(y);Zt(l.current,f,!0)||g({})}return u.add(v),function(){u.delete(v)}},[n]),l.current}function In(){var e=i.createContext(null);function t(){return i.useContext(e)}function r(a,u){var s=Ur(a),l=function(c,g){var v=s?{ref:g}:{},y=i.useRef(0),f=i.useRef(c),S=t();return S!==null?i.createElement(a,gr({},c,v)):((!u||u(f.current,c))&&(y.current+=1),f.current=c,i.createElement(e.Provider,{value:y.current},i.createElement(a,gr({},c,v))))};return s?i.forwardRef(l):l}function n(a,u){var s=Ur(a),l=function(c,g){var v=s?{ref:g}:{};return t(),i.createElement(a,gr({},c,v))};return s?i.memo(i.forwardRef(l),u):i.memo(l,u)}return{makeImmutable:r,responseImmutable:n,useImmutableMark:t}}export{Bt as P,kn as T,hr as a,Sn as b,In as c,Dn as d,yn as g,Ft as n,yr as t,Rn as u,zt as v};
