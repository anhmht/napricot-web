<template>
  <div v-loading="isLoading" :class="$style.form">
    <div :class="$style.header">
      <h5>An email has been sent to you</h5>
      <p>
        Check the email that's associated with your account for the verification
        code.
      </p>
    </div>
    <el-form ref="formRef" :model="form" :rules="rules" hide-required-asterisk>
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <custom-field
        v-model="form.code"
        name="code"
        label="Verification Code"
        :disabled="isLoading"
      >
        <template #button>
          <a :class="$style.resend" @click="resendCode">Resend code</a>
        </template>
      </custom-field>
      <custom-button type="primary" @click="submitForm" :disabled="isLoading"
        >Sign up
        <i class="icon-arrow-right" />
      </custom-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const store = useMainStore()
const errorMessage = ref('')
const isLoading = ref(false)
const formRef = ref<FormInstance>()
const form = reactive({
  code: ''
})
const rules = reactive<FormRules>({
  code: [
    {
      required: true,
      message: 'Please input verification code',
      trigger: ['blur', 'change']
    }
  ]
})

const resendCode = async () => {
  if (store.currentUser?.email === undefined) {
    ElNotification.error({
      title: 'Error',
      message: `Please sign in first`
    })
    errorMessage.value = `Please sign in first`
    return
  }
  isLoading.value = true

  try {
    await $userService.resendCode(store.currentUser!.email)

    ElNotification.success({
      title: 'Resend code successfully',
      message: `please check your email ${store.currentUser!.email}`
    })
  } catch (error: any) {
    errorMessage.value = error.message
  }
  isLoading.value = false
}

const submitForm = () => {
  if (store.currentUser?.email === undefined) {
    ElNotification.error({
      title: 'Error',
      message: `Please sign in first`
    })
    errorMessage.value = `Please sign in first`
    return
  }
  return new Promise<void>((resolve) => {
    formRef.value?.validate(async (valid: boolean) => {
      if (valid) {
        isLoading.value = true

        try {
          await $userService.verifyCode(form.code, store.currentUser!.email)

          ElNotification.success({
            title: 'Email verified',
            message: `Welcome ${store.currentUser!.name}`
          })
        } catch (error: any) {
          errorMessage.value = error.message
        }
        isLoading.value = false
        navigateTo('/')
        resolve()
      } else {
        console.log('Form is invalid')
        resolve()
      }
    })
  })
}
</script>

<style lang="postcss" module>
.form {
  width: 424px;
  border: 1px solid #dcdcdc;
  box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 32px;
}
.header {
  margin-bottom: 24px;
  h5 {
    font-weight: 500;
    text-align: center;
    line-height: 28px;
    margin-bottom: 12px;
  }
  p {
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: var(--color-icon);
  }
}
.resend {
  position: absolute;
  top: 0;
  right: 0;
  text-decoration: none;
  font-weight: 400;
  font-size: 1.6rem;
  color: var(--color-primary);
  cursor: pointer;
  &:hover {
    color: var(--color-primary-light);
  }
}
</style>
