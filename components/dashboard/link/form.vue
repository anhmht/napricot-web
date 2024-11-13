<template>
  <div :class="$style.linkForm">
    <el-form
      action="submit"
      ref="formRef"
      :model="form"
      :rules="rules"
      :disabled="isLoading"
      require-asterisk-position="right"
      @submit.prevent="handleSubmit"
    >
      <custom-alert v-if="errorMessage" type="error" :title="errorMessage" />
      <custom-field
        v-model="form.words"
        name="words"
        label="Link Words"
        placeholder="Enter link words"
      />
      <custom-autocomplete
        v-model="form.url"
        name="url"
        label="Link to"
        :options="options"
        :loading="optionLoading"
        custom-options
        clearable
        @search="getOptions"
      >
        <el-option-group
          v-for="group in options"
          :key="group.label"
          :label="group.label"
        >
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-option-group>
      </custom-autocomplete>
      <div v-if="form.url" :class="$style.link">
        <NuxtLink :to="form.url" target="_blank">
          <i class="icon-link"></i>
          {{ `https://napricot.com${form.url}` }}
        </NuxtLink>
      </div>
      <custom-field
        v-model="form.description"
        name="description"
        label="Description"
        placeholder="Enter link description"
      />
      <div :class="$style.button">
        <custom-button :disabled="isLoading" native-type="submit">
          {{ buttonTitle }}
        </custom-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { OptionGroup } from 'element-plus/es/components/select-v2/src/select.types.mjs'

const props = defineProps({
  id: {
    type: String,
    default: undefined
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:loading', 'submit-success'])

const formRef = ref<FormInstance>()
const form = reactive<ILink>({
  words: '',
  url: '',
  description: '',
  posts: [],
  products: []
})
const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')
const buttonTitle = ref<string>('Create')
const optionLoading = ref<boolean>(false)
const posts = ref<OptionGroup>({
  label: 'Posts',
  options: []
})

const rules = reactive<FormRules>({
  words: [
    {
      required: true,
      message: 'Please input words',
      trigger: ['blur', 'change']
    }
  ],
  url: [
    {
      required: true,
      message: 'Please input link',
      trigger: ['blur', 'change']
    }
  ]
})

const options = computed<OptionGroup[]>(() => {
  const res: OptionGroup[] = []
  if (posts.value.options.length) {
    res.push(posts.value)
  }
  return [
    ...res,
    {
      label: 'Pages',
      options: [
        { label: 'Home', value: '/' },
        { label: 'About us', value: '/about-us' },
        { label: 'Contact us', value: '/contact' }
      ]
    }
  ]
})

const handleSubmit = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      isLoading.value = true
      emit('update:loading', true)
      try {
        const link = props.id
          ? await $linkService.updateLink(props.id, form)
          : await $linkService.createLink(form)
        emit('submit-success', link)
        ElNotification.success({
          title: props.id
            ? 'Link updated successfully'
            : 'Link created successfully',
          message: `Link '${link.words}' has been ${
            props.id ? 'updated' : 'created'
          }`
        })
        formRef.value?.resetFields()
      } catch (error: any) {
        errorMessage.value = error.message
      } finally {
        isLoading.value = false
        emit('update:loading', false)
      }
    }
  })
}

const getLink = async (id: string) => {
  try {
    const link = await $linkService.getLink(id)
    form.words = link.words
    form.url = link.url
    form.description = link.description
  } catch (error: any) {
    errorMessage.value = error.message
  }
}

const getOptions = async (query?: string) => {
  optionLoading.value = true
  const [listPost] = await Promise.all([
    $postService.getPosts({ title: query }, { page: 1, limit: 10 })
  ])
  posts.value = {
    label: 'Posts',
    options: listPost.posts.slice(0, 5).map((post) => ({
      label: post.title,
      value: `/post/${post.slug}`,
      image: post.image?.cloudflareUrl
    }))
  } as OptionGroup
  optionLoading.value = false
}

watch(
  () => props.id,
  async (id) => {
    if (id) {
      buttonTitle.value = 'Save'
      isLoading.value = true
      emit('update:loading', true)

      await getLink(id)

      isLoading.value = false
      emit('update:loading', false)
    } else {
      buttonTitle.value = 'Create'
      formRef.value?.resetFields()
    }
  },
  { immediate: true }
)

onMounted(async () => {
  await getOptions()
})
</script>

<style lang="postcss" module>
.linkForm {
  position: relative;
}
.link {
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-primary);
  }
}
.button {
  padding-top: 16px;
}
</style>
