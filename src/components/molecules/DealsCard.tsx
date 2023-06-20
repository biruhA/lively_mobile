import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Text, Image, Stack, Divider, HStack, Box} from 'native-base';
import {fonts} from '../../theme/fonts';
import smile_face from '../../assets/icons/smile_face.png';
import {colors} from '../../theme/colors';

interface Props {
  id: string;
  item: string;
  volume: string;
  price: string;
  discount: string;
}

export function DealsCard({item, volume, price, discount}: Props): JSX.Element {
  return (
    <Stack my={2} ml={1} mr={3} overflow={'hidden'}>
      <TouchableOpacity>
        <HStack px={3} py={4} space={3} alignItems={'flex-start'}>
          <Box shadow={'7'}>
            <Image
              source={{
                uri: 'https://wallpaperaccess.com/full/317501.jpg',
              }}
              alt="Alternate Text"
              boxSize={97}
              resizeMode={'contain'}
              bg={'white'}
              rounded={'sm'}
            />
          </Box>
          <Stack>
            <Text style={fonts.body1} w={170} numberOfLines={1}>
              {item}
            </Text>
            <Text style={fonts.caption} numberOfLines={1}>
              {volume}
            </Text>
            <Text style={fonts.caption} numberOfLines={1}>
              @ Gishen Pharmacy
            </Text>
            <HStack space={2}>
              <Text
                style={{
                  ...fonts.caption,
                  fontSize: 14,
                  color: colors.primary,
                }}
                numberOfLines={1}
                textDecorationLine={'line-through'}>
                {discount} Birr
              </Text>
              <Text style={fonts.caption} color={colors.pureBlack}>
                {price} Birr
              </Text>
            </HStack>
          </Stack>
        </HStack>
      </TouchableOpacity>
    </Stack>
  );
}
