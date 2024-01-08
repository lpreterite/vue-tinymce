<script>
import {
  h,
  reactive,
  watch,
  onMounted,
  onBeforeMount,
  onUnmounted,
  onUpdated,
  getCurrentInstance,
} from "vue"

export default {
  name: "VueTinymce",
  emits: ['update:model-value'],
  props: {
      modelValue: {
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
  setup(props, {emit,attrs}){
    const id = 'vue-tinymce-'+Date.now()+Math.floor(Math.random() * 1000)
    const state = reactive({
      content:props.modelValue,
      bookmark:"",
      rng: ""
    })

    /* 富文本编辑器初次化参数设置 */
    const setting = {
      ...props.setting,
      setup: (editor)=> {
          props.debug && console.log("tinymce::setup")
          editor.on('init', ()=>{ //初次运行时，注入内容
              editor.setContent(state.content)
          });
          //更新数据时，通知到组件外部更新
          editor.on('input change undo redo', e=>{
              props.debug && console.log("Change::%s-%s", e.command, e.type)
              emit("update:model-value", editor.getContent())
          })
          props.setup(editor)
      }
    }

    function resetContent(val){
      if(!!editor.resetContent) return editor.resetContent(val)
      editor.setContent(val)
      editor.setDirty(false)
      editor.undoManager.clear()
    }

    //初次化编辑器
    const editor = tinymce.createEditor(id, setting)
    props.debug && console.log("vue:setup", props)

    //使用vue的watch特性监控传入值变化，并更新编辑器内容。
    watch(()=>props.modelValue, (val, oldVal)=>{
      if(val === null) return resetContent("");
      if(val === oldVal || val == editor.getContent()) return
      state.content = val
      editor.setContent(val)
      props.debug && console.log("vue::input::modelValue=%s", val)
    })

    onMounted(()=>{
      props.debug && console.log("vue:onMounted")
      //挂载编辑器到DOM对象
      const root = getCurrentInstance()
      editor.targetElm = root.ctx.$refs.root
      editor.render()
    })
    onBeforeMount(()=>{
      props.debug && console.log("vue:onBeforeMount")
    })
    onUpdated(()=>{
      props.debug && console.log("vue:onUpdated")
    })
    onUnmounted(()=>{
      props.debug && console.log("vue:onUnmounted")
      editor.remove() //移除编辑器挂载
    })

    return ()=>h('div', { id, ref: 'root' })
  }
}
</script>
