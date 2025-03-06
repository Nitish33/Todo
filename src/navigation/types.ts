import ScreenName from '../utils/screenNames';

export type HomeTabsParamList = {
  [ScreenName.HOME_PENDING]: {status: 'pending'};
  [ScreenName.HOME_COMPLETED]: {status: 'completed'};
};

export type RootStackParamList = {
  [ScreenName.HOME]: HomeTabsParamList;
  [ScreenName.EDIT_TASK]: {id: number};
};
