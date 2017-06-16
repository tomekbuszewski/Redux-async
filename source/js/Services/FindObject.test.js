import findObject from './FindObject';

import testArray from '../Utils/testCollection';

it('Finds object by key', () => {
  expect(findObject(0, testArray, 'url', '/test-2/')).toHaveProperty('title', 'Test 2');
});

it('Returns false is nothing is found', () => {
  expect(findObject(0, testArray, 'url', '/test-not-exist/')).toBeFalsy()
});