<template>
  <LoadingView v-if = "loading"/>
  switch parent border: <el-switch v-model="parentBorder" /> switch child
  border: <el-switch v-model="childBorder" />
  <el-table :data="invoice" :border="parentBorder" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4" class="ml-5">
          <p m="t-0 b-2">Name: {{ props.row.name }}</p>
          <p m="t-0 b-2">Email: {{ props.row.email }}</p>
          <p m="t-0 b-2">Phome Number: {{ props.row.phoneNumber }}</p>
          <p m="t-0 b-2">Address: {{ props.row.address }}</p>
          <p m="t-0 b-2">Total: {{ props.row.total }}</p>
          <h3 class="mt-3">Products</h3>
          <el-table :data="props.row.transformationSale" :border="childBorder">
            <el-table-column label="Name" prop="name" />
            <el-table-column label="Unit" prop="unit" />
            <el-table-column label="Price" prop="price" />
            <el-table-column label="total" prop="total" />
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Date" prop="created" />
    <el-table-column label="Invoice ID" prop="invoiceId" />
  </el-table>
</template>

<script setup>
import { ref , onMounted} from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import LoadingView from "@/components/LoadingView.vue";

const { useState, useActions } = createNamespacedHelpers("invoice");

const { getInvoice } = useActions([
 "getInvoice"
]);
const { invoice, loading } = useState(["invoice", "loading"]);
onMounted(() => {
  getInvoice()
});

const parentBorder = ref(false);
const childBorder = ref(false);

</script>
