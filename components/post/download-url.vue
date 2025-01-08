<template>
  <div :class="$style.downloadUrl">
    <p>
      You can download after <strong>{{ time }}</strong> seconds
    </p>
    <custom-button :disabled="time" type="primary" @click="download">
      Download
    </custom-button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  post: {
    type: Object as () => IPost,
    required: true
  }
})

const time = ref(30)

const startCountdown = () => {
  const interval = setInterval(() => {
    if (time.value > 0) {
      time.value -= 1
    } else {
      clearInterval(interval)
    }
  }, 1000)
}

const download = () => {
  window.open(props.post.externalUrl, '_blank')
}

onMounted(() => {
  startCountdown()
})
</script>

<style module lang="postcss">
.downloadUrl {
  position: fixed;
  bottom: 24px;
  left: 24px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
  p {
    margin-bottom: 24px;
    width: 270px;
    text-align: center;
  }
}
</style>
