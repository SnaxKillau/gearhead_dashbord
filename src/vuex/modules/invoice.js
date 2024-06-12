import Invoice from "../api/Invoice";

const state = {
    invoice: [],
    error : '',
    loading : false,
}
const mutations = {
    GETINVOICE(state , payload){
        state.invoice = payload
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
    getInvoice({commit}){
        commit("LOADING")
        Invoice.all()
        .then((res) => {
            commit("GETINVOICE", res.data)
            commit("SUCCESS")
        })
        .catch((err) => console.log(err))
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
