# Change log

## 0.2.0

new building and docs

## 0.1.5

fix the problem of not updating the content in real time.

## 0.1.4

fix editor plugin is loading and set content will throw error.
add execCommand on to editor event, fix issue #2.

## 0.1.3

fix vue-tinymce can't set content after init.

## 0.1.2

The tinymce default setting is removed.

Vue element change to 'div'.

Have new example: add emotion to context and format html.

## 0.1.1

support v-model, and fix input bug.

## 1.0.0

更新文档并将语言改为中文，并且移除脚手架设置的提供，初次化编辑器的过程不再使用`tinymce.init()`。

## 1.1.0

- 修复赋空字符给`content`属性时编辑器没有清空数据的问题 #12
- 增加赋空值(`null`)给`content`将重置编辑器内容及状态的特性
- `package.json`移除`umd`文件入口
