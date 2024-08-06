<template>
  <div :class="$style.signUp">
    <el-form ref="formRef" :model="form" :rules="rules">
      <custom-field v-model="form.fullName" name="fullName" label="Full Name" />
      <custom-field v-model="form.email" name="email" label="Email Address" />
      <custom-field
        v-model="form.password"
        name="password"
        label="Password"
        type="password"
      />
      <custom-field
        v-model="form.confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
      />
      <div :class="$style.agreement">
        <custom-checkbox
          :class="$style.checkbox"
          v-model="form.agree"
          name="agree"
          label=""
        />
        <span>
          I agree to Napricot
          <NuxtLink to="/terms">Terms of Service</NuxtLink> and
          <NuxtLink to="/privacy"> Privacy Policy </NuxtLink></span
        >
      </div>
      <custom-button type="primary" @click="submitForm" :disabled="!form.agree"
        >Sign up
        <i class="icon-arrow-right" />
      </custom-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
const formRef = ref<FormInstance>()
const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: true
})
const rules = reactive<FormRules>({
  fullName: [
    {
      required: true,
      message: 'Please input full name',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: 'Please input email address',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change']
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: 'Please input confirm password',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value === form.password) {
          callback()
        } else {
          callback(new Error('The two passwords do not match'))
        }
      },
      trigger: 'blur'
    }
  ]
})

const submitForm = () => {
  return new Promise<void>((resolve) => {
    formRef.value?.validate((valid: boolean) => {
      if (valid) {
        console.log('Form is valid')
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
.signUp {
  position: relative;
}
.agreement {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
  span {
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--color-icon);
  }
  a {
    color: #2da5f3;
    font-weight: 400;
    text-decoration: none;
  }
}
.checkbox {
  padding-top: 4px;
}
</style>
