import {View, FlatList} from 'react-native';
import React from 'react';
import {ProductCard, StoreCard} from '../molecules';
import {ListEmptyComponent} from '../atoms';
import {useAppSelector} from '../../store/hooks';

export function SearchStores() {
  const {storeSearch} = useAppSelector(state => state.search);

  return (
    <View>
      <FlatList
        style={{marginTop: 4}}
        numColumns={2}
        data={storeSearch}
        ListEmptyComponent={() => {
          return <ListEmptyComponent />;
        }}
        renderItem={({item}) => (
          <StoreCard
            id={item.id}
            imageUrl={item?.store?.store_logo?.url}
            item={item?.store?.name?.english}
            distance={item?.distance}
            rating={' -'}
            mainStyle={{width: '47%', marginBottom: 12}}
          />
        )}
        keyExtractor={(item: Props) => item.id}
      />
    </View>
  );
}
