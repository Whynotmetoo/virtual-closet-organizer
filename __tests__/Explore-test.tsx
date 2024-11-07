import { render } from '@testing-library/react-native';

import HomeScreen from '@/app/(tabs)/explore';

describe('<HomeScreen />', () => {
  test('Text renders correctly on explore page', () => {
    const { getByText } = render(<HomeScreen />);

    getByText('Choose Your Activity and Feeling');
  });
});