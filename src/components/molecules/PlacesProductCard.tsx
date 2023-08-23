import {TouchableOpacity, StyleSheet, Platform} from 'react-native';
import React, {useState} from 'react';
import {Text, Stack, HStack, Image} from 'native-base';
import {fonts} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {useAppDispatch} from '../../store/hooks';
import {setProductId} from '../../store/features/productSlice';
import FastImage from 'react-native-fast-image';
import {Images} from '../../theme/icons';
import {ShadowCard} from '../cards';

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
  imageUrl: string;
  mainStyle?: object;
  navTo?: string;
}

export function PlacesProductCard({
  id,
  item,
  volume,
  amount,
  imageUrl,
  navTo,
  mainStyle,
}: Props): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [hasLoaded, setHasLoaded] = useState(false);

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
          <FastImage
            style={styles.img}
            source={!hasLoaded ? Images.placeholder : {uri: imageUrl}}
            resizeMode={!hasLoaded ? 'cover' : 'contain'}
            onLoadEnd={() => {
              setHasLoaded(true);
            }}
          />
          <Stack px={2}>
            <Text py={2} style={fonts.body1} numberOfLines={2}>
              {item}
            </Text>
            <Text style={fonts.caption}>{volume}</Text>
            {amount !== 0 && (
              <HStack>
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
