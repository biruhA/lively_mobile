import React from 'react';
import {FlatList} from 'react-native';
import {Prescription, SearchBar, SearchList} from '../components/molecules';
import {Button, Spinner, Stack, Text, Wrap} from 'native-base';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts';
import {
  Deals,
  SearchAll,
  SearchArticles,
  SearchProduct,
  SearchStores,
  SearchTags,
} from '../components/organisms';
import {useAppSelector} from '../store/hooks';
import {ScreenNames} from '../constants';
import {useGetTagsQuery} from '../store/services';
import {ListEmptyComponent} from '../components/atoms';

export enum filterLabel {
  All = 'all',
  Products = 'product',
  Stores = 'store',
  Articles = 'article',
}

export function SearchScreen() {
  const {searchedText, selectedFilter} = useAppSelector(state => state.search);

  return (
    <Stack px={4} bg={colors.pureWhite} h={'full'} pb={2} space={6}>
      <Stack pt={6} space={3}>
        <Text style={fonts.subtitle1}>Search</Text>
        <SearchBar />
      </Stack>
      {!searchedText ? (
        <>
          <Prescription />
          <SearchTags />
        </>
      ) : (
        <Stack>
          <SearchList />
          {selectedFilter === 'All' && <SearchAll />}
          {selectedFilter === 'Products' && <SearchProduct />}
          {selectedFilter === 'Stores' && <SearchStores />}
          {selectedFilter === 'Articles' && <SearchArticles />}
        </Stack>
      )}
    </Stack>
  );
}
