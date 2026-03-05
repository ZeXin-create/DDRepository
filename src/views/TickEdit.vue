<template>
  <el-card>
    <template #header>
      <span>编辑工单</span>
    </template>
    <el-form :model="form" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status">
          <el-option label="待处理" value="待处理" />
          <el-option label="处理中" value="处理中" />
          <el-option label="已完成" value="已完成" />
        </el-select>
      </el-form-item>
    </el-form>
    <div style="margin-top: 20px;">
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="router.back()">取消</el-button>
    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketStore } from  '../stores/ticket'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const store = useTicketStore()
const ticketId = route.params.id

const form = ref({
  title: '',
  status: ''
})

onMounted(() => {
  const ticket = store.getTicketById(ticketId)
  if (ticket) {
    form.value = { ...ticket } 
  } else {
    ElMessage.error('工单不存在')
    router.back()
  }
})

const handleSave = () => {
  store.updateTicket(ticketId, {
    title: form.value.title,
    status: form.value.status
  })
  ElMessage.success('保存成功')
  router.back()
}
</script>