import React from 'react';
import {Text, Image, Stack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {useAppDispatch} from '../../store/hooks';
import {setCategoryId} from '../../store/features/productSlice';

interface Props {
  id: string;
  image: string;
  label: any;
}

export function CatalogueCard({id, image, label}: Props) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setCategoryId(id));
        navigation.navigate(ScreenNames.SeeAllProductsScreen, {label});
      }}>
      <Stack px={4} alignItems={'center'}>
        <Image source={{uri: image}} alt="img" boxSize={81} />
        <Text>{label}</Text>
      </Stack>
    </TouchableOpacity>
  );
}
