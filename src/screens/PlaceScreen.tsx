import {
  RefreshControl,
  Platform,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
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
import {useCurrentLocation, useDebounce} from '../hooks';
import {MainScreenHeader} from '../components/headers';
import EnableLocation from '../components/atoms/EnableLocation';

export function PlaceScreen() {
  const Banners = useBannersQuery();
  const {searchedText, userLocation} = useAppSelector(state => state.search);
  const {storeList, pharmacieList} = useAppSelector(state => state.place);
  const [RecommendedStores, result] = useRecommendedStoresMutation();
  const [isPharmacySelected, setIsPharmacySelected] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const {res, handleLocationPermission} = useCurrentLocation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    RecommendedStores({
      latitude: userLocation?.lat,
      longitude: userLocation?.lon,
      is_pharmacy: isPharmacySelected,
      search: debouncedText,
    })
      .unwrap()
      .then(() => setRefreshing(false));
  }, []);

  const debouncedText = useDebounce(searchedText, 500);

  useEffect(() => {
    setPage(1);
  }, [isPharmacySelected]);

  useEffect(() => {
    RecommendedStores({
      latitude: userLocation?.lat,
      longitude: userLocation?.lon,
      is_pharmacy: isPharmacySelected,
      search: debouncedText,
      page,
    })
      .unwrap()
      .then(res => {
        setHasMore(!!res?.data?.next_page_url);
      });
  }, [debouncedText, isPharmacySelected, page, userLocation]);

  return (
    <Stack bg={colors.pureWhite} flex={1} pb={2}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        <Stack space={4}>
          <MainScreenHeader label="Places" />
          <Stack bg={'white'} px={4} pb={Banners?.isLoading ? 0 : 8}>
            {Banners?.isLoading ? (
              <CarouselBrowseSkeleton />
            ) : (
              <Carousel1 Data={Banners?.data?.data} />
            )}
          </Stack>
          <Stack bg={'white'} p={4} space={4} flex={1}>
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
            <EnableLocation
              result={res}
              requestLocationPermission={handleLocationPermission}
            />
            {Object.keys(userLocation).length > 0 && (
              <FlatList
                data={isPharmacySelected ? pharmacieList : storeList}
                ListEmptyComponent={() => {
                  !result?.isLoading && <ListEmptyComponent />;
                }}
                onEndReachedThreshold={1}
                onEndReached={() => {
                  if (hasMore) {
                    setPage(prev => prev + 1);
                  }
                }}
                ListFooterComponent={() => {
                  return (
                    <Center flex={1} py={1}>
                      {hasMore || result?.isLoading ? (
                        <Spinner />
                      ) : (
                        <Text>- End -</Text>
                      )}
                    </Center>
                  );
                }}
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
    </Stack>
  );
}

function ListEmptyComponent() {
  return (
    <Center flex={1} py={8}>
      <Text style={fonts.caption}>No Places</Text>
    </Center>
  );
}

const styles = StyleSheet.create({});
