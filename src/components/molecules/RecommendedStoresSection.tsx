import {FlatList, ScrollView, Text} from 'react-native';
import React from 'react';
import {Spinner, Stack} from 'native-base';
import {fonts} from '../../theme/fonts';
import {DealsCard} from './DealsCard';
import {StoresCard} from './StoresCard';
import {useAppSelector} from '../../store/hooks';
import {useRecommendedStoresQuery} from '../../store/services';

interface Props {
  id: string;
  store: string;
  distance: string;
  rating: string;
}

const Data: Props[] = [
  {
    id: '1',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '2',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '3',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '4',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '1e',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '2e',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '3e',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '4e',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
];

export function RecommendedStoresSection() {
  const {selectedProduct, selectedProductVariantIndex} = useAppSelector(
    state => state.product,
  );
  const {userLocation} = useAppSelector(state => state.search);
  const {data, isLoading} = useRecommendedStoresQuery({
    id: selectedProduct?.variants[selectedProductVariantIndex]?.id,
    latitude: userLocation?.lat,
    longitude: userLocation?.lon,
  });

  return (
    <Stack bg={'#EEF6F6'} px={4} py={4}>
      <Text style={fonts.subtitle1}>Recommended Stores</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}>
        {isLoading ? (
          <Spinner />
        ) : (
          <FlatList
            contentContainerStyle={{alignSelf: 'flex-start'}}
            numColumns={Math.ceil(data?.data?.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data?.data}
            renderItem={({item}) => (
              <StoresCard
                store={item?.store_name?.english}
                distance={item?.distance}
                rating={item?.rating}
                price={item?.price}
                imageUrl={item?.store_logo?.url}
              />
            )}
            keyExtractor={(item: Props) => item.id}
          />
        )}
      </ScrollView>
    </Stack>
  );
}
