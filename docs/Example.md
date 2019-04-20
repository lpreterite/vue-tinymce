# Example

## Simple Example

<vuep template="#simple" :style="{height: '600px'}"></vuep>

<script v-pre type="text/x-template" id="simple">

<template>
    <vue-tinymce v-model="content" />
</template>
<script>
    module.exports = {
        data(){
            return {
                content: '<p>html content</p>'
            }
        }
    }
</script>

</script>

## Insert Image

<vuep template="#insertimage" :style="{height: '600px'}"></vuep>

<script v-pre type="text/x-template" id="insertimage">
<template>
    <div>
        <h1>Insert image</h1>
        <p>
            <a class="btn" href="javascript:;" @click="onClick('packy','//uxfeel.com/uploads/avatar.png')">add image in content</a> => <img width="50" src="//uxfeel.com/uploads/avatar.png" alt="">
        </p>
        <vue-tinymce ref="tinymce" v-model="content" :setting="setting" :setup="setup"></vue-tinymce>
    </div>
</template>
<script>
// import { VueTinymce , TinymceSetting } from '../../src/';
const TinymceSetting = VueTinymce.TinymceSetting
export default {
    data(){
        return {
            content: '<p style="text-align: center;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /></p><h1 style="text-align: center;">Welcome to the TinyMCE editor demo!</h1><p>Please try out the features provided in this basic example.<br>Note that any <strong>MoxieManager</strong> file and image management functionality in this example is part of our commercial offering – the demo is to show the integration.</p>',
            setting: Object.assign(
                {},
                
                // Use scaffold 
                TinymceSetting,
                
                // download lang file in your project.
                // link: https://www.tinymce.com/download/language-packages/
                {
                    language_url: "assets/tinymce/langs/zh_CN.js",
                    height: 350
                }
            )
        }
    },
    methods: {
        setup(editor){
            // init editor yourself
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
    }
}
</script>

</script>

## Serialize or parse emotions content

<vuep template="#emotions" :style="{height: '600px'}"></vuep>

<script v-pre type="text/x-template" id="emotions">

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
// import { VueTinymce , TinymceSetting } from '@packy-tang/vue-tinymce';
const TinymceSetting = VueTinymce.TinymceSetting

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
    }
}
</script>

</script>

## Custom style

<vuep template="#customstyle" :style="{height: '600px'}"></vuep>

### Custom files

```sh
- docs/
    - assets/
        - tinymce/
            - skins/
                - custom/
    - utils/
        index.js
```

<script v-pre type="text/x-template" id="customstyle">
<template>
    <div>
        <h2>Custom style</h2>
        <div class="editor">
            <vue-tinymce v-model="content" :setting="setting" :setup="setup"></vue-tinymce>
        </div>
    </div>
</template>
<script>
// import { VueTinymce , TinymceSetting } from '@packy-tang/vue-tinymce';
const TinymceSetting = VueTinymce.TinymceSetting

// import {
//     FirstLineIndentButton,
//     BodyMarginButton,
//     MarginTopButton,
//     MarginButtomButton,
//     LineHeightButton,
//     LetterSpacingButton,
// } from "assets/utils/";

export default {
    data(){
        return {
            content: '<p style="text-align: center;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /></p><h1 style="text-align: center;">Welcome to the TinyMCE editor demo!</h1><p>Please try out the features provided in this basic example.<br>Note that any <strong>MoxieManager</strong> file and image management functionality in this example is part of our commercial offering – the demo is to show the integration.</p>',
            setting: Object.assign(
                {},
                TinymceSetting,
                {
                    branding: false,
                    height: 250,
                    plugins: [TinymceSetting.plugins[0], 'searchreplace visualblocks visualchars code fullscreen nonbreaking', TinymceSetting.plugins[2]],
                    toolbar1: "undo redo | fontselect fontsizeselect formatselect | forecolor backcolor | bold italic underline strikethrough subscript superscript | bullist numlist | alignleft aligncenter alignright alignjustify | first_line_indent body_margin | margin_top margin_bottom line_height letter_spacing",
                    toolbar2: "removeformat | blockquote hr charmap | link unlink | newdocument | table | fullscreen",
                    
                    //skin
                    skin_url: 'assets/tinymce/skins/custom',

                    // font
                    font_formats: "默认=微软雅黑, Microsoft YaHei, Arial, sans-serif;宋体=SimSun;微软雅黑=Microsoft YaHei,Apple LiGothic Medium;楷体=KaiTi,KaiTi_GB2312, SimKai;黑体=SimHei,STHeiti;隶书=LiSu,SimLi;andale mono=andale mono;arial=arial, helvetica, sans - serif;arial black=arial black, avant garde;comic sans ms=comic sans ms;impact=impact, chicago;Times New Roman=Times New Roman;",
                    fontsize_formats: "12px 14px 16px 18px 20px 24px 36px",

                    //list
                    advlist_bullet_styles: "default,circle,disc,square",
                    advlist_number_styles: "decimal,decimal-leading-zero,lower-alpha,upper-alpha,lower-greek,lower-roman,upper-roman,simp-chinese-informal,simp-chinese-formal,cjk-heavenly-stem,cjk-earthly-branch",

                    //link
                    link_title: false,

                    //style
                    formats: {
                        margin_top: { selector: 'p,h1,h2,h3,h4,h5,h6,div,ul,ol,li,table,img', styles: { marginTop: '%value' } },
                        margin_bottom: { selector: 'p,h1,h2,h3,h4,h5,h6,div,ul,ol,li,table,img', styles: { marginBottom: '%value' } },
                        line_height: { selector: 'p,h1,h2,h3,h4,h5,h6,div,ul,ol,li,table,img', styles: { lineHeight: '%value' } },
                        letter_spacing: { inline: 'span', styles: { letterSpacing: '%value' } },
                        first_line_indent: { selector: 'p,h1,h2,h3,h4,h5,h6,div,ul,ol,li,table', styles: { textIndent: '16px' } },
                        wrapper_margin: { block: 'section', wrapper: 1, styles: { marginLeft: '%value', marginRight: '%value' }, attributes: { 'data-adm-wrapper': 'page' } }
                    }
                }
            )
        }
    },
    methods: {
        setup(editor){
            // BodyMarginButton().install(editor);
            // FirstLineIndentButton().install(editor);
            // MarginTopButton().install(editor);
            // MarginButtomButton().install(editor);
            // LineHeightButton().install(editor);
            // LetterSpacingButton().install(editor);
        }
    }
}
</script>

</script>