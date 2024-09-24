const getPosts = async (filter: PostFilter, pagination: Pagination): Promise<ListPosts> => {
  try {
    const data = await $api('/post', {
      query: createPayload(filter, pagination)
    })
    return data as ListPosts
  } catch (error: any) {
    throw errorHandler(error)
  }
}

interface PostService {
  getPosts(filter: PostFilter, pagination: Pagination): Promise<ListPosts>
}

export const $postService: PostService = {
  getPosts: (filter, pagination) => getPosts(filter, pagination)
}
