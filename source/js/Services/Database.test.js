import { getPost, getIndex, checkForFetched } from './Database';
import testArray from '../Utils/testCollection';

const fetched = [
  '/',
  '/test-1/'
];

it('Finds post by given criteria (here -- id)', () => {
  expect(getPost(testArray, 'id', 1)).toHaveProperty('title', 'Test 1');
});

it('Returns the array index by given criteria', () => {
  expect(getIndex(testArray, '/test-2/')).toBe(1);
});

it('Returns truthy if given url is in the database', () => {
  expect(checkForFetched(fetched, '/')).toBeTruthy();
});