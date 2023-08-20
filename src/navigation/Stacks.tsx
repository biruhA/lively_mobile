import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenNames} from '../constants';
import {
  ArticleDetailScreen,
  BrowseScreen,
  ChangePasswordScreen,
  CheckoutScreen,
  ClaimDiscount,
  CollectionDetailScreen,
  DiscountDetailScreen,
  DiscountScreen,
  DrugDetailScreen,
  DrugStoresScreen,
  EditProfileScreen,
  EventDetailScreen,
  HelpScreen,
  HomeScreen,
  MedicinePerscriptionScreen,
  MedicinesScreen,
  NotificationScreen,
  PharmacyDetailScreen,
  PlaceDetails,
  PlacePharmacyDetail,
  PlaceScreen,
  PrivacyScreen,
  ProductDetailScreen,
  SearchScreen,
  SeeAllArticlesScreen,
  SeeAllCollectionScreen,
  SeeAllDealsScreen,
  SeeAllDrugsScreen,
  SeeAllPopularArticlesScreen,
  SeeAllProductsScreen,
  SeeAllTrendingArticlesScreen,
  SettingsScreen,
  ShopScreen,
  StoresScreen,
} from '../screens';

const Stack = createStackNavigator<any>();

export const Stacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
        <Stack.Screen name={ScreenNames.Home} component={HomeScreen} />
        <Stack.Screen name={ScreenNames.Browse} component={BrowseScreen} />
        <Stack.Screen name={ScreenNames.Place} component={PlaceScreen} />
        <Stack.Screen name={ScreenNames.Settings} component={SettingsScreen} />
      </Stack.Group>
      {/* Stack */}
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
      <Stack.Screen
        name={ScreenNames.Notification}
        component={NotificationScreen}
      />
      <Stack.Screen name={ScreenNames.PlaceDetails} component={PlaceDetails} />
      <Stack.Screen
        name={ScreenNames.PlacePharmacyDetail}
        component={PlacePharmacyDetail}
      />
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
      <Stack.Screen
        name={ScreenNames.CheckoutScreen}
        component={CheckoutScreen}
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
        name={ScreenNames.MedicinePerscription}
        component={MedicinePerscriptionScreen}
      />
      <Stack.Screen
        name={ScreenNames.SeeAllPopularArticles}
        component={SeeAllPopularArticlesScreen}
      />
      <Stack.Screen
        name={ScreenNames.SeeAllArticles}
        component={SeeAllArticlesScreen}
      />
    </Stack.Navigator>
  );
};