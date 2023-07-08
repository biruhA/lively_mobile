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
  const {token, user} = useAppSelector(state => state.auth);

  const {isOpen, onClose, onOpen} = useDisclose();
  const [state, setState] = useState();

  useEffect(() => {
    if (state === LoginSheetState.LoggedIn) {
      onClose();
      navigation.navigate(ScreenNames.Notification);
    }
  }, [state]);

  const navigation = useNavigation();

  return (
    <>
      <HStack
        px={4}
        bg={'white'}
        alignItems={'center'}
        justifyContent={'space-between'}
        py={4}>
        <Text style={fonts.subtitle1}>HI {token ? user?.name : ''} 👋</Text>
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
              if (token) {
                navigation.navigate(ScreenNames.Notification);
                return;
              }
              onOpen();
            }}
          />
          <TouchableIcon
            image={require('../../assets/icons/heart-bold.png')}
            boxSize={5}
            onPress={() => {}}
          />
        </HStack>
      </HStack>
      <LoginSheet isOpen={isOpen} onClose={onClose} setState={setState} />
    </>
  );
}
