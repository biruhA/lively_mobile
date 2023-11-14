import {
  TouchableOpacity,
  FlatList,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
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
  Button,
  Divider,
} from 'native-base';
import {colors} from '../theme/colors';
import {
  PlaceDetailsHeader,
  PlacesProductCard,
  Rating,
  SearchBar,
} from '../components/molecules';
import {
  ApiImage,
  ButtonTabs,
  GradientButtonSmall,
  ListEmptyComponent,
  ToggleIcon,
} from '../components/atoms';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import faceHappy from '../assets/icons/system-uicons-face-happy.png';
import location from '../assets/icons/location_regular.png';
import locationWhite from '../assets/icons/location_white.png';
import call from '../assets/icons/phone.png';
import {usePlaceDetailQuery} from '../store/services';
import {useAppSelector} from '../store/hooks';
import {fonts} from '../theme/fonts';
import FastImage from 'react-native-fast-image';
import {Icons, icons} from '../theme/icons';
import TouchableIcon from '../components/atoms/TouchableIcon';
import {UserReviewCard} from '../components';

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
  console.log(
    '🚀 ~ file: PlaceDetails.tsx:64 ~ PlaceDetails ~ data:',
    data?.data,
  );

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
        <PlaceDetailsHeader
          id={route?.params?.id}
          isWishlist={data?.data?.is_wishlist}
        />
      </Stack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack bg={colors.pureWhite} h={5} w={'100%'} />
        <Stack mb={16}>
          <ApiImage
            imageUrl={data?.data?.cover_image?.url}
            style={{backgroundColor: 'white', width: '100%', height: 220}}
          />
          <HStack
            alignItems={'center'}
            space={4}
            position={'absolute'}
            bottom={-65}
            left={4}
            zIndex={2}>
            <ApiImage
              imageUrl={data?.data?.store?.store_logo?.url}
              style={{width: 77, height: 77, borderRadius: 200}}
              resizeMode="contain"
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

        <Stack px={4} bg={'white'} space={2}>
          <MoreInfo data={data} />
          <Rating data={data} initalActive={data?.data?.rating?.average} />
          <UsersRating data={data?.data?.rating} />
          {data?.data?.rating?.review && (
            <>
              <UserReviewCard
                data={data?.data?.rating?.review}
                hasReadMoreButton={false}
              />
              <Button
                variant={'ghost'}
                colorScheme={'coolGray'}
                size={'lg'}
                onPress={() => navigation.navigate(ScreenNames.Rating, {data})}>
                See More
              </Button>
            </>
          )}
        </Stack>

        <Stack px={4} bg={'white'}>
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
            keyExtractor={item => item.id}
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

function MoreInfo({data}) {
  const navigation = useNavigation();
  return (
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
            <Heading size="xs" color={colors.primary}>
              Open now
            </Heading>
          ) : (
            <Heading size="xs" color={colors.error}>
              Closed
            </Heading>
          )}
          <Heading size="md" color={colors.error}>
            .
          </Heading>
          <Text color={colors.greyText}>
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
  );
}

function UsersRating({data}) {
  if (data?.average === 0) {
    return;
  }

  return (
    <HStack
      alignItems={'center'}
      p={3}
      pl={5}
      bg="white"
      rounded={'xs'}
      borderColor={colors.grey}
      borderWidth={0.1}
      space={5}>
      <Heading size={'2xl'} style={fonts.heading2}>
        {data?.average}
      </Heading>
      <Stack space={1}>
        <Image
          source={Icons.smileFace.yellow}
          boxSize={4}
          resizeMode={'contain'}
        />
        <Text style={fonts.button2}>Based on {data?.users_count} users</Text>
      </Stack>
    </HStack>
  );
}
