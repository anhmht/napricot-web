export const randomRate = (min: number, max: number) => {
  return Number((Math.random() * (max - min)).toFixed(1)) + min;
}

export const createPayload = (filter: any, pagination: Pagination) => {
  const payload = {
    ...filter,
    ...pagination
  }
  for (const key in payload) {
    if (payload[key] === null || payload[key] === undefined || payload[key] === '') {
      delete payload[key]
    }
  }
  if (payload.sort === 'createdAt' || !payload.sort) {
    delete payload.sort
  }
  return payload;
}
