import React from 'react';
import {Text, Image, Stack, HStack, Button} from 'native-base';
import {fonts} from '../../theme/fonts';
import {colors} from '../../theme/colors';

export function ArticleCollectionPlug({title, imageUrl}) {
  //TODO navigate to collocation page
  return (
    <Stack rounded={'lg'} overflow={'hidden'}>
      <Image source={{uri: imageUrl}} alt="product" w={'100%'} h={90} />
      <HStack
        justifyContent={'space-between'}
        position={'absolute'}
        alignItems={'flex-end'}
        bottom={0}
        right={0}
        left={0}
        px={3}
        py={2}>
        <Text
          noOfLines={2}
          style={{
            color: colors.pureWhite,
            fontSize: 28,
            fontWeight: '700',
            lineHeight: 38,
          }}>
          {title}
        </Text>
        <Button rounded={'full'} bg={'white'} px={4} py={3}>
          <Text
            style={{
              color: colors.pureBlack,
              fontSize: 18,
              fontWeight: '400',
            }}>
            Buy now
          </Text>
        </Button>
      </HStack>
    </Stack>
  );
}
