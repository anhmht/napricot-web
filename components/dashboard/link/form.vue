<template>
  <div :class="$style.linkForm">
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
        v-model="form.words"
        name="words"
        label="Link Words"
        placeholder="Enter link words"
      />
      <custom-field
        v-model="form.description"
        name="description"
        label="Description"
        placeholder="Enter link description"
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
import type { FormInstance, FormRules } from 'element-plus'
import { OptionType } from 'element-plus/lib/components/select-v2/src/select.types.js'

const props = defineProps({
  id: {
    type: String,
    default: undefined
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:loading', 'submit-success'])

const formRef = ref<FormInstance>()
const form = reactive<ILink>({
  words: '',
  url: '',
  description: '',
  posts: [],
  products: []
})
const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')
const buttonTitle = ref<string>('Create')

const rules = reactive<FormRules>({
  words: [
    {
      required: true,
      message: 'Please input words',
      trigger: ['blur', 'change']
    }
  ],
  url: [
    {
      required: true,
      message: 'Please input link',
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
        const link = props.id
          ? await $linkService.updateLink(props.id, form)
          : await $linkService.createLink(form)
        emit('submit-success', link)
        ElNotification.success({
          title: props.id
            ? 'Link updated successfully'
            : 'Link created successfully',
          message: `Link '${link.words}' has been ${
            props.id ? 'updated' : 'created'
          }`
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

const getLink = async (id: string) => {
  try {
    const link = await $linkService.getLink(id)
    form.words = link.words
    form.url = link.url
    form.description = link.description
  } catch (error: any) {
    errorMessage.value = error.message
  }
}

watch(
  () => props.id,
  async (id) => {
    if (id) {
      buttonTitle.value = 'Save'
      isLoading.value = true
      emit('update:loading', true)

      await getLink(id)

      isLoading.value = false
      emit('update:loading', false)
    } else {
      buttonTitle.value = 'Create'
      formRef.value?.resetFields()
    }
  },
  { immediate: true }
)
</script>

<style lang="postcss" module>
.linkForm {
  position: relative;
}
.button {
  padding-top: 16px;
}
</style>
