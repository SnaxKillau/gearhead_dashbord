import api from "./api"

export default {
    all(){
        return api.get('/order')
    },
    accept(data){
        return api.post('/notification/admin/orderAccept' , data)
    },
    deny(data){
        return api.post('/notification/admin/orderDeny' , data)
    }
}