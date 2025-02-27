<template>
  <div :class="$style.form">
    <div :class="$style.header">
      <h5>Forgot Password</h5>
      <p>Enter the email address associated with your account.</p>
    </div>
    <el-form ref="formRef" :model="form" :rules="rules" hide-required-asterisk>
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <custom-field
        v-model="form.email"
        name="email"
        label="Email address"
        :disabled="isLoading"
      >
      </custom-field>
      <custom-button type="primary" @click="submitForm" :disabled="isLoading"
        >Send reset link
        <i class="icon-arrow-right" />
      </custom-button>
      <div :class="$style.footer">
        <div>
          Already have account? <NuxtLink to="/sign-in">Sign In</NuxtLink>
        </div>
        <div>
          Don’t have account?
          <NuxtLink to="/sign-in?active=sign-up">Sign Up</NuxtLink>
        </div>
      </div>
      <div :class="$style.contact">
        You may contact
        <NuxtLink to="/help/contact">Customer Service</NuxtLink> for help
        restoring access to your account.
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const errorMessage = ref('')
const isLoading = ref(false)
const formRef = ref<FormInstance>()
const form = reactive({
  email: ''
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
  ]
})

const submitForm = () => {
  return new Promise<void>((resolve) => {
    formRef.value?.validate(async (valid: boolean) => {
      if (valid) {
        isLoading.value = true
        try {
          await $userService.forgotPassword(form.email)

          ElNotification.success({
            title: 'An email has been sent',
            message: `Check the email that's associated with your account for the reset password link`
          })
        } catch (error: any) {
          errorMessage.value = error.message
        }
        isLoading.value = false
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
    padding: 0 12px;
  }
}
.button {
  margin-top: 24px;
}
.footer {
  padding: 24px 0;
  border-bottom: 1px solid var(--color-bg-disabled);
  color: var(--color-icon);
  font-weight: 400;
  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
  }
  div + div {
    margin-top: 8px;
  }
}
.contact {
  margin-top: 24px;
  font-size: 1.6rem;
  font-weight: 400;
  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
  }
}
</style>
