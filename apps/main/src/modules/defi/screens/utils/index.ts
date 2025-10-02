export const formatHoldingTimeDisplay = (timeInSecond: number) => {
  const diff = timeInSecond ?? 0;
  const sInMinute = 60;
  const sInHour = sInMinute * 60;
  const sInDay = sInHour * 24;

  const days = Math.floor(diff / sInDay);
  const hours = Math.floor((diff % sInDay) / sInHour);
  const minutes = Math.floor((diff % sInHour) / sInMinute);
  return [days, hours, minutes];
};

export const formatCompareAvgHoldingTimeDisplayHours = (
  timeInSecond: number,
  avgTimeInSecond: number,
) => {
  const diff = timeInSecond - avgTimeInSecond;
  const hours = Math.floor(diff / 3600);
  return hours;
};
