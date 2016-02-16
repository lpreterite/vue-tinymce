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
        config.target = this.$els.input
        config.style_formats = require('tinymce.config.style_formats')
        config.setup = function(editor){
            //init
            editor.on('init', function(){
                editor.setContent(self.model)
                editor.on('change', function(){
                    if(!self.vueChange) self.model = tinymce.activeEditor.getContent()
                })
            })
        }
        tinymce.init(config)
    },
    beforeDestroy: function(){
        tinymce.remove()
    },
    watch: {
        'model': function(val, oldVal){
            this.vueChange = true
            if(!!tinymce.activeEditor) tinymce.activeEditor.setContent(val)
            this.vueChange = false
        }
    }
}