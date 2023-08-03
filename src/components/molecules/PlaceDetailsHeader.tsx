import {Text} from 'react-native';
import React from 'react';
import {HStack, Image} from 'native-base';
import {fonts} from '../../theme/fonts';
import heart from '../../assets/icons/heart-bold.png';
import share from '../../assets/icons/share.png';
import {GoBack} from '../atoms';
import {ScreenNames} from '../../constants';

export function PlaceDetailsHeader() {
  return (
    <HStack alignItems={'center'} justifyContent={'space-between'}>
      <HStack alignItems={'center'} space={2}>
        <GoBack label="Place Details" />
      </HStack>
      {/* <HStack alignItems={'center'} space={5}>
        <Image source={heart} alt="searchBlack" size="20px" />
        <Image source={share} alt="Alternate Text" size="24px" />
      </HStack> */}
    </HStack>
  );
}
