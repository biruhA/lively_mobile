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
          <Image
            source={{
              uri: imageUrl,
            }}
            alt="Alternate Text"
            w={100}
            h={85}
            m={2}
            bg={'amber.100'}
            resizeMode={'cover'}
          />
        </HStack>
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
