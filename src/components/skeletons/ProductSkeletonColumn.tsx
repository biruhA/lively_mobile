import React from 'react';
import {FlatList} from 'react-native';
import {HStack, Skeleton} from 'native-base';

interface Props {
  id: string;
}

const Data: Props[] = [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}];

export function ProductSkeletonColumn() {
  return (
    <HStack flex={1}>
      <FlatList
        numColumns={2}
        data={Data}
        renderItem={({item}) => (
          <Skeleton w={'47%'} key={item} h={175} rounded={'md'} p={2} />
        )}
        keyExtractor={(item: Props) => item.id}
      />
    </HStack>
  );
}
