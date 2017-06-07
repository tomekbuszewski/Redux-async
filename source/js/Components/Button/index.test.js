import React from 'react';
import { shallow } from 'enzyme';

import Button from './index';

test('Button renders properly and actions fires fine', () => {
  let txt = 'Button';
  const button = shallow(<Button action={() => { txt = 'Clicked'; }}>{txt}</Button>);

  expect(button.text()).toBe('Button');
  button.simulate('click');
  setTimeout(() => { expect(button.text()).toBe('Clicked'); });
});