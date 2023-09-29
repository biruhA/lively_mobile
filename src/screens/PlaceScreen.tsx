import {TouchableOpacity, ScrollView, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Center, HStack, Spinner, Stack, Text} from 'native-base';
import {colors} from '../theme/colors';
import {
  BottomTabBar,
  PlacesPharmacyCard,
  SearchBar,
  SearchBarPlaces,
} from '../components/molecules';
import {Carousel1} from '../components/organisms';
import pharmacy from '../assets/icons/pharmacy.png';
import store from '../assets/icons/store.png';
import {ButtonTabs} from '../components/atoms';
import {CarouselBrowseSkeleton} from '../components/skeletons/CarouselBrowseSkeleton';
import {useBannersQuery, useRecommendedStoresMutation} from '../store/services';
import {useAppSelector} from '../store/hooks';
import {fonts} from '../theme/fonts';
import {useDebounce} from '../hooks';
import {MainScreenHeader} from '../components/headers';

export function PlaceScreen() {
  const Banners = useBannersQuery();
  const {searchedText, userLocation} = useAppSelector(state => state.search);
  const [RecommendedStores, result] = useRecommendedStoresMutation();
  const [isPharmacySelected, setIsPharmacySelected] = useState(true);

  const debouncedText = useDebounce(searchedText, 500);

  useEffect(() => {
    RecommendedStores({
      latitude: userLocation?.lat,
      longitude: userLocation?.lon,
      is_pharmacy: isPharmacySelected,
      search: debouncedText,
    });
  }, [debouncedText, isPharmacySelected]);

  return (
    <Stack bg={colors.pureWhite} h={'full'} pb={2}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.bottomMargin}>
        <Stack space={4}>
          <MainScreenHeader label="Places" />
          <Stack bg={'white'} px={4} pb={Banners?.isLoading ? 0 : 8}>
            {Banners?.isLoading ? (
              <CarouselBrowseSkeleton />
            ) : (
              <Carousel1 Data={Banners?.data?.data} />
            )}
          </Stack>
          <Stack bg={'white'} p={4} space={4}>
            <SearchBarPlaces placeholder="Search for places" />
            {!debouncedText && (
              <ButtonTabs
                buttonOneIcon={pharmacy}
                buttonOneTitle="Store"
                buttonTwoIcon={store}
                buttonTwoTitle="Pharmacies"
                isPharmacySelected={isPharmacySelected}
                setIsPharmacySelected={setIsPharmacySelected}
              />
            )}
            {result?.isLoading ? (
              <Center flex={1} py={8}>
                <Spinner />
              </Center>
            ) : (
              <FlatList
                data={result?.data?.data?.data}
                ListEmptyComponent={ListEmptyComponent}
                renderItem={({item}) => (
                  <PlacesPharmacyCard
                    id={item?.id}
                    store={`${item.store_name?.english} ${item?.store_branch_name?.english}`}
                    distance={item?.distance}
                    rating={item?.rating?.average}
                    imageUrl={item.store_logo?.url}
                    isOpenNow={item?.is_open}
                  />
                )}
                keyExtractor={item => item.id}
              />
            )}
          </Stack>
        </Stack>
      </ScrollView>
      <BottomTabBar />
    </Stack>
  );
}

function ListEmptyComponent() {
  return (
    <Center flex={1} py={8}>
      <Text styles={fonts.caption}>No Places</Text>
    </Center>
  );
}

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: Platform.OS === 'ios' ? 55 : 75,
  },
});
