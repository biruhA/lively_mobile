import {Text} from 'react-native';
import React from 'react';
import {Avatar, HStack, Image} from 'native-base';
import {fonts} from '../../theme/fonts';
import bell from '../../assets/icons/bell.png';
import cart from '../../assets/icons/cart.png';

export function HomeScreenHeader() {
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
        <Text style={fonts.subtitle1}>Welcome!</Text>
      </HStack>
      <HStack alignItems={'center'} space={5}>
        <Image source={bell} alt="Alternate Text" size="20px" />
        <Image source={cart} alt="Alternate Text" size="20px" />
      </HStack>
    </HStack>
  );
}
