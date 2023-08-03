import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenNames} from '../constants';
import {
  NotificationScreen,
  PlaceDetails,
  PlacePharmacyDetail,
  PlaceScreen,
  ProductDetailScreen,
} from '../screens';
import {HomeStackParamList} from '../constants/HomeStackParamList';
import {StoresScreen} from '../screens/StoresScreen';

//TODO change AuthStackParamList
const Stack = createStackNavigator<HomeStackParamList>();

export const PlaceStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ScreenNames.Place} component={PlaceScreen} />
      <Stack.Screen name={ScreenNames.PlaceDetails} component={PlaceDetails} />
      <Stack.Screen
        name={ScreenNames.PlacePharmacyDetail}
        component={PlacePharmacyDetail}
      />
      <Stack.Screen
        name={ScreenNames.Notification}
        component={NotificationScreen}
      />
      {/* <Stack.Screen
        name={ScreenNames.ProductDetailScreen}
        component={ProductDetailScreen}
      />
      <Stack.Screen name={ScreenNames.StoresScreen} component={StoresScreen} /> */}
    </Stack.Navigator>
  );
};
