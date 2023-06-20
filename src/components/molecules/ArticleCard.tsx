import React from 'react';
import {Divider, Text, HStack, VStack, Image} from 'native-base';
import {fonts} from '../../theme/fonts';
import {TouchableOpacity} from 'react-native';

interface Props {
  header: string;
  group: string;
  readTime: string;
}

export function ArticleCard({header, group, readTime}: Props): JSX.Element {
  return (
    <HStack my={1} ml={1} mr={3} bg="white" rounded={'md'} shadow={0} p={2}>
      <TouchableOpacity>
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          space={2}>
          <VStack justifyContent={'space-between'} h={79} space={2}>
            <Text style={fonts.body1} noOfLines={2} w={232}>
              {header}
            </Text>
            <HStack>
              <Text style={{...fonts.button1}}>{group}</Text>
              <Divider
                bg={'#E6E6E6'}
                thickness="2"
                mx="2"
                orientation="vertical"
              />
              <Text style={fonts.button1}>{readTime} read</Text>
            </HStack>
          </VStack>
          <Image
            source={{
              uri: 'https://wallpaperaccess.com/full/317501.jpg',
            }}
            alt="Alternate Text"
            roundedRight={'sm'}
            w={101}
            h={79}
          />
        </HStack>
      </TouchableOpacity>
    </HStack>
  );
}
