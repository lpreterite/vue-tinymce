import Vue from 'vue';
// import { VueTinymce , TinymceSetting } from '../dist/vue-tinymce';
import { VueTinymce , TinymceSetting } from '../src/';

Vue.component('vue-tinymce', VueTinymce);

var vm = new Vue({
    el: '#app',
    data: function(){
        setTimeout(()=>{
            this.tinymce[0].content = 'html content'+ Date.now() +'';
        }, 1000);

        return {
            title: 'VueTinymce',
            emotions: {
                '[哈哈]': '//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/19/heia_thumb.gif'
            },
            format: {
                after: '',
                before: ''
            },
            tinymce: [
                {
                    content: 'html content',
                    setting: Object.assign(TinymceSetting, {
                        language_url: "langs/zh_CN.js",
                        height: 200
                    })
                },
                {
                    content: '<p>多个文本测试</p><hr><p>第二行</p>',
                    setting: {
                        language_url: "langs/zh_CN.js",
                        height: 200,
                        theme: 'inlite',
                        menubar: false,
                        keep_styles: false,
                        invalid_styles: 'color font-size',
                        plugins: 'image table link paste contextmenu textpattern autolink',
                        insert_toolbar: 'quickimage quicktable',
                        selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
                        inline: true,
                        paste_data_images: true,
                    }
                }
            ]
        }
    },
    methods: {
        getTinymceId(name){
            alert(this.$refs[name].id);
        },
        insertImg(editor, {path, key}){
            editor.undoManager.transact(function(){
                editor.focus();
                editor.selection.setContent(editor.dom.createHTML('img', {src: path, 'data-key': key}));
            })
        },
        insertEmotion(editor, key){
            this.insertImg(editor, {key, path:this.emotions[key]});
        },
        formatHtml(html, emotions){
            var parser = new tinymce.html.DomParser();
            var serializer = new tinymce.html.Serializer();
            var nodes = parser.parse(html);
            nodes.getAll('img').map(function(item){
                var key = item.attr('data-key') || '';
                if(key.length > 0){
                    var spanNode = new tinymce.html.Node('span', 1);
                    var textNode = new tinymce.html.Node('#text', 3);
                    textNode.value = key;
                    spanNode.append(textNode);
                    item.replace(spanNode);
                }
            });
            return serializer.serialize(nodes);
        },
        restoreHtml(html, emotions){
            var parser = new tinymce.html.DomParser();
            var serializer = new tinymce.html.Serializer();
            var nodes = parser.parse(html);
            nodes.getAll('#text').map(function(item){
                var value = emotions[item.value];
                if(value){
                    var imgNode = new tinymce.html.Node('img', 1);
                    imgNode.attr('data-key', item.value);
                    imgNode.attr('src', value);
                    item.replace(imgNode);
                }
            })
            return serializer.serialize(nodes);
        }
    }
})