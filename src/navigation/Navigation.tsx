import React, {useEffect} from 'react';
import {CarouselOnBoarding} from '../components/organisms';
import {AuthStack} from './AuthStack';
import {Stacks} from './Stacks';
import Context from '../realm/config';
import {OnBoarding} from '../realm/OnBoarding';
import {
  usePushNotification,
  useCurrentLocation,
  useSavedAuthData,
  useDeepLinkForegrounded,
} from '../hooks';
import {
  useFcmTokenMutation,
  useGetMedicineNotificationQuery,
} from '../store/services';
import {useAppSelector} from '../store/hooks';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenNames} from '../constants';
import {Center, Spinner, Text} from 'native-base';
import {UpdateSheet} from '../components';

const {useQuery} = Context;
const Stack = createStackNavigator<any>();

export function Navigation() {
  useDeepLinkForegrounded();
  useSavedAuthData();
  useCurrentLocation();
  const onboarding = useQuery(OnBoarding);
  usePushNotification();
  const {token, isLoggedIn, fcmToken} = useAppSelector(state => state.auth);
  const [FcmToken, result] = useFcmTokenMutation();

  useEffect(() => {
    if (fcmToken && token) {
      FcmToken({token: fcmToken, userToken: token});
    }
  }, [fcmToken, token]);

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

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'transparentModal',
        }}>
        {!isLoggedIn ? (
          <Stack.Screen name={ScreenNames.AuthStack} component={AuthStack} />
        ) : (
          <Stack.Screen name={ScreenNames.Stacks} component={Stacks} />
        )}
      </Stack.Navigator>
    </>
  );
}
