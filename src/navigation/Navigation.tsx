import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CarouselOnBoarding} from '../components/organisms';
import {AuthStack} from './AuthStack';
import Context from '../realm/config';
import {OnBoarding} from '../realm/OnBoarding';
import {useSavedAuthData} from '../hooks';
import {MainBottomTab} from './MainBottomTab';
import {useGetMedicineNotificationQuery} from '../store/services';
import {useAppSelector} from '../store/hooks';

const {useQuery} = Context;

export function Navigation() {
  useSavedAuthData();
  const onboarding = useQuery(OnBoarding);
  const {token} = useAppSelector(state => state.auth);
  useGetMedicineNotificationQuery(token, {
    pollingInterval: 300000,
  });

  if (!onboarding[0]?.hasOnBoarded) {
    return <CarouselOnBoarding />;
  }
  return (
    <NavigationContainer>
      {onboarding[0]?.rememberMe ? <MainBottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
