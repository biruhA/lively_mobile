import {View, Text, ScrollView, FlatList} from 'react-native';
import {useIsFocused, useRoute, useNavigation} from '@react-navigation/native';
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
import {LabeledHeader} from '../components';
import EnableLocation from '../components/atoms/EnableLocation';

export function DiscountDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {isOpen, onOpen, onClose} = useDisclose();
  const {userLocation} = useAppSelector(state => state.search);
  const {isLoggedIn, inAppLoggedIn} = useAppSelector(state => state.auth);
  const {data, isLoading} = useProductVariantDetailQuery({
    id: route?.params?.id,
    latitude: userLocation?.lat,
    longitude: userLocation?.lon,
  });

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack flex={1} bg={colors.pureWhite} pb={2}>
      <LabeledHeader label="" />
      <EnableLocation />
      <FlatList
        data={[{}]}
        renderItem={({item}) => {
          return (
            <>
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
                rating={data?.data?.store?.rating?.average}
              />
              <DiscountDescription data={data?.data?.product_variant} />
            </>
          );
        }}
      />
      <GradientButton
        mainStyle={{postion: 'absolute', bottom: 0, width: '95%'}}
        text="Claim Discount"
        onPress={() => {
          if (isLoggedIn || (!isLoggedIn && inAppLoggedIn)) {
            navigation.navigate(ScreenNames.ClaimDiscount, {
              promo_code: route?.params?.promo_code,
              id: route?.params?.id,
            });
          } else {
            onOpen();
          }
          if (!isLoggedIn) {
            if (inAppLoggedIn) {
              navigation.navigate(ScreenNames.ClaimDiscount, {
                promo_code: route?.params?.promo_code,
                id: route?.params?.id,
              });
            }
            if (!inAppLoggedIn) {
              onOpen();
            }
          }
        }}
      />
      <LoginSheet
        isOpen={isOpen}
        onClose={onClose}
        action={ScreenNames.ClaimDiscount}
        payload={{promo_code: route?.params?.promo_code}}
      />
    </Stack>
  );
}
