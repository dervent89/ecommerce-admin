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
            t('product.list.operations.add')
          }}</a-button>
        </a-form-item>
      </template>
    </product-form>
  </a-card>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, onMounted, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from 'ant-design-vue'
import { useProductStore } from '@/stores/productStore.ts'
import ProductForm from '@/components/product/Form.vue'
import type { IProduct } from '@/types/product.ts'
import type { MainLayoutContext } from '@/layouts/MainLayout.vue'

const layoutContext = inject<MainLayoutContext>('layoutContext')

const useForm = Form.useForm
const { t } = useI18n()
const productStore = useProductStore()
const loading = ref(false)

const modelRef = reactive<IProduct>({
  title: '',
  price: null,
  brand: '',
  description: '',
  category: '',
  images: [],
  stock: null,
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

onMounted(() => {
  layoutContext?.setPageTitle('product.list.operations.add')
  layoutContext?.setShowBackButton(true)
  layoutContext?.setShowSidebar(false)
})
</script>
