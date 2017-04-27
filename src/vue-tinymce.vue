<script>
export default {
    created(){
        if(typeof tinymce === "undefined") throw new Error('tinymce undefined');
    },
    render(createElement){
        return createElement('textarea', {
            attrs: {
                id: this.id
            },
            on: {

            }
        });
    },
    props: {
        id: {
            type: String,
            default: 'vue-tinymce-'+Date.now()
        }
    },
    mounted(){
        var config = {
            selector: '#'+this.id,
            theme: 'modern'
        };
        tinymce.init(config)
    },
    beforeDestroy: function(){
        tinymce.remove(this.id)
    }
}
</script>