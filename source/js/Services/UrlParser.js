export const getLastPart = url => {
  const split = url.split('/');

  return split[split.length - 1];
};