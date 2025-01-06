export const formatTimeToString = (minutes: number, separator = ":") => {
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;

  return `${String(hours).padStart(2, "0")}${separator}${String(min).padStart(2, "0")}`;
};
