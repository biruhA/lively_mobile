import {ScrollView} from 'react-native';
import React from 'react';
import {ProductCarousel} from '../components/organisms';
import {Box, HStack, Image, Spinner, Stack, Text} from 'native-base';
import {colors} from '../theme/colors';
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

export function ProductDetailScreen() {
  const navigation = useNavigation();
  const {selectedProductId, selectedProduct} = useAppSelector(
    state => state.product,
  );
  const {isLoading} = useProductDetailByIdQuery(selectedProductId);

  return (
    <Stack flex={1} bg={'#fbfbfb'}>
      <Stack bg={colors.pureWhite} px={5}>
        <IconOnlyHeader
          iconL={require('../assets/icons/heart-bold.png')}
          iconR={require('../assets/icons/share.png')}
          onPressL={() => {
            console.log('L');
          }}
          onPressR={() => {
            console.log('R');
          }}
        />
      </Stack>
      {isLoading ? (
        <Spinner flex={1} size={'lg'} accessibilityLabel="Loading posts" />
      ) : (
        <ScrollView>
          <ProductCarousel images={selectedProduct?.product_images} />
          <BrandSection />
          {/* <RecommendedStoresSection /> */}
          <ProductDescription />
        </ScrollView>
      )}
      <Stack px={2} pt={3}>
        <GradientButton
          disabled={isLoading}
          text="Visit All stores"
          onPress={() => {
            navigation.navigate(ScreenNames.StoresScreen);
          }}
        />
      </Stack>
    </Stack>
  );
}
