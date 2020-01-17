import VueTinymce from './vue-tinymce.vue'
export { VueTinymce }
class VuePlugin{
    constructor(){
        const { prefix } = { prefix: "" }
        this.prefix = prefix;
    }
    install(Vue, options={}){
        const prefix = options.prefix || this.prefix
        const components = {
            VueTinymce
        }
        Object.keys(components).forEach(key => {
            const component = components[key];
            Vue.component(prefix+component.name, component);
        });
    }
}
export default new VuePlugin()