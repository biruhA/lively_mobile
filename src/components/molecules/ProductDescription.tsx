import {FlatList} from 'react-native';
import React, {useRef} from 'react';
import {Text, Stack, HStack} from 'native-base';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';
import {useAppSelector} from '../../store/hooks';
import {RichText} from './RichText';

interface Props {
  id?: string;
  label: string;
  value: string;
}

export function ProductDescription({Data}: any) {
  const {selectedProductVariantIndex} = useAppSelector(state => state.product);

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
    <Stack bg={'white'} p={4} space={2} mt={2}>
      <Text style={fonts.subtitle1}>Product Description</Text>
      <RichText
        text={
          Data?.variants[selectedProductVariantIndex]?.product?.description
            ?.english
        }
      />
      {Data?.variants[selectedProductVariantIndex]?.additional_information && (
        <Stack>
          <Text style={fonts.subtitle1} pt={4}>
            Additional information
          </Text>
          <FlatList
            data={
              Data?.variants[selectedProductVariantIndex]
                ?.additional_information
            }
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
