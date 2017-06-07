export const getLastPart = url => {
  const split = url.split('/');

  return split[split.length - 1] === '' ? split[split.length - 2] : split[split.length - 1];
};