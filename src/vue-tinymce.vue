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
    watch: {
        value(val){
            // console.log('value change', val, this.status);
            if(this.status === CHANGED) return this.status = INPUT;
            if(!this.editor || !this.editor.initialized) return; // fix editor plugin is loading and set content will throw error.
            this.editor.setContent(val);
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
                    // console.log('setup');
                    editor.on('init', ()=>{
                        // console.log('init', this.value);
                        editor.setContent(this.value);
                        //fix execCommand not change ,more see issues#2
                        editor.on('input change undo redo execCommand', ()=>{
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
        this.editor.remove();
    }
}
</script>