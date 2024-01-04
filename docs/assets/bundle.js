!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("vue")):"function"==typeof define&&define.amd?define(["vue"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Vue)}(this,(function(e){"use strict";function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=t(e);const o=["INIT","INPUT","CHANGED"];function i(e,t,n,o,i,s,d,r,a,c){"boolean"!=typeof d&&(a=r,r=d,d=!1);const u="function"==typeof n?n.options:n;let h;if(e&&e.render&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0,i&&(u.functional=!0)),o&&(u._scopeId=o),s?(h=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,a(e)),e&&e._registeredComponents&&e._registeredComponents.add(s)},u._ssrRegister=h):t&&(h=d?function(e){t.call(this,c(e,this.$root.$options.shadowRoot))}:function(e){t.call(this,r(e))}),h)if(u.functional){const e=u.render;u.render=function(t,n){return h.call(n),e(t,n)}}else{const e=u.beforeCreate;u.beforeCreate=e?[].concat(e,h):[h]}return n}const s=i({},undefined,{name:"VueTinymce",model:{prop:"content",event:"change"},props:{content:{type:[String,Object],default:""},setup:{type:Function,default:function(){}},disabled:{type:Boolean,default:!1},setting:{type:Object,default:function(){return{}}},debug:Boolean},render(){return"undefined"==typeof tinymce?e.h("div","tinymce is undefined"):e.h("div",{attrs:{id:this.id}})},data:()=>({id:"vue-tinymce-"+Date.now()+Math.floor(1e3*Math.random()),editor:null,status:0,bookmark:null}),watch:{content(e,t){if(this.changedLog({type:"propsChanged"},this.status,`${e} | ${t}`,"--"),1!==this.status&&t!==e&&this.editor&&this.editor.initialized)return null===e?this.resetContent(""):void this.setContent(e)},disabled(e){this.editor.setMode(e?"readonly":"design")}},created(){if(this.changedLog=this.debug?(console.warn("`@packy-tang/vue-tinymce`进入debug模式"),(e,t,n,i)=>console.log("来自：%s | 状态：%s \n %s \n %s",e.type,o[t],n,i)):()=>!1,"undefined"==typeof tinymce)throw new Error("tinymce undefined")},beforeMount(){const e=Object.assign({},this.setting,{selector:"#"+this.id,setup:e=>{this.setup(e),e.on("init",(()=>{this.setContent(this.content,e),e.on("keyup input",(e=>{this.status=1})),e.on("SetContent",(t=>{this.changedLog(t,this.status,e.getContent(),"--")})),e.on("Blur",(t=>{this.status=0,this.changedLog(t,this.status,e.getContent(),"--")})),e.on("input keyup Change Undo Redo ExecCommand NodeChange",(t=>{this.onChanged(t,e)}))}))}});this.editor=tinymce.createEditor(e.selector,e)},mounted(){this.editor.targetElm=this.$el,this.editor.render()},updated(){this.editor.render()},beforeDestroy:function(){this.editor.remove()},methods:{setContent(e,t){t||(t=this.editor),t.setContent(e),t.selection.moveToBookmark(this.bookmark)},resetContent(e,t){if(t||(t=this.editor),t.resetContent)return t.resetContent(e);t.setContent(e),t.setDirty(!1),t.undoManager.clear()},onChanged(e,t){t||(t=this.editor),"change"===e.type&&(this.bookmark=e.level.bookmark);const n=t.getContent();this.changedLog(e,this.status,n,"--"),this.$emit("change",n)}}},undefined,undefined,undefined,!1,void 0,void 0,void 0);var d=new class{constructor(){const{prefix:e}={prefix:""};this.prefix=e}install(e,t={}){const n=t.prefix||this.prefix,o={VueTinymce:s};Object.keys(o).forEach((t=>{const i=o[t];e.component(n+i.name,i)}))}};n.default.use(d)}));
//# sourceMappingURL=bundle.js.map
