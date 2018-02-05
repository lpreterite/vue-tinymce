<template>
    <div>
        <pre class="code init-code">$ npm install vu-tinymce <br>or <br>$ yarn add vu-tinymce</pre>
        <div class="container editor-container">
            <div class="editor">
                <vue-tinymce v-model="content" :setting="setting" :setup="setup"></vue-tinymce>
            </div>
<pre class="code editor-code">
# template
&lt;vue-tinymce v-model=&quot;content&quot; :setting=&quot;setting&quot; :setup=&quot;setup&quot;&gt;&lt;/vue-tinymce&gt;

# script
import { VueTinymce , TinymceSetting } from &#x27;vu-tinymce&#x27;;
export default {
    data(){
        return {
            content: &#x27;&lt;p style=&quot;text-align: center;&quot;&gt;&lt;img title=&quot;TinyMCE Logo&quot; src=&quot;//www.tinymce.com/images/glyph-tinymce@2x.png&quot; alt=&quot;TinyMCE Logo&quot; width=&quot;110&quot; height=&quot;97&quot; /&gt;&lt;/p&gt;&lt;h1 style=&quot;text-align: center;&quot;&gt;Welcome to the TinyMCE editor demo!&lt;/h1&gt;&lt;p&gt;Please try out the features provided in this basic example.&lt;br&gt;Note that any &lt;strong&gt;MoxieManager&lt;/strong&gt; file and image management functionality in this example is part of our commercial offering – the demo is to show the integration.&lt;/p&gt;&#x27;,
            setting: Object.assign(
                {},
                
                // Use scaffold 
                TinymceSetting,
                
                // download lang file in your project.
                // link: https://www.tinymce.com/download/language-packages/
                {
                    language_url: &quot;utils/tinymce/langs/zh_CN.js&quot;,
                    height: 350
                }
            )
        }
    },
    methods: {
        setup(editor){
            
        }
    },
    components: {
        VueTinymce
    }
}
</pre>
        </div>
    </div>
</template>
<style scoped>
    .init-code{
        width: 450px;
        margin-left: auto;
        margin-right: auto;
    }
    .editor-container{
        margin: 1.5em auto;
        display: flex;
        flex-wrap: nowrap;
    }
    .editor-container > *{
        margin: 0 1em;
    }
    .editor{
        width: 50%;
        min-height: 450px;
    }
    .editor-code{
        width: 50%;
        max-height: 100%;
        overflow: auto;
    }
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
            
        }
    },
    components: {
        VueTinymce
    }
}
</script>
