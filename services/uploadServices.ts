import axios, { AxiosProgressEvent } from 'axios'

const uploadImage = async (file: File): Promise<Image | undefined> => {
  try {
    const formData = new FormData()
    formData.append('files', file)

    const data = await $api('/images/upload', {
      headers: {
        contentType: 'multipart/form-data',
        accept: '*/*',
      },
      method: 'POST',
      body: formData,
    })

    return data as Image
  } catch (error: any) {
    errorHandler(error)
  }
  return undefined
}

const uploadImageWithAxios = async (formData: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void | undefined): Promise<Image | undefined> => {
  const config = useRuntimeConfig()
  try {
    const { data } = await axios.post(config.app.apiBaseUrl +'/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: '*/*',
        Authorization: `Bearer ${useCookie('token').value}`,
      },
      onUploadProgress
    })

    return data as Image
  } catch (error: any) {
    errorHandler(error)
  }
  return undefined
}

interface UploadService {
  uploadImage: (file: File) => Promise<Image | undefined>
  uploadImageWithAxios: (formData: FormData, onUploadProgress: (progressEvent: AxiosProgressEvent) => void | undefined) => Promise<Image | undefined>
}

export const $uploadService: UploadService = {
  uploadImage: (file) => uploadImage(file),
  uploadImageWithAxios: (formData, onUploadProgress) => uploadImageWithAxios(formData, onUploadProgress)
}
