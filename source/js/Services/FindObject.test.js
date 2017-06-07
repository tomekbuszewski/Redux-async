import findObject from './FindObject';

import testArray from '../Utils/testCollection';

it('Finds object by key', () => {
  expect(findObject(0, testArray, 'url', '/test-1/')).toHaveProperty('title', 'Test 1');
})