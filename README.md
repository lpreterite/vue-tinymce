![vue-tinymce](docs/assets/vu-tinymce-logo.png)

# vue-tinymce

[![npm version](https://img.shields.io/npm/v/@packy-tang/vue-tinymce.svg)](https://www.npmjs.com/package/@packy-tang/vue-tinymce)
![vue](https://img.shields.io/badge/vue-%5E2.2.x-green.svg)
![vue](https://img.shields.io/badge/tinymce-%5E4.5.7-green.svg)
[![NPM downloads](http://img.shields.io/npm/dm/@packy-tang/vue-tinymce.svg)](https://www.npmjs.com/package/@packy-tang/vue-tinymce)

A vue component for TinyMCE

## Features

- [x] v-model support
- [x] self managed id
- [x] add more tinymce example

## How to use

### setup

```sh
npm install @packy-tang/vue-tinymce
```

### use

```html
<template>
    <script src="//cdn.bootcss.com/tinymce/4.9.4/tinymce.min.js"></script>
    <div id="app">
        <vue-tinymce
            ref="tinymce"
            v-model="content"
            :setting="setting">
        </vue-tinymce>
    </div>
</template>
<script>
    import Vue from 'vue';
    import { default as VueTinymce, TinymceSetting } from '@packy-tang/vue-tinymce';

    Vue.use(VueTinymce)

    new Vue({
        el: '#app',
        data: function(){
            return {
                content: '<p>html content</p>',
                setting: {
                    ...TinymceSetting,
                    height: 200,
                    language_url: "langs/zh_CN.js",
                    block_formats: "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;"
                }
            }
        }
    })
</script>
```

### Get Editor to do something

```js
const bm = this.$refs.tinymce.editor.selection.getBookmark();
console.log(bm);
```

## Run build

```sh
// install
npm i

npm run build
//or
npm run watch
```