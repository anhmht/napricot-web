import * as dotenv from 'dotenv'
import fetch from 'node-fetch'
import { writeFile } from 'fs/promises'

// Load environment variables
dotenv.config()

async function fetchRoutes() {
  try {
    console.time('Fetching routes')
    const { API_URL } = process.env

    if (!API_URL) {
      throw new Error('API_URL environment variable is not defined')
    }

    // Construct the full URL - request all posts at once using limit=0
    const url = new URL('/post?status=published&page=1&limit=0', API_URL)

    console.log(`Fetching routes from ${url.toString()}`)

    const res = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json'
      },
      timeout: 30000 // 30 second timeout
    })

    if (!res.ok) {
      throw new Error(
        `API responded with status: ${res.status} ${res.statusText}`
      )
    }

    const data = await res.json()

    if (!data || !data.posts || !Array.isArray(data.posts)) {
      throw new Error('Invalid API response format')
    }

    console.log(`Fetched ${data.posts.length} posts`)

    const routes = [
      ...data.posts.map((post) => `/post/${post.slug}`),
      '/sitemap.xml'
    ]

    console.log(`Generated ${routes.length} routes`)

    await writeFile('./dynamic-routes.json', JSON.stringify(routes, null, 2))
    console.log('Routes saved to dynamic-routes.json')
    console.timeEnd('Fetching routes')
  } catch (error) {
    console.error('Error fetching routes:', error.message)
    // Create an empty routes file to allow the build to continue
    await writeFile('./dynamic-routes.json', JSON.stringify(['/sitemap.xml']))
    console.error('Created fallback routes file with only sitemap.xml')
    process.exit(1)
  }
}

fetchRoutes()
