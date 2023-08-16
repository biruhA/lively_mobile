import {FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import {HStack, Spinner, Stack} from 'native-base';
import {GradientButtonSmall, gradientSmallVariant} from '../atoms';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../store/hooks';
import {useSubCategoriesByCategoryQuery} from '../../store/services';
import {setSelectedSubCategoryId} from '../../store/features/productSlice';
import {useFocusEffect} from '@react-navigation/native';

interface Props {
  variant?: gradientSmallVariant;
}

export function CatalogList({variant = 'rounded'}: Props) {
  const dispatch = useDispatch();
  const {selectedCategoryId, selectedSubCategoryId} = useAppSelector(
    state => state.product,
  );
  const {data, isLoading} = useSubCategoriesByCategoryQuery(selectedCategoryId);

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(setSelectedSubCategoryId(''));
      };
    }, []),
  );

  const onPress = (id: string) => {
    dispatch(setSelectedSubCategoryId(id));
  };

  return (
    <HStack>
      <GradientButtonSmall
        variant={variant}
        text={'All'}
        onPress={() => onPress('')}
        isActive={selectedSubCategoryId === ''}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          data={data?.data?.sub_categories}
          horizontal={true}
          renderItem={({item}) => (
            <GradientButtonSmall
              variant={variant}
              text={item?.name?.english}
              onPress={() => onPress(item?.id)}
              isActive={selectedSubCategoryId === item?.id}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </HStack>
  );
}
