import {Text} from 'react-native';
import React, {useState} from 'react';
import {
  Avatar,
  Box,
  Center,
  CheckIcon,
  HStack,
  Image,
  Select,
  useDisclose,
} from 'native-base';
import {fonts} from '../../theme/fonts';
import heartBlack from '../../assets/icons/heart-bold.png';
import bell from '../../assets/icons/bell.png';
import searchBlack from '../../assets/icons/search-black.png';
import {NotificationButton} from '../atoms';
import {LoginSheet} from '../sheets';
import {ScreenNames} from '../../constants';

export function BrowseScreenHeader() {
  const {isOpen, onClose, onOpen} = useDisclose();

  return (
    <>
      <HStack
        bg={'white'}
        p={4}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Text style={fonts.subtitle1}>Browse</Text>
        <HStack alignItems={'center'} space={5}>
          <NotificationButton onOpen={onOpen} />
        </HStack>
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
