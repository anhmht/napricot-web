
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

interface UploadService {
  uploadImage: (file: File) => Promise<Image | undefined>
}

export const $uploadService: UploadService = {
  uploadImage: (file) => uploadImage(file)
}