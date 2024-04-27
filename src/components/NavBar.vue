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
        <li><router-link to = "/transformation"><el-icon><SetUp /></el-icon><span class=" ml-2 font-semibold">Transformation</span></router-link></li>
        <li><router-link to = "/brand"><el-icon><TakeawayBox /></el-icon><span class=" ml-2 font-semibold">Brand</span></router-link></li>
        <li><router-link to = "/color"><el-icon><SetUp /></el-icon><span class=" ml-2 font-semibold">Color</span></router-link></li>
        <li><router-link to = "/order"><el-icon><Handbag /></el-icon><span class=" ml-2 font-semibold">Order</span></router-link></li>
        <li><router-link to = "/caditionandtransmission"><el-icon><BrushFilled /></el-icon><span class=" ml-2 font-semibold">Condition</span></router-link></li>
        <li><a href="" class="logout"><i class="fas fa-sign-out-alt"></i><span class=" ml-2 font-semibold">Log out</span></a></li>
      </ul>
    </nav>
</template>
<script setup>
import { House ,TakeawayBox, SetUp, Handbag, BrushFilled } from "@element-plus/icons-vue";
import { RouterLink } from "vue-router";
import logo from "../assets/image/insider.jpg"
</script>
<style lang="">
    
</style>