import {defineStore} from "pinia";
import {useUserStore} from "@/stores/userStore.js";
import {delCartAPI, findNewCartListAPI, insertCartAPI, mergeCartAPI, updateSelectAll} from "@/apis/cart.js";

export const useCartStore = defineStore(
    'cart',
    () => {
        //定义一个数组
        const cartList = ref([])
        const userStore = useUserStore();
        const isLogin = computed(() => userStore.userInfo.token);
        const updateLoginCartList = async () => {
            const res = await findNewCartListAPI()
            cartList.value = res.result
        }
        const addCart = async (goods) => {
            if (isLogin.value) {
                await insertCartAPI(goods);
                await updateLoginCartList();

            } else {//判断商品是否在购物车 如果每次遍历的sku和传进来的sku相等，必能找到该元素
                const findItem = cartList.value.find(item => goods.skuId === item.skuId);
                if (findItem) {
                    //如果找到了就累加数量
                    findItem.count += goods.count
                } else {
                    //没找到就作为新商品放入
                    cartList.value.push(goods);
                }
            }

        }
        const delCart = async (skuId) => {
            if (isLogin.value) {
                await delCartAPI([skuId]);
                await updateLoginCartList();

            } else {
                const index = cartList.value.findIndex(item => skuId === item.skuId);
                cartList.value.splice(index, 1)
            }
        }
        //全选
        const checkAll = (selected) => {
            cartList.value.forEach(item => item.selected = selected)
            updateSelectedAll(selected);
        }
        //修改全选
        const updateSelectedAll = async (selected) => {

            if (isLogin.value) {
                const data = {
                    selected: selected,
                    ids: cartList.value.map(item => item.skuId)
                };
                console.log(data);

                await updateSelectAll(data);
            }
        }
        //清除购物车
        const clearCart = () => {
            cartList.value = []
        }
        //修改购物项
        const updateCartItem = async (goods) => {
            const {skuId, count, selected} = goods
            if (isLogin.value) {
                await updateCartItem(skuId, {count, selected})
            }
        }

        //总量
        const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0));
        //总价
        const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
        const isAll = computed(() => cartList.value.every(item => item.selected))
        //已选择的数量
        const selectedCount = computed(() => cartList.value.filter(item => item.selected)
            .reduce((a, c) => a + c.count, 0))
        //已选择的总价
        const selectedPrice = computed(() => cartList.value.filter(item => item.selected)
            .reduce((a, c) => a + c.count * c.price, 0))
        return {
            cartList,
            allCount,
            allPrice,
            isAll,
            selectedCount,
            selectedPrice,
            clearCart,
            addCart,
            delCart,
            checkAll,
            updateLoginCartList,
            updateCartItem,
            updateSelectedAll

        }

    },
    {
        persist: true
    }
)