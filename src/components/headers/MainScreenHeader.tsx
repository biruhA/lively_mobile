import {View, Text} from 'react-native';
import React from 'react';
import {HStack, useDisclose} from 'native-base';
import {useAppSelector} from '../../store/hooks';
import {NotificationButton} from '../atoms';
import {ScreenNames} from '../../constants';
import {fonts} from '../../theme/fonts';
import {LoginSheet} from '../sheets';

export function MainScreenHeader({label}: string) {
  const {isOpen, onClose, onOpen} = useDisclose();

  return (
    <>
      <HStack
        px={4}
        bg={'white'}
        alignItems={'center'}
        justifyContent={'space-between'}
        py={4}>
        <Text style={fonts.subtitle1}>{label}</Text>
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
