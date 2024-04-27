<template>
  <el-table :data="condition" class="relative top-24 right-[40px] w-[40rem]">
    <el-table-column label="Date" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.created }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Condition" width="180">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>ID: {{ scope.row.id }}</div>
            <div>DESCRIPTION: {{ scope.row.descriptions }}</div>
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

const { useState, useActions } = createNamespacedHelpers("condition");

const { getCondition, deleteCondition } = useActions(["getCondition", "deleteCondition"])
const { condition, deleteState } = useState(["condition", "deleteState"])

onMounted(() => {
    getCondition()
});
watch(deleteState , () => {
  getCondition()
})
const confirmEvent = (index) => {
  deleteCondition(index.id)
};
</script>
