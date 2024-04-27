import api from "./api"

export default {
    all(){
        return api.get('/sale/month')
    }
}