import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
  Button,
  Share,
} from 'react-native';
import React, {useState} from 'react';
import {Text, Stack, HStack, Image, Box} from 'native-base';
import {fonts} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {useAppDispatch} from '../../store/hooks';
import {setProductId} from '../../store/features/productSlice';
import FastImage from 'react-native-fast-image';
import {Icons, Images} from '../../theme/icons';
import {ShadowCard} from '../cards';
import {ApiImage, HeartIcon} from '..';
import {useWishlistMutation} from '../../store/services';

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
  imageUrl: string;
  mainStyle?: object;
  navTo?: string;
  isWishlist?: boolean;
}

export function ProductCard({
  id,
  item,
  volume,
  amount,
  imageUrl,
  isWishlist,
  navTo,
  mainStyle,
}: Props): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  function onPress() {
    dispatch(setProductId(id));
    if (navTo) {
      navigation.navigate(navTo);
    }
    navigation.navigate(ScreenNames.ProductDetailScreen);
  }

  return (
    <ShadowCard style={[styles.main, mainStyle]}>
      <TouchableOpacity onPress={onPress}>
        <Stack space={1}>
          <Box position={'absolute'} zIndex={1} right={0}>
            <HeartIcon id={id} init={isWishlist} />
          </Box>
          <ApiImage style={styles.img} imageUrl={imageUrl} />
          <Stack px={2}>
            <Text py={2} style={fonts.body1} numberOfLines={2}>
              {item}
            </Text>
            <Text style={fonts.caption}>{volume}</Text>
            {amount !== 0 && (
              <HStack>
                <Text fontWeight={'semibold'} style={styles.amount}>
                  From{' '}
                </Text>
                <Text
                  fontWeight={'semibold'}
                  style={{...styles.amount, color: colors.primary}}>
                  {amount} Birr
                </Text>
              </HStack>
            )}
          </Stack>
        </Stack>
      </TouchableOpacity>
    </ShadowCard>
  );
}

const styles = StyleSheet.create({
  main: {
    width: 150,
    borderRadius: 8,
    marginRight: 15,
    marginBottom: 5,
  },
  img: {
    width: '100%',
    height: 95,
  },
  amount: {
    ...fonts.caption,
    color: colors.pureBlack,
    fontSize: 12,
    marginBottom: 5,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  blur: {
    position: 'absolute',
    alignSelf: 'center',
    marginBottom: 5,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  blur: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
