<template>
  <div :class="$style.form">
    <h4>Post</h4>
    <custom-field
      v-model="form.title"
      name="title"
      label="Title"
      placeholder="Input post title"
      @input="updateForm('title', $event)"
    />
    <custom-field
      v-model="form.slug"
      name="slug"
      label="Slug"
      :disabled="true"
    />
    <custom-field
      v-model="form.desc"
      name="desc"
      label="Meta Description"
      type="textarea"
      :rows="2"
      @input="updateForm('desc', $event)"
    />
    <custom-image-upload
      v-model:image="form.image"
      name="image"
      label="Feature Image"
    />

    <ckeditor-custom
      name="content"
      label="Content"
      v-model="form.content"
      v-model:images="form.images"
      @input="updateForm('content', $event)"
    />

    <custom-content-assessor
      :title="form.title"
      :description="form.desc"
      :content="form.content"
      :slug="form.slug"
    />
  </div>
</template>

<script lang="ts" setup>
import slugify from 'slugify'

const props = defineProps({
  post: {
    type: Object as () => IPost,
    required: true
  }
})

const emit = defineEmits(['update:post'])

const form = ref<IPost>(props.post)

const updateForm = (key: string, value: any) => {
  const updateForm: IPost = {
    ...form.value,
    [key]: value
  }
  emit('update:post', updateForm)
}

watch(
  () => props.post.title,
  (title) => {
    if (props.post._id) return
    form.value.slug = slugify(title, { lower: true })
    updateForm('slug', form.value.slug)
  },
  { immediate: true }
)
watch(
  () => form.value.image,
  (image) => {
    updateForm('image', image)
  },
  { immediate: true }
)
watch(
  () => form.value.images,
  (images) => {
    updateForm('images', images)
  },
  { immediate: true }
)
</script>

<style lang="postcss" module>
.form {
  position: relative;
  padding: 16px 32px;
  h4 {
    font-weight: 400;
    margin-bottom: 16px;
  }
}
</style>
