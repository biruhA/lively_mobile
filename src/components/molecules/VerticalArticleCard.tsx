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
import {setSelectedArticleId} from '../../store/features/browseSlice';
import FastImage from 'react-native-fast-image';

interface Props {
  id: string;
  title: string;
  readTime: string;
  catagoure: string;
  imageUrl: string;
  mainStyle?: object;
  navTo?: string;
}

export function VerticalArticleCard({
  id,
  title,
  readTime,
  catagoure,
  imageUrl,
  navTo,
  mainStyle,
}: Props): JSX.Element {
  console.log('🚀 ~ file: VerticalArticleCard.tsx:33 ~ title:', title);
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
          dispatch(setSelectedArticleId(id));
          if (navTo) {
            navigation.navigate(navTo);
            return;
          }
          navigation.navigate(ScreenNames.ProductDetailScreen);
        }}>
        <Stack h={200}>
          <FastImage
            style={{width: '100%', height: 120}}
            source={{
              uri: imageUrl,
            }}
            resizeMode={'cover'}
          />
          <Stack px={2} py={1} justifyContent={'space-between'} h={82}>
            <Text w={150} pt={2} pb={1} style={fonts.body1} numberOfLines={2}>
              {title}
            </Text>
            <HStack pt={1}>
              <Text fontWeight={'semibold'} style={styles.amount}>
                {readTime}
              </Text>
              <Divider thickness="1" mx="2" h={4} orientation={'vertical'} />
              <Text
                fontWeight={'semibold'}
                style={{...styles.amount, color: colors.primary}}>
                {catagoure}
              </Text>
            </HStack>
          </Stack>
        </Stack>
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
