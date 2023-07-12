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
  placeholder: 'Search for a products, articles, Pharmacies';
}
export function SearchBarPlaces({hasCamera = false, placeholder}: Props) {
  const dispatch = useAppDispatch();
  const {searchedText} = useAppSelector(state => state.search);

  function handleTextChange(newText) {
    dispatch(setSearchedText(newText));
  }

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
      placeholder={placeholder}
    />
  );
}
