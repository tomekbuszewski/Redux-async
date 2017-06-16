import name from './ActionNameBuilder';

it('Creates redux-styled names from strings', () => {
  expect(name('PREFIX', 'some name')).toBe('[PREFIX]_SOME_NAME');
});