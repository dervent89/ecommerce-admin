import { defineStore } from 'pinia'
import {
  fetchProducts,
  fetchCategoryList,
  fetchDeleteProduct,
  fetchProduct,
} from '@/services/productService'
import type { FetchProductsParams, IProduct } from '@/types/product.ts'

export const useProductStore = defineStore('product', {
  state: () => ({
    productsResponse: {
      limit: 10,
      skip: 0,
      total: 0,
      products: [] as IProduct[],
      success: false,
      error: null as string | null,
    },
    productResponse: {
      product: {
        id: 0,
        title: '',
        description: '',
        category: '',
        price: 0,
        stock: 0,
        brand: '',
        images: [],
        thumbnail: '',
      } as IProduct,
      success: false,
    },
    categories: [] as string[],
    categoryError: null as string | null,
  }),
  getters: {
    productCount: state => state.productsResponse.products.length,
    productsByCategory: state => {
      return (category: string) =>
        state.productsResponse.products.filter(product => product.category === category)
    },
    inStockProducts: state => {
      return state.productsResponse.products.filter(
        product => product.stock !== null && product.stock > 0
      )
    },
    getProductById: state => {
      return (id: number) => state.productsResponse.products.find(p => p.id === id)
    },
  },
  actions: {
    async fetchAll(props: FetchProductsParams) {
      this.productsResponse = await fetchProducts(props)
    },

    async fetchById(id: number) {
      this.productResponse = await fetchProduct(id)
    },

    async fetchAllCategoryList() {
      this.categories = await fetchCategoryList()
    },

    async deleteProduct(id: number) {
      this.productsResponse.products = this.productsResponse.products.filter(item => item.id !== id)
      return await fetchDeleteProduct(id)
    },

    async bulkDeleteProducts(ids: number[]): Promise<{ success: boolean; error: string | null }> {
      this.productsResponse.products = this.productsResponse.products.filter(
        product => !ids.includes(product.id)
      )
      return {
        success: true,
        error: null,
      }
    },

    updateProductPrice(id: number, newPrice: number) {
      const product = this.productsResponse.products.find(p => p.id === id)
      if (product) {
        product.price = newPrice
      }
    },

    updateBulkProductPrice(ids: number[], newPrice: number) {
      this.productsResponse.products = this.productsResponse.products.map(product => {
        return ids.includes(product.id) ? { ...product, price: newPrice } : product
      })
    },

    addProduct(product: IProduct) {
      this.productsResponse.products.push(product)
    },
    updateProduct(updatedProduct: IProduct) {
      const index = this.productsResponse.products.findIndex((p: any) => p.id === updatedProduct.id)
      if (index !== -1) {
        this.productsResponse.products[index] = { ...updatedProduct }
      }
    },
  },
})
