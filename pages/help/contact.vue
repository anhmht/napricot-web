<template>
  <div :class="$style.root">
    <div :class="$style.breadcrumb">
      <div class="container">
        <breadcrumb :links="[{ name: 'Contact us', path: '/help/contact' }]" />
      </div>
    </div>
    <div class="container">
      <div :class="$style.wrapper">
        <contact v-if="!isSuccess" @success="isSuccess = true" />
        <success
          v-else
          :message="`Thank you for contacting us. We will check your message and response as soon as possible.\nPlease check your e-mail inbox`"
        >
          <custom-button type="primary" @click="goBackHome">
            Go back to home
            <i class="icon-arrow-right" />
          </custom-button>
        </success>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isSuccess = ref<boolean>(false)
const goBackHome = () => {
  navigateTo('/')
}
</script>

<style lang="postcss" module>
.root {
  position: relative;
  h1 {
    margin-bottom: 32px;
  }
  p {
    margin-bottom: 24px;
  }
}
.breadcrumb {
  background-color: var(--color-background);
  color: var(--color-icon);
  padding: 8px 0;
}
.wrapper {
  padding: 36px 0;
  padding-bottom: 150px;
  display: flex;
  justify-content: center;
}
</style>
