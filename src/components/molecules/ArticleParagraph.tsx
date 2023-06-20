import {View, Text} from 'react-native';
import React from 'react';
import {fonts} from '../../theme/fonts';

interface Props {
  body: string;
}

export function ArticleParagraph({body}: Props) {
  return (
    <View>
      <Text style={fonts.body2}>{body}</Text>
    </View>
  );
}
