import api from "./api"

export default {
    all(){
       return api.get('/transmission')
    },
    posting(data){
        return api.post("/transmission/admin" , data)
    },
    delete(id){
        return api.delete(`/transmission/admin/${id}`)
    }
}