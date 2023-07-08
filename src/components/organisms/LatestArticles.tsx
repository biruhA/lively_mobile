import {FlatList} from 'react-native';
import React from 'react';
import {Stack} from 'native-base';
import {HorizontalArticleCard, ProductCard, SectionHeader} from '../molecules';
import {ScreenNames} from '../../constants';
import {useLatestArticlesQuery} from '../../store/services';
import {LongArticle} from '../skeletons';

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
}

export function LatestArticles() {
  const {data, isLoading} = useLatestArticlesQuery();

  return (
    <Stack p={4} bg={'white'}>
      <SectionHeader
        label="Latest Articles"
        navTo={ScreenNames.SeeAllProductsScreen}
      />
      {isLoading ? (
        <LongArticle />
      ) : (
        <FlatList
          data={data?.data}
          renderItem={({item}) => (
            <HorizontalArticleCard
              id={item.id}
              item={item?.title?.english}
              imageUrl={item?.cover_image?.url}
              readingTime={item?.reading_time_english}
              category={item?.category?.name?.english}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      )}
    </Stack>
  );
}
