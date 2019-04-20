import Vue from "vue"
import { default as VueTinymce, TinymceSetting } from ".."

Vue.component('VueTinymce', VueTinymce)

window.VueTinymce = { TinymceSetting }