<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import {PlusOutlined} from '@ant-design/icons-vue'
import type {IProduct} from "@/types/product.ts";

const { t } = useI18n()

// Props
defineProps<{
  modelRef: IProduct
  validateInfos: Record<string, any>
  categories: string[]
  onSubmit: () => void
}>()

</script>

<template>
  <a-form validate-trigger="blur" :model="modelRef" layout="vertical" @finish="onSubmit">
    <a-form-item :label="t('product.name')" v-bind="validateInfos.title">
      <a-input v-model:value="modelRef.title" />
    </a-form-item>

    <a-form-item :label="t('product.price')" v-bind="validateInfos.price">
      <a-input-number addon-before="$" v-model:value="modelRef.price" :min="0" style="width: 100%" />
    </a-form-item>

    <a-form-item :label="t('product.stock')" v-bind="validateInfos.stock">
      <a-input-number v-model:value="modelRef.stock" :min="0" style="width: 100%" />
    </a-form-item>

    <a-form-item :label="t('product.category')" v-bind="validateInfos.category">
      <a-select v-model:value="modelRef.category">
        <a-select-option v-for="category in categories" :key="category" :value="category">{{ category }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :label="t('product.description')" v-bind="validateInfos.description">
      <a-textarea v-model:value="modelRef.description" style="width: 100%; height: 90px" />
    </a-form-item>

    <a-form-item label="Upload" v-bind="validateInfos.images">
      <a-upload action="/upload.do" list-type="picture-card" v-model:fileList="modelRef.images">
        <div>
          <PlusOutlined />
          <div style="margin-top: 8px">Upload</div>
        </div>
      </a-upload>
    </a-form-item>

    <slot name="submit-button"></slot>
  </a-form>
</template>

<style scoped></style>
