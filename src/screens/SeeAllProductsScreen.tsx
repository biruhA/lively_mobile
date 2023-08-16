import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {ListEmptyComponent} from '../components/atoms';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {Stack} from 'native-base';
import {Colors} from '../theme/colors';
import {CatalogList, ProductCard} from '../components/molecules';
import {useAppSelector} from '../store/hooks';
import {
  useProductBySubCategoryQuery,
  useProductsByCategoryMutation,
} from '../store/services';
import {ProductSkeletonColumn} from '../components/skeletons';
import {LabeledHeader} from '../components';

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
}

export function SeeAllProductsScreen() {
  const route = useRoute();
  const [DATA, setData] = useState([]);
  const [page, setPage] = useState(1);
  const {selectedCategoryId, selectedSubCategoryId} = useAppSelector(
    state => state.product,
  );
  const ProductBySubCategory = useProductBySubCategoryQuery(
    selectedSubCategoryId,
  );
  const [ProductsByCategory, result] = useProductsByCategoryMutation();

  useFocusEffect(
    useCallback(() => {
      ProductsByCategory({
        id: selectedCategoryId,
        page,
      })
        .unwrap()
        .then(res => {
          setData(res?.data?.data?.products?.data);
        })
        .catch(err => {
          console.log(err);
        });
    }, [selectedCategoryId, page]),
  );

  useEffect(() => {
    if (selectedSubCategoryId !== '') {
      setData(ProductBySubCategory?.data?.products);
    } else {
      setData(result?.data?.data?.products?.data);
    }
  }, [selectedCategoryId, selectedSubCategoryId, ProductBySubCategory]);

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
        {result?.isLoading || ProductBySubCategory?.isLoading ? (
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
                onEndReached={() => {
                  if (result?.data?.data?.products?.next_page_url) {
                    setPage(page + 1);
                  }
                }}
                onEndReachedThreshold={0.5}
              />
            )}
            keyExtractor={(item: Props) => item.id}
          />
        )}
      </Stack>
    </Stack>
  );
}
