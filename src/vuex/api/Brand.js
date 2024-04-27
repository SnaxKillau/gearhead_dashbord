import axios from "axios";
import api from "./api"

const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': 'Bearer '+ localStorage.getItem("token")
    
};
export default {
    all(){
        return api.get('/brand')
    },
    posting(data){
        return axios.post("http://127.0.0.1:8072/api/brand/admin", data, {headers})
    },
    delete(id){
        return api.delete(`/brand/admin/${id}`)
    },
    edit(id, data){
        console.log(data)
        return api.patch(`/brand/admin/${id}`, data)
    },
    search(data){
        return api.post('/brand/search', data)
    }

}