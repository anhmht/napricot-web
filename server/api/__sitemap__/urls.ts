import { Image } from '~/models/Image'
import { ListPosts, PostStatus } from '~/models/Post'
import { createPayload } from '~/utils'

export default defineSitemapEventHandler(async () => {
  const [posts] = await Promise.all([
    $fetch<ListPosts>(`${process.env.API_URL}/post`, {
      query: createPayload(
        { status: PostStatus.published },
        { page: 1, limit: 0 }
      )
    }).then((data: ListPosts) => {
      return data.posts.map((post) => {
        return {
          title: post.title,
          url: `/post/${post.slug}`,
          images: [post.image, ...post.images].map(
            (img: Image) => img.cloudflareUrl + 'thumbnail'
          ),
          lastmod: post.updatedAt,
          publication_date: post.createdAt as string
        }
      })
    })
  ])

  // Create sitemap entries for individual posts
  const postPages = posts.flatMap((p) => {
    return [
      {
        loc: p.url,
        priority: 1 as const,
        lastmod: p.lastmod,
        images: p.images.map((img: string, index) => ({
          loc: img,
          title: p.title + index,
          caption: p.title + index
        })),
        news: {
          title: p.title,
          publication_date: p.publication_date,
          publication: { name: p.title, language: 'en' }
        }
      }
    ]
  })

  // Add the main posts listing page
  const mainPages = [
    {
      loc: '/post',
      priority: 0.8 as const,
      lastmod: posts.length > 0 ? posts[0].lastmod : new Date().toISOString(),
      changefreq: 'daily' as const
    }
  ]

  return [...mainPages, ...postPages]
})
