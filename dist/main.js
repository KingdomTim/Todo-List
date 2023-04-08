(()=>{"use strict";var n={566:(n,e,t)=>{t.d(e,{Z:()=>s});var a=t(558),i=t.n(a),r=t(361),o=t.n(r)()(i());o.push([n.id,"* {\n    margin: 0;\n    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif\n}\n\n.content {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n}\n\n.header {\n    display: flex;\n    background-color: rgb(59, 121, 255);\n    padding: 15px;\n    box-shadow: 5px 10px;\n    color: white;\n    align-items: center;\n    gap: 20px;\n}\n\nh1 {\n    font-size: 40px;\n}\n\n.clipboardIcon {\n    width: 30px;\n    height: 45px;\n    margin-bottom: 5px;;\n}\n\n.main {\n    background-color: white;\n    display: flex;\n    height: 100%;\n}\n\n.sidebar {\n    display: flex;\n    flex-direction: column;\n    background-color: rgb(240, 240, 240);\n    padding: 30px;\n    font-size: 20px;\n    width: 185px;\n}\n\n.sideTop {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n}\n\n.homeIcon,\n.todayIcon,\n.weekIcon {\n    width: 20px;\n    height: 20px;\n}\n\n.home,\n.today,\n.week,\n.addProject {\n    display: flex;\n    align-items: center;\n    padding: 10px;\n    gap: 10px;\n}\n\n.home:hover,\n.today:hover,\n.week:hover,\n.addProject:hover {\n    cursor: pointer;\n    background-color:rgb(194, 194, 194);\n    border-radius: 5px;\n}\n\n.sideBottom {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    margin-top: 50px;\n}\n\n.addProject {\n    display: flex;\n}\n\n.plusSign {\n    width: 21px;\n    height: 21px;\n}\n\n.addProjectText {\n    font-size: 20px;\n    margin-left: 4px;\n}\n\n.mainPage {\n    display: flex;\n    padding: 20px;\n    flex-direction: column;\n    width: 100%;\n    gap: 15px;\n}\n\n.footer {\n    display:flex;\n    justify-content: center;\n    align-items: center;\n    gap: 5px;\n    position:fixed;\n   left:0px;\n   bottom:0px;\n   height:30px;\n   width:100%;\n   background-color: rgb(59, 121, 255);\n   color: white;\n   padding: 10px;\n}\n\n\n.github {\n    margin-left: 5px;\n    width: 20px;\n    height: 20px;\n}\n\n.github:hover {\n    transform: scale(1.1);\n    cursor: pointer;\n}\n\n.taskButton {\n    display: flex;\n    padding: 10px;\n    height: 20px;\n}\n\n.taskCreation {\n    display:flex;\n    background: color;\n    flex-wrap: wrap;\n    align-items: center;\n    min-height: 200px;\n    border-radius: 8px;\n    padding: 20px;\n    background-color: darkgrey;\n    justify-content: space-around;\n}\n\n.titleInput,\n.dateInput,\n.priorityInput,\n.submit {\n    padding: 5px;\n    border-radius: 5px;\n}\n\n.titleInput {\n    display: flex;\n    flex-direction: column;\n}\n\n.descriptionInput {\n    padding: 5px;\n    border-radius: 5px;\n}\n\n.dateInput {\n    width: 100px;\n    text-align: center;\n}\n\n.submit {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 80px;\n    height: 40px;\n    border-radius: 10px;\n    background-color: green;\n}\n\n.leftSide {\n    display: flex;\n    flex-direction: column;\n    gap: 30px;\n}\n\n\n.rightSide {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 20px;\n}\n\ntd {\n    text-align: center;\n    padding: 10px;\n    border-radius: 5px;\n}\n\ntable {\n    border-spacing: 0px;\n}\n\n.taskButton:hover {\n    background-color: gray;\n    cursor: pointer;\n    border-radius: 5px;\n}\n\n.check {\n    width: 20px;\n    height: 20px;\n    border-radius: 15px;\n}\n\n.edit,\n.delete {\n    width: 20px;\n    height: 20px;\n}\n\n.check:hover,\n.edit:hover,\n.delete:hover {\n    cursor: pointer;\n    transform: scale(1.1)\n}\n\n.low {\n    background-color: greenyellow\n}\n\n.medium {\n    background-color: orange;\n}\n\n.urgent {\n    background-color: rgb(255, 68, 68)\n}\n\n.complete {\n    background-color: rgb(190,190,190)\n}",""]);const s=o},361:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",a=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),a&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),a&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,a,i,r){"string"==typeof n&&(n=[[null,n,void 0]]);var o={};if(a)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(o[c]=!0)}for(var d=0;d<n.length;d++){var l=[].concat(n[d]);a&&o[l[0]]||(void 0!==r&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=r),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),i&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=i):l[4]="".concat(i)),e.push(l))}},e}},558:n=>{n.exports=function(n){return n[1]}},487:n=>{var e=[];function t(n){for(var t=-1,a=0;a<e.length;a++)if(e[a].identifier===n){t=a;break}return t}function a(n,a){for(var r={},o=[],s=0;s<n.length;s++){var c=n[s],d=a.base?c[0]+a.base:c[0],l=r[d]||0,p="".concat(d," ").concat(l);r[d]=l+1;var u=t(p),g={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)e[u].references++,e[u].updater(g);else{var m=i(g,a);a.byIndex=s,e.splice(s,0,{identifier:p,updater:m,references:1})}o.push(p)}return o}function i(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,i){var r=a(n=n||[],i=i||{});return function(n){n=n||[];for(var o=0;o<r.length;o++){var s=t(r[o]);e[s].references--}for(var c=a(n,i),d=0;d<r.length;d++){var l=t(r[d]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}r=c}}},52:n=>{var e={};n.exports=function(n,t){var a=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}},469:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},10:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},631:n=>{n.exports=function(n){var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var a="";t.supports&&(a+="@supports (".concat(t.supports,") {")),t.media&&(a+="@media ".concat(t.media," {"));var i=void 0!==t.layer;i&&(a+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),a+=t.css,i&&(a+="}"),t.media&&(a+="}"),t.supports&&(a+="}");var r=t.sourceMap;r&&"undefined"!=typeof btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(a,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},329:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(a){var i=e[a];if(void 0!==i)return i.exports;var r=e[a]={id:a,exports:{}};return n[a](r,r.exports,t),r.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var a in e)t.o(e,a)&&!t.o(n,a)&&Object.defineProperty(n,a,{enumerable:!0,get:e[a]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0,(()=>{var n=t(487),e=t.n(n),a=t(631),i=t.n(a),r=t(52),o=t.n(r),s=t(10),c=t.n(s),d=t(469),l=t.n(d),p=t(329),u=t.n(p),g=t(566),m={};m.styleTagTransform=u(),m.setAttributes=c(),m.insert=o().bind(null,"head"),m.domAPI=i(),m.insertStyleElement=l(),e()(g.Z,m),g.Z&&g.Z.locals&&g.Z.locals;class h{static addTask(){const n=document.querySelector(".mainPage"),e=document.createElement("div");e.classList.add("taskButton"),e.textContent="+ Add Task",h.addList(),n.appendChild(e),h.handleTaskButton(e)}static addList(){const n=document.querySelector(".mainPage"),e=document.createElement("table");e.classList.add("list");const t=document.createElement("tr"),a=document.createElement("th"),i=document.createElement("th"),r=document.createElement("th"),o=document.createElement("th");a.textContent="Task",i.textContent="Description",r.textContent="Due",o.textContent="Check/Edit/Delete",t.appendChild(a),t.appendChild(i),t.appendChild(r),t.appendChild(o),e.appendChild(t),e.style.display="none",n.appendChild(e)}static handleTaskButton(n){const e=document.querySelector(".mainPage"),t=document.createElement("div");e.appendChild(t),n.addEventListener("click",(()=>{n.style.display="none",t.innerHTML="<div class='taskCreation'>\n                                    <div class='leftSide'>\n                                    <input class='titleInput' placeholder='Title'>\n                                    <textarea class='descriptionInput' rows= '4' cols='50' placeholder='Description' style=\"resize:none\"></textArea>\n                                    </div>\n                                    <div class='rightSide'>\n                                    <input type='date' class='dateInput'>\n                                    <select class='priorityInput'>\n                                        <option selected disabled>Priority</option>\n                                        <option value='Low'>Low</option>\n                                        <option value='Medium'>Medium</option>\n                                        <option value='Urgent'>Urgent</option>\n                                    </select>\n                                    <button class='submit'>Submit</button>\n                                    </div>\n                                </div>",h.handleSubmit()}))}static handleCheck(n){n.addEventListener("click",(e=>{e.target.classList.contains("check")&&(n.classList.contains("urgent")||e.target.classList.contains("urgent")?(n.classList.toggle("urgent"),n.classList.toggle("complete"),e.target.classList.toggle("urgent")):n.classList.contains("medium")||e.target.classList.contains("medium")?(n.classList.toggle("medium"),n.classList.toggle("complete"),e.target.classList.toggle("medium")):(n.classList.contains("low")||e.target.classList.contains("low"))&&(n.classList.toggle("low"),n.classList.toggle("complete"),e.target.classList.toggle("low")))}))}static handleEdit(n,e){n.addEventListener("click",(t=>{t.target.classList.contains("edit")&&(n.style.display="none",e.style.display="flex")}))}static handleDelete(n){n.addEventListener("click",(e=>{e.target.classList.contains("delete")&&e.target.parentElement.parentElement.remove(),n.childNodes.length<2&&(n.style.display="none")}))}static handleSubmit(){document.querySelector(".mainPage");const n=document.querySelector(".submit"),e=document.querySelector(".titleInput"),t=document.querySelector(".descriptionInput"),a=document.querySelector(".dateInput"),i=document.querySelector(".priorityInput"),r=document.querySelector(".taskButton"),o=document.querySelector(".taskCreation"),s=document.querySelector(".list");n.addEventListener("click",(()=>{let n=new class{constructor(n,e,t,a){this.title=n,this.description=e,this.date=t,this.priority=a}}(e.value,t.value,a.value,i.value);if(""!==e.value&&""!==t.value&&""!==a.value&&"Priority"!==i.value){const e=document.createElement("tr");e.innerHTML=`   <td>${n.title}</td>\n                                    <td>${n.description}</td>\n                                    <td>${n.date}</td>\n                                    <td width='100'><img class='check' src='./Images/checkMark.png'>\n                                    <img class='edit' src='./Images/edit.png'>\n                                    <img class='delete' src='./Images/delete.png'></td>`,s.appendChild(e),"Urgent"===n.priority?e.classList.add("urgent"):"Medium"===n.priority?e.classList.add("medium"):e.classList.add("low"),s.style.display="table",o.style.display="none",r.style.display="flex",h.handleCheck(e),h.handleEdit(e,o),h.handleDelete(s)}}))}}const x=h;document.addEventListener("DOMContentLoaded",x.addTask)})()})();