import Order from "../api/Order"
const state = {
    order : [],
    Loading : false,
    deleteState : true,
    message : "",
    error : false,
}
const mutations = {
    GETBRAND(state, payload){
        state.order = payload
        state.deleteState = false
        state.Loading = false
      },
    LOADING(state){
        state.Loading = true
    },
    CLOSRLOADING(state){
        state.Loading = false
    },
    ERROR(state){
        state.error = true,
        state.Loading = false
    },
}
const actions = {
    getOrder({commit}){
        commit("LOADING")
        Order.all()
        .then((res) => {
           commit("GETBRAND" , res.data)
        })
        .catch((err) => commit("ERROR" , err))
      },
    accept({commit, dispatch}, data){
        commit("LOADING")
        Order.accept(data)
        .then(() => {
            dispatch("getOrder")
            commit("CLOSRLOADING")
    })
        .catch((err) => console.log(err))
    },
    deny({commit , dispatch}, data){
        commit("LOADING")
        Order.deny(data)
        .then(() => {
            dispatch("getOrder")
            commit("CLOSRLOADING")
        })
        .catch((err) => console.log(err))
    }
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}