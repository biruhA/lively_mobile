import React from 'react';
import {ChevronRightIcon, Divider, HStack, Image, Text} from 'native-base';

export function SettingItems({item_icon, title}: any) {
  return (
    <>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        maxW="350">
        <HStack space={2}>
          <Image source={item_icon} alt="Alternate Text" size="24px" />
          <Text fontSize="md">{title}</Text>
        </HStack>
        <HStack>
          <ChevronRightIcon size="5" mt="0.5" alignSelf="flex-end" />
        </HStack>
      </HStack>
      <Divider marginTop={1} bg={'#E6E6E6'} thickness="1" />
    </>
  );
}
