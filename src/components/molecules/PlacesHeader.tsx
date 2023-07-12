import {Text} from 'react-native';
import React, {useState} from 'react';
import {Avatar, HStack, Image} from 'native-base';
import {fonts} from '../../theme/fonts';
import bell from '../../assets/icons/bell.png';
import language from '../../assets/icons/language.png';
import heart from '../../assets/icons/heart-bold.png';

export function PlacesHeader() {
  return (
    <HStack
      p={4}
      bg={'white'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <HStack alignItems={'center'} space={2}>
        <Text style={fonts.subtitle1}>Places</Text>
      </HStack>
      <HStack alignItems={'center'} space={5}>
        <Image source={language} alt="searchBlack" size="24px" />
        <Image source={bell} alt="searchBlack" size="20px" />
        <Image source={heart} alt="Alternate Text" size="20px" />
      </HStack>
    </HStack>
  );
}
