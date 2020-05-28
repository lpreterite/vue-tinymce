<script>

/**
 * 注：编辑器二次刷新处理
 * 编辑器二次刷新具体效果为输入光标重置到第一行第一个字前。
 * 这种效果根本无法正常录入，其原因是双向绑定数据导致编辑器数据更新所致。
 * 根据编辑器的不同状态做标记，当标记为`INPUT`录入时，数据将不会更新至编辑器，
 * 从而避免二次更新的情况，具体请看`content`部分和`editor event`部分的代码。
 * */

const INIT = 0;
const INPUT = 1;
const CHANGED = 2;

const status = ['INIT', 'INPUT', 'CHANGED']
const changedLog = debug=>{
    if(!debug) return ()=>false
    console.warn("`@packy-tang/vue-tinymce`进入debug模式");
    return (e, _status, val, oldVal)=>console.log(`来自：%s | 状态：%s \n %s \n %s`, e.type, status[_status], val, oldVal)
}

export default {
    name: "VueTinymce",
    model: {
        prop: "content",
        event: "change"
    },
    props: {
        content: {
            type: [String, Object],
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
        },
        debug: Boolean
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
        content(val, oldVal){
            this.changedLog({ type: "propsChanged" }, this.status, val, "--")
            if(this.status === INPUT) return;
            if(!this.editor || !this.editor.initialized) return; // fix editor plugin is loading and set content will throw error.
            if(val === null) return this.resetContent("");
            this.setContent(val);
        },
        disabled(val){
            this.editor.setMode(val?"readonly":"design")
        }
    },
    created(){
        this.changedLog = changedLog(this.debug)
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
                        this.setContent(this.content, editor)

                        editor.on('keyup input', e=>{ //只在编辑器中打字才会触发
                            this.status = INPUT       //编辑器录入文字时标记为`INPUT`状态
                        })
                        editor.on('SetContent', e=>{ //编辑器在插入图片和撤销/重做时触发，组件content更新数据也会导致触发
                            this.status = INPUT      //编辑器在响应`setContent`方法后标记为`INPUT`状态
                            this.changedLog(e, this.status, editor.getContent(), "--")
                        })
                        editor.on('Blur', e=>{
                            this.status = INIT
                            this.changedLog(e, this.status, editor.getContent(), "--")
                        })
                        editor.on('input keyup Change Undo Redo ExecCommand NodeChange', e=>{
                            this.onChanged(e, editor)
                        })
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
        setContent(val, editor){
            if(!editor) editor = this.editor
            return editor.setContent(val)
        },
        resetContent(val, editor){
            if(!editor) editor = this.editor
            if(!!editor.resetContent) return editor.resetContent(val)
            editor.setContent(val)
            editor.setDirty(false)
            editor.undoManager.clear()
        },
        onChanged(e, editor){
            if(!editor) editor = this.editor
            const content = editor.getContent()
            this.changedLog(e, this.status, content, "--")
            this.$emit('change', content);
        }
    }
}
</script>
