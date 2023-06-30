import {ScrollView, FlatList} from 'react-native';
import React from 'react';
import {Stack} from 'native-base';
import {colors} from '../theme/colors';
import {
  BrowseHeader,
  CatalogList,
  IconOnlyHeader,
  PlacesHeader,
  StoresCardLarge,
} from '../components/molecules';
import {Carousel1} from '../components/organisms';

interface Props {
  id?: string;
  label: string;
  value: string;
}

const DATA = [
  {
    id: '1',
    label: 'SAS Pharmacy',
    value: '4.3 Km',
  },
  {
    id: '2',
    label: 'SAS Pharmacy',
    value: '4.3 Km',
  },
  {
    id: '3',
    label: 'SAS Pharmacy',
    value: '4.3 Km',
  },
  {
    id: '4',
    label: 'SAS Pharmacy',
    value: '4.3 Km',
  },
  {
    id: '5',
    label: 'SAS Pharmacy',
    value: '4.3 Km',
  },
];

export function PlaceScreen() {
  return (
    <Stack px={'16px'} bg={colors.pureWhite} h={'full'} pb={2}>
      <ScrollView>
        <PlacesHeader />
        <Carousel1 />
        <Stack py={6} />
        <CatalogList />
        <Stack py={2} />
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <StoresCardLarge
              id="1"
              store={item.label}
              distance={item.value}
              rating="4.8"
              imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              price="200"
              discountPresent="200"
              discountAmount="200"
            />
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </Stack>
  );
}
