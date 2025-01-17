import React, {useEffect, useState} from 'react';
import {FlatList, Platform} from 'react-native';
import {ListEmptyComponent} from '../components/atoms';
import {useRoute} from '@react-navigation/native';
import {Center, Spinner, Stack, Text} from 'native-base';
import {Colors} from '../theme/colors';
import {CatalogList, ProductCard} from '../components/molecules';
import {useAppSelector} from '../store/hooks';
import {
  useProductBySubCategoryMutation,
  useProductsByCategoryMutation,
} from '../store/services';
import {ProductSkeletonColumn} from '../components/skeletons';
import {LabeledHeader} from '../components';
import {fonts} from '../theme/fonts';

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
  const [IsLoading, setIsLoading] = useState(true);
  const [IsSubLoading, setIsSubLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {selectedCategoryId, selectedSubCategoryId} = useAppSelector(
    state => state.product,
  );
  const [ProductBySubCategory] = useProductBySubCategoryMutation();
  const [ProductsByCategory, result] = useProductsByCategoryMutation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);

    if (selectedSubCategoryId !== '') {
      ProductBySubCategory({
        id: selectedSubCategoryId,
        page,
      })
        .unwrap()
        .then(() => {
          setRefreshing(false);
          setIsLoading(false);
        });
    } else {
      ProductsByCategory({
        id: selectedCategoryId,
        page,
      })
        .unwrap()
        .then(() => {
          setRefreshing(false);
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (selectedSubCategoryId !== '') {
      if (page === 1) {
        setIsLoading(true);
        ProductBySubCategory({
          id: selectedSubCategoryId,
          page,
        })
          .unwrap()
          .then(res => {
            setData(res?.data?.products?.data);
            setIsLoading(false);
          })
          .catch(err => {
            console.log(err);
            setIsLoading(false);
          });
      } else if (page > 1) {
        setIsSubLoading(true);
        ProductBySubCategory({
          id: selectedSubCategoryId,
          page,
        })
          .unwrap()
          .then(res => {
            setData(DATA.concat(res?.data?.products?.data));
            setIsSubLoading(false);
          })
          .catch(err => {
            console.log(err);
            setIsSubLoading(false);
          });
      }
    } else {
      if (page === 1) {
        setIsLoading(true);
        ProductsByCategory({
          id: selectedCategoryId,
          page,
        })
          .unwrap()
          .then(res => {
            setData(res?.data?.products?.data);
            setIsLoading(false);
          })
          .catch(err => {
            console.log(err);
            setIsLoading(false);
          });
      } else if (page > 1) {
        setIsSubLoading(true);
        ProductsByCategory({
          id: selectedCategoryId,
          page,
        })
          .unwrap()
          .then(res => {
            setData(DATA.concat(res?.data?.products?.data));
            setIsSubLoading(false);
          })
          .catch(err => {
            console.log(err);
            setIsSubLoading(false);
          });
      }
    }
  }, [
    selectedCategoryId,
    selectedSubCategoryId,
    ProductBySubCategory,
    ProductsByCategory,
    page,
  ]);

  return (
    <Stack
      flex={1}
      space={2}
      bg={Colors.background.everlasting_ice}
      mb={Platform.OS === 'ios' ? 55 : 75}>
      <LabeledHeader label={route?.params?.label || ''} />
      <Stack
        bg={Colors.background.white}
        space={4}
        h={'full'}
        p={3}
        justifyContent={'center'}>
        <CatalogList setPage={setPage} />
        {IsLoading ? (
          <ProductSkeletonColumn />
        ) : (
          <FlatList
            numColumns={2}
            onRefresh={onRefresh}
            refreshing={refreshing}
            data={DATA}
            ListEmptyComponent={() => <ListEmptyComponent />}
            ListFooterComponent={() => {
              if (IsSubLoading) {
                if (result?.data?.data?.products?.next_page_url === null) {
                  return (
                    <Center w={'100%'} p={2}>
                      <Text style={fonts.caption}>- End -</Text>
                    </Center>
                  );
                } else {
                  return (
                    <Center w={'100%'} p={2}>
                      <Spinner />
                    </Center>
                  );
                }
              } else {
                return (
                  <Center w={'100%'} p={2}>
                    <Text style={fonts.caption}>- End -</Text>
                  </Center>
                );
              }
            }}
            onEndReached={() => {
              if (
                result?.data?.data?.products?.next_page_url &&
                !IsSubLoading
              ) {
                setPage(page + 1);
              }
            }}
            onEndReachedThreshold={0.5}
            renderItem={({item}) => (
              <ProductCard
                id={item?.id}
                isWishlist={item?.is_wishlist}
                imageUrl={item?.thumbnail?.url}
                item={item.title?.english}
                volume={item.variant_count}
                amount={item.from}
                mainStyle={{width: '49%', marginBottom: 12}}
              />
            )}
            keyExtractor={(item: Props) => item.id}
          />
        )}
      </Stack>
    </Stack>
  );
}
