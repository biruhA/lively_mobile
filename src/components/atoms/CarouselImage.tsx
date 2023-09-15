import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {Image, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {useDispatch} from 'react-redux';
import {setPromoCode} from '../../store/features/dealsSlice';
import FastImage from 'react-native-fast-image';
import {ApiImage} from '..';

const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(WIDTH * 0.9);
const ITEM_HEIGHT = 170;

export function CarouselImage({item, variant = 'md'}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const variant_lg = variant === 'lg';
  const variant_md = variant === 'md';
  const variant_sm = variant === 'sm';

  return (
    <Pressable
      style={[
        variant_lg && styles.itemContainer_lg,
        variant_md && styles.itemContainer_md,
        variant_sm && styles.itemContainer_sm,
      ]}
      onPress={() => {
        dispatch(setPromoCode(item?.promo_code));
        navigation.navigate(ScreenNames.Discount, {id: item.id});
      }}>
      <ApiImage
        imageUrl={item?.banner_image?.url}
        style={{width: '100%', height: 170}}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer_lg: {
    width: WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  itemContainer_md: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemContainer_sm: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
