export interface ICategory {
  _id?: string
  name: string
  slug: string
  desc?: string
  image?: string
  parentId?: string
  type: CategoryType
  children?: ICategory[]
  createdAt?: string
  updatedAt?: string
}

export enum CategoryType {
  Product = 'product',
  Post = 'post'
}

export interface ListCategories {
  categories: ICategory[]
  total: number
  totalPages: number
}

export interface CategoryFilter {
  name?: string
  sort?: string
}
