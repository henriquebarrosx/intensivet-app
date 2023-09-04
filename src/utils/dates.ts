import moment from 'moment';
import 'moment/locale/pt-br';

export const datetime = (date: string) => {
  return moment(date).format('DD/MM/YYYY HH:mm');
}

export const time = (date: string) => {
  return moment(date).format('HH:mm');
}

export const date = (date: string) => {
  return moment(date).format('DD/MM/YYYY');
}

export const isToday = (date: string) => {
  return moment(date).isSame(moment(), "day");
}

export const isCurrentYear = (date: string) => {
  return moment(date).isSame(moment(), "year");
}

export const getCurrentDatetime = (date: string) => {
  return moment(date).format('DD/MM/YYYY HH:mm');
}