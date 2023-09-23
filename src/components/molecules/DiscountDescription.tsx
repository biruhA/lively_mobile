import {FlatList} from 'react-native';
import React, {useRef} from 'react';
import {Text, Stack, HStack} from 'native-base';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {RichEditor} from 'react-native-pell-rich-editor';
import {RichText} from './RichText';

interface Props {
  data: any;
}

export function DiscountDescription({data}) {
  function Item({label, value}: Props) {
    return (
      <HStack justifyContent={'space-between'}>
        <Text style={fonts.body1} pt={4}>
          {label}
        </Text>
        <Text
          style={{...fonts.subtitle2, color: 'black', fontWeight: '600'}}
          pt={4}>
          {value}
        </Text>
      </HStack>
    );
  }

  return (
    <Stack bg={'white'} px={4} py={4} space={2} mt={2}>
      <Text style={fonts.subtitle1}>Product Description</Text>
      <RichText text={data?.product?.description?.english} />
      {data?.additional_information && (
        <Stack>
          <Text style={fonts.subtitle1} pt={4}>
            Additional information
          </Text>
          <FlatList
            data={data?.additional_information}
            renderItem={({item}) => (
              <Item label={item.key} value={item.value} />
            )}
            keyExtractor={item => item.key}
          />
        </Stack>
      )}
    </Stack>
  );
}
