<script setup lang="ts">
import { ENUM_ORDER_STATUS, type OrderStatusType } from '@/types/order.ts'
import { defineProps, computed } from 'vue'

import {
  ClockCircleOutlined,
  SyncOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  status: OrderStatusType
}>()

const statusData = computed(() => {
  switch (props.status) {
    case ENUM_ORDER_STATUS.Pending:
      return {
        color: 'orange',
        label: t('order.statusTypes.pending'),
        icon: ClockCircleOutlined,
      }
    case ENUM_ORDER_STATUS.Preparing:
      return {
        color: 'blue',
        label: t('order.statusTypes.preparing'),
        icon: SyncOutlined,
      }
    case ENUM_ORDER_STATUS.Shipped:
      return {
        color: 'cyan',
        label: t('order.statusTypes.shipped'),
        icon: CarOutlined,
      }
    case ENUM_ORDER_STATUS.Delivered:
      return {
        color: 'green',
        label: t('order.statusTypes.delivered'),
        icon: CheckCircleOutlined,
      }
    case ENUM_ORDER_STATUS.Cancelled:
      return {
        color: 'red',
        label: t('order.statusTypes.cancelled'),
        icon: CloseCircleOutlined,
      }
    default:
      return {
        color: 'gray',
        label: props.status,
        icon: ClockCircleOutlined,
      }
  }
})
</script>

<template>
  <a-tag :color="statusData.color">
    <component :is="statusData.icon" style="margin-right: 4px" />
    {{ statusData.label }}
  </a-tag>
</template>
