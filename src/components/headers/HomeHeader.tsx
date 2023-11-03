import React from 'react';
import {HStack, Image, Stack, Text, useDisclose} from 'native-base';
import {Icons} from '../../theme/icons';
import TouchableIcon from '../atoms/TouchableIcon';
import {LoginSheet, NotificationButton} from '..';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';

export function HomeHeader() {
  const navigation = useNavigation();
  const {isOpen, onClose, onOpen} = useDisclose();

  return (
    <>
      <HStack
        w={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        px={4}>
        <HStack alignItems={'center'} space={2}>
          <Image source={Icons.appIcon.round} boxSize={35} />
          <Image source={Icons.livelyText} h={10} w={58} resizeMode="contain" />
        </HStack>
        <HStack alignItems={'center'}>
          <HStack alignItems={'center'} space={2}>
            <TouchableIcon
              image={Icons.language}
              onPress={() => {
                // navigation.navigate(ScreenNames.WishList);
              }}
              boxSize={6}
            />
            <NotificationButton onOpen={onOpen} />
          </HStack>
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
