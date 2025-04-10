import {
  salesData,
  topSellingProducts,
  customerStats,
  topSellingCategories,
} from '@/mockData/analyticsData.ts'
import { getStartOfWeek, subtractWeeks, getEndOfWeek, subtractMonths } from '@/lib/handler.ts'
import type { CategoryData, CustomerStats, ProductData, SalesData } from '@/types/analytic.ts'

export const fetchSalesData = async (timeFrame: string): Promise<SalesData[]> => {
  const today = new Date()
  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(today.getDate() - 30)

  let filteredData: SalesData[] = []

  if (timeFrame === 'daily') {
    const groupedByDay: Record<string, number> = {}
    salesData.forEach(data => {
      const dataDate = new Date(data.date)
      const dayString = dataDate.toDateString()
      groupedByDay[dayString] = (groupedByDay[dayString] || 0) + data.sales
    })
    filteredData = Object.keys(groupedByDay)
      .map(date => ({ date, sales: groupedByDay[date] }))
      .filter(item => {
        const itemDate = new Date(item.date)
        return itemDate >= thirtyDaysAgo && itemDate <= today
      })
  } else if (timeFrame === 'weekly') {
    const groupedByWeek: Record<string, number> = {}
    salesData.forEach(data => {
      const dataDate = new Date(data.date)
      const weekStart = getStartOfWeek(dataDate)
      const weekEnd = getEndOfWeek(dataDate)
      const weekKey = `${weekStart.toDateString()} - ${weekEnd.toDateString()}`
      groupedByWeek[weekKey] = (groupedByWeek[weekKey] || 0) + data.sales
    })
    filteredData = Object.keys(groupedByWeek)
      .map(key => {
        const [startDate, endDate] = key.split(' - ')
        return { date: startDate, endDate, sales: groupedByWeek[key] }
      })
      .filter(item => {
        const itemDate = new Date(item.date) // Başlangıç tarihini alıyoruz
        return itemDate >= subtractWeeks(today, 4) && itemDate <= today // Son 4 hafta
      })
  } else if (timeFrame === 'monthly') {
    const groupedByMonth: Record<string, number> = {}
    salesData.forEach(data => {
      const dataDate = new Date(data.date)
      const monthYear = `${dataDate.getFullYear()}-${dataDate.getMonth() + 1}`
      groupedByMonth[monthYear] = (groupedByMonth[monthYear] || 0) + data.sales
    })
    filteredData = Object.keys(groupedByMonth)
      .map(monthYear => {
        const [year, month] = monthYear.split('-')
        const firstDayOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1).toDateString()
        return { date: firstDayOfMonth, sales: groupedByMonth[monthYear] }
      })
      .filter(item => {
        const itemDate = new Date(item.date) // Ayın ilk gününü alıyoruz
        return itemDate >= subtractMonths(today, 4) && itemDate <= today // Son 4 ay
      })
  }

  return filteredData
}

export const fetchTopSellingProducts = async (): Promise<ProductData[]> => {
  return topSellingProducts
}
export const fetchTopSellingCategories = async (): Promise<CategoryData[]> => {
  return topSellingCategories
}

export const fetchCustomerStats = async (): Promise<CustomerStats[]> => {
  return customerStats
}
