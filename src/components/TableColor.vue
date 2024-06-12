<template>
  <el-table
    :data="filterTableData"
    class="relative top-24 right-[55px] w-[60rem]"
  >
    <el-table-column label="Date" prop="created" />
    <el-table-column label="Name" prop="description" />
    <el-table-column label="Color">
      <template v-slot="{ row }">
        <div
          :style="{ backgroundColor: row.colorCode }"
          class="w-6 h-6 ml-2 rounded-md border-[1px] border-red-700"
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
      <el-form-item label="Brand name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Color code" prop="code">
        <el-input v-model="ruleForm.code" />
      </el-form-item>
      <div
        :style="{ backgroundColor: ruleForm.code }"
        class="w-6 h-6 ml-2 rounded-md border-[1px] border-red-700"
      />

      <el-form-item>
        <el-button
          type="primary"
          class="bg-green-500 text-white"
          @click="submitForm(ruleFormRef)"
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

const { useState, useActions } = createNamespacedHelpers("color");

const { colorData } = useState(["colorData"]);
const { getColor, deleteColor, editColor } = useActions([
  "getColor",
  "deleteColor",
  "editColor",
]);

onMounted(() => {
  getColor();
});
const index = ref(0);
const search = ref("");
const dialogTableVisible = ref(false);
const filterTableData = computed(() =>
  colorData.value.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (id, row) => {
  dialogTableVisible.value = true;
  ruleForm.name = row.description;
  ruleForm.code = row.colorCode;
  index.value = row.id;
  console.log(index.value);
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
  editColor({
    id: index.value,
    newData: {
      description: ruleForm.name,
      colorCode: ruleForm.code,
      created: date.toString(),
    },
  });
};
const confirmEvent = (row) => {
  deleteColor(row.id);
};
const cancelEvent = () => {
  console.log("cancel!");
};
const ruleForm = reactive({
  name: "",
  code: "",
});
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
