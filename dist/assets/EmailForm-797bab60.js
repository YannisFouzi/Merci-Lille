import{j as p}from"./react-query-050d5483.js";import{P as d}from"./index-c71602de.js";import{R as Se,r as Zt}from"./vendor-cabde3c1.js";import{a as un,c as mn}from"./eventForm-bfb5b68b.js";import{u as dn}from"./forms-1ddf1958.js";import"./animations-b8bbc998.js";const pn={prefix:"far",iconName:"message",icon:[512,512,["comment-alt"],"f27a","M160 368c26.5 0 48 21.5 48 48l0 16 72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6L448 368c8.8 0 16-7.2 16-16l0-288c0-8.8-7.2-16-16-16L64 48c-8.8 0-16 7.2-16 16l0 288c0 8.8 7.2 16 16 16l96 0zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3l0-21.3 0-6.4 0-.3 0-4 0-48-48 0-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L448 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-138.7 0L208 492z"]},gn={prefix:"fas",iconName:"at",icon:[512,512,[61946],"40","M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256l0 32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32l0 80 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"]},hn={prefix:"fas",iconName:"circle-check",icon:[512,512,[61533,"check-circle"],"f058","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"]},bn=hn,yn={prefix:"fas",iconName:"envelope",icon:[512,512,[128386,9993,61443],"f0e0","M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"]},vn={prefix:"fas",iconName:"font",icon:[448,512,[],"f031","M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416 32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-1.8 0 18-48 159.6 0 18 48-1.8 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-25.8 0L254 52.8zM279.8 304l-111.6 0L224 155.1 279.8 304z"]},te=()=>{};let Wt={},Pe={},Ce=null,Ie={mark:te,measure:te};try{typeof window<"u"&&(Wt=window),typeof document<"u"&&(Pe=document),typeof MutationObserver<"u"&&(Ce=MutationObserver),typeof performance<"u"&&(Ie=performance)}catch{}const{userAgent:ee=""}=Wt.navigator||{},D=Wt,h=Pe,ne=Ce,lt=Ie;D.document;const L=!!h.documentElement&&!!h.head&&typeof h.addEventListener=="function"&&typeof h.createElement=="function",Te=~ee.indexOf("MSIE")||~ee.indexOf("Trident/");var y="classic",Fe="duotone",O="sharp",N="sharp-duotone",xn=[y,Fe,O,N],An={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds"}},ae={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},kn=["kit"],wn=/fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/,On=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,Nn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},En={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds"}},Sn={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds"}},Pn={classic:["fas","far","fal","fat"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds"]},Cn={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid"}},In={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds"}},_e={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid"}},Tn=["solid","regular","light","thin","duotone","brands"],Me=[1,2,3,4,5,6,7,8,9,10],Fn=Me.concat([11,12,13,14,15,16,17,18,19,20]),tt={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},_n=[...Object.keys(Pn),...Tn,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",tt.GROUP,tt.SWAP_OPACITY,tt.PRIMARY,tt.SECONDARY].concat(Me.map(t=>"".concat(t,"x"))).concat(Fn.map(t=>"w-".concat(t))),Mn={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},jn={kit:{"fa-kit":"fak"},"kit-duotone":{"fa-kit-duotone":"fakd"}},Ln={kit:{fak:"fa-kit"},"kit-duotone":{fakd:"fa-kit-duotone"}},re={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}};const M="___FONT_AWESOME___",Nt=16,je="fa",Le="svg-inline--fa",V="data-fa-i2svg",Et="data-fa-pseudo-element",zn="data-fa-pseudo-element-pending",Xt="data-prefix",Ht="data-icon",se="fontawesome-i2svg",Rn="async",Dn=["HTML","HEAD","STYLE","SCRIPT"],ze=(()=>{try{return!0}catch{return!1}})(),Re=[y,O,N];function it(t){return new Proxy(t,{get(e,n){return n in e?e[n]:e[y]}})}const De={..._e};De[y]={..._e[y],...ae.kit,...ae["kit-duotone"]};const H=it(De),St={...In};St[y]={...St[y],...re.kit,...re["kit-duotone"]};const rt=it(St),Pt={...Cn};Pt[y]={...Pt[y],...Ln.kit};const G=it(Pt),Ct={...Sn};Ct[y]={...Ct[y],...jn.kit};const Yn=it(Ct),Un=wn,Ye="fa-layers-text",Wn=On,Xn={...An};it(Xn);const Hn=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],vt=tt,J=new Set;Object.keys(rt[y]).map(J.add.bind(J));Object.keys(rt[O]).map(J.add.bind(J));Object.keys(rt[N]).map(J.add.bind(J));const Gn=[...kn,..._n],nt=D.FontAwesomeConfig||{};function Vn(t){var e=h.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function Bn(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}h&&typeof h.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(e=>{let[n,a]=e;const r=Bn(Vn(n));r!=null&&(nt[a]=r)});const Ue={styleDefault:"solid",familyDefault:"classic",cssPrefix:je,replacementClass:Le,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};nt.familyPrefix&&(nt.cssPrefix=nt.familyPrefix);const Q={...Ue,...nt};Q.autoReplaceSvg||(Q.observeMutations=!1);const f={};Object.keys(Ue).forEach(t=>{Object.defineProperty(f,t,{enumerable:!0,set:function(e){Q[t]=e,at.forEach(n=>n(f))},get:function(){return Q[t]}})});Object.defineProperty(f,"familyPrefix",{enumerable:!0,set:function(t){Q.cssPrefix=t,at.forEach(e=>e(f))},get:function(){return Q.cssPrefix}});D.FontAwesomeConfig=f;const at=[];function $n(t){return at.push(t),()=>{at.splice(at.indexOf(t),1)}}const z=Nt,I={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function qn(t){if(!t||!L)return;const e=h.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;const n=h.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const s=n[r],i=(s.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(a=s)}return h.head.insertBefore(e,a),t}const Kn="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function st(){let t=12,e="";for(;t-- >0;)e+=Kn[Math.random()*62|0];return e}function Z(t){const e=[];for(let n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function Gt(t){return t.classList?Z(t.classList):(t.getAttribute("class")||"").split(" ").filter(e=>e)}function We(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Jn(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,'="').concat(We(t[n]),'" '),"").trim()}function pt(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,": ").concat(t[n].trim(),";"),"")}function Vt(t){return t.size!==I.size||t.x!==I.x||t.y!==I.y||t.rotate!==I.rotate||t.flipX||t.flipY}function Qn(t){let{transform:e,containerWidth:n,iconWidth:a}=t;const r={transform:"translate(".concat(n/2," 256)")},s="translate(".concat(e.x*32,", ").concat(e.y*32,") "),i="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),o="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(s," ").concat(i," ").concat(o)},c={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:c}}function Zn(t){let{transform:e,width:n=Nt,height:a=Nt,startCentered:r=!1}=t,s="";return r&&Te?s+="translate(".concat(e.x/z-n/2,"em, ").concat(e.y/z-a/2,"em) "):r?s+="translate(calc(-50% + ".concat(e.x/z,"em), calc(-50% + ").concat(e.y/z,"em)) "):s+="translate(".concat(e.x/z,"em, ").concat(e.y/z,"em) "),s+="scale(".concat(e.size/z*(e.flipX?-1:1),", ").concat(e.size/z*(e.flipY?-1:1),") "),s+="rotate(".concat(e.rotate,"deg) "),s}var ta=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function Xe(){const t=je,e=Le,n=f.cssPrefix,a=f.replacementClass;let r=ta;if(n!==t||a!==e){const s=new RegExp("\\.".concat(t,"\\-"),"g"),i=new RegExp("\\--".concat(t,"\\-"),"g"),o=new RegExp("\\.".concat(e),"g");r=r.replace(s,".".concat(n,"-")).replace(i,"--".concat(n,"-")).replace(o,".".concat(a))}return r}let ie=!1;function xt(){f.autoAddCss&&!ie&&(qn(Xe()),ie=!0)}var ea={mixout(){return{dom:{css:Xe,insertCss:xt}}},hooks(){return{beforeDOMElementCreation(){xt()},beforeI2svg(){xt()}}}};const j=D||{};j[M]||(j[M]={});j[M].styles||(j[M].styles={});j[M].hooks||(j[M].hooks={});j[M].shims||(j[M].shims=[]);var T=j[M];const He=[],Ge=function(){h.removeEventListener("DOMContentLoaded",Ge),ut=1,He.map(t=>t())};let ut=!1;L&&(ut=(h.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(h.readyState),ut||h.addEventListener("DOMContentLoaded",Ge));function na(t){L&&(ut?setTimeout(t,0):He.push(t))}function ot(t){const{tag:e,attributes:n={},children:a=[]}=t;return typeof t=="string"?We(t):"<".concat(e," ").concat(Jn(n),">").concat(a.map(ot).join(""),"</").concat(e,">")}function oe(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var aa=function(e,n){return function(a,r,s,i){return e.call(n,a,r,s,i)}},At=function(e,n,a,r){var s=Object.keys(e),i=s.length,o=r!==void 0?aa(n,r):n,l,c,u;for(a===void 0?(l=1,u=e[s[0]]):(l=0,u=a);l<i;l++)c=s[l],u=o(u,e[c],c,e);return u};function ra(t){const e=[];let n=0;const a=t.length;for(;n<a;){const r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const s=t.charCodeAt(n++);(s&64512)==56320?e.push(((r&1023)<<10)+(s&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function It(t){const e=ra(t);return e.length===1?e[0].toString(16):null}function sa(t,e){const n=t.length;let a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function le(t){return Object.keys(t).reduce((e,n)=>{const a=t[n];return!!a.icon?e[a.iconName]=a.icon:e[n]=a,e},{})}function Tt(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=le(e);typeof T.hooks.addPack=="function"&&!a?T.hooks.addPack(t,le(e)):T.styles[t]={...T.styles[t]||{},...r},t==="fas"&&Tt("fa",e)}const{styles:W,shims:ia}=T,oa={[y]:Object.values(G[y]),[O]:Object.values(G[O]),[N]:Object.values(G[N])};let Bt=null,Ve={},Be={},$e={},qe={},Ke={};const la={[y]:Object.keys(H[y]),[O]:Object.keys(H[O]),[N]:Object.keys(H[N])};function ca(t){return~Gn.indexOf(t)}function fa(t,e){const n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!ca(r)?r:null}const Je=()=>{const t=a=>At(W,(r,s,i)=>(r[i]=At(s,a,{}),r),{});Ve=t((a,r,s)=>(r[3]&&(a[r[3]]=s),r[2]&&r[2].filter(o=>typeof o=="number").forEach(o=>{a[o.toString(16)]=s}),a)),Be=t((a,r,s)=>(a[s]=s,r[2]&&r[2].filter(o=>typeof o=="string").forEach(o=>{a[o]=s}),a)),Ke=t((a,r,s)=>{const i=r[2];return a[s]=s,i.forEach(o=>{a[o]=s}),a});const e="far"in W||f.autoFetchSvg,n=At(ia,(a,r)=>{const s=r[0];let i=r[1];const o=r[2];return i==="far"&&!e&&(i="fas"),typeof s=="string"&&(a.names[s]={prefix:i,iconName:o}),typeof s=="number"&&(a.unicodes[s.toString(16)]={prefix:i,iconName:o}),a},{names:{},unicodes:{}});$e=n.names,qe=n.unicodes,Bt=gt(f.styleDefault,{family:f.familyDefault})};$n(t=>{Bt=gt(t.styleDefault,{family:f.familyDefault})});Je();function $t(t,e){return(Ve[t]||{})[e]}function ua(t,e){return(Be[t]||{})[e]}function R(t,e){return(Ke[t]||{})[e]}function Qe(t){return $e[t]||{prefix:null,iconName:null}}function ma(t){const e=qe[t],n=$t("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function Y(){return Bt}const qt=()=>({prefix:null,iconName:null,rest:[]});function gt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=y}=e,a=H[n][t],r=rt[n][t]||rt[n][a],s=t in T.styles?t:null;return r||s||null}const da={[y]:Object.keys(G[y]),[O]:Object.keys(G[O]),[N]:Object.keys(G[N])};function ht(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=e,a={[y]:"".concat(f.cssPrefix,"-").concat(y),[O]:"".concat(f.cssPrefix,"-").concat(O),[N]:"".concat(f.cssPrefix,"-").concat(N)};let r=null,s=y;const i=xn.filter(l=>l!==Fe);i.forEach(l=>{(t.includes(a[l])||t.some(c=>da[l].includes(c)))&&(s=l)});const o=t.reduce((l,c)=>{const u=fa(f.cssPrefix,c);if(W[c]?(c=oa[s].includes(c)?Yn[s][c]:c,r=c,l.prefix=c):la[s].indexOf(c)>-1?(r=c,l.prefix=gt(c,{family:s})):u?l.iconName=u:c!==f.replacementClass&&!i.some(g=>c===a[g])&&l.rest.push(c),!n&&l.prefix&&l.iconName){const g=r==="fa"?Qe(l.iconName):{},m=R(l.prefix,l.iconName);g.prefix&&(r=null),l.iconName=g.iconName||m||l.iconName,l.prefix=g.prefix||l.prefix,l.prefix==="far"&&!W.far&&W.fas&&!f.autoFetchSvg&&(l.prefix="fas")}return l},qt());return(t.includes("fa-brands")||t.includes("fab"))&&(o.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(o.prefix="fad"),!o.prefix&&s===O&&(W.fass||f.autoFetchSvg)&&(o.prefix="fass",o.iconName=R(o.prefix,o.iconName)||o.iconName),!o.prefix&&s===N&&(W.fasds||f.autoFetchSvg)&&(o.prefix="fasds",o.iconName=R(o.prefix,o.iconName)||o.iconName),(o.prefix==="fa"||r==="fa")&&(o.prefix=Y()||"fas"),o}class pa{constructor(){this.definitions={}}add(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(s=>{this.definitions[s]={...this.definitions[s]||{},...r[s]},Tt(s,r[s]);const i=G[y][s];i&&Tt(i,r[s]),Je()})}reset(){this.definitions={}}_pullDefinitions(e,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:s,iconName:i,icon:o}=a[r],l=o[2];e[s]||(e[s]={}),l.length>0&&l.forEach(c=>{typeof c=="string"&&(e[s][c]=o)}),e[s][i]=o}),e}}let ce=[],$={};const K={},ga=Object.keys(K);function ha(t,e){let{mixoutsTo:n}=e;return ce=t,$={},Object.keys(K).forEach(a=>{ga.indexOf(a)===-1&&delete K[a]}),ce.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(s=>{typeof r[s]=="function"&&(n[s]=r[s]),typeof r[s]=="object"&&Object.keys(r[s]).forEach(i=>{n[s]||(n[s]={}),n[s][i]=r[s][i]})}),a.hooks){const s=a.hooks();Object.keys(s).forEach(i=>{$[i]||($[i]=[]),$[i].push(s[i])})}a.provides&&a.provides(K)}),n}function Ft(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return($[t]||[]).forEach(i=>{e=i.apply(null,[e,...a])}),e}function B(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];($[t]||[]).forEach(s=>{s.apply(null,n)})}function U(){const t=arguments[0],e=Array.prototype.slice.call(arguments,1);return K[t]?K[t].apply(null,e):void 0}function _t(t){t.prefix==="fa"&&(t.prefix="fas");let{iconName:e}=t;const n=t.prefix||Y();if(e)return e=R(n,e)||e,oe(Ze.definitions,n,e)||oe(T.styles,n,e)}const Ze=new pa,ba=()=>{f.autoReplaceSvg=!1,f.observeMutations=!1,B("noAuto")},ya={i2svg:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return L?(B("beforeI2svg",t),U("pseudoElements2svg",t),U("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e}=t;f.autoReplaceSvg===!1&&(f.autoReplaceSvg=!0),f.observeMutations=!0,na(()=>{xa({autoReplaceSvgRoot:e}),B("watch",t)})}},va={icon:t=>{if(t===null)return null;if(typeof t=="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:R(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){const e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=gt(t[0]);return{prefix:n,iconName:R(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(f.cssPrefix,"-"))>-1||t.match(Un))){const e=ht(t.split(" "),{skipLookups:!0});return{prefix:e.prefix||Y(),iconName:R(e.prefix,e.iconName)||e.iconName}}if(typeof t=="string"){const e=Y();return{prefix:e,iconName:R(e,t)||t}}}},E={noAuto:ba,config:f,dom:ya,parse:va,library:Ze,findIconDefinition:_t,toHtml:ot},xa=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e=h}=t;(Object.keys(T.styles).length>0||f.autoFetchSvg)&&L&&f.autoReplaceSvg&&E.dom.i2svg({node:e})};function bt(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(n=>ot(n))}}),Object.defineProperty(t,"node",{get:function(){if(!L)return;const n=h.createElement("div");return n.innerHTML=t.html,n.children}}),t}function Aa(t){let{children:e,main:n,mask:a,attributes:r,styles:s,transform:i}=t;if(Vt(i)&&n.found&&!a.found){const{width:o,height:l}=n,c={x:o/l/2,y:.5};r.style=pt({...s,"transform-origin":"".concat(c.x+i.x/16,"em ").concat(c.y+i.y/16,"em")})}return[{tag:"svg",attributes:r,children:e}]}function ka(t){let{prefix:e,iconName:n,children:a,attributes:r,symbol:s}=t;const i=s===!0?"".concat(e,"-").concat(f.cssPrefix,"-").concat(n):s;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:{...r,id:i},children:a}]}]}function Kt(t){const{icons:{main:e,mask:n},prefix:a,iconName:r,transform:s,symbol:i,title:o,maskId:l,titleId:c,extra:u,watchable:g=!1}=t,{width:m,height:b}=n.found?n:e,w=a==="fak",S=[f.replacementClass,r?"".concat(f.cssPrefix,"-").concat(r):""].filter(P=>u.classes.indexOf(P)===-1).filter(P=>P!==""||!!P).concat(u.classes).join(" ");let v={children:[],attributes:{...u.attributes,"data-prefix":a,"data-icon":r,class:S,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(m," ").concat(b)}};const A=w&&!~u.classes.indexOf("fa-fw")?{width:"".concat(m/b*16*.0625,"em")}:{};g&&(v.attributes[V]=""),o&&(v.children.push({tag:"title",attributes:{id:v.attributes["aria-labelledby"]||"title-".concat(c||st())},children:[o]}),delete v.attributes.title);const x={...v,prefix:a,iconName:r,main:e,mask:n,maskId:l,transform:s,symbol:i,styles:{...A,...u.styles}},{children:k,attributes:_}=n.found&&e.found?U("generateAbstractMask",x)||{children:[],attributes:{}}:U("generateAbstractIcon",x)||{children:[],attributes:{}};return x.children=k,x.attributes=_,i?ka(x):Aa(x)}function fe(t){const{content:e,width:n,height:a,transform:r,title:s,extra:i,watchable:o=!1}=t,l={...i.attributes,...s?{title:s}:{},class:i.classes.join(" ")};o&&(l[V]="");const c={...i.styles};Vt(r)&&(c.transform=Zn({transform:r,startCentered:!0,width:n,height:a}),c["-webkit-transform"]=c.transform);const u=pt(c);u.length>0&&(l.style=u);const g=[];return g.push({tag:"span",attributes:l,children:[e]}),s&&g.push({tag:"span",attributes:{class:"sr-only"},children:[s]}),g}function wa(t){const{content:e,title:n,extra:a}=t,r={...a.attributes,...n?{title:n}:{},class:a.classes.join(" ")},s=pt(a.styles);s.length>0&&(r.style=s);const i=[];return i.push({tag:"span",attributes:r,children:[e]}),n&&i.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),i}const{styles:kt}=T;function Mt(t){const e=t[0],n=t[1],[a]=t.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(f.cssPrefix,"-").concat(vt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(f.cssPrefix,"-").concat(vt.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(f.cssPrefix,"-").concat(vt.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:e,height:n,icon:r}}const Oa={found:!1,width:512,height:512};function Na(t,e){!ze&&!f.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function jt(t,e){let n=e;return e==="fa"&&f.styleDefault!==null&&(e=Y()),new Promise((a,r)=>{if(n==="fa"){const s=Qe(t)||{};t=s.iconName||t,e=s.prefix||e}if(t&&e&&kt[e]&&kt[e][t]){const s=kt[e][t];return a(Mt(s))}Na(t,e),a({...Oa,icon:f.showMissingIcons&&t?U("missingIconAbstract")||{}:{}})})}const ue=()=>{},Lt=f.measurePerformance&&lt&&lt.mark&&lt.measure?lt:{mark:ue,measure:ue},et='FA "6.6.0"',Ea=t=>(Lt.mark("".concat(et," ").concat(t," begins")),()=>tn(t)),tn=t=>{Lt.mark("".concat(et," ").concat(t," ends")),Lt.measure("".concat(et," ").concat(t),"".concat(et," ").concat(t," begins"),"".concat(et," ").concat(t," ends"))};var Jt={begin:Ea,end:tn};const ct=()=>{};function me(t){return typeof(t.getAttribute?t.getAttribute(V):null)=="string"}function Sa(t){const e=t.getAttribute?t.getAttribute(Xt):null,n=t.getAttribute?t.getAttribute(Ht):null;return e&&n}function Pa(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(f.replacementClass)}function Ca(){return f.autoReplaceSvg===!0?ft.replace:ft[f.autoReplaceSvg]||ft.replace}function Ia(t){return h.createElementNS("http://www.w3.org/2000/svg",t)}function Ta(t){return h.createElement(t)}function en(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=t.tag==="svg"?Ia:Ta}=e;if(typeof t=="string")return h.createTextNode(t);const a=n(t.tag);return Object.keys(t.attributes||[]).forEach(function(s){a.setAttribute(s,t.attributes[s])}),(t.children||[]).forEach(function(s){a.appendChild(en(s,{ceFn:n}))}),a}function Fa(t){let e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}const ft={replace:function(t){const e=t[0];if(e.parentNode)if(t[1].forEach(n=>{e.parentNode.insertBefore(en(n),e)}),e.getAttribute(V)===null&&f.keepOriginalSource){let n=h.createComment(Fa(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){const e=t[0],n=t[1];if(~Gt(e).indexOf(f.replacementClass))return ft.replace(t);const a=new RegExp("".concat(f.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const s=n[0].attributes.class.split(" ").reduce((i,o)=>(o===f.replacementClass||o.match(a)?i.toSvg.push(o):i.toNode.push(o),i),{toNode:[],toSvg:[]});n[0].attributes.class=s.toSvg.join(" "),s.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",s.toNode.join(" "))}const r=n.map(s=>ot(s)).join(`
`);e.setAttribute(V,""),e.innerHTML=r}};function de(t){t()}function nn(t,e){const n=typeof e=="function"?e:ct;if(t.length===0)n();else{let a=de;f.mutateApproach===Rn&&(a=D.requestAnimationFrame||de),a(()=>{const r=Ca(),s=Jt.begin("mutate");t.map(r),s(),n()})}}let Qt=!1;function an(){Qt=!0}function zt(){Qt=!1}let mt=null;function pe(t){if(!ne||!f.observeMutations)return;const{treeCallback:e=ct,nodeCallback:n=ct,pseudoElementsCallback:a=ct,observeMutationsRoot:r=h}=t;mt=new ne(s=>{if(Qt)return;const i=Y();Z(s).forEach(o=>{if(o.type==="childList"&&o.addedNodes.length>0&&!me(o.addedNodes[0])&&(f.searchPseudoElements&&a(o.target),e(o.target)),o.type==="attributes"&&o.target.parentNode&&f.searchPseudoElements&&a(o.target.parentNode),o.type==="attributes"&&me(o.target)&&~Hn.indexOf(o.attributeName))if(o.attributeName==="class"&&Sa(o.target)){const{prefix:l,iconName:c}=ht(Gt(o.target));o.target.setAttribute(Xt,l||i),c&&o.target.setAttribute(Ht,c)}else Pa(o.target)&&n(o.target)})}),L&&mt.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function _a(){mt&&mt.disconnect()}function Ma(t){const e=t.getAttribute("style");let n=[];return e&&(n=e.split(";").reduce((a,r)=>{const s=r.split(":"),i=s[0],o=s.slice(1);return i&&o.length>0&&(a[i]=o.join(":").trim()),a},{})),n}function ja(t){const e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"";let r=ht(Gt(t));return r.prefix||(r.prefix=Y()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=ua(r.prefix,t.innerText)||$t(r.prefix,It(t.innerText))),!r.iconName&&f.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function La(t){const e=Z(t.attributes).reduce((r,s)=>(r.name!=="class"&&r.name!=="style"&&(r[s.name]=s.value),r),{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return f.autoA11y&&(n?e["aria-labelledby"]="".concat(f.replacementClass,"-title-").concat(a||st()):(e["aria-hidden"]="true",e.focusable="false")),e}function za(){return{iconName:null,title:null,titleId:null,prefix:null,transform:I,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function ge(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=ja(t),s=La(t),i=Ft("parseNodeAttributes",{},t);let o=e.styleParser?Ma(t):[];return{iconName:n,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:I,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:o,attributes:s},...i}}const{styles:Ra}=T;function rn(t){const e=f.autoReplaceSvg==="nest"?ge(t,{styleParser:!1}):ge(t);return~e.extra.classes.indexOf(Ye)?U("generateLayersText",t,e):U("generateSvgReplacementMutation",t,e)}let F=new Set;Re.map(t=>{F.add("fa-".concat(t))});Object.keys(H[y]).map(F.add.bind(F));Object.keys(H[O]).map(F.add.bind(F));Object.keys(H[N]).map(F.add.bind(F));F=[...F];function he(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!L)return Promise.resolve();const n=h.documentElement.classList,a=u=>n.add("".concat(se,"-").concat(u)),r=u=>n.remove("".concat(se,"-").concat(u)),s=f.autoFetchSvg?F:Re.map(u=>"fa-".concat(u)).concat(Object.keys(Ra));s.includes("fa")||s.push("fa");const i=[".".concat(Ye,":not([").concat(V,"])")].concat(s.map(u=>".".concat(u,":not([").concat(V,"])"))).join(", ");if(i.length===0)return Promise.resolve();let o=[];try{o=Z(t.querySelectorAll(i))}catch{}if(o.length>0)a("pending"),r("complete");else return Promise.resolve();const l=Jt.begin("onTree"),c=o.reduce((u,g)=>{try{const m=rn(g);m&&u.push(m)}catch(m){ze||m.name==="MissingIcon"&&console.error(m)}return u},[]);return new Promise((u,g)=>{Promise.all(c).then(m=>{nn(m,()=>{a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),l(),u()})}).catch(m=>{l(),g(m)})})}function Da(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;rn(t).then(n=>{n&&nn([n],e)})}function Ya(t){return function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(e||{}).icon?e:_t(e||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:_t(r||{})),t(a,{...n,mask:r})}}const Ua=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=I,symbol:a=!1,mask:r=null,maskId:s=null,title:i=null,titleId:o=null,classes:l=[],attributes:c={},styles:u={}}=e;if(!t)return;const{prefix:g,iconName:m,icon:b}=t;return bt({type:"icon",...t},()=>(B("beforeDOMElementCreation",{iconDefinition:t,params:e}),f.autoA11y&&(i?c["aria-labelledby"]="".concat(f.replacementClass,"-title-").concat(o||st()):(c["aria-hidden"]="true",c.focusable="false")),Kt({icons:{main:Mt(b),mask:r?Mt(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:g,iconName:m,transform:{...I,...n},symbol:a,title:i,maskId:s,titleId:o,extra:{attributes:c,styles:u,classes:l}})))};var Wa={mixout(){return{icon:Ya(Ua)}},hooks(){return{mutationObserverCallbacks(t){return t.treeCallback=he,t.nodeCallback=Da,t}}},provides(t){t.i2svg=function(e){const{node:n=h,callback:a=()=>{}}=e;return he(n,a)},t.generateSvgReplacementMutation=function(e,n){const{iconName:a,title:r,titleId:s,prefix:i,transform:o,symbol:l,mask:c,maskId:u,extra:g}=n;return new Promise((m,b)=>{Promise.all([jt(a,i),c.iconName?jt(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(w=>{let[S,v]=w;m([e,Kt({icons:{main:S,mask:v},prefix:i,iconName:a,transform:o,symbol:l,maskId:u,title:r,titleId:s,extra:g,watchable:!0})])}).catch(b)})},t.generateAbstractIcon=function(e){let{children:n,attributes:a,main:r,transform:s,styles:i}=e;const o=pt(i);o.length>0&&(a.style=o);let l;return Vt(s)&&(l=U("generateAbstractTransformGrouping",{main:r,transform:s,containerWidth:r.width,iconWidth:r.width})),n.push(l||r.icon),{children:n,attributes:a}}}},Xa={mixout(){return{layer(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=e;return bt({type:"layer"},()=>{B("beforeDOMElementCreation",{assembler:t,params:e});let a=[];return t(r=>{Array.isArray(r)?r.map(s=>{a=a.concat(s.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(f.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},Ha={mixout(){return{counter(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:s={}}=e;return bt({type:"counter",content:t},()=>(B("beforeDOMElementCreation",{content:t,params:e}),wa({content:t.toString(),title:n,extra:{attributes:r,styles:s,classes:["".concat(f.cssPrefix,"-layers-counter"),...a]}})))}}}},Ga={mixout(){return{text(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=I,title:a=null,classes:r=[],attributes:s={},styles:i={}}=e;return bt({type:"text",content:t},()=>(B("beforeDOMElementCreation",{content:t,params:e}),fe({content:t,transform:{...I,...n},title:a,extra:{attributes:s,styles:i,classes:["".concat(f.cssPrefix,"-layers-text"),...r]}})))}}},provides(t){t.generateLayersText=function(e,n){const{title:a,transform:r,extra:s}=n;let i=null,o=null;if(Te){const l=parseInt(getComputedStyle(e).fontSize,10),c=e.getBoundingClientRect();i=c.width/l,o=c.height/l}return f.autoA11y&&!a&&(s.attributes["aria-hidden"]="true"),Promise.resolve([e,fe({content:e.innerHTML,width:i,height:o,transform:r,title:a,extra:s,watchable:!0})])}}};const Va=new RegExp('"',"ug"),be=[1105920,1112319],ye={FontAwesome:{normal:"fas",400:"fas"},...En,...Nn,...Mn},Rt=Object.keys(ye).reduce((t,e)=>(t[e.toLowerCase()]=ye[e],t),{}),Ba=Object.keys(Rt).reduce((t,e)=>{const n=Rt[e];return t[e]=n[900]||[...Object.entries(n)][0][1],t},{});function $a(t){const e=t.replace(Va,""),n=sa(e,0),a=n>=be[0]&&n<=be[1],r=e.length===2?e[0]===e[1]:!1;return{value:It(r?e[0]:e),isSecondary:a||r}}function qa(t,e){const n=t.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(e),r=isNaN(a)?"normal":a;return(Rt[n]||{})[r]||Ba[n]}function ve(t,e){const n="".concat(zn).concat(e.replace(":","-"));return new Promise((a,r)=>{if(t.getAttribute(n)!==null)return a();const i=Z(t.children).filter(m=>m.getAttribute(Et)===e)[0],o=D.getComputedStyle(t,e),l=o.getPropertyValue("font-family"),c=l.match(Wn),u=o.getPropertyValue("font-weight"),g=o.getPropertyValue("content");if(i&&!c)return t.removeChild(i),a();if(c&&g!=="none"&&g!==""){const m=o.getPropertyValue("content");let b=qa(l,u);const{value:w,isSecondary:S}=$a(m),v=c[0].startsWith("FontAwesome");let A=$t(b,w),x=A;if(v){const k=ma(w);k.iconName&&k.prefix&&(A=k.iconName,b=k.prefix)}if(A&&!S&&(!i||i.getAttribute(Xt)!==b||i.getAttribute(Ht)!==x)){t.setAttribute(n,x),i&&t.removeChild(i);const k=za(),{extra:_}=k;_.attributes[Et]=e,jt(A,b).then(P=>{const cn=Kt({...k,icons:{main:P,mask:qt()},prefix:b,iconName:x,extra:_,watchable:!0}),yt=h.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(yt,t.firstChild):t.appendChild(yt),yt.outerHTML=cn.map(fn=>ot(fn)).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function Ka(t){return Promise.all([ve(t,"::before"),ve(t,"::after")])}function Ja(t){return t.parentNode!==document.head&&!~Dn.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(Et)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function xe(t){if(L)return new Promise((e,n)=>{const a=Z(t.querySelectorAll("*")).filter(Ja).map(Ka),r=Jt.begin("searchPseudoElements");an(),Promise.all(a).then(()=>{r(),zt(),e()}).catch(()=>{r(),zt(),n()})})}var Qa={hooks(){return{mutationObserverCallbacks(t){return t.pseudoElementsCallback=xe,t}}},provides(t){t.pseudoElements2svg=function(e){const{node:n=h}=e;f.searchPseudoElements&&xe(n)}}};let Ae=!1;var Za={mixout(){return{dom:{unwatch(){an(),Ae=!0}}}},hooks(){return{bootstrap(){pe(Ft("mutationObserverCallbacks",{}))},noAuto(){_a()},watch(t){const{observeMutationsRoot:e}=t;Ae?zt():pe(Ft("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}};const ke=t=>{let e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),s=r[0];let i=r.slice(1).join("-");if(s&&i==="h")return n.flipX=!0,n;if(s&&i==="v")return n.flipY=!0,n;if(i=parseFloat(i),isNaN(i))return n;switch(s){case"grow":n.size=n.size+i;break;case"shrink":n.size=n.size-i;break;case"left":n.x=n.x-i;break;case"right":n.x=n.x+i;break;case"up":n.y=n.y-i;break;case"down":n.y=n.y+i;break;case"rotate":n.rotate=n.rotate+i;break}return n},e)};var tr={mixout(){return{parse:{transform:t=>ke(t)}}},hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-transform");return n&&(t.transform=ke(n)),t}}},provides(t){t.generateAbstractTransformGrouping=function(e){let{main:n,transform:a,containerWidth:r,iconWidth:s}=e;const i={transform:"translate(".concat(r/2," 256)")},o="translate(".concat(a.x*32,", ").concat(a.y*32,") "),l="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),c="rotate(".concat(a.rotate," 0 0)"),u={transform:"".concat(o," ").concat(l," ").concat(c)},g={transform:"translate(".concat(s/2*-1," -256)")},m={outer:i,inner:u,path:g};return{tag:"g",attributes:{...m.outer},children:[{tag:"g",attributes:{...m.inner},children:[{tag:n.icon.tag,children:n.icon.children,attributes:{...n.icon.attributes,...m.path}}]}]}}}};const wt={x:0,y:0,width:"100%",height:"100%"};function we(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function er(t){return t.tag==="g"?t.children:[t]}var nr={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-mask"),a=n?ht(n.split(" ").map(r=>r.trim())):qt();return a.prefix||(a.prefix=Y()),t.mask=a,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides(t){t.generateAbstractMask=function(e){let{children:n,attributes:a,main:r,mask:s,maskId:i,transform:o}=e;const{width:l,icon:c}=r,{width:u,icon:g}=s,m=Qn({transform:o,containerWidth:u,iconWidth:l}),b={tag:"rect",attributes:{...wt,fill:"white"}},w=c.children?{children:c.children.map(we)}:{},S={tag:"g",attributes:{...m.inner},children:[we({tag:c.tag,attributes:{...c.attributes,...m.path},...w})]},v={tag:"g",attributes:{...m.outer},children:[S]},A="mask-".concat(i||st()),x="clip-".concat(i||st()),k={tag:"mask",attributes:{...wt,id:A,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"},children:[b,v]},_={tag:"defs",children:[{tag:"clipPath",attributes:{id:x},children:er(g)},k]};return n.push(_,{tag:"rect",attributes:{fill:"currentColor","clip-path":"url(#".concat(x,")"),mask:"url(#".concat(A,")"),...wt}}),{children:n,attributes:a}}}},ar={provides(t){let e=!1;D.matchMedia&&(e=D.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:{...a,d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"}});const s={...r,attributeName:"opacity"},i={tag:"circle",attributes:{...a,cx:"256",cy:"364",r:"28"},children:[]};return e||i.children.push({tag:"animate",attributes:{...r,attributeName:"r",values:"28;14;28;28;14;28;"}},{tag:"animate",attributes:{...s,values:"1;0;1;1;0;1;"}}),n.push(i),n.push({tag:"path",attributes:{...a,opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"},children:e?[]:[{tag:"animate",attributes:{...s,values:"1;0;0;0;0;1;"}}]}),e||n.push({tag:"path",attributes:{...a,opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"},children:[{tag:"animate",attributes:{...s,values:"0;0;1;1;0;0;"}}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},rr={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return t.symbol=a,t}}}},sr=[ea,Wa,Xa,Ha,Ga,Qa,Za,tr,nr,ar,rr];ha(sr,{mixoutsTo:E});E.noAuto;E.config;E.library;E.dom;const Dt=E.parse;E.findIconDefinition;E.toHtml;const ir=E.icon;E.layer;E.text;E.counter;function Oe(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function C(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Oe(Object(n),!0).forEach(function(a){q(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Oe(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function dt(t){"@babel/helpers - typeof";return dt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},dt(t)}function q(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function or(t,e){if(t==null)return{};var n={},a=Object.keys(t),r,s;for(s=0;s<a.length;s++)r=a[s],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function lr(t,e){if(t==null)return{};var n=or(t,e),a,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(r=0;r<s.length;r++)a=s[r],!(e.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}function Yt(t){return cr(t)||fr(t)||ur(t)||mr()}function cr(t){if(Array.isArray(t))return Ut(t)}function fr(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function ur(t,e){if(t){if(typeof t=="string")return Ut(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Ut(t,e)}}function Ut(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function mr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function dr(t){var e,n=t.beat,a=t.fade,r=t.beatFade,s=t.bounce,i=t.shake,o=t.flash,l=t.spin,c=t.spinPulse,u=t.spinReverse,g=t.pulse,m=t.fixedWidth,b=t.inverse,w=t.border,S=t.listItem,v=t.flip,A=t.size,x=t.rotation,k=t.pull,_=(e={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":s,"fa-shake":i,"fa-flash":o,"fa-spin":l,"fa-spin-reverse":u,"fa-spin-pulse":c,"fa-pulse":g,"fa-fw":m,"fa-inverse":b,"fa-border":w,"fa-li":S,"fa-flip":v===!0,"fa-flip-horizontal":v==="horizontal"||v==="both","fa-flip-vertical":v==="vertical"||v==="both"},q(e,"fa-".concat(A),typeof A<"u"&&A!==null),q(e,"fa-rotate-".concat(x),typeof x<"u"&&x!==null&&x!==0),q(e,"fa-pull-".concat(k),typeof k<"u"&&k!==null),q(e,"fa-swap-opacity",t.swapOpacity),e);return Object.keys(_).map(function(P){return _[P]?P:null}).filter(function(P){return P})}function pr(t){return t=t-0,t===t}function sn(t){return pr(t)?t:(t=t.replace(/[\-_\s]+(.)?/g,function(e,n){return n?n.toUpperCase():""}),t.substr(0,1).toLowerCase()+t.substr(1))}var gr=["style"];function hr(t){return t.charAt(0).toUpperCase()+t.slice(1)}function br(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var a=n.indexOf(":"),r=sn(n.slice(0,a)),s=n.slice(a+1).trim();return r.startsWith("webkit")?e[hr(r)]=s:e[r]=s,e},{})}function on(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var a=(e.children||[]).map(function(l){return on(t,l)}),r=Object.keys(e.attributes||{}).reduce(function(l,c){var u=e.attributes[c];switch(c){case"class":l.attrs.className=u,delete e.attributes.class;break;case"style":l.attrs.style=br(u);break;default:c.indexOf("aria-")===0||c.indexOf("data-")===0?l.attrs[c.toLowerCase()]=u:l.attrs[sn(c)]=u}return l},{attrs:{}}),s=n.style,i=s===void 0?{}:s,o=lr(n,gr);return r.attrs.style=C(C({},r.attrs.style),i),t.apply(void 0,[e.tag,C(C({},r.attrs),o)].concat(Yt(a)))}var ln=!1;try{ln=!0}catch{}function yr(){if(!ln&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function Ne(t){if(t&&dt(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(Dt.icon)return Dt.icon(t);if(t===null)return null;if(t&&dt(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}function Ot(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?q({},t,e):{}}var Ee={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},X=Se.forwardRef(function(t,e){var n=C(C({},Ee),t),a=n.icon,r=n.mask,s=n.symbol,i=n.className,o=n.title,l=n.titleId,c=n.maskId,u=Ne(a),g=Ot("classes",[].concat(Yt(dr(n)),Yt((i||"").split(" ")))),m=Ot("transform",typeof n.transform=="string"?Dt.transform(n.transform):n.transform),b=Ot("mask",Ne(r)),w=ir(u,C(C(C(C({},g),m),b),{},{symbol:s,title:o,titleId:l,maskId:c}));if(!w)return yr("Could not find icon",u),null;var S=w.abstract,v={ref:e};return Object.keys(n).forEach(function(A){Ee.hasOwnProperty(A)||(v[A]=n[A])}),vr(S[0],v)});X.displayName="FontAwesomeIcon";X.propTypes={beat:d.bool,border:d.bool,beatFade:d.bool,bounce:d.bool,className:d.string,fade:d.bool,flash:d.bool,mask:d.oneOfType([d.object,d.array,d.string]),maskId:d.string,fixedWidth:d.bool,inverse:d.bool,flip:d.oneOf([!0,!1,"horizontal","vertical","both"]),icon:d.oneOfType([d.object,d.array,d.string]),listItem:d.bool,pull:d.oneOf(["right","left"]),pulse:d.bool,rotation:d.oneOf([0,90,180,270]),shake:d.bool,size:d.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:d.bool,spinPulse:d.bool,spinReverse:d.bool,symbol:d.oneOfType([d.bool,d.string]),title:d.string,titleId:d.string,transform:d.oneOfType([d.string,d.object]),swapOpacity:d.bool};var vr=on.bind(null,Se.createElement);const Er=()=>{const[t,e]=Zt.useState(!1),[n,a]=Zt.useState(""),{register:r,handleSubmit:s,formState:{errors:i,isSubmitting:o},reset:l}=dn({resolver:un(mn),mode:"onBlur"}),c=async u=>{try{const g={method:"POST",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify(u)},m=await fetch("/api/send-email",g);if(m.ok)a("Email envoyé avec succès !"),l(),setTimeout(()=>a(""),5e3);else{let b;try{b=await m.json()}catch{}m.status===429?a("Trop d'emails envoyés. Veuillez réessayer dans une heure."):m.status>=500?a("Erreur serveur. Veuillez réessayer plus tard."):b!=null&&b.message?a(b.message):a("Échec de l'envoi de l'email. Veuillez réessayer.")}}catch{a("Une erreur est survenue. Veuillez réessayer plus tard.")}};return p.jsx("div",{id:"contact-section",className:"card-3d-wrap mx-auto",style:{width:"600px",height:"600px"},children:p.jsxs("div",{className:`card-3d-wrapper ${t?"is-flipped":""}`,children:[p.jsx("div",{className:"card-front",children:p.jsx("div",{className:"center-wrap",children:p.jsxs("div",{className:"section text-center",children:[p.jsx("h4",{className:"mb-4 pb-3",children:"Bookings & Infos"}),n&&p.jsxs("div",{className:"confirmation-message",children:[p.jsx(X,{icon:bn,className:"confirmation-icon"}),n]}),p.jsxs("form",{onSubmit:s(c),children:[p.jsxs("div",{className:"form-group mb-2",children:[p.jsxs("div",{className:"input-wrapper",children:[p.jsx(X,{icon:vn,className:"input-icon",size:"xl"}),p.jsx("input",{type:"text",className:"form-style",placeholder:"Votre nom",...r("name"),disabled:o})]}),i.name&&p.jsx("div",{className:"error-message",children:i.name.message})]}),p.jsxs("div",{className:"form-group mb-2",children:[p.jsxs("div",{className:"input-wrapper",children:[p.jsx(X,{icon:gn,className:"input-icon",size:"xl"}),p.jsx("input",{type:"email",className:"form-style",placeholder:"Votre email",...r("email"),disabled:o})]}),i.email&&p.jsx("div",{className:"error-message",children:i.email.message})]}),p.jsxs("div",{className:"form-group mb-2",children:[p.jsxs("div",{className:"input-wrapper",children:[p.jsx(X,{icon:yn,className:"input-icon",size:"xl"}),p.jsx("input",{type:"text",className:"form-style",placeholder:"Objet",...r("subject"),disabled:o})]}),i.subject&&p.jsx("div",{className:"error-message",children:i.subject.message})]}),p.jsxs("div",{className:"form-group mb-2",children:[p.jsxs("div",{className:"input-wrapper",children:[p.jsx(X,{icon:pn,className:"input-icon message-icon",size:"xl"}),p.jsx("textarea",{className:"form-style",placeholder:"Votre message",rows:3,...r("message"),disabled:o})]}),i.message&&p.jsx("div",{className:"error-message",children:i.message.message})]}),p.jsx("button",{type:"submit",className:"btn mt-4",disabled:o,children:o?"Envoi...":"Envoyer"})]})]})})}),p.jsx("div",{className:"card-back",children:p.jsx("div",{className:"center-wrap",children:p.jsxs("div",{className:"section text-center",children:[p.jsx("h4",{className:"mb-4 pb-3",children:"E-mail envoyé avec succès!"}),p.jsx("button",{onClick:()=>e(!1),className:"btn mt-4",children:"Envoyer un autre e-mail"})]})})})]})})};export{Er as default};
