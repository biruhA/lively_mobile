import {View} from 'react-native';
import React from 'react';
import {HStack, Image, Stack, Text} from 'native-base';

export function ArticleStorePlug({title, imageUrl, distance, rating}) {
  //TODO rating and distance should be added to api
  return (
    <HStack
      w={'100%'}
      px={3}
      py={2}
      bg={'#F2F2F2'}
      justifyContent={'space-between'}
      rounded={'lg'}
      alignItems={'center'}
      borderWidth={2}
      borderColor={'white'}
      shadow={'0'}>
      <Stack w={'50%'} space={2}>
        <Text fontSize={20} fontWeight={'700'} lineHeight={35}>
          {title}
        </Text>
        <ImageLabel
          title={'4.8 Km Away'}
          imageUrl={require('../../assets/icons/smile_yellow.png')}
          size={4}
        />
        <ImageLabel
          title={'4.2 rating'}
          imageUrl={require('../../assets/icons/location.png')}
          size={6}
        />
      </Stack>
      <Image
        source={{
          uri: imageUrl,
        }}
        alt="product"
        boxSize={120}
        w={130}
        h={112}
        rounded={'lg'}
        resizeMode="cover"
      />
    </HStack>
  );
}

function ImageLabel({title, imageUrl, size}) {
  return (
    <HStack alignItems={'center'} space={2}>
      <Image
        source={imageUrl}
        alt="product"
        boxSize={size}
        rounded={'lg'}
        resizeMode="cover"
      />
      <Text fontSize={20} fontWeight={'400'} color={'#0000008C'}>
        {title}
      </Text>
    </HStack>
  );
}
