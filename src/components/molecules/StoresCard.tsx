import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Text, Image, Stack, Divider, HStack} from 'native-base';
import {fonts} from '../../theme/fonts';
import smile_face from '../../assets/icons/smile_face.png';

interface Props {
  store: string;
  distance: string;
  rating: string;
  price: string;
  imageUrl: string;
}

export function StoresCard({
  store,
  distance,
  rating,
  price,
  imageUrl,
}: Props): JSX.Element {
  return (
    <Stack
      my={2}
      ml={1}
      mr={3}
      bg="white"
      rounded={'md'}
      shadow={0}
      w={290}
      overflow={'hidden'}>
      <TouchableOpacity>
        <HStack px={3} py={4} space={3} alignItems={'center'}>
          <Image
            source={{uri: imageUrl}}
            alt="Alternate Text"
            w={81}
            h={74}
            resizeMode={'cover'}
          />
          <Stack space={2}>
            <Text style={fonts.body1} numberOfLines={2}>
              {store}
            </Text>
            <HStack space={2}>
              <Text style={fonts.caption} numberOfLines={1}>
                {distance}
              </Text>
              <Divider
                bg={'#E6E6E6'}
                thickness="1"
                mx="1"
                orientation="vertical"
              />
              <Image source={smile_face} alt="Alternate Text" boxSize={4} />
              <Text style={fonts.caption} numberOfLines={1}>
                {rating}
              </Text>
            </HStack>
            <Text style={fonts.button2} numberOfLines={1}>
              {price}
            </Text>
          </Stack>
        </HStack>
      </TouchableOpacity>
    </Stack>
  );
}
