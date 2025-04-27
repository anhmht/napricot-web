export interface ILink {
  _id?: string
  words: string
  url: string
  description?: string
  posts: string[]
  products: string[]
  author?: string
  updatedBy?: string
  createdAt?: string
  updatedAt?: string
}

export interface ListLinks {
  links: ILink[]
  total: number
  totalPages: number
}

export interface LinkFilter {
  words?: string
  sort?: string
}

export interface LinkPreview {
  title: string
  description: string
  image: string
  url: string
}
