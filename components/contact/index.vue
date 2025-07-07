<template>
  <div :class="$style.form">
    <div :class="$style.header">
      <h5>Contact us</h5>
      <p>
        Whether you have a question, need help with an order, or want to share
        your story, our friendly customer service team is ready to assist
      </p>
    </div>
    <el-form ref="formRef" :model="form" :rules="rules">
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <custom-field
        v-model="form.email"
        name="email"
        label="Email address"
        :disabled="isLoading"
        placeholder="Email address"
      >
      </custom-field>
      <custom-field
        v-model="form.name"
        name="name"
        label="Name"
        :disabled="isLoading"
        placeholder="Full name"
      ></custom-field>
      <custom-field
        v-model="form.subject"
        name="subject"
        label="Subject"
        :disabled="isLoading"
        placeholder="Subject"
      >
      </custom-field>
      <custom-select
        v-model="form.type"
        name="type"
        label="How can we help?"
        :options="types"
        :disabled="isLoading"
      />
      <custom-select
        v-if="form.type && form.type !== 'Other'"
        v-model="form.description"
        name="description"
        :label="descLabel"
        :options="descriptions"
        :disabled="isLoading"
      />
      <custom-field
        v-model="form.content"
        name="content"
        label="Message"
        type="textarea"
        :rows="4"
        :disabled="isLoading"
        placeholder="Message"
      />
      <div id="recaptcha-container" />
      <custom-button type="primary" @click="submitForm" :disabled="isLoading"
        >Submit
        <i class="icon-arrow-right" />
      </custom-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
declare global {
  interface Window {
    grecaptcha: any
    recaptchaCallback: () => void
  }
}

import type { FormInstance, FormRules } from 'element-plus'
import { OptionType } from 'element-plus/es/components/select-v2/src/select.types.mjs'
import { contactTypes } from '~/models/Contact'

const emit = defineEmits(['success'])
const errorMessage = ref('')
const isLoading = ref(false)
const formRef = ref<FormInstance>()
const form = reactive<Contact>({
  email: '',
  name: '',
  subject: '',
  type: '',
  description: '',
  content: ''
})
const rules = reactive<FormRules>({
  email: [
    {
      required: true,
      message: 'Please input email address',
      trigger: ['blur', 'change']
    },
    {
      type: 'email',
      message: 'Please input a valid email address',
      trigger: ['blur', 'change']
    }
  ],
  name: [
    {
      required: true,
      message: 'Please input name',
      trigger: ['blur', 'change']
    }
  ],
  subject: [
    {
      required: true,
      message: 'Please input subject',
      trigger: ['blur', 'change']
    }
  ],
  type: [
    {
      required: true,
      message: 'Please select a type',
      trigger: ['blur', 'change']
    }
  ],
  description: [
    {
      validator: (rule, value, callback) => {
        console.log(value)

        if (form.type === 'Other' || value) {
          callback()
        } else {
          callback(new Error('Please select a description'))
        }
      },
      trigger: ['blur', 'change']
    }
  ],
  content: [
    {
      required: true,
      message: 'Please input content',
      trigger: ['blur', 'change']
    }
  ]
})

const config = useRuntimeConfig()

const types = ref<OptionType[]>(
  contactTypes.map((type) => ({ value: type.type, label: type.type }))
)

const descriptions = computed<OptionType[]>(() => {
  const selectedType = contactTypes.find((type) => type.type === form.type)
  return selectedType
    ? selectedType.desc.map((type) => ({ value: type, label: type }))
    : []
})

const descLabel = computed<string>(() => {
  const selectedType = contactTypes.find((type) => type.type === form.type)
  return selectedType ? selectedType.label : 'Description'
})

useHead({
  script: [
    {
      src: 'https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit',
      async: true,
      defer: true
    }
  ]
})

const recaptchaResponse = ref('')

const onRecaptchaSuccess = (token: string) => {
  recaptchaResponse.value = token
}

const loadRecaptcha = () => {
  if (window.grecaptcha) {
    window.grecaptcha.render('recaptcha-container', {
      sitekey: config.public.recaptchaSiteKey,
      callback: onRecaptchaSuccess
    })
  }
}

const submitForm = () => {
  return new Promise<void>((resolve) => {
    if (!recaptchaResponse.value) {
      errorMessage.value = 'Please complete the reCAPTCHA'
      return
    }
    formRef.value?.validate(async (valid: boolean) => {
      if (valid) {
        isLoading.value = true
        try {
          await $contactService.submitTicket(form)

          ElNotification.success({
            title: 'A new ticket has been submitted',
            message: `We will get in touch with you soon`
          })

          emit('success')
        } catch (error: any) {
          errorMessage.value = error.message
        }
        isLoading.value = false
        resolve()
      } else {
        resolve()
      }
    })
  })
}

onMounted(() => {
  if (window.grecaptcha) {
    loadRecaptcha()
  } else {
    window.recaptchaCallback = loadRecaptcha
  }
})
</script>

<style lang="postcss" module>
.form {
  width: 624px;
  border: 1px solid #dcdcdc;
  box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 32px;
}
.header {
  margin-bottom: 24px;
  h5 {
    font-weight: 700;
    text-align: center;
    line-height: 28px;
    margin-bottom: 12px;
  }
  p {
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: var(--color-icon);
    padding: 0 12px;
  }
}
.button {
  margin-top: 24px;
}
:global(#recaptcha-container) {
  margin: 24px 0;
}
</style>
