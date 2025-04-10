<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import enUS from 'ant-design-vue/es/locale/en_US'
import trTR from 'ant-design-vue/es/locale/tr_TR'
import dayjs from 'dayjs'
import 'dayjs/locale/tr'
import { useScreen } from '@/composables/useScreen.ts'

const { locale } = useI18n()
const { isMobile, isTablet } = useScreen()

dayjs.locale(locale.value)
</script>

<template>
  <a-config-provider
    :component-size="isMobile ? 'small' : isTablet ? 'middle' : 'large'"
    :locale="locale === 'tr' ? trTR : enUS"
    :theme="{
      token: { colorPrimary: '#52922F' },
    }"
  >
    <a-app>
      <router-view></router-view>
    </a-app>
  </a-config-provider>
</template>

<style scoped></style>
