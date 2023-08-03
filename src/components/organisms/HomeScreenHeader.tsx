import {Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Avatar, HStack, Image, useDisclose} from 'native-base';
import {fonts} from '../../theme/fonts';
import bell from '../../assets/icons/bell.png';
import cart from '../../assets/icons/cart.png';
import TouchableIcon from '../atoms/TouchableIcon';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {useAppSelector} from '../../store/hooks';
import {LoginSheet} from '../sheets';
import {NotificationButton} from '../atoms';

export function HomeScreenHeader() {
  const {user} = useAppSelector(state => state.auth);
  const {isOpen, onClose, onOpen} = useDisclose();

  return (
    <>
      <HStack
        px={4}
        bg={'white'}
        alignItems={'center'}
        justifyContent={'space-between'}
        py={4}>
        <Text style={fonts.subtitle1}>HI {user?.name || ''} 👋</Text>
        <NotificationButton onOpen={onOpen} />
      </HStack>
      <LoginSheet
        isOpen={isOpen}
        onClose={onClose}
        action={ScreenNames.Notification}
        payload=""
      />
    </>
  );
}
