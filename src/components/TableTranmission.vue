<template>
  <el-table :data="tranmission" class="relative top-24 right-[40px] w-[40rem]">
    <el-table-column label="Date" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Tranmsssion" width="180">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>ID: {{ scope.row.id }}</div>
            <div>Type: {{ scope.row.descriptions }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.descriptions }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
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
</template>

<script setup>
import { onMounted, watch } from "vue";
import { Timer } from "@element-plus/icons-vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";

const { useState, useActions } = createNamespacedHelpers("tranmission");

const { getTranmission, deleteTranmission } = useActions(["getTranmission" , "deleteTranmission"]);
const { tranmission, deleteState } = useState(["tranmission" , "deleteState"]);
onMounted(() => {
  getTranmission()
});
watch(deleteState , () => {
  getTranmission()
})

const confirmEvent = (index) => {
  deleteTranmission(index.id);
};

</script>
