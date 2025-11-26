import { defineStore } from 'pinia'

//定义仓库
export const useLoginStore = defineStore('login',{
    state:() => {
        return{
            username:"",
            permission:"",
            token:"",
        }
    },
    persist:{
        enable:'true',
        key:'login',
        Storage:'localStorage',
    }
})