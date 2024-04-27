import Tranmission from "../api/Tranmission"
const state = {
    tranmission: [],
    isSuccess : false,
    loading : false,
    deleteState : false,
    message : "",
    tranmissionError : false,
}
const mutations = {
    GETTRANMISSION(state , payload){
        state.tranmission = payload
        state.deleteState = false
    },
    POSTTRANMISSION(state , payload){
        state.tranmission.push(payload)
    },
    LOADING(state){
        state.loading = true;
    },
    ERROR(state){
        state.tranmissionError = true,
        state.loading = false
    },
    CANCLE_ERROR(state){
        state.tranmissionError = false
    },
    DELETETRANMISSION(state){
        state.loading = false;
        state.deleteState = true
    },
    SUCCESS(state){
        state.loading = false,
        state.isSuccess = true
    },
}
const actions = {
    getTranmission({commit}){
        commit("LOADING")
        Tranmission.all()
        .then((res) => {
            commit("GETTRANMISSION", res.data)
        })
        .catch((err) => console.log(err))
    },
    deleteTranmission({commit} , id){
        commit("LOADING")
        Tranmission.delete(id)
        .then(() => {commit("DELETETRANMISSION")})
        .catch(() => {commit("ERROR")})
    },
    postTranmission({commit} , data){
        commit("LOADING")
        Tranmission.posting(data)
        .then((res) => {
            console.log(res)
            commit("POSTTRANMISSION" , res.data)
            commit("SUCCESS")
        })
        .catch((err) => {
            console.log(err)
        })
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
