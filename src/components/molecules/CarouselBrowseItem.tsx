import {Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import TouchableIcon from '../atoms/TouchableIcon';
import {Image, Pressable, Stack} from 'native-base';
import {EventGlassmorphisem} from './EventGlassmorphisem';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {setSelectedEventId} from '../../store/features/browseSlice';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';

const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(WIDTH * 0.9);
const ITEM_HEIGHT = 200;

interface Props {
  item: any;
}

export function CarouselBrowseItem({item}: Props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        dispatch(setSelectedEventId(item.id));
        navigation.navigate(ScreenNames.EventDetail);
      }}
      style={styles.itemContainer}>
      <TouchableIcon
        image={require(`../../assets/icons/bookmark.png`)}
        boxSize={9}
        onPress={() => {
          console.log('cat');
        }}
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 10,
          right: 15,
        }}
      />
      <FastImage
        style={{width: '100%', height: '100%'}}
        source={{
          uri: item?.cover_image?.url,
        }}
        resizeMode={'cover'}
      />
      <Stack position={'absolute'} w={'100%'} bottom={0} py={2}>
        <EventGlassmorphisem item={item} />
      </Stack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
