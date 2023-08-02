import React from 'react';
import {CarouselOnBoarding} from '../components/organisms';
import {AuthStack} from './AuthStack';
import Context from '../realm/config';
import {OnBoarding} from '../realm/OnBoarding';
import {useSavedAuthData} from '../hooks';
import {MainBottomTab} from './MainBottomTab';
import {useGetMedicineNotificationQuery} from '../store/services';
import {useAppSelector} from '../store/hooks';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenNames} from '../constants';
import {Center, Spinner} from 'native-base';

const {useQuery} = Context;
const Stack = createStackNavigator<any>();

export function Navigation() {
  useSavedAuthData();
  const onboarding = useQuery(OnBoarding);
  const {token, isLoggedIn} = useAppSelector(state => state.auth);
  useGetMedicineNotificationQuery(token, {
    pollingInterval: 300000,
  });

  if (!onboarding[0]?.hasOnBoarded) {
    return <CarouselOnBoarding />;
  }

  if (isLoggedIn === undefined) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  if (isLoggedIn === undefined) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={
        isLoggedIn ? ScreenNames.MainBottomTab : ScreenNames.AuthStack
      }
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
      }}>
      <Stack.Screen name={ScreenNames.AuthStack} component={AuthStack} />
      <Stack.Screen
        name={ScreenNames.MainBottomTab}
        component={MainBottomTab}
      />
    </Stack.Navigator>
  );
}
