import {View} from 'react-native';
import React from 'react';
import {HStack, Image, Stack, Text} from 'native-base';
import {fonts} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {GradientButton, GradientButtonSmall} from '../atoms';
import smile from '../../assets/icons/smile_yellow.png';
import location from '../../assets/icons/location_regular.png';
import {DiscountDescription, ProductDescription} from '../molecules';

export function DiscountDetail() {
  return (
    <Stack space={2}>
      <Text fontSize={16} fontWeight={700}>
        Royal Moroccan Nourishing Mask Treatment for Thin & Fine Hair
      </Text>
      <Stack borderWidth={2} borderColor={'#f5f5f5'} p={3} borderRadius={8}>
        <HStack space={3}>
          <Text style={[fonts.subtitle2, {color: colors.lightgreyText}]}>
            360 Birr
          </Text>
          <Text style={[fonts.subtitle2, {color: '#FF0000'}]}>60% Off</Text>
        </HStack>
        <Text pt={3} style={[fonts.heading6, {color: '#00BA63'}]}>
          350 Birr
        </Text>
      </Stack>
      <HStack
        space={2}
        borderWidth={2}
        borderColor={'#f5f5f5'}
        p={3}
        borderRadius={8}>
        <Text pt={1} style={fonts.heading6}>
          From
        </Text>
        <Text pt={1} style={[fonts.heading6, {color: '#00BA63'}]}>
          Jun 23-Jul 15 2023
        </Text>
      </HStack>
      <HStack
        space={8}
        borderWidth={2}
        borderColor={'#f5f5f5'}
        p={3}
        borderRadius={8}>
        <Stack space={1}>
          <Text ml={2}>Variation</Text>
          <GradientButtonSmall variant="flat" text="50ml" onPress={() => {}} />
        </Stack>
        <Stack space={1}>
          <Text>Brand</Text>
          <Image
            source={{
              uri: 'https://media-cdn.tripadvisor.com/media/photo-s/11/74/e4/15/menara-logo.jpg',
            }}
            alt="brand"
            w={20}
            h={10}
            borderRadius={8}
            resizeMode="contain"
          />
        </Stack>
      </HStack>
      <StoreCard />
    </Stack>
  );
}

function StoreCard() {
  return (
    <Stack
      borderWidth={2}
      borderColor={'#f5f5f5'}
      p={3}
      borderRadius={8}
      space={1}>
      <Text style={fonts.body1}>Store</Text>
      <HStack space={4}>
        <Image
          source={{
            uri: 'https://media-cdn.tripadvisor.com/media/photo-s/11/74/e4/15/menara-logo.jpg',
          }}
          alt="brand"
          w={20}
          h={16}
          borderRadius={8}
          resizeMode="contain"
        />
        <Stack space={1}>
          <Text pt={1} style={fonts.heading6}>
            SAS Pharmacy
          </Text>
          <HStack space={1}>
            <Image
              source={location}
              alt="brand"
              boxSize={4}
              resizeMode="contain"
            />
            <Text style={fonts.button2}>4.3 Km Away</Text>
          </HStack>
          <HStack alignItems={'center'} space={1}>
            <Image
              source={smile}
              alt="brand"
              boxSize={4}
              resizeMode="contain"
            />
            <Text style={(fonts.button2, {color: '#F8981F'})}>4.8</Text>
            <Text style={fonts.button2}>5 User Reviews</Text>
          </HStack>
        </Stack>
      </HStack>
    </Stack>
  );
}
