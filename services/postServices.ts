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

const createPost = async (post: IPost): Promise<void> => {
  try {
    await $api('/post', {
      method: 'POST',
      body: post
    })
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const deletePosts = async (ids: string[]): Promise<void> => {
  try {
    await $api(`/post`, {
      method: 'DELETE',
      body: { ids }
    })
  } catch (error: any) {
    throw errorHandler(error)
  }
}

interface PostService {
  getPosts(filter: PostFilter, pagination: Pagination): Promise<ListPosts>
  createPost(post: IPost): Promise<void>
  deletePosts(id: string[]): Promise<void>
}

export const $postService: PostService = {
  getPosts: (filter, pagination) => getPosts(filter, pagination),
  createPost: (post) => createPost(post),
  deletePosts: (id) => deletePosts(id)
}
