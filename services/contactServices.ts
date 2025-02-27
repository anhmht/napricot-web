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

interface ContactService {
  submitTicket: (params: Contact) => Promise<Contact>
}

export const $contactService: ContactService = {
  submitTicket: (params: Contact) => submitTicket(params)
}
