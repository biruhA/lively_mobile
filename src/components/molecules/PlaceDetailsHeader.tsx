import {Text} from 'react-native';
import React from 'react';
import {HStack, Image} from 'native-base';
import {fonts} from '../../theme/fonts';
import heart from '../../assets/icons/heart-bold.png';
import share from '../../assets/icons/share.png';
import {GoBack, HeartIcon} from '../atoms';
import {ScreenNames} from '../../constants';

export function PlaceDetailsHeader({id, isWishlist}) {
  return (
    <HStack alignItems={'center'} justifyContent={'space-between'}>
      <HStack alignItems={'center'} space={2}>
        <GoBack label="Place Details" />
      </HStack>
      <HeartIcon id={id} init={isWishlist} isStore={true} />
    </HStack>
  );
}
