import React from 'react';
import { shallow } from 'enzyme'

import Header from './index';

test('Renders properly with title', () => {
  const component = shallow(<Header>Test</Header>);

  expect(component.find('.title').text()).toBe('Test');
});