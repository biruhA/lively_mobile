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

const Data: Props[] = [
  {
    id: 1,
    header: 'Cultivating Spiritual Wellness in Everyday Life',
    group: 'Spiritual Wellness',
    readTime: '10 min',
  },
  {
    id: 2,
    header: 'Cultivating Spiritual Wellness in Everyday Life',
    group: 'Spiritual Wellness',
    readTime: '10 min',
  },
  {
    id: 3,
    header: 'Cultivating Spiritual Wellness in Everyday Life',
    group: 'Spiritual Wellness',
    readTime: '10 min',
  },
  {
    id: 4,
    header: 'Cultivating Spiritual Wellness in Everyday Life',
    group: 'Spiritual Wellness',
    readTime: '10 min',
  },
];

export function TopArticles() {
  const {data, isLoading} = useTrendingArticlesQuery();

  return (
    <Stack pt={4}>
      <SectionHeader
        label="Top Articles"
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
