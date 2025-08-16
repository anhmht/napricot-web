export enum PostStatus {
  published = 'published',
  draft = 'draft',
  deleted = 'deleted'
}

export interface AuthorSEO {
  authorId: string
  name: string
  avatar: string
}

export interface IPost {
  _id?: string
  title: string
  titleSEO?: string
  slug: string
  desc?: string
  image?: Image
  images: Image[]
  categoryId?: string
  content: string
  authorSEO?: AuthorSEO
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
