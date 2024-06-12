import Color from "../api/Color"
const state = {
    colorData: [],
    isSuccess : false,
    loading : false,
    deleteState : false,
    message : "",
    error : false,
}
const mutations = {
    GETCOLOR(state , payload){
        state.colorData = payload
        state.deleteState = false
    },
    POSTCOLOR(state , payload){
        state.colorData.push(payload)
    },
    LOADING(state){
        state.loading = true;
    },
    ERROR(state){
        state.error = true,
        state.loading = false
    },
    CANCLE_ERROR(state){
        state.error = false
    },
    DELETECOLOR(state){
        state.loading = false,
        state.deleteState = true
    },
    SUCCESS(state){
        state.loading = false,
        state.isSuccess = true
    },
}
const actions = {
    getColor({commit}){
        commit("LOADING")
        Color.all()
        .then((res) => {
            commit("GETCOLOR", res.data)
            commit("SUCCESS")
        })
        .catch((err) => console.log(err))
    },
    deleteColor({commit, dispatch} , id){
        commit("LOADING")
        Color.delete(id)
        .then(() => {
            commit("DELETECOLOR")
            dispatch('getColor')
         })
        .catch(() => {
            commit("ERROR")
            setTimeout(() => {
            commit("CANCLE_ERROR")
        }, 5000);
        })
    },
    postColor({commit} , data){
        commit("LOADING")
        Color.posting(data)
        .then((res) => {
            console.log(res)
            commit("POSTCOLOR" , res.data)
            commit("SUCCESS")
        })
        .catch((err) => {
            console.log(err)
        })
    },
    editColor({commit} , payload){
        const { id, newData } = payload;
        commit("LOADING")
        console.log(newData)
        Color.edit(id , newData)
        .then((res) => {
            console.log(res)
            commit("DELETECOLOR")
        })
        .catch(err => console.log(err))
    },
    cancleError({commit}){
        commit("CANCLE_ERROR")
    },

}
const getters = {
  
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
