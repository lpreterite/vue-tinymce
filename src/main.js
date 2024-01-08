import VueTinymce from './vue-tinymce.vue'
export { VueTinymce }
function Plugin(options={}){
  const { prefix="" } = options
  return {
    install(Vue, options={}){
        const components = {
            VueTinymce
        }
        Object.keys(components).forEach(key => {
            const component = components[key];
            Vue.component(prefix+component.name, component);
        });
    }
  }
}

export default Plugin
