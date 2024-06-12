<template>
  <el-table :data="filterTableData" class="relative top-24 right-16 w-[60rem]">
    <el-table-column label="Date" prop="created" class="text-2xl" />
    <el-table-column label="Name" prop="description" />
    <el-table-column label="Address">
      <template v-slot="{ row }">
        <img
          :src="getImage(row)"
          alt="Address Image"
          style="width: 50px; height: auto"
        />
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-popconfirm
          confirm-button-text="Yes"
          cancel-button-text="No"
          icon-color="#FF0000"
          title="Are you sure to delete this?"
          @confirm="confirmEvent(scope.row)"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-button class="delete-button">Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
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
      <el-form-item label="Brand name" prop="name">
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
          type="primary"
          class="bg-green-500 text-white"
          @click="submitForm()"
          style="margin-top: 10px"
        >
          Update
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { computed, ref, reactive, onMounted } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { imageApi } from "@/api/ImageApi";

const { useState, useActions } = createNamespacedHelpers("brand");
const fileList = ref([]);
const dialogImageUrl = ref("");
const editIndex = ref()
const ruleForm = reactive({
  name: "",
});
const data = ref({
  url: "",
});
const { getBrand, deleteBrand, editBrand } = useActions(["getBrand", "deleteBrand", "editBrand"]);
const getImage = (row) => {
  return `${imageApi}${row.imagePath}`;
};
onMounted(() => {
  getBrand();
});
const { brandData } = useState(["brandData"]);
const dialogVisible = ref(false);
const search = ref("");
const dialogTableVisible = ref(false);
const deleteOldImage = ref(false);
const filterTableData = computed(() =>
  brandData.value.filter(
    (data) =>
      !search.value ||
      data.description.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index, row) => {
  ruleForm.name = row.description;
  editIndex.value = row.id
  fileList.value.pop();
  data.value = {
    url: getImage(row),
  };

  fileList.value.push(data.value);

  dialogTableVisible.value = true;
};
const confirmEvent = (row) => {
  deleteBrand(row.id);
};
const cancelEvent = () => {
  console.log("cancel!");
};
const convertDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  const formatedDate = `${year}-${month}-${day}`;
  return formatedDate;
};
const submitForm = () => {
  const date = convertDate(Date.now());
  if ((fileList.value.length !== 0) & deleteOldImage.value) {
    const formData = new FormData();
    formData.append("description", ruleForm.name);
    console.log(ruleForm.name)
    formData.append("created", date.toString());
    console.log(date)
    console.log(fileList.value)
    fileList.value.forEach((file) => {
      formData.append("file", file.raw);
    });
    editBrand({id : 1, newData : formData});
  }
  else{
    const formData = new FormData();
    formData.append("description", ruleForm.name);
    console.log(ruleForm.name)
    formData.append("created", date.toString());
    console.log(date)
    formData.append('file', new Blob([], { type: 'application/octet-stream' }), 'empty.txt');
    editBrand({id : 1, newData : formData});
  }
};
const handleRemove = (uploadFile, uploadFiles) => {
  deleteOldImage.value = true;
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
</script>
<style>
.el-popconfirm__action > button.el-button--primary {
  color: white; /* Change this to the desired text color */
  background-color: red;
}
.delete-button {
  color: red; /* Change this to the desired text color */
}
</style>
