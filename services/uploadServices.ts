import axios, { AxiosProgressEvent } from 'axios'
import { generateUniqSerial } from '~/utils/index'
import { errorHandler } from '~/utils/error'

const uploadImage = async (file: File): Promise<Image | undefined> => {
  try {
    const formData = new FormData()
    formData.append('files', file, `${generateUniqSerial()}_${file.name}`)

    const data = await $api('/images/upload', {
      headers: {
        Accept: '*/*'
      },
      method: 'POST',
      body: formData
    })

    return data as Image
  } catch (error: any) {
    errorHandler(error)
  }
  return undefined
}

const uploadImageWithAxios = async (
  formData: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void | undefined
): Promise<Image | undefined> => {
  const config = useRuntimeConfig()
  try {
    const { data } = await axios.post(
      config.public.apiBaseUrl + '/images/upload',
      formData,
      {
        headers: {
          accept: '*/*'
        },
        withCredentials: true,
        onUploadProgress
      }
    )

    return data as Image
  } catch (error: any) {
    errorHandler(error)
  }
  return undefined
}

interface UploadService {
  uploadImage: (file: File) => Promise<Image | undefined>
  uploadImageWithAxios: (
    formData: FormData,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void | undefined
  ) => Promise<Image | undefined>
}

export const $uploadService: UploadService = {
  uploadImage: (file) => uploadImage(file),
  uploadImageWithAxios: (formData, onUploadProgress) =>
    uploadImageWithAxios(formData, onUploadProgress)
}
