<template>
  <div :class="$style.preview">
    <h4 style="margin: 0">{{ title }}</h4>
    <p>{{ url }}</p>
    <div>
      <span>{{ metaDesc }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    default: ''
  }
})

const config = useRuntimeConfig()

const url = computed(() => {
  return `${config.app.baseUrl}/post/${props.slug}`
})

const metaDesc = computed(() => {
  return props.description.length < 100
    ? props.description
    : `${props.description.slice(0, 100)}...`
})
</script>

<style lang="postcss" module>
.preview {
  position: relative;
  padding: 16px;
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  h4 {
    margin: 0;
    color: #1e0fbe;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1.2;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    max-width: 300px;
    vertical-align: top;
    text-overflow: ellipsis;
  }
  p {
    margin: 0;
    color: #006621;
    font-size: 1.4rem;
    max-width: 300px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  span {
    color: #545454;
    font-size: 1.3rem;
    line-height: 1.4;
    font-style: normal;
    font-weight: 400;
  }
}
</style>
