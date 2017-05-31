import Vue from 'vue';
import VueTinymce from '../src/vue-tinymce.vue';

Vue.component('vue-tinymce', VueTinymce);

var vm = new Vue({
    el: '#app',
    data: function(){
        setTimeout(()=>{
            this.content = '<p>html content'+ Date.now() +'</p>';
        }, 1000);

        return {
            title: 'VueTinymce',
            content: '<p>html content</p>',
            content2: '<p>多个文本测试</p><hr><p>第二行</p>',
            tinymceSetting: {
                language_url: "langs/zh_CN.js",
                height: 200
            }
        }
    },
    methods: {
        getTinymceId(name){
            alert(this.$refs[name].id);
        }
    }
})