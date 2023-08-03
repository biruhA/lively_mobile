import {Text} from 'react-native';
import React from 'react';
import {fonts} from '../../theme/fonts';
import {HStack, Image, useDisclose} from 'native-base';
import bell from '../../assets/icons/bell.png';
import heart from '../../assets/icons/heart-black.png';
import {colors} from '../../theme/colors';
import {NotificationButton} from '../atoms';
import {LoginSheet} from '../sheets';
import {ScreenNames} from '../../constants';

export function SettingsScreenHeader() {
  const {isOpen, onClose, onOpen} = useDisclose();

  return (
    <>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        py={4}
        px={4}
        style={{backgroundColor: '#ffffff'}}>
        <HStack alignItems={'center'} space={2}>
          <Text style={fonts.subtitle2}>Settings</Text>
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
