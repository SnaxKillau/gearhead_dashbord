import { createRouter, createWebHistory  } from "vue-router"
import Home from "../page/HomePage.vue"
import Brand from "../page/BrandPage.vue"
import Color from "../page/ColorPage.vue"
import Order from "../page/OrderPage.vue"
import Transformation from "@/page/TransformationPage.vue"
import CaditionAndTransmission from "@/page/CaditionAndTransmissionPage.vue"
import LoginPage from "@/page/LoginPage.vue"
import axios from "axios"
const routes = [
    {
        path : "/",
        name: "Home",
        component : Home
    },
    {
        path : "/brand",
        name: "Brand",
        component : Brand
    },
    {
        path : "/color",
        name: "Color",
        component : Color
    },
    {
        path : "/order",
        name: "Order",
        component : Order
    },
    {
        path : "/transformation",
        name : "transformation",
        component : Transformation
    },
    {
        path : "/caditionandtransmission",
        name : "CaditionAndTransmission",
        component : CaditionAndTransmission

    },
    {
        path : "/login",
        name : "LoginPage",
        component : LoginPage
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.path === '/login') {
        // If the user is already on the login page, allow navigation
        next();
    } else if (!token) {
        // If there's no token and the user is not on the login page, redirect to login
        next("/login");
    } else {
        // If there's a token and the user is not on the login page, validate it
        axios.get("http://127.0.0.1:8072/auth/validate?token=" + token)
            .then(() => {
                console.log("Token found and valid, allowing navigation.");
                next();
            })
            .catch(() => {
                // If token validation fails, redirect to login
                next("/login");
            });
    }
});


export default router