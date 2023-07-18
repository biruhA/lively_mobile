import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Text, Image, Stack, Divider, HStack, useDisclose} from 'native-base';
import {fonts} from '../../theme/fonts';
import smileYellow from '../../assets/icons/smile_yellow.png';
import {colors} from '../../theme/colors';
import {StoreSheet} from '../organisms';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {useDispatch} from 'react-redux';
import {setStoreId} from '../../store/features/storeSlice';

interface Props {
  id: string;
  store: string;
  distance: string;
  rating: string;
  imageUrl: string;
  price: string;
  discountPresent: string | null;
  discountAmount: string | null;
}

export function PharmacyCardLarge({
  id,
  store,
  distance,
  rating,
  imageUrl,
  price,
  discountPresent,
  discountAmount,
}: Props): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Stack shadow={0} my={2} mx={1} bg="white" rounded={'md'}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setStoreId(id));
          navigation.navigate(ScreenNames.PharmacyDetail);
        }}>
        <HStack px={2} py={1} space={3} alignItems={'center'}>
          <Image
            rounded={'lg'}
            source={{
              uri: imageUrl,
            }}
            alt="Alternate Text"
            boxSize={100}
            resizeMode={'cover'}
          />
          <Stack space={2}>
            <Text style={fonts.subtitle1} numberOfLines={2}>
              {store}
            </Text>
            {discountAmount && discountPresent && (
              <HStack space={4}>
                <Text
                  style={{
                    color: colors.lightgreyText,
                    fontSize: 12,
                    fontWeight: '400',
                    fontFamily: 'Poppins-Regular',
                    textDecorationLine: 'line-through',
                  }}
                  numberOfLines={2}>
                  {discountAmount} Birr
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.primary,
                    fontWeight: '400',
                    fontFamily: 'Poppins-Regular',
                    textDecorationLine: 'line-through',
                  }}
                  numberOfLines={2}>
                  {discountPresent}% Off
                </Text>
              </HStack>
            )}
            <Text style={fonts.body1} numberOfLines={2}>
              {price} Birr
            </Text>
            <HStack space={2}>
              <Text style={fonts.caption} numberOfLines={1}>
                {distance} Away
              </Text>
              <Divider
                bg={'#E6E6E6'}
                thickness="1"
                mx="1"
                orientation="vertical"
              />
              <Image source={smileYellow} alt="Alternate Text" boxSize={4} />
              <Text style={fonts.caption} numberOfLines={1}>
                {rating}
              </Text>
            </HStack>
          </Stack>
        </HStack>
      </TouchableOpacity>
    </Stack>
  );
}
