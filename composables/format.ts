import moment from "moment";

export const fromNow = (date: string) => {
  return moment.utc(date).local().fromNow()
};
