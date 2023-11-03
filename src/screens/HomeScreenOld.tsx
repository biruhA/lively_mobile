import React, {useCallback, useEffect} from 'react';
import {Stack, Text} from 'native-base';
import {
  Carousel1,
  Carousel2,
  CarouselBrowse,
  Catalogue,
  ForYou,
  ProductList,
  TopArticles,
} from '../components/organisms';
import {BottomTabBar, SearchBox} from '../components/molecules';
import {colors} from '../theme/colors';
import {FlatList, Platform, StyleSheet, RefreshControl} from 'react-native';
import {useCurrentLocation} from '../hooks';
import {
  useLandscapeDiscountBannersQuery,
  useSquareDiscountBannersQuery,
  useUpcomingEventsQuery,
} from '../store/services';
import {CarouselBrowseSkeleton} from '../components/skeletons/CarouselBrowseSkeleton';
import {MainScreenHeader} from '../components/headers';
import {useAppSelector} from '../store/hooks';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

export function HomeScreenOld() {
  const {user, inAppLoggedIn} = useAppSelector(state => state.auth);
  const {data, isLoading} = useUpcomingEventsQuery();
  const landscapeDiscountBanners = useLandscapeDiscountBannersQuery();
  const squareDiscountBanners = useSquareDiscountBannersQuery();
  const {userLocation} = useAppSelector(state => state.search);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    landscapeDiscountBanners.refetch();
    squareDiscountBanners
      .refetch()
      .unwrap()
      .then(() => setRefreshing(false));
  }, []);

  return (
    <Stack bg={colors.pureWhite} flex={1}>
      <FlatList
        style={styles.bottomMargin}
        data={[{id: 1}]}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({item}) => {
          return (
            <Stack space={3}>
              <MainScreenHeader label={`Hi ${user?.name || ''} 👋`} />
              <SearchBox
                hasCamera={false}
                mainStyle={{paddingHorizontal: 16, paddingVertical: 12}}
              />
              <Stack bg={'white'} pb={7} px={4}>
                {landscapeDiscountBanners?.isLoading ? (
                  <CarouselBrowseSkeleton />
                ) : (
                  <Carousel1 Data={landscapeDiscountBanners?.data?.data} />
                )}
              </Stack>
              <Catalogue refreshing={refreshing} />
              <Stack bg={'white'} pb={7} px={4} py={4}>
                {isLoading ? (
                  <CarouselBrowseSkeleton />
                ) : (
                  <Stack space={1}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontWeight: '700',
                        fontSize: 18,
                      }}>
                      Upcoming Events
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontWeight: '400',
                        fontSize: 14,
                        color: '#AFAFAF',
                      }}>
                      Swipe left to change cards
                    </Text>
                    <CarouselBrowse Data={data?.data} />
                  </Stack>
                )}
              </Stack>
              <ForYou />
              <TopArticles />
              <ProductList
                label="For Women"
                url="for-her"
                refreshing={refreshing}
              />
              <ProductList
                label="For Men"
                url="for-him"
                refreshing={refreshing}
              />
              <Stack bg={'white'} pb={7} px={4}>
                {isLoading ? (
                  <CarouselBrowseSkeleton />
                ) : (
                  <Carousel2 Data={squareDiscountBanners?.data?.data} />
                )}
              </Stack>
              <ProductList
                label="For Mom & Baby"
                url="mom-and-baby"
                refreshing={refreshing}
              />
              <ProductList
                label="Food & Drinks"
                url="foods-and-drinks"
                refreshing={refreshing}
              />
            </Stack>
          );
        }}
        keyExtractor={item => item.id}
      />
      <BottomTabBar />
    </Stack>
  );
}

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: Platform.OS === 'ios' ? 55 : 75,
  },
});
