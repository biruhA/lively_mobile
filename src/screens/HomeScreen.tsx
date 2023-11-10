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
            space={4}
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
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNames.Medicines);
      }}>
      <HStack
        overflow={'hidden'}
        space={4}
        alignItems={'center'}
        bg={'#D7EFCC'}
        rounded={'2xl'}
        px={1}
        py={4}
        justifyContent={'center'}
        alignSelf={'center'}
        borderWidth={1}
        borderColor={'#D0D0D0'}>
        <Image
          position={'absolute'}
          bottom={-40}
          left={0}
          source={require('../assets/images/Ellipse-87.png')}
          boxSize={124}
          // bg={'blue.300'}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/images/home-medicinal.png')}
          boxSize={124}
          resizeMode="contain"
        />
        <Image
          position={'absolute'}
          top={-35}
          right={-10}
          source={require('../assets/images/Ellipse-86.png')}
          boxSize={124}
          // bg={'blue.200'}
          resizeMode="contain"
        />
        <Stack flex={1}>
          <Text style={styles.cardHeaderTxt}>Medicinal</Text>
          <Text style={styles.cardSubTxt}>
            Upload your prescription & we will show you the medicines.
          </Text>
          <Image
            alignSelf={'flex-end'}
            source={require('../assets/images/home-nav.png')}
            boxSize={7}
            resizeMode="contain"
          />
        </Stack>
        <Image
          position={'absolute'}
          bottom={-25}
          right={-5}
          source={require('../assets/images/Ellipse-88.png')}
          boxSize={124}
          // bg={'blue.100'}
          resizeMode="contain"
        />
      </HStack>
    </TouchableOpacity>
  );
}

function ProductsCard() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNames.Homeold);
      }}>
      <HStack
        overflow={'hidden'}
        space={4}
        alignItems={'center'}
        bg={'#FFE4D4'}
        rounded={'2xl'}
        px={1}
        py={4}
        borderWidth={1}
        borderColor={'#D0D0D0'}>
        <Image
          position={'absolute'}
          bottom={-52}
          left={0}
          source={require('../assets/images/Vector-29.png')}
          boxSize={124}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/images/home-products.png')}
          boxSize={124}
          resizeMode="contain"
        />
        <Image
          position={'absolute'}
          top={-5}
          right={-30}
          source={require('../assets/images/Vector-27.png')}
          boxSize={124}
          resizeMode="contain"
        />
        <Stack flex={1}>
          <Text style={styles.cardHeaderTxt}>Products</Text>
          <Text style={styles.cardSubTxt}>
            We provide a wide variety of products for infants, women, men, and
            families.
          </Text>
          <Image
            mt={1}
            alignSelf={'flex-end'}
            source={require('../assets/images/home-nav.png')}
            boxSize={7}
            resizeMode="contain"
          />
        </Stack>
      </HStack>
    </TouchableOpacity>
  );
}

function PlacesCard() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNames.Place);
      }}>
      <HStack
        overflow={'hidden'}
        space={4}
        alignItems={'center'}
        bg={'#C9E7FD'}
        rounded={'2xl'}
        px={1}
        py={4}
        borderWidth={1}
        borderColor={'#D0D0D0'}>
        <Image
          position={'absolute'}
          top={-5}
          right={0}
          source={require('../assets/images/Vector-12.png')}
          w={'110%'}
          h={50}
          resizeMode="contain"
        />
        <Image
          position={'relative'}
          zIndex={2}
          source={require('../assets/images/home-places.png')}
          boxSize={124}
          resizeMode="contain"
        />
        <Stack flex={1}>
          <Text style={styles.cardHeaderTxt}>Places</Text>
          <Text style={styles.cardSubTxt}>
            You can find different store locations and details here.
          </Text>
          <Image
            mt={4}
            alignSelf={'flex-end'}
            source={require('../assets/images/home-nav.png')}
            boxSize={7}
            resizeMode="contain"
          />
        </Stack>
        <Image
          position={'absolute'}
          bottom={-7}
          source={require('../assets/images/Vector-13.png')}
          w={'110%'}
          h={50}
          resizeMode="contain"
        />
      </HStack>
    </TouchableOpacity>
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
