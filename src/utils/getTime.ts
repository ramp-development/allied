export const getTime = (options: Intl.DateTimeFormatOptions) => {
  return new Date().toLocaleTimeString('en-GB', options);
};

export const getTimeInLondon = () => {
  return getTime({
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
