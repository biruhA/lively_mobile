import React from 'react';
import {FlatList} from 'react-native';
import {GoBack, ListEmptyComponent} from '../components/atoms';
import {useRoute} from '@react-navigation/native';
import {Stack, Text, useDisclose} from 'native-base';
import {colors} from '../theme/colors';
import {
  CatalogList,
  DealsCard,
  IconOnlyHeader,
  ProductCard,
} from '../components/molecules';
import TouchableIcon from '../components/atoms/TouchableIcon';
import {useAppSelector} from '../store/hooks';
import {
  useAllDealsQuery,
  useProductsByCategoryQuery,
  useSubCategoriesByCategoryQuery,
} from '../store/services';
import {ProductSkeletonColumn} from '../components/skeletons';
import search from '../assets/icons/search-black.png';
import filter from '../assets/icons/filter.png';
import {FilterSheet} from '../components/organisms';

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
}

export function SeeAllDealsScreen() {
  const {data, isLoading} = useAllDealsQuery();

  return (
    <Stack
      space={4}
      flex={1}
      bg={colors.pureWhite}
      px={'16px'}
      py={2}
      justifyContent={'center'}>
      <IconOnlyHeader
        iconL={search}
        iconR={filter}
        onPressL={() => {
          console.log('cat');
        }}
        onPressR={() => {}}
      />
      {isLoading ? (
        <ProductSkeletonColumn />
      ) : (
        <FlatList
          style={{marginTop: 4}}
          numColumns={2}
          data={data?.data}
          ListEmptyComponent={() => {
            return <ListEmptyComponent />;
          }}
          renderItem={({item}) => (
            <DealsCard
              item={item?.product_name?.english}
              volume={item.volume}
              price={item.current_price}
              discount={item.discount}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      )}
    </Stack>
  );
}
