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

export function BrowseScreen() {
  const {data, isLoading} = useUpcomingEventsQuery();
  const editorsPick = useEditorsPickQuery();

  return (
    <Stack bg={colors.pureWhite} pb={2}>
      <ScrollView>
        <Stack space={4}>
          <BrowseScreenHeader />
          <SimpleArticleList />
          <Stack px={4} pb={7} bg={'white'}>
            <CarouselBrowseBottom Data={editorsPick?.data?.data} />
          </Stack>
          {isLoading ? (
            <CarouselBrowseSkeleton />
          ) : (
            <Stack px={4} pt={2} pb={7} bg={'white'}>
              <CarouselBrowse Data={data?.data} />
            </Stack>
          )}
          <TrendingArticles />
          {/* <PopularArticles /> */}
          <LatestArticles />
        </Stack>
      </ScrollView>
    </Stack>
  );
}
