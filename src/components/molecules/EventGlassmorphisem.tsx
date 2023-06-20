import {StyleSheet, View} from 'react-native';
import React from 'react';
import {VStack, Stack, HStack, Image, Text} from 'native-base';
import {BlurView} from '@react-native-community/blur';
import {fonts} from '../../theme/fonts';

interface Props {
  item: any;
}

export function EventGlassmorphisem({item}: Props) {
  return (
    <>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <HStack
        px={2}
        space={2}
        justifyContent={'space-between'}
        alignItems={'flex-start'}>
        <Stack w={'75%'} justifyContent={'space-between'} space={2}>
          <Text fontSize={16} fontWeight={'700'} color={'white'}>
            {item?.title?.english}
          </Text>
          <Text noOfLines={1} style={[fonts.button2, {color: 'white'}]}>
            {item?.about?.english}
          </Text>
          <HStack alignItems={'center'}>
            <Image
              source={require(`../../assets/icons/location-white-fill.png`)}
              alt="filter"
              boxSize={5}
              resizeMode="contain"
            />
            <Text fontSize={14} fontWeight={'700'} color={'white'}>
              {item?.location?.english}
            </Text>
          </HStack>
        </Stack>
        <CalanderTime
          month={
            new Date(item?.start_date.split('-')[1])
              .toDateString()
              .split(' ')[1]
          }
          date={item?.start_date.split('-')[2]}
          year={item?.start_date.split('-')[0]}
        />
      </HStack>
    </>
  );
}

function CalanderTime({month, date, year}) {
  return (
    <VStack
      px={4}
      alignItems={'center'}
      py={1}
      bg={'white'}
      borderRadius={8}
      space={1}>
      <Text fontSize={14} fontWeight={'400'} color={'#C0C0C0'}>
        {month}
      </Text>
      <Text style={[fonts.heading6, {color: '#00BA63'}]} pt={1}>
        {date}
      </Text>
      <Text fontSize={14} fontWeight={'400'}>
        {year}
      </Text>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
