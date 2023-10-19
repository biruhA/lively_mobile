import {TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../store/hooks';
import {ScreenNames} from '../../constants';
import {Image, Stack, Text} from 'native-base';
import {Icons} from '../../theme/icons';

export function NotificationButton({onOpen}: any) {
  const navigation = useNavigation();
  const {isLoggedIn, inAppLoggedIn} = useAppSelector(state => state.auth);
  const {hasNotification} = useAppSelector(state => state.notification);
  const [isActive, setIsActive] = useState(hasNotification);

  useEffect(() => {
    setIsActive(hasNotification);
  }, [hasNotification]);

  function onPress() {
    if (isLoggedIn || (!isLoggedIn && inAppLoggedIn)) {
      navigation.navigate(ScreenNames.Notification);
    } else {
      onOpen();
    }
  }

  return (
    <TouchableOpacity onPress={onPress} style={{padding: 10}}>
      {isActive ? <ActiveImage /> : <InactiveImage />}
    </TouchableOpacity>
  );
}

function ActiveImage() {
  return (
    <Stack bg={'amber.700'} rounded="full" p={1}>
      <Image source={Icons.bell.active} alt="Alternate Text" boxSize={4} />
    </Stack>
  );
}

function InactiveImage() {
  return (
    <Image source={Icons.bell.inactive} alt="Alternate Text" boxSize={5} />
  );
}
