import { defineStore } from 'pinia'
import type { IOrder } from '@/types/order'
import { fetchOrders, fetchOrderById, updateOrderStatus } from '@/services/orderService'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [] as IOrder[],
    selectedOrder: null as IOrder | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async loadOrders(searchTerm = '', statusFilter = '') {
      this.loading = true
      try {
        this.orders = await fetchOrders(searchTerm, statusFilter)
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    async loadOrderDetail(id: number) {
      this.loading = true
      try {
        this.selectedOrder = await fetchOrderById(id)
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    async changeStatus(id: number, newStatus: IOrder['status']) {
      this.loading = true
      try {
        const updatedOrder = await updateOrderStatus(id, newStatus)
        const index = this.orders.findIndex(o => o.id === id)
        if (index !== -1) {
          this.orders[index] = updatedOrder
        }

        if (this.selectedOrder?.id === id) {
          this.selectedOrder = updatedOrder
        }
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },
  },
})
