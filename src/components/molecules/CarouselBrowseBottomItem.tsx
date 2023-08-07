import {View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {HStack, Image, Stack, Text} from 'native-base';
import {fonts} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {setSelectedEventId} from '../../store/features/browseSlice';
import {useAppDispatch} from '../../store/hooks';
import {setProductId} from '../../store/features/productSlice';
import FastImage from 'react-native-fast-image';

const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(WIDTH * 0.9);
const ITEM_HEIGHT = 170;

export function CarouselBrowseBottomItem({item}) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setProductId(item?.id));
        navigation.navigate(ScreenNames.ArticleDetail);
      }}
      style={styles.itemContainer}>
      <FastImage
        style={{width: '100%', height: '100%'}}
        source={{
          uri: item?.cover_image?.url,
        }}
        resizeMode={'cover'}
      />
      <Stack position={'absolute'} bottom={0} left={0} right={0} p={4}>
        <Text
          style={[fonts.heading6, {color: colors.pureWhite, lineHeight: 37}]}
          numberOfLines={2}>
          {item?.title?.english}
        </Text>
        <Text style={fonts.caption}>Emotional Wellness</Text>
        <HStack justifyContent={'space-between'}>
          <Text style={[fonts.button2, {color: colors.pureWhite}]}>
            {item?.reading_time_english} read
          </Text>
          <Text style={[fonts.button2, {color: colors.pureWhite}]}>
            {new Date(item?.published_at).toDateString().split(' ')[1]}{' '}
            {new Date(item?.published_at).toDateString().split(' ')[2]}
          </Text>
        </HStack>
      </Stack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
  },
});
