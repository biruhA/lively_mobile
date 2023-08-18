import {View, Text} from 'react-native';
import React from 'react';
import {GoBack} from '../atoms';
import {Stack} from 'native-base';

interface Props {
  label: string;
  style?: any;
}

export function LabeledHeader({label, style}: Props) {
  return (
    <Stack p={4} bg={'white'} justifyContent={'space-between'} style={style}>
      <GoBack label={label} />
    </Stack>
  );
}
