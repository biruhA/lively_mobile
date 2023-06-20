import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {FilterGoBack, GradientButton} from '../atoms';
import {Checkbox, Stack} from 'native-base';
import {FilterBrandItem} from '../molecules';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setBrand} from '../../store/features/filterSlice';
import {bodyTypes} from './FilterSheet';

interface Props {
  setSelectedBody: any;
}

export function FilterBodyBrand({setSelectedBody}: Props) {
  const {filterData} = useAppSelector(state => state.filter);
  const [groupValues, setGroupValues] = useState(filterData?.brand?.brands);
  const dispatch = useAppDispatch();

  function sendSelectedToApi() {
    let arrayOfId: string[] = [];
    groupValues.filter(item => {
      if (item?.isChecked === true) {
        arrayOfId.push(item.id);
      }
    });
    dispatch(setBrand(arrayOfId));
    setSelectedBody(bodyTypes.menu);
  }

  return (
    <Stack w={'100%'} py={2} space={4}>
      <FilterGoBack label="Brand" setSelectedBody={setSelectedBody} />
      <FlatList
        numColumns={2}
        data={filterData?.brand?.brands}
        renderItem={({item}) => (
          <FilterBrandItem
            value={item?.id}
            imageUrl={item?.brand_image?.url}
            groupValues={groupValues}
            setGroupValues={setGroupValues}
          />
        )}
        keyExtractor={item => item.id}
      />
      <GradientButton text="Apply" onPress={sendSelectedToApi} />
    </Stack>
  );
}
