import { ref } from "vue";
import { defineStore } from 'pinia'
export const useTicketStore = defineStore('ticket', () => {
    const tickets = ref([
        {
            id: '001',
            title: 'Tom',
            status: '待处理',
            createTime: '2026-05-03',
            操作: "查看详情"
        },
        {
            id: '002',
            title: 'Som',
            status: '已完成',
            createTime: '2026-05-03',
            操作: "查看详情"
        },
        {
            id: '003',
            title: 'Tom',
            status: '处理中',
            createTime: '2026-05-03',
            操作: "查看详情"
        },
        {
            id: '004',
            title: 'Lom',
            status: '已完成',
            createTime: '2026-05-03',
            操作: "查看详情"
        },
        {
            id: '005',
            title: 'Lom',
            status: '已完成',
            createTime: '2026-05-03',
            操作: "查看详情"
        },
        {
            id: '006',
            title: 'Tom',
            status: '已完成',
            createTime: '2026-05-03',
            操作: "查看详情"
        },
        {
            id: '007',
            title: 'Tom',
            status: '处理中',
            createTime: '2026-05-03',
            操作: "查看详情"
        },
    ])
    const getTicketById=(id)=>{
    return tickets.value.find(t=>t.id===id)
}
const addTicket =(ticket)=>{
    const timeStamp = Date.now()
    //3.加入到现在有的工单里面
    const newId =  String(timeStamp).slice(-6)
    //加入到工单末尾
    const newTicket = {id:newId,...ticket}
    return tickets.value.push(newTicket)
}
// 更新工单
  const updateTicket = (id, updatedFields) => {
    const index = tickets.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tickets.value[index] = { ...tickets.value[index], ...updatedFields }
    }
  }

  // 删除工单
  const deleteTicket = (id) => {
    tickets.value = tickets.value.filter(t => t.id !== id)
  }

  return { tickets, getTicketById, addTicket, updateTicket, deleteTicket }
})


