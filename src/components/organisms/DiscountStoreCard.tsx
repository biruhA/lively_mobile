import {View} from 'react-native';
import React from 'react';
import {HStack, Image, Stack, Text} from 'native-base';
import {fonts} from '../../theme/fonts';
import FastImage from 'react-native-fast-image';
import {ApiImage, ShadowCard} from '..';

export function DiscountStoreCard({imageUrl, name, distance, rating}) {
  return (
    <Stack space={1} px={4} bg={'white'} pb={4}>
      <Text style={fonts.body1}>Store</Text>
      <ShadowCard style={{borderRadius: 8}}>
        <HStack space={4} bg={'white'}>
          <ApiImage
            imageUrl={imageUrl}
            style={{width: 80, height: 60}}
            resizeMode="contain"
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
      </ShadowCard>
    </Stack>
  );
}
