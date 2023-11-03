import {View, Text} from 'react-native';
import React from 'react';
import {GoBack} from '../atoms';
import {HStack, Stack} from 'native-base';
import {DeepLinkPath} from '../../hooks';
import ShareButton from '../atoms/ShareButton';

interface Props {
  label: string;
  style?: any;
  hasShare?: boolean;
  path?: DeepLinkPath;
  id?: string;
}

export function LabeledHeader({
  label,
  style,
  hasShare = false,
  path,
  id,
}: Props) {
  return (
    <HStack p={4} bg={'white'} justifyContent={'space-between'} style={style}>
      <GoBack label={label} />
      {hasShare && <ShareButton path={path} id={id} />}
    </HStack>
  );
}
