import {View} from 'react-native';
import React from 'react';
import {fonts} from '../../theme/fonts';
import {Text} from 'native-base';

interface Props {
  title: string;
  type: string;
}

export function ArticleHeading({title, type}: Props) {
  return (
    <View>
      {type === 'h1' && (
        <Text style={fonts.heading1} lineHeight={55}>
          {title}
        </Text>
      )}
      {type === 'h2' && (
        <Text pt={4} style={fonts.heading2} lineHeight={55}>
          {title}
        </Text>
      )}
      {type === 'h3' && (
        <Text pt={4} style={fonts.heading3} lineHeight={55}>
          {title}
        </Text>
      )}
      {type === 'h4' && (
        <Text pt={4} style={fonts.heading4} lineHeight={55}>
          {title}
        </Text>
      )}
      {type === 'h5' && (
        <Text pt={4} style={fonts.heading5} lineHeight={55}>
          {title}
        </Text>
      )}
      {type === 'h6' && (
        <Text pt={4} style={fonts.heading6} lineHeight={55}>
          {title}
        </Text>
      )}
    </View>
  );
}
