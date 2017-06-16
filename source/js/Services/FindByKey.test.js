import findByKey from './FindByKey';

const test = [
  { key: 'joyce', value: 'ulysses' },
  { key: 'bukowski', value: 'postman' },
  { key: 'knausgard', value: 'my struggle' }
];

it('Finds a value based on a key in an array of objects', () => {
  expect(findByKey(0, test, 'joyce')).toBe('ulysses');
});

it('Returns false if no key matches the criteria', () => {
  expect(findByKey(0, test, 'kerouac')).toBeFalsy();
});

it('Returns an object if requested', () => {
  expect(findByKey(0, test, 'knausgard', 'key', false)).toHaveProperty('key', 'knausgard');
});