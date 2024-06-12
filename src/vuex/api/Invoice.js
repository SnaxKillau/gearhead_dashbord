import api from "./api";

export default {
    all(){
        return api.get("/invoice")
    },
        
}