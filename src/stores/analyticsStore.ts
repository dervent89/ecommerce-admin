import { defineStore } from 'pinia'
import {
  fetchSalesData,
  fetchTopSellingProducts,
  fetchCustomerStats,
  fetchTopSellingCategories,
} from '@/services/analyticsService'
import type { CategoryData, CustomerStats, ProductData, SalesData } from '@/types/analytic.ts'

export const useAnalyticsStore = defineStore('analytics', {
  state: () => ({
    salesData: [] as SalesData[],
    topProducts: [] as ProductData[],
    topCategories: [] as CategoryData[],
    customerStats: [] as CustomerStats[],
  }),

  actions: {
    async loadSalesData(timeFrame: string) {
      this.salesData = await fetchSalesData(timeFrame)
    },

    async loadTopSellingProducts() {
      this.topProducts = await fetchTopSellingProducts()
    },

    async loadTopSellingCategories() {
      this.topCategories = await fetchTopSellingCategories()
    },

    async loadCustomerStats() {
      this.customerStats = await fetchCustomerStats()
    },
  },
})
