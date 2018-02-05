<template>
    <div>
        <h1>Article</h1>
        <vue-tinymce :setting="setting" :setup="setup"></vue-tinymce>
    </div>
</template>
<script>
import { VueTinymce , TinymceSetting } from '../../src/';
export default {
    data(){
        return {
            setting: Object.assign({}, TinymceSetting, {})
        }
    },
    methods: {
        setup(editor){
            console.log("Article init editor id:"+editor.id);
        }
    },
    components: {
        VueTinymce
    }
}
</script>
