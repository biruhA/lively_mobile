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
import heartBlack from '../../assets/icons/heart-black.png';
import bell from '../../assets/icons/bell.png';
import searchBlack from '../../assets/icons/search-black.png';

export function BrowseScreenHeader() {
  const [service, setService] = useState('');

  return (
    <HStack alignItems={'center'} justifyContent={'space-between'} py={4}>
      <HStack alignItems={'center'} space={2}>
        <Avatar
          size={'32px'}
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}>
          AJ
        </Avatar>
        <Text style={fonts.subtitle1}>Places</Text>
      </HStack>
      <HStack alignItems={'center'} space={5}>
        <Image source={searchBlack} alt="searchBlack" size="20px" />
        <Image source={bell} alt="searchBlack" size="20px" />
        <Image source={heartBlack} alt="Alternate Text" size="24px" />
      </HStack>
    </HStack>
  );
}
