<template lang="">
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2 rounded-full"
          :src="logo"
          alt="logo"
        />
        Insider
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                type="text"
                name="email"
                id="email"
                v-model = "email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="username"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                v-model = "password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <button
              @click = "login"
              class="w-full text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <div v-if = "incorrect" className = " text-center font-medium text-xs text-red-700">Oops! It seems the username or password you entered is incorrect. Please double-check and try again.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import logo from "../assets/image/insider.jpg";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';

const email = ref("")
const password = ref("")
const incorrect = ref(false)
const nav = useRouter()
const login = () => {
  incorrect.value = false;
  axios.post("http://127.0.0.1:8072/auth/token" , {
    "username" : email.value,
    "password" : password.value
  }).then((res) => {
    localStorage.setItem("token" , res.data)
    axios.get(`http://127.0.0.1:8072/auth/currentUser?token=${res.data}`).then((res) => {
            localStorage.setItem("currentUser", res.data);
            nav.push('/');
    });
  })
  .catch(() => {incorrect.value = true})
}

</script>
<style lang=""></style>
