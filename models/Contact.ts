export interface Contact {
  _id?: string
  name: string
  email: string
  subject: string
  content: string
  type: string
  description: string
  isRead?: boolean
  isDone?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ListContacts {
  contacts: Contact[]
  total: number
  totalPages: number
}

export interface ContactFilter {
  name?: string
  sort?: string
}

export const contactTypes: Array<{
  type: string
  label: string
  desc: string[]
}> = [
  {
    type: 'Modified Order',
    label: 'Please describe in detail your request',
    desc: [
      'Modify artwork',
      'Modify shipping address',
      'Modify billing address',
      'Change email',
      'Change product (size, color, etc.)',
      'Change quantity',
      'Other'
    ]
  },
  {
    type: 'Cancel Order',
    label: 'The reason you want to cancel',
    desc: [
      `I don't need it anymore`,
      `The delivery time is too long`,
      `I need to change the order`,
      `I need to update shipping information`,
      `The order was duplicated`,
      `Other`
    ]
  },
  {
    type: 'Order Status',
    label: 'The reason you want to cancel',
    desc: ['Track my order', 'Tracking link is invalid', 'Other']
  },
  {
    type: 'Product Issue',
    label: 'Your Issue',
    desc: [
      `Received wrong product`,
      `Received damaged product`,
      `Received incorrect item (size, color, etc.)`,
      `Missing item`,
      `Other`
    ]
  },
  {
    type: 'Shipping Issue',
    label: 'Your Issue',
    desc: [
      `Late Shipment`,
      `Missing Item`,
      `Damaged Item`,
      `My order shows delivered but was not receive`,
      `Other`
    ]
  },
  {
    type: 'Payment Issue',
    label: 'Your Issue',
    desc: [
      `I was charged twice`,
      `I was charged the wrong amount`,
      `I need a refund`,
      `Other`
    ]
  },
  {
    type: 'Other',
    label: 'Please describe in detail your request',
    desc: []
  }
]
