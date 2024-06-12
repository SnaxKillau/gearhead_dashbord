<template>
  <div
    v-if="imgHandle"
    class="fixed z-30 top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-50"
  >
    <el-carousel :interval="5000" arrow="always" class="w-2/4 h-3/4">
      <el-carousel-item class="h-[30rem]">
        <img
          :src="imageApi.concat(path)"
          alt=""
          class="w-full h-full object-fill"
        />
        <el-icon
          class="absolute top-5 right-5 bg-white w-7 h-7 shadow-md shadow-red-200 rounded-md"
          @click="imgHandle = false"
          ><Close
        /></el-icon>
      </el-carousel-item>
    </el-carousel>
  </div>
  <LoadingView v-if = "Loading"/>
  <el-table :data="order" style="width: 100%" max-height="750">
    <el-table-column fixed prop="created" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="userEmail" label="User_Email" width="200" />
    <el-table-column prop="source" label="Product Source" width="200" />
    <el-table-column prop="address" label="Address" width="200" />
    <el-table-column  label="Image" width="120">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="imageView(scope.$index)"
        >
          View Image
        </el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="Operations" width="200">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent = "accetHandle(scope.$index)" v-if=  "!scope.row.accept"> Accept </el-button>
        <el-popconfirm
          width="220"
          confirm-button-text="OK"
          cancel-button-text="No, Thanks"
          icon-color="#626AEF"
          title="Are you sure to deny this?"
          @confirm="confirmEvent(scope.row)"
        >
          <template #reference>
            <el-button link type="primary" size="small" v-if=  "!scope.row.accept">Deny</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogTableVisible" title="Set the Price" width="800">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Price" prop="price">
        <el-input v-model="price" type="number" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="bg-green-500 text-white"
          style="margin-top: 10px"
          @click.prevent = "accetBtn"
        >
          Accept
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { imageApi } from "@/api/ImageApi";
import { Close } from "@element-plus/icons-vue";
import LoadingView from "@/components/LoadingView.vue";

const { useState, useActions } = createNamespacedHelpers("order");
const { getOrder, accept, deny} = useActions(["getOrder", "accept", "deny"]);
const { order, Loading } = useState(["order", "Loading"]);

const dialogTableVisible = ref(false);
const price = ref(0)
const imgHandle = ref(false);
const convertDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  const formatedDate = `${year}-${month}-${day}`;
  return formatedDate;
};

const path  = ref("")
const index = ref()
onMounted(() => {
  getOrder();
});
const imageView = (number) => {
  path.value = order.value[number].imagePath;
  console.log(path.value)
  imgHandle.value = true;
};
const accetHandle = (num) => {
  index.value = num
  dialogTableVisible.value = true
}
const confirmEvent = (row) => {
  deny({
    id: row.id,
    senderId : row.user_id,
    created : convertDate(Date.now())
  })
}
const accetBtn = () => {
  const select = order.value[index.value]
  accept({
    id : select.id,
    price : price.value,
    senderId : localStorage.getItem("currentUser"),
    created : convertDate(Date.now())
  })
  dialogTableVisible.value = false;
}
</script>
