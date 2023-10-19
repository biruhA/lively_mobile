import {FlatList} from 'react-native';
import React from 'react';
import {ScrollView, Stack} from 'native-base';
import {
  ProductCard,
  SearchArticleCard,
  SectionHeader,
  StoreCard,
} from '../molecules';
import {ScreenNames} from '../../constants';
import {useAppSelector} from '../../store/hooks';
import {ListEmptyComponent} from '../atoms';

export function SearchAll() {
  const {allSearch} = useAppSelector(state => state.search);
  return (
    <ScrollView>
      <Stack space={2} pb={40}>
        <SectionHeader
          label="Products"
          navTo={ScreenNames.SeeAllProductsScreen}
        />
        <FlatList
          horizontal={true}
          data={allSearch?.products}
          ListEmptyComponent={() => <ListEmptyComponent />}
          renderItem={({item}) => (
            <ProductCard
              id={item.id}
              isWishlist={item?.is_wishlist}
              imageUrl={item?.product_images?.[0]?.url}
              item={item.title?.english}
              volume={item.additional_information?.[0]?.value}
              amount={item.from}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
        <SectionHeader
          label="Stores"
          navTo={ScreenNames.SeeAllProductsScreen}
        />
        <FlatList
          horizontal={true}
          data={allSearch?.stores}
          ListEmptyComponent={() => <ListEmptyComponent message="No Stores" />}
          renderItem={({item}) => (
            <StoreCard
              id={item.id}
              imageUrl={item?.store?.store_logo?.url}
              item={item?.store?.name?.english}
              distance={item?.distance}
              rating={' -'}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
        <SectionHeader
          label="Articles"
          navTo={ScreenNames.SeeAllProductsScreen}
        />
        <FlatList
          horizontal={true}
          data={allSearch?.articles}
          ListEmptyComponent={() => (
            <ListEmptyComponent message="No Articles" />
          )}
          renderItem={({item}) => (
            <SearchArticleCard
              item={item.item}
              volume={item.volume}
              amount={item.amount}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      </Stack>
    </ScrollView>
  );
}
