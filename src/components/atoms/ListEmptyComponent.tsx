import React from 'react';
import {Dimensions} from 'react-native';
import {Stack, Text} from 'native-base';
import {fonts} from '../../theme/fonts';

interface Props {
  message?: string;
}

export function ListEmptyComponent({message = 'No Products'}: Props) {
  let deviceWidth = Dimensions.get('window').width;
  return (
    <Stack pt={5} w={deviceWidth - 35} pb={6}>
      <Text textAlign={'center'} style={fonts.caption}>
        {message}
      </Text>
    </Stack>
  );
}
