<template>
  <div v-if="product.id">
    <a-card>
      <template #title>
        <a-button
          @click="() => router.push(`/products/update/${product.id}`)"
          size="small"
          type="primary"
          >{{ t('product.list.operations.update') }}</a-button
        >
      </template>
      <div class="image">
        <a-image-preview-group>
          <a-image
            v-for="image in product.images"
            :key="image"
            :height="200"
            :src="image"
            :alt="product.title"
          />
        </a-image-preview-group>
      </div>
      <a-descriptions bordered size="default" :column="1">
        <a-descriptions-item :label="t('product.name')">{{ product.title }}</a-descriptions-item>
        <a-descriptions-item :label="t('product.brand')">${{ product.brand }}</a-descriptions-item>
        <a-descriptions-item :label="t('product.price')">${{ product.price }}</a-descriptions-item>
        <a-descriptions-item :label="t('product.stock')">${{ product.stock }}</a-descriptions-item>
        <a-descriptions-item :label="t('product.category')"
          >${{ product.category }}</a-descriptions-item
        >
        <a-descriptions-item :label="t('product.description')">
          {{ product.description }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
  <a-empty v-else :description="t('product.detail.notProductFound')" />
</template>

<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore.ts'
import type { MainLayoutContext } from '@/layouts/MainLayout.vue'

const layoutContext = inject<MainLayoutContext>('layoutContext')
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const productId = Number(route.params.id)
const product = computed(() => productStore.productResponse.product)

onMounted(async () => {
  await productStore.fetchById(productId)
  layoutContext?.setPageTitle('product.detail.pageTitle')
  layoutContext?.setShowBackButton(true)
})
</script>

<style scoped>
.image {
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
}
</style>
