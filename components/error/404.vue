<template>
  <div :class="$style.error">
    <NuxtPicture
      :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/934fe936-5e07-449a-1750-9e2789bcc100/large500`"
      format="avif,webp"
      alt="Napricot Error 404"
      width="500"
      height="500"
    />
    <h1>404, Page not found</h1>
    <p>
      Something went wrong. It’s look that your requested could not be found.
      It’s look like the link is broken or the page is removed.
    </p>
    <div>
      <custom-button @click="handleClick">
        Go Back Home<i class="icon-arrow-right" />
      </custom-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()

const handleClick = () => {
  clearError({
    redirect: '/'
  })
}
</script>

<style lang="postcss" module>
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 64px;
  picture {
    display: flex;
  }
  p {
    max-width: 600px;
    text-align: center;
    margin: 24px 0;
  }
}
</style>
