import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {HStack} from 'native-base';
import {colors} from '../../theme/colors';
import {ToggleIcon} from '..';
import {Icons} from '../../theme/icons';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setSelectedRate} from '../../store/features/productSlice';

export function Rating({initalActive = 0, data}: any) {
  const navigation = useNavigation();
  const [active, setActive] = useState(initalActive);

  function handleNavigation(rate: number) {
    setActive(rate);
    navigation.navigate(ScreenNames.ReviewStore, {rate, data});
  }
  return (
    <HStack
      p={3}
      bg="white"
      rounded={'xs'}
      borderColor={colors.grey}
      borderWidth={0.1}
      justifyContent={'space-evenly'}>
      <ToggleIcon
        id={1}
        inactiveImage={Icons.rating.very_happy.light}
        activeImage={Icons.rating.very_happy.dark}
        onPress={() => handleNavigation(1)}
        isActive={active}
      />
      <ToggleIcon
        id={2}
        inactiveImage={Icons.rating.happy.light}
        activeImage={Icons.rating.happy.dark}
        onPress={() => handleNavigation(2)}
        isActive={active}
      />
      <ToggleIcon
        id={3}
        inactiveImage={Icons.rating.neutral.light}
        activeImage={Icons.rating.neutral.dark}
        onPress={() => handleNavigation(3)}
        isActive={active}
      />
      <ToggleIcon
        id={4}
        inactiveImage={Icons.rating.sad.light}
        activeImage={Icons.rating.sad.dark}
        onPress={() => handleNavigation(4)}
        isActive={active}
      />
      <ToggleIcon
        id={5}
        inactiveImage={Icons.rating.very_sad.light}
        activeImage={Icons.rating.very_sad.dark}
        onPress={() => handleNavigation(5)}
        isActive={active}
      />
    </HStack>
  );
}
