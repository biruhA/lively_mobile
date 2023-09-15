import React from 'react';
import {Text, Image, Stack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {useAppDispatch} from '../../store/hooks';
import {setCategoryId} from '../../store/features/productSlice';
import {ApiImage} from '..';

interface Props {
  id: string;
  image: string;
  label: any;
  isLocal?: boolean;
}

export function CatalogueCard({id, image, label, isLocal = false}: Props) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  console.log(
    '🚀 ~ file: CatalogueCard.tsx:18 ~ CatalogueCard ~ image:',
    image,
  );

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setCategoryId(id));
        if (!isLocal) {
          navigation.navigate(ScreenNames.SeeAllProductsScreen, {label});
        } else {
          navigation.navigate(ScreenNames.Medicines);
        }
      }}>
      <Stack px={4} alignItems={'center'}>
        {isLocal ? (
          <Image source={image} alt="img" boxSize={81} />
        ) : (
          <ApiImage
            imageUrl={image}
            style={{width: 81, height: 81, borderRadius: 200}}
          />
        )}
        <Text>{label}</Text>
      </Stack>
    </TouchableOpacity>
  );
}
