import {View, FlatList} from 'react-native';
import React from 'react';
import {CatalogueCard} from '../molecules';
import {Center, Text, Stack} from 'native-base';
import {
  useCategoriesQuery,
  useProductCategoriesQuery,
} from '../../store/services';
import {CatalogueSkeleton} from '../skeletons';
import {fonts} from '../../theme/fonts';

export function Catalogue() {
  const {data, isLoading} = useProductCategoriesQuery();

  return (
    <Stack pt={4}>
      {/* <CatalogueCard
        image={require('../../assets/images/medicinal.png')}
        label={'Medicinal'}
      /> */}
      {isLoading ? (
        <CatalogueSkeleton />
      ) : (
        <FlatList
          horizontal={true}
          data={data?.data}
          ListEmptyComponent={() => {
            return (
              <Center ml={50}>
                <Text style={fonts.caption}>No catagories</Text>
              </Center>
            );
          }}
          renderItem={({item}) => (
            <CatalogueCard
              id={item?.id}
              image={item?.category_image?.url}
              label={item?.name?.english}
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      )}
    </Stack>
  );
}
