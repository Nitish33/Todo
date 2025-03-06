import useSyncMutation from '@services/useSyncMutation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {MyTabBar} from './Tabbar';
import Home from '../screens/Home';
import EditTask from '../screens/EditTask';
import ScreenName from '../utils/screenNames';
import {RootStackParamList, HomeTabsParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const TopNavigator = createMaterialTopTabNavigator<HomeTabsParamList>();

const HomeTabs = () => {
  return (
    <TopNavigator.Navigator tabBar={props => <MyTabBar {...props} />}>
      <TopNavigator.Screen
        options={{
          title: 'Pending',
        }}
        name={ScreenName.HOME_PENDING}
        component={Home}
        initialParams={{status: 'pending'}}
      />

      <TopNavigator.Screen
        options={{
          title: 'Completed',
        }}
        name={ScreenName.HOME_COMPLETED}
        component={Home}
        initialParams={{status: 'completed'}}
      />
    </TopNavigator.Navigator>
  );
};

const MainStack = () => {
  useSyncMutation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ScreenName.HOME} component={HomeTabs} />
      <Stack.Screen name={ScreenName.EDIT_TASK} component={EditTask} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default Navigator;
