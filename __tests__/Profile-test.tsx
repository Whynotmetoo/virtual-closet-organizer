import { render } from '@testing-library/react-native';

import HomeScreen from '@/app/(tabs)/profile';

describe('<Profile />', () => {
  test('Text renders correctly on profile page', () => {
    const { getByText } = render(<HomeScreen />);

    getByText('Personal Information');
  });
});