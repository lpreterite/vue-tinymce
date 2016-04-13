module.exports = {
    template: __inline('vue-tinymce.tpl'),
    data: function(){
        return {
            vueChange: false
        }
    },
    props: {
        model: {
            required: true,
            type: String,
            twoWay: true,
            default: ""
        }
    },
    ready: function(){
        var self = this
        var config = require('tinymce.config')

        var unwatch = this.$watch('model', function(val, oldVal){
            if(!!tinymce.activeEditor) tinymce.activeEditor.setContent(val)
        })

        config.target = this.$els.input
        config.style_formats = require('tinymce.config.style_formats')
        config.setup = function(editor){
            //init
            editor.on('init', function(){
                var change = function(){
                    self.model = editor.getContent()
                }
                editor.setContent(self.model)
                editor.on('change', function(){//undo,redo
                    //由于第一次加载存在刷新机制，需判断是否为
                    if(self.vueChange || editor.undoManager.data.length<=1) return unwatch();
                    change()
                })
                editor.on('undo', change)
                editor.on('redo', change)
            })
        }
        tinymce.init(config)
    },
    beforeDestroy: function(){
        tinymce.remove()
    }
}