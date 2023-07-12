import {Text} from 'react-native';
import React from 'react';
import {fonts} from '../../theme/fonts';
import {HStack, Image} from 'native-base';
import bell from '../../assets/icons/bell.png';
import heart from '../../assets/icons/heart-black.png';
import {colors} from '../../theme/colors';

export function SettingsScreenHeader() {
  return (
    <HStack
      alignItems={'center'}
      justifyContent={'space-between'}
      py={4}
      style={{backgroundColor: colors.pureWhite}}>
      <HStack alignItems={'center'} space={2}>
        <Text style={fonts.subtitle2}>Settings</Text>
      </HStack>
      <HStack alignItems={'center'} space={5}>
        <Image source={bell} alt="Alternate Text" size="20px" />
        <Image source={heart} alt="Alternate Text" size="20px" />
      </HStack>
    </HStack>
  );
}
