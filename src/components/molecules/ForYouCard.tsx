import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Text, Image, Stack, Box, Pressable, HStack, VStack} from 'native-base';
import {colors} from '../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  name: string;
  list: string;
}

export function ForYouCard({name, list}: Props): JSX.Element {
  return (
    <Stack
      my={1}
      ml={1}
      mr={3}
      bg="white"
      rounded={'md'}
      shadow={0}
      w={328}
      overflow={'hidden'}>
      <Stack>
        <Image
          source={{
            uri: 'https://wallpaperaccess.com/full/317501.jpg',
          }}
          alt="Alternate Text"
          rounded={'md'}
          w={328}
          h={170}
          resizeMode={'cover'}
        />
        <Box position={'absolute'} w={'100%'} bottom={0}>
          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.linearGradient}>
            <HStack p={2} alignItems={'flex-end'} justifyContent={'flex-start'}>
              <VStack>
                <Text
                  color={colors.pureWhite}
                  fontWeight={'semibold'}
                  pt={2}
                  fontSize={28}
                  numberOfLines={2}>
                  {name}
                </Text>
                <Text
                  fontSize={16}
                  w={235}
                  color={colors.pureWhite}
                  numberOfLines={1}>
                  {list}
                </Text>
              </VStack>
              <Pressable
                rounded={'full'}
                bg={'#ededed'}
                color={'black'}
                py={2}
                px={3}>
                <Text>Buy now</Text>
              </Pressable>
            </HStack>
          </LinearGradient>
        </Box>
      </Stack>
    </Stack>
  );
}

const styles = StyleSheet.create({
  linearGradient: {},
});
