export interface Image {
  id: string
  url: string //dropbox url
  path: string // dropbox path
  cloudflareUrl: string // cloudflare url
}

export interface IUploadFile {
  id: string
  data: File
  progress: number
  name: string
  base64?: string
  url?: string
}
