export const randomRate = (min: number, max: number) => {
  return Number((Math.random() * (max - min)).toFixed(1)) + min;
}
