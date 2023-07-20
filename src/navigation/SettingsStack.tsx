import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenNames} from '../constants';
import {
  SettingsScreen,
  EditProfileScreen,
  HelpScreen,
  ChangePasswordScreen,
  PrivacyScreen,
} from '../screens';
import {HomeStackParamList} from '../constants/HomeStackParamList';

//TODO change AuthStackParamList
const Stack = createStackNavigator<any>();

export const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ScreenNames.Settings} component={SettingsScreen} />
      <Stack.Screen
        name={ScreenNames.EditProfileScreen}
        component={EditProfileScreen}
      />
      <Stack.Screen name={ScreenNames.HelpScreen} component={HelpScreen} />
      <Stack.Screen
        name={ScreenNames.ChangePasswordScreen}
        component={ChangePasswordScreen}
      />

      <Stack.Screen
        name={ScreenNames.PrivacyScreen}
        component={PrivacyScreen}
      />
    </Stack.Navigator>
  );
};
