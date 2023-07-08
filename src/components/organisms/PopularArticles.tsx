import {FlatList} from 'react-native';
import React from 'react';
import {Stack} from 'native-base';
import {SectionHeader, VerticalArticleCard} from '../molecules';
import {ScreenNames} from '../../constants';
import {usePopularArticlesQuery} from '../../store/services';
import {ProductSkeleton} from '../skeletons';

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
}

export function PopularArticles() {
  const {data, isLoading} = usePopularArticlesQuery();
  return (
    <Stack p={4} bg={'white'}>
      <SectionHeader
        label="Popular Articles"
        navTo={ScreenNames.SeeAllPopularArticles}
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
