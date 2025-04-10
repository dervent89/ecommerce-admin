<script setup lang="ts">
import { provide, type Ref, ref } from 'vue'
import Header from '@/components/common/Header.vue'
import Sidebar from '@/components/common/Sidebar.vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useScreen } from '@/composables/useScreen.ts'

export type MainLayoutContext = {
  pageTitle: Ref<string>
  showBackButton: Ref<boolean>
  showSidebar: Ref<boolean>
  sidebarCollapsed: Ref<boolean>
  setPageTitle: (title: string) => void
  setShowBackButton: (visible: boolean) => void
  setShowSidebar: (visible: boolean) => void
  setSidebarCollapsed: (visible: boolean) => void
}

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { isMobile } = useScreen()

const layoutContext: MainLayoutContext = {
  pageTitle: ref(''),
  showBackButton: ref(false),
  showSidebar: ref(true),
  sidebarCollapsed: ref(false),
  setPageTitle: (title: string) => {
    layoutContext.pageTitle.value = title
  },
  setShowBackButton: (visible: boolean) => {
    layoutContext.showBackButton.value = visible
  },
  setShowSidebar: (visible: boolean) => {
    layoutContext.showSidebar.value = visible
  },
  setSidebarCollapsed: (visible: boolean) => {
    layoutContext.sidebarCollapsed.value = visible
  },
}
watch(
  () => route.fullPath,
  () => {
    layoutContext.pageTitle.value = ''
    layoutContext.showSidebar.value = true
    layoutContext.showBackButton.value = false
  }
)
provide('layoutContext', layoutContext)
</script>

<template>
  <div class="layout">
    <Header />
    <main
      class="main"
      :class="{
        no_sidebar: !layoutContext.showSidebar.value,
        collapsed: layoutContext.sidebarCollapsed.value,
      }"
    >
      <div class="sidebar" v-if="layoutContext.showSidebar.value">
        <Sidebar />
      </div>
      <div class="content">
        <div class="page_header" v-if="layoutContext.pageTitle.value">
          <a-button
            size="middle"
            @click="router.back()"
            type="text"
            v-if="layoutContext.showBackButton.value"
          >
            <template #icon><ArrowLeftOutlined /></template>
          </a-button>
          <a-typography-title style="margin-bottom: 0" :level="isMobile ? 5 : 4">
            {{ t(layoutContext.pageTitle.value) }}
          </a-typography-title>
        </div>
        <div><router-view /></div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 60px;
  .main {
    display: grid;
    grid-template-columns: 240px 1fr;
    flex: 1;
    overflow: auto;
    height: calc(100% - 60px);
    transition: all 0.2s ease-in-out;
    @media screen and (min-width: 768.1px) {
      &.collapsed {
        grid-template-columns: 85px 1fr;
      }
    }
    .sidebar {
      width: 100%;
      height: 100%;
      background: #fff;
      border-right: 1px solid #f1f1f1;
      position: relative;
    }
    .content {
      width: 100%;
      max-width: calc(1200px + 48px);
      margin: 0 auto;
      padding: 24px;
      box-sizing: border-box;
      overflow: auto;
    }
  }
}
.main.no_sidebar {
  grid-template-columns: 1fr;
}
.page_header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 16px;
  gap: 8px;
}

@media screen and (max-width: 768px) {
  .layout {
    .main {
      grid-template-columns: 1fr;
      .sidebar {
        position: fixed;
        left: -100%;
        width: 100%;
        z-index: 99;
        transition: all 0.3s ease-in-out;
      }
      &.collapsed {
        .sidebar {
          left: 0;
        }
      }
      .content {
        max-width: none;
        padding: 16px 0;
      }
    }
  }
  .page_header {
    padding: 0 16px;
  }
}
</style>
