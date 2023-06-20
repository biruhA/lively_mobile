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
import locationRegular from '../../assets/icons/location_regular.png';
import smileYellow from '../../assets/icons/smile_yellow.png';

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
  imageUrl: string;
  mainStyle?: object;
}

export function SearchArticleCard({
  id,
  item,
  volume,
  amount,
  imageUrl,
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
          <Text style={fonts.caption}>Spiritual Wellness</Text>
          <Text fontWeight={'semibold'} style={styles.amount}>
            10 min read
          </Text>
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
