import {FlatList} from 'react-native';
import React from 'react';
import {Stack} from 'native-base';
import {ProductCard, SectionHeader} from '../molecules';
import {ScreenNames} from '../../constants';

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
}

const Data: Props[] = [
  {
    id: '1',
    item: 'Macadamia Straight wear',
    volume: '1000ml',
    amount: '200 Birr',
  },
  {
    id: '2',
    item: 'Macadamia Straight wear',
    volume: '1000ml',
    amount: '200 Birr',
  },
  {
    id: '3',
    item: 'Macadamia Straight wear',
    volume: '1000ml',
    amount: '200 Birr',
  },
  {
    id: '4',
    item: 'Macadamia Straight wear',
    volume: '1000ml',
    amount: '200 Birr',
  },
];

export function ForHim() {
  return (
    <Stack>
      <SectionHeader label="For Him" navTo={ScreenNames.SeeAllProductsScreen} />
      <FlatList
        horizontal={true}
        data={Data}
        renderItem={({item}) => (
          <ProductCard
            item={item.item}
            volume={item.volume}
            amount={item.amount}
          />
        )}
        keyExtractor={(item: Props) => item.id}
      />
    </Stack>
  );
}
