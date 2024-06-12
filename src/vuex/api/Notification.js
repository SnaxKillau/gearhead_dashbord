import api from "./api";

export default {
    all(){
        return api.get("/notification/all")
    },
    post(data){
        return api.post("/notification" , data)
    },
    postCommunicate(data){
        return api.post("/notification/communicate" , data)
    }   
}