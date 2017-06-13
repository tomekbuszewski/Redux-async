const splitUrl = url => url.split('/');

export const getLastPart = url => {
  const split = splitUrl(url);

  return split[split.length - 1] === '' ? split[split.length - 2] : split[split.length - 1];
};

export const getType = url => {
  const TYPES = { 'tag': 'tags', 'category': 'categories' };
  const SPLIT = splitUrl(url);
  const CURRENT = SPLIT[1];
  const RETURN = TYPES[CURRENT];

  return typeof RETURN === 'undefined' ? '' : RETURN;
};