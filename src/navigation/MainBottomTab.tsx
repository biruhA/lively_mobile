import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainBottomParamList, ScreenNames} from '../constants/index';
import {CustomBarButton} from '../components/atoms';
import home from '../assets/icons/home-active.png';
import homeIn from '../assets/icons/home-inactive.png';
import browse from '../assets/icons/browse-active.png';
import browseIn from '../assets/icons/browse-inactive.png';
import place from '../assets/icons/place-active.png';
import placeIn from '../assets/icons/place-inactive.png';
import shoping from '../assets/icons/shoping-active.png';
import shopingIn from '../assets/icons/shoping-inactive.png';

import setting from '../assets/icons/setting.png';
import settingActive from '../assets/icons/setting-active.png';

import {BrowseScreen, PlaceScreen, SettingsScreen} from '../screens';
import {ShopStack} from './ShopStack';
import {HomeStack} from './HomeStack';
import {BrowseStack} from './BrowseStack';
import {Platform} from 'react-native';
import {colors} from '../theme/colors';

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
          tabBarButton: () => (
            <CustomBarButton
              navigation={navigation}
              label={ScreenNames.Home}
              active={home}
              inactive={homeIn}
            />
          ),
        })}
      />
      <Tab.Screen
        name={ScreenNames.Browse}
        component={BrowseStack}
        options={({navigation}: any) => ({
          tabBarButton: () => (
            <CustomBarButton
              navigation={navigation}
              label={ScreenNames.Browse}
              active={browse}
              inactive={browseIn}
            />
          ),
        })}
      />
      {/* <Tab.Screen
        name={ScreenNames.ShopStack}
        component={ShopStack}
        options={({navigation}: any) => ({
          tabBarButton: () => (
            <CustomBarButton
              navigation={navigation}
              navTo={ScreenNames.ShopStack}
              label={'Shop'}
              active={shoping}
              inactive={shopingIn}
            />
          ),
        })}
      /> */}
      <Tab.Screen
        name={ScreenNames.Place}
        component={PlaceScreen}
        options={({navigation}: any) => ({
          tabBarButton: () => (
            <CustomBarButton
              navigation={navigation}
              label={ScreenNames.Place}
              active={place}
              inactive={placeIn}
            />
          ),
        })}
      />
      <Tab.Screen
        name={ScreenNames.Settings}
        component={SettingsScreen}
        options={({navigation}: any) => ({
          tabBarButton: () => (
            <CustomBarButton
              navigation={navigation}
              navTo={ScreenNames.Settings}
              label={'Settings'}
              active={settingActive}
              inactive={setting}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
