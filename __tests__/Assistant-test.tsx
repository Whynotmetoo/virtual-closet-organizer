import { render } from '@testing-library/react-native';

import HomeScreen from '@/app/(tabs)/assistant';

describe('<Assistant />', () => {
  test('Text renders correctly on explore page', () => {
    const { getByText } = render(<HomeScreen />);

    getByText('Get Recommendations');
  });
});