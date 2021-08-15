(self.webpackChunk_use_midi_docs=self.webpackChunk_use_midi_docs||[]).push([[597],{48168:function(t,n,i){"use strict";i.r(n),i.d(n,{frontMatter:function(){return p},contentTitle:function(){return _},metadata:function(){return j},toc:function(){return u},default:function(){return l}});var r=i(7560),e=i(98283),s=(i(2784),i(30876)),a=i(25412),o=i(49890),c=["components"],p={sidebar_label:"useNote"},_=void 0,j={unversionedId:"react/useNote",id:"react/useNote",isDocsHomePage:!1,title:"useNote",description:"{`function App () {",source:"@site/examples/react/useNote.mdx",sourceDirName:"react",slug:"/react/useNote",permalink:"/use-midi/examples/react/useNote",version:"current",frontMatter:{sidebar_label:"useNote"},sidebar:"defaultSidebar",previous:{title:"useMidi",permalink:"/use-midi/examples/react/useMidi"},next:{title:"Korg Controller",permalink:"/use-midi/examples/korg"}},u=[],S={toc:u};function l(t){var n=t.components,i=(0,e.Z)(t,c);return(0,s.kt)("wrapper",(0,r.Z)({},S,i,{components:n,mdxType:"MDXLayout"}),(0,s.kt)(o.v,{useNote:a.iX,mdxType:"Live"},"function App () {\n  const bind = useNote(state => {})\n  return null\n}"))}l.isMDXComponent=!0},49890:function(t,n,i){"use strict";i.d(n,{v:function(){return d}});var r,e,s,a,o,c=i(73182),p=i(98283),_=i(2784),j=i(27591),u=i(70676),S=i.n(u),l=i(52275),h=i(29510),y=["children","noInline","scope"],f='-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';function d(t){var n=t.children,i=t.noInline,r=t.scope,e=(0,p.Z)(t,y),s=_.useMemo((function(){return _.Children.toArray(n).find(Boolean).toString().trim()}),[n]);return _.createElement(d.Provider,{code:s,noInline:i,scope:Object.assign({},r,e)},_.createElement(d.Container,null,_.createElement(d.Editor,null),_.createElement(d.Error,null)),_.createElement(d.Preview,null))}d.Provider=(0,l.ZP)(h.nu).attrs({theme:j.Z})(r||(r=(0,c.Z)(["\n  max-width: 100%;\n  margin: 0 auto;\n  box-sizing: border-box;\n  font-family: ",";\n  transition: transform 150ms ease-out;\n  border-radius: ",";\n  transform: translateX(",");\n  display: flex;\n"])),f,S()(10),(function(t){return t.moveRight?S()(300):0})),d.Error=(0,l.ZP)(h.IF)(e||(e=(0,c.Z)(["\n  display: block;\n  width: 100%;\n  padding: ",";\n  background: ",";\n  color: white;\n  font-size: 0.8rem;\n  font-family: ",";\n  white-space: pre;\n"])),S()(8),"#ff5555",'"Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'),d.Editor=(0,l.ZP)(h.uz)(s||(s=(0,c.Z)(["\n  font-size: 0.8rem;\n  font-family: ",";\n  font-weight: 300;\n  overflow-y: auto !important;\n  overflow-x: hidden;\n  white-space: pre-wrap;\n  position: relative;\n  border-radius: ",";\n  white-space: pre;\n  cursor: text;\n  width: 100%;\n"])),"dm, monospace",S()(10)),d.Container=l.ZP.div(a||(a=(0,c.Z)(["\n  width: 100%;\n  text-align: left;\n  display: inline-block;\n  margin: "," 0;\n  border-radius: ",";\n"])),S()(35),S()(10)),d.Preview=(0,l.ZP)(h.i5)(o||(o=(0,c.Z)(["\n  border-radius: ",";\n  width: 100%;\n  height: 600px;\n"])),S()(10))},25412:function(t,n,i){"use strict";i.d(n,{nH:function(){return K},Rx:function(){return l},Ur:function(){return H},iX:function(){return D}});var r=function(t,n){return t.forEach(n)};var e=function t(n,i){for(var r=arguments.length,e=new Array(r>2?r-2:0),s=2;s<r;s++)e[s-2]=arguments[s];if(e.length>0)return t(n,i)&&t.apply(void 0,[i].concat(e));if(typeof n!=typeof i)return!1;if(t.str(n)||t.num(n))return n===i;for(var a in n)if(!(a in i))return!1;for(var o in i)if(n[o]!==i[o])return!1;return!0};e.arr=Array.isArray,e.fls=function(t){return e.und(t)||e.nul(t)||!1===t||""===t},e.nul=function(t){return null===t},e.und=function(t){return void 0===t},e.num=function(t){return"number"==typeof t},e.str=function(t){return"string"==typeof t},e.bol=function(t){return!0===t||!1===t},e.fun=function(t){return"function"==typeof t},e.obj=function(t){return!!t&&"Object"===t.constructor.name};var s,a=-1,o=!1,c=d(),p=d(),_=d(),j=d(),u=d(),S="undefined"!=typeof navigator&&"function"==typeof navigator.requestMIDIAccess?function(){return navigator.requestMIDIAccess({sysex:true,software:true})}:function(){},l=function(t){return f(t,c)};function h(t){~a&&(t.onstatechange=h,s=t.target||t,l.fun(y))}function y(){var t=a;a=l.now(),_.flush(),c.flush(t),j.flush(),p.flush(),u.flush()}function f(t,n){o?(n.delete(t),t(0)):(n.add(t),a<0&&(a=0,"demand"!==l.status&&S().then(h,l.catch)))}function d(){var t=new Set,n=t;return{add:function(n){return t.add(n)},delete:function(n){return t.delete(n)},flush:function(i){n.size&&(t=new Set,n.forEach((function(n){return n(i)&&t.add(n)})),n=t)}}}function g(t,n){Object.defineProperty(l,t,{get:function(){return n()}})}l.write=function(t){return f(t,p)},l.onStart=function(t){return f(t,_)},l.onAccess=function(t){return f(t,j)},l.onFinish=function(t){return f(t,u)},l.cancel=function(t){c.delete(t),p.delete(t)},l.sync=function(t){o=!0,l.fun(t),o=!1},l.throttle=function(t){t()},l.use=function(t){return S=t},l.now="undefined"!=typeof performance?function(){return performance.now()}:Date.now,l.fun=function(t){return t()},l.catch=console.error,l.status="always",g("access",(function(){return s})),g("inputs",(function(){var t;return null==(t=s)?void 0:t.inputs})),g("outputs",(function(){var t;return null==(t=s)?void 0:t.outputs})),l.advance=function(){"demand"!==l.status?console.warn("Cannot call the manual advancement of rmaz"):y()};"undefined"!=typeof window&&window.document&&window.document.createElement;var E=function(){function t(t){this._listeners=[],this._controller=t}var n=t.prototype;return n.add=function(t,n){l(n),this._listeners.push((function(){return l.cancel(n)}))},n.clean=function(){this._listeners.forEach((function(t){return t()})),this._listeners=[]},t}(),x=function(){function t(t){this._timeouts=new Map,this._controller=t}var n=t.prototype;return n.add=function(t,n,i){var r;void 0===i&&(i=140),this.remove(t);for(var e=arguments.length,s=new Array(e>3?e-3:0),a=3;a<e;a++)s[a-3]=arguments[a];this._timeouts.set(t,(r=window).setTimeout.apply(r,[n,i].concat(s)))},n.remove=function(t){var n=this._timeouts.get(t);n&&window.clearTimeout(n)},n.clean=function(){this._timeouts.forEach((function(t){window.clearTimeout(t)})),this._timeouts.clear()},t}(),m=i(98283),P=i(2784),C=i(43758),v=i(5491),B=i(4730),b=function(t){function n(){for(var n,i=arguments.length,r=new Array(i),e=0;e<i;e++)r[e]=arguments[e];return(n=t.call.apply(t,[this].concat(r))||this).aliasKey="xy",n}(0,v.Z)(n,t);var i=n.prototype;return i.reset=function(){t.prototype.reset.call(this),this.state.axis=void 0},i.init=function(){this.state.offset=[0,0],this.state.lastOffset=[0,0]},i.intent=function(t){this.state;this.state.axis=this.state.axis||selectAxis(t),this.state._blocked},n}(function(){function t(t,n,i){this._ctrl=t,this._args=n,this._key=i,this.state||(this.state={values:[0,0],initial:[0,0]}),this.init&&this.init(),this.reset&&this.reset()}var n=t.prototype;return n.init=function(){this.reset()},n.reset=function(){this.state,this.shared,this.config,this._args},n.start=function(t){this.state,this.config},n.emit=function(){this.state,this.shard,this.config},n.clean=function(){this.eventStore.clean(),this.timeoutStore.clean()},n.change=function(){},n.input=function(t){},n.output=function(){},(0,B.Z)(t,[{key:"state",get:function(){return this._ctrl.state[this._key]},set:function(t){this._ctrl.state[this._key]=t}},{key:"shared",get:function(){return this._ctrl.state.shared}},{key:"eventStore",get:function(){return this._ctrl.eventStores[this._key]}},{key:"timeoutStore",get:function(){return this._ctrl.timeoutStores[this._key]}},{key:"engine",get:function(){return this._ctrl.engines[this._key]}},{key:"config",get:function(){return this._ctrl.config}}]),t}()),k=function(t){function n(){for(var n,i=arguments.length,r=new Array(i),e=0;e<i;e++)r[e]=arguments[e];return(n=t.call.apply(t,[this].concat(r))||this).ingKey="input",n}(0,v.Z)(n,t);var i=n.prototype;return i.reset=function(){t.prototype.reset.call(this);this.state},i.setup=function(){},i.cancel=function(){},i.clean=function(){t.prototype.clean.call(this)},i.bind=function(t){this.config.device},n}(b),w=function(t){function n(){for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return t.call.apply(t,[this].concat(i))||this}return(0,v.Z)(n,t),n}(b),M=new Map,G=new Map,A={button:{engine:k,config:{}},fader:{engine:w,config:{}},note:{engine:w,config:{}}};function T(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];r(n,(function(t){M.set(t,A[t].engine),G.set(t,A[t].config)}))}var O=["enabled"],I=function(){function t(t){this.keys=new Set,this._updateStore=new E(this),this._timeoutStore=new x(this),this.eventStores={},this.timeoutStores={},this.engines={},this.nativeProps={},this.props={},this.config={},this.state={shared:{}},this.props=t}var n=t.prototype;return n.clean=function(){for(var t,n=(0,C.Z)(this.keys);!(t=n()).done;){var i=t.value;this.eventStores[i].clean(),this.timeoutStores[i].clean()}},n.effect=function(){var t=this;return this.config.shared.target&&this.bind(),function(){return t._updateStore.clean(),void t._timeoutStore.clean()}},n.bind=function(){},n.applyProps=function(t,n){this.props=t,this.nativeProps=n},n.applyConfig=function(t,n){var i=t.enabled,r=(0,m.Z)(t,O),e={shared:{enabled:i}};if(n){var s=G.get(n);e[n]=Object.assign({},s,r)}else!function(t,n,i){for(var r in t)n.call(i,t[r],r)}(r,(function(t,n){var i=G.get(n);i&&(e[n]=Object.assign({},t,i))}));this.config=e},t}(),L=["children","config"];function N(t,n,i,r){void 0===n&&(n={});var e=P.useMemo((function(){return new I(t)}),[]);if(e.applyProps(t,r),e.applyConfig(n,i),P.useEffect(e.effect.bind(e)),P.useEffect((function(){return e.clean.bind(e)}),[]),void 0===n.target)return e.bind.bind(e)}function D(t,n){return void 0===n&&(n={}),T("note"),N({onNote:t},n,"note")}function H(t,n){return void 0===n&&(n={}),T("button","fader","note"),N(t,n)}function K(t){var n=t.children,i=t.config;return n(H((0,m.Z)(t,L),i))}},18996:function(t,n,i){var r={"./Binary_Property/ASCII.js":89119,"./Binary_Property/ASCII_Hex_Digit.js":42023,"./Binary_Property/Alphabetic.js":82858,"./Binary_Property/Any.js":8635,"./Binary_Property/Assigned.js":20323,"./Binary_Property/Bidi_Control.js":66798,"./Binary_Property/Bidi_Mirrored.js":74902,"./Binary_Property/Case_Ignorable.js":92336,"./Binary_Property/Cased.js":61596,"./Binary_Property/Changes_When_Casefolded.js":95188,"./Binary_Property/Changes_When_Casemapped.js":34776,"./Binary_Property/Changes_When_Lowercased.js":66929,"./Binary_Property/Changes_When_NFKC_Casefolded.js":70933,"./Binary_Property/Changes_When_Titlecased.js":30073,"./Binary_Property/Changes_When_Uppercased.js":49069,"./Binary_Property/Dash.js":48225,"./Binary_Property/Default_Ignorable_Code_Point.js":89600,"./Binary_Property/Deprecated.js":88710,"./Binary_Property/Diacritic.js":29894,"./Binary_Property/Emoji.js":40027,"./Binary_Property/Emoji_Component.js":97870,"./Binary_Property/Emoji_Modifier.js":8145,"./Binary_Property/Emoji_Modifier_Base.js":77783,"./Binary_Property/Emoji_Presentation.js":86598,"./Binary_Property/Extended_Pictographic.js":61930,"./Binary_Property/Extender.js":43373,"./Binary_Property/Grapheme_Base.js":14718,"./Binary_Property/Grapheme_Extend.js":71834,"./Binary_Property/Hex_Digit.js":66333,"./Binary_Property/IDS_Binary_Operator.js":26287,"./Binary_Property/IDS_Trinary_Operator.js":66269,"./Binary_Property/ID_Continue.js":462,"./Binary_Property/ID_Start.js":29876,"./Binary_Property/Ideographic.js":53259,"./Binary_Property/Join_Control.js":98270,"./Binary_Property/Logical_Order_Exception.js":85991,"./Binary_Property/Lowercase.js":19890,"./Binary_Property/Math.js":9936,"./Binary_Property/Noncharacter_Code_Point.js":36088,"./Binary_Property/Pattern_Syntax.js":5729,"./Binary_Property/Pattern_White_Space.js":57615,"./Binary_Property/Quotation_Mark.js":38616,"./Binary_Property/Radical.js":21873,"./Binary_Property/Regional_Indicator.js":46138,"./Binary_Property/Sentence_Terminal.js":87128,"./Binary_Property/Soft_Dotted.js":97552,"./Binary_Property/Terminal_Punctuation.js":70247,"./Binary_Property/Unified_Ideograph.js":47561,"./Binary_Property/Uppercase.js":54773,"./Binary_Property/Variation_Selector.js":52984,"./Binary_Property/White_Space.js":19562,"./Binary_Property/XID_Continue.js":20383,"./Binary_Property/XID_Start.js":38650,"./General_Category/Cased_Letter.js":30782,"./General_Category/Close_Punctuation.js":62067,"./General_Category/Connector_Punctuation.js":38563,"./General_Category/Control.js":41299,"./General_Category/Currency_Symbol.js":58153,"./General_Category/Dash_Punctuation.js":91942,"./General_Category/Decimal_Number.js":68286,"./General_Category/Enclosing_Mark.js":92026,"./General_Category/Final_Punctuation.js":83763,"./General_Category/Format.js":90085,"./General_Category/Initial_Punctuation.js":50592,"./General_Category/Letter.js":26994,"./General_Category/Letter_Number.js":59411,"./General_Category/Line_Separator.js":18826,"./General_Category/Lowercase_Letter.js":12910,"./General_Category/Mark.js":49160,"./General_Category/Math_Symbol.js":42838,"./General_Category/Modifier_Letter.js":3900,"./General_Category/Modifier_Symbol.js":57597,"./General_Category/Nonspacing_Mark.js":97810,"./General_Category/Number.js":81384,"./General_Category/Open_Punctuation.js":24424,"./General_Category/Other.js":14542,"./General_Category/Other_Letter.js":75953,"./General_Category/Other_Number.js":58498,"./General_Category/Other_Punctuation.js":17414,"./General_Category/Other_Symbol.js":1766,"./General_Category/Paragraph_Separator.js":16797,"./General_Category/Private_Use.js":40477,"./General_Category/Punctuation.js":38691,"./General_Category/Separator.js":16440,"./General_Category/Space_Separator.js":37101,"./General_Category/Spacing_Mark.js":42449,"./General_Category/Surrogate.js":86770,"./General_Category/Symbol.js":95559,"./General_Category/Titlecase_Letter.js":19810,"./General_Category/Unassigned.js":50556,"./General_Category/Uppercase_Letter.js":7397,"./Script/Adlam.js":42805,"./Script/Ahom.js":68753,"./Script/Anatolian_Hieroglyphs.js":69181,"./Script/Arabic.js":48497,"./Script/Armenian.js":23170,"./Script/Avestan.js":69813,"./Script/Balinese.js":98612,"./Script/Bamum.js":3719,"./Script/Bassa_Vah.js":86736,"./Script/Batak.js":63185,"./Script/Bengali.js":37485,"./Script/Bhaiksuki.js":74405,"./Script/Bopomofo.js":92301,"./Script/Brahmi.js":2157,"./Script/Braille.js":86625,"./Script/Buginese.js":80323,"./Script/Buhid.js":97086,"./Script/Canadian_Aboriginal.js":25151,"./Script/Carian.js":74943,"./Script/Caucasian_Albanian.js":55821,"./Script/Chakma.js":86312,"./Script/Cham.js":79485,"./Script/Cherokee.js":75974,"./Script/Chorasmian.js":13110,"./Script/Common.js":1091,"./Script/Coptic.js":13985,"./Script/Cuneiform.js":15404,"./Script/Cypriot.js":49251,"./Script/Cyrillic.js":37005,"./Script/Deseret.js":62405,"./Script/Devanagari.js":80727,"./Script/Dives_Akuru.js":72809,"./Script/Dogra.js":97659,"./Script/Duployan.js":51369,"./Script/Egyptian_Hieroglyphs.js":49389,"./Script/Elbasan.js":52504,"./Script/Elymaic.js":69058,"./Script/Ethiopic.js":43500,"./Script/Georgian.js":52440,"./Script/Glagolitic.js":65002,"./Script/Gothic.js":66691,"./Script/Grantha.js":48226,"./Script/Greek.js":43786,"./Script/Gujarati.js":5375,"./Script/Gunjala_Gondi.js":4761,"./Script/Gurmukhi.js":64696,"./Script/Han.js":87041,"./Script/Hangul.js":97950,"./Script/Hanifi_Rohingya.js":91244,"./Script/Hanunoo.js":52535,"./Script/Hatran.js":29811,"./Script/Hebrew.js":68318,"./Script/Hiragana.js":99750,"./Script/Imperial_Aramaic.js":34082,"./Script/Inherited.js":81167,"./Script/Inscriptional_Pahlavi.js":94791,"./Script/Inscriptional_Parthian.js":88238,"./Script/Javanese.js":4745,"./Script/Kaithi.js":93192,"./Script/Kannada.js":49582,"./Script/Katakana.js":71891,"./Script/Kayah_Li.js":39196,"./Script/Kharoshthi.js":38741,"./Script/Khitan_Small_Script.js":19174,"./Script/Khmer.js":88919,"./Script/Khojki.js":42760,"./Script/Khudawadi.js":22828,"./Script/Lao.js":82469,"./Script/Latin.js":45317,"./Script/Lepcha.js":65326,"./Script/Limbu.js":34247,"./Script/Linear_A.js":39996,"./Script/Linear_B.js":39147,"./Script/Lisu.js":52998,"./Script/Lycian.js":46338,"./Script/Lydian.js":26397,"./Script/Mahajani.js":96349,"./Script/Makasar.js":96653,"./Script/Malayalam.js":96273,"./Script/Mandaic.js":60895,"./Script/Manichaean.js":72481,"./Script/Marchen.js":83237,"./Script/Masaram_Gondi.js":58362,"./Script/Medefaidrin.js":16887,"./Script/Meetei_Mayek.js":68892,"./Script/Mende_Kikakui.js":94898,"./Script/Meroitic_Cursive.js":22798,"./Script/Meroitic_Hieroglyphs.js":64887,"./Script/Miao.js":59149,"./Script/Modi.js":68022,"./Script/Mongolian.js":33053,"./Script/Mro.js":75667,"./Script/Multani.js":60251,"./Script/Myanmar.js":68014,"./Script/Nabataean.js":47396,"./Script/Nandinagari.js":7079,"./Script/New_Tai_Lue.js":13654,"./Script/Newa.js":81554,"./Script/Nko.js":69721,"./Script/Nushu.js":77369,"./Script/Nyiakeng_Puachue_Hmong.js":10837,"./Script/Ogham.js":17610,"./Script/Ol_Chiki.js":30049,"./Script/Old_Hungarian.js":57640,"./Script/Old_Italic.js":34226,"./Script/Old_North_Arabian.js":74777,"./Script/Old_Permic.js":78552,"./Script/Old_Persian.js":47410,"./Script/Old_Sogdian.js":76468,"./Script/Old_South_Arabian.js":60032,"./Script/Old_Turkic.js":24570,"./Script/Oriya.js":80175,"./Script/Osage.js":44965,"./Script/Osmanya.js":16121,"./Script/Pahawh_Hmong.js":32737,"./Script/Palmyrene.js":22869,"./Script/Pau_Cin_Hau.js":6630,"./Script/Phags_Pa.js":725,"./Script/Phoenician.js":25726,"./Script/Psalter_Pahlavi.js":76166,"./Script/Rejang.js":41440,"./Script/Runic.js":99922,"./Script/Samaritan.js":23844,"./Script/Saurashtra.js":61626,"./Script/Sharada.js":4785,"./Script/Shavian.js":44236,"./Script/Siddham.js":83180,"./Script/SignWriting.js":38564,"./Script/Sinhala.js":17637,"./Script/Sogdian.js":77250,"./Script/Sora_Sompeng.js":30021,"./Script/Soyombo.js":97257,"./Script/Sundanese.js":44098,"./Script/Syloti_Nagri.js":73713,"./Script/Syriac.js":31430,"./Script/Tagalog.js":76700,"./Script/Tagbanwa.js":33450,"./Script/Tai_Le.js":49157,"./Script/Tai_Tham.js":98524,"./Script/Tai_Viet.js":29264,"./Script/Takri.js":75095,"./Script/Tamil.js":18287,"./Script/Tangut.js":54686,"./Script/Telugu.js":73947,"./Script/Thaana.js":25695,"./Script/Thai.js":59664,"./Script/Tibetan.js":93631,"./Script/Tifinagh.js":72307,"./Script/Tirhuta.js":75199,"./Script/Ugaritic.js":67505,"./Script/Vai.js":84557,"./Script/Wancho.js":65527,"./Script/Warang_Citi.js":25486,"./Script/Yezidi.js":2361,"./Script/Yi.js":52735,"./Script/Zanabazar_Square.js":699,"./Script_Extensions/Adlam.js":11873,"./Script_Extensions/Ahom.js":94421,"./Script_Extensions/Anatolian_Hieroglyphs.js":5629,"./Script_Extensions/Arabic.js":94435,"./Script_Extensions/Armenian.js":44578,"./Script_Extensions/Avestan.js":92446,"./Script_Extensions/Balinese.js":52653,"./Script_Extensions/Bamum.js":33422,"./Script_Extensions/Bassa_Vah.js":86923,"./Script_Extensions/Batak.js":84551,"./Script_Extensions/Bengali.js":81402,"./Script_Extensions/Bhaiksuki.js":42639,"./Script_Extensions/Bopomofo.js":9622,"./Script_Extensions/Brahmi.js":46369,"./Script_Extensions/Braille.js":53602,"./Script_Extensions/Buginese.js":18990,"./Script_Extensions/Buhid.js":16403,"./Script_Extensions/Canadian_Aboriginal.js":50148,"./Script_Extensions/Carian.js":12903,"./Script_Extensions/Caucasian_Albanian.js":79984,"./Script_Extensions/Chakma.js":652,"./Script_Extensions/Cham.js":36564,"./Script_Extensions/Cherokee.js":71791,"./Script_Extensions/Chorasmian.js":19897,"./Script_Extensions/Common.js":56597,"./Script_Extensions/Coptic.js":75284,"./Script_Extensions/Cuneiform.js":76226,"./Script_Extensions/Cypriot.js":70543,"./Script_Extensions/Cyrillic.js":45907,"./Script_Extensions/Deseret.js":95103,"./Script_Extensions/Devanagari.js":883,"./Script_Extensions/Dives_Akuru.js":6606,"./Script_Extensions/Dogra.js":85130,"./Script_Extensions/Duployan.js":16419,"./Script_Extensions/Egyptian_Hieroglyphs.js":96457,"./Script_Extensions/Elbasan.js":97557,"./Script_Extensions/Elymaic.js":57304,"./Script_Extensions/Ethiopic.js":50802,"./Script_Extensions/Georgian.js":20722,"./Script_Extensions/Glagolitic.js":12888,"./Script_Extensions/Gothic.js":42272,"./Script_Extensions/Grantha.js":94103,"./Script_Extensions/Greek.js":35315,"./Script_Extensions/Gujarati.js":30552,"./Script_Extensions/Gunjala_Gondi.js":43054,"./Script_Extensions/Gurmukhi.js":39537,"./Script_Extensions/Han.js":46219,"./Script_Extensions/Hangul.js":83441,"./Script_Extensions/Hanifi_Rohingya.js":23052,"./Script_Extensions/Hanunoo.js":49201,"./Script_Extensions/Hatran.js":33067,"./Script_Extensions/Hebrew.js":2179,"./Script_Extensions/Hiragana.js":32723,"./Script_Extensions/Imperial_Aramaic.js":2766,"./Script_Extensions/Inherited.js":69742,"./Script_Extensions/Inscriptional_Pahlavi.js":72502,"./Script_Extensions/Inscriptional_Parthian.js":67669,"./Script_Extensions/Javanese.js":68378,"./Script_Extensions/Kaithi.js":54777,"./Script_Extensions/Kannada.js":17276,"./Script_Extensions/Katakana.js":22123,"./Script_Extensions/Kayah_Li.js":45866,"./Script_Extensions/Kharoshthi.js":46299,"./Script_Extensions/Khitan_Small_Script.js":51700,"./Script_Extensions/Khmer.js":12523,"./Script_Extensions/Khojki.js":62704,"./Script_Extensions/Khudawadi.js":1413,"./Script_Extensions/Lao.js":2114,"./Script_Extensions/Latin.js":37727,"./Script_Extensions/Lepcha.js":59237,"./Script_Extensions/Limbu.js":90043,"./Script_Extensions/Linear_A.js":57333,"./Script_Extensions/Linear_B.js":87381,"./Script_Extensions/Lisu.js":54124,"./Script_Extensions/Lycian.js":70467,"./Script_Extensions/Lydian.js":40762,"./Script_Extensions/Mahajani.js":88717,"./Script_Extensions/Makasar.js":15892,"./Script_Extensions/Malayalam.js":48589,"./Script_Extensions/Mandaic.js":30080,"./Script_Extensions/Manichaean.js":70738,"./Script_Extensions/Marchen.js":18893,"./Script_Extensions/Masaram_Gondi.js":7005,"./Script_Extensions/Medefaidrin.js":54460,"./Script_Extensions/Meetei_Mayek.js":73906,"./Script_Extensions/Mende_Kikakui.js":10761,"./Script_Extensions/Meroitic_Cursive.js":51211,"./Script_Extensions/Meroitic_Hieroglyphs.js":1053,"./Script_Extensions/Miao.js":9986,"./Script_Extensions/Modi.js":44310,"./Script_Extensions/Mongolian.js":25220,"./Script_Extensions/Mro.js":35209,"./Script_Extensions/Multani.js":49866,"./Script_Extensions/Myanmar.js":99886,"./Script_Extensions/Nabataean.js":46362,"./Script_Extensions/Nandinagari.js":39296,"./Script_Extensions/New_Tai_Lue.js":59482,"./Script_Extensions/Newa.js":86502,"./Script_Extensions/Nko.js":67938,"./Script_Extensions/Nushu.js":70875,"./Script_Extensions/Nyiakeng_Puachue_Hmong.js":93801,"./Script_Extensions/Ogham.js":12701,"./Script_Extensions/Ol_Chiki.js":23281,"./Script_Extensions/Old_Hungarian.js":16841,"./Script_Extensions/Old_Italic.js":25289,"./Script_Extensions/Old_North_Arabian.js":90670,"./Script_Extensions/Old_Permic.js":5006,"./Script_Extensions/Old_Persian.js":48015,"./Script_Extensions/Old_Sogdian.js":84883,"./Script_Extensions/Old_South_Arabian.js":29615,"./Script_Extensions/Old_Turkic.js":7121,"./Script_Extensions/Oriya.js":34316,"./Script_Extensions/Osage.js":63662,"./Script_Extensions/Osmanya.js":97901,"./Script_Extensions/Pahawh_Hmong.js":99101,"./Script_Extensions/Palmyrene.js":31274,"./Script_Extensions/Pau_Cin_Hau.js":39901,"./Script_Extensions/Phags_Pa.js":14631,"./Script_Extensions/Phoenician.js":37765,"./Script_Extensions/Psalter_Pahlavi.js":47666,"./Script_Extensions/Rejang.js":98024,"./Script_Extensions/Runic.js":43084,"./Script_Extensions/Samaritan.js":23563,"./Script_Extensions/Saurashtra.js":49968,"./Script_Extensions/Sharada.js":36111,"./Script_Extensions/Shavian.js":90464,"./Script_Extensions/Siddham.js":1490,"./Script_Extensions/SignWriting.js":6840,"./Script_Extensions/Sinhala.js":74717,"./Script_Extensions/Sogdian.js":48007,"./Script_Extensions/Sora_Sompeng.js":86049,"./Script_Extensions/Soyombo.js":50429,"./Script_Extensions/Sundanese.js":70513,"./Script_Extensions/Syloti_Nagri.js":41416,"./Script_Extensions/Syriac.js":87450,"./Script_Extensions/Tagalog.js":23735,"./Script_Extensions/Tagbanwa.js":25302,"./Script_Extensions/Tai_Le.js":52458,"./Script_Extensions/Tai_Tham.js":98204,"./Script_Extensions/Tai_Viet.js":79369,"./Script_Extensions/Takri.js":61070,"./Script_Extensions/Tamil.js":9394,"./Script_Extensions/Tangut.js":5606,"./Script_Extensions/Telugu.js":36160,"./Script_Extensions/Thaana.js":42280,"./Script_Extensions/Thai.js":56582,"./Script_Extensions/Tibetan.js":39570,"./Script_Extensions/Tifinagh.js":50274,"./Script_Extensions/Tirhuta.js":99212,"./Script_Extensions/Ugaritic.js":53431,"./Script_Extensions/Vai.js":94396,"./Script_Extensions/Wancho.js":97517,"./Script_Extensions/Warang_Citi.js":24668,"./Script_Extensions/Yezidi.js":90423,"./Script_Extensions/Yi.js":36023,"./Script_Extensions/Zanabazar_Square.js":31037,"./index.js":39777,"./unicode-version.js":24414};function e(t){var n=s(t);return i(n)}function s(t){if(!i.o(r,t)){var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}return r[t]}e.keys=function(){return Object.keys(r)},e.resolve=s,t.exports=e,e.id=18996}}]);