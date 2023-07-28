import {Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Avatar, HStack, Image, useDisclose} from 'native-base';
import {fonts} from '../../theme/fonts';
import bell from '../../assets/icons/bell.png';
import cart from '../../assets/icons/cart.png';
import TouchableIcon from '../atoms/TouchableIcon';
import {useNavigation} from '@react-navigation/native';
import {LoginSheetState, ScreenNames} from '../../constants';
import {useAppSelector} from '../../store/hooks';
import {LoginSheet} from '../sheets';

export function HomeScreenHeader() {
  const {token, user, isLoggedIn} = useAppSelector(state => state.auth);
  console.log(
    '🚀 ~ file: HomeScreenHeader.tsx:15 ~ HomeScreenHeader ~ user:',
    user,
  );
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
        <Text style={fonts.subtitle1}>HI {user?.name || ''} 👋</Text>
        <HStack alignItems={'center'} space={5}>
          <TouchableIcon
            image={require('../../assets/icons/language.png')}
            boxSize={5}
            onPress={() => {}}
          />
          <TouchableIcon
            image={require('../../assets/icons/bell.png')}
            boxSize={5}
            onPress={() => {
              if (!isLoggedIn) {
                onOpen();
              }
              if (isLoggedIn) {
                navigation.navigate(ScreenNames.Notification);
              }
            }}
          />
          <TouchableIcon
            image={require('../../assets/icons/heart-bold.png')}
            boxSize={5}
            onPress={() => {}}
          />
        </HStack>
      </HStack>
      {/* {!isLoggedIn && ( */}
      <LoginSheet
        isOpen={isOpen}
        onClose={onClose}
        action={ScreenNames.Notification}
        payload=""
      />
      {/* )} */}
    </>
  );
}
