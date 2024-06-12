import Condition from "../api/Candition.js"
const state = {
    condition: [],
    isSuccess : false,
    loading : false,
    deleteState : false,
    message : "",
    conditonError : false,
}
const mutations = {
    GETCONDITION(state , payload){
        state.condition = payload
        state.deleteState = false
    },
    POSTCONDITION(state , payload){
        state.condition.push(payload)
    },
    LOADING(state){
        state.loading = true;
    },
    ERROR(state){
        state.conditonError = true,
        state.Loading = false
    },
    CANCLE_ERROR(state){
        state.conditonError = false
    },
    DELETECONDITION(state){
        state.loading = false;
        state.deleteState = true
    },
    SUCCESS(state){
        state.loading = false,
        state.isSuccess = true
    },
}
const actions = {
    getCondition({commit}){
        Condition.all()
        .then((res) => {
            commit("GETCONDITION", res.data)
        })
        .catch((err) => console.log(err))
    },
    deleteCondition({commit , dispatch} , id){
        commit("LOADING")
        Condition.delete(id)
        .then(() => {
            commit("DELETECONDITION")
            dispatch('getCondition')
        })
        .catch(() => {
            commit("ERROR")
            setTimeout(() => {
                commit("CANCLE_ERROR")
            }, 5000);
    })
    },
    postCondition({commit} , data){
        commit("LOADING")
        Condition.post(data)
        .then((res) => {
            console.log(res)
            commit("POSTCONDITION" , res.data)
            commit("SUCCESS")
        })
        .catch((err) => {
            console.log(err)
        })
    },
    cancleConditionError({commit}){
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
