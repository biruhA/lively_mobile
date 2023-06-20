import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenNames} from '../constants';
import {AuthStackParamList} from '../constants/AuthStackParamList';
import {
  ProductDetailScreen,
  SeeAllProductsScreen,
  ShopScreen,
} from '../screens';
import {StoresScreen} from '../screens/StoresScreen';

//TODO change AuthStackParamList
const Stack = createStackNavigator<AuthStackParamList>();

export const ShopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ScreenNames.Shop} component={ShopScreen} />
      <Stack.Screen
        name={ScreenNames.SeeAllProductsScreen}
        component={SeeAllProductsScreen}
      />
      <Stack.Screen
        name={ScreenNames.ProductDetailScreen}
        component={ProductDetailScreen}
      />
      <Stack.Screen name={ScreenNames.StoresScreen} component={StoresScreen} />
    </Stack.Navigator>
  );
};
