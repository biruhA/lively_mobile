import {View, Text, ScrollView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, Center, Spinner, Stack, useDisclose} from 'native-base';
import {DiscountDescription, IconOnlyHeader} from '../components/molecules';
import share from '../assets/icons/share.png';
import heart from '../assets/icons/heart.png';
import {
  DiscountDetail,
  DiscountStoreCard,
  ProductCarousel,
} from '../components/organisms';
import {colors} from '../theme/colors';
import {GradientButton} from '../components/atoms';
import {LoginSheetState, ScreenNames} from '../constants';
import {useAppSelector} from '../store/hooks';
import {useProductVariantDetailQuery} from '../store/services';
import {LoginSheet} from '../components/sheets';

export function DiscountDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {userLocation} = useAppSelector(state => state.search);
  const {data, isLoading} = useProductVariantDetailQuery({
    id: route?.params?.id,
    latitude: userLocation?.lat,
    longitude: userLocation?.lon,
  });
  const {isOpen, onOpen, onClose} = useDisclose();
  const {token} = useAppSelector(state => state.auth);
  const [state, setState] = useState(
    token ? LoginSheetState.LoggedIn : LoginSheetState.notLoggedIn,
  );

  useEffect(() => {
    if (state === LoginSheetState.LoggedIn) {
      onClose();
      navigation.navigate(ScreenNames.ClaimDiscount);
    }
  }, [state]);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack flex={1} bg={colors.pureWhite} pt={4} pb={2} px={2}>
      <Stack px={5}>
        <IconOnlyHeader
          iconL={heart}
          iconR={share}
          onPressL={() => {}}
          onPressR={() => {}}
        />
      </Stack>
      <ScrollView style={{paddingHorizontal: 8}}>
        <ProductCarousel
          images={[
            {
              url: data?.data?.product_variant?.product_image?.url,
            },
          ]}
        />
        <DiscountDetail
          data={data?.data?.product_variant}
          price={data?.data?.price}
          discount={data?.data?.discount}
          current_price={data?.data?.current_price}
          brand={data?.data?.brand?.name?.english}
          left={data?.data?.left.toString()}
        />
        <DiscountStoreCard
          imageUrl={data?.data?.store?.store_logo?.url}
          name={`${data?.data?.store?.store_name?.english} ${data?.data?.store?.store_branch_name?.english}`}
          distance={data?.data?.store?.distance}
          rating={data?.data?.store?.rating}
        />
        <DiscountDescription data={data?.data?.product_variant} />
      </ScrollView>

      <GradientButton
        mainStyle={{postion: 'absolute', bottom: 0}}
        text="Claim Discount"
        onPress={() => {
          onOpen();
        }}
      />
      <LoginSheet isOpen={isOpen} onClose={onClose} setState={setState} />
    </Stack>
  );
}
