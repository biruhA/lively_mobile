import {FlatList, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {Image, Text, Stack, Spinner} from 'native-base';
import {colors} from '../theme/colors';
import {GoBack, ListEmptyComponent} from '../components/atoms';
import {DiscountCard, ProductCard} from '../components/molecules';
import {ScreenNames} from '../constants';
import {useDiscountBannerDetailQuery} from '../store/services';
import {useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {ApiImage, LabeledHeader} from '../components';

export function DiscountScreen() {
  const route = useRoute();
  const {data, isLoading} = useDiscountBannerDetailQuery(route?.params?.id);

  return (
    <Stack flex={1} bg={'colors.pureWhite'}>
      <LabeledHeader label="Deals" />
      <Stack pb={2} bg={'white'}>
        <ApiImage
          imageUrl={data?.data?.banner_image?.url}
          style={{width: '100%', height: 175}}
          resizeMode="contain"
        />
      </Stack>
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          style={{paddingTop: 16}}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: 8,
            paddingLeft: 10,
            paddingRight: 5,
          }}
          data={data?.data?.store_products}
          ListEmptyComponent={() => {
            return <ListEmptyComponent />;
          }}
          renderItem={({item}) => (
            <DiscountCard
              id={item?.id}
              title={item?.product_variant?.product?.title?.english}
              imageUrl={item?.product_variant?.product_image?.url}
              value={item?.product_variant?.value?.english}
              disount={''}
              price={item?.price}
              mainStyle={{width: '47%', marginBottom: 12}}
              promo_code={data?.data?.promo_code}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      )}
    </Stack>
  );
}
