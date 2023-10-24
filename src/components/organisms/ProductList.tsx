import {FlatList, RefreshControl} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Center, HStack, Skeleton, Stack, Text} from 'native-base';
import {ProductCard, SectionHeader} from '../molecules';
import {useProductListQuery} from '../../store/services';
import {ScreenNames} from '../../constants';
import {fonts} from '../../theme/fonts';
import {ListEmptyComponent} from '../atoms';
import {ProductSkeleton} from '../skeletons';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

interface Props {
  label: string;
  url: string;
  refreshing: boolean;
}

export function ProductList({label, url, refreshing}: Props) {
  const {token} = useSelector(state => state.auth);
  const {data, isLoading, refetch} = useProductListQuery({
    url,
    token: token ? `Bearer ${token}` : null,
  });

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  return (
    <Stack bg={'white'} px={4} py={3} space={2}>
      <SectionHeader
        id={data?.data?.id}
        label={label}
        navTo={ScreenNames.SeeAllProductsScreen}
      />
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <FlatList
          horizontal={true}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          showsHorizontalScrollIndicator={false}
          data={data?.data?.products}
          ListEmptyComponent={<ListEmptyComponent />}
          renderItem={({item}) => (
            <ProductCard
              id={item?.id}
              isWishlist={item?.is_wishlist}
              imageUrl={item?.thumbnail?.url}
              item={item?.title?.english}
              volume={item?.variant_count}
              amount={item?.from}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </Stack>
  );
}
