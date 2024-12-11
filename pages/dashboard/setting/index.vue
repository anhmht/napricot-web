<template>
  <div :class="$style.setting" v-loading="isLoading">
    <layout-dashboard-header title="Setting"> </layout-dashboard-header>
    <div :class="$style.content">
      <h4>Deploy web current state</h4>
      <div :class="$style.deploy">
        <p>Deploy the current state of the web to the server</p>
        <custom-button @click="deploy">Deploy</custom-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'authorize'
})
const isLoading = ref<boolean>(false)

const deploy = async () => {
  isLoading.value = true
  const data = await $configService.deploy()
  isLoading.value = false
}
</script>

<style lang="postcss" module>
.setting {
  display: block;
}
.content {
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.deploy {
  display: flex;
  gap: 16px;
  p {
    align-content: center;
  }
}
</style>
