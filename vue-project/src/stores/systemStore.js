import { defineStore } from "pinia";

export const useSystemStore = defineStore('system',{
    state: () =>{
        return{
            logotoggle:false
        }
    },    
    persist:{
        enable:'true',
        key:'logoIsCollapse',
        Storage:'localStorage',
    }

})