import React, {useState} from 'react';
import {Box, HStack, Image, Stack, Text} from 'native-base';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';
import {useAppSelector} from '../../store/hooks';
import {VaiantList} from './VaiantList';
import {ColorList} from './ColorList';

export function BrandSection() {
  const {selectedProduct} = useAppSelector(state => state.product);
  const [color, setColor] = useState();

  return (
    <Stack p={4} my={2} space={1}>
      <Text style={fonts.subtitle1}>{selectedProduct?.title?.english}</Text>
      <HStack py={2} justifyContent={'flex-start'} space={1}>
        {selectedProduct?.variant_type !== 'Color' ? (
          <>
            <Text style={fonts.body1}>Selected Size:</Text>
            <Text style={{...fonts.subtitle2, color: colors.pureBlack}}>
              {selectedProduct?.variants?.[0]?.value?.english}
            </Text>
          </>
        ) : (
          <Text style={{...fonts.subtitle2, color: colors.pureBlack}}>
            {color?.color?.name?.english}
          </Text>
        )}
      </HStack>
      {selectedProduct?.variant_type === 'Value' ? (
        <VaiantList Data={selectedProduct?.variants} variant="flat" />
      ) : (
        <ColorList Data={selectedProduct?.variants} setColor={setColor} />
      )}
      <HStack py={2} justifyContent={'flex-start'} space={1}>
        <Text style={fonts.body1}>Brand:</Text>
        <Text style={[fonts.subtitle1, {textDecorationLine: 'underline'}]}>
          {selectedProduct?.brand?.name?.english}
        </Text>
      </HStack>
    </Stack>
  );
}
