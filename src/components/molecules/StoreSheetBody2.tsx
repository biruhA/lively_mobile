import React from 'react';
import {FlatList, Linking, Platform, TouchableOpacity} from 'react-native';
import {HStack, Image, Spinner, Stack, Text, useDisclose} from 'native-base';
import placeBackground from '../../assets/images/place-background.png';
import {fonts} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import phone from '../../assets/images/phone.png';
import location from '../../assets/images/location.png';
import telegram from '../../assets/images/telegram.png';
import whatsup from '../../assets/images/whatsup.png';
import facebook from '../../assets/images/facebook.png';
import website from '../../assets/images/website.png';
import {GradientButtonSmall} from '../atoms';
import {LoginSheetBody} from '../organisms';
import {useAppSelector} from '../../store/hooks';
import {useStoreDetailByIdQuery} from '../../store/services';

export function StoreSheetBody2() {
  const {isOpen, onOpen, onClose} = useDisclose();
  const {token} = useAppSelector(state => state.auth);
  const {userLocation} = useAppSelector(state => state.search);
  const {selectedStoreId} = useAppSelector(state => state.store);
  const {selectedProduct} = useAppSelector(state => state.product);
  const {data, isLoading} = useStoreDetailByIdQuery({
    id: selectedStoreId,
    latitude: userLocation?.lat,
    longitude: userLocation?.lon,
    token,
  });

  if (isLoading) {
    return <Spinner py={'90%'} size="large" color="red" />;
  }

  return (
    <Stack bg={colors.pureWhite} w={'100%'} px={2} space={2}>
      <Stack>
        <Text style={fonts.heading6} pt={1}>
          {selectedProduct?.title?.english}
        </Text>
        <Text style={fonts.body1}>You can find the product in this store</Text>
      </Stack>
      <Image
        source={placeBackground}
        alt="Alternate Text"
        w={'100%'}
        h={120}
        resizeMode={'contain'}
      />
      <HStack alignItems={'flex-start'}>
        <Image
          position={'absolute'}
          borderRadius={8}
          top={-20}
          left={5}
          bg={'white'}
          source={{
            uri: data?.data?.store_logo?.url,
          }}
          alt="Alternate Text"
          w={65}
          h={60}
          resizeMode={'contain'}
        />
        <Stack ml={100}>
          <Text style={fonts.subtitle1} numberOfLines={2}>
            {data?.data?.store_name?.english}
          </Text>
          <Text>{data?.data?.store_branch?.address?.cityOrTown}</Text>
        </Stack>
      </HStack>
      <Stack>
        <ContactAddress data={data?.data?.contactAddress} />
      </Stack>
      <Stack space={1}>
        <Text style={[fonts.subtitle2, {color: 'black'}]}>
          Secure This Item
        </Text>
        <Text style={[fonts.body2, {color: colors.lightgreyText}]}>
          Reserve Now and Guarantee its Availability for 24 Hours
        </Text>
      </Stack>
      <GradientButtonSmall
        mainStyle={{
          borderRadius: 8,
          width: '100%',
          marginTop: 5,
        }}
        containerStyle={{paddingVertical: 13}}
        text="Reserve"
        onPress={onOpen}
      />
      <LoginSheetBody isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}

const Data = [
  {id: 1, url: phone, name: 'Phone Number'},
  {id: 2, url: location, name: 'Location'},
  {id: 3, url: telegram, name: 'Telegram'},
  {id: 4, url: whatsup, name: 'WhatsApp'},
  {id: 5, url: facebook, name: 'Facebook'},
  {id: 6, url: website, name: 'Website'},
];

function ContactAddress({data}) {
  return (
    <Stack borderWidth={1} borderColor={colors.border} p={2} borderRadius={8}>
      <Text style={[fonts.subtitle2, {color: 'black', paddingBottom: 5}]}>
        Contact Address
      </Text>
      <FlatList
        data={Data}
        renderItem={({item}) => (
          <HStack
            py={2}
            justifyContent={'space-between'}
            alignItems={'center'}
            borderBottomWidth={1}
            borderBottomColor={colors.border}>
            <Text style={fonts.body1}>{item?.name}</Text>
            <TouchableOpacity onPress={() => onPress(item?.name, data)}>
              <Image
                source={item?.url}
                alt="phone"
                boxSize={7}
                borderRadius={6}
              />
            </TouchableOpacity>
          </HStack>
        )}
        keyExtractor={item => item.id}
      />
    </Stack>
  );
}

function onPress(item, data) {
  console.log(
    '🚀 ~ file: StoreSheetBody2.tsx:144 ~ onPress ~ item, data:',
    item,
    data,
  );
  switch (item) {
    case 'Phone Number':
      let phoneNumber = '';

      if (Platform.OS === 'android') {
        phoneNumber = 'tel:${data?.phone}';
      } else {
        phoneNumber = 'telprompt:${data?.phone}';
      }

      Linking.openURL(phoneNumber);
      break;
    case 'Location':
      const lat = data?.location?.latitude;
      const lon = data?.location?.longitude;
      const url = Platform.select({
        ios: 'maps:' + lat + ',' + lon,
        android: 'geo:' + lat + ',' + lon,
      });

      Linking.openURL(url);
      break;
    case 'Telegram':
      const url2 = data?.telegram;
      // const url2 = 'tg://+251921429029';
      Linking.openURL(url2).catch(err =>
        console.error('An error occurred', err),
      );
      break;
    case 'WhatsApp':
      const url3 = data?.whatsApp;
      // const url3 = `whatsapp://send?text=${'message'}&phone=${+251921429029}`;
      Linking.openURL(url3).catch(err =>
        console.error('An error occurred', err),
      );
      break;
    case 'Facebook':
      const url4 = data?.facebook;
      // const url4 = 'fb://+251921429029';
      Linking.openURL(url4).catch(err =>
        console.error('An error occurred', err),
      );
      break;
    case 'Website':
      const url5 = data?.website;
      // const url5 = 'https://www.google.com';
      Linking.openURL(url5).catch(err =>
        console.error('An error occurred', err),
      );
      break;
    default:
      break;
  }
}
