import React from 'react';
import { shallow } from 'enzyme';

import Nav from './index';

test('Nav renders properly', () => {
  const component = shallow(<Nav />);

  expect(component.find('.nav').exists()).toBeTruthy()
});