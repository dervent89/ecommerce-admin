export type OrderStatusType = 'pending' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'

export interface IOrder {
  id: number
  customerName: string
  status: OrderStatusType
  totalAmount: number
  createdAt: string
  items: {
    productId: number
    title: string
    quantity: number
    price: number
    thumbnail: string
  }[]
}

export enum ENUM_ORDER_STATUS {
  Pending = 'pending',
  Preparing = 'preparing',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
}
