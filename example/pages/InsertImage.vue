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
import { VueTinymce , TinymceSetting } from '../../src/';
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
                    language_url: "utils/tinymce/langs/zh_CN.js",
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
    },
    components: {
        VueTinymce
    }
}
</script>
