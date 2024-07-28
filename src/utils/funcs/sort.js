export const descending = (array, property) =>
  array.sort((a, b) => b[property] - a[property]);
