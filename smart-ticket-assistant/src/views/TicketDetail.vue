<template>
  <el-card>
    <template #header>
      <span>工单详情</span>
    </template>
    <el-form v-if="ticket" label-width="100px">
      <el-form-item label="工单编号">
        <span>{{ ticket.id }}</span>
      </el-form-item>
      <el-form-item label="标题">
        <span>{{ ticket.title }}</span>
      </el-form-item>
      <el-form-item label="状态">
        <el-tag :type="getStatusType(ticket.status)">{{ ticket.status }}</el-tag>
      </el-form-item>
      <el-form-item label="创建时间">
        <span>{{ ticket.createTime }}</span>
      </el-form-item>
      <!-- 可根据需要增加更多字段 -->
    </el-form>
    <div style="margin-top: 20px;">
      <el-button @click="router.back()">返回</el-button>
    </div>
  </el-card>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useTicketStore } from  '../stores/ticket'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useTicketStore()

const ticketId = route.params.id
const ticket = computed(() => store.getTicketById(ticketId))

const getStatusType = (status) => {
  switch (status) {
    case '待处理': return 'info'
    case '处理中': return 'warning'
    case '已完成': return 'success'
    default: return ''
  }
}
</script>