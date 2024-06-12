<template lang="">
    <div class="container">
      <NavBar class="w-[215px]" />
      <h1 style="margin: 10px" class="text-2xl font-bold">Notification</h1>
      <div class="w-9/12 left-[250px] absolute top-20">
        <Notification/>
      </div>
    </div>
  </template>
  <script setup>
 
  import NavBar from "@/components/NavBar.vue";
  import Notification from "@/components/TableNotification.vue";
  
  
  </script>
  
  <style lang="css">
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700");
  * {
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    text-decoration: none;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  body {
    background: #dfe9f5;
  }
  .container {
    display: flex;
  }
  .btn_show {
    position: relative;
    top: 75px;
    right: 100px;
  }
  
  /* Main Section */
  </style>
  