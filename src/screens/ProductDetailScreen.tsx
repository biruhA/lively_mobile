import {StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {ProductCarousel} from '../components/organisms';
import {Box, HStack, Image, Spinner, Stack, Text} from 'native-base';
import {Colors, colors} from '../theme/colors';
import {fonts} from '../theme/fonts';
import {GradientButton, GradientButtonSmall} from '../components/atoms';
import {
  BrandSection,
  IconOnlyHeader,
  ProductDescription,
  RecommendedStoresSection,
} from '../components/molecules';
import {ScreenNames} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../store/hooks';
import {useProductDetailByIdQuery} from '../store/services';
import {LabeledHeader} from '../components';
import {DeepLinkPath, useCurrentLocation} from '../hooks';

export function ProductDetailScreen() {
  const navigation = useNavigation();
  const {selectedProductId} = useAppSelector(state => state.product);
  const {data, isLoading, refetch} =
    useProductDetailByIdQuery(selectedProductId);
  const {res, handleLocationPermission} = useCurrentLocation();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch()
      .unwrap()
      .then(() => setRefreshing(false));
  }, []);

  return (
    <Stack flex={1} bg={Colors.background.everlasting_ice}>
      <LabeledHeader
        label="Product Detail"
        hasShare={true}
        path="product"
        id={data?.data?.id}
      />
      {isLoading ? (
        <Spinner flex={1} size={'lg'} accessibilityLabel="Loading posts" />
      ) : (
        <FlatList
          data={[data?.data]}
          onRefresh={onRefresh}
          refreshing={refreshing}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Stack pt={2}>
                <ProductCarousel images={data?.data?.product_images} />
                <BrandSection Data={data?.data} />
                <RecommendedStoresSection
                  Data={data?.data}
                  res={res}
                  handleLocationPermission={handleLocationPermission}
                />
                <ProductDescription Data={data?.data} />
              </Stack>
            );
          }}
        />
      )}
      <GradientButton
        disabled={isLoading || res !== 'granted'}
        text="Visit All stores"
        mainStyle={styles.mainStyle}
        onPress={() => {
          navigation.navigate(ScreenNames.StoresScreen);
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  mainStyle: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 16,
  },
});
