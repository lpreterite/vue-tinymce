<template>
    <div>
        <h1>Article</h1>
        <vue-tinymce :setting="setting" :setup="setup"></vue-tinymce>
    </div>
</template>
<script>
export default {
    data(){
        return {
            setting: {
            }
        }
    },
    methods: {
        setup(editor){
            console.log("Article init editor id:"+editor.id);
        }
    }
}
</script>
