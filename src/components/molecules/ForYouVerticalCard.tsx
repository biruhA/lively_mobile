import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Text, Image, Stack, Box, Pressable, HStack, VStack} from 'native-base';
import {colors} from '../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  name: string;
  list: string;
}

export function ForYouVerticalCard({name, list}: Props): JSX.Element {
  return (
    <Stack
      my={1}
      ml={1}
      mr={3}
      bg="white"
      rounded={'md'}
      shadow={0}
      w={230}
      overflow={'hidden'}>
      <Stack>
        <Image
          source={{
            uri: 'https://wallpaperaccess.com/full/317501.jpg',
          }}
          alt="Alternate Text"
          rounded={'md'}
          w={230}
          h={360}
          resizeMode={'cover'}
        />
        <Box position={'absolute'} w={'100%'} bottom={0}>
          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.linearGradient}>
            <VStack px={3} pt={1} pb={4} alignItems={'flex-start'}>
              <Text
                color={colors.pureWhite}
                fontWeight={'semibold'}
                fontSize={28}
                numberOfLines={2}>
                {name}
              </Text>
              <Text
                fontSize={16}
                w={200}
                color={colors.pureWhite}
                numberOfLines={1}>
                {list}
              </Text>
              <Pressable
                rounded={'full'}
                bg={'#ededed'}
                color={'black'}
                mt={2}
                py={2}
                px={3}>
                <Text>Buy now</Text>
              </Pressable>
            </VStack>
          </LinearGradient>
        </Box>
      </Stack>
    </Stack>
  );
}

const styles = StyleSheet.create({
  linearGradient: {},
});
