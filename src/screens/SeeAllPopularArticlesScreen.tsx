import React from 'react';
import {FlatList} from 'react-native';
import {GoBack, ListEmptyComponent} from '../components/atoms';
import {useRoute} from '@react-navigation/native';
import {Stack, Text, useDisclose} from 'native-base';
import {colors} from '../theme/colors';
import {
  CatalogList,
  IconOnlyHeader,
  ProductCard,
  VerticalArticleCard,
} from '../components/molecules';
import TouchableIcon from '../components/atoms/TouchableIcon';
import {useAppSelector} from '../store/hooks';
import {
  useAllPopularArticlesQuery,
  useSubCategoriesByCategoryQuery,
} from '../store/services';
import {ProductSkeletonColumn} from '../components/skeletons';
import search from '../assets/icons/search-black.png';
import filter from '../assets/icons/filter.png';
import {FilterSheet} from '../components/organisms';
import {ScreenNames} from '../constants';

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
}
export function SeeAllPopularArticlesScreen() {
  const {data, isLoading} = useAllPopularArticlesQuery();
  const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <Stack
      space={4}
      flex={1}
      bg={colors.pureWhite}
      px={'16px'}
      py={2}
      justifyContent={'center'}>
      <GoBack label="Popular Articles" />
      {isLoading ? (
        <ProductSkeletonColumn />
      ) : (
        <FlatList
          style={{marginTop: 4}}
          numColumns={2}
          data={data?.data?.data}
          ListEmptyComponent={() => {
            return <ListEmptyComponent />;
          }}
          renderItem={({item}) => (
            <VerticalArticleCard
              id={item?.id}
              title={item?.title?.english}
              readTime={item?.reading_time_english}
              catagoure={item?.category?.name?.english}
              imageUrl={item?.cover_image?.url}
              navTo={ScreenNames.ArticleDetail}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      )}
      <FilterSheet isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}
