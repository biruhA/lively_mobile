import {View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {CatalogueCard} from '../molecules';
import {Center, Text, Stack, HStack} from 'native-base';
import {
  useCategoriesQuery,
  useProductCategoriesQuery,
} from '../../store/services';
import {CatalogueSkeleton} from '../skeletons';
import {fonts} from '../../theme/fonts';

export function Catalogue({refreshing}) {
  const {data, isLoading, refetch} = useProductCategoriesQuery();

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  return (
    <HStack pt={4} bg={'white'} px={4} py={4}>
      {isLoading ? (
        <CatalogueSkeleton />
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => {
            return (
              <CatalogueCard
                image={require('../../assets/images/medicinal.png')}
                label={'Medicinal'}
                isLocal={true}
              />
            );
          }}
          data={data?.data}
          renderItem={({item}) => (
            <CatalogueCard
              id={item?.id}
              image={item?.category_image?.url}
              label={item?.name?.english}
              isLocal={item?.isLocal}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      )}
    </HStack>
  );
}
