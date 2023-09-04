import moment from 'moment';

export const formattingSlaAt = (slaAt: string) => {
  const now = moment();
  const currentTime = moment(slaAt);

  const isExpired = currentTime.diff(now, 'seconds') <= 0;

  const diffTime = isExpired ? now.diff(currentTime) : currentTime.diff(now);
  const leftTime = moment.utc(diffTime).format('HH[h]mm');

  return isExpired ? 'Em atraso' : leftTime;
};

export const formattingRespondedAt = (date: string) => {
  const localTime = moment(date);
  const totalTime = localTime.startOf('minutes').fromNow();

  return date ? totalTime : '- - -';
};
