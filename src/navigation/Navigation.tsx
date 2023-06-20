import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {CarouselOnBoarding} from '../components/organisms';
import {AuthStack} from './AuthStack';
import Context from '../realm/config';
import {OnBoarding} from '../realm/OnBoarding';
import {useSavedAuthData} from '../hooks';
import {MainBottomTab} from './MainBottomTab';

const {useQuery} = Context;

export function Navigation() {
  useSavedAuthData();
  const onboarding = useQuery(OnBoarding);

  if (!onboarding[0]?.hasOnBoarded) {
    return <CarouselOnBoarding />;
  }
  return (
    <NavigationContainer>
      {onboarding[0]?.rememberMe ? <MainBottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
