import React from 'react';
import {Stack, Image, Pressable, Text, useToast} from 'native-base';
import {fonts} from '../../theme/fonts';
import rx_card from '../../assets/images/rx_card.png';

export function Prescription() {
  const toast = useToast();

  function onPress() {
    toast.show({
      description:
        'Coming Soon: Verify your Prescriptions using Lively! Stay tuned!',
    });
  }

  return (
    <Stack bg={'white'} p={4}>
      <Stack bg={'#E9F4EF'} rounded={'lg'} p={4} h={125}>
        <Text style={[fonts.body1, {color: 'black'}]}>
          Order drugs with Prescription
        </Text>
        <Text style={fonts.caption} w={'75%'}>
          Upload your prescription & we will show you the medicines
        </Text>
        <Pressable onPress={onPress} pt={2}>
          {({isPressed}) => {
            return (
              <Text
                color={isPressed ? '#0085790f' : '#008579'}
                fontWeight={'semibold'}
                fontSize={16}>
                Upload now
              </Text>
            );
          }}
        </Pressable>
        <Image
          position={'absolute'}
          bottom={0}
          right={2}
          source={rx_card}
          alt="Alternate Text"
          w={70}
          h={60}
        />
      </Stack>
    </Stack>
  );
}
