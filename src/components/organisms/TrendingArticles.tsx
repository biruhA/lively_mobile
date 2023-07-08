import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {Stack} from 'native-base';
import {ProductCard, SectionHeader, VerticalArticleCard} from '../molecules';
import {ScreenNames} from '../../constants';
import {useTrendingArticlesQuery} from '../../store/services';
import {ProductSkeleton} from '../skeletons';

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
}

export function TrendingArticles() {
  const {data, isLoading} = useTrendingArticlesQuery();
  return (
    <Stack bg={'white'} p={4}>
      <SectionHeader
        label="Trending Articles"
        navTo={ScreenNames.SeeAllTrendingArticles}
      />
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <FlatList
          horizontal={true}
          data={data?.data}
          renderItem={({item}) => (
            <VerticalArticleCard
              id={item?.id}
              title={item?.title?.english}
              readTime={item?.reading_time_english}
              catagoure={item?.category?.name?.english}
              imageUrl={item?.cover_image?.url}
              navTo={ScreenNames.ArticleDetail}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      )}
    </Stack>
  );
}

const styles = StyleSheet.create({
  main: {
    shadowColor: 'rgba(25, 38, 32, 0.3)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
});
