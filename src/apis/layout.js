import http from "@/utils/http.js";

export  function getCategoryAPI(){
    return http.get('home/category/head')
}