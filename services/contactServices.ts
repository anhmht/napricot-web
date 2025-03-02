const submitTicket = async (params: Contact): Promise<Contact> => {
  try {
    const data = await $api('/contact', {
      method: 'POST',
      body: params
    })
    return data as Contact
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const getContacts = async (
  filter: CategoryFilter,
  pagination: Pagination
): Promise<ListContacts> => {
  try {
    const data = await $api('/contact', {
      query: createPayload(filter, pagination)
    })
    return data as ListContacts
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const getContact = async (id: string): Promise<Contact> => {
  try {
    const data = await $api(`/contact/${id}`)
    return data.contact as Contact
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const updateContact = async (
  id: string,
  contact: Contact
): Promise<Contact> => {
  try {
    const data = await $api(`/contact/${id}`, {
      method: 'PUT',
      body: contact
    })
    console.log(data)

    return data.contact as Contact
  } catch (error: any) {
    throw errorHandler(error)
  }
}

const updateContacts = async (ids: string[]): Promise<void> => {
  try {
    await $api('/contact', {
      method: 'PUT',
      body: { ids }
    })
  } catch (error: any) {
    throw errorHandler(error)
  }
}

interface ContactService {
  submitTicket: (params: Contact) => Promise<Contact>
  getContacts: (
    filter: CategoryFilter,
    pagination: Pagination
  ) => Promise<ListContacts>
  getContact: (id: string) => Promise<Contact>
  updateContact: (id: string, contact: Contact) => Promise<Contact>
  updateContacts: (ids: string[]) => Promise<void>
}

export const $contactService: ContactService = {
  submitTicket: (params: Contact) => submitTicket(params),
  getContacts: (filter: CategoryFilter, pagination: Pagination) =>
    getContacts(filter, pagination),
  getContact,
  updateContact: (id: string, contact: Contact) => updateContact(id, contact),
  updateContacts: (ids: string[]) => updateContacts(ids)
}
