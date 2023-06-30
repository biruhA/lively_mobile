import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {ArticleCard, SectionHeader, VerticalArticleCard} from '../molecules';
import {Stack} from 'native-base';
import {useTrendingArticlesQuery} from '../../store/services';
import {ProductSkeleton} from '../skeletons';
import {ScreenNames} from '../../constants';

interface Props {
  id: string;
  header: string;
  group: string;
  readTime: string;
}

export function TopArticles() {
  const {data, isLoading} = useTrendingArticlesQuery();

  return (
    <Stack p={4} bg={'white'} space={2}>
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
