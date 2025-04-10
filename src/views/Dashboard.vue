<template>
  <a-row :gutter="isMobile ? [8, 8] : [24, 24]">
    <a-col :lg="12" :md="24" :xs="24">
      <a-card :title="t(`analytic.sales`)">
        <template #extra>
          <a-space>
            <a-select v-model:value="selectedTimeFrame" @change="loadData">
              <a-select-option value="daily">{{ t('analytic.daily') }}</a-select-option>
              <a-select-option value="weekly">{{ t('analytic.weekly') }}</a-select-option>
              <a-select-option value="monthly">{{ t('analytic.monthly') }}</a-select-option>
            </a-select>
          </a-space>
        </template>
        <BarChart :data="salesData" />
      </a-card>
    </a-col>

    <a-col :lg="12" :md="24" :xs="24">
      <a-card :title="t('analytic.bestSellingCategories')">
        <PieChart :data="topCategories" />
      </a-card>
    </a-col>

    <a-col :span="24">
      <a-card title="En Çok Satan Ürünler">
        <a-list>
          <a-list-item v-for="(product, index) in topProducts" :key="index">
            <a-space> {{ product.title }} - ${{ product.price }} - {{ product.sales }} </a-space>
          </a-list-item>
        </a-list>
      </a-card>
    </a-col>

    <a-col :span="24">
      <a-card title="Müşteri İstatistikleri">
        <a-table :columns="customerColumns" :data-source="customerStats" :pagination="false" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAnalyticsStore } from '@/stores/analyticsStore'
import BarChart from '@/components/analytics/BarChart.vue'
import PieChart from '@/components/analytics/PieChart.vue'
import { useI18n } from 'vue-i18n'
import { useScreen } from '@/composables/useScreen.ts'

const { t } = useI18n()
const { isMobile } = useScreen()
const analyticsStore = useAnalyticsStore()
const selectedTimeFrame = ref('daily')
const salesData = computed(() => analyticsStore.salesData)
const topProducts = computed(() => analyticsStore.topProducts)
const topCategories = computed(() => analyticsStore.topCategories)
const customerStats = computed(() => analyticsStore.customerStats)

const customerColumns = [
  { title: 'Müşteri Adı', dataIndex: 'customerName' },
  {
    title: 'Toplam Sipariş',
    dataIndex: 'totalOrders',
    defaultSortOrder: 'descend',
    sorter: {
      compare: (a: any, b: any) => a.totalOrders - b.totalOrders,
      multiple: 2,
    },
  },
  {
    title: 'Toplam Harcama',
    dataIndex: 'totalAmountSpent',
    defaultSortOrder: 'descend',
    sorter: {
      compare: (a: any, b: any) => a.totalAmountSpent - b.totalAmountSpent,
      multiple: 2,
    },
  },
]

const loadData = async (timeFrame: string) => {
  await analyticsStore.loadSalesData(timeFrame)
  await analyticsStore.loadTopSellingProducts()
  await analyticsStore.loadTopSellingCategories()
  await analyticsStore.loadCustomerStats()
}

onMounted(() => {
  loadData(selectedTimeFrame.value)
})
</script>
