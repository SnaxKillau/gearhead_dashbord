<template>
  <div
    v-if="imgHandle"
    class="fixed z-30 top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-50"
  >
    <el-carousel :interval="5000" arrow="always" class="w-2/4 h-3/4">
      <el-carousel-item
        v-for="item in transformationState[index]?.imageNames"
        :key="item"
        class="h-[30rem]"
      >
        <img :src="getImage(item)" alt="" class="w-full h-full object-fill" />
        <el-icon
          class="absolute top-5 right-5 bg-white w-7 h-7 shadow-md shadow-red-200 rounded-md"
          @click="imgHandle = false"
          ><Close
        /></el-icon>
      </el-carousel-item>
    </el-carousel>
  </div>
  <el-table :data="transformationState" style="width: 100%" max-height="750">
    <el-table-column fixed prop="id" label="ID" width="150" />
    <el-table-column prop="model" label="Model" width="120" />
    <el-table-column prop="year" label="Year" width="120" />
    <el-table-column prop="available_Unit" label="Available Unit" width="120" />
    <el-table-column prop="price" label="Price" width="120" />
    <el-table-column prop="descriptions" label="Descriptions" width="120" />
    <el-table-column prop="mpg" label="MPG" width="120" />
    <el-table-column prop="co2" label="CO2" width="120" />
    <el-table-column prop="power" label="Power" width="120" />
    <el-table-column prop="acceleration" label="Acceleration" width="120" />
    <el-table-column prop="top_Speed" label="Top Speed" width="120" />
    <el-table-column
      prop="transmissionDescriptions"
      label="Transmission"
      width="120"
    />
    <el-table-column
      prop="conditionDescriptions"
      label="Condition"
      width="120"
    />
    <el-table-column fixed="right" label="Operations" width="220">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="imageView(scope.$index)"
        >
          View Image
        </el-button>
        <el-popconfirm
          width="220"
          confirm-button-text="OK"
          cancel-button-text="No, Thanks"
          icon-color="#626AEF"
          title="Are you sure to delete this?"
          @confirm="confirmEvent(scope.row)"
        >
          <template #reference>
            <el-button link type="primary" size="small">Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="updateModelState"
    >Add Item</el-button
  >
</template>

<script setup>
import { ref, defineModel, onMounted } from "vue";
import { Close } from "@element-plus/icons-vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { imageApi } from "@/api/ImageApi";

const { useState, useActions } = createNamespacedHelpers("transformation");
const { transformationState } = useState(["transformationState"]);
const { getTransformation, deleteTransformation } = useActions([
  "getTransformation",
  "deleteTransformation",
]);
const imgHandle = ref(false);
const index = ref(0);

const getImage = (img) => {
  return `${imageApi}${img}`;
};
onMounted(() => {
  getTransformation();
});

const model = defineModel();

const updateModelState = () => {
  model.value = true;
};
const imageView = (id) => {
  (imgHandle.value = true), (index.value = id);
};

const confirmEvent = (index) => {
  deleteTransformation(index.id);
};
</script>
<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #f9fcff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #f8fafb;
}
</style>
