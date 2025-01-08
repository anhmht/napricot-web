export enum PostStatus {
  published = 'published',
  draft = 'draft',
  deleted = 'deleted',
}

export interface IPost {
  _id?: string
  title: string
  slug: string
  desc?: string
  image?: Image
  images: Image[]
  categoryId?: string
  content: string
  author?: string
  createdAt?: string
  updatedAt?: string
  status?: PostStatus
  keywords: string[]
  uploading?: boolean
  tags: string[]
  externalUrl?: string
}

export interface ListPosts {
  posts: IPost[]
  total: number
  totalPages: number
}

export interface PostFilter {
  title?: string
  categoryId?: string
  status?: PostStatus
  sort?: string
}
