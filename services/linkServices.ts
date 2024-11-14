
const getAllLinks = async (): Promise<{
  links: ILink[],
}> => {
  try {
    const data = await $api('/link')
    return {
      links: data.links,
    } as { links: ILink[] }
  } catch (error: any) {
    console.log(error);

    throw errorHandler(error)
  }
}

const getLinks = async (filter: LinkFilter, pagination: Pagination): Promise<ListLinks> => {
  try {
    const data = await $api('/link', {
      query: createPayload(filter, pagination)
    })
    return data as ListLinks
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const getLink = async (id: string): Promise<ILink> => {
  try {
    const data = await $api(`/link/${id}`)
    return data as ILink
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const createLink = async (link: ILink): Promise<ILink> => {
  try {
    const data = await $api('/link', {
      method: 'POST',
      body: link
    })
    return data.link as ILink
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const updateLink = async (id: string, link: ILink): Promise<ILink> => {
  try {
    const data = await $api(`/link/${id}`, {
      method: 'PUT',
      body: link
    })
    return data.link as ILink
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const deleteLinks = async (ids: string[]): Promise<void> => {
  try {
    await $api('/link', {
      method: 'DELETE',
      body: { ids }
    })
  } catch (error: any) {
    throw errorHandler(error)
  }
}

interface LinkService {
  getAllLinks: () => Promise<{
    links: ILink[],
  }>
  getLinks: (filter: LinkFilter, pagination: Pagination) => Promise<ListLinks>
  getLink: (id: string) => Promise<ILink>
  createLink: (link: ILink) => Promise<ILink>
  updateLink: (id: string, link: ILink) => Promise<ILink>
  deleteLinks: (id: string[]) => Promise<void>
}

export const $linkService: LinkService = {
  getAllLinks: () => getAllLinks(),
  getLinks: (filter: LinkFilter, pagination: Pagination) => getLinks(filter, pagination),
  getLink: (id: string) => getLink(id),
  createLink: (link: ILink) => createLink(link),
  updateLink: (id: string, link: ILink) => updateLink(id, link),
  deleteLinks: (id: string[]) => deleteLinks(id)
}
