<template lang="">
  <el-alert
    title="Error alert"
    type="error"
    description="Brand's using transfotramtion "
    show-icon
    v-if="error"
  />
  <LoadingView v-if="Loading" />
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
  <div class="container">
    <NavBar class="w-[280px]" />
    <h1 style="margin: 10px" class="text-2xl font-bold">Brand</h1>
    <el-button
      plain
      @click="dialogTableVisible = true"
      class="absolute top-14 left-[244px] bg-[#5dbea3] text-white"
    >
      Add Brand
    </el-button>
    <el-dialog v-model="dialogTableVisible" title="Add New Brand" width="800">
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        :size="formSize"
        status-icon
      >
        <el-form-item label="Brand name" prop="name" :rules="rules">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-upload
          v-model:file-list="fileList"
          list-type="picture-card"
          drag
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="1"
          :http-request="uploadFile"
        >
          <h1 class="drag-btn">Drop or click</h1>
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-form-item>
          <el-button
            class="bg-[#5dbea3] text-white"
            type="primary"
            @click="submitForm(ruleFormRef)"
            style="margin-top: 10px"
          >
            Create
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="w-full">
      <TableBrand />
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import LoadingView from "@/components/LoadingView.vue";
import { Plus } from "@element-plus/icons-vue";
import TableBrand from "@/components/TableBrand.vue";
import NavBar from "@/components/NavBar.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";

const { useState, useActions } = createNamespacedHelpers("brand");
const fileList = ref([]);
const dialogImageUrl = ref("");
const ruleFormRef = ref();
const dialogTableVisible = ref(false);
const dialogVisible = ref(false);
const rules = ref({
  required: true,
  message: "Name can not be null",
  trigger: "blur",
});
const { getBrand, posting, cancle_error } = useActions([
  "getBrand",
  "posting",
  "cancle_error",
]);
onMounted(() => {
  getBrand();
});
const { brand, Loading, error } = useState(["brand", "Loading", "error"]);
watch(error, () => {
  if (error.value) {
    setTimeout(() => {
      cancle_error();
    }, 5000);
  }
});
console.log(brand.value);
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};
const uploadFile = (file) => {
  const { name, url } = file;

  const uploadedFile = { name, url };
  if (file.name != undefined) {
    fileList.value.push(uploadedFile);
  }
};

const ruleForm = reactive({
  name: "",
});
const convertDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  const formatedDate = `${year}-${month}-${day}`;
  return formatedDate;
};
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const date = convertDate(Date.now());
      const formData = new FormData();
      formData.append("description", ruleForm.name);
      formData.append("created", date.toString());
      fileList.value.forEach((file) => {
        formData.append("file", file.raw);
      });
      posting(formData);
    } else {
      console.log("error submit!", fields);
    }
  });
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
.btn_show {
  position: relative;
  top: 75px;
  right: 100px;
}

.el-alert {
  position: absolute;
  right: 10px;
  width: 300px;
  height: 75px;
  margin: 20px 0 0;
}
.drag-btn {
  font-size: 10px;
  margin-bottom: 10px;
  font-weight: 100;
}
.brand-form {
  width: 100%;
  height: 20%;
  display: flex;
}
/* Main Section */
</style>
