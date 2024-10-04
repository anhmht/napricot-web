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

const updatePost = async (id: string, post: IPost): Promise<void> => {
  try {
    await $api(`/post/${id}`, {
      method: 'PUT',
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

const getPost = async (id: string): Promise<IPost> => {
  try {
    const data = await $api(`/post/${id}`)
    return data.post as IPost
  } catch (error: any) {
    throw errorHandler(error)
  }
}

interface PostService {
  getPosts(filter: PostFilter, pagination: Pagination): Promise<ListPosts>
  createPost(post: IPost): Promise<void>
  deletePosts(id: string[]): Promise<void>
  getPost(id: string): Promise<IPost>
  updatePost(id: string, post: IPost): Promise<void>
}

export const $postService: PostService = {
  getPosts: (filter, pagination) => getPosts(filter, pagination),
  createPost: (post) => createPost(post),
  deletePosts: (id) => deletePosts(id),
  getPost: (id) => getPost(id),
  updatePost: (id, post) => updatePost(id, post)
}
