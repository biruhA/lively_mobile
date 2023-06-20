import React from 'react';
import {ScrollView} from 'react-native';
import {Stack} from 'native-base';
import {colors} from '../theme/colors';
import {BrowseScreenHeader, SimpleArticleList} from '../components/molecules';
import {
  CarouselBrowse,
  CarouselBrowseBottom,
  LatestArticles,
  PopularArticles,
  TrendingArticles,
} from '../components/organisms';
import {useEditorsPickQuery, useUpcomingEventsQuery} from '../store/services';
import {CarouselBrowseSkeleton} from '../components/skeletons/CarouselBrowseSkeleton';

const Data = [
  {
    id: '1',
    label: 'Nutrition',
  },
  {
    id: '2',
    label: 'Nutrition',
  },
  {
    id: '3',
    label: 'Nutrition',
  },
  {
    id: '4',
    label: 'Nutrition',
  },
  {
    id: '5',
    label: 'Nutrition',
  },
  {
    id: '6',
    label: 'Nutrition',
  },
];

export function BrowseScreen() {
  const {data, isLoading} = useUpcomingEventsQuery();
  const editorsPick = useEditorsPickQuery();

  return (
    <Stack px={'16px'} bg={colors.pureWhite} h={'full'} pb={2} space={5}>
      <ScrollView>
        <BrowseScreenHeader />
        <SimpleArticleList Data={Data} />
        <TrendingArticles />
        {isLoading ? (
          <CarouselBrowseSkeleton />
        ) : (
          <CarouselBrowse Data={data?.data} />
        )}
        <PopularArticles />
        <CarouselBrowseBottom Data={editorsPick?.data?.data} />
        <LatestArticles />
      </ScrollView>
    </Stack>
  );
}
