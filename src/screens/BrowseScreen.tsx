import React from 'react';
import {Platform, ScrollView, StyleSheet} from 'react-native';
import {Stack} from 'native-base';
import {colors} from '../theme/colors';
import {BottomTabBar, SimpleArticleList} from '../components/molecules';
import {
  CarouselBrowse,
  CarouselBrowseBottom,
  LatestArticles,
  PopularArticles,
  TrendingArticles,
} from '../components/organisms';
import {useEditorsPickQuery, useUpcomingEventsQuery} from '../store/services';
import {CarouselBrowseSkeleton} from '../components/skeletons/CarouselBrowseSkeleton';
import {MainScreenHeader} from '../components/headers';

export function BrowseScreen() {
  const {data, isLoading} = useUpcomingEventsQuery();
  const editorsPick = useEditorsPickQuery();

  return (
    <Stack bg={colors.pureWhite}>
      <ScrollView style={styles.bottomMargin}>
        <Stack space={4}>
          <MainScreenHeader label={'Browse'} />
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
      <BottomTabBar />
    </Stack>
  );
}

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: Platform.OS === 'ios' ? 55 : 75,
  },
});
