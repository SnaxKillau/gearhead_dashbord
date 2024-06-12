<template lang="">
  <el-alert
    title="Error alert"
    type="error"
    description="Condition's using transfotramtion "
    show-icon
    v-if="conditonError"
  />
  <el-alert
    title="Error alert"
    type="error"
    description="Transmission's using transfotramtion "
    show-icon
    v-if="tranmissionError"
  />
  <LoadingView v-if="loading" />
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
  <div class="container">
    <NavBar class="w-[220px]" />
    <h1 style="margin: 10px" class="text-2xl font-bold">Condition</h1>
    <el-button
        plain
        @click="dialogTableVisible = true"
        class="absolute top-14 left-[244px] z-20 bg-[#5dbea3] text-white"
      >
        Add Condition
      </el-button>
      <el-button
        plain
        @click="transitionVisible = true"
        class="absolute top-14 left-[380px] z-20 bg-[#5dbea3] text-white"
      >
        Add Transmission
      </el-button>
    <div class = "absolute left-72">
      <el-dialog v-model="dialogTableVisible" title="Add Condition" width="800">
        <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          :size="formSize"
          status-icon
        >
          <el-form-item label="Type" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item>
            <el-button
              class="bg-[#5dbea3] text-white"
              type="primary"
              @click="submitConditionForm(ruleFormRef)"
              style="margin-top: 10px"
            >
              Create
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <div class="w-full">
        <TableCondition />
      </div>
      <el-dialog v-model="transitionVisible" title="Add New Tranmission" width="800">
        <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          :size="formSize"
          status-icon
        >
          <el-form-item label="Type" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
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
      <div class="w-full mt-10">
        <TableTranmission/>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import TableCondition from "@/components/TableCondition.vue"
import TableTranmission from "@/components/TableTranmission.vue"
import NavBar from "@/components/NavBar.vue";
import LoadingView from "@/components/LoadingView.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const tranmissionHelpers = createNamespacedHelpers("tranmission");
const conditionHelpers = createNamespacedHelpers("condition");

const { useActions : useConditionActions, useState : useConditionState } = conditionHelpers;
const { useActions : useTranmssionActions, useState: useTranmssionState } = tranmissionHelpers;

const { postTranmission } = useTranmssionActions(["postTranmission"])
const { tranmissionError } = useTranmssionState(["tranmissionError"])

const { postCondition } = useConditionActions(["postCondition"])
const { conditonError } = useConditionState(["conditonError"])

const ruleFormRef = ref();
const dialogTableVisible = ref(false);
const transitionVisible = ref(false);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);


const convertDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  const formatedDate = `${year}-${month}-${day}`;
  return formatedDate;
};
const ruleForm = reactive({
  name: "",
});
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const date = convertDate(Date.now());
      postTranmission({
        descriptions: ruleForm.name,
        created: date.toString(),
      });
      ruleForm.name = ''
    } else {
      console.log("error submit!", fields);
    }
  });
};
const submitConditionForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const date = convertDate(Date.now());
      postCondition({
        descriptions: ruleForm.name,
        created: date.toString(),
      });
      ruleForm.name = ''
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
