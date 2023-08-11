import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainBottomParamList, ScreenNames} from '../constants/index';
import {CustomBarButton} from '../components/atoms';
import {BrowseScreen, PlaceScreen, SettingsScreen} from '../screens';
import {ShopStack} from './ShopStack';
import {HomeStack} from './HomeStack';
import {BrowseStack} from './BrowseStack';
import {SettingsStack} from './SettingsStack';
import {PlaceStack} from './PlaceStack';
import {Platform} from 'react-native';
import {colors} from '../theme/colors';
import {Icons} from '../theme/icons';

const Tab = createBottomTabNavigator<MainBottomParamList>();

export const MainBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 55 : 75,
          borderTopColor: colors.pureWhite,
        },
      }}>
      <Tab.Screen
        name={ScreenNames.Home}
        component={HomeStack}
        options={({navigation}: any) => ({
          unmountOnBlur: true,
          tabBarButton: () => (
            <CustomBarButton
              navigation={navigation}
              label={ScreenNames.Home}
              active={Icons.home.active}
              inactive={Icons.home.inactive}
            />
          ),
        })}
      />
      <Tab.Screen
        name={ScreenNames.Browse}
        component={BrowseStack}
        options={({navigation}: any) => ({
          unmountOnBlur: true,
          tabBarButton: () => (
            <CustomBarButton
              navigation={navigation}
              label={ScreenNames.Browse}
              active={Icons.browse.active}
              inactive={Icons.browse.inactive}
            />
          ),
        })}
      />
      <Tab.Screen
        name={ScreenNames.Place}
        component={PlaceStack}
        options={({navigation}: any) => ({
          unmountOnBlur: true,
          tabBarButton: () => (
            <CustomBarButton
              navigation={navigation}
              label={ScreenNames.Place}
              active={Icons.place.active}
              inactive={Icons.place.inactive}
            />
          ),
        })}
      />
      <Tab.Screen
        name={ScreenNames.Settings}
        component={SettingsStack}
        options={({navigation}: any) => ({
          unmountOnBlur: true,
          tabBarButton: () => (
            <CustomBarButton
              navigation={navigation}
              navTo={ScreenNames.Settings}
              label={'Settings'}
              active={Icons.setting.active}
              inactive={Icons.setting.inactive}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
