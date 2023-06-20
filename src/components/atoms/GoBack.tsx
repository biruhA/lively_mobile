import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {Button, HStack, Image} from 'native-base';
import leftArrow from '../../assets/icons/left-arrow.png';
import {fonts} from '../../theme/fonts';
import {useNavigation} from '@react-navigation/native';

interface Props {
  label?: string;
}

export function GoBack({label = 'Sign Up'}: Props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <HStack alignItems={'flex-start'} space={3}>
        <Image source={leftArrow} alt="leftArrow" w={2} h={5} />
        <Text style={fonts.subtitle2}>{label}</Text>
      </HStack>
    </TouchableOpacity>
  );
}
