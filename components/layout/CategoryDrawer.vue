<template>
  <custom-drawer
    :model-value="open"
    direction="right"
    @update:model-value="$emit('update:open', $event)"
    size="90%"
    class="categoryDrawer"
  >
    <template #header>
      <NuxtPicture
        format="webp"
        :src="`${config.public.imageUrl}/8a7c1d2c-57eb-4120-5bb6-47e54128e600/thumbnail`"
        alt="Napricot"
        width="120"
        height="39"
      />
    </template>
    <template #default>
      <div class="link">
        <NuxtLink
          v-show="!isLoggedIn"
          to="/sign-in"
          @click="$emit('update:open', false)"
        >
          Sign in or Register</NuxtLink
        >
        <NuxtLink to="#" @click="$emit('update:open', false)">
          Tracking
        </NuxtLink>
      </div>
      <div class="menu">
        <layout-language />
        <layout-header-account />
      </div>
    </template>
  </custom-drawer>
</template>

<script setup lang="ts">
defineProps({
  open: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:open'])

const config = useRuntimeConfig()
const store = useMainStore()
const { isLoggedIn } = useAuth()

const activeNames = ref<string[]>(['1', '2'])

const categories = computed<ICategory[] | undefined>(() =>
  store.getTreeCategories()
)
</script>

<style scoped lang="postcss">
.link {
  display: flex;
  gap: 16px;
  a {
    text-decoration: none;
    color: var(--color-text);
  }
}
.menu {
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
