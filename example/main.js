import 'tinymce';
import 'tinymce/themes/modern'; //TODO: 载入样式
import Vue from 'vue';
import VueTinymce from '../src/vue-tinymce.vue';

Vue.component('vue-tinymce', VueTinymce);

var vm = new Vue({
    el: '#app',
    data: function(){
        return {
            title: 'VueTinymce'
        }
    },
    methods: {
    }
})