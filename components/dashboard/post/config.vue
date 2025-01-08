<template>
  <div :class="$style.config">
    <h4>Post Config</h4>
    <custom-select
      v-model="form.status"
      name="status"
      label="Status"
      :options="postStatuses"
      @input="updateForm('status', $event)"
      :style="{ marginBottom: '16px' }"
    />
    <custom-field
      v-model="form.externalUrl"
      name="externalUrl"
      label="Download Link"
      @input="updateForm('externalUrl', $event)"
    />
    <h4 :class="$style.organization">Organization</h4>
    <custom-select
      v-model="form.categoryId"
      name="categoryId"
      label="Category"
      :options="categoriesOptions"
      @input="updateForm('categoryId', $event)"
    />
    <custom-tag
      name="tags"
      label="Tags"
      v-model="form.tags"
      :style="{ marginBottom: '16px' }"
      @change="updateForm('tags', $event)"
    />
    <h4>Suggested Link</h4>
    <dashboard-post-suggest-link
      v-model:content="form.content"
      @change="updateForm('content', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { OptionType } from 'element-plus/es/components/select-v2/src/select.types.mjs'

const props = defineProps({
  post: {
    type: Object as () => IPost,
    required: true
  }
})

const emit = defineEmits(['update:post'])

const form = ref<IPost>(props.post)
const categories = ref<ICategory[]>([])

const postStatuses: OptionType[] = [
  { value: PostStatus.draft, label: 'Draft' },
  { value: PostStatus.published, label: 'Publish' },
  { value: PostStatus.deleted, label: 'Hidden' }
]

const categoriesOptions = computed<OptionType[]>(() => {
  return [
    ...categories.value
      .filter((cat) => cat.type === CategoryType.Post)
      .map((category) => ({
        value: category._id,
        label: category.name
      }))
  ]
})

const updateForm = (key: string, value: any) => {
  const updateForm: IPost = {
    ...form.value,
    [key]: value
  }
  emit('update:post', updateForm)
}

onMounted(async () => {
  categories.value = (await $categoryService.getAllCategories()).categories
})
</script>

<style lang="postcss" module>
.config {
  position: relative;
  padding: 16px 32px;
  h4 {
    font-weight: 400;
    margin-bottom: 16px;
  }
}
</style>
