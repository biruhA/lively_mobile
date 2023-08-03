import {View, Text} from 'react-native';
import React from 'react';
import TouchableIcon from './TouchableIcon';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../store/hooks';
import {ScreenNames} from '../../constants';

export function NotificationButton({onOpen}: any) {
  const navigation = useNavigation();
  const {isLoggedIn} = useAppSelector(state => state.auth);

  return (
    <TouchableIcon
      image={require('../../assets/icons/bell.png')}
      boxSize={5}
      onPress={() => {
        if (!isLoggedIn) {
          onOpen();
        }
        if (isLoggedIn) {
          if (!isLoggedIn) {
            onOpen();
          }
          if (isLoggedIn) {
            navigation.navigate(ScreenNames.Notification);
          }
        }
      }}
    />
  );
}
