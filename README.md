# vue-tinymce
A vue component for TinyMCE

## How to use
### setup
```
npm install lpreterite/vue-tinymce
```

### use
```
import Vue from 'vue';
import VueTinymce from 'vue-tinymce.vue';

new Vue({
    el: '#app',
    data: function(){
        return {
            content: '<p>html content</p>',
            setting: {
                height: 200,
                language_url: "langs/zh_CN.js",
                block_formats: "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;"
            }
        }
    }
})

```

### template 
```
<div id="app">
  <vue-tinymce
    ref="tinymce"
    v-model="content"
    :setting="setting">
  </vue-tinymce>
</div>
<!-- in last -->
<script src="node_modules/tinymce/tinymce.min.js"></script>
```

### Get Editor to do something
```
const bm = this.$refs.tinymce.editor.selection.getBookmark();
console.log(bm);
```

## Run Example

```
npm i
npm run dev
```

## Run build
```
npm i
npm run build
```