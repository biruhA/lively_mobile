import {TouchableOpacity} from 'react-native';
import React from 'react';
import {HStack, Image, Text} from 'native-base';
import {fonts} from '../../theme/fonts';
import {bodyTypes} from '../organisms';
import leftArrow from '../../assets/icons/left-arrow.png';
import {colors} from '../../theme/colors';

interface Props {
  label: string;
  setSelectedBody: any;
}

export function FilterGoBack({label, setSelectedBody}: Props) {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedBody(bodyTypes.menu);
      }}>
      <HStack alignItems={'center'} space={3}>
        <Image
          source={leftArrow}
          alt="leftArrow"
          boxSize={3}
          mb={1}
          resizeMode="contain"
        />
        <Text style={[fonts.subtitle1, {fontSize: 16}]}>Filter by {label}</Text>
      </HStack>
    </TouchableOpacity>
  );
}
