<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import OrderStatus from '@/components/order/OrderStatus.vue'
import type { MainLayoutContext } from '@/layouts/MainLayout.vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { useScreen } from '@/composables/useScreen.ts'

const layoutContext = inject<MainLayoutContext>('layoutContext')
const { t } = useI18n()
const route = useRoute()
const orderStore = useOrderStore()
const { isMobile } = useScreen()

const expandColumns = computed(() => [
  {
    key: 'productId',
    title: 'Product Id',
    dataIndex: 'productId',
    width: 110,
    textAlign: 'center',
  },
  {
    key: 'thumbnail',
    title: 'Görsel',
    dataIndex: 'thumbnail',
  },
  {
    key: 'title',
    title: 'Name',
    dataIndex: 'title',
  },
  {
    key: 'quantity',
    title: 'Qty',
    dataIndex: 'quantity',
  },
  {
    key: 'price',
    title: 'Price',
    dataIndex: 'price',
  },
])

const updateStatus = (newStatus: string) => {
  orderStore.changeStatus(Number(route.params.id), newStatus as any)
}
onMounted(() => {
  orderStore.loadOrderDetail(Number(route.params.id))
  layoutContext?.setPageTitle('order.detail.pageTitle')
  layoutContext?.setShowBackButton(true)
  layoutContext?.setShowSidebar(false)
})
</script>

<template>
  <a-card v-if="orderStore.selectedOrder">
    <template #title
      >{{ t('order.statusText') }}: <order-status :status="orderStore.selectedOrder.status"
    /></template>
    <template #extra>
      <a-select
        v-model:value="orderStore.selectedOrder.status"
        @change="(e: string) => updateStatus(e)"
        :disabled="orderStore.selectedOrder.status === 'delivered'"
      >
        <a-select-option value="pending">{{ t('order.statusTypes.pending') }}</a-select-option>
        <a-select-option value="preparing">{{ t('order.statusTypes.preparing') }}</a-select-option>
        <a-select-option value="shipped">{{ t('order.statusTypes.shipped') }}</a-select-option>
        <a-select-option value="delivered">{{ t('order.statusTypes.delivered') }}</a-select-option>
        <a-select-option value="cancelled">{{ t('order.statusTypes.cancelled') }}</a-select-option>
      </a-select>
    </template>
    <a-descriptions title="Sipariş Detayı" :column="isMobile ? 1 : 2" bordered>
      <a-descriptions-item :span="2" :label="t('order.customerName')">
        {{ orderStore.selectedOrder.customerName }}
      </a-descriptions-item>
      <a-descriptions-item :label="t('order.createdAt')">
        {{ dayjs(orderStore.selectedOrder.createdAt).format('DD-MM-YYYY a HH:mm') }}
      </a-descriptions-item>
      <a-descriptions-item :label="t('order.totalAmount')">
        ${{ orderStore.selectedOrder.totalAmount }}
      </a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <a-table
      :pagination="false"
      :row-key="(exRecord: any) => exRecord.productId"
      :data-source="orderStore.selectedOrder.items"
      :columns="expandColumns"
    >
      <template #bodyCell="{ text, column }">
        <a-image v-if="column.key === 'thumbnail'" :src="text" :width="50" :height="50" />
      </template>
    </a-table>
  </a-card>
</template>
