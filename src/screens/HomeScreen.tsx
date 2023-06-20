import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Box, HStack, Image, Pressable, Stack, Text} from 'native-base';
import {
  Carousel1,
  Carousel2,
  CarouselBrowse,
  Catalogue,
  ForHer,
  ForHim,
  ForYou,
  HomeScreenHeader,
  Makeup,
  NearbyStores,
  ProductList,
  TopArticles,
} from '../components/organisms';
import {Prescription, SearchBar} from '../components/molecules';
import {colors} from '../theme/colors';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Deals} from '../components/organisms/Deals';
import {useCurrentLocation} from '../hooks';
import search from '../assets/icons/search.png';
import {fonts} from '../theme/fonts';
import {ScreenNames} from '../constants';
import cameraSearch from '../assets/icons/camera-search.png';
import {
  useLandscapeDiscountBannersQuery,
  useSquareDiscountBannersQuery,
  useUpcomingEventsQuery,
} from '../store/services';
import {CarouselBrowseSkeleton} from '../components/skeletons/CarouselBrowseSkeleton';

export function HomeScreen() {
  const {location, getLocation, error} = useCurrentLocation();
  const {data, isLoading} = useUpcomingEventsQuery();
  const landscapeDiscountBanners = useLandscapeDiscountBannersQuery();
  const squareDiscountBanners = useSquareDiscountBannersQuery();

  // console.log(
  //   '🚀 ~ file: HomeScreen.tsx:38 ~ HomeScreen ~ landscapeDiscountBanners:',
  //   landscapeDiscountBanners?.data?.data,
  // );

  // console.log(
  //   '🚀 ~ file: HomeScreen.tsx:40 ~ HomeScreen ~ squareDiscountBanners:',
  //   squareDiscountBanners?.data?.data,
  // );
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Stack px={'16px'} bg={colors.pureWhite} h={'full'} pb={2}>
      <ScrollView>
        <HomeScreenHeader />
        <SearchBox />
        <Stack space={8} pt={2}>
          {landscapeDiscountBanners?.isLoading ? (
            <CarouselBrowseSkeleton />
          ) : (
            <Carousel1 Data={landscapeDiscountBanners?.data?.data} />
          )}
          <Catalogue />
          <Prescription />
          <ProductList label="For Woman" url="for-her" />
          <ProductList label="For Men" url="for-him" />
          <ForYou />
          <TopArticles />
          {isLoading ? (
            <CarouselBrowseSkeleton />
          ) : (
            <CarouselBrowse Data={data?.data} />
          )}
          <ProductList label="For Mom & Baby" url="mom-and-baby" />
          <ProductList label="For your Home Care" url="home-care" />
          {isLoading ? (
            <CarouselBrowseSkeleton />
          ) : (
            <Carousel2 Data={squareDiscountBanners?.data?.data} />
          )}
          <ProductList label="Food & Drinks" url="foods-and-drinks" />
        </Stack>
      </ScrollView>
    </Stack>
  );
}

function SearchBox() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.Search)}>
      <HStack
        alignItems={'center'}
        space={2}
        bg={colors.unselected}
        py={3}
        rounded={40}>
        <Image source={search} alt="search" size="24px" ml={4} />
        <Text style={[fonts.body1, {fontSize: 14, color: '#0000003B'}]}>
          Search for a products, articles, Pharmacies
        </Text>
        <TouchableOpacity>
          <Image source={cameraSearch} alt="camera search" size="24px" ml={1} />
        </TouchableOpacity>
      </HStack>
    </TouchableOpacity>
  );
}

// {
//   /* <ProductList label="For Her" url="for-her" /> */
// }
// {
//   /* <ForHer /> */
// }
// {
//   /* TODO Check number of columns error
//           <Deals /> */
// }
// {
//   /* <ForHim /> */
// }
// {
//   /* <Makeup /> */
// }
// {
//   /* <NearbyStores /> */
// }
// {
//   /* <ProductList label="For Him" url="for-him" /> */
// }
// {
//   /* <Carousel2 /> */
// }
// {
//   /* <ProductList label="Makeup" url="Makeup" /> */
// }
