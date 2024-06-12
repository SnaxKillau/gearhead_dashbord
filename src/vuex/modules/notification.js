import Notification from "../api/Notification";

const state = {
    notification: [],
    error : '',
    loading : false,
}
const mutations = {
    GETNOTI(state , payload){
        state.notification = payload
    },
    LOADING(state){
        state.loading = true;
    },
    ERROR(state, payload){
        state.error = payload
        state.Loading = false
    },
    SUCCESS(state){
        state.loading = false
    },
}
const actions = {
    getNotication({commit}){
        commit("LOADING")
        Notification.all()
        .then((res) => {
            commit("SUCCESS")
            commit("GETNOTI", res.data)
        })
        .catch((err) => console.log(err))
    },
    postNotification({commit , dispatch}, data){
        Notification.post(data)
        .then(() => {
            dispatch("getNotication")
        })
        .catch((err) => {
            commit("ERROR" , err)
        })
    },
    postCommunicate({commit , dispatch}, data){
        Notification.postCommunicate(data)
        .then(() => {
            dispatch("getNotication")
        })
        .catch((err) => {
            commit("ERROR" , err)
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}