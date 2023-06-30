import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, Button, HStack} from 'native-base';
import {colors} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../theme/fonts';
import {useAppDispatch} from '../../store/hooks';
import {setCategoryId} from '../../store/features/productSlice';

interface Props {
  id: string;
  label: string;
  navTo: string;
}

export function SectionHeader({id, label, navTo}: Props): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  function onPressHandler() {
    dispatch(setCategoryId(id));
    navigation.navigate(navTo, {label});
  }

  return (
    <HStack alignItems={'center'} justifyContent={'space-between'} pt={2}>
      <Text style={fonts.subtitle1}>{label}</Text>
      <TouchableOpacity onPress={onPressHandler}>
        <Text color={colors.lightgreyText}> See All</Text>
      </TouchableOpacity>
    </HStack>
  );
}
