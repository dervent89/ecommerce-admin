<script setup lang="ts">
import { computed, h, onMounted, ref, watch } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import dayjs from 'dayjs'
import { LinkOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { IOrder } from '@/types/order.ts'
import OrderStatus from '@/components/order/OrderStatus.vue'
import { useScreen } from '@/composables/useScreen.ts'

const router = useRouter()
const { t } = useI18n()
const orderStore = useOrderStore()
const search = ref('')
const statusFilter = ref('')
const { isMobile } = useScreen()

const columns = computed(() => [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    width: isMobile ? 30 : 60,
  },
  {
    key: 'customerName',
    title: 'Customer Name',
    dataIndex: 'customerName',
    width: 150,
  },
  {
    key: 'totalAmount',
    title: 'Total Amount',
    dataIndex: 'totalAmount',
    width: 140,
  },
  {
    key: 'createdAt',
    title: 'Created At',
    dataIndex: 'createdAt',
    width: 200,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    width: 100,
  },
  {
    key: 'operations',
    title: isMobile.value ? false : 'Operations',
    dataIndex: 'id',
    width: isMobile.value ? 30 : 50,
    fixed: 'right',
  },
])

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

onMounted(() => {
  orderStore.loadOrders()
})

watch([search, statusFilter], () => {
  orderStore.loadOrders(search.value, statusFilter.value)
})
</script>

<template>
  <a-card>
    <template #title>
      <a-space>
        <a-input v-model:value="search" placeholder="Müşteri adıyla ara" />
        <a-select
          v-model:value="statusFilter"
          @update:model-value="statusFilter = $event"
          placeholder="Select"
        >
          <a-select-option value="">Tümü</a-select-option>
          <a-select-option value="pending">Bekliyor</a-select-option>
          <a-select-option value="preparing">Hazırlanıyor</a-select-option>
          <a-select-option value="delivered">Teslim Edildi</a-select-option>
          <a-select-option value="cancelled">İptal Edildi</a-select-option>
          <a-select-option value="shipped">Kargoda</a-select-option>
        </a-select>
      </a-space>
    </template>

    <a-table
      :columns="columns"
      :data-source="orderStore.orders"
      :row-key="(record: IOrder) => record.id"
      :pagination="false"
      bordered
      :scroll="{
        x: 1150,
      }"
    >
      <template #expandedRowRender="{ record }">
        <a-table
          :pagination="false"
          :row-key="(exRecord: any) => exRecord.productId"
          :data-source="record.items"
          :columns="expandColumns"
        >
          <template #bodyCell="{ text, column }">
            <a-image v-if="column.key === 'thumbnail'" :src="text" :width="50" :height="50" />
          </template>
        </a-table>
      </template>
      <template #bodyCell="{ text, column, record }">
        <template v-if="column.key === 'totalAmount'"> ${{ text }} </template>
        <template v-if="column.key === 'createdAt'">
          {{ dayjs(text).format('DD-MM-YYYY a HH:mm') }}
        </template>
        <template v-if="column.key === 'status'">
          <order-status :status="text" />
        </template>
        <template v-if="column.key === 'operations'">
          <a-space>
            <a-tooltip :title="t('product.list.operations.seeDetails')"
              ><a-button
                type="text"
                @click="() => router.push(`/orders/${record.id}`)"
                :icon="h(LinkOutlined)"
            /></a-tooltip>
          </a-space>
        </template>
      </template>
    </a-table>
  </a-card>
</template>
