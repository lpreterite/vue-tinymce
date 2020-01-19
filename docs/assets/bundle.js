(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('vue')) :
	typeof define === 'function' && define.amd ? define(['vue'], factory) :
	(global = global || self, factory(global.Vue));
}(this, function (Vue) { 'use strict';

	Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

	var t=function(t,e,n,i,o,s,r,d,a,c){"boolean"!=typeof r&&(a=d,d=r,r=!1);var u,h="function"==typeof n?n.options:n;if(t&&t.render&&(h.render=t.render,h.staticRenderFns=t.staticRenderFns,h._compiled=!0,o&&(h.functional=!0)),i&&(h._scopeId=i),s?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,a(t)),t&&t._registeredComponents&&t._registeredComponents.add(s);},h._ssrRegister=u):e&&(u=r?function(){e.call(this,c(this.$root.$options.shadowRoot));}:function(t){e.call(this,d(t));}),u)if(h.functional){var f=h.render;h.render=function(t,e){return u.call(e),f(t,e)};}else{var p=h.beforeCreate;h.beforeCreate=p?[].concat(p,u):[u];}return n}({},void 0,{name:"VueTinymce",model:{prop:"content",event:"change"},props:{content:{type:String,default:""},setup:{type:Function,default:function(){}},disabled:{type:Boolean,default:!1},setting:{type:Object,default:function(){return {}}}},render(t){return "undefined"==typeof tinymce?t("div","tinymce is undefined"):t("div",{attrs:{id:this.id}})},data:()=>({id:"vue-tinymce-"+Date.now()+Math.floor(1e3*Math.random()),editor:null,status:0,backup:""}),watch:{content(t){if(2===this.status)return this.status=1;this.editor&&this.editor.initialized&&this.setContent(this.editor,t);},disabled(t){this.editor.setMode(t?"readonly":"design");}},created(){if("undefined"==typeof tinymce)throw new Error("tinymce undefined")},beforeMount(){const t=Object.assign({},this.setting,{selector:"#"+this.id,setup:t=>{this.setup(t),t.on("init",()=>{this.setContent(t,this.content),t.on("input change undo redo execCommand KeyUp",()=>{if(1===this.status||0===this.status)return this.status=2;this.$emit("change",t.getContent());}),t.on("NodeChange",()=>{this.$emit("change",t.getContent());});});}});this.editor=tinymce.createEditor(t.selector,t);},mounted(){this.editor.targetElm=this.$el,this.editor.render();},updated(){this.editor.render();},beforeDestroy:function(){this.editor.remove();},methods:{setContent:(t,e)=>t.setContent(e)}},void 0,void 0,void 0,void 0,void 0);var VueTinymce = new class{constructor(){const{prefix:t}={prefix:""};this.prefix=t;}install(e,n={}){const i=n.prefix||this.prefix,o={VueTinymce:t};Object.keys(o).forEach(t=>{const n=o[t];e.component(i+n.name,n);});}};

	Vue.use(VueTinymce);

}));
//# sourceMappingURL=bundle.js.map
