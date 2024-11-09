import * as React from 'react';
import { render } from '@testing-library/react-native';

import { HelloWave } from '../HelloWave';

it(`HelloWave component renders correctly`, () => {
  const tree = render(<HelloWave />).toJSON();

  expect(tree).toMatchSnapshot();
});
