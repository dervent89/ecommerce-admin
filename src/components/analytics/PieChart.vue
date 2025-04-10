<template>
  <div ref="chartContainer" style="width: 100%; height: 300px"></div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Array<{ title: string; totalSales: number }>,
    required: true,
  },
})

const chartContainer = ref<HTMLElement | null>(null)
let chartInstance: any

const updateChart = () => {
  if (!chartContainer.value) return
  chartInstance = echarts.init(chartContainer.value)

  const data = props.data.map(item => ({
    title: item.title,
    totalSales: item.totalSales,
  }))

  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '60%'],
        avoidLabelOverlap: false,
        padAngle: 2,
        itemStyle: {
          borderRadius: 4,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: true,
        },
        data: data.map(item => ({
          name: item.title,
          value: item.totalSales,
        })),
      },
    ],
  }

  chartInstance.setOption(option)
}

onMounted(() => {
  updateChart()
})

watch(
  () => props.data,
  () => {
    updateChart()
  }
)
</script>
