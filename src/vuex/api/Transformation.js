import axios from "axios";
import api from "./api"

const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': 'Bearer '+ localStorage.getItem("token")
    
};
export default {
    all(){
       return api.get('/transformation/filter')
    },
    postImage(data){
        return axios.post("http://127.0.0.1:8072/api/image/transformation", data, {headers});
    },
    post(data){
        return api.post("/transformation/admin", data)
    },
    delete(id){
        return api.delete(`/transformation/admin/${id}`)
    }
}