import Transformation from "../api/Transformation"
const state = {
    transformationState: [],
    image: [],
    uploadSuccefully: false,
    loadingTransformation : false,
    deleteState : false,
    postingSuccessfully: false
}
const mutations = {
    GETTRANSFORMATION(state , payload){
        state.postingSuccessfully = false
        state.deleteState = false
        state.transformationState = payload
    },
    UPLOADIMAGE(state , payload){
        state.image.push(payload)
        state.uploadSuccefully = true
    },
    POSTING(state){
        state.postingSuccessfully = true
        state.loadingTransformation = false
    },
    SUCCESS(state){
        state.loadingTransformation = false
    },
    LOADING(state){
        state.loadingTransformation = true
    },
    DELETESUCCESSFULLY(state){
        state.deleteState = true
    }
    
}
const actions = {
    getTransformation({commit}){
        commit("LOADING")
        Transformation.all()
        .then((res) => {
            commit('GETTRANSFORMATION', res.data)
            commit("SUCCESS")
        })
        .catch((err) => console.log(err))
    },
    uploadImage({commit} , payload){
        Transformation.postImage(payload)
        .then((res) => {
           commit("UPLOADIMAGE" , res.data)
        })
        .catch((err) => {console.log(err)})
    },
    posting({commit} , data){
        commit("LOADING")
        Transformation.post(data)
        .then(() => commit("POSTING"))
        .catch((err) => {console.log(err)})
    },
    deleteTransformation({commit} , data){
        commit("LOADING")
        Transformation.delete(data)
        .then(() => {
            commit("DELETESUCCESSFULLY")
        })
        .catch()
    }

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