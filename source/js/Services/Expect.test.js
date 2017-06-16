import expectService from './Expect';

const TRUTHY = true;
const FALSY = false;
const ARR_A = ['a', 'b'];
const ARR_B = ['a', 'b'];
const OBJ = { 'key': 'val' };
const STRING = 'Test string';

it('Should return true for truthy', () => { expect(expectService.truthy(TRUTHY)).toBeTruthy(); });
it('Should return true for falsy', () => { expect(expectService.falsy(FALSY)).toBeTruthy(); });
it('Should return true is input is a string', () => { expect(expectService.string(STRING)).toBeTruthy(); });
it('Should return true if both arrays are the same', () => { expect(expectService.arraysToEqual(ARR_A, ARR_B)).toBeTruthy(); });
it('Should return true if array have given element', () => { expect(expectService.arrayToHave(ARR_A, 'a')).toBeTruthy(); });
it('Should return true if object have given element', () => { expect(expectService.objectToHave(OBJ, 'key')).toBeTruthy(); });