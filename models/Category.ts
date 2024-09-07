export interface Category {
  id: string
  name: string
  slug: string
  desc: string
  image: string
  parentId?: string
  type: string
  children?: Category[]
  createdAt: string
  updatedAt: string
}

export interface ListCategories {
  categories: Category[]
  total: number
  totalPages: number
}

export interface GetCategoryRequest {
  name?: string
  page: number
  limit: number
  sort?: string
}
