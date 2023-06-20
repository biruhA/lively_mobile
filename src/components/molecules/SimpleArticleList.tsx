import {FlatList} from 'react-native';
import React, {useState} from 'react';
import {Button, Skeleton, Stack} from 'native-base';
import {GradientButtonSmall, gradientSmallVariant} from '../atoms';
import {useAppDispatch} from '../../store/hooks';
import {setSelectedProductVariantIndex} from '../../store/features/productSlice';
import {colors} from '../../theme/colors';
import {useArticleCategoriesQuery} from '../../store/services';
import {SimpleArticle} from '../skeletons';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {setSelectedcategory} from '../../store/features/browseSlice';

interface Props {
  Data: any;
}

export function SimpleArticleList({Data}: Props) {
  const {data, isLoading} = useArticleCategoriesQuery();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onPress = item => {
    console.log(
      '🚀 ~ file: SimpleArticleList.tsx:24 ~ onPress ~ item:',
      item?.name?.english,
    );
    dispatch(setSelectedcategory(item));
    navigation.navigate(ScreenNames.SeeAllArticles);
  };

  return (
    <Stack>
      {isLoading ? (
        <SimpleArticle />
      ) : (
        <FlatList
          data={data?.data}
          horizontal={true}
          renderItem={({item}) => (
            <Button
              mr={4}
              px={6}
              bg={colors.pureBlack}
              onPress={() => onPress(item)}>
              {item.name?.english}
            </Button>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </Stack>
  );
}
