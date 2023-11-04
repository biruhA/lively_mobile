import {StyleSheet, TouchableOpacity} from 'react-native';
import {HStack, Image, ScrollView, Stack, Text} from 'native-base';
import React from 'react';
import {BottomTabBar, HomeHeader} from '../components';
import {fonts} from '../theme/fonts';
import TouchableIcon from '../components/atoms/TouchableIcon';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';

export function HomeScreen() {
  return (
    <>
      <Stack flex={1} bg={'white'} py={4}>
        <HomeHeader />
        <ScrollView>
          <Stack pt={8} px={4}>
            <Text style={styles.headerTxt}>Hey , What would you like</Text>
            <Text style={styles.headerTxt}>to do today?</Text>
            <Text pt={2} style={styles.subHeaderTxt}>
              we use this information to make user experience easy and
              enjoyable.
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
            space={6}
            borderTopRadius={25}
            style={styles.dropShadow}
            bg={'white'}
            px={4}
            py={6}
            mt={6}
            mb={12}>
            <MedicinalCard />
            <ProductsCard />
            <PlacesCard />
          </Stack>
        </ScrollView>
      </Stack>
      <BottomTabBar />
    </>
  );
}

function MedicinalCard() {
  const navigation = useNavigation();

  return (
    <HStack
      space={4}
      alignItems={'center'}
      bg={'#D7EFCC'}
      rounded={'2xl'}
      p={4}
      borderWidth={1}
      borderColor={'#D0D0D0'}>
      <Image
        source={require('../assets/images/home-medicinal.png')}
        boxSize={124}
        resizeMode="contain"
      />
      <Stack flex={1}>
        <Text style={styles.cardHeaderTxt}>Medicinal</Text>
        <Text style={styles.cardSubTxt}>
          Upload your prescription & we will show you the medicines.
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNames.Medicines);
          }}>
          <Image
            alignSelf={'flex-end'}
            source={require('../assets/images/home-nav.png')}
            boxSize={7}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Stack>
    </HStack>
  );
}

function ProductsCard() {
  const navigation = useNavigation();
  return (
    <HStack
      space={4}
      alignItems={'center'}
      bg={'#FFE4D4'}
      rounded={'2xl'}
      p={4}
      borderWidth={1}
      borderColor={'#D0D0D0'}>
      <Image
        source={require('../assets/images/home-products.png')}
        boxSize={124}
        resizeMode="contain"
      />
      <Stack flex={1}>
        <Text style={styles.cardHeaderTxt}>Products</Text>
        <Text style={styles.cardSubTxt}>
          We provide a wide variety of products for infants, women, men, and
          families.
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNames.Homeold);
          }}>
          <Image
            mt={1}
            alignSelf={'flex-end'}
            source={require('../assets/images/home-nav.png')}
            boxSize={7}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Stack>
    </HStack>
  );
}

function PlacesCard() {
  const navigation = useNavigation();

  return (
    <HStack
      space={4}
      alignItems={'center'}
      bg={'#C9E7FD'}
      rounded={'2xl'}
      p={4}
      borderWidth={1}
      borderColor={'#D0D0D0'}>
      <Image
        source={require('../assets/images/home-places.png')}
        boxSize={124}
        resizeMode="contain"
      />
      <Stack flex={1}>
        <Text style={styles.cardHeaderTxt}>Places</Text>
        <Text style={styles.cardSubTxt}>
          You can find different store locations and details here.
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNames.Place);
          }}>
          <Image
            mt={4}
            alignSelf={'flex-end'}
            source={require('../assets/images/home-nav.png')}
            boxSize={7}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Stack>
    </HStack>
  );
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
