<template>
    <div>
        <h2>install</h2>
        <pre v-highlight><code>$ npm install @packy-tang/vue-tinymce <br>or <br>$ yarn add @packy-tang/vue-tinymce</code></pre>

        <h2>example</h2>
        <div class="editor">
            <vue-tinymce v-model="content" :setting="setting" :setup="setup"></vue-tinymce>
        </div>
    </div>
</template>
<style scoped>
</style>
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
        }
    },
    components: {
        VueTinymce
    }
}
</script>
