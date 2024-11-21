import * as dotenv from 'dotenv'
import fetch from 'node-fetch'
import { writeFile } from 'fs/promises'

// Load environment variables
dotenv.config()

async function fetchRoutes() {
  const { API_URL } = process.env

  // Construct the full URL
  const url = new URL('/post?status=published&page=1&limit=0', API_URL)

  const res = await fetch(url.toString())

  const data = await res.json()

  const routes = [
    ...data.posts.map((post) => `/post/${post.slug}`),
    '/sitemap.xml'
  ]

  await writeFile('.env.routes', `ROUTES=${JSON.stringify(routes)}\n`)
}

fetchRoutes()
