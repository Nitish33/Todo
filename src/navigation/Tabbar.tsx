import H1 from '@components/AppText/H1';
import useGetTopInset from '@hooks/useGetTopInset';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';

export function MyTabBar(props: MaterialTopTabBarProps) {
  const {state, descriptors, navigation} = props;

  const topInsets = useGetTopInset();

  return (
    <View style={[Styles.container, {paddingTop: topInsets}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.title;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              Styles.itemContainer,
              {borderBottomWidth: state.index === index ? 1 : 0},
            ]}>
            <H1>{label}</H1>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'black',
  },

  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderColor: 'white',
    backgroundColor: 'black',
  },
});
