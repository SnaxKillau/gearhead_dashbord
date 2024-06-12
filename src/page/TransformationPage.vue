<template lang="">
  <LoadingView v-if = "loadingTransformation"/>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
  <el-dialog v-model="imageView">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in img" :key="item">
        <img :src="item" class="object-cover w-full h-full" />
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
  <div class="container">
    <NavBar class="w-[215px]" />
    <h1 style="margin: 10px" class="text-2xl font-bold">Transformation</h1>
    <el-dialog v-model="dialogTableVisible" title="Add New Color" width="800">
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        :size="formSize"
        status-icon
      >
        <el-upload
          class="upload-demo"
          :http-request="uploadFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture"
        >
          <el-button class="bg-blue-700 text-white">Click to upload</el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
        <el-form-item>
          <el-button
            class="bg-[#5dbea3] text-white"
            type="primary"
            @click="nextBtn"
            style="margin-top: 10px"
          >
            Next
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="detialForm" title="Add New Color" width="800">
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        :size="formSize"
        status-icon
      >
        <el-form-item label="Model" :prop="item">
          <el-input v-model="ruleForm.model" />
        </el-form-item>
        <el-form-item label="Year" :prop="item">
          <el-input v-model.number="ruleForm.year" />
        </el-form-item>
        <el-form-item label="Unit" :prop="item">
          <el-input v-model.number="ruleForm.availableUnit" />
        </el-form-item>
        <el-form-item label="Price" :prop="item">
          <el-input v-model.number="ruleForm.price" />
        </el-form-item>
        <el-form-item label="Descriptions" :prop="item">
          <el-input v-model="ruleForm.descriptions" />
        </el-form-item>
        <el-form-item label="MPG" :prop="item">
          <el-input v-model.number="ruleForm.mpg" />
        </el-form-item>
        <el-form-item label="CO2" :prop="item">
          <el-input v-model.number="ruleForm.co2" />
        </el-form-item>
        <el-form-item label="power" :prop="item">
          <el-input v-model.number="ruleForm.power" />
        </el-form-item>
        <el-form-item label="Acceleration" :prop="item">
          <el-input v-model.number="ruleForm.acceleration" />
        </el-form-item>
        <el-form-item label="Top Speed" :prop="item">
          <el-input v-model.number="ruleForm.top_speed" />
        </el-form-item>
        <div>
          <label class="ml-4">Condition</label>
          <el-select
            v-model="ruleForm.condition_id"
            placeholder="Select"
            style="width: 495px"
            class="ml-4"
          >
            <el-option
              v-for="item in condition"
              :key="item.id"
              :label="item.descriptions"
              :value="item.id"
              :disabled="item.disabled"
            />
          </el-select>
        </div>
        <div class="mt-4">
          <label class="ml-4">Transmission</label>
          <el-select
            v-model="ruleForm.transmission_id"
            placeholder="Select"
            style="width: 450px"
            class="ml-4"
          >
            <el-option
              v-for="item in tranmission"
              :key="item.value"
              :label="item.descriptions"
              :value="item.id"
              :disabled="item.disabled"
            />
          </el-select>
        </div>
        <div class="mt-4">
          <label class="ml-4">Color</label>
          <el-select
            v-model="ruleForm.color_id"
            placeholder="Select"
            style="width: 510px"
            class="ml-4"
          >
            <el-option
              v-for="item in colorData"
              :key="item.value"
              :label="item.description"
              :value="item.id"
              :disabled="item.disabled"
            />
          </el-select>
        </div>
        <div class="mt-4">
          <label class="ml-4">Brand</label>
          <el-select
            v-model="ruleForm.brand_id"
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="Select"
            style="width: 510px"
            @input="handleSearch"
            :loading = "searchLoading"
            class="ml-4"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.description"
              :value="item.id"
              :disabled="item.disabled"
            />
          </el-select>
        </div>
      </el-form>
      <el-form-item>
        <el-button
          class="bg-[#5dbea3] text-white"
          type="primary"
          @click="nextBtn"
          style="margin-top: 10px"
        >
          Back
        </el-button>
        <el-button
          class="bg-[#5dbea3] text-white"
          type="primary"
          @click="submitForm(ruleFormRef)"
          style="margin-top: 10px"
        >
          Create
        </el-button>
      </el-form-item>
    </el-dialog>
    <div class="w-9/12 left-[250px] absolute top-20">
      <TableTransformation v-model="dialogTableVisible" />
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import TableTransformation from "@/components/TableTransformation.vue";
import NavBar from "@/components/NavBar.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import LoadingView from "@/components/LoadingView.vue";

const transformationHelpers = createNamespacedHelpers("transformation");
const conditionHelpers = createNamespacedHelpers("condition");
const tranmissionHelpers = createNamespacedHelpers("tranmission");
const colorHelpers = createNamespacedHelpers("color");
const brandHelpers = createNamespacedHelpers("brand")

const {
  useState: useTransformationState,
  useActions: useTransformationActions,
} = transformationHelpers;
const { useState: useConditionState, useActions: useConditionActions } =
  conditionHelpers;
const { useState: useTranmissionState, useActions: useTranmssionActions } =
  tranmissionHelpers;
const { useState: useColorState, useActions: useColorActions } = colorHelpers;
const { useState: useBrandState , useActions: useBrandActions} = brandHelpers;

const { condition } = useConditionState(["condition"]);
const { getCondition } = useConditionActions(["getCondition"]);

const {image, loadingTransformation} = useTransformationState(["image", "loadingTransformation"])
const { uploadImage, posting} = useTransformationActions(["uploadImage", "posting"]);

const { tranmission } = useTranmissionState(["tranmission"]);
const { getTranmission } = useTranmssionActions(["getTranmission"]);

const { colorData } = useColorState(["colorData"]);
const { getColor } = useColorActions(["getColor"])

const { options ,searchLoading} = useBrandState(["options", "searchLoading"])
const { getBrand, search } = useBrandActions(["getBrand" ,"search"])


onMounted(() => {
  getCondition(), getTranmission(), getColor() , getBrand();
});
const ruleFormRef = ref();
const dialogTableVisible = ref(false);
const uploadImg = ref(false);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const detialForm = ref(false);
const imageView = ref(false);
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
const uploadFile = (file) => {
  const { name } = file.file;
  const formData = new FormData();
  if (name != undefined) {
    console.log(file.file);
    formData.append("image", file.file);
    uploadImage(formData);
  }
  uploadImg.value = true;
};



const ruleForm = reactive({
  model: "",
  year: 0,
  availableUnit: 0,
  price: 0,
  descriptions: "",
  mpg: 0,
  co2: 0,
  power: 0,
  acceleration: 0,
  top_speed: 0,
  condition_id: 0,
  transmission_id: 0,
  brand_id: 0,
  color_id: 0,
  image_id: [],
});
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      ruleForm.image_id = Object.values(image.value)
      posting(ruleForm)
    } else {
      console.log("error submit!", fields);
    }
  });
};
const nextBtn = () => {
  dialogTableVisible.value = !dialogTableVisible.value;
  detialForm.value = !detialForm.value;
};
const inputText = ref("");
let typingTimer = null;
const typingTimeout = 1000; // Adjust timeout duration as needed

const handleSearch = (event) => {
  inputText.value = event.target.value;
  clearTimeout(typingTimer);
  typingTimer = setTimeout(typingTimeoutReached, typingTimeout);
};

const typingTimeoutReached = () => {
   search({description : inputText.value })
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
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
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
