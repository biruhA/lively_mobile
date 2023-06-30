import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {GoBack, ListEmptyComponent} from '../components/atoms';
import {useRoute} from '@react-navigation/native';
import {Stack, Text, useDisclose} from 'native-base';
import {colors} from '../theme/colors';
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

const Data = [
  {
    id: '1',
    label: 'Pharmacies',
    icon: null,
  },
  {
    id: '2',
    label: 'Sores',
    icon: null,
  },
  {
    id: '3',
    label: 'Clinics',
    icon: null,
  },
  {
    id: '4',
    label: 'MakeUp',
    icon: null,
  },
];

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

  const [DATA, setData] = useState(data?.data?.products);

  useEffect(() => {
    if (selectedSubCategoryId !== '') {
      setData(ProductBySubCategory?.data?.data?.products);
    } else {
      setData(data?.data?.products);
    }
  }, [selectedSubCategoryId]);

  return (
    <Stack
      space={4}
      flex={1}
      bg={colors.pureWhite}
      px={'16px'}
      py={2}
      justifyContent={'center'}>
      <IconOnlyHeader
        iconL={search}
        iconR={filter}
        onPressL={() => {
          console.log('cat');
        }}
        onPressR={onOpen}
      />
      <CatalogList Data={Data} />
      {isLoading ? (
        <ProductSkeletonColumn />
      ) : (
        <FlatList
          style={{marginTop: 4}}
          numColumns={2}
          data={DATA}
          ListEmptyComponent={() => {
            return <ListEmptyComponent />;
          }}
          renderItem={({item}) => (
            <ProductCard
              imageUrl={item?.product_images?.[0]?.url}
              item={item.title?.english}
              volume={item.additional_information?.Weight}
              amount={item.from}
              mainStyle={{width: '47%', marginBottom: 12}}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      )}
      <FilterSheet isOpen={isOpen} onClose={onClose} setData={setData} />
    </Stack>
  );
}
