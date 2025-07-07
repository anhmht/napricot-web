import { Product } from '../models/Product'

export const bestSeller = (config: any): Product[] => [
  {
    id: `1`,
    name: `All-Over Print Men's Thin Polo Shirt Short Sleeve Zipper`,
    slug: 'all-over-print-mens-thin-polo-shirt-short-sleeve-zipper',
    price: 11.98,
    image: `${config.public.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/731d3f63-5adb-4a74-a560-26e122457000/`,
    sale: true
  },
  {
    id: `2`,
    name: `All-Over Print Men's  Plug-In Shirt Raglan Non Coton`,
    slug: 'all-over-print-mens-plug-in-shirt-raglan-non-coton',
    price: 12.6,
    image: `${config.public.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/ff670453-741e-42e2-faaa-5ffc8e43d500/`,
    new: true
  },
  {
    id: `3`,
    name: `All-Over Print Men's Thin Polo Shirt Short Sleeve Zipper`,
    slug: 'all-over-print-mens-thin-polo-shirt-short-sleeve-zipper',
    price: 11.98,
    image: `${config.public.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/35ae5883-118a-4bb9-017e-d7dd02b4d000/`,
    sale: true,
    new: true
  },
  {
    id: `4`,
    name: `All-Over Print Men's Thin Polo Shirt Short Sleeve Zipper`,
    slug: 'all-over-print-mens-thin-polo-shirt-short-sleeve-zipper',
    price: 14.0,
    image: `${config.public.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/1cc99000-9c88-4668-b8d6-d5b75a70f700/`,
    sale: true
  }
]
