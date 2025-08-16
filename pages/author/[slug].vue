<template>
  <div class="author">
    <div class="breadcrumb">
      <div class="container">
        <breadcrumb
          :links="[
            { name: 'authors', path: '/author' },
            { name: name, path: `/author/${slug}` }
          ]"
        />
      </div>
    </div>
    <div class="container">
      <div class="author-info">
        <div class="author-avatar">
          <NuxtImg
            :src="data?.avatar?.cloudflareUrl"
            :alt="data?.name"
            width="200"
            height="200"
          />
        </div>
        <div class="author-name">
          <h1>{{ name }}</h1>
          <p>Lash Educator | Innovator | Mentor</p>
        </div>
      </div>
    </div>
    <custom-loading :loading="status === 'pending'" />
  </div>
</template>

<script lang="ts" setup>
const { slug } = useRoute().params

const { data, error, status } = await useAsyncData(
  'author-fetch-' + slug,
  () => $authorService.getAuthorBySlug(slug as string),
  {
    watch: [() => slug]
  }
)

const name = computed(() => data?.value?.name || '')
const image = computed(
  () =>
    `https://image.napricot.com/cdn-cgi/image/format=png/${data.value?.avatar?.path}` ||
    ''
)
const desc = computed(() => data?.value?.description || '')

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Content not found',
    fatal: true
  })
}

defineOgImageComponent('Author', {
  title: name,
  image,
  desc
})

useServerSeoMeta({
  title: () => `${name.value}`,
  description: () => desc.value,
  ogTitle: () => `${name.value}`,
  ogSiteName: () => 'Napricot Eyelash Beauty',
  ogDescription: () => desc.value,
  ogImage: () => image.value
})

useSchemaOrg([
  definePerson({
    '@type': 'Person',
    name: name.value,
    description: desc.value,
    inLanguage: 'en',
    image: image as any,
    url: `https://napricot.com/author/${slug}`
  })
])
</script>

<style lang="postcss" scoped>
.author-info {
  padding: 36px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.author-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  img {
    border-radius: 50%;
  }
}
.author-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}
</style>
