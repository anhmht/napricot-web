export const randomRate = (min: number, max: number) => {
  return Number((Math.random() * (max - min)).toFixed(1)) + min;
}

export const createPayload = (payload: any) => {
  if (payload.sort === 'createdAt') {
    delete payload.sort
  }
  return { ...payload };
}
