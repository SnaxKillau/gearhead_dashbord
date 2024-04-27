<template>
<div>
  <router-view v-if = "isSmallScreen"/>
  <el-empty v-if = "!isSmallScreen" :image-size="200" description = "Please use this on computer view" />
</div> 
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      isSmallScreen: window.innerWidth > 768
    };
  },
  methods: {
    onResize() {
      this.isSmallScreen = window.innerWidth > 768;
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
}
   


</script>

<style>
</style>
