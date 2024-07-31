<template>
  <div :class="$style.main">
    <carousel />
    <sales />
    <trending />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.main {
  display: block;
}
</style>
