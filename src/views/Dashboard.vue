<template>
  <div class="dashboard">
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="6" v-for="item in stats" :key="item.label">
        <el-card class="stat-card">
          <div class="stat-value">{{ item.value }}</div>
          <div class="stat-label">{{ item.label }}</div>
        </el-card>
      </el-col>
    </el-row>
    <div ref="trendChartRef" style="width:100%; height:300px;"></div>

    <div ref="pieChartRef" style="width:100%; height:300px;"></div>
  </div>
</template>


<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, watch, computed } from 'vue'
import { useTicketStore } from '../stores/ticket'
const store = useTicketStore()
onMounted(() => {
  initTrendChart()
  initPieChart()
})
watch(() => store.tickets, () => {
  if (trendChart) {
    trendChart.setOption({
      xAxis: { data: getLast7Days() },
      series: [{ data: getTrendData() }]
    })
  }
  if (pieChart) {
    pieChart.setOption({
      series: [{ data: getPieData() }]
    })
  }
}, { deep: true })
const stats = computed(() => [
  { label: '总工单', value: store.tickets.length },
  { label: '待处理', value: store.tickets.filter(t => t.status === '待处理').length },
  { label: '处理中', value: store.tickets.filter(t => t.status === '处理中').length },
  { label: '已完成', value: store.tickets.filter(t => t.status === '已完成').length },
])
const getLast7Days = () => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)
    days.push(dateStr)
  }
  return days
}
// 计算最近7天每天新增的工单数量
const getTrendData = () => {
  const days = getLast7Days()
  return days.map(date => {
    return store.tickets.filter(t => t.createTime === date).length
  })
}
// 计算各状态的数量（用于饼图）
const getPieData = () => {
  return [
    { name: '待处理', value: store.tickets.filter(t => t.status === '待处理').length },
    { name: '处理中', value: store.tickets.filter(t => t.status === '处理中').length },
    { name: '已完成', value: store.tickets.filter(t => t.status === '已完成').length },
  ].filter(item => item.value > 0) // 过滤掉数量为0的，不然饼图会显示空白
}
const trendChartRef = ref(null)  // 用来拿到折线图容器的引用
let trendChart = null            // 用来保存图表实例，后面更新要用

// 初始化折线图
const initTrendChart = () => {
  if (!trendChartRef.value) return  // 如果容器还没渲染出来，就退出

  // 如果已经有图表实例了，先销毁再重建（防止内存泄漏）
  if (trendChart) {
    trendChart.dispose()
  }

  // 创建图表实例
  trendChart = echarts.init(trendChartRef.value)

  // 配置项（这是核心）
  const option = {
    // 标题（可选）
    title: {
      text: '近7天工单趋势'
    },
    // 提示框（鼠标悬停时显示数据）
    tooltip: {
      trigger: 'axis'  // axis 表示在坐标轴上触发
    },
    // X轴
    xAxis: {
      type: 'category',  // category 表示离散的数据
      data: getLast7Days()  // X轴的数据
    },
    // Y轴
    yAxis: {
      type: 'value'  // value 表示数值
    },
    // 数据系列（可以多个）
    series: [
      {
        name: '工单数量',
        type: 'line',        // 折线图
        data: getTrendData(), // 具体数据
        smooth: true,         // 平滑曲线
        symbol: 'circle',     // 数据点的形状
        lineStyle: {
          width: 3,
          color: '#409EFF'    // Element Plus 的主题色
        }
      }
    ],
    // 网格（控制图表在容器内的位置）
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  }

  // 把配置项交给图表实例
  trendChart.setOption(option)
}
const pieChartRef = ref(null)
let pieChart = null

const initPieChart = () => {
  if (!pieChartRef.value) return

  if (pieChart) {
    pieChart.dispose()
  }

  pieChart = echarts.init(pieChartRef.value)

  const data = getPieData()  // 获取数据

  const option = {
    title: {
      text: '工单状态分布'
    },
    tooltip: {
      trigger: 'item'  // item 表示在数据项上触发
    },
    series: [
      {
        name: '工单状态',
        type: 'pie',           // 饼图
        radius: '50%',         // 饼图的半径（占容器宽度的比例）
        data: data,            // 数据格式：[{ name: '待处理', value: 5 }, ...]
        // 强调样式（鼠标悬停时）
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  pieChart.setOption(option)
}
</script>

<style></style>