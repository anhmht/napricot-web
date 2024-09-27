<template>
  <div :class="$style.create">
    <layout-dashboard-header title="Create Post">
      <template #action>
        <custom-button type="default" @click="navigateTo('/dashboard/post')">
          Discard</custom-button
        >
        <custom-button type="primary" @click="">
          <i class="icon-add"></i>
          Create</custom-button
        >
      </template>
    </layout-dashboard-header>
    <div :class="$style.content">
      <div :class="$style.form">
        <dashboard-post-form v-model:post="post" />
      </div>
      <div :class="$style.config"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'authorize'
})

const post = ref<IPost>({
  title: '',
  slug: '',
  desc: '',
  image: undefined,
  images: [],
  categoryId: undefined,
  content: '',
  author: '',
  status: PostStatus.draft,
  tags: []
})

watch(post, (value) => {
  console.log(value)
})
</script>

<style lang="postcss" module>
.create {
  position: relative;
}
.content {
  display: flex;
}
.form {
  flex: 1;
  height: calc(100vh - 77px);
  overflow: auto;
}
.config {
  width: 400px;
  border-left: 1px solid var(--color-background-grayscale-100);
}
</style>
