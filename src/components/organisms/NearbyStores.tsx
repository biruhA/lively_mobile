import {FlatList} from 'react-native';
import React from 'react';
import {ScrollView, Stack} from 'native-base';
import {StoresCard, SectionHeader} from '../molecules';

interface Props {
  id: string;
  store: string;
  distance: string;
  rating: string;
}

const Data: Props[] = [
  {
    id: '1',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '2',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '3',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '4',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '1e',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '2e',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '3e',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
  {
    id: '4e',
    store: 'SAS Pharmacy',
    distance: '4.3 Km',
    rating: '4.8',
  },
];

export function NearbyStores() {
  return (
    <Stack>
      <SectionHeader label="Nearby Stores" navTo="Articles" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}>
        <FlatList
          contentContainerStyle={{alignSelf: 'flex-start'}}
          numColumns={Math.ceil(Data.length / 2)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={Data}
          renderItem={({item}) => (
            <StoresCard
              imageUrl={'https://wallpaperaccess.com/full/317501.jpg'}
              store={item.store}
              distance={item.distance}
              rating={item.rating}
              price="200"
            />
          )}
          keyExtractor={(item: Props) => item.id}
        />
      </ScrollView>
    </Stack>
  );
}
