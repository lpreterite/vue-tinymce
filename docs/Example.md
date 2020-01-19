# 使用细节

## 本地化

以vue-cli为例，先去[这里](https://www.tiny.cloud/get-tiny/language-packages/)下载`zh_CN`语言包，然后放置到`public/tinymce/langs/zh_CN.js`，然后在编辑器中设置下面内容就能实现本地化处理。

```js
{
    language: "zh_CN",
    language_url: "/tinymce/langs/zh_CN.js" //使用language_url会相对灵活
}
```

> 注意：至tinymce v5.1.5版本为止，页面存在多个编辑器时本地化设置无法根据单个编辑器进行处理。可以看这个例子动手尝试：[传送门](https://codepen.io/packy1980/pen/zYxagWR)

## 推荐设置

提供一个脚手架设置作为参考，👇最下面附上设计说明。

```js
const scaffold_settings = {
    menubar: false,
    toolbar: "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
    toolbar_drawer: "sliding",
    quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
    plugins: "link image media table lists fullscreen quickbars",
    language: 'zh_CN',
    language_url: 'https://lab.uxfeel.com/node_modules/tinymce/langs/zh_CN.js'
}
```

<iframe height="450" style="width: 100%;" scrolling="no" title="TinyMCE5.x_CommonSettings" src="https://codepen.io/packy1980/embed/BayPrVO?height=265&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/packy1980/pen/BayPrVO'>TinyMCE5.x_CommonSettings</a> by packy
  (<a href='https://codepen.io/packy1980'>@packy1980</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 插入图片

<iframe height="500" style="width: 100%;" scrolling="no" title="TinyMCE5.x_InsertImage" src="https://codepen.io/packy1980/embed/VwYGpVE?height=500&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/packy1980/pen/VwYGpVE'>TinyMCE5.x_InsertImage</a> by packy
  (<a href='https://codepen.io/packy1980'>@packy1980</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 转换表情图片

<iframe height="500" style="width: 100%;" scrolling="no" title="TinyMCE5.x_EmotionsExample" src="https://codepen.io/packy1980/embed/oNgPrqx?height=500&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/packy1980/pen/oNgPrqx'>TinyMCE5.x_EmotionsExample</a> by packy
  (<a href='https://codepen.io/packy1980'>@packy1980</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 在Vue-Cli中使用

**值得注意的是按需引入使用**，需要十分清楚你所使用的编辑器主题、皮肤和插件，当你设置的编辑器主题、皮肤和插件没有正确引入导致编辑器无法显示。

如果使用场景是**管理后台**，**建议使用全局引入的方式来使用**，编辑器主题、皮肤和插件将会自动按需加载，相对引入式使用会来得方便和灵活。

- [全局引入](https://github.com/lpreterite/vue-tinymce-example/tree/master/vue#%E5%85%A8%E5%B1%80%E5%BC%95%E5%85%A5)
- [按需引入](https://github.com/lpreterite/vue-tinymce-example/tree/master/vue#%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5)

按需引入例子：[传送门](https://github.com/lpreterite/vue-tinymce-example/tree/master/vue)
