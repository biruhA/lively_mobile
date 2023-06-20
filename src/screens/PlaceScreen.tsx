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
              store={item.label}
              distance={item.value}
              rating="4.8"
            />
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </Stack>
  );
}
