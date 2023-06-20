import {View} from 'react-native';
import React from 'react';
import {HStack, Image, Stack, Text} from 'native-base';

export function ArticleStoreProductPlug({title, imageUrl, price}) {
  return (
    <HStack
      w={'100%'}
      px={4}
      py={2}
      bg={'#cbf3e0'}
      justifyContent={'space-between'}
      rounded={'lg'}
      alignItems={'flex-end'}
      borderWidth={2}
      borderColor={'white'}
      shadow={'0'}>
      <Stack w={'50%'} space={4}>
        <Text fontSize={20} fontWeight={'700'} lineHeight={35} noOfLines={2}>
          {title}
        </Text>
        <Text fontSize={20} fontWeight={'400'} color={'#0000008C'}>
          {price} Birr
        </Text>
      </Stack>
      <Image
        source={{
          uri: imageUrl,
        }}
        alt="product"
        w={112}
        h={112}
        resizeMode="cover"
      />
    </HStack>
  );
}
