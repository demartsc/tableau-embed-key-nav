(this["webpackJsonptableau-embed-keynav"]=this["webpackJsonptableau-embed-keynav"]||[]).push([[0],{16:function(e,t,a){},17:function(e,t,a){},21:function(e,t,a){var n={"./keyboard-instructions.entry.js":[25,5]};function r(e){if(!a.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],r=t[0];return a.e(t[1]).then((function(){return a(r)}))}r.keys=function(){return Object.keys(n)},r.id=21,e.exports=r},22:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(10),c=a.n(i),s=(a(16),a(2)),o=a(4),u=(a.p,a(17),a(1)),l=function(e){var t=Object(n.useRef)(null);return Object(n.useEffect)((function(){t.current&&(t.current.isInteractive=e.isInteractive,t.current.hasCousinNavigation=e.hasCousinNavigation,t.current.disabled=e.disabled)}),[]),Object(u.jsx)("keyboard-instructions",{uniqueID:"thisIsATest",geomType:"bar",groupName:"bar group",chartTag:"bar-chart",width:800,ref:t})},b=a(3),d=a(27),h=function(e,t){var a={},n="";for(n in t){var r=t[n];a[n]="%null%"===e[r].value?null:e[r].value}return a},f=function(){var e=Object(n.useState)("https://public.tableau.com/views/CoinFlipGame-a11yversion/KeyboardNavTest?:language=en-US&:display_count=n&:origin=viz_share_link&:tabs=n"),t=Object(o.a)(e,2),a=(t[0],t[1],Object(n.useState)()),r=Object(o.a)(a,2),i=(r[0],r[1]),c=Object(n.useState)(),f=Object(o.a)(c,2),g=(f[0],f[1]),m=Object(n.useRef)(),v=Object(n.useRef)(),j=Object(n.useState)(!0),y=Object(o.a)(j,2),p=y[0],O=y[1],T="Heads and Tails by Game";Object(n.useEffect)((function(){A(),N()}),[]);var A=function(){var e="bar-chart",t={ordinalAccessor:"Game",groupAccessor:"Game",valueAccessor:"SUM(Number of Records)",tooltipLabel:{labelAccessor:["Game","Player","SUM(Number of Records)","SUM(Heads)","SUM(Tails)"],labelTitle:["Game","Player","Coin Flips","Heads","Tails"]},dataLabel:{labelAccessor:"SUM(Number of Records)"}},a=v.current.parentNode.parentNode.parentNode;Object(b.initializeDescriptionRoot)({rootEle:a,geomType:"bar",title:T,chartTag:e,uniqueID:"thisIsATest",highestHeadingLevel:"h5",redraw:p,disableKeyNav:!1}),O(!1),Object(b.setAccessibilityController)({node:v.current,chartTag:e,title:T,description:"Shows two diverging bar charts for Dad and Daughter, by game, depicting the number of heads and tails flipped by each player.",uniqueID:"thisIsATest",geomType:"bar",includeKeyNames:!0,dataKeys:Object(b.scopeDataKeys)(t,b.chartAccessors,e),groupAccessor:t.groupAccessor,disableKeyNav:!1})},N=function(){var e={hideTabs:!0,width:1e3,height:827,onFirstInteractive:function(){var e=t.getWorkbook().getActiveSheet().getWorksheets(),a=[],n={ignoreAliases:!1,ignoreSelection:!1,maxRows:0};e.map((function(e){g(e),e.getSummaryDataAsync(n).then((function(t){for(var n=[],r={},i=[],c=0;c<t.getColumns().length;c++)r[t.getColumns()[c].getFieldName()]=c,n.push(t.getColumns()[c].getFieldName());for(var s=0,o=t.getData().length;s<o;s++)i.push(h(t.getData()[s],r));i.sort((function(e,t){return e.Player===t.Player?+e.Game-+t.Game:e.Player-t.Player})),a.push(i),S(i,e)}))}))}},t=new window.tableau.Viz(m.current,"https://public.tableau.com/views/CoinFlipGame-a11yversion/KeyboardNavTest?:language=en-US&:display_count=n&:origin=viz_share_link&:tabs=n",e);i(t)},S=function(e,t){var a=Object(d.a)(v.current).append("g").attr("class","bar-group"),n=e.map((function(e){var t;return t={Game:e.Game,Player:e.Player},Object(s.a)(t,"SUM(Heads)",e["SUM(Heads)"]),Object(s.a)(t,"SUM(Number of Records)",e["SUM(Number of Records)"]),Object(s.a)(t,"SUM(Tails)",e["SUM(Tails)"]),Object(s.a)(t,"ATTR(Game Level Aria ID)",e["ATTR(Game Level Aria ID)"]),t})),r=n.filter((function(e,t){var a=JSON.stringify(e);return t===n.findIndex((function(e){return JSON.stringify(e)===a}))})),i=a.selectAll(".bar").data(r,(function(e){return"".concat(e.Game,"-").concat(e.Player)})),c=i.enter().append("rect"),o=i.exit();i.merge(c);c.attr("class","bar").attr("data-id",(function(e){return"".concat(e.Game,"-").concat(e.Player)})).attr("height",.01).attr("width",.01).attr("x",(function(e,t){return 0})).attr("y",(function(e,t){return 0})).attr("fill","grey").on("mouseover",(function(e,a){return function(e,t,a){Object(d.a)(e.target).attr("fill","red"),a.selectMarksAsync("ATTR(Game Level Aria ID)",t["ATTR(Game Level Aria ID)"],window.tableau.SelectionUpdateType.REPLACE)}(e,a,t)})).on("mouseout",(function(e,a){return function(e,t,a){Object(d.a)(e.target).attr("fill","grey"),a.clearSelectedMarksAsync()}(e,0,t)})).each((function(e,t,n){var r;Object(b.initializeElementAccess)(n[t]),0===t&&(Object(b.initializeElementAccess)(a.node()),a.each((function(e,t,a){Object(b.setElementAccessID)({node:a[t],uniqueID:"thisIsATest"})}))),Object(b.setElementFocusHandler)({node:n[t],geomType:"bar",includeKeyNames:!0,dataKeys:(r={},Object(s.a)(r,"Game",""),Object(s.a)(r,"Player",""),Object(s.a)(r,"SUM(Heads)","0.[0][0]a"),Object(s.a)(r,"SUM(Tails)","0.[0][0]a"),r),uniqueID:"thisIsATest",disableKeyNav:!1}),Object(b.setElementAccessID)({node:n[t],uniqueID:"thisIsATest"})})),o.remove()};return Object(u.jsxs)("div",{className:"tableau-keyboard-navigation",children:[Object(u.jsx)("div",{className:"o-layout",children:Object(u.jsxs)("div",{className:"o-layout--chart",children:[Object(u.jsx)(l,{uniqueID:"thisIsATest",geomType:"bar",groupName:"bar group",chartTag:"bar-chart",width:800,isInteractive:!0,hasCousinNavigation:!0,disabled:!1}),Object(u.jsx)("div",{class:"shadow-d3-viz-conatiner",children:Object(u.jsx)("svg",{ref:v,height:1,width:1})})]})}),Object(u.jsx)("div",{ref:m})]})},g=function(e){e&&e instanceof Function&&a.e(7).then(a.bind(null,28)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;a(e),n(e),r(e),i(e),c(e)}))},m=a(9);c.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(f,{})}),document.getElementById("root")),g(),Object(m.a)().then((function(){Object(m.b)()}))}},[[22,1,3]]]);
//# sourceMappingURL=main.88ea3837.chunk.js.map