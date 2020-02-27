
![vue-tinymce](docs/assets/vu-tinymce-logo.png)

# vue-tinymce

[![npm version](https://img.shields.io/npm/v/@packy-tang/vue-tinymce.svg)](https://www.npmjs.com/package/@packy-tang/vue-tinymce)
![vue](https://img.shields.io/github/package-json/dependency-version/lpreterite/vue-tinymce/vue)
![tinymce](https://img.shields.io/github/package-json/dependency-version/lpreterite/vue-tinymce/tinymce)
[![NPM downloads](http://img.shields.io/npm/dm/@packy-tang/vue-tinymce.svg)](https://www.npmjs.com/package/@packy-tang/vue-tinymce)

提供给 vue 开发者使用的 TinyMCE 组件

## 目的

为开发人员简单使用 TinyMCE 的 Vue 组件。提供非常简单易懂的源代码提供给开发人员作为参考，当然你也可以直接使用这个组件到你的项目。发现问题可以提到 issue，期望你的反馈 👏。

## 如何使用

### 安装组件

```sh
yarn add @packy-tang/vue-tinymce
# or
npm install @packy-tang/vue-tinymce
```

### 引入

```html
<template>
    <!-- 全局引入TinyMCE -->
    <script src="//unpkg.com/tinymce@5.1.5/tinymce.min.js"></script>
    <!-- App -->
    <div id="app">
        <vue-tinymce
            v-model="content"
            :setup="setup"
            :setting="setting" />
    </div>
</template>
<script>
    import Vue from "vue"
    import VueTinymce from "@packy-tang/vue-tinymce"

    //安装组件
    Vue.use(VueTinymce)

    new Vue({
        el: "#app",
        data: function() {
            return {
                content: "<p>html content</p>",
                setting: {
                    height: 500
                }
            }
        },
        methods: {
            setup(editor) {
                console.log(editor)
            }
        }
    })
</script>
```

### 其他使用例子

- vue-cli使用例子：[传送门](https://github.com/lpreterite/vue-tinymce-example/tree/master/vue)
- webpack使用例子：传送门(待补上)

## 属性

| 名称       | 描述                                                  |
| ---------- | ----------------------------------------------------- |
| `:content`   | 类型`String`，作为文本内容传入编辑器，可以使用`v-model`实现双向绑定 |
| `@change`   | 类型`Function`，编辑器中`Input` `Change` `Undo` `Redo` `ExecCommand` `KeyUp` `NodeChange`事件响应后触发的事件返回文本内容                  |
| `:setting` | 类型`Object`，编辑器的设置，`setup`不建议在这设置     |
|`:setup`| 类型`Function`, 常用与自定义编辑器处理，组件内部做了些处理，建议在这里添加自定义的代码 |

## 更多使用细节

想了解更多内容请移步至[使用细节](http://lpreterite.github.io/vue-tinymce/#/Example)

