import { Image } from "~/models/Image";
import { ListPosts, PostStatus } from "~/models/Post";
import { createPayload } from "~/utils";

export default defineEventHandler(async (event) => {
  const [
    posts
  ] = await Promise.all([
    $fetch<ListPosts>(`${process.env.API_URL}/post`, { query: createPayload({ status: PostStatus.published }, {page: 1, limit: 0}) })
      .then((data: ListPosts) => {
        return data.posts.map((post) => {
          return {
            url: `/post/${post.slug}`,
            images: [post.image,...post.images].map((img: Image) => img.cloudflareUrl),
            lastmod: post.updatedAt,
          }
        })
      })
  ])
  return [...posts].map((p) => {
    return { loc: p.url, lastmod: p.lastmod, images: p.images.map((img: string) => ({ loc: img })) }
  })
});
