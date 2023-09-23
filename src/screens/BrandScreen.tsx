import {FlatList, Platform} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {Center, Spinner, Stack} from 'native-base';
import {useFilterByBrandQuery} from '../store/services';
import {Colors} from '../theme/colors';
import {
  LabeledHeader,
  ListEmptyComponent,
  ProductCard,
  ProductSkeletonColumn,
} from '../components';

export function BrandScreen() {
  const route = useRoute();
  const {data, isLoading} = useFilterByBrandQuery(route?.params?.id);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack
      flex={1}
      space={2}
      bg={Colors.background.everlasting_ice}
      mb={Platform.OS === 'ios' ? 55 : 75}>
      <LabeledHeader label={data?.data?.name?.english} />
      <Stack
        bg={Colors.background.white}
        space={4}
        h={'full'}
        p={4}
        justifyContent={'center'}>
        {isLoading ? (
          <ProductSkeletonColumn />
        ) : (
          <FlatList
            numColumns={2}
            data={data?.data?.products?.data || []}
            ListEmptyComponent={() => <ListEmptyComponent />}
            renderItem={({item}) => (
              <ProductCard
                id={item?.id}
                imageUrl={item?.thumbnail?.url}
                item={item.title?.english}
                volume={item.variant_count}
                amount={item.from}
                mainStyle={{width: '50%', marginBottom: 12}}
                onEndReached={() => {
                  if (result?.data?.data?.products?.next_page_url) {
                    setPage(page + 1);
                  }
                }}
                onEndReachedThreshold={0.5}
              />
            )}
            keyExtractor={(item: Props) => item.id}
          />
        )}
      </Stack>
    </Stack>
  );
}
