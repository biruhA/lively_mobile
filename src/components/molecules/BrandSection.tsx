import React, {useCallback, useState} from 'react';
import {Box, HStack, Image, Stack, Text} from 'native-base';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {VaiantList} from './VaiantList';
import {ColorList} from './ColorList';
import {useFocusEffect} from '@react-navigation/native';
import {setSelectedProductVariantIndex} from '../../store/features/productSlice';

export function BrandSection({Data}: any) {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState();

  useFocusEffect(
    useCallback(() => {
      dispatch(setSelectedProductVariantIndex(0));
    }, []),
  );

  return (
    <Stack p={4} my={2} space={1} bg={'white'}>
      <Text style={fonts.subtitle1}>{Data?.title?.english}</Text>
      <HStack py={2} justifyContent={'flex-start'} space={1}>
        {Data?.variant_type !== 'Color' ? (
          <>
            <Text style={fonts.body1}>Selected Size:</Text>
            <Text style={{...fonts.subtitle2, color: colors.pureBlack}}>
              {Data?.variants?.[0]?.value?.english}
            </Text>
          </>
        ) : (
          <Text style={{...fonts.subtitle2, color: colors.pureBlack}}>
            {color?.color?.name?.english}
          </Text>
        )}
      </HStack>
      {Data?.variant_type === 'Value' ? (
        <VaiantList Data={Data?.variants} variant="flat" />
      ) : (
        <ColorList Data={Data?.variants} setColor={setColor} />
      )}
      <HStack py={2} justifyContent={'flex-start'} space={1}>
        <Text style={fonts.body1}>Brand:</Text>
        <Text style={[fonts.subtitle1, {textDecorationLine: 'underline'}]}>
          {Data?.brand?.name?.english}
        </Text>
      </HStack>
    </Stack>
  );
}
