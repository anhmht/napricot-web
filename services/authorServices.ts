const getAuthors = async (
  filter: AuthorFilter,
  pagination: Pagination
): Promise<ListAuthors> => {
  try {
    const data = await $api('/author', {
      query: createPayload(filter, pagination)
    })
    return data as ListAuthors
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const getAuthorBySlug = async (slug: string): Promise<IAuthor> => {
  try {
    const data = await $api(`/author/slug/${slug}`)
    return data.author as IAuthor
  } catch (error: any) {
    throw errorHandler(error)
  }
}

interface AuthorService {
  getAuthors(filter: AuthorFilter, pagination: Pagination): Promise<ListAuthors>
  getAuthorBySlug(slug: string): Promise<IAuthor>
}

export const $authorService: AuthorService = {
  getAuthors: (filter, pagination) => getAuthors(filter, pagination),
  getAuthorBySlug: (slug) => getAuthorBySlug(slug)
}
