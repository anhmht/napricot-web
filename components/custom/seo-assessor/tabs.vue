<template>
  <div :class="$style.root">
    <div :class="$style.title">SEO Assessor</div>
    <el-tabs
      v-model="editableTabsValue"
      type="border-card"
      class="demo-tabs"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in keywords"
        :key="item"
        :label="item"
        :name="item"
      >
        Focus Keywords: {{ item }}

        <custom-seo-assessor
          :keyword="editableTabsValue"
          :title="title"
          :title-width="titleWidth"
          :description="description"
          :content="content"
          :slug="slug"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { TabPaneName } from 'element-plus'

const props = defineProps({
  keywords: {
    type: Array as () => string[],
    default: []
  },
  description: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  titleWidth: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:keywords', 'change'])

const editableTabsValue = ref(props.keywords[0])

const removeTab = (targetName: TabPaneName): void => {
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    props.keywords.forEach((tab, index) => {
      if (tab === targetName) {
        const nextTab = props.keywords[index + 1] || props.keywords[index - 1]
        if (nextTab) {
          activeName = nextTab
        }
      }
    })
  }

  editableTabsValue.value = activeName
  emit(
    'update:keywords',
    props.keywords.filter((tab) => tab !== targetName)
  )
  emit(
    'change',
    props.keywords.filter((tab) => tab !== targetName)
  )
}

watch(
  () => props.keywords,
  (keywords) => {
    editableTabsValue.value = keywords[0]
  }
)
</script>

<style module lang="postcss">
.root {
  position: relative;
  :global(.el-tabs--border-card) {
    border-radius: 8px;
  }
  :global(.el-tabs--border-card > .el-tabs__header) {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  :global(.el-tabs__nav-scroll) {
    border-top-left-radius: 8px;
  }
}
.title {
  font-weight: 400;
  display: inline-block;
  height: auto;
  line-height: 22px;
  margin-bottom: 8px;
  text-align: left;
  vertical-align: middle;
}
</style>
