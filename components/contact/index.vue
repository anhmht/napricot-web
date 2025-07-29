<template>
  <div :class="$style.form">
    <div :class="$style.header">
      <h5>Contact us</h5>
      <p>
        Whether you have a question, need help with an order, or want to share
        your story, our friendly customer service team is ready to assist
      </p>
    </div>
    <form>
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <CustomInputField
        ref="emailRef"
        v-model="form.email"
        name="email"
        label="Email address"
        :disabled="isLoading"
        placeholder="Email address"
        autocomplete="email"
        :validator="validateEmail"
      >
      </CustomInputField>
      <CustomInputField
        ref="nameRef"
        v-model="form.name"
        name="name"
        label="Name"
        :disabled="isLoading"
        placeholder="Full name"
        autocomplete="name"
        :validator="validateName"
      ></CustomInputField>
      <CustomInputField
        ref="subjectRef"
        v-model="form.subject"
        name="subject"
        label="Subject"
        :disabled="isLoading"
        placeholder="Subject"
        :validator="validateSubject"
      >
      </CustomInputField>
      <custom-select
        ref="typeRef"
        v-model="form.type"
        name="type"
        label="How can we help?"
        :options="types"
        :disabled="isLoading"
        :validator="validateType"
      />
      <custom-select
        v-if="form.type && form.type !== 'Other'"
        ref="descriptionRef"
        v-model="form.description"
        name="description"
        :label="descLabel"
        :options="descriptions"
        :disabled="isLoading"
        :validator="validateDescription"
      />
      <CustomTextarea
        ref="contentRef"
        v-model="form.content"
        name="content"
        label="Message"
        :rows="4"
        :disabled="isLoading"
        placeholder="Message content"
        :validator="validateContent"
      />
      <div id="recaptcha-container" />
      <custom-button type="primary" @click="submitForm" :disabled="isLoading"
        >Submit
        <i class="icon-arrow-right" />
      </custom-button>
    </form>
  </div>
</template>

<script setup lang="ts">
declare global {
  interface Window {
    grecaptcha: any
    recaptchaCallback: () => void
  }
}
import CustomInputField from '~/components/custom/field/index.vue'
import { contactTypes } from '~/models/Contact'
import { SelectOption } from '../custom/select/index.vue'

const { success } = useNotification()
const emit = defineEmits(['success'])
const errorMessage = ref('')
const isLoading = ref(false)
const emailRef = ref<HTMLInputElement>()
const nameRef = ref<HTMLInputElement>()
const subjectRef = ref<HTMLInputElement>()
const typeRef = ref<HTMLSelectElement>()
const descriptionRef = ref<HTMLSelectElement>()
const contentRef = ref<HTMLTextAreaElement>()

const form = reactive<Contact>({
  email: '',
  name: '',
  subject: '',
  type: '',
  description: '',
  content: ''
})

const config = useRuntimeConfig()

const types = ref<SelectOption[]>(
  contactTypes.map((type) => ({ value: type.type, label: type.type }))
)

const descriptions = computed<SelectOption[]>(() => {
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

const validateEmail = (value: string) => {
  if (!value) {
    return 'Email is required'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Invalid email address'
  }
  return ''
}

const validateName = (value: string) => {
  if (!value) {
    return 'Name is required'
  }
  return ''
}

const validateSubject = (value: string) => {
  if (!value) {
    return 'Subject is required'
  }
  return ''
}

const validateType = (value: string) => {
  if (!value) {
    return 'Type is required'
  }
  return ''
}

const validateDescription = (value: string) => {
  if (!value && form.type !== 'Other') {
    return 'Description is required'
  }
  return ''
}

const validateContent = (value: string) => {
  if (!value) {
    return 'Message is required'
  }
  return ''
}

const validation = useFormValidation('contact')
validation.registerField('email', emailRef, validateEmail)
validation.registerField('name', nameRef, validateName)
validation.registerField('subject', subjectRef, validateSubject)
validation.registerField('type', typeRef, validateType)
validation.registerField('content', contentRef, validateContent)

const submitForm = async () => {
  if (!recaptchaResponse.value) {
    errorMessage.value = 'Please complete the reCAPTCHA'
    return
  }
  const isValid = await validation.validateAllFields()

  if (!isValid) {
    return
  }

  isLoading.value = true
  try {
    await $contactService.submitTicket(form)

    success({
      title: 'A new ticket has been submitted',
      message: `We will get in touch with you soon`
    })

    emit('success')
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

watch(
  () => form.type,
  () => {
    if (form.type && form.type !== 'Other') {
      validation.registerField(
        'description',
        descriptionRef,
        validateDescription
      )
    } else {
      validation.unregisterField('description')
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (window.grecaptcha) {
    loadRecaptcha()
  } else {
    window.recaptchaCallback = loadRecaptcha
  }
})

onUnmounted(() => {
  validation.destroyForm()
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
