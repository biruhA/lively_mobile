import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Image, Stack, Divider, HStack, useDisclose} from 'native-base';
import {fonts} from '../../theme/fonts';
import smileYellow from '../../assets/icons/smile_yellow.png';
import location from '../../assets/icons/location.png';
import {colors} from '../../theme/colors';
import {StoreSheet} from '../organisms';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setStoreId} from '../../store/features/storeSlice';
import {LoginSheetState, ScreenNames} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {LoginSheet} from '../sheets';
import {ApiImage} from '..';

interface Props {
  id: string;
  store: string;
  distance: string;
  rating: string;
  isOpenNow: boolean;
  imageUrl: string;
}

export function PlacesPharmacyCard({
  id,
  store,
  distance,
  rating,
  isOpenNow,
  imageUrl,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {isOpen, onOpen, onClose} = useDisclose();
  const {isLoggedIn, inAppLoggedIn} = useAppSelector(state => state.auth);

  return (
    <Stack my={2} bg="white" rounded={'md'}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setStoreId(id));
          if (isLoggedIn || (!isLoggedIn && inAppLoggedIn)) {
            navigation.navigate(ScreenNames.PlaceDetails, {id});
          } else {
            onOpen();
          }
        }}>
        <HStack alignItems={'center'} space={4} justifyContent={'flex-start'}>
          <ApiImage imageUrl={imageUrl} style={{width: 104, height: 87}} />
          <Stack space={1} w={'65%'}>
            <Text style={fonts.subtitle1} numberOfLines={2}>
              {store}
            </Text>
            {isOpenNow ? (
              <Text
                style={[fonts.caption, {color: colors.primary}]}
                numberOfLines={1}>
                Open Now
              </Text>
            ) : (
              <Text
                style={[fonts.caption, {color: colors.error}]}
                numberOfLines={1}>
                Closed
              </Text>
            )}
            <HStack space={2} alignItems={'center'}>
              <Image source={location} alt="Alternate Text" boxSize={4} />
              <Text style={fonts.caption} numberOfLines={1}>
                {distance} Away
              </Text>
            </HStack>
          </Stack>
        </HStack>
      </TouchableOpacity>
      <LoginSheet
        isOpen={isOpen}
        onClose={onClose}
        action={ScreenNames.PlaceDetails}
        payload={id}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  discountPresentText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'line-through',
  },
  discountAmountText: {
    color: colors.lightgreyText,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'line-through',
  },
});
