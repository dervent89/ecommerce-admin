<template>
  <div ref="chartContainer" style="width: 100%; height: 300px"></div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import type { SalesData } from '@/types/analytic.ts'

const props = defineProps({
  data: {
    type: Array<SalesData>,
    required: true,
  },
})

const chartContainer = ref<HTMLElement | null>(null)
let chartInstance: any

const updateChart = () => {
  if (!chartContainer.value) return
  chartInstance = echarts.init(chartContainer.value)

  const data = props.data.map(item => ({
    date: item.date,
    sales: item.sales,
  }))

  const option = {
    title: false,
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: data.map(item => dayjs(item.date).format('DD MMMM YYYY')),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data.map(item => item.sales),
        type: 'bar',
        smooth: true,
        barStyle: {
          color: '#52922F',
        },
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
