import { getLastPart } from './UrlParser';

test('Returns last part of url', () => {
  expect(getLastPart('/some/url')).toBe('url');
});

test('Returns last part of url even if it ends with a slash', () => {
  expect(getLastPart('/some/url/')).toBe('url');
})