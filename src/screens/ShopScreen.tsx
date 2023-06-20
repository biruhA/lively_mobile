import {ScrollView} from 'react-native';
import React from 'react';
import {Stack} from 'native-base';
import {colors} from '../theme/colors';
import {Prescription, SearchBar} from '../components/molecules';
import {
  Carousel1,
  Carousel2,
  Catalogue,
  Deals,
  FoodDrinks,
  ForHer,
  ForHim,
  ForYouVertical,
  HomeCare,
  HomeScreenHeader,
  MomBaby,
  ProductList,
} from '../components/organisms';

export function ShopScreen() {
  return (
    <Stack px={'16px'} pb={2} flex={1} bg={colors.pureWhite}>
      <ScrollView>
        <HomeScreenHeader />
        <SearchBar hasCamera={true} />
        <Stack space={8} pt={2}>
          <Carousel1 />
          <Catalogue />
          <ProductList label="For Her" url="for-her" />
          {/* <ForHer /> */}
          <ForYouVertical />
          <Deals />
          <Prescription />
          <ProductList label="For Him" url="for-him" />
          {/* <ForHim /> */}
          <Carousel2 />
          <ProductList label="Mom & Baby" url="mom-and-baby" />
          {/* <MomBaby /> */}
          <ProductList label="Home Care" url="home-care" />
          {/* <HomeCare /> */}
          <Carousel2 />
          <ProductList label="Food & Drinks" url="foods-and-drinks" />
          {/* <FoodDrinks /> */}
        </Stack>
      </ScrollView>
    </Stack>
  );
}
