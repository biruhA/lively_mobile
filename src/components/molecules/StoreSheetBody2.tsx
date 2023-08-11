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

interface Props {
  isOpen: any;
  onClose: any;
}

export function StoreSheetBody2({isOpen, onClose}: Props) {
  const {token} = useAppSelector(state => state.auth);
  const {userLocation} = useAppSelector(state => state.search);
  const {selectedStoreId} = useAppSelector(state => state.store);
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
      <Stack h={325}>
        {data?.data?.contactAddress?.phone && (
          <ContactAddressItem
            label="Phone Number"
            item={data?.data?.contactAddress?.phone}
            url={phone}
          />
        )}
        {data?.data?.contactAddress?.location && (
          <ContactAddressItem
            label="Location"
            item={data?.data?.contactAddress?.location}
            url={location}
          />
        )}
        {data?.data?.contactAddress?.facebook && (
          <ContactAddressItem
            label="Facebook"
            item={data?.data?.contactAddress?.facebook}
            url={facebook}
          />
        )}
        {data?.data?.contactAddress?.telegram && (
          <ContactAddressItem
            label="Telegram"
            item={data?.data?.contactAddress?.telegram}
            url={telegram}
          />
        )}
        {data?.data?.contactAddress?.website && (
          <ContactAddressItem
            label="Website"
            item={data?.data?.contactAddress?.website}
            url={website}
          />
        )}
        {data?.data?.contactAddress?.whatsApp && (
          <ContactAddressItem
            label="WhatsApp"
            item={data?.data?.contactAddress?.whatsApp}
            url={whatsup}
          />
        )}
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
        onPress={() => {}}
      />
      <LoginSheetBody isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}

function ContactAddressItem({item, label, url}) {
  return (
    <HStack
      py={2}
      justifyContent={'space-between'}
      alignItems={'center'}
      borderBottomWidth={1}
      borderBottomColor={colors.border}>
      <Text style={fonts.body1}>{label}</Text>
      <TouchableOpacity onPress={() => onPress({label, item})}>
        <Image source={url} alt="phone" boxSize={7} borderRadius={6} />
      </TouchableOpacity>
    </HStack>
  );
}

function onPress({label, item}) {
  switch (label) {
    case 'Phone Number':
      let phoneNumber = '';

      if (Platform.OS === 'android') {
        phoneNumber = 'tel:${1234567890}';
      } else {
        phoneNumber = 'telprompt:${item?.phone}';
      }

      Linking.openURL(phoneNumber);
      break;
    case 'Location':
      const lat = item?.latitude;
      const lon = item?.longitude;
      const url = Platform.select({
        ios: 'maps:' + lat + ',' + lon,
        android: 'geo:' + lat + ',' + lon,
      });

      Linking.openURL(url);
      break;
    case 'Telegram':
      const url2 = item?.telegram;
      // const url2 = 'tg://+251921429029';
      Linking.openURL(url2).catch(err =>
        console.error('An error occurred', err),
      );
      break;
    case 'WhatsApp':
      const url3 = item?.whatsApp;
      // const url3 = `whatsapp://send?text=${'message'}&phone=${+251921429029}`;
      Linking.openURL(url3).catch(err =>
        console.error('An error occurred', err),
      );
      break;
    case 'Facebook':
      const url4 = item?.facebook;
      // const url4 = 'fb://+251921429029';
      Linking.openURL(url4).catch(err =>
        console.error('An error occurred', err),
      );
      break;
    case 'Website':
      const url5 = item?.website;
      // const url5 = 'https://www.google.com';
      Linking.openURL(url5).catch(err =>
        console.error('An error occurred', err),
      );
      break;
    default:
      break;
  }
}
