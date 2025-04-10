<script setup lang="ts">
import { CloseOutlined, DownOutlined, MenuOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { h, inject, reactive, watch } from 'vue'
import type { MainLayoutContext } from '@/layouts/MainLayout.vue'
import { useScreen } from '@/composables/useScreen.ts'

const layoutContext = inject<MainLayoutContext>('layoutContext')
const { locale, availableLocales } = useI18n()
const { isMobile } = useScreen()
const changeLang = (lang: string) => {
  locale.value = lang
}
const state = reactive({
  collapsed: false,
})
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed
}
watch(
  () => state.collapsed,
  _val => {
    layoutContext?.setSidebarCollapsed(state.collapsed)
  }
)
watch(
  () => layoutContext?.sidebarCollapsed.value,
  newVal => {
    state.collapsed = newVal || false
  }
)
</script>

<template>
  <header class="header">
    <div class="site_container header_inner">
      <div class="logo">ECOMMERCE</div>
      <div class="header_right">
        <a-dropdown trigger="click">
          <a-button size="middle" type="default" class="ant-dropdown-link" @click.prevent>
            {{ locale.toLocaleUpperCase() }}
            <DownOutlined />
          </a-button>
          <template #overlay>
            <a-menu :selected-keys="[locale]">
              <a-menu-item
                v-for="availableLocale in availableLocales"
                @click="changeLang(availableLocale)"
                :key="availableLocale"
              >
                {{ availableLocale.toLocaleUpperCase() }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <a-button
          v-if="isMobile"
          @click="toggleCollapsed"
          size="middle"
          :icon="h(state.collapsed ? CloseOutlined : MenuOutlined)"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  background-color: #fff;
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02),
    0 2px 4px 0 rgba(0, 0, 0, 0.02);
  position: fixed;
  top: 0;
  z-index: 100;
  .header_inner {
    height: 60px;
    display: grid;
    grid-template-columns: 240px 1fr;
    align-items: center;
  }
  .logo {
    height: 100%;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .header_right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 12px;
  }
}
</style>
