import {Platform, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const isAndroid = Platform.OS === 'android';

export default function useGetTopInset() {
  const {top} = useSafeAreaInsets();

  return isAndroid ? StatusBar.currentHeight : top;
}
