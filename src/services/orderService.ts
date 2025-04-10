import type { IOrder } from '@/types/order'

export const mockOrders: IOrder[] = [
  {
    id: 1,
    customerName: 'Ahmet Yılmaz',
    status: 'pending',
    totalAmount: 450.0,
    createdAt: '2025-04-08T10:15:00Z',
    items: [
      {
        productId: 1,
        title: 'Klavye',
        quantity: 1,
        price: 150.0,
        thumbnail: 'https://prd.place/100/100?id=1',
      },
      {
        productId: 2,
        title: 'Mouse',
        quantity: 2,
        price: 150.0,
        thumbnail: 'https://prd.place/100/100?id=2',
      },
    ],
  },
  {
    id: 2,
    customerName: 'Zeynep Kaya',
    status: 'shipped',
    totalAmount: 1200.0,
    createdAt: '2025-04-07T14:30:00Z',
    items: [
      {
        productId: 3,
        title: 'Monitör',
        quantity: 1,
        price: 1200.0,
        thumbnail: 'https://prd.place/100/100?id=3',
      },
    ],
  },
  {
    id: 3,
    customerName: 'Mehmet Demir',
    status: 'delivered',
    totalAmount: 299.99,
    createdAt: '2025-04-05T09:00:00Z',
    items: [
      {
        productId: 4,
        title: 'Bluetooth Kulaklık',
        quantity: 1,
        price: 299.99,
        thumbnail: 'https://prd.place/100/100?id=4',
      },
    ],
  },
  {
    id: 4,
    customerName: 'Elif Çelik',
    status: 'cancelled',
    totalAmount: 749.5,
    createdAt: '2025-04-06T11:45:00Z',
    items: [
      {
        productId: 5,
        title: 'Tablet',
        quantity: 1,
        price: 749.5,
        thumbnail: 'https://prd.place/100/100?id=5',
      },
    ],
  },
  {
    id: 5,
    customerName: 'Mert Aydın',
    status: 'preparing',
    totalAmount: 899.99,
    createdAt: '2025-04-08T17:20:00Z',
    items: [
      {
        productId: 6,
        title: 'Oyun Konsolu',
        quantity: 1,
        price: 899.99,
        thumbnail: 'https://prd.place/100/100?id=6',
      },
    ],
  },
  {
    id: 6,
    customerName: 'Burcu Sarı',
    status: 'shipped',
    totalAmount: 199.9,
    createdAt: '2025-04-04T16:00:00Z',
    items: [
      {
        productId: 7,
        title: 'Powerbank',
        quantity: 2,
        price: 99.95,
        thumbnail: 'https://prd.place/100/100?id=7',
      },
    ],
  },
  {
    id: 7,
    customerName: 'Caner Koç',
    status: 'pending',
    totalAmount: 1599.0,
    createdAt: '2025-04-03T13:40:00Z',
    items: [
      {
        productId: 8,
        title: 'Laptop',
        quantity: 1,
        price: 1599.0,
        thumbnail: 'https://prd.place/100/100?id=8',
      },
    ],
  },
  {
    id: 8,
    customerName: 'Derya Erdem',
    status: 'delivered',
    totalAmount: 89.9,
    createdAt: '2025-04-02T10:20:00Z',
    items: [
      {
        productId: 9,
        title: 'USB Bellek 64GB',
        quantity: 2,
        price: 44.95,
        thumbnail: 'https://prd.place/100/100?id=9',
      },
    ],
  },
  {
    id: 9,
    customerName: 'Fatih Karaca',
    status: 'preparing',
    totalAmount: 349.0,
    createdAt: '2025-04-01T09:50:00Z',
    items: [
      {
        productId: 10,
        title: 'Webcam',
        quantity: 1,
        price: 349.0,
        thumbnail: 'https://prd.place/100/100?id=10',
      },
    ],
  },
  {
    id: 10,
    customerName: 'Gülşah Aksoy',
    status: 'cancelled',
    totalAmount: 229.9,
    createdAt: '2025-03-31T08:30:00Z',
    items: [
      {
        productId: 11,
        title: 'Kablosuz Şarj Cihazı',
        quantity: 2,
        price: 114.95,
        thumbnail: 'https://prd.place/100/100?id=11',
      },
    ],
  },
]

export async function fetchOrders(search = '', status = ''): Promise<IOrder[]> {
  return new Promise(resolve => {
    let result = [...mockOrders]

    if (search) {
      result = result.filter(order =>
        order.customerName.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status) {
      result = result.filter(order => order.status === status)
    }

    setTimeout(() => resolve(result), 500)
  })
}
export async function fetchOrderById(id: number): Promise<IOrder> {
  return new Promise((resolve, reject) => {
    const order = mockOrders.find(o => o.id === id)
    setTimeout(() => {
      if (order) {
        resolve(order)
      } else {
        reject(new Error('Sipariş bulunamadı'))
      }
    }, 300)
  })
}

export async function updateOrderStatus(id: number, newStatus: IOrder['status']): Promise<IOrder> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockOrders.findIndex(order => order.id === id)
      if (index !== -1) {
        mockOrders[index].status = newStatus
        resolve(mockOrders[index])
      } else {
        reject(new Error('Order not found'))
      }
    }, 500)
  })
}
