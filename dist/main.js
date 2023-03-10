(()=>{"use strict";var n,e,t,r,o,a,i,c,s,d,p,l,u,f,h={566:(n,e,t)=>{t.d(e,{Z:()=>c});var r=t(558),o=t.n(r),a=t(361),i=t.n(a)()(o());i.push([n.id,"* {\n    margin: 0;\n    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif\n}\n\n.content {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n}\n\n.header {\n    display: flex;\n    background-color: rgb(59, 121, 255);\n    padding: 15px;\n    box-shadow: 5px 10px;\n    color: white;\n    align-items: center;\n    gap: 20px;\n}\n\nh1 {\n    font-size: 40px;\n}\n\n.clipboardIcon {\n    width: 30px;\n    height: 45px;\n    margin-bottom: 5px;;\n}\n\n.main {\n    background-color: white;\n    display: flex;\n    height: 100%;\n}\n\n.sidebar {\n    display: flex;\n    flex-direction: column;\n    background-color: rgb(240, 240, 240);\n    padding: 30px;\n    font-size: 20px;\n    width: 185px;\n}\n\n.sideTop {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n}\n\n.inboxIcon,\n.todayIcon,\n.weekIcon {\n    width: 20px;\n    height: 20px;\n}\n\n.inbox,\n.today,\n.week,\n.addProject {\n    display: flex;\n    align-items: center;\n    padding: 10px;\n    gap: 10px;\n}\n\n.inbox:hover,\n.today:hover,\n.week:hover,\n.addProject:hover {\n    cursor: pointer;\n    background-color:rgb(194, 194, 194);\n    border-radius: 5px;\n}\n\n.sideBottom {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    margin-top: 50px;\n}\n\n.addProject {\n    display: flex;\n}\n\n.plusSign {\n    width: 21px;\n    height: 21px;\n}\n\n.addProjectText {\n    font-size: 20px;\n    margin-left: 4px;\n    \n}\n\n.mainPage {\n    display: flex;\n    padding: 20px;\n    justify-content: center;\n    width: 100%;\n}\n\n\n.footer {\n    display:flex;\n    justify-content: center;\n    align-items: center;\n    gap: 5px;\n    position:fixed;\n   left:0px;\n   bottom:0px;\n   height:30px;\n   width:100%;\n   background-color: rgb(59, 121, 255);\n   color: white;\n   padding: 10px;\n}\n\n\n.github {\n    margin-left: 5px;\n    width: 20px;\n    height: 20px;\n}\n\n.github:hover {\n    transform: scale(1.1);\n    cursor: pointer;\n}\n\n\n",""]);const c=i},361:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var d=0;d<n.length;d++){var p=[].concat(n[d]);r&&i[p[0]]||(void 0!==a&&(void 0===p[5]||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=a),t&&(p[2]?(p[1]="@media ".concat(p[2]," {").concat(p[1],"}"),p[2]=t):p[2]=t),o&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=o):p[4]="".concat(o)),e.push(p))}},e}},558:n=>{n.exports=function(n){return n[1]}},487:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var a={},i=[],c=0;c<n.length;c++){var s=n[c],d=r.base?s[0]+r.base:s[0],p=a[d]||0,l="".concat(d," ").concat(p);a[d]=p+1;var u=t(l),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==u)e[u].references++,e[u].updater(f);else{var h=o(f,r);r.byIndex=c,e.splice(c,0,{identifier:l,updater:h,references:1})}i.push(l)}return i}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var a=r(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var c=t(a[i]);e[c].references--}for(var s=r(n,o),d=0;d<a.length;d++){var p=t(a[d]);0===e[p].references&&(e[p].updater(),e.splice(p,1))}a=s}}},52:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},469:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},10:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},631:n=>{n.exports=function(n){var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},329:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},x={};function g(n){var e=x[n];if(void 0!==e)return e.exports;var t=x[n]={id:n,exports:{}};return h[n](t,t.exports,g),t.exports}g.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return g.d(e,{a:e}),e},g.d=(n,e)=>{for(var t in e)g.o(e,t)&&!g.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:e[t]})},g.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),g.nc=void 0,n=g(487),e=g.n(n),t=g(631),r=g.n(t),o=g(52),a=g.n(o),i=g(10),c=g.n(i),s=g(469),d=g.n(s),p=g(329),l=g.n(p),u=g(566),(f={}).styleTagTransform=l(),f.setAttributes=c(),f.insert=a().bind(null,"head"),f.domAPI=r(),f.insertStyleElement=d(),e()(u.Z,f),u.Z&&u.Z.locals&&u.Z.locals,document.querySelector(".mainPage").appendChild(function(){const n=document.createElement("h2");return n.classList.add("title"),n.textContent="Inbox",n}())})();