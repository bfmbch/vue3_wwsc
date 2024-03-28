import {getCategoryAPI} from "@/apis/layout.js";

export const useCategoryStore = defineStore('Category', () => {
  const categoryList = ref([]);
  const getCategory = async () => {
    const res =  await getCategoryAPI();
    categoryList.value = res.result;
  }
  onMounted(()=>getCategory())

  return { categoryList, getCategory}
})
