import {View, Text} from 'react-native';
import React from 'react';
import {Stack} from 'native-base';
import {fonts} from '../../theme/fonts';

interface Props {
  data: any;
  type: string;
}

export function ArticleList({data, type}: Props) {
  return (
    <Stack ml={5} space={2}>
      <Text>{type}</Text>
      {data?.map((list, index) => {
        return (
          <Text key={index} style={fonts.body1}>
            {index + 1}. {list?.english}
          </Text>
        );
      })}
    </Stack>
  );
}
