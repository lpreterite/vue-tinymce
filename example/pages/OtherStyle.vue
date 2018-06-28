<template>
    <div>
        <h2>Other Style</h2>
        <div class="editor">
            <vue-tinymce v-model="content" :setting="setting" :setup="setup"></vue-tinymce>
        </div>
    </div>
</template>
<style scoped>
</style>
<script>
import { VueTinymce , TinymceSetting } from '../../src/';

import {
    FirstLineIndentButton,
    BodyMarginButton,
    MarginTopButton,
    MarginButtomButton,
    LineHeightButton,
    LetterSpacingButton,
} from "../utils/";

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
                    skin: 'custom',

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
            BodyMarginButton().install(editor);
            FirstLineIndentButton().install(editor);
            MarginTopButton().install(editor);
            MarginButtomButton().install(editor);
            LineHeightButton().install(editor);
            LetterSpacingButton().install(editor);
        }
    },
    components: {
        VueTinymce
    }
}
</script>
