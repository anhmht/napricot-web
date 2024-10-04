<template>
  <div :class="$style.upload">
    <el-form-item
      ref="formItemRef"
      :label="label"
      :prop="name"
      label-position="top"
      :error="errorMessage"
      :validate-status="errorMessage ? 'error' : ''"
    >
      <div
        v-if="!selectedFiles.length"
        :class="$style.input"
        @click="selectFile"
      >
        <i class="icon-upload-cloud"></i>
        <span>Choose a file or drag & drop it here</span>
        <p>JPG or PNG formats, up to 20MB</p>
      </div>
      <TransitionGroup
        name="el-fade-in-linear"
        tag="div"
        v-else
        :class="$style.images"
      >
        <div
          v-for="(item, index) in selectedFiles"
          :key="item.id"
          :class="$style.image"
        >
          <NuxtPicture
            :src="item.base64"
            alt="Selected file"
            width="188"
            height="188"
            fit="cover"
          >
          </NuxtPicture>
          <div :class="$style.close" @click="removeImage(item, index)">
            <i class="icon-close-fill" />
          </div>
          <div v-if="!item.url" :class="$style.overlay">
            <el-progress
              :width="80"
              :percentage="item.progress"
              :format="format"
              :striped="item.progress === 100"
              striped-flow
            />
          </div>
        </div>
        <div :class="[$style.input, $style.inline]" @click="selectFile">
          <i class="icon-upload-cloud"></i>
          <span>Choose a file or drag & drop it here</span>
          <p>JPG or PNG formats, up to 20MB</p>
        </div>
      </TransitionGroup>
    </el-form-item>

    <input
      ref="inputRef"
      type="file"
      accept="image/*"
      :class="$style.uploadInput"
      :multiple="multiple"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { AxiosProgressEvent } from 'axios'

const MAX_SIZE = 20 * 1024 * 1024
const MAX_FILES = 10
const props = defineProps({
  image: {
    type: Object as () => Image | undefined,
    default: undefined
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  images: {
    type: Array as () => Image[],
    default: []
  }
})
const formItemRef = ref()
const inputRef = ref<HTMLInputElement>()
const selectedFiles = ref<IUploadFile[]>([])
const uploadedImages = ref<Image[]>([])
const errorMessage = ref<string>('')
const config = useRuntimeConfig()

const emit = defineEmits(['update:image', 'update:images'])

const format = (percent: number) =>
  percent === 100 ? 'processing' : `${percent}%`

const selectFile = () => {
  inputRef.value?.click()
}

const handleChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files?.length && validateFile(files)) {
    const uploading = Array.from(files).map((file) => {
      const id = generateUniqSerial()
      return {
        id,
        data: file,
        progress: 0,
        name: `${id}_${file.name}`
      } as IUploadFile
    })
    formItemRef.value?.clearValidate()
    errorMessage.value = ''

    for await (const file of uploading) {
      uploadFile(file)
      await sleep(1000)
    }

    clearFileBrowser()
  }
}

const uploadFile = async (file: IUploadFile) => {
  await toBase64(file)

  const formData = buildUploadDocumentParams(file)

  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    if (progressEvent.total) {
      const value = (progressEvent.loaded * 100) / progressEvent.total
      let percent = Math.round(value)
      const uploadedFile = selectedFiles.value.find((f) => f.id === file.id)
      if (uploadedFile) {
        uploadedFile.progress = percent
      }
    }
  }
  const data = await $uploadService.uploadImageWithAxios(
    formData,
    onUploadProgress
  )
  const uploadedFile = selectedFiles.value.find((f) => f.id === file.id)
  if (uploadedFile && data?.url) {
    uploadedFile.url = data.url
    uploadedImages.value.push(data)
  } else {
    if (uploadedFile) {
      uploadedFile.url = 'error'
      uploadedFile.base64 = `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/934fe936-5e07-449a-1750-9e2789bcc100/large500`
      uploadedImages.value.push({
        url: 'error',
        id: 'error',
        path: 'error',
        cloudflareUrl: 'error'
      })
    }
  }
  if (props.multiple) {
    emit('update:images', uploadedImages.value)
  } else {
    emit('update:image', uploadedImages.value[0])
  }
}

const toBase64 = async (file: IUploadFile) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.data)
  reader.onload = (e) => {
    if (props.multiple) {
      selectedFiles.value.push({
        ...file,
        base64: reader.result as string
      })
    } else {
      selectedFiles.value = [
        {
          ...file,
          base64: reader.result as string
        }
      ]
      uploadedImages.value = []
    }
  }
}

const buildUploadDocumentParams = (file: IUploadFile) => {
  const formData = new FormData()
  formData.append('files', file.data, file.name)
  return formData
}

const clearFileBrowser = () => {
  inputRef.value!.value = ''
}

const validateFile = (files: FileList): boolean => {
  if (files.length + selectedFiles.value.length > MAX_FILES) {
    errorMessage.value = `You can only upload ${MAX_FILES} files at a time`
    return false
  } else {
    for (let index = 0; index < files.length; index++) {
      if (
        validateFileExtension(files[index].name) &&
        validateFileSize(files[index])
      ) {
        continue
      }
      return false
    }
  }
  return true
}

const validateFileExtension = (fileName: string): boolean => {
  const ext = fileName.split('.').pop()
  if (
    ext &&
    ['jpg', 'jpeg', 'png', 'avif', 'webp', 'gif'].includes(ext.toLowerCase())
  ) {
    return true
  }
  errorMessage.value = `Invalid file format ${fileName}`
  return false
}

const validateFileSize = (file: File): boolean => {
  if (file.size > MAX_SIZE) {
    errorMessage.value = `File size exceeds 20MB: ${file.name}`
    return false
  }
  return true
}

const removeImage = (file: IUploadFile, index: number) => {
  selectedFiles.value = selectedFiles.value.filter((f) => f.id !== file.id)
  uploadedImages.value.splice(index, 1)
  if (props.multiple) {
    emit('update:images', uploadedImages.value)
  } else {
    emit('update:image', uploadedImages.value[0])
  }
}
</script>

<style lang="postcss" module>
:global(.el-form-item.is-error) {
  .input {
    border-color: var(--color-error);
  }
}
.upload {
  position: relative;
}
.input {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 188px;
  border: 1px dashed #d4d4d8;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-direction: column;
  &:hover {
    border-color: var(--color-primary);
    i {
      color: var(--color-primary);
    }
  }
  i {
    font-size: 3.2rem;
  }
  &.inline {
    width: 186px;
    span,
    p {
      width: 80%;
      font-size: 1.2rem;
      margin-top: 8px;
      text-align: center;
      line-height: normal;
    }
  }
}
.uploadInput {
  display: none;
}
.images {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.image {
  width: 188px;
  height: 188px;
  position: relative;
  picture {
    display: flex;
    img {
      object-fit: cover;
      object-position: center;
      border-radius: 12px;
    }
  }
}
.overlay {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(0, 0, 0, 0.35) 100%
    ),
    rgb(211 211 211 / 0%) 50% / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 12px;

  :global(.el-progress) {
    display: block;
    width: 130px;
  }

  :global(.el-progress__text) {
    color: #fff;
    font-size: 1.2rem;
    margin: 0;
    margin-top: 8px;
    text-align: center;
  }
}
.close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  width: 22px;
  i {
    font-size: 1rem;
  }
  &:hover {
    opacity: 0.8;
  }
}
</style>
