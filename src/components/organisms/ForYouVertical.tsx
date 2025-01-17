import {FlatList} from 'react-native';
import React from 'react';
import {Stack} from 'native-base';
import {ForYouVerticalCard, SectionHeader} from '../molecules';

interface Props {
  id: string;
  name: string;
  list: string;
}

const Data: Props[] = [
  {
    id: '1',
    name: 'Konjo Collection',
    list: 'Facial Cleanser, Acne Cleanser, Acne',
  },
  {
    id: '2',
    name: 'Konjo Collection',
    list: 'Facial Cleanser, Acne Cleanser, Acne',
  },
  {
    id: '3',
    name: 'Konjo Collection',
    list: 'Facial Cleanser, Acne Cleanser, Acne',
  },
  {
    id: '4',
    name: 'Konjo Collection',
    list: 'Facial Cleanser, Acne Cleanser, Acne',
  },
];

export function ForYouVertical() {
  return (
    <Stack>
      <SectionHeader label="For You" navTo="Articles" />
      <FlatList
        horizontal={true}
        data={Data}
        renderItem={({item}) => (
          <ForYouVerticalCard name={item.name} list={item.list} />
        )}
        keyExtractor={(item: Props) => item.id}
      />
    </Stack>
  );
}
