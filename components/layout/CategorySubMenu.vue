<template>
  <div :class="$style.subMenu">
    <div :class="$style.children">
      <ul>
        <li
          v-for="(item, index) in categories"
          :key="index"
          @mouseover="handleMouseOver(item, index)"
          :class="active === index && $style.active"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div :class="$style.feature">
      <p>Feature {{ categories[0].name }}</p>
      <div :class="$style.item">
        <NuxtPicture
          :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/1cc99000-9c88-4668-b8d6-d5b75a70f700/medium`"
          alt="item"
          width="80"
          height="80"
        />
        <div :class="$style.info">
          <p :class="$style.name">
            You & Me We Personalized Window Hanging Suncatcher
          </p>
          <p :class="$style.price">$160</p>
        </div>
      </div>
      <div :class="$style.item">
        <NuxtPicture
          :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/1cc99000-9c88-4668-b8d6-d5b75a70f700/medium`"
          alt="item"
          width="80"
          height="80"
        />
        <div :class="$style.info">
          <p :class="$style.name">
            You & Me We Personalized Window Hanging Suncatcher
          </p>
          <p :class="$style.price">$160</p>
        </div>
      </div>
      <div :class="$style.item">
        <NuxtPicture
          :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/1cc99000-9c88-4668-b8d6-d5b75a70f700/medium`"
          alt="item"
          width="80"
          height="80"
        />
        <div :class="$style.info">
          <p :class="$style.name">
            You & Me We Personalized Window Hanging Suncatcher
          </p>
          <p :class="$style.price">$160</p>
        </div>
      </div>
    </div>
    <div :class="$style.banner">
      <NuxtPicture
        :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/2f3df36b-c256-4902-706c-19357d70d500/banner312x439`"
        alt="banner"
        width="312"
        height="439"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const active = ref<Number | undefined>(undefined)

const props = defineProps({
  categories: {
    type: Array as () => Category[],
    required: true
  }
})

const handleMouseOver = (item: Category, index: number) => {
  active.value = index
}
</script>

<style lang="postcss" module>
.subMenu {
  padding: 12px 20px;
  position: absolute;
  top: 0;
  right: -945px;
  background: white;
  width: 904px;
  display: flex;
  gap: 20px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
  li {
    padding: 8px 16px;
    font-weight: 500;
    cursor: pointer;
    &.active {
      background: var(--color-background);
    }
  }
}
.children {
  width: 240px;
}
.feature {
  width: 312px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  p {
    font-weight: 500;
  }
}
.item {
  padding: 12px;
  display: flex;
  border: 1px solid #dcdcdc;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.name {
  font-size: 1.4rem;
  font-weight: 500;
}
.price {
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-primary);
}
</style>
