import {FlatList} from 'react-native';
import React, {useState} from 'react';
import {Stack} from 'native-base';
import {GradientButtonSmall, gradientSmallVariant} from '../atoms';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setSelectedFilter} from '../../store/features/searchSlice';
import {useSearchMutation} from '../../store/services';
import {filterLabel} from '../../screens';
import EnableLocation from '../atoms/EnableLocation';

const Data = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'Products',
  },
  {
    id: 3,
    label: 'Stores',
  },
  {
    id: 4,
    label: 'Articles',
  },
];

export function SearchList() {
  const dispatch = useAppDispatch();
  const {searchedText, userLocation, selectedFilter} = useAppSelector(
    state => state.search,
  );
  const [Search, result] = useSearchMutation();

  const onPress = (label: string) => {
    dispatch(setSelectedFilter(label));
    Search({
      type: filterLabel[label],
      search: searchedText,
      lat: userLocation?.lat,
      lon: userLocation?.lon,
    });
  };

  return (
    <Stack>
      <FlatList
        data={Data}
        horizontal={true}
        renderItem={({item}) => (
          <GradientButtonSmall
            variant={'rounded'}
            text={item?.label}
            onPress={() => onPress(item?.label)}
            isActive={selectedFilter === item?.label}
          />
        )}
        keyExtractor={item => item.id}
      />
      <EnableLocation />
    </Stack>
  );
}
