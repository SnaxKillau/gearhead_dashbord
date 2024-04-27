<template lang="html">
  <div class="container">
    <NavBar class=" w-[260px]"/>
    <section class="main">
      <div class="main-top">
        <h1 class="text-2xl font-bold">Home</h1>
        <i class="fas fa-user-cog"></i>
      </div>
      <div class="main-skills">
        <div class="card" v-for="(skill, index) in skills" :key="index">
          <div class="card-text">
            <h3>{{ skill.title }}</h3>
            <p>{{ skill.description }}</p>
          </div>
          <div class="card-icon" :class="skill.background">
            <img :src="skill.icon" alt="pic" />
          </div>
        </div>
      </div>

      <section class="main-course">
        <h1>Products Sale</h1>
        <Transition name="slide-fade">
          <div class="course-box" v-show="activeTab === 0">
            <ul>
              <li
                v-for="(tab, index) in courseTabs"
                :key="index"
                :class="{ active: activeTab === index }"
                @click="changeTab(index)"
              >
                {{ tab }}
              </li>
            </ul>
            <div class="course">
              <AxeChart :state="saleMonthly"/>
              <div class="w-56 relative left-16 bottom-2">
                <PieChart />
              </div>
            </div>
          </div>
        </Transition>

        <Transition name="slide-fade-down">
          <div class="course-box" v-show="activeTab === 1">
            <ul>
              <li
                v-for="(tab, index) in courseTabs"
                :key="index"
                :class="{ active: activeTab === index }"
                @click="changeTab(index)"
              >
                {{ tab }}
              </li>
            </ul>
            <div class="course">
              <AxeChart/>
            </div>
          </div>
        </Transition>
      </section>
    </section>
  </div>
</template>
<script>
import AxeChart from "@/components/AxeChart.vue";
import PieChart from "@/components/PieChart.vue";
import packageIcom from "../assets/image/package.png";
import chartIcon from "../assets/image/bar-chart.png";
import pieChaetIcon from "../assets/image/graph.png";
import dollarIcon from "../assets/image/dollar.png";
import NavBar from "@/components/NavBar.vue";
import { mapActions, mapState} from "vuex";

export default {
  components: {
    AxeChart,
    PieChart,
    NavBar,
  },
  computed:{
    ...mapState('report' , ['saleMonthly']),
  },
  data() {
    return {
      skills: [
        {
          title: "Order",
          description: "Join Over 1 million Students.",
          icon: packageIcom,
          background: "",
        },
        {
          title: "Transformation",
          description: "Join Over 3 million Students.",
          icon: chartIcon,
          background: "green-background",
        },
        {
          title: "Accessory",
          description: "Join Over 2 million Students.",
          icon: pieChaetIcon,
          background: "orange-background",
        },
        {
          title: "Income",
          description: "Join Over 1 million Students.",
          icon: dollarIcon,
          background: "orange-background",
        },
      ],
      courseTabs: ["Products", "Accessery"],
      activeTab: 0, // Set the default active ta
    };
  },
  mounted(){
    this.getMonthly(),
    this.getBrand()
  },
  methods: {
    changeTab(index) {
      this.activeTab = index;
      console.log(index);
    },
    ...mapActions('report',['getMonthly']),
    ...mapActions('brand' , ['getBrand'])

  },
};
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

nav {
  position: relative;
  top: 0;
  bottom: 0;
  height: 100vh;
  left: 0;
  background: #fff;
  width: 280px;
  overflow: hidden;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
}
.logo {
  text-align: center;
  display: flex;
  margin: 10px 0 0 10px;
}
.logo img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-down-enter-active {
  transition: all 0.3s ease-out;
  transition-delay: 0.3s;
}

.slide-fade-down-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  transition-delay: 0.3s;
}

.slide-fade-down-enter-from,
.slide-fade-down-leave-to {
  transform: translateX(20px);
  opacity: 0;
  transition-delay: 0.3s;
}
.logo span {
  font-weight: bold;
  padding-left: 15px;
  font-size: 18px;
  text-transform: uppercase;
}
a {
  position: relative;
  color: rgb(85, 83, 83);
  font-size: 14px;
  display: table;
  width: 280px;
  padding: 10px;
}
nav .fas {
  position: relative;
  width: 70px;
  height: 40px;
  top: 14px;
  font-size: 20px;
  text-align: center;
}
.nav-item {
  position: relative;
  top: 12px;
  margin-left: 10px;
}
a:hover {
  background: #eee;
}
.logout {
  position: absolute;
  bottom: 0;
}

/* Main Section */
.main {
  position: relative;
  padding: 20px;
  width: 100%;
}
.main-top {
  display: flex;
  width: 100%;
}
.main-top i {
  position: absolute;
  right: 0;
  margin: 10px 30px;
  color: rgb(110, 109, 109);
  cursor: pointer;
}
.main-skills {
  display: flex;
  margin-top: 20px;
}
.main-skills .card {
  width: 25%;
  margin: 10px;
  background: #fff;
  text-align: center;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
.card-text {
  grid-column: span 4;
}
.main-skills .card h3 {
  margin: 10px;
  text-transform: capitalize;
  text-align: start;
}
.main-skills .card p {
  font-size: 12px;
}
.main-skills .card img {
  width: 20px;
}

/* Courses */
.main-course {
  margin-top: 20px;
  text-transform: capitalize;
}
.course-box {
  width: 100%;
  height: 350px;
  padding: 10px 10px 30px 10px;
  margin-top: 10px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
}
.course-box ul {
  list-style: none;
  display: flex;
}
.course-box ul li {
  margin: 10px;
  color: gray;
  cursor: pointer;
}
.course-box ul .active {
  color: #000;
  border-bottom: 1px solid #000;
}
.course-box .course {
  width: 600px;
  height: 280px !important;
  display: flex;
}
.card-icon {
  display: grid;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  height: 50px;
  margin-top: 50%;
  background-color: #87ceeb;
}
.box {
  width: 33%;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background: rgb(235, 233, 233);
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
}
.green-background {
  background-color: #baf8ba !important;
}
.orange-background {
  background-color: #ffcd80 !important;
}
.red-background {
  background-color: #f67280;
}
.html {
  color: rgb(25, 94, 54);
}
.css {
  color: rgb(104, 179, 35);
}
.js {
  color: rgb(28, 98, 179);
}
</style>
