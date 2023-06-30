import {FlatList, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {Image, Text, Stack, Spinner} from 'native-base';
import {colors} from '../theme/colors';
import {GoBack, ListEmptyComponent} from '../components/atoms';
import {DiscountCard, ProductCard} from '../components/molecules';
import {ScreenNames} from '../constants';
import {useDiscountBannerDetailQuery} from '../store/services';
import {useRoute} from '@react-navigation/native';

const Data = [
  {
    id: '1',
    label: 'Pharmacies',
    icon: null,
  },
  {
    id: '2',
    label: 'Sores',
    icon: null,
  },
  {
    id: '3',
    label: 'Clinics',
    icon: null,
  },
  {
    id: '4',
    label: 'MakeUp',
    icon: null,
  },
];

export function DiscountScreen() {
  const route = useRoute();
  const {data, isLoading} = useDiscountBannerDetailQuery(route?.params?.id);

  return (
    <Stack flex={1} bg={colors.pureWhite}>
      <Stack py={3} px={4}>
        <GoBack label="Deals" />
      </Stack>
      <Image
        source={{
          uri: data?.data?.banner_image?.url,
        }}
        alt="headings"
        w={'100%'}
        h={175}
        resizeMode="cover"
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          style={{marginTop: 4}}
          numColumns={2}
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
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      )}
    </Stack>
  );
}
