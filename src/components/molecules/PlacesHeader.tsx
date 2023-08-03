import {Text} from 'react-native';
import React, {useState} from 'react';
import {Avatar, HStack, Image, useDisclose} from 'native-base';
import {fonts} from '../../theme/fonts';
import bell from '../../assets/icons/bell.png';
import language from '../../assets/icons/language.png';
import heart from '../../assets/icons/heart-bold.png';
import {NotificationButton} from '../atoms';
import {LoginSheet} from '../sheets';
import {ScreenNames} from '../../constants';

export function PlacesHeader() {
  const {isOpen, onClose, onOpen} = useDisclose();

  return (
    <>
      <HStack
        p={4}
        bg={'white'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <HStack alignItems={'center'} space={2}>
          <Text style={fonts.subtitle1}>Places</Text>
        </HStack>
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
