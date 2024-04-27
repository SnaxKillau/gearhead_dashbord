<template lang="">
    <div>
        <Pie :data="data" :options="options"/>
    </div>
</template>
<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs';


ChartJS.register(ArcElement, Tooltip, Legend)
const options = {
  responsive: true,
  maintainAspectRatio: false
}
const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};
</script>
<style lang="">
    
</style>