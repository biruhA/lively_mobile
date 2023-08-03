import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Box, Center, CheckIcon, HStack, Image, Select} from 'native-base';
import {GoBack} from '../atoms';
import TouchableIcon from '../atoms/TouchableIcon';
import location from '../../assets/icons/location.png';

export function StoreHeader() {
  const [service, setService] = useState('');

  return (
    <HStack justifyContent={'space-between'} alignItems={'center'} py={3}>
      <GoBack label="Stores" />
    </HStack>
  );
}
