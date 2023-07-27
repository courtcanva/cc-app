function isValidDate(date: any): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

function getDateDifference(
  start: Date,
  end: Date
): { days: number; hours: number; minutes: number; seconds: number } {
  const diffInMillis = end.getTime() - start.getTime();

  const days = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));

  let remainingMillis = diffInMillis % (1000 * 60 * 60 * 24);

  const hours = Math.floor(remainingMillis / (1000 * 60 * 60));
  remainingMillis %= 1000 * 60 * 60;

  const minutes = Math.floor(remainingMillis / (1000 * 60));
  remainingMillis %= 1000 * 60;

  const seconds = Math.floor(remainingMillis / 1000);

  return { days, hours, minutes, seconds };
}

export default getDateDifference;
