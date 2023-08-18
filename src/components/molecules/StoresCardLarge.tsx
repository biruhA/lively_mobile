import {TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Text, Image, Stack, Divider, HStack, useDisclose} from 'native-base';
import {fonts} from '../../theme/fonts';
import smileYellow from '../../assets/icons/smile_yellow.png';
import {colors} from '../../theme/colors';
import {StoreSheet} from '../organisms';
import {useAppDispatch} from '../../store/hooks';
import {setStoreId} from '../../store/features/storeSlice';
import FastImage from 'react-native-fast-image';
import {Images} from '../../theme/icons';

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

export function StoresCardLarge({
  id,
  store,
  distance,
  rating,
  imageUrl,
  price,
  discountPresent,
  discountAmount,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <Stack
      my={2}
      ml={1}
      mr={3}
      bg="white"
      rounded={'md'}
      w={'100%'}
      overflow={'hidden'}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setStoreId(id));
          onOpen();
        }}>
        <HStack px={3} py={4} space={3} alignItems={'center'}>
          <FastImage
            style={{width: 121, height: 74}}
            source={!hasLoaded ? Images.placeholder : {uri: imageUrl}}
            resizeMode={!hasLoaded ? 'cover' : 'contain'}
            onLoadEnd={() => {
              setHasLoaded(true);
            }}
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
      <StoreSheet isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}
