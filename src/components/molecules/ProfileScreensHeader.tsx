import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HStack, Image} from 'native-base';
import {fonts} from '../../theme/fonts';
import leftArrow from '../../assets/icons/left-arrow.png';

export function ProfileScreensHeader({navigationTo, screenName}: any) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigationTo)}>
      <HStack alignItems={'flex-start'} space={3}>
        <Image source={leftArrow} alt="leftArrow" w={2} h={5} />
        <Text style={fonts.subtitle2}>{screenName}</Text>
      </HStack>
    </TouchableOpacity>
  );
}
