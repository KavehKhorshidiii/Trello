export function isNewBoard(createdAt: string, now: number) {
  const TWO_DAYS = 1000 * 60 * 60 * 24 * 2;

  return new Date(createdAt).getTime() > now - TWO_DAYS;
}