import ImageView from "@/components/imageView/index.vue"
import Sku from "@/components/sku/index.vue"
//导出对象plugin
export const componentPlugin = {
    install(app){
        app.component('ImageView',ImageView)
        app.component('Sku',Sku)
    }
}