import { ListPosts } from "~/models/Post";
import { createPayload } from "~/utils";

export default defineEventHandler(async (event) => {
  const [
    posts
  ] = await Promise.all([
    $fetch<ListPosts>(`${process.env.API_URL}/post`, { query: createPayload({}, {page: 1, limit: 0}) })
      .then((data: ListPosts) => {
        return data.posts.map((post) => {
          return {
            url: `/post/${post.slug}`,
            lastmod: post.updatedAt,
          }
        })
      })
  ])
  return [...posts].map((p) => {
    return { loc: p.url, lastmod: p.lastmod }
  })
});
