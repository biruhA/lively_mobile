import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Box, Text, Image, Stack, HStack, Divider} from 'native-base';
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
  item: string;
  readingTime: string;
  category: string;
  imageUrl: string;
  mainStyle?: object;
  navTo?: string;
}

export function HorizontalArticleCard({
  id,
  item,
  readingTime,
  category,
  imageUrl,
  navTo,
  mainStyle,
}: Props): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <Stack
      my={1}
      ml={1}
      mr={3}
      bg="white"
      rounded={'md'}
      style={[styles.main, mainStyle]}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setProductId(id));
          if (navTo) {
            navigation.navigate(navTo);
          }
          navigation.navigate(ScreenNames.ArticleDetail);
        }}>
        <HStack justifyContent={'space-between'}>
          <Stack p={2}>
            <Text
              pt={2}
              pb={1}
              style={fonts.body1}
              numberOfLines={2}
              w={200}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {item}
            </Text>
            <HStack>
              <Text fontWeight={'semibold'} style={styles.amount}>
                {readingTime} read
              </Text>
              <Divider thickness="1" mx="2" h={4} orientation={'vertical'} />
              <Text
                fontWeight={'semibold'}
                style={{...styles.amount, color: colors.primary}}>
                {category}
              </Text>
            </HStack>
          </Stack>
          <FastImage
            style={{width: 100, height: 85, margin: 8}}
            source={{
              uri: imageUrl,
            }}
            resizeMode={'cover'}
          />
        </HStack>
      </TouchableOpacity>
    </Stack>
  );
}

const styles = StyleSheet.create({
  main: {
    shadowColor: 'rgba(25, 38, 32, 0.3)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
  amount: {
    ...fonts.caption,
    color: colors.pureBlack,
    fontSize: 12,
  },
});
