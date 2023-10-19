import {View, Text} from 'react-native';
import React from 'react';
import {HStack, useDisclose} from 'native-base';
import {useAppSelector} from '../../store/hooks';
import {NotificationButton} from '../atoms';
import {ScreenNames} from '../../constants';
import {fonts} from '../../theme/fonts';
import {LoginSheet} from '../sheets';
import TouchableIcon from '../atoms/TouchableIcon';
import {Icons} from '../../theme/icons';
import {useNavigation} from '@react-navigation/native';

export function MainScreenHeader({label}: string) {
  const navigation = useNavigation();
  const {isOpen, onClose, onOpen} = useDisclose();

  return (
    <>
      <HStack
        px={4}
        bg={'white'}
        alignItems={'center'}
        justifyContent={'space-between'}
        py={4}>
        <Text style={fonts.subtitle1}>{label}</Text>
        <HStack alignItems={'center'} space={4} px={3}>
          <NotificationButton onOpen={onOpen} />
          <TouchableIcon
            image={Icons.heart.bold}
            onPress={() => {
              navigation.navigate(ScreenNames.WishList);
            }}
            boxSize={4}
          />
        </HStack>
      </HStack>
      <LoginSheet
        isOpen={isOpen}
        onClose={onClose}
        action={ScreenNames.Notification}
        payload=""
      />
    </>
  );
}
