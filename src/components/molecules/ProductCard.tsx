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
      w={150}
      h={190}
      style={[styles.main, mainStyle]}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setProductId(id));
          if (navTo) {
            navigation.navigate(navTo);
          }
          navigation.navigate(ScreenNames.ProductDetailScreen);
        }}>
        <Stack overflow={'hidden'}>
          <Box position={'absolute'} zIndex={1} top={0} right={0}>
            <HeartIcon />
          </Box>
          <Image
            source={{
              uri: imageUrl,
            }}
            alt="Alternate Text"
            w={'100%'}
            h={95}
            resizeMode={'cover'}
          />
          <Stack px={2} h={'50%'} justifyContent={'space-between'}>
            <Text pt={2} pb={1} style={fonts.body1} numberOfLines={2}>
              {item}
            </Text>
            <Stack>
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
