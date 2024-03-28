import {onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {getTopCategoryAPI} from "@/apis/category.js";

export function useCategory(){
    const categoryData = ref({});
    const route = useRoute();
    const getCategory = async (id) => {
        // this.$router.params.id
        const {result} = await getTopCategoryAPI(id);
        categoryData.value = result;
    }
    onMounted(()=>getCategory(route.params.id));
    onBeforeRouteUpdate((to)=>{
        getCategory(to.params.id);
    })
    return{
        categoryData
    }
}