export interface Product {
  id: string
  name: string
  slug: string
  price: number
  image: string
  sale?: boolean
  new?: boolean
}

export interface Collection {
  name: string
  products: Product[]
}
