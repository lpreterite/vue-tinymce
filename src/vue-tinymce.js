var inChange = false
module.exports = {
    template: __inline('vue-tinymce.tpl'),
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
        var config = __inline('tinymce.config.json')
        config.style_formats = __inline('tinymce.config.style_formats.json')
        config.setup = function(editor){
            editor.on('init', function(){
                editor.setContent(self.model)
                editor.on('change', function(){
                    inChange = true
                    self.model = tinymce.activeEditor.getContent()
                    console.log(self.model)
                    inChange = false
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
            if(!inChange) return
            if(!!tinymce.activeEditor){
                console.log('in watch')
                tinymce.activeEditor.setContent(val)
            }
        }
    }
}