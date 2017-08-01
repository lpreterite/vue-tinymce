<script>

const INIT = 0;
const INPUT = 1;
const CHANGED = 2;

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
        setting: {
            type: Object,
            default: function(){ 
                return tinymceSetting;
            }
        }
    },
    render(createElement){
        return createElement('div', {
            attrs: {
                id: this.id
            }
        });
    },
    data(){
        return {
            id: 'vue-tinymce-'+Date.now(),
            editor: null,
            status: INIT,
            backup: ''
        }
    },
    watch:{
        value(val){
            if(this.status === CHANGED || this.status === INIT) return this.status = INPUT;
            if(tinymce.get(this.id).initialized){
                tinymce.get(this.id).setContent(val);
            }else{
                this.backup = val;
            }
        }
    },
    created(){
        if(typeof tinymce === "undefined") throw new Error('tinymce undefined');
    },
    mounted(){
        const setting = Object.assign({},
            this.setting,
            {
                selector: '#'+this.id,
                setup: (editor)=> {
                    this.setup(editor);
                    this.editor = editor;
                    editor.on('init', ()=>{
                        editor.setContent(this.value || this.backup);
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
        tinymce.get(this.id).remove();
    }
}
</script>