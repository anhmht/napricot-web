export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  parentId?: string
  type: string
  children?: Category[]
  createdAt: string
  updatedAt: string
}
