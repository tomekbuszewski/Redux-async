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

export const lastSlash = url => url.substr(url.length - 1) === '/' ? url : `${url}/`;

export const getPagination = (url, getNumber = true) => {
  const hasPages = url.indexOf('/page/') > -1;

  if (hasPages) {
    return lastSlash(url.split('/page/')[getNumber ? 1 : 0]);
  } else {
    return getNumber ? Number('1') : url;
  }
};

export const createPaginationLink = (url, page) => `${lastSlash(url)}page/${page}`;