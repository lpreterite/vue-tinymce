<script>

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
            editor: null
        }
    },
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
    created(){
        if(typeof tinymce === "undefined") throw new Error('tinymce undefined');
    },
    mounted(){
        const selt = this;

        const unwatch = this.$watch('value', val => {
            tinymce.get(this.id).setContent(val);
        })

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
                    selt.setup(editor);
                    this.editor = editor;
                    editor.on('init', ()=>{
                        function change(){
                            if(editor.undoManager.data.length<=1) return unwatch();
                            selt.$emit('change', editor.getContent());
                        };
                        editor.setContent(selt.value);
                        editor.on('change undo redo', change);
                    });
                }
            }
        );

        tinymce.init(setting)
    },
    beforeDestroy: function(){
        tinymce.remove(this.id)
    }
}
</script>