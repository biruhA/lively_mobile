import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenNames} from '../constants';
import {MainBottomTab} from './MainBottomTab';
import {AuthStackParamList} from '../constants/AuthStackParamList';
import {
  AddEmailScreen,
  AdditionalInformationScreen,
  ConfirmPhoneScreen,
  CreateAccountScreen,
  CreatePasswordScreen,
  ForgotPasswordScreen,
  ResetPasswordScreen,
  WelcomeBackScreen,
} from '../screens';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
      }}>
      <Stack.Screen
        name={ScreenNames.WelcomeBack}
        component={WelcomeBackScreen}
      />
      <Stack.Screen
        name={ScreenNames.CreateAccount}
        component={CreateAccountScreen}
      />
      <Stack.Screen
        name={ScreenNames.ConfirmPhone}
        component={ConfirmPhoneScreen}
      />
      <Stack.Screen
        name={ScreenNames.CreatePassword}
        component={CreatePasswordScreen}
      />
      <Stack.Screen name={ScreenNames.AddEmail} component={AddEmailScreen} />
      <Stack.Screen
        name={ScreenNames.AdditionalInformation}
        component={AdditionalInformationScreen}
      />
      <Stack.Screen
        name={ScreenNames.ForgotPassword}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={ScreenNames.ResetPassword}
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        name={ScreenNames.MainBottomTab}
        component={MainBottomTab}
      />
    </Stack.Navigator>
  );
};
