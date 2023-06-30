import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Box, Image, Text, Stack, VStack} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';

interface Props {
  id: string;
  name: string;
  imageUrl: string;
  list: string;
}

export function CollectionCard({id, name, imageUrl, list}: Props) {
  const navigation = useNavigation();
  return (
    <Stack bg={'pink.100'} w={'48%'} my={2} rounded={'lg'} overflow={'hidden'}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenNames.CollectionDetail, {id});
        }}>
        <Image
          source={{
            uri: imageUrl,
          }}
          w={'100%'}
          h={192}
          alt={'alt'}
        />
        <Box position={'absolute'} w={'100%'} bottom={0}>
          <LinearGradient colors={['transparent', 'black']}>
            <VStack p={3} alignItems={'flex-start'} justifyContent={'flex-end'}>
              <Text
                color={colors.pureWhite}
                fontWeight={700}
                pt={2}
                fontSize={28}
                numberOfLines={2}>
                {name}
              </Text>
              <Text
                fontSize={16}
                color={colors.pureWhite}
                fontWeight={400}
                numberOfLines={1}>
                {list}
              </Text>
            </VStack>
          </LinearGradient>
        </Box>
      </TouchableOpacity>
    </Stack>
  );
}
