import Brand from "../api/Brand"
const state = {
    brandData : [],
    options : [],
    IsSuccess : false,
    Loading : false,
    deleteState : true,
    message : "",
    error : false,
    searchLoading : false
}
const mutations = {
    GETBRAND(state, payload){
        state.brandData = payload
        state.deleteState = false
      },
    POSTING(state, payload){
        state.brandData.push(payload)
    },
    LOADING(state){
        state.Loading = true
    },
    SUCCESS(state){
        state.Loading = false,
        state.IsSuccess = true
    },
    MESSSAGE(state, payload){
        state.message = payload
    },
    DELETE_SUCCESS(state){
        state.Loading = false
        state.deleteState = true
    },
    ERROR(state){
        state.error = true,
        state.Loading = false
    },
    CANCLE_ERROR(state){
        state.error = false
    },
    SEARCHLOADING(state){
        state.searchLoading = true
    },
    SEARCHSUCCESS(state, payload){
        state.searchLoading = false
        state.options = payload
    }
}
const actions = {
    getBrand({commit}){
        commit("LOADING")
        Brand.all()
        .then((res) => {
            commit("GETBRAND" , res.data),
            commit("SUCCESS")
        })
        .catch((err) => console.log(err.message))
      },
    posting({commit}, newData){
        console.log(newData)
        commit("LOADING")
        Brand.posting(newData)
        .then((res) => {
           commit("POSTING" , res.data),
           commit("SUCCESS")
        })
        .catch((err) => console.log(err))
    },
    deleteBrand({commit, dispatch}, id){
        commit("LOADING")
        Brand.delete(id)
        .then(() => {
           commit("DELETE_SUCCESS")
           commit("MESSSAGE")
           dispatch('getBrand')
        })
        .catch(() => {
            commit("ERROR")
                setTimeout(() => {
                commit("CANCLE_ERROR")
            }, 5000);
        })
    },
    editBrand({commit} ,payload){
        const { id, newData } = payload;
        console.log(id);
        commit("LOADING");
        console.log(newData);
        Brand.edit(id , newData)
        .then(() => {
            commit("DELETE_SUCCESS")
        })
        .catch((err) => console.log(err))
    },
    search({commit} , data){
        console.log(data)
        Brand.search(data)
        .then((res) => {
            commit("SEARCHLOADING")
            if (Array.isArray(res.data) && res.data.length > 0) {
                commit("SEARCHSUCCESS", res.data)
            } else {
                commit("SEARCHSUCCESS" , {"id" : -1 ,"description" : "Not Found" , "imagePath" : "null"})
            }
        })
        .catch((err) => {console.log(err)})
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}