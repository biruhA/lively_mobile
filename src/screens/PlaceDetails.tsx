import {Linking, Platform, ScrollView} from 'react-native';
import React from 'react';
import {
  AspectRatio,
  Avatar,
  Box,
  Center,
  HStack,
  Heading,
  Stack,
  Text,
  Image,
  VStack,
  Badge,
} from 'native-base';
import {colors} from '../theme/colors';
import {PlaceDetailsHeader, SearchBar} from '../components/molecules';
import {ButtonTabs, GradientButtonSmall} from '../components/atoms';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import faceHappy from '../assets/icons/system-uicons-face-happy.png';
import location from '../assets/icons/location_regular.png';
import locationWhite from '../assets/icons/location_white.png';
import call from '../assets/icons/phone.png';
import {usePlaceDetailQuery} from '../store/services';
import {useAppSelector} from '../store/hooks';
import {fonts} from '../theme/fonts';

const imageUrl =
  'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg';

export function PlaceDetails() {
  const navigation = useNavigation();
  const {userLocation} = useAppSelector(state => state.search);
  const {token} = useAppSelector(state => state.auth);
  const {data, isLoading} = usePlaceDetailQuery({
    id: '999d0ba8-2c7b-4361-8403-71e88dc7a4aa',
    latitude: userLocation?.lat,
    longitude: userLocation?.lon,
    token,
  });

  function onPressHandler() {
    navigation.navigate(navTo, {label});
  }

  return (
    <Stack flex={1} bg={'white'}>
      <Stack p={4} bg={'white'}>
        <PlaceDetailsHeader />
      </Stack>
      <Stack bg={colors.pureWhite} h={5} w={'100%'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box pb={4}>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={
                data?.data?.cover_image
                  ? {
                      uri: data?.data?.cover_image,
                    }
                  : require('../assets/images/Placeholder.png')
              }
              alt="image"
              w={'100%'}
              h={220}
              resizeMode="cover"
            />
          </AspectRatio>
          <HStack>
            <Center position="absolute" pl={8} bottom="0" py={4}>
              <AspectRatio ratio={3 / 5}>
                <Avatar
                  size={'72px'}
                  source={
                    data?.data?.store?.store_logo?.url
                      ? {
                          uri: data?.data?.store?.store_logo?.url,
                        }
                      : require('../assets/images/Placeholder.png')
                  }>
                  AJ
                </Avatar>
              </AspectRatio>
            </Center>
          </HStack>
          <Stack style={{marginLeft: '30%', paddingTop: 5}}>
            <Heading size="md" color={'black'}>
              SAS Pharmacy
            </Heading>
            <HStack space={1}>
              <Image source={location} alt="Alternate Text" boxSize={4} />
              <Text>{data?.data?.distance} Away</Text>
            </HStack>
          </Stack>
        </Box>
        <Stack px={4} bg={'white'}>
          <Stack
            mt={4}
            p={3}
            bg="white"
            rounded={'xs'}
            borderColor={colors.grey}
            borderWidth={0.1}>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <HStack space={2} alignItems={'center'}>
                {data?.data?.is_open ? (
                  <Heading size="xs" style={{color: colors.primary}}>
                    Open now
                  </Heading>
                ) : (
                  <Heading size="xs" style={{color: colors.error}}>
                    Closed
                  </Heading>
                )}
                <Heading size="md" style={{color: colors.error}}>
                  .
                </Heading>
                <Text style={{color: colors.greyText}}>
                  Closes at{' '}
                  {data?.data?.opening_hours?.[0]?.closing_time.substr(0, 5)}
                </Text>
              </HStack>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ScreenNames.PlacePharmacyDetail, {
                    Data: data?.data,
                  })
                }>
                <Badge rounded={'md'} colorScheme="#e2fff1">
                  <Text style={{color: colors.primary}}>More Info</Text>
                </Badge>
              </TouchableOpacity>
            </HStack>
          </Stack>

          <Center py={24}>
            <Text style={fonts.caption}>No products yet</Text>
          </Center>
          {/* <Stack
          my={1}
          mr={3}
          padding={3}
          bg="white"
          rounded={'md'}
          w={'100%'}
          borderColor={colors.grey}
          borderWidth={0.1}
          overflow={'hidden'}>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Text style={{color: colors.greyText}}> Rating emojis </Text>
          </HStack>
        </Stack> */}

          {/* <Stack
          my={1}
          mr={3}
          padding={3}
          bg="white"
          rounded={'md'}
          w={'100%'}
          borderColor={colors.grey}
          borderWidth={0.1}
          overflow={'hidden'}>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <HStack space={6}>
              <Heading
                size="xs"
                style={{color: colors.pureBlack, paddingTop: 10}}>
                4.5
              </Heading>
              <VStack>
                <Image source={faceHappy} alt="search" size="24px" />
                <Text style={{color: colors.greyText}}>Based on 35 user</Text>
              </VStack>
            </HStack>
          </HStack>
        </Stack> */}

          {/* <Stack
          my={1}
          mr={3}
          padding={3}
          bg="white"
          rounded={'md'}
          w={'100%'}
          borderColor={colors.grey}
          borderWidth={0.1}
          overflow={'hidden'}>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <HStack space={4}>
              <Avatar
                size={'52px'}
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                }}>
                AJ
              </Avatar>
              <VStack>
                <Text style={{color: colors.greyText}}>
                  Lemma Kebede | 4 emjoi
                </Text>
                <Text style={{color: colors.greyText}}>Jul 24/2023</Text>
                <Text maxW="300" w="80%" style={{color: colors.greyText}}>
                  The researchers performed eye exams just before & five
                  minutes....
                </Text>
              </VStack>
            </HStack>
          </HStack>
        </Stack> */}

          {/* <Stack
          my={1}
          mr={3}
          padding={1}
          bg="white"
          rounded={'md'}
          w={'100%'}
          overflow={'hidden'}>
          <Center>
            <TouchableOpacity onPress={onPressHandler}>
              <Text style={{color: colors.primary}}> See More </Text>
            </TouchableOpacity>
          </Center>
        </Stack> */}

          {/* <SearchBar placeholder="Search for products" /> */}
        </Stack>
      </ScrollView>
      <HStack position={'absolute'} bottom={0} p={2} bg={'white'}>
        <GradientButtonSmall
          mainStyle={{width: '47%'}}
          variant={'flat'}
          text={'Get Direction'}
          onPress={() => {
            const lat = data?.data?.location?.latitude;
            const lon = data?.data?.location?.longitude;
            const url = Platform.select({
              ios: 'maps:' + lat + ',' + lon,
              android: 'geo:' + lat + ',' + lon,
            });
            Linking.openURL(url);
          }}
          isActive={true}
          icon={locationWhite}
        />
        <GradientButtonSmall
          mainStyle={{width: '47%'}}
          icon={call}
          variant={'flat'}
          text={'Cal now'}
          onPress={() => {
            let phoneNumber = data?.data?.store?.phone;

            if (Platform.OS === 'android') {
              phoneNumber = 'tel:${phoneNumber}';
            } else {
              phoneNumber = 'telprompt:${phoneNumber}';
            }

            Linking.openURL(phoneNumber);
          }}
          isActive={false}
        />
      </HStack>
    </Stack>
  );
}
