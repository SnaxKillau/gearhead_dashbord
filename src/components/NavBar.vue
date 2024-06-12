<template lang="">
     <nav>
      <ul>
        <li>
          <a href="/" class="logo">
            <img :src = "logo" alt="">
            <span class="nav-item">DashBoard</span>
          </a>
        </li>
        <li><router-link to = "/"><el-icon><House /></el-icon><span class=" ml-2 font-semibold">Home</span></router-link></li>
        <li><router-link to = "/brand"><el-icon><TakeawayBox /></el-icon><span class=" ml-2 font-semibold">Brand</span></router-link></li>
        <li><router-link to = "/color"><el-icon><BrushFilled /></el-icon><span class=" ml-2 font-semibold">Color</span></router-link></li>
        <li><router-link to = "/caditionandtransmission"><el-icon><SetUp /></el-icon><span class=" ml-2 font-semibold">Condition</span></router-link></li>
        <li><router-link to = "/invoice"><el-icon><Document /></el-icon><span class=" ml-2 font-semibold">Invoice</span></router-link></li>
        <li><router-link to = "/notification"><el-icon><ChatSquare /></el-icon><span class=" ml-2 font-semibold">Notification</span></router-link></li>
        <li><router-link to = "/order"><el-icon><Handbag /></el-icon><span class=" ml-2 font-semibold">Order</span></router-link></li>
        <li><router-link to = "/transformation"><el-icon><SetUp /></el-icon><span class=" ml-2 font-semibold">Transformation</span></router-link></li>
        <button @click = "logoutHandler"><div class="logout"><i class="fas fa-sign-out-alt"></i><span class=" ml-2 font-semibold">Log out</span></div></button>
      </ul>
    </nav>
</template>
<script setup>
import { House ,TakeawayBox, SetUp, Handbag, BrushFilled, Document, ChatSquare } from "@element-plus/icons-vue";
import { RouterLink } from "vue-router";
import logo from "../assets/image/insider.jpg"
import { useRouter } from 'vue-router';

const nav = useRouter()
const logoutHandler = () => {
  localStorage.removeItem("token", null);
  nav.push("/login")
}
</script>
<style lang="">
    
</style>