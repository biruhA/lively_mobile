import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HStack, Image} from 'native-base';
import {fonts} from '../../theme/fonts';
import leftArrow from '../../assets/icons/left-arrow.png';

export function ProfileScreensHeader({navigationTo, screenName}: any) {
  const navigation = useNavigation();
  return (
    <HStack alignItems={'center'} space={2}>
      <TouchableOpacity onPress={() => navigation.navigate(navigationTo)}>
        <HStack alignItems={'flex-start'} space={3}>
          <Image source={leftArrow} alt="leftArrow" w={2} h={5} />
          <Text style={[fonts.subtitle1, {fontSize: 16}]}>{screenName}</Text>
        </HStack>
      </TouchableOpacity>
    </HStack>
  );
}
