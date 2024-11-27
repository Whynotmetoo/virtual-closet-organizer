import { render } from '@testing-library/react-native';
import axios from 'axios';
import HomeScreen from '@/app/(tabs)/index';
import { get } from '@/utils/request'


// Mock the utility functions
jest.mock('@/utils/request', () => ({
  get: jest.fn(),
}));


describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    (get as jest.Mock).mockResolvedValueOnce([]); // Mock empty response
    const { getByText } = render(<HomeScreen />);

    getByText('Upload a new cloth');
    getByText('Your closet');
  });
});