<template>
  <div :class="$style.create" v-loading="isLoading">
    <layout-dashboard-header title="Create Post">
      <template #action>
        <custom-button type="default" @click="navigateTo('/dashboard/post')">
          Discard</custom-button
        >
        <custom-button type="default" @click="openPreview = true">
          Preview</custom-button
        >
        <custom-button type="primary" @click="handleSubmit" :disabled="loading">
          <i class="icon-add"></i>
          Create</custom-button
        >
      </template>
    </layout-dashboard-header>
    <el-form
      action="submit"
      ref="formRef"
      :model="post"
      :rules="rules"
      :disabled="isLoading"
      require-asterisk-position="right"
      scroll-to-error
      :scroll-into-view-options="{ behavior: 'smooth', block: 'center' }"
    >
      <div :class="$style.content">
        <div :class="$style.form">
          <dashboard-post-form v-model:post="post" v-model:loading="loading" />
        </div>
        <div :class="$style.config">
          <dashboard-post-config v-model:post="post" />
        </div>
      </div>
    </el-form>

    <dashboard-post-preview-modal v-model:open="openPreview" :post="post" />
  </div>
</template>

<script lang="ts" setup>
import { FormInstance, FormRules } from 'element-plus'
import { addIdsToHeadings } from '~/utils'

definePageMeta({
  layout: 'dashboard',
  middleware: 'authorize'
})

const loading = ref<boolean>(false)
const openPreview = ref<boolean>(false)

const store = useMainStore()

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
  tags: [],
  keywords: []
})

const formRef = ref<FormInstance>()
const isLoading = ref<boolean>(false)
const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: 'Please input post title',
      trigger: ['blur', 'change']
    }
  ],
  desc: [
    {
      required: true,
      message: 'Please input post description',
      trigger: ['blur', 'change']
    }
  ],
  content: [
    {
      required: true,
      message: 'Please input post content',
      trigger: ['blur', 'change']
    }
  ],
  image: [
    {
      required: true,
      message: 'Please upload post image',
      trigger: ['blur', 'change']
    }
  ],
  categoryId: [
    {
      required: true,
      message: 'Please select post category',
      trigger: ['change']
    }
  ]
})

const handleSubmit = async () => {
  formRef.value?.validate(async (valid) => {
    if (!valid) return
    post.value.images = post.value.images.filter((image) => {
      return post.value.content.includes(image.id)
    })
    post.value.author = store.currentUser?.userId
    post.value.content = addIdsToHeadings(post.value.content)
    isLoading.value = true
    await $postService.createPost(post.value)
    ElNotification.success({
      title: 'Post created successfully',
      message: `Post ${post.value.title} has been created`
    })
    isLoading.value = false
    navigateTo('/dashboard/post')
  })
}
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
  height: calc(100vh - 77px);
  overflow: auto;
  border-left: 1px solid var(--color-background-grayscale-100);
}
</style>
