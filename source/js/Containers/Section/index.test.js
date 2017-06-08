import React from 'react';
import { shallow } from 'enzyme';

import Section from './index';

test('Section renders fine', () => {
  const component = shallow(<Section>Text</Section>);
  expect(component.text()).toBe('Text');
});