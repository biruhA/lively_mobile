import {FlatList, Linking, Platform, ScrollView} from 'react-native';
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
  Spinner,
} from 'native-base';
import {colors} from '../theme/colors';
import {
  PlaceDetailsHeader,
  PlacesProductCard,
  SearchBar,
} from '../components/molecules';
import {
  ButtonTabs,
  GradientButtonSmall,
  ListEmptyComponent,
} from '../components/atoms';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import faceHappy from '../assets/icons/system-uicons-face-happy.png';
import location from '../assets/icons/location_regular.png';
import locationWhite from '../assets/icons/location_white.png';
import call from '../assets/icons/phone.png';
import {usePlaceDetailQuery} from '../store/services';
import {useAppSelector} from '../store/hooks';
import {fonts} from '../theme/fonts';
import FastImage from 'react-native-fast-image';

export function PlaceDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const {userLocation} = useAppSelector(state => state.search);
  const {token} = useAppSelector(state => state.auth);
  const {data, isLoading} = usePlaceDetailQuery({
    id: route?.params?.id,
    latitude: userLocation?.lat,
    longitude: userLocation?.lon,
    token,
  });

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack flex={1} bg={'white'}>
      <Stack p={4} bg={'white'}>
        <PlaceDetailsHeader />
      </Stack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack bg={colors.pureWhite} h={5} w={'100%'} />
        <Stack mb={16}>
          {data?.data?.cover_image?.url ? (
            <FastImage
              style={{width: '100%', height: 220}}
              source={{
                uri: data?.data?.cover_image?.url,
              }}
              resizeMode={'cover'}
            />
          ) : (
            <Image
              source={require('../assets/images/Placeholder.png')}
              alt="image"
              w={'100%'}
              h={220}
              resizeMode="cover"
            />
          )}
          <HStack
            alignItems={'center'}
            space={4}
            position={'absolute'}
            bottom={-65}
            left={4}
            zIndex={2}>
            <Image
              borderColor={'whitesmoke'}
              borderWidth={1}
              source={{
                uri: data?.data?.store?.store_logo?.url,
              }}
              w={77}
              h={77}
              rounded={'full'}
              resizeMode="contain"
              alt="store_logo"
            />
            <Stack>
              <Heading size="md" color={'black'}>
                {data?.data?.store?.name?.english} {data?.data?.name?.english}
              </Heading>
              <HStack space={1}>
                <Image source={location} alt="Alternate Text" boxSize={4} />
                <Text>{data?.data?.distance} Away</Text>
              </HStack>
            </Stack>
          </HStack>
        </Stack>

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

          <FlatList
            style={{marginTop: 16}}
            numColumns={2}
            data={data?.data?.products?.data}
            ListEmptyComponent={() => {
              return <ListEmptyComponent />;
            }}
            renderItem={({item}) => (
              <PlacesProductCard
                id={item.id}
                imageUrl={item?.product_variant?.product_image?.url}
                item={item?.product_variant?.product?.title?.english}
                volume={item?.product_variant?.value?.english}
                amount={item.price}
                mainStyle={{width: '47%', marginBottom: 12}}
              />
            )}
            keyExtractor={(item: Props) => item.id}
          />
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
          text={'Call now'}
          onPress={() => {
            let phoneNumber = data?.data?.store?.phone;

            if (Platform.OS === 'android') {
              Linking.openURL(`tel:${phoneNumber}`);
            } else {
              Linking.openURL(`telprompt:${phoneNumber}`);
            }
          }}
          isActive={false}
        />
      </HStack>
    </Stack>
  );
}
