import {FlatList, Text} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Center, Spinner, Stack} from 'native-base';
import {fonts} from '../../theme/fonts';
import {DealsCard} from './DealsCard';
import {StoresCard} from './StoresCard';
import {useAppSelector} from '../../store/hooks';
import {ProductDescription} from './ProductDescription';
import {StoresCardLarge} from './StoresCardLarge';
import {useRecommendedProductStoresMutation} from '../../store/services';
import {useFocusEffect} from '@react-navigation/native';
import EnableLocation from '../atoms/EnableLocation';

export function RecommendedStoresSection({Data}: any) {
  const {selectedProductVariantIndex} = useAppSelector(state => state.product);
  const {userLocation} = useAppSelector(state => state.search);
  const [recommendedStores, result] = useRecommendedProductStoresMutation();

  useFocusEffect(
    useCallback(() => {
      recommendedStores({
        id: Data?.variants[selectedProductVariantIndex]?.id,
        latitude: userLocation?.lat,
        longitude: userLocation?.lon,
      });
    }, [selectedProductVariantIndex]),
  );

  if (result?.isLoading) {
    return (
      <Center w={'100%'} h={100}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack px={4} pt={4}>
      <FlatList
        data={result?.data?.data}
        ListHeaderComponent={() => (
          <Text style={fonts.subtitle1}>Recommended Stores</Text>
        )}
        renderItem={({item}) => (
          <StoresCardLarge
            id={item?.id}
            store={item?.store_name?.english}
            distance={item?.distance}
            rating={item?.rating?.average}
            imageUrl={item?.store_logo?.url}
            price={item?.price}
            discountAmount={null}
            discountPresent={null}
          />
        )}
        keyExtractor={(item: Props) => item.id}
      />
      <EnableLocation />
    </Stack>
  );
}
