import {View, Text} from 'react-native';
import React from 'react';
import {Image, Stack} from 'native-base';
import {fonts} from '../../theme/fonts';

interface Props {
  url: string;
  caption: string;
}

export function ArticleUploadImage({url, caption}: Props) {
  return (
    <Stack space={2}>
      <Image
        source={{
          uri: url,
        }}
        alt="article"
        w={'100%'}
        h={220}
        borderRadius={8}
        resizeMode="contain"
      />
      <Text style={fonts.caption}>{caption}</Text>
    </Stack>
  );
}
