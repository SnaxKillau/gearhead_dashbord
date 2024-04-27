import api from "./api";

export default {
    all(){
        return api.get("/color")
    },
    posting(data){
        return api.post("/color/admin" , data)
    },
    delete(id){
        return api.delete(`/color/admin/${id}`)
    },
    edit(id , data){
        return api.patch(`/color/admin/${id}` , data)
    }
        
    
}