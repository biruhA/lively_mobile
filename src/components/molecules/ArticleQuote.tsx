import {View} from 'react-native';
import React from 'react';
import {Stack, Text} from 'native-base';
import {fonts} from '../../theme/fonts';
import {colors} from '../../theme/colors';

interface Props {
  quote: string;
  author: string;
}

export function ArticleQuote({quote, author}: Props) {
  return (
    <Stack
      bg={colors.unselected}
      borderRadius={8}
      px={2}
      py={3}
      alignItems={'center'}
      space={2}>
      <Text
        color={colors.greyText}
        fontWeight={'700'}
        textAlign={'center'}
        fontSize={32}
        fontStyle="italic">
        "{quote}"
      </Text>
      <Text style={fonts.caption}>{author}</Text>
    </Stack>
  );
}
