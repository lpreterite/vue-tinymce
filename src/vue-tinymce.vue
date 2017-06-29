<script>

const INIT = 0;
const INPUT = 1;
const CHANGED = 2;

const tinymceSetting = {
    "menubar": false,
    "height": 500,
    "toolbar_items_size": "small",
    "style_formats": [
        {"title": "Bold", "icon": "bold", "format": "bold"},
        {"title": "Italic", "icon": "italic", "format": "italic"},
        {"title": "Underline", "icon": "underline", "format": "underline"},
        {"title": "Strikethrough", "icon": "strikethrough", "format": "strikethrough"},
        {"title": "Superscript", "icon": "superscript", "format": "superscript"},
        {"title": "Subscript", "icon": "subscript", "format": "subscript"},
        {"title": "Code", "icon": "code", "format": "code"}
    ],
    "block_formats": "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;",
    "toolbar1": "insertfile undo redo | formatselect | bullist numlist | link unlink | uploadimg image media | fullscreen",
    "toolbar2": "styleselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | removeformat"
};

export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        setup: {
            type: Function,
            default: function(){}
        },
        plugins: {
            type: Array,
            default: function(){ 
                return [
                    "advlist autolink link image lists charmap print hr anchor pagebreak spellchecker",
                    "searchreplace visualblocks visualchars code fullscreen media nonbreaking",
                    "table directionality emoticons template textcolor paste textcolor colorpicker textpattern"
                ];
            }
        },
        setting: {
            type: Object,
            default: function(){ 
                return tinymceSetting;
            }
        }
    },
    render(createElement){
        return createElement('textarea', {
            attrs: {
                id: this.id
            }
        });
    },
    data(){
        return {
            id: 'vue-tinymce-'+Date.now(),
            editor: null,
            status: INIT
        }
    },
    watchs:{
        value(val){
            if(this.status === CHANGED || selt.status === INIT) return this.status = INPUT;
            tinymce.get(this.id).setContent(val);
        }
    },
    created(){
        if(typeof tinymce === "undefined") throw new Error('tinymce undefined');
    },
    mounted(){
        const setting = Object.assign(
            {
                plugins: this.plugins
            },
            tinymceSetting,
            this.setting,
            {
                selector: '#'+this.id,
                theme: 'modern',
                setup: (editor)=> {
                    this.setup(editor);
                    this.editor = editor;
                    editor.on('init', ()=>{
                        editor.setContent(this.value);
                        editor.on('input change undo redo', ()=>{
                            if(this.status === INPUT || this.status === INIT) return this.status = CHANGED;
                            this.$emit('input', editor.getContent());
                        });
                    });
                }
            }
        );

        tinymce.init(setting);
    },
    beforeDestroy: function(){
        tinymce.remove(this.id);
    }
}
</script>