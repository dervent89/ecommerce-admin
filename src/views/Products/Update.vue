<template>
  <a-card :loading="loading">
    <product-form
      :model-ref="modelRef"
      :validate-infos="validateInfos"
      :categories="productStore.categories"
      :on-submit="onSubmit"
    >
      <template #submit-button>
        <a-form-item>
          <a-button type="primary" @click.prevent="onSubmit">{{
            t('product.list.operations.update')
          }}</a-button>
        </a-form-item>
      </template>
    </product-form>
  </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, toRaw, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { Form } from 'ant-design-vue'
import { useProductStore } from '@/stores/productStore.ts'
import ProductForm from '@/components/product/Form.vue'
import type { IProduct, IProductImage } from '@/types/product.ts'
import type { MainLayoutContext } from '@/layouts/MainLayout.vue'

const layoutContext = inject<MainLayoutContext>('layoutContext')
const { t } = useI18n()
const route = useRoute()
const id = Number(route.params.id)
const productStore = useProductStore()
const useForm = Form.useForm
const loading = ref(true)

const modelRef = reactive<IProduct>({
  title: '',
  price: 0,
  brand: '',
  description: '',
  category: '',
  images: [],
  stock: 0,
  id: 0,
  thumbnail: '',
})
const rulesRef = reactive({
  title: [
    {
      required: true,
      message: t('product.validateMessages.title'),
    },
  ],
  price: [
    {
      required: true,
      message: t('product.validateMessages.price'),
    },
  ],
})

const getDetail = async () => {
  await productStore.fetchById(id)
  await productStore.fetchAllCategoryList()
  Object.assign(modelRef, productStore.productResponse.product)
  modelRef.images = productStore.productResponse.product.images.map((item, i) => {
    return {
      uid: i.toString(),
      name: item,
      status: 'done',
      url: item,
      thumbUrl: item,
    }
  }) as IProductImage[]
  loading.value = false
}

const { validate, validateInfos } = useForm(modelRef, rulesRef)
const onSubmit = () => {
  validate()
    .then(() => {
      console.log(toRaw(modelRef))
    })
    .catch(err => {
      console.log('error', err)
    })
}

onMounted(async () => {
  await getDetail()
  layoutContext?.setPageTitle('product.list.operations.update')
  layoutContext?.setShowBackButton(true)
})
</script>
