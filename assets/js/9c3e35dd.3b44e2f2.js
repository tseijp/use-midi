"use strict";(self.webpackChunk_use_midi_docs=self.webpackChunk_use_midi_docs||[]).push([[545],{15469:function(t,n,e){e.r(n),e.d(n,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return m},toc:function(){return p},default:function(){return k}});var u=e(66017),a=e(20011),i=e(32735),r=e(29530),o=e(15200),c=["components"],l={sidebar_label:"Rma Example"},s="Rma Example",m={unversionedId:"rma",id:"rma",isDocsHomePage:!1,title:"Rma Example",description:"export default function () {",source:"@site/examples/rma.mdx",sourceDirName:".",slug:"/rma",permalink:"/use-midi/examples/rma",tags:[],version:"current",frontMatter:{sidebar_label:"Rma Example"},sidebar:"defaultSidebar",previous:{title:"Piano Example",permalink:"/use-midi/examples/piano"}},p=[],f={toc:p},d=function(){var t=i.useState([]),n=t[0],e=t[1],u=i.useState([0,0,0]),c=u[0],l=u[1],s=i.useState([["",[]],["",[]]]),m=s[0],p=s[1];return i.useEffect((function(){return(0,o.Rx)((function(){e((function(t){return[].concat(t,["rma update"])}));var t=[].concat(o.Rx.inputs.keys()),n=[].concat(o.Rx.outputs.keys());return p([[t[0],t],[n[0],n]]),(0,o.S6)(t,(function(t){return o.Rx.inputs.get(t).onmidimessage=function(t){e((function(n){return[].concat(n,["midimessage"+t.data])}))}})),!0}))}),[]),(0,r.kt)("div",null,i.useMemo((function(){return m.map((function(t,n){var e,u,a=t[0],i=t[1],c=(null==(e=o.Rx.inputs)?void 0:e.get(a))||(null==(u=o.Rx.outputs)?void 0:u.get(a))||{};return(0,r.kt)("ul",{key:n},(0,r.kt)("li",null,"name: ",c.name),(0,r.kt)("li",null,"type: ",c.type),(0,r.kt)("li",null,"state: ",c.state),(0,r.kt)("li",null,"connection: ",c.connection),(0,r.kt)("select",function(t){return void 0===t&&(t=0),{value:m[t][0],onChange:function(n){"not-selected"!==n.target.value&&p((function(e){return e.map((function(u,a){return a===t?[n.target.value,e[a][1]]:u}))}))}}}(n),(0,r.kt)("option",{value:"not-selected"},"Please select a input device"),i.map((function(t){return(0,r.kt)("option",{key:t,value:t},t.slice(0,50))}))))}))}),[m]),[0,1,2].map((function(t){return(0,r.kt)("input",(0,a.Z)({type:"number",min:"0",max:"255"},function(t){return void 0===t&&(t=0),{key:t,value:c[t],onChange:function(n){l((function(e){return e.map((function(e,u){return u===t?n.target.value:e}))}))}}}(t)))})),(0,r.kt)("button",{onClick:function(){var t;null==(t=o.Rx.outputs.get(m[1][0]))||t.send(c),e((function(t){return[].concat(t,["clicked"+c])}))}},"send data"),(0,r.kt)("h3",null,"Log: $",n.length),(0,r.kt)("ul",null,n.map((function(t,n){return(0,r.kt)("li",{key:n},t)}))))};function k(t){var n=t.components,e=(0,u.Z)(t,c);return(0,r.kt)(d,(0,a.Z)({},f,e,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"rma-example"},"Rma Example"))}k.isMDXComponent=!0}}]);