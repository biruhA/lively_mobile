import {Platform, Text} from 'react-native';
import React from 'react';
import {HStack, Stack} from 'native-base';
import {CustomBarButton} from '../atoms';
import {ScreenNames} from '../../constants';
import {Icons} from '../../theme/icons';
import {useNavigation, useRoute} from '@react-navigation/native';

export function BottomTabBar() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <HStack
      position={'absolute'}
      bottom={0}
      bg={'white'}
      h={Platform.OS === 'ios' ? 55 : 75}
      w={'100%'}
      shadow={'1'}
      justifyContent={'space-evenly'}>
      <CustomBarButton
        navigation={navigation}
        routeName={route?.name}
        label={ScreenNames.Home}
        active={Icons.home.active}
        inactive={Icons.home.inactive}
      />
      <CustomBarButton
        navigation={navigation}
        routeName={route?.name}
        label={ScreenNames.WishList}
        active={Icons.wishlist.active}
        inactive={Icons.wishlist.inactive}
      />
      <CustomBarButton
        navigation={navigation}
        routeName={route?.name}
        navTo={ScreenNames.Settings}
        label={'Settings'}
        active={Icons.setting.active}
        inactive={Icons.setting.inactive}
      />
      {/* <CustomBarButton
        navigation={navigation}
        routeName={route?.name}
        label={ScreenNames.Browse}
        active={Icons.browse.active}
        inactive={Icons.browse.inactive}
      />
      <CustomBarButton
        navigation={navigation}
        routeName={route?.name}
        label={ScreenNames.Place}
        active={Icons.place.active}
        inactive={Icons.place.inactive}
      /> */}
    </HStack>
  );
}
