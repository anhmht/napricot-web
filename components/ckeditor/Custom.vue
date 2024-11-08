<template>
  <el-form-item
    ref="formItemRef"
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
          $refs.formItemRef?.clearValidate()
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
  Plugin,
  ButtonView,
  GeneralHtmlSupport
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

class LinkProduct extends Plugin {
  vm: any
  constructor(editor: Editor, vm: any) {
    super(editor)
    this.vm = vm
  }
  init() {
    const editor = this.editor
    // The button must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    editor.ui.componentFactory.add('linkProduct', () => {
      // The button will be an instance of ButtonView.
      const button = new ButtonView()

      button.set({
        label: 'Product Buy box',
        icon: `<svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.3246 13.7933C23.3478 13.8862 23.4404 13.9404 23.5252 13.9172L27.6464 12.9647C27.739 12.9415 27.793 12.8485 27.7699 12.7634L27.4457 11.3385C27.4226 11.2455 27.33 11.1913 27.2451 11.2146L25.6244 11.5863C25.8945 10.8971 26.1646 10.2079 26.4347 9.51865C26.5428 9.23987 26.6585 8.95334 26.7666 8.67456C26.8129 8.55066 26.7049 8.3106 26.6817 8.19444L26.5505 7.61364C26.5274 7.52072 26.4347 7.46651 26.3499 7.48974L22.468 8.38804C22.3753 8.41127 22.3213 8.5042 22.3445 8.58938L22.6686 10.0143C22.6918 10.1072 22.7844 10.1614 22.8693 10.1382L24.2893 9.80518C24.0115 10.4944 23.7413 11.1836 23.4635 11.8728C23.3477 12.1671 23.2243 12.4691 23.1085 12.7634C23.0622 12.8795 23.1548 13.0886 23.178 13.197L23.3169 13.7856L23.3246 13.7933Z" fill="#EC5825"/>
          <path d="M28.6495 9.16997C30.2856 8.79051 31.9294 8.41106 33.5655 8.03161C33.6581 8.00838 33.7121 7.91545 33.689 7.83027L33.2954 6.1266C33.2722 6.03367 33.1796 5.97947 33.0947 6.0027L31.1036 6.45959C31.4278 5.63873 31.7519 4.81788 32.076 3.99702C32.215 3.6408 32.3539 3.29232 32.4928 2.9361C32.5468 2.80445 32.431 2.5489 32.4002 2.425L32.2304 1.68933C32.2072 1.5964 32.1146 1.54219 32.0297 1.56542L27.3992 2.64183C27.3066 2.66506 27.2526 2.75799 27.2758 2.84317L27.6693 4.54684C27.6925 4.63977 27.7851 4.69397 27.87 4.67074L29.6296 4.26031C29.2977 5.08117 28.9736 5.90977 28.6418 6.73063C28.4951 7.10234 28.3485 7.4663 28.2019 7.83801C28.1555 7.96191 28.2482 8.18649 28.279 8.30264L28.4488 9.04606C28.472 9.13899 28.5646 9.1932 28.6495 9.16997Z" fill="#EC5825"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.2532 19.3278C25.9941 15.8889 30.7715 21.3642 29.7608 28.8045C27.6129 40.3175 13.1937 32.0136 22.4959 26.7602C12.9173 26.7443 15.539 41.9498 28.063 37.7344C45.0486 29.169 29.1764 5.75455 20.2532 19.3278Z" fill="#EC5825"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9585 19.5332C13.9442 10.0486 1.53859 18.8518 3.94705 29.0099C5.85803 35.2379 10.0037 39.1681 17.1976 38.2093C4.16026 33.7324 9.45098 13.3766 18.9585 19.5332Z" fill="#EC5825"/>
          <path d="M19.7324 18.2902C20.8932 16.5628 21.1774 14.3283 20.3641 12.3078C19.4955 10.1288 17.853 9.29681 17.7029 9.16211C17.5213 9.20965 15.6656 9.24135 13.9283 10.8023C13.2098 11.4441 12.657 12.2286 12.2938 13.1081C15.0418 13.6152 17.1739 14.9385 18.6031 16.7292C19.0138 17.1967 19.377 17.7197 19.6771 18.2981C19.6929 18.2981 19.7087 18.2981 19.7245 18.2981L19.7324 18.2902Z" fill="#2BA549"/>
          </svg>`,
        tooltip: true
      })

      button.on('execute', () => {
        // Change the model using the model writer.
        editor.model.change((writer) => {
          // Insert the text at the user's current position.
          const viewFragment = editor.data.processor.toView(
            '<div>Napricot product buy box</div><p></p>'
          )
          const modelFragment = editor.data.toModel(viewFragment)
          this.editor.model.insertContent(modelFragment)

          writer.setSelection(
            writer.createPositionAt(
              editor.model.document.getRoot() as any,
              'end'
            )
          )
          editor.focus()
        })
      })

      return button
    })
  }
}

class LinkAmazonAffiliate extends Plugin {
  vm: any
  constructor(editor: Editor, vm: any) {
    super(editor)
    this.vm = vm
  }
  init() {
    const editor = this.editor
    // The button must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    editor.ui.componentFactory.add('linkAmazonAffiliate', () => {
      // The button will be an instance of ButtonView.
      const button = new ButtonView()

      button.set({
        label: 'Amazon Affiliate Buy box',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
          <g clip-path="url(#clip0_10848_1366)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.13029 9.99286C9.46397 9.69353 10.0861 9.16421 10.4432 8.86488C10.5583 8.74989 10.5353 8.56553 10.4432 8.41605C10.1321 7.99023 9.752 7.70242 9.752 6.90826V4.16942C9.752 3.04164 9.752 2.02884 8.95727 1.2579C8.30105 0.624914 7.31034 0.40625 6.48105 0.40625C4.8686 0.40625 3.0605 1.01623 2.68038 3.01864C2.63435 3.2258 2.79565 3.35227 2.94523 3.38675L4.59224 3.57091C4.74202 3.55941 4.84557 3.38675 4.8803 3.23728C5.01837 2.54681 5.59429 2.21297 6.25076 2.21297C7.36828 2.21297 7.31034 3.31774 7.31034 4.11189C6.31977 4.22688 5.13362 4.29604 4.20064 4.69887C3.14107 5.15917 2.39258 6.10279 2.39258 7.48391C2.39258 9.25618 3.50969 10.1538 4.94934 10.1538C6.15852 10.1538 6.81499 9.85443 7.74799 8.89934C8.05903 9.34814 8.22051 9.65897 8.73874 10.0618C8.86526 10.1538 9.02636 10.0849 9.13029 9.99286ZM5.91664 8.43908C5.2717 8.43908 4.88028 7.95577 4.88028 7.21909C4.88028 5.76918 6.07793 5.45835 7.31031 5.45835C7.31031 6.20651 7.36823 6.98913 6.98813 7.64491C6.7459 8.08222 6.43505 8.43908 5.91664 8.43908Z" fill="#00002D"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5481 10.6599C9.94755 11.3275 8.20809 11.6495 6.63029 11.6495C4.29232 11.6495 2.03492 11.0167 0.20382 9.95811C0.0425385 9.85421 -0.0727349 10.0271 0.0540405 10.1421C1.74706 11.6728 3.99279 12.5935 6.48053 12.5935C8.266 12.5935 10.3272 12.0408 11.7556 10.9822C11.9857 10.8097 11.7786 10.5564 11.5481 10.6599ZM10.6843 10.257C11.1334 10.1995 12.1587 10.0731 12.3428 10.3145C12.5273 10.5449 12.1357 11.5 11.9627 11.9373C11.9167 12.0638 12.0317 12.1101 12.1472 12.0178C12.907 11.3735 13.1031 10.0386 12.9535 9.84271C12.792 9.65873 11.456 9.48587 10.6498 10.0616C10.5232 10.1535 10.5463 10.2685 10.6843 10.257Z" fill="#00002D"/>
          </g>
          <defs>
          <clipPath id="clip0_10848_1366">
          <rect width="13" height="13" fill="white"/>
          </clipPath>
          </defs>
          </svg>`,
        tooltip: true
      })

      button.on('execute', () => {
        // Change the model using the model writer.
        editor.model.change((writer) => {
          // Insert the text at the user's current position.
          const viewFragment = editor.data.processor.toView(
            '<div>Amazon Affiliate buy box</div><p></p>'
          )
          const modelFragment = editor.data.toModel(viewFragment)
          this.editor.model.insertContent(modelFragment)

          writer.setSelection(
            writer.createPositionAt(
              editor.model.document.getRoot() as any,
              'end'
            )
          )
          editor.focus()
        })
      })

      return button
    })
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
    }
  },
  data() {
    const vm = this
    return {
      openLinkProductModal: false,
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
          },
          function (editor: Editor) {
            return new LinkProduct(editor, vm)
          },
          function (editor: Editor) {
            return new LinkAmazonAffiliate(editor, vm)
          },
          GeneralHtmlSupport
        ],
        htmlSupport: {
          allow: [
            {
              name: /.*/,
              attributes: true,
              classes: true,
              styles: true
            } as any
          ]
        },
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
          'linkProduct',
          'linkAmazonAffiliate',
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
