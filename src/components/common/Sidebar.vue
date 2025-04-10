<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { reactive, h, watch, inject } from 'vue'
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons-vue'
import type { MainLayoutContext } from '@/layouts/MainLayout.vue'
import { useScreen } from '@/composables/useScreen.ts'

const layoutContext = inject<MainLayoutContext>('layoutContext')
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const { isMobile } = useScreen()

const state = reactive({
  collapsed: false,
  selectedKeys: [route.path],
  openKeys: [],
  preOpenKeys: [],
})

const toggleCollapsed = () => {
  state.collapsed = !state.collapsed
  state.openKeys = state.collapsed ? [] : state.preOpenKeys
}

const handlerGo = (url: string) => {
  if (isMobile) {
    layoutContext?.setSidebarCollapsed(false)
    router.push(url)
  }
}

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal
    layoutContext?.setSidebarCollapsed(state.collapsed)
  }
)
</script>

<template>
  <aside class="aside">
    <div class="expand_menu_btn" :class="{ collapsed: state.collapsed }">
      <a-tooltip :title="state.collapsed ? 'Genişlet' : 'Daralt'" placement="right" trigger="hover">
        <a-button
          @click="toggleCollapsed"
          size="middle"
          :shape="state.collapsed ? 'rounded' : 'circle'"
          :icon="h(state.collapsed ? RightOutlined : LeftOutlined)"
        />
      </a-tooltip>
    </div>
    <a-menu
      mode="inline"
      size="large"
      :inline-collapsed="state.collapsed && !isMobile"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      style="border-right: none !important"
    >
      <a-menu-item @click="() => handlerGo('/')" key="/">
        <template #icon><dashboard-outlined /></template>
        {{ t('menu.home') }}
      </a-menu-item>
      <a-menu-item @click="() => handlerGo('/products')" key="/products">
        <template #icon><appstore-outlined /></template>
        {{ t('menu.productManagement') }}
      </a-menu-item>
      <a-menu-item @click="() => handlerGo('/orders')" key="/orders">
        <template #icon><shopping-outlined /></template>
        {{ t('menu.orderManagement') }}
      </a-menu-item>
    </a-menu>
  </aside>
</template>

<style scoped lang="scss">
@media screen and (min-width: 768.1px) {
  .expand_menu_btn {
    position: absolute;
    right: 12px;
    top: 8px;
    transition: all 0.2s ease-in-out;
    opacity: 0;
    z-index: 2;

    &.collapsed {
      opacity: 1;
      top: 8px;
      right: 24px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      ~ ul {
        margin-top: 12px;
      }
    }
  }
  .aside {
    padding: 32px 4px;
    min-height: 100%;
    &:hover {
      .expand_menu_btn:not(.collapsed) {
        right: -16px;
        opacity: 1;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .expand_menu_btn {
    display: none;
  }
}
</style>
