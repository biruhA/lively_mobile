import React from 'react';
import {HStack, Image, Spinner, Stack, Text, useDisclose} from 'native-base';
import placeBackground from '../../assets/images/place-background.png';
import {fonts} from '../../theme/fonts';
import {ApiImage, GradientButtonSmall} from '../atoms';
import {useAppSelector} from '../../store/hooks';
import {colors} from '../../theme/colors';
import {
  useNaStoreDetailQuery,
  useStoreDetailByIdQuery,
} from '../../store/services';

export function StoreSheetBody1({onPress}: any) {
  const {userLocation} = useAppSelector(state => state.search);
  const {selectedStoreId} = useAppSelector(state => state.store);
  const {data, error, isLoading} = useNaStoreDetailQuery({
    id: selectedStoreId,
    latitude: userLocation?.lat,
    longitude: userLocation?.lon,
  });

  if (isLoading) {
    return <Spinner py={24} size="large" color="red" />;
  }

  return (
    <Stack w={'100%'} p={2} space={2}>
      <Stack>
        <Text style={fonts.body1}>You can find the product in this store</Text>
      </Stack>
      <ApiImage
        imageUrl={data?.data?.store_branch?.cover_image?.url}
        style={{width: '100%', height: 120, borderRadius: 5}}
        resizeMode="cover"
      />
      <HStack alignItems={'flex-start'}>
        <ApiImage
          imageUrl={data?.data?.store_logo?.url}
          style={{
            position: 'absolute',
            top: -25,
            left: 20,
            backgroundColor: 'white',
            zIndex: 2,
            width: 65,
            height: 60,
            borderRadius: 8,
          }}
        />
        <Stack ml={100}>
          <Text style={fonts.subtitle1} numberOfLines={2}>
            {data?.data?.store_branch?.store?.name?.english}
          </Text>
          <Text>{data?.data?.store_branch?.address?.cityOrTown}</Text>
        </Stack>
      </HStack>
      <SelectedProductCard />
      <GradientButtonSmall
        mainStyle={{borderRadius: 8, width: '100%', marginTop: 10}}
        containerStyle={{paddingVertical: 13}}
        text="Login to view"
        onPress={onPress}
      />
    </Stack>
  );
}

function SelectedProductCard() {
  const {selectedProduct, selectedProductVariantIndex} = useAppSelector(
    state => state.product,
  );

  return (
    <HStack space={3} pt={6} pb={3}>
      <ApiImage
        imageUrl={selectedProduct?.thumbnail?.url}
        style={{width: 94, height: 54}}
      />
      <Stack w={'70%'} space={1}>
        <Text style={fonts.subtitle1}>{selectedProduct?.title?.english}</Text>
        <Text style={[fonts.body2, {color: colors.primary}]}>
          Selected Size:{' '}
          {
            selectedProduct?.variants?.[selectedProductVariantIndex]?.value
              ?.english
          }
        </Text>
      </Stack>
    </HStack>
  );
}
