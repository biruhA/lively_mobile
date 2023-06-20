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

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
  imageUrl: string;
  mainStyle?: object;
  navTo?: string;
}

export function ProductCard({
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
          if (navTo) {
            navigation.navigate(navTo);
          }
          navigation.navigate(ScreenNames.ProductDetailScreen);
        }}>
        <Stack>
          <Box position={'absolute'} zIndex={1} right={0}>
            <HeartIcon />
          </Box>
          <Image
            source={{
              uri: imageUrl,
            }}
            alt="Alternate Text"
            w={'100%'}
            h={95}
            resizeMode={'contain'}
          />
          <Text pt={2} pb={1} style={fonts.body1} numberOfLines={2}>
            {item}
          </Text>
          <Text style={fonts.caption}>{volume}</Text>
          <HStack>
            <Text fontWeight={'semibold'} style={styles.amount}>
              Form{' '}
            </Text>
            <Text
              fontWeight={'semibold'}
              style={{...styles.amount, color: colors.primary}}>
              {amount} Birr
            </Text>
          </HStack>
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
