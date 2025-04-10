import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    menu: {
      home: 'Dashboard',
      productManagement: 'Product Management',
      orderManagement: 'Order Management',
      analytics: 'Analytics',
    },
    appTitle: 'E-commerce Admin Panel',
    product: {
      id: 'ID',
      name: 'Product Name',
      image: 'Image',
      price: 'Price',
      stock: 'Stock',
      category: 'Category',
      brand: 'Brand',
      description: 'Description',
      detail: {
        pageTitle: 'Product Detail',
        notProductFound: 'Product not found.',
      },
      list: {
        pageTitle: 'Product List',
        search: 'Search',
        reset: 'Reset',
        enterPrice: 'Enter price',
        selectedText: '{count} items selected',
        delete: {
          success: 'Product deleted successfully',
          confirmTitle: 'Are you sure you want to delete?',
          confirmContent: 'If you delete this product, you cannot undo it!',
          confirmOkText: 'Delete',
        },
        bulkDelete: {
          success: 'Products deleted successfully',
          confirmTitle: 'Are you sure you want to delete?',
          confirmContent: 'If you delete these products, you cannot undo them!',
          confirmOkText: 'Delete',
        },
        operations: {
          title: 'Operations',
          add: 'Add Product',
          seeDetails: 'See Details',
          update: 'Update Product',
          delete: 'Delete Product',
          deleteSelected: 'Delete Selected',
          changePriceSelected: 'Change Price of Selected',
        },
      },
      validateMessages: {
        title: 'Product name is a required field',
        price: 'Price is a required field',
      },
    },
    order: {
      pageTitle: 'Order Management',
      detail: {
        pageTitle: 'Order Detail',
      },
      customerName: 'Customer Name',
      statusText: 'Status',
      createdAt: 'Order Date',
      totalAmount: 'Total Amount',
      statusTypes: {
        pending: 'Pending',
        preparing: 'Preparing',
        shipped: 'Shipped',
        delivered: 'Delivered',
        cancelled: 'Cancelled',
      },
    },
    analytic: {
      sales: 'Sales',
      bestSellingCategories: 'Best Selling Categories',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
    },
  },
  tr: {
    menu: {
      home: 'Dashboard',
      productManagement: 'Ürün Yönetimi',
      orderManagement: 'Sipariş Yönetimi',
      analytics: 'İstatistikler',
    },
    appTitle: 'E-ticaret Yönetim Paneli',
    product: {
      id: 'ID',
      name: 'Ürün Adı',
      image: 'Görsel',
      price: 'Fiyat',
      stock: 'Stok',
      category: 'Kategori',
      brand: 'Marka',
      description: 'Açıklama',
      detail: {
        pageTitle: 'Ürün Detay',
        notProductFound: 'Ürün bulunamadı.',
      },
      list: {
        pageTitle: 'Ürün Listesi',
        search: 'Ara',
        reset: 'Sıfırla',
        enterPrice: 'Fiyat girin',
        selectedText: 'Seleçilen {count} ürün',
        delete: {
          success: 'Ürün başarıyla silindi',
          confirmTitle: 'Silmek istediğinize emin misiniz?',
          confirmContent: 'Bu ürünü silerseniz, geri alamazsınız!',
          confirmOkText: 'Sil',
        },
        bulkDelete: {
          success: 'Ürünler başarıyla silindi',
          confirmTitle: 'Silmek istediğinize emin misiniz?',
          confirmContent: 'Bu ürünleri silerseniz, geri alamazsınız!',
          confirmOkText: 'Sil',
        },
        operations: {
          title: 'İşlemler',
          add: 'Ürün Ekle',
          seeDetails: 'Detayını Gör',
          update: 'Ürünü Güncelle',
          delete: 'Ürünü Sil',
          deleteSelected: 'Seçilenleri Sil',
          changePriceSelected: 'Seçilenlerin Fiyatlarını Değiştir',
        },
      },
      validateMessages: {
        title: 'Ürün adı zorunlu alandır',
        price: 'Fiyat zorunlu alandır',
      },
    },
    order: {
      pageTitle: 'Sipariş Yönetimi',
      detail: {
        pageTitle: 'Sipariş Detay',
      },
      customerName: 'Müşteri Adı',
      statusText: 'Durum',
      createdAt: 'Sipariş Tarihi',
      totalAmount: 'Toplam Tutar',
      statusTypes: {
        pending: 'Bekliyor',
        preparing: 'Hazırlanıyor',
        shipped: 'Kargoda',
        delivered: 'Teslim Edildi',
        cancelled: 'İptal Edildi',
      },
    },
    analytic: {
      sales: 'Satışlar',
      bestSellingCategories: 'En Çok Satan Kategoriler',
      daily: 'Günlük',
      weekly: 'Haftalık',
      monthly: 'Aylık',
    },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'tr',
  fallbackLocale: 'en',
  messages,
})

export default i18n
