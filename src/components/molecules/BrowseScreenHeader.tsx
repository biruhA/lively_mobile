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
} from 'native-base';
import {fonts} from '../../theme/fonts';
import heartBlack from '../../assets/icons/heart-bold.png';
import bell from '../../assets/icons/bell.png';
import searchBlack from '../../assets/icons/search-black.png';

export function BrowseScreenHeader() {
  const [service, setService] = useState('');

  return (
    <HStack
      bg={'white'}
      p={4}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <Text style={fonts.subtitle1}>Browse</Text>
      <HStack alignItems={'center'} space={5}>
        <Image source={searchBlack} alt="searchBlack" size={5} />
        <Image
          source={require('../../assets/icons/language.png')}
          alt="Alternate Text"
          size={5}
        />
        <Image source={bell} alt="searchBlack" size={5} />
        <Image source={heartBlack} alt="Alternate Text" size={5} />
      </HStack>
    </HStack>
  );
}
