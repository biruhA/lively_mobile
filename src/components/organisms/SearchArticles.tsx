import {View, FlatList} from 'react-native';
import React from 'react';
import {ProductCard, SearchArticleCard} from '../molecules';
import {ListEmptyComponent} from '../atoms';
import {useAppSelector} from '../../store/hooks';

export function SearchArticles() {
  const {articleSearch} = useAppSelector(state => state.search);
  return (
    <View>
      <FlatList
        style={{marginTop: 4}}
        numColumns={2}
        data={articleSearch}
        ListEmptyComponent={() => {
          return <ListEmptyComponent message="No Articles" />;
        }}
        renderItem={({item}) => (
          <SearchArticleCard
            item={item.item}
            volume={item.volume}
            amount={item.amount}
          />
        )}
        keyExtractor={(item: Props) => item.id}
      />
    </View>
  );
}
