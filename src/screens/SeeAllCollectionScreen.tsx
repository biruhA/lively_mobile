import {FlatList, Text} from 'react-native';
import React from 'react';
import {Stack} from 'native-base';
import {colors} from '../theme/colors';
import {GoBack} from '../components/atoms';
import {CollectionCard} from '../components/molecules';
import {useCollectionsQuery} from '../store/services';

const Data = [
  {id: '1', name: 'Konjo Collection', list: '5'},
  {id: '2', name: 'Konjo Collection', list: '5'},
  {id: '3', name: 'Konjo Collection', list: '5'},
  {id: '4', name: 'Konjo Collection', list: '5'},
  {id: '5', name: 'Konjo Collection', list: '5'},
  {id: '6', name: 'Konjo Collection', list: '5'},
  {id: '7', name: 'Konjo Collection', list: '5'},
];

export function SeeAllCollectionScreen() {
  const {data, isLoading} = useCollectionsQuery();
  console.log(
    '🚀 ~ file: SeeAllCollectionScreen.tsx:21 ~ SeeAllCollectionScreen ~ data:',
    data?.data,
  );
  return (
    <Stack bg={colors.pureWhite} flex={1} p={4} space={4}>
      <GoBack label="Collection" />
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        data={data?.data}
        renderItem={({item}) => (
          <CollectionCard
            id={item.id}
            name={item.title?.english}
            imageUrl={item?.collection_image?.url}
            list={item.description?.english}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Stack>
  );
}
