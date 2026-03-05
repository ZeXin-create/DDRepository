<template>
  <el-card>
    <template #header>
      <span>新建工单</span>
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
      <el-button type="primary" @click="handleCreate">创建</el-button>
      <el-button @click="router.back()">取消</el-button>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from  '../stores/ticket'
import { ElMessage } from 'element-plus'

const router = useRouter()
const store = useTicketStore()

const form = ref({
  title: '',
  status: '待处理'  // 默认值
})

const handleCreate = () => {
  if (!form.value.title) {
    ElMessage.warning('请输入标题')
    return
  }
  store.addTicket({
    title: form.value.title,
    status: form.value.status,
    createTime: new Date().toISOString().slice(0,10)  // 例如 '2026-02-26'
  })
  ElMessage.success('创建成功')
  router.push({ name: 'TicketList' })  // 返回列表页
}
</script>