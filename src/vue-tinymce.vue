<script>

const INIT = 0;
const INPUT = 1;
const CHANGED = 2;

export default {
    name: "VueTinymce",
    model: {
        prop: "content",
        event: "change"
    },
    props: {
        content: {
            type: String,
            default: ''
        },
        setup: {
            type: Function,
            default: function(){}
        },
        disabled: {
            type: Boolean,
            default: false
        },
        setting: {
            type: Object,
            default: function(){ 
                return {};
            }
        }
    },
    render(createElement){
        if(typeof tinymce === "undefined"){
            return createElement('div', "tinymce is undefined"); 
        }
        return createElement('div', {
            attrs: {
                id: this.id
            }
        });
    },
    data(){
        return {
            id: 'vue-tinymce-'+Date.now()+Math.floor(Math.random() * 1000),
            editor: null,
            status: INIT,
            backup: ''
        }
    },
    watch: {
        content(val){
            // console.log('value change', val, this.status);
            if(this.status === CHANGED) return this.status = INPUT;
            if(!this.editor || !this.editor.initialized) return; // fix editor plugin is loading and set content will throw error.
            this.setContent(this.editor, val);
        },
        disabled(val){
            this.editor.setMode(val?"readonly":"design")
        }
    },
    created(){
        if(typeof tinymce === "undefined") throw new Error('tinymce undefined');
    },
    beforeMount () {
        const setting = Object.assign({},
            this.setting,
            {
                selector: '#'+this.id,
                setup: (editor)=> {
                    this.setup(editor);
                    // console.log('setup');
                    editor.on('init', ()=>{
                        // console.log('init', this.content);
                        this.setContent(editor, this.content)
                        //fix execCommand not change ,more see issues#2
                        editor.on('input change undo redo execCommand KeyUp', ()=>{
                            if(this.status === INPUT || this.status === INIT) return this.status = CHANGED;
                            this.$emit('change', editor.getContent());
                            // console.log('editor change', editor.getContent());
                        });
                        //fix have chang not to emit change,more see issues #4
                        editor.on('NodeChange', ()=>{
                            this.$emit('change', editor.getContent());
                        });
                    });
                }
            }
        );

        this.editor = tinymce.createEditor(setting.selector, setting)
    },
    mounted(){
        this.editor.targetElm = this.$el
        this.editor.render()
    },
    updated () {
        this.editor.render()
    },
    beforeDestroy: function(){
        this.editor.remove();
    },
    methods: {
        setContent(editor, val){
            return editor.setContent(val)
        }
    }
}
</script>
