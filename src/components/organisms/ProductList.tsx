import {FlatList} from 'react-native';
import React from 'react';
import {Center, HStack, Skeleton, Stack, Text} from 'native-base';
import {ProductCard, SectionHeader} from '../molecules';
import {useProductListQuery} from '../../store/services';
import {ScreenNames} from '../../constants';
import {fonts} from '../../theme/fonts';
import {ListEmptyComponent} from '../atoms';
import {ProductSkeleton} from '../skeletons';

interface Props {
  label: string;
  url: string;
}

export function ProductList({label, url}: Props) {
  const {data, isLoading} = useProductListQuery(url);

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
          data={data?.data?.products}
          ListEmptyComponent={<ListEmptyComponent />}
          renderItem={({item}) => (
            <ProductCard
              id={item?.id}
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
