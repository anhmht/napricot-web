<template>
  <custom-modal
    :open="open"
    @update:open="$emit('update:open', $event)"
    title="Create Amazon Button"
    :loading="isLoading"
    :class="$style.amazonButtonForm"
  >
    <el-form
      action="submit"
      ref="formRef"
      :model="form"
      :rules="rules"
      :disabled="isLoading"
      require-asterisk-position="right"
      @submit.prevent="handleSubmit"
    >
      <custom-field
        v-model="form.url"
        name="url"
        label="Amazon URL"
        placeholder="Enter Amazon product URL"
      />
      <div :class="$style.preview">
        <div v-if="previewLoading" style="text-align: center; margin: 12px 0">
          Loading preview…
        </div>
        <div v-else-if="preview" v-html="getPreviewHtml(preview)"></div>
        <div v-else-if="previewError" style="color: red; text-align: center">
          {{ previewError }}
        </div>
        <div style="text-align: center; margin: 24px 0">
          <a
            :href="form.url || '#'"
            style="
              display: inline-flex;
              align-items: center;
              background: #fad250;
              color: #111;
              padding: 12px;
              border-radius: 8px;
              font-size: 1.8rem;
              font-weight: 500;
              font-family: Arial Black, Arial, sans-serif;
              text-decoration: none;
              line-height: 1.2;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
              border: none;
            "
            target="_blank"
          >
            View on Amazon
            <img
              src="/amazon-a.svg"
              alt="Amazon a"
              style="
                height: 30px;
                display: inline-block;
                vertical-align: middle;
                margin-left: 12px;
              "
            />
          </a>
        </div>
      </div>
      <div :class="$style.button">
        <custom-button :disabled="isLoading" native-type="submit">
          {{ buttonTitle }}
        </custom-button>
      </div>
    </el-form>
  </custom-modal>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ref, watch } from 'vue'
import debounce from 'lodash/debounce'

defineProps({
  open: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:open', 'update:loading', 'submit-success'])

const formRef = ref<FormInstance>()
const form = reactive({
  url: ''
})
const isLoading = ref<boolean>(false)
const buttonTitle = ref<string>('Create')

const rules = reactive<FormRules>({
  url: [
    {
      required: true,
      message: 'Please input Amazon URL',
      trigger: ['blur', 'change']
    }
  ]
})

const preview = ref<{
  title: string
  description: string
  image: string
  url: string
} | null>(null)
const previewLoading = ref(false)
const previewError = ref('')

const fetchPreview = debounce(async (url: string) => {
  preview.value = null
  previewError.value = ''
  if (!url) return
  previewLoading.value = true
  try {
    preview.value = await $previewService.getPreviewLink(url)
  } catch (e) {
    previewError.value = 'Could not fetch preview'
  } finally {
    previewLoading.value = false
  }
}, 500)

watch(
  () => form.url,
  (url) => {
    fetchPreview(url)
  }
)

const handleSubmit = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      isLoading.value = true
      emit('update:loading', true)
      try {
        // Emit preview data as well
        emit('submit-success', { ...form, preview: preview.value })
        formRef.value?.resetFields()
        emit('update:open', false)
      } catch (error: any) {
        // handle error
      } finally {
        isLoading.value = false
        emit('update:loading', false)
      }
    }
  })
}

const getPreviewHtml = (preview: {
  image: string
  title: string
  description: string
  url: string
}) => {
  if (!preview) return ''
  return `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:20px;background:#fafbfc;border:1px solid #eee;border-radius:8px;padding:20px;margin:12px 0;margin-bottom:24px;max-width:100%;">
      <img src="${preview.image}" alt="Preview" style="width:160px;max-width:100%;height:160px;object-fit:cover;border-radius:12px;flex-shrink:0;display:block;margin:auto 0;">
      <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:8px;justify-content:center;">
        <div style="font-size:1.2rem;font-weight:600;color:#222;margin-bottom:2px;word-break:break-word;">${preview.title}</div>
        <div style="font-size:1rem;color:#666;word-break:break-word;line-height:1.3;">${preview.description}</div>
      </div>
    </div>
  `
}
</script>

<style lang="postcss" module>
.amazonButtonForm {
  position: relative;
  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
.button {
  padding-top: 16px;
}
.preview {
  margin-bottom: 16px;
}
.linkPreview {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #fafbfc;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  margin: 12px 0;
  max-width: 100%;
}
.previewImg {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}
.previewText {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.previewTitle {
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 2px;
  word-break: break-word;
}
.previewDesc {
  font-size: 1rem;
  color: #666;
  word-break: break-word;
  line-height: 1.3;
}
.previewUrl {
  font-size: 0.9rem;
  color: #aaa;
  word-break: break-all;
}
@media (max-width: 600px) {
  .linkPreview {
    flex-direction: column;
    align-items: stretch;
    padding: 8px;
  }
  .previewImg {
    width: 100%;
    height: auto;
    max-height: 160px;
    margin-bottom: 8px;
  }
  .previewText {
    gap: 2px;
  }
  .previewTitle {
    font-size: 1rem;
  }
  .previewDesc {
    font-size: 0.9rem;
  }
  .previewUrl {
    font-size: 0.8rem;
  }
}
</style>
