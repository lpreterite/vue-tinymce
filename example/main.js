import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueTinymce from "../src/main"

import 'tinymce'

//样式
import 'tinymce/skins/ui/oxide/skin.min.css'
//主题
import 'tinymce/themes/silver'

//插件
import 'tinymce/plugins/link' //链接插件
import 'tinymce/plugins/image' //图片插件
import 'tinymce/plugins/media' //媒体插件
import 'tinymce/plugins/table' //表格插件
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/quickbars' //快速栏插件
import 'tinymce/plugins/fullscreen' //全屏插件
import 'tinymce/icons/default/icons'

//本地化
import "./utils/tinymce/langs/zh_CN.js";

const app = createApp(App)
app.use(router);

//安装组件
app.use(VueTinymce({ debug:true }))
app.mount("#app");
