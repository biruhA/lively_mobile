import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenNames} from '../constants';
import {
  ArticleDetailScreen,
  ClaimDiscount,
  CollectionDetailScreen,
  CollectionScreen,
  DrugDetailScreen,
  DrugStoresScreen,
  EventDetailScreen,
  HomeScreen,
  MedicinePerscriptionScreen,
  NotificationDiscountScreen,
  NotificationScreen,
  ProductDetailScreen,
  SearchScreen,
  SeeAllArticlesScreen,
  SeeAllDealsScreen,
  SeeAllDrugsScreen,
  SeeAllPopularArticlesScreen,
  SeeAllProductsScreen,
  SeeAllTrendingArticlesScreen,
} from '../screens';
import {HomeStackParamList} from '../constants/HomeStackParamList';
import {DiscountScreen, DiscountDetailScreen} from '../screens/';
import {StoresScreen} from '../screens/StoresScreen';
import {SeeAllCollectionScreen} from '../screens/SeeAllCollectionScreen';
import {MedicinesScreen} from '../screens/MedicinesScreen';
import {PharmacyDetailScreen} from '../screens/PharmacyDetailScreen';

//TODO change AuthStackParamList
const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ScreenNames.Home} component={HomeScreen} />
      <Stack.Screen name={ScreenNames.Search} component={SearchScreen} />
      <Stack.Screen name={ScreenNames.Discount} component={DiscountScreen} />
      <Stack.Screen
        name={ScreenNames.DiscountDetail}
        component={DiscountDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.SeeAllDeals}
        component={SeeAllDealsScreen}
      />

      <Stack.Screen
        name={ScreenNames.SeeAllProductsScreen}
        component={SeeAllProductsScreen}
      />
      <Stack.Screen
        name={ScreenNames.ProductDetailScreen}
        component={ProductDetailScreen}
      />
      <Stack.Screen name={ScreenNames.StoresScreen} component={StoresScreen} />
      <Stack.Screen
        name={ScreenNames.EventDetail}
        component={EventDetailScreen}
      />

      <Stack.Screen
        name={ScreenNames.SeeAllTrendingArticles}
        component={SeeAllTrendingArticlesScreen}
      />
      <Stack.Screen
        name={ScreenNames.ArticleDetail}
        component={ArticleDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.SeeAllCollection}
        component={SeeAllCollectionScreen}
      />
      <Stack.Screen
        name={ScreenNames.CollectionDetail}
        component={CollectionDetailScreen}
      />
      <Stack.Screen name={ScreenNames.Medicines} component={MedicinesScreen} />
      <Stack.Screen
        name={ScreenNames.DrugDetail}
        component={DrugDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.ClaimDiscount}
        component={ClaimDiscount}
      />
      <Stack.Screen
        name={ScreenNames.SeeAllDrugs}
        component={SeeAllDrugsScreen}
      />
      <Stack.Screen
        name={ScreenNames.DrugStores}
        component={DrugStoresScreen}
      />
      <Stack.Screen
        name={ScreenNames.PharmacyDetail}
        component={PharmacyDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.Notification}
        component={NotificationScreen}
      />
      <Stack.Screen
        name={ScreenNames.MedicinePerscription}
        component={MedicinePerscriptionScreen}
      />
    </Stack.Navigator>
  );
};
