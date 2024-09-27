<template>
  <div :class="$style.form">
    <h4>Post</h4>
    <el-form
      action="submit"
      ref="formRef"
      :model="form"
      :rules="rules"
      :disabled="isLoading"
      require-asterisk-position="right"
    >
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
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
        :rows="3"
        @input="updateForm('desc', $event)"
      />
      <custom-image-upload
        v-model:image="form.image"
        name="image"
        label="Feature Image"
      />
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { FormInstance, FormRules } from 'element-plus'
import slugify from 'slugify'

const props = defineProps({
  post: {
    type: Object as () => IPost,
    required: true
  }
})

const emit = defineEmits(['update:post'])

const formRef = ref<FormInstance>()
const form = ref<IPost>(props.post)
const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')

const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: 'Please input post title',
      trigger: ['blur', 'change']
    }
  ]
})

const updateForm = (key: string, value: any) => {
  const updateForm: IPost = {
    ...form.value,
    [key]: value
  }
  emit('update:post', updateForm)
}

const submitForm = () => {}

watch(
  () => props.post.title,
  (title) => {
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
