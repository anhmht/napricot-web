import { LinkPreview } from '~/models/Link'

const getPreviewLink = async (url: string): Promise<LinkPreview> => {
  try {
    const data = await $api('/get-preview-link', {
      query: { url }
    })
    return { ...data, url } as LinkPreview
  } catch (error: any) {
    throw errorHandler(error)
  }
}

interface PreviewService {
  getPreviewLink: (url: string) => Promise<LinkPreview>
}

export const $previewService: PreviewService = {
  getPreviewLink: (url: string) => getPreviewLink(url)
}
