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

const Data: Props[] = [
  {
    id: '1',
    item: 'Macadamia Straight wear',
    volume: '1000ml',
    amount: '200 Birr',
  },
  {
    id: '2',
    item: 'Macadamia Straight wear',
    volume: '1000ml',
    amount: '200 Birr',
  },
  {
    id: '3',
    item: 'Macadamia Straight wear',
    volume: '1000ml',
    amount: '200 Birr',
  },
  {
    id: '4',
    item: 'Macadamia Straight wear',
    volume: '1000ml',
    amount: '200 Birr',
  },
];

export function LatestArticles() {
  const {data, isLoading} = useLatestArticlesQuery();

  return (
    <Stack>
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
