import axios from "axios";

const api = axios.create({
    baseURL : 'http://127.0.0.1:8072/api',
    headers :{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem("token")
    }
})
export default api;