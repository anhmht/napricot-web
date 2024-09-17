<template>
  <div :class="$style.categoryForm">
    <el-form
      action="submit"
      ref="formRef"
      :model="form"
      :rules="rules"
      :disabled="isLoading"
      require-asterisk-position="right"
      @submit.prevent="handleSubmit"
    >
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <custom-field
        v-model="form.name"
        name="name"
        label="ICategory Name"
        placeholder="Enter category name"
      />
      <custom-field
        :disabled="true"
        v-model="form.slug"
        name="slug"
        label="Slug"
        placeholder="example-category-slug"
      />
      <custom-field
        v-model="form.desc"
        name="desc"
        label="Description"
        placeholder="Enter category description"
      />
      <custom-select
        v-model="form.parentId"
        name="parentId"
        label="Parent ID"
        placeholder="No Parent"
        :options="categoriesOptions"
      />
      <custom-select
        v-model="form.type"
        name="type"
        label="Type"
        :options="categoryTypes"
      />
      <div :class="$style.button">
        <custom-button :disabled="isLoading" native-type="submit">
          {{ buttonTitle }}
        </custom-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import slugify from 'slugify'
import type { FormInstance, FormRules } from 'element-plus'
import { OptionType } from 'element-plus/lib/components/select-v2/src/select.types.js'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:loading', 'submit-success'])

const categoryTypes: OptionType[] = [
  { value: CategoryType.Product, label: 'Product' },
  { value: CategoryType.Post, label: 'Post' }
]

const formRef = ref<FormInstance>()
const form = reactive<ICategory>({
  name: '',
  slug: '',
  desc: '',
  type: CategoryType.Product,
  parentId: undefined
})
const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')
const buttonTitle = ref<string>('Create')
const categoriesOptions = ref<OptionType[]>([])

const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: 'Please input category name',
      trigger: ['blur', 'change']
    }
  ],
  type: [
    {
      required: true,
      message: 'Please input category description',
      trigger: ['blur', 'change']
    }
  ]
})

const handleSubmit = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      isLoading.value = true
      emit('update:loading', true)
      try {
        const category = await $categoryService.createCategory(form)
        emit('submit-success', category)
        ElNotification.success({
          title: 'ICategory created successfully',
          message: `ICategory ${category.name} has been created`
        })
        formRef.value?.resetFields()
      } catch (error: any) {
        errorMessage.value = error.message
      } finally {
        isLoading.value = false
        emit('update:loading', false)
      }
    }
  })
}

watchEffect(() => {
  form.slug = slugify(form.name, { lower: true, strict: true, trim: true })
})

onMounted(async () => {
  const data = await $categoryService.getAllCategories()
  categoriesOptions.value = [
    { value: undefined, label: 'No Parent' },
    ...data.categories.map((category) => ({
      value: category._id,
      label: category.name
    }))
  ]
})
</script>

<style lang="postcss" module>
.categoryForm {
  position: relative;
}
.button {
  padding-top: 16px;
}
</style>
