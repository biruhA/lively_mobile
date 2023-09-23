import {StyleSheet, Dimensions, View} from 'react-native';
import React from 'react';
import {Image, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {useDispatch} from 'react-redux';
import {setPromoCode} from '../../store/features/dealsSlice';
import FastImage from 'react-native-fast-image';
import {ApiImage} from '..';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = 236;
const ITEM_HEIGHT = 236;

export function CarouselImage2({item}) {
  const dispatch = useDispatch();

  return (
    <Pressable
      style={styles.itemContainer}
      onPress={() => {
        dispatch(setPromoCode(item?.promo_code));
      }}>
      <ApiImage
        imageUrl={item?.banner_image?.url}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
