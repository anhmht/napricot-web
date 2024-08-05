<template>
  <div :class="$style.signIn">
    <el-form ref="formRef" :model="form" :rules="rules">
      <custom-field v-model="form.email" name="email" label="Email Address" />
      <custom-field
        v-model="form.password"
        name="password"
        label="Password"
        type="password"
      />
      <div :class="$style.remember">
        <custom-checkbox
          v-model="form.rememberMe"
          name="rememberMe"
          label="Remember me"
        />
        <NuxtLink to="/forgot-password">
          <i class="icon-lock" />
          Forgot password?
        </NuxtLink>
      </div>
      <custom-button type="primary" @click="submitForm"
        >Sign in
        <i class="icon-arrow-right" />
      </custom-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
const formRef = ref<FormInstance>()
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})
const rules = reactive<FormRules>({
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
.signIn {
  position: relative;
}
.remember {
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    line-height: 20px;
    display: flex;
    gap: 4px;
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--color-text);
    i {
      font-size: 1.6rem;
      padding-top: 1px;
      color: var(--color-icon);
    }
    &:hover {
      color: var(--color-primary);
      i {
        color: var(--color-primary);
      }
    }
  }
}
.hr {
  :global(.el-divider__text) {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--color-icon);
  }
}
</style>
