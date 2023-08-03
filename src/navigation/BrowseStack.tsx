import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenNames} from '../constants';
import {
  ArticleDetailScreen,
  BrowseScreen,
  EventDetailScreen,
  NotificationScreen,
  SeeAllArticlesScreen,
  SeeAllPopularArticlesScreen,
  SeeAllTrendingArticlesScreen,
} from '../screens';
import {HomeStackParamList} from '../constants/HomeStackParamList';

//TODO change AuthStackParamList
const Stack = createStackNavigator<any>();

export const BrowseStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ScreenNames.Browse} component={BrowseScreen} />
      <Stack.Screen
        name={ScreenNames.SeeAllTrendingArticles}
        component={SeeAllTrendingArticlesScreen}
      />
      <Stack.Screen
        name={ScreenNames.ArticleDetail}
        component={ArticleDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.EventDetail}
        component={EventDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.SeeAllPopularArticles}
        component={SeeAllPopularArticlesScreen}
      />
      <Stack.Screen
        name={ScreenNames.SeeAllArticles}
        component={SeeAllArticlesScreen}
      />
      <Stack.Screen
        name={ScreenNames.Notification}
        component={NotificationScreen}
      />
    </Stack.Navigator>
  );
};
