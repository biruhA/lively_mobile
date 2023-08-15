import {View, Text} from 'react-native';
import React from 'react';
import {GoBack} from '../atoms';
import {Stack} from 'native-base';

interface Props {
  label: string;
}

export function LabeledHeader({label}: Props) {
  return (
    <Stack p={4} bg={'white'} justifyContent={'space-between'}>
      <GoBack label={label} />
    </Stack>
  );
}
