export interface IAuthor {
  _id?: string
  name: string
  slug: string
  avatar?: Image
  images: Image[]
  bio: string
  description: string
  socialLinks: ISocialLink[]
  services: IAuthorService[]
  isDeleted: boolean
  createdBy: string
  updatedBy: string
  createdAt: Date
  updatedAt: Date
  uploading: boolean
}

export interface ISocialLink {
  name: string
  url: string
}

export interface IAuthorService {
  name: string
  description: string
  image?: Image
}

export interface ListAuthors {
  authors: IAuthor[]
  total: number
  totalPages: number
}

export interface AuthorFilter {
  name?: string
  sort?: string
}
