import React from 'react';
import { shallow } from 'enzyme'

import { Post } from './index';

import testArray from '../../Utils/testCollection';

test('Renders properly', () => {
  const component = shallow(<Post url="/test-1/" posts={testArray} />);

  expect(component.find('.title').text()).toBe('Test 1');
});