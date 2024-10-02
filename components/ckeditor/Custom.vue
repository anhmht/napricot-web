<template>
  <el-form-item
    :class="$style.editor"
    :label="label"
    :prop="name"
    label-position="top"
  >
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      @update:model-value="
        ($event: string) => {
          $emit('update:modelValue', $event)
          $emit('input', $event)
        }
      "
    ></ckeditor>
  </el-form-item>
</template>

<script lang="ts">
import {
  ClassicEditor,
  Heading,
  List,
  Alignment,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  LinkImage,
  ImageInsert,
  Link,
  Highlight,
  Indent,
  Font,
  MediaEmbed,
  BlockQuote,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  Undo,
  BlockToolbar,
  HeadingButtonsUI,
  ParagraphButtonUI,
  FileLoader,
  Editor,
  UploadResponse,
  ImageResize,
  SourceEditing,
  Plugin
} from 'ckeditor5'

import 'ckeditor5/ckeditor5.css'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'

import { Image as CustomImage } from '~/models/Image'

class ImageId extends Plugin {
  init() {
    const editor = this.editor

    editor.model.schema.extend('imageBlock', {
      allowAttributes: 'dataReference'
    })
    editor.model.schema.extend('imageInline', {
      allowAttributes: 'dataReference'
    })

    editor.plugins
      .get('ImageUploadEditing')
      .on('uploadComplete', (evt, { data, imageElement }) => {
        editor.model.change((writer) => {
          writer.setAttribute('dataReference', data.id, imageElement)
        })
      })

    editor.conversion.for('upcast').attributeToAttribute({
      view: 'data-reference',
      model: 'dataReference'
    })

    editor.conversion.for('downcast').add((dispatcher) => {
      dispatcher.on(
        'attribute:dataReference:imageBlock',
        (evt, data, conversionApi) => {
          if (!conversionApi.consumable.consume(data.item, evt.name)) {
            return
          }

          const viewWriter = conversionApi.writer
          const figure = conversionApi.mapper.toViewElement(data.item)

          if (data.attributeNewValue !== null) {
            viewWriter.setAttribute(
              'data-reference',
              data.attributeNewValue,
              figure
            )
          } else {
            viewWriter.removeAttribute('data-reference', figure)
          }
        }
      )
    })
  }
}

class UploadAdapter {
  loader: FileLoader
  vm: any
  constructor(loader: FileLoader, vm: any) {
    this.loader = loader
    this.vm = vm
  }
  upload(): Promise<UploadResponse> {
    let upload = new Promise<UploadResponse>((resolve, reject) => {
      this.loader.file.then((data) => {
        if (data) {
          $uploadService
            .uploadImage(data)
            .then((response) => {
              if (response) {
                this.vm.setImages(response)

                resolve({
                  id: response.id,
                  urls: {
                    default: response.url
                  }
                })
              }
            })
            .catch((err) => {
              reject(err)
            })
        } else {
          reject(new Error('File is null'))
        }
      })
    })
    return upload
  }
  // Aborts the upload process.
  abort() {
    console.log('abort')
  }
}

export default {
  components: {
    ckeditor: Ckeditor
  },
  props: {
    modelValue: {
      type: String,
      required: true
    },
    images: {
      type: Array as () => CustomImage[],
      default: []
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    setImages(image: CustomImage): void {
      const images = [...this.images, image]
      this.$emit('update:images', images)
    },
    getImages(): CustomImage[] {
      return this.images.filter((image) => {
        this.modelValue.includes(image.id)
      })
    }
  },
  data() {
    const vm = this
    return {
      editor: ClassicEditor,
      editorData: this.modelValue,
      editorConfig: {
        plugins: [
          Image,
          Bold,
          Essentials,
          Italic,
          Paragraph,
          Undo,
          Heading,
          List,
          Alignment,
          ImageInsert,
          ImageCaption,
          ImageStyle,
          ImageToolbar,
          LinkImage,
          Link,
          Highlight,
          Indent,
          Font,
          MediaEmbed,
          BlockQuote,
          BlockToolbar,
          HeadingButtonsUI,
          ParagraphButtonUI,
          ImageResize,
          SourceEditing,
          ImageId,
          function (editor: Editor) {
            editor.plugins.get('FileRepository').createUploadAdapter = (
              loader
            ) => {
              // Configure the URL to the upload script in your back-end here!
              return new UploadAdapter(loader, vm)
            }
          }
        ],
        blockToolbar: [
          'paragraph',
          'heading1',
          'heading2',
          'heading3',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'blockQuote',
          'uploadImage'
        ],
        toolbar: [
          'sourceEditing',
          'heading',
          'fontFamily',
          'fontsize',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'highlight',
          'alignment',
          '|',
          'link',
          'bulletedList',
          'numberedList',
          'uploadImage',
          'mediaEmbed',
          'blockQuote',
          'undo',
          'redo'
        ],
        image: {
          toolbar: [
            'imageStyle:block',
            'imageStyle:alignLeft',
            'imageStyle:alignRight',
            '|',
            'resizeImage:original',
            'resizeImage:50',
            'resizeImage:75',
            '|',
            'imageTextAlternative',
            'toggleImageCaption',
            '|',
            'linkImage'
          ]
        },
        extraPlugins: []
      }
    }
  }
}
</script>
<style lang="postcss" module>
:global(.ck-editor__editable_inline:not(.ck-comment__input *)) {
  height: 300px;
  overflow-y: auto;
}
.editor {
  :global(.el-form-item__content) {
    display: block;
  }
}
</style>
