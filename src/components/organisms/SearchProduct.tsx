import {View, FlatList} from 'react-native';
import React from 'react';
import {ProductCard} from '../molecules';
import {ListEmptyComponent} from '../atoms';
import {useAppSelector} from '../../store/hooks';

export function SearchProduct() {
  const {productSearch} = useAppSelector(state => state.search);

  return (
    <View>
      <FlatList
        style={{marginTop: 4}}
        numColumns={2}
        data={productSearch}
        ListEmptyComponent={() => {
          return <ListEmptyComponent />;
        }}
        renderItem={({item}) => (
          <ProductCard
            id={item.id}
            imageUrl={item?.product_images?.[0]?.url}
            isWishlist={item?.is_wishlist}
            item={item.title?.english}
            volume={item.additional_information?.[0]?.value}
            amount={item.from}
            mainStyle={{width: '47%', marginBottom: 12}}
          />
        )}
        keyExtractor={(item: Props) => item.id}
      />
    </View>
  );
}
