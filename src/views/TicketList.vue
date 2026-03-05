<template>
  <div>
    <div>
      <el-form>
        <el-form-item label="搜索">
          <el-input v-model="search" placeholder="请输入搜索的内容" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handAddList">+</el-button>
           <el-button type="primary" @click="handDashboard">仪表盘</el-button>
        </el-form-item>
      </el-form>
      <el-select v-model="statusFilter" placeholder="Select" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div>
      <el-table :data="filteredTickets" height="250" style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="title" label="title" width="180" />
        <el-table-column prop="status" label="status">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="createTime" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" @click="goToDetail(row.id)">查看</el-button>
            <el-button size="small" type="primary" @click="goToEdit(row.id)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="example-pagination-block">
     <el-pagination layout="prev, pager, next" :total="filteredTickets.length" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useTicketStore } from  '../stores/ticket'

const store = useTicketStore()
const router = useRouter()

const search = ref('')
const statusFilter = ref('')
const options = [
  { value: '待处理', label: '待处理' },
  { value: '处理中', label: '处理中' },
  { value: '已完成', label: '已完成' },
]

// 计算属性基于 store.tickets
const filteredTickets = computed(() => {
  let result = store.tickets
  if (search.value) {
    result = result.filter(item => item.title.includes(search.value))
  }
  if (statusFilter.value) {
    result = result.filter(item => item.status === statusFilter.value)
  }
  return result
})

const getStatusType = (status) => {
  switch (status) {
    case '待处理': return 'info'
    case '处理中': return 'warning'
    case '已完成': return 'success'
    default: return ''
  }
}
const handDashboard =()=>{
  router.push({ name: 'Dashboard' })
}
const handAddList = () => {
  router.push({ name: 'AddList' })
}

const goToDetail = (id) => {
  router.push({ name: 'TicketDetail', params: { id } })
}

const goToEdit = (id) => {
  router.push({ name: 'TickEdit', params: { id } })
}

const handleDelete = (id) => {
  ElMessageBox.confirm('确认删除该工单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.deleteTicket(id)   // 调用 store 的方法
    ElMessage.success('删除成功')
  }).catch(() => { })
}
</script>

<style scoped>
.example-pagination-block+.example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>