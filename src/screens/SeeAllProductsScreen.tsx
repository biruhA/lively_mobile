import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {GoBack, ListEmptyComponent} from '../components/atoms';
import {useRoute} from '@react-navigation/native';
import {Stack, Text, useDisclose} from 'native-base';
import {Colors, colors} from '../theme/colors';
import {
  CatalogList,
  IconOnlyHeader,
  ProductCard,
} from '../components/molecules';
import TouchableIcon from '../components/atoms/TouchableIcon';
import {useAppSelector} from '../store/hooks';
import {
  useProductBySubCategoryQuery,
  useProductsByCategoryQuery,
  useSubCategoriesByCategoryQuery,
} from '../store/services';
import {ProductSkeletonColumn} from '../components/skeletons';
import search from '../assets/icons/search-black.png';
import filter from '../assets/icons/filter.png';
import {FilterSheet} from '../components/organisms';
import {LabeledHeader} from '../components';

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
}

export function SeeAllProductsScreen() {
  const {isOpen, onOpen, onClose} = useDisclose();
  const {selectedCategoryId, selectedSubCategoryId} = useAppSelector(
    state => state.product,
  );
  const {data, isLoading} = useProductsByCategoryQuery(selectedCategoryId);
  const ProductBySubCategory = useProductBySubCategoryQuery(
    selectedSubCategoryId,
  );
  const route = useRoute();
  const [DATA, setData] = useState(data?.data?.products);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (selectedSubCategoryId !== '') {
      setData(ProductBySubCategory?.data?.data?.products);
    } else {
      setData(data?.data?.products);
    }
    setIsLoading(false);
  }, [selectedSubCategoryId, isLoading, ProductBySubCategory]);

  return (
    <Stack flex={1} space={2} bg={Colors.background.everlasting_ice}>
      <LabeledHeader label={route?.params?.label || ''} />
      <Stack
        bg={Colors.background.white}
        space={4}
        h={'full'}
        p={4}
        justifyContent={'center'}>
        <CatalogList />
        {IsLoading ? (
          <ProductSkeletonColumn />
        ) : (
          <FlatList
            numColumns={2}
            data={DATA}
            ListEmptyComponent={() => <ListEmptyComponent />}
            renderItem={({item}) => (
              <ProductCard
                id={item?.id}
                imageUrl={item?.thumbnail?.url}
                item={item.title?.english}
                volume={item.variant_count}
                amount={item.from}
                mainStyle={{width: '50%', marginBottom: 12}}
              />
            )}
            keyExtractor={(item: Props) => item.id}
          />
        )}
        <FilterSheet isOpen={isOpen} onClose={onClose} setData={setData} />
      </Stack>
    </Stack>
  );
}
