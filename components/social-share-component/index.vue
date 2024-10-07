<template>
  <div :class="$style.social">
    <SocialShare
      v-for="network in [
        'facebook',
        'twitter',
        'linkedin',
        'pinterest',
        'whatsapp',
        'skype',
        'email'
      ]"
      :key="network"
      :network="network"
      :styled="true"
      :label="false"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.social {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  :global(.social-share-button) {
    color: #fff;
    padding: 1rem;
    aspect-ratio: 1;
    border-radius: 50%;
  }
  :global(.social-share-button__icon) {
    font-size: 2.5rem;
  }
}
</style>
