import {StyleSheet} from 'react-native';

const SIZE = 60;

const Styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE,
    position: 'absolute',
    backgroundColor: 'grey',
    bottom: SIZE + 24,
    right: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Styles;
