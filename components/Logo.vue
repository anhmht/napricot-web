<template>
  <div :class="$style.logo">
    <NuxtImg
      src="Logo.svg"
      alt="Napricot Logo"
      :width="width"
      :height="height"
    />
  </div>
</template>
<script setup lang="ts">
defineProps({
  width: {
    type: Number,
    default: 16.8
  },
  height: {
    type: Number,
    default: 16.8
  }
})
</script>

<style lang="postcss" module>
.logo {
  display: flex;
  border-radius: 5.6px;
  padding: 5.6px;
  background-color: #fff;
  background-image: url('~/public/Logo-bg.svg');
  box-shadow: 0px -2.8px 0px 0px rgba(223, 223, 223, 0.7) inset,
    0px 1.4px 3.5px -0.7px rgba(41, 44, 50, 0.5), 0px 0px 0px 0.7px #dfdfdf;
}
</style>
