export interface SalesData {
  date: string
  sales: number
}

export interface CategoryData {
  title: string
  totalSales: number
}

export interface CustomerStats {
  customerName: string
  totalOrders: number
  totalAmountSpent: number
}

export interface ProductData {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  returnPolicy: string
  minimumOrderQuantity: number
  images: string[]
  thumbnail: string
  sales: number
}
