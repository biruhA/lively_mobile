import {View, Text} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {HStack} from 'native-base';
import {GoBack} from '../atoms';
import TouchableIcon from '../atoms/TouchableIcon';
import {colors} from '../../theme/colors';

interface Porps {
  iconL: any;
  iconR: any;
  onPressL: any;
  onPressR: any;
}

export function IconOnlyHeader({iconL, iconR, onPressL, onPressR}: Porps) {
  const route = useRoute();

  return (
    <HStack justifyContent={'space-between'} alignItems={'center'} pt={2}>
      <GoBack label={route?.params?.label || ''} />
      <HStack space={4} alignItems={'center'}>
        <TouchableIcon image={iconL} boxSize={5} onPress={onPressL} />
        <TouchableIcon image={iconR} onPress={onPressR} />
      </HStack>
    </HStack>
  );
}
