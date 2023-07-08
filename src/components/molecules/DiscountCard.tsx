import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Box, Text, Image, Stack, HStack} from 'native-base';
import {fonts} from '../../theme/fonts';
import {HeartIcon} from '../atoms';
import {colors} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {useAppDispatch} from '../../store/hooks';
import {setProductId} from '../../store/features/productSlice';
import FastImage from 'react-native-fast-image';

interface Props {
  id: string;
  title: string;
  imageUrl: string;
  value: string;
  disount: string;
  price: string;
  mainStyle?: object;
}

export function DiscountCard({
  id,
  title,
  imageUrl,
  value,
  disount,
  price,
  mainStyle,
  promo_code,
}: Props): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  console.log('🚀 ~ file: DiscountCard.tsx:33 ~ promo_code:', promo_code);

  return (
    <Stack
      my={1}
      ml={1}
      mr={3}
      bg="white"
      rounded={'md'}
      p={2}
      w={150}
      style={[styles.main, mainStyle]}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setProductId(id));
          navigation.navigate(ScreenNames.DiscountDetail, {id, promo_code});
        }}>
        <Stack>
          <Box position={'absolute'} zIndex={1} right={0}>
            <HeartIcon />
          </Box>
          <FastImage
            style={{width: '100%', height: 95}}
            source={{
              uri: imageUrl,
            }}
            resizeMode={'cover'}
          />
          <Text pt={2} pb={1} style={fonts.body1} numberOfLines={2}>
            {title}
          </Text>
          <Text color={colors.lightgreyText} style={fonts.caption}>
            {value}
          </Text>
          {disount && (
            <HStack space={1}>
              <Text
                fontWeight={'semibold'}
                fontSize={12}
                textDecorationLine={'line-through'}
                color={colors.lightgreyText}>
                390 Birr
              </Text>
              <Text
                fontWeight={'semibold'}
                textDecoration={'underline'}
                style={{...styles.amount, color: colors.primary}}>
                60% Off
              </Text>
            </HStack>
          )}
          <Text fontWeight={700} fontSize={'lg'} color={colors.primary}>
            {price} Birr
          </Text>
        </Stack>
      </TouchableOpacity>
    </Stack>
  );
}

const styles = StyleSheet.create({
  main: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  amount: {
    ...fonts.caption,
    color: colors.pureBlack,
    fontSize: 12,
  },
});
