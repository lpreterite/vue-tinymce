import Vue from 'vue';
import tinymce from 'tinymce';
window.tinymce = tinymce;
import router from './routes';
import Wrapper from "./pages/Wrapper.vue";

const app = new Vue({
    name: 'root',
    el: '#app',
    template: '<App />',
    components: { "App": Wrapper },
    router
});

Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})