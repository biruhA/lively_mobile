import {View} from 'react-native';
import React from 'react';
import {HStack, Image, Stack, Text} from 'native-base';
import {fonts} from '../../theme/fonts';
import FastImage from 'react-native-fast-image';

export function DiscountStoreCard({imageUrl, name, distance, rating}) {
  return (
    <Stack p={3} space={1}>
      <Text style={fonts.body1}>Store</Text>
      <HStack space={4}>
        <FastImage
          style={{width: 80, height: 60}}
          source={{
            uri: imageUrl,
          }}
          resizeMode={'contain'}
        />
        <Stack space={1}>
          <Text pt={1} style={fonts.heading6}>
            {name}
          </Text>
          <HStack space={1}>
            <Image
              source={require('../../assets/icons/location_regular.png')}
              alt="brand"
              boxSize={4}
              resizeMode="contain"
            />
            <Text style={fonts.button2}>{distance} Away</Text>
          </HStack>
          <HStack alignItems={'center'} space={1}>
            <Image
              source={require('../../assets/icons/smile_yellow.png')}
              alt="brand"
              boxSize={4}
              resizeMode="contain"
            />
            <Text style={(fonts.button2, {color: '#F8981F'})}>{rating}</Text>
            <Text style={fonts.button2}>User Reviews</Text>
          </HStack>
        </Stack>
      </HStack>
    </Stack>
  );
}
