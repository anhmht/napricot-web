<template>
  <el-drawer
    :model-value="open"
    direction="rtl"
    @close="$emit('update:open', false)"
    size="90%"
    :class="$style.categoryDrawer"
  >
    <template #header>
      <NuxtPicture
        format="webp"
        :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/8a7c1d2c-57eb-4120-5bb6-47e54128e600/thumbnail`"
        alt="Napricot"
        width="120"
        height="39"
      />
    </template>
    <template #default>
      <div :class="$style.link">
        <NuxtLink
          v-show="!currentUser"
          to="/sign-in"
          @click="$emit('update:open', false)"
        >
          Sign in or Register</NuxtLink
        >
        <NuxtLink to="/tracking" @click="$emit('update:open', false)">
          Tracking
        </NuxtLink>
      </div>
      <div :class="$style.menu">
        <layout-language />
        <el-collapse v-model="activeNames">
          <el-collapse-item v-if="currentUser" title="Profile" name="1">
            <layout-header-account />
          </el-collapse-item>
          <el-collapse-item title="Categories" name="2">
            <el-tree
              :data="categories"
              :props="{
                children: 'children',
                label: 'name'
              }"
              :icon="ArrowRight"
            />
          </el-collapse-item>
        </el-collapse>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:open'])

const config = useRuntimeConfig()
const store = useMainStore()

const activeNames = ref<string[]>(['1', '2'])

const currentUser = computed(() => store.currentUser)
const categories = computed<ICategory[] | undefined>(() =>
  store.getTreeCategories()
)
</script>

<style module lang="postcss">
.categoryDrawer {
  :global(.el-drawer__header) {
    margin-bottom: 16px;
  }
  :global(.el-drawer__body) {
    padding-top: 0;
  }
  :global(.el-tree-node__content) {
    padding-top: 8px;
    padding-bottom: 8px;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  :global(.el-tree-node__label) {
    padding-left: 16px;
  }
}
.link {
  display: flex;
  gap: 16px;
}
.menu {
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  :global(.el-collapse) {
    border: none;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  :global(.el-collapse-item__header) {
    border-bottom: none;
    padding: 0 16px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    font-size: 1.6rem;
    font-weight: 600;
  }
  :global(.el-collapse-item__header.is-active) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  :global(.el-collapse-item__wrap) {
    padding: 16px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;
  }
  :global(.el-collapse-item__content) {
    padding: 0;
  }
}
</style>
