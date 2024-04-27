import api from "./api"

export default {
    all(){
       return api.get('/condition')
    },
    post(data){
        return api.post("/condition/admin" , data)
    },
    delete(id){
        return api.delete(`/condition/admin/${id}`)
    }

}