import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Image, Input, Pressable} from 'native-base';
import search from '../../assets/icons/search.png';
import {colors} from '../../theme/colors';
import cameraSearch from '../../assets/icons/camera-search.png';
import {useSearchMutation} from '../../store/services';
import {ScreenNames} from '../../constants';
import close from '../../assets/icons/close.png';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setSearchedText} from '../../store/features/searchSlice';
import {useDebounce} from '../../hooks';
import {filterLabel} from '../../screens';

interface Props {
  hasCamera?: boolean;
}
export function SearchBar({hasCamera = false}: Props) {
  const dispatch = useAppDispatch();
  const [Search, result] = useSearchMutation();
  const {searchedText, userLocation, selectedFilter} = useAppSelector(
    state => state.search,
  );
  const debouncedText = useDebounce(searchedText, 500);

  function handleTextChange(newText) {
    dispatch(setSearchedText(newText));
  }

  useEffect(() => {
    if (debouncedText) {
      console.log(
        '🚀 ~ file: SearchBar.tsx:31 ~ useEffect ~ debouncedText:',
        debouncedText,
      );
      Search({
        type: filterLabel[selectedFilter],
        search: debouncedText,
        lat: userLocation?.lat,
        lon: userLocation?.lon,
      });
    }
  }, [debouncedText, selectedFilter]);

  return (
    <Input
      py={2}
      variant="rounded"
      size={'lg'}
      borderWidth={0}
      bg={colors.unselected}
      w={'100%'}
      value={searchedText}
      onChangeText={handleTextChange}
      InputLeftElement={
        <Image source={search} alt="search" size="24px" ml={4} />
      }
      InputRightElement={
        <>
          {searchedText && (
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => dispatch(setSearchedText(''))}>
              <Image source={close} alt="camera search" size="20px" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={
              hasCamera
                ? {marginRight: 10, display: 'flex'}
                : {marginRight: 10, display: 'none'}
            }>
            <Image
              source={cameraSearch}
              alt="camera search"
              size="24px"
              ml={4}
            />
          </TouchableOpacity>
        </>
      }
      placeholder="Search for a products, articles, Pharmacies"
    />
  );
}
