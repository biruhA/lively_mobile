import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {useGetTagsQuery, useSearchMutation} from '../../store/services';
import {Button, Spinner} from 'native-base';
import {ListEmptyComponent} from '../atoms';
import {fonts} from '../../theme/fonts';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setSearchedText} from '../../store/features/searchSlice';

export function SearchTags() {
  const {userLocation} = useAppSelector(state => state.search);
  const dispatch = useAppDispatch();
  const [Search, result] = useSearchMutation();
  const {data, isLoading} = useGetTagsQuery();

  function onPress(newText) {
    dispatch(setSearchedText(newText));
    Search({
      type: 'All',
      search: newText,
      lat: userLocation?.lat,
      lon: userLocation?.lon,
    });
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FlatList
      contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
      data={data?.data}
      ListEmptyComponent={<ListEmptyComponent />}
      renderItem={({item}) => (
        <Button
          onPress={() => onPress(item?.name?.english)}
          bg={'#F3F3F3'}
          _text={{fontFamily: 'Poppins-Regular', color: 'black'}}
          size={'sm'}
          rounded={'full'}
          mx={2}
          my={1}>
          {item?.name?.english}
        </Button>
      )}
      keyExtractor={item => item.id}
    />
  );
}
