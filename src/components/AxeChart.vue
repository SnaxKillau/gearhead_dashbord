<template>
  <Line
    :data="config.data"
    :options="config.options"
    v-if="data.datasets[0].data.length > 0"
  />
</template>
/
<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { watch, defineProps } from "vue";
import { Line } from "vue-chartjs";

const props = defineProps({
  state: Array,
});
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

watch(
  () => props.state,
  (newValue) => {
    data.labels = Object.keys(newValue);
    data.datasets[0].data = Object.values(newValue);
  }
);
const data = {
  labels: [],
  datasets: [
    {
      label: "Selling Transfomation",
      data: [],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    scales: {
      y: {
        // defining min and max so hiding the dataset does not change scale range
        min: 0,
        max: 100,
      },
    },
  },
};
</script>
