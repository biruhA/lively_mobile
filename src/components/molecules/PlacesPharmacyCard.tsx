import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Image, Stack, Divider, HStack, useDisclose} from 'native-base';
import {fonts} from '../../theme/fonts';
import smileYellow from '../../assets/icons/smile_yellow.png';
import location from '../../assets/icons/location.png';
import {colors} from '../../theme/colors';
import {StoreSheet} from '../organisms';
import {useAppDispatch} from '../../store/hooks';
import {setStoreId} from '../../store/features/storeSlice';
import {LoginSheetState, ScreenNames} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {LoginSheet} from '../sheets';

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
  const [state, setState] = useState();
  const {isOpen, onOpen, onClose} = useDisclose();

  useEffect(() => {
    if (state === LoginSheetState.LoggedIn) {
      onClose();
      navigation.navigate(ScreenNames.PlaceDetails, {id});
    }
  }, [state]);

  return (
    <Stack my={2} bg="white" rounded={'md'} overflow={'hidden'}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setStoreId(id));
          onOpen();
        }}>
        <HStack alignItems={'center'} space={4}>
          <Image
            source={{
              uri: imageUrl,
            }}
            alt="Alternate Text"
            w={104}
            h={87}
            resizeMode={'contain'}
          />
          <Stack space={1}>
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
              {/* <Divider
                bg={'#E6E6E6'}
                thickness="1"
                mx="1"
                orientation="vertical"
              />
              <Image source={smileYellow} alt="Alternate Text" boxSize={4} />
              <Text style={fonts.caption} numberOfLines={1}>
                {rating}
              </Text>
              <Text style={fonts.caption} numberOfLines={1}>
                rating
              </Text> */}
            </HStack>
          </Stack>
        </HStack>
      </TouchableOpacity>
      <LoginSheet isOpen={isOpen} onClose={onClose} setState={setState} />
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
