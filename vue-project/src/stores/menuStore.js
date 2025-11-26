import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu',{
    state: () => {
        return{
            isCollapse:false,  //菜单收起开关 默认关闭
            breadCrumbTitle:'',
            menuData:[],       //路由数据
        }
    },
    persist:{
        enable:'true',
        key:'menu',
        Storage:'localStorage',
    }
})