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

export const generateUniqSerial= () => {
  return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    return r.toString(16);
  });
}

export const sleep = (duration: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
