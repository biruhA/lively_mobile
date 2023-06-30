import React, {useEffect} from 'react';
import {Box, Button, HStack, Image, Pressable, Stack, Text} from 'native-base';
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
import {Prescription, SearchBar, SearchBox} from '../components/molecules';
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

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Stack bg={colors.pureWhite} flex={1}>
      <ScrollView>
        <Stack space={3}>
          <HomeScreenHeader />
          <SearchBox mainStyle={{paddingHorizontal: 16, paddingVertical: 12}} />
          <Stack bg={'white'} pb={7} px={4}>
            {landscapeDiscountBanners?.isLoading ? (
              <CarouselBrowseSkeleton />
            ) : (
              <Carousel1 Data={landscapeDiscountBanners?.data?.data} />
            )}
          </Stack>
          <Catalogue />
          <Prescription />
          <ProductList label="For Woman" url="for-her" />
          <ProductList label="For Men" url="for-him" />
          <ForYou />
          <TopArticles />
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
          <ProductList label="For Mom & Baby" url="mom-and-baby" />
          <ProductList label="For your Home Care" url="home-care" />
          <Stack bg={'white'} pb={7} px={4}>
            {isLoading ? (
              <CarouselBrowseSkeleton />
            ) : (
              <Carousel2 Data={squareDiscountBanners?.data?.data} />
            )}
          </Stack>
          <ProductList label="Food & Drinks" url="foods-and-drinks" />
        </Stack>
      </ScrollView>
    </Stack>
  );
}

// function SearchBox() {
//   const navigation = useNavigation();
//   return (
//     <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.Search)}>
//       <HStack
//         alignItems={'center'}
//         space={2}
//         bg={colors.unselected}
//         py={3}
//         rounded={40}>
//         <Image source={search} alt="search" size="24px" ml={4} />
//         <Text style={[fonts.body1, {fontSize: 14, color: '#0000003B'}]}>
//           Search for a products, articles, Pharmacies
//         </Text>
//         <TouchableOpacity>
//           <Image source={cameraSearch} alt="camera search" size="24px" ml={1} />
//         </TouchableOpacity>
//       </HStack>
//     </TouchableOpacity>
//   );
// }

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
