import Report from "../api/Report"
const state = {
    saleMonthly: [],
}
const mutations = {
    GETMONTHLY(state, payload){
        state.saleMonthly = payload
      },
}
const actions = {
    getMonthly({commit}){
        Report.all()
        .then((res) => {commit('GETMONTHLY' , res.data)})
        .catch((err) => console.log(err.message))
      }
}
const getters = {
    getMonth: (state) => {
        return Object.keys(state.saleMonthly)
      }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}