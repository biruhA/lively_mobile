import {StyleSheet} from 'react-native';
import {HStack, Image, Stack, Text} from 'native-base';
import React from 'react';
import {BottomTabBar, HomeHeader} from '../components';
import {fonts} from '../theme/fonts';

export function HomeScreen() {
  return (
    <>
      <Stack flex={1} bg={'white'} py={4}>
        <HomeHeader />
        <Stack pt={8} px={4}>
          <Text style={styles.headerTxt}>Hey , What would you like</Text>
          <Text style={styles.headerTxt}>to do today?</Text>
          <Text pt={2} style={styles.subHeaderTxt}>
            we use this information to make user experience easy and enjoyable.
          </Text>
          <Image
            position={'absolute'}
            right={-8}
            top={'20%'}
            source={require('../assets/images/home_top.png')}
            w={240}
            h={240}
            zIndex={-1}
            resizeMode="contain"
          />
        </Stack>
        <Stack
          borderTopRadius={25}
          style={styles.dropShadow}
          bg={'white'}
          px={6}
          py={6}
          mt={4}>
          <MedicinalCard />
          <ProductsCard />
          <PlacesCard />
        </Stack>
      </Stack>
      <BottomTabBar />
    </>
  );
}

function MedicinalCard() {
  return (
    <HStack
      space={2}
      alignItems={'center'}
      bg={'blue.100'}
      rounded={'2xl'}
      p={3}
      borderWidth={1}
      borderColor={'#D0D0D0'}>
      <Image
        source={require('../assets/images/Google-Play-Logo.png')}
        boxSize={124}
        resizeMode="contain"
      />
      <Stack bg={'blue.100'} flex={1}>
        <Text style={styles.cardHeaderTxt}>Medicinal</Text>
        <Text style={styles.cardSubTxt}>
          Upload your prescription & we will show you the medicines.
        </Text>
      </Stack>
    </HStack>
  );
}

function ProductsCard() {
  return <Stack></Stack>;
}

function PlacesCard() {
  return <Stack></Stack>;
}

const styles = StyleSheet.create({
  headerTxt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 36,
    color: 'black',
  },
  subHeaderTxt: {
    ...fonts.normal,
    fontSize: 16,
    fontWeight: '400',
    color: '#5F5D5D',
  },
  cardHeaderTxt: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 36,
    color: '#282334',
  },
  cardSubTxt: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    color: '#00000080',
  },
  dropShadow: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flex: 1,
    // boxShadow: '0px -4px 4px 0px #0000000A',
  },
});
