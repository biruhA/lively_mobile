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
  isLocal?: boolean;
}

export function CatalogueCard({id, image, label, isLocal = false}: Props) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

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
        <Image source={isLocal ? image : {uri: image}} alt="img" boxSize={81} />
        <Text>{label}</Text>
      </Stack>
    </TouchableOpacity>
  );
}
