import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenNames} from '../constants';
import {PlaceDetails, PlacePharmacyDetail, PlaceScreen} from '../screens';
import {HomeStackParamList} from '../constants/HomeStackParamList';

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
    </Stack.Navigator>
  );
};
