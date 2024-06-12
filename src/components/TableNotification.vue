<template>
      <LoadingView v-if = "loading"/>
  <el-dialog
    v-model="notiHandle"
    title="Notification"
    width="800px"
    :style="{ height: '500px', 'max-height': '100%' }"
  >
    <div style="height: 300px; overflow-y: auto">
      <div ref="contentDivRef" style="max-width: 100%; padding: 16px">
          <div>
            <el-divider content-position="left">{{  parent.senderUsername }}</el-divider>
            <span>
              {{ parent.message }}
            </span>
            <el-divider>
              <el-icon><star-filled /></el-icon>
            </el-divider>
          </div>
        </div>
      <div v-for="data in children" :key = "data.id">
        <div ref="contentDivRef" style="max-width: 100%; padding: 16px">
          <div>
            <el-divider content-position="left">{{ data.senderUsername }}</el-divider>
            <span>
             {{ data.message }}
            </span>
            <el-divider>
              <el-icon><star-filled /></el-icon>
            </el-divider>
          </div>
        </div>
      </div>
    </div>
    <el-input
    v-model="message"
    style="width: 90%"
    :rows="2"
    type="textarea"
    placeholder="Please input"
  />
  <el-button type="info" :icon="Message" circle  class = " bg-green-600 ml-5" @click.prevent = "post"/>
  </el-dialog>
  <el-table :data="notification" style="width: 100%">
    <el-table-column prop="created" label="Date" width="180" />
    <el-table-column prop="senderUsername" label="Name" width="180" />
    <el-table-column prop="senderEmail" label="Email" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="viewNoti(scope.$index)"
        >
          View Detail
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { StarFilled, Message } from "@element-plus/icons-vue";

import { createNamespacedHelpers } from "vuex-composition-helpers";
import LoadingView from "@/components/LoadingView.vue";

const { useState, useActions } = createNamespacedHelpers("notification");

const { getNotication, postNotification, postCommunicate } = useActions(["getNotication", "postNotification", "postCommunicate"]);
const { notification , loading} = useState(["notification" , "loading"]);
const notiHandle = ref(false);
const children = ref([])
const message = ref("")
const parent = ref({})

onMounted(() => {
  getNotication();
});
const viewNoti = (index) => {
  notiHandle.value = true
  children.value = notification.value[index].children
  parent.value = notification.value[index]
}
const convertDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  const formatedDate = `${year}-${month}-${day}`;
  return formatedDate;
};
const post = () => {
  if(parent.value.order === null){
    postCommunicate({
      message : message.value,
      senderId : localStorage.getItem("currentUser"),
      confirmMessage : false,
      accepted : false,
      notificationId  : parent.value.id,
      seen : false,
      created  : convertDate(Date.now())
    })
      }   
       else{
        postNotification({
    message : message.value,
    orderId : parent.value.order.id,
    senderId  : localStorage.getItem("currentUser"),
    receiverId : parent.value.receiverId,
    confirmMessage : false,
    accepted : false,
    notificationId  : parent.value.id,
    seen : false,
    created  : convertDate(Date.now())
  })
  }

  notiHandle.value = false;
  message.value = ""
}
</script>
