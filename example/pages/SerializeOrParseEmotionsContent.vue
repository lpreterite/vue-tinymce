<template>
    <div>
        <h1>Serialize or parse emotions content</h1>
        <vue-tinymce ref="tinymce" v-model="content" :setting="setting" :setup="setup"></vue-tinymce>

        <h2>Serialize emotions content</h2>
        <div>{{ serializeHtml }}</div>

        <h2>parse emotions content</h2>
        <div>{{ parseHtml }}</div>
    </div>
</template>
<script>
import { VueTinymce , TinymceSetting } from '../../src/';

function parseEmotionHTML({ html }){
    const parser = new DOMParser();
    const root = parser.parseFromString(html, 'text/html');
    const $emotion = root.querySelectorAll('img[data-key]');
    $emotion.forEach(node=>{
        const $span = document.createElement('span');
        $span.innerText = node.dataset.key;
        node.parentNode.replaceChild($span, node);
    });
    return root;
};

function serializeEmotionHTML({ html, emotions }){
    const parser = new DOMParser();
    const root = parser.parseFromString(html,'text/html');
    const iter = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    const mapping = [];
    while ((node = iter.nextNode())) {
        // console.log(node);
        let emotion = emotions.find(emotion => emotion.value == node.data);
        if (!emotion) continue;
        const $emotion = document.createElement('img');
        $emotion.src = emotion.url;
        $emotion.dataset.key = node.data;
        mapping.push({ newChild: $emotion, oldChild: node });
    }
    mapping.forEach(item=>{
        const { newChild, oldChild } = item;
        oldChild.parentNode.replaceChild(newChild, oldChild);
    });
    return root;
};

export default {
    mounted () {
        const dom = serializeEmotionHTML({ html:"<span>[哈哈]</span>", emotions: this.emotions });
        this.content = dom.body.innerHTML;
    },
    data(){
        return {
            emotions: [{
                url: '//img.t.sinajs.cn/t4/appstyle/expression/ext/normal/19/heia_thumb.gif',
                value: '[哈哈]'
            }],
            parseHtml: "",
            serializeHtml: "",
            content: '',
            setting: Object.assign(
                {},
                
                // Use scaffold 
                // TinymceSetting,
                
                // download lang file in your project.
                // link: https://www.tinymce.com/download/language-packages/
                {
                    toolbar1: 'addEmotion',
                    height: 350
                }
            )
        }
    },
    methods: {
        setup(editor){
            const emotion = this.emotions[0];
            editor.addButton('addEmotion', {
                icon: false,
                text: 'add :)',
                tooltip: ":)",
                onclick: ()=>{
                    this.insertImg(editor, {
                        key: emotion.value,
                        path: emotion.url
                    })
                }
            });
        },
        insertImg(editor, {path, key}){
            editor.undoManager.transact(function(){
                editor.focus();
                editor.selection.setContent(editor.dom.createHTML('img', {src: path, 'data-key': key}));
            })
        },
        onClick(key, path){
            this.insertImg(this.$refs.tinymce.editor, { key, path })
        }
    },
    watch: {
        content(html){
            const emotions = this.emotions;
            const serializeDOM = serializeEmotionHTML({ html, emotions });
            this.serializeHtml = serializeDOM.body.innerHTML;

            const parseDOM = parseEmotionHTML({ html:this.serializeHtml });
            this.parseHtml = parseDOM.body.innerHTML;
        }
    },
    components: {
        VueTinymce
    }
}
</script>
