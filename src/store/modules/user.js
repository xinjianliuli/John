import { defineStore } from "pinia";

export const useAccount=defineStore('acount',{
    state(){
        return {
            acount:{nick:'',headerimg:''},
        }
    },
    actions:{
        savasAcount(acount){
            this.acount=acount
        }
    },
    getters:{
        user(){
            return this.acount
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: "acountkey",
                storage: window.localStorage,  
                paths:['acount']
            },
        ],
    },
})