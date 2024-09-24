<template>
  <ckeditor
    :editor="editor"
    v-model="editorData"
    :config="editorConfig"
    @update:model-value="$emit('update:modelValue', $event)"
  ></ckeditor>
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
  ImageResize,
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
  UploadResponse
} from 'ckeditor5'
import CKEditor from '@ckeditor/ckeditor5-vue'

import 'ckeditor5/ckeditor5.css'

class UploadAdapter {
  loader: FileLoader
  constructor(loader: FileLoader) {
    this.loader = loader
  }
  upload(): Promise<UploadResponse> {
    let upload = new Promise<UploadResponse>((resolve, reject) => {
      this.loader.file.then((data) => {
        if (data) {
          $uploadService
            .uploadImage(data)
            .then((response) => {
              resolve({ default: response?.url })
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

export default defineNuxtComponent({
  components: {
    ckeditor: CKEditor
  },
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: this.modelValue,
      editorConfig: {
        plugins: [
          Bold,
          Essentials,
          Italic,
          Paragraph,
          Undo,
          Heading,
          List,
          Alignment,
          Image,
          ImageToolbar,
          ImageCaption,
          ImageStyle,
          ImageResize,
          LinkImage,
          ImageInsert,
          Link,
          Highlight,
          Indent,
          Font,
          MediaEmbed,
          BlockQuote,
          BlockToolbar,
          HeadingButtonsUI,
          ParagraphButtonUI
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
          'insertImage',
          'mediaEmbed',
          'blockQuote',
          'undo',
          'redo'
        ],
        image: {
          toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',
            'imageTextAlternative',
            '|',
            'linkImage'
          ]
        },
        extraPlugins: [
          function (editor: Editor) {
            editor.plugins.get('FileRepository').createUploadAdapter = (
              loader
            ) => {
              // Configure the URL to the upload script in your back-end here!
              return new UploadAdapter(loader)
            }
          }
        ]
      }
    }
  }
})
</script>
<style lang="postcss" module>
:global(.ck-editor__editable_inline:not(.ck-comment__input *)) {
  height: 300px;
  overflow-y: auto;
}
</style>
