import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {HStack, Image, Stack, Text} from 'native-base';
import {fonts} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {GradientButton, GradientButtonSmall} from '../atoms';
import smile from '../../assets/icons/smile_yellow.png';
import location from '../../assets/icons/location_regular.png';
import {DiscountDescription, ProductDescription} from '../molecules';
import {
  useDiscountBannerDetailQuery,
  useProductVariantDetailQuery,
} from '../../store/services';
import {useAppSelector} from '../../store/hooks';

export function DiscountDetail({
  data,
  price,
  discount,
  current_price,
  brand,
  left,
}) {
  return (
    <Stack space={2}>
      <Text fontSize={16} fontWeight={700} mt={4}>
        {data?.product?.title?.english}
      </Text>
      <Stack
        space={8}
        borderWidth={2}
        borderColor={'#f5f5f5'}
        p={3}
        borderRadius={8}>
        <Detial
          price={price}
          discount={discount}
          current_price={current_price}
          left={left && typeof left === 'string' ? left?.toString() : ' '}
        />
        <Stack space={1}>
          <Text fontWeight={'semibold'} fontSize={16}>
            Selected Size: {data?.value?.english}
          </Text>
          <GradientButtonSmall
            mainStyle={{alignSelf: 'flex-start', marginHorizontal: 0}}
            variant="flat"
            text={data?.value?.english}
            onPress={() => {}}
          />
        </Stack>
        <Stack space={1}>
          <Text fontSize={16}>Brand: </Text>
          <Text underline fontWeight={'semibold'} fontSize={16}>
            {brand}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
}

function Detial({price, discount, current_price, left}) {
  return (
    <HStack justifyContent={'space-between'}>
      <Stack>
        <HStack space={3}>
          <Text style={[fonts.subtitle2, {color: colors.lightgreyText}]}>
            {price} Birr
          </Text>
          <Text style={[fonts.subtitle2, {color: '#FF0000'}]}>
            {discount}% Off
          </Text>
        </HStack>
        <Text pt={3} style={[fonts.heading6, {color: '#00BA63'}]}>
          {current_price} Birr
        </Text>
      </Stack>
      <Text pt={3} style={{color: '#FFB800'}}>
        {left && typeof left === 'string' ? left?.toString() : ' '} Days left
      </Text>
    </HStack>
  );
}
