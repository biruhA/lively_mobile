import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Center,
  ChevronRightIcon,
  Divider,
  HStack,
  Image,
  Spinner,
  Text,
} from 'native-base';

interface Props {
  item_icon?: string;
  title: string;
  onPress?: any;
  isLoading?: boolean;
}

export function SettingItems({item_icon, title, onPress, isLoading}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        maxW="350">
        <HStack space={2}>
          {isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            item_icon && (
              <Image
                source={item_icon}
                alt="Alternate Text"
                size="24px"
                rounded={'full'}
              />
            )
          )}
          <Text fontSize="md">{title}</Text>
        </HStack>
        <HStack>
          <ChevronRightIcon size="5" mt="0.5" alignSelf="flex-end" />
        </HStack>
      </HStack>
      <Divider marginTop={1} bg={'#E6E6E6'} thickness="1" />
    </TouchableOpacity>
  );
}
