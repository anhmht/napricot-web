<template>
  <div :class="$style.breadcrumb">
    <ul>
      <li>
        <i class="icon-home_filled"></i>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li v-for="(item, index) in links" :key="index">
        <nuxt-link :to="item.path">{{ item.name }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface BreadCrumb {
  path: string
  name: string
}
const props = defineProps({
  links: {
    type: Array as () => BreadCrumb[],
    required: true
  }
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      {
        name: 'Home',
        item: '/'
      },
      ...props.links.map((link) => ({
        name: link.name,
        item: link.path
      }))
    ]
  })
])
</script>

<style lang="postcss" module scoped>
.breadcrumb {
  position: relative;
}
ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 30px;
}
li {
  display: flex;
  gap: 8px;
  align-items: center;
  position: relative;
  i {
    font-size: 2rem;
    color: var(--color-icon);
  }
  a {
    font-size: 1.4rem;
    font-weight: 400;
    text-decoration: none;
    color: var(--color-icon);
  }
  &:last-child {
    a {
      color: var(--color-text);
      font-weight: 700;
    }
  }
  &:hover {
    i {
      color: var(--color-primary);
    }
    a {
      color: var(--color-primary);
    }
  }
}

li + li {
  &::before {
    content: '\e901';
    color: #77878f;
    font-family: 'icomoon';
    position: absolute;
    left: -20px;
    font-size: 1.2rem;
    transform: rotate(270deg);
  }
}
@media (max-width: 768px) {
  .breadcrumb {
    padding: 8px;
    a {
      max-width: 150px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
