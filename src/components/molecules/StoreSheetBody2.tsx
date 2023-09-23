import React, {useEffect} from 'react';
import {FlatList, Linking, Platform, TouchableOpacity} from 'react-native';
import {
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  Toast,
  useDisclose,
  useToast,
} from 'native-base';
import placeBackground from '../../assets/images/place-background.png';
import {fonts} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import phone from '../../assets/images/phone.png';
import location from '../../assets/images/location.png';
import telegram from '../../assets/images/telegram.png';
import whatsup from '../../assets/images/whatsup.png';
import facebook from '../../assets/images/facebook.png';
import website from '../../assets/images/website.png';
import {ApiImage, GradientButtonSmall} from '../atoms';
import {LoginSheetBody} from '../organisms';
import {useAppSelector} from '../../store/hooks';
import {
  useClickSocialMutation,
  useNotifyStoreMutation,
  useStoreDetailByIdQuery,
} from '../../store/services';

interface Props {
  isOpen: any;
  onClose: any;
}

export function StoreSheetBody2({isOpen, onClose}: Props) {
  const toast = useToast();
  const {token} = useAppSelector(state => state.auth);
  const {userLocation} = useAppSelector(state => state.search);
  const {selectedStoreId} = useAppSelector(state => state.store);
  const [NotifyStore, result] = useNotifyStoreMutation();
  const {data, isLoading} = useStoreDetailByIdQuery({
    id: selectedStoreId,
    latitude: userLocation?.lat,
    longitude: userLocation?.lon,
    token,
  });

  useEffect(() => {
    if (result?.isError) {
      console.log();
      toast.show({
        description: 'Error: ' + result?.error?.data?.message,
        placement: 'top',
      });
    } else if (result?.isSuccess) {
      toast.show({
        description: 'Success',
        placement: 'top',
      });
    }
  }, [result]);

  if (isLoading) {
    return <Spinner py={'90%'} size="large" color="red" />;
  }

  return (
    <Stack bg={colors.pureWhite} w={'100%'} px={2} space={2}>
      <Stack>
        <Text style={fonts.body1}>You can find the product in this store</Text>
      </Stack>
      <ApiImage
        imageUrl={data?.data?.store_branch?.cover_image?.url}
        style={{width: '100%', height: 120, borderRadius: 5}}
        resizeMode="cover"
      />
      <HStack alignItems={'flex-start'}>
        <ApiImage
          imageUrl={data?.data?.store_logo?.url}
          style={{
            position: 'absolute',
            top: -20,
            left: 20,
            backgroundColor: 'white',
            width: 65,
            height: 60,
            borderRadius: 8,
          }}
        />
        <Stack ml={100}>
          <Text style={fonts.subtitle1} numberOfLines={2}>
            {data?.data?.store_name?.english}
          </Text>
          <Text>{data?.data?.store_branch?.address?.cityOrTown}</Text>
        </Stack>
      </HStack>
      <Stack>
        {data?.data?.contactAddress?.phone && (
          <ContactAddressItem
            id={data?.data?.id}
            label="Phone Number"
            item={data?.data?.contactAddress?.phone}
            url={phone}
          />
        )}
        {data?.data?.contactAddress?.location && (
          <ContactAddressItem
            id={data?.data?.id}
            label="Location"
            item={data?.data?.contactAddress?.location}
            url={location}
          />
        )}
        {data?.data?.contactAddress?.facebook && (
          <ContactAddressItem
            id={data?.data?.id}
            label="Facebook"
            item={data?.data?.contactAddress?.facebook}
            url={facebook}
          />
        )}
        {data?.data?.contactAddress?.telegram && (
          <ContactAddressItem
            id={data?.data?.id}
            label="Telegram"
            item={data?.data?.contactAddress?.telegram}
            url={telegram}
          />
        )}
        {data?.data?.contactAddress?.website && (
          <ContactAddressItem
            id={data?.data?.id}
            label="Website"
            item={data?.data?.contactAddress?.website}
            url={website}
          />
        )}
        {data?.data?.contactAddress?.whatsApp && (
          <ContactAddressItem
            id={data?.data?.id}
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
        isLoading={result?.isLoading}
        isActive={!result?.isLoading}
        mainStyle={{
          borderRadius: 8,
          width: '100%',
          marginTop: 5,
        }}
        containerStyle={{paddingVertical: 13}}
        text={
          !data?.data?.store_branch?.has_delivery
            ? 'Get in touch'
            : 'Request Delivery'
        }
        onPress={() => {
          NotifyStore({
            id: selectedStoreId,
            token,
          });
        }}
      />
    </Stack>
  );
}

function ContactAddressItem({id, item, label, url}) {
  const toast = useToast();
  const [ClickSocial, result] = useClickSocialMutation();
  const {token} = useAppSelector(state => state.auth);

  return (
    <HStack
      py={2}
      justifyContent={'space-between'}
      alignItems={'center'}
      borderBottomWidth={1}
      borderBottomColor={colors.border}>
      <Text style={fonts.body1}>{label}</Text>
      <TouchableOpacity
        onPress={() => onPress({id, label, item, ClickSocial, token})}>
        <Image source={url} alt="phone" boxSize={7} borderRadius={6} />
      </TouchableOpacity>
    </HStack>
  );
}

function onPress({id, label, item, ClickSocial, token}) {
  switch (label) {
    case 'Phone Number':
      let phoneNumber = '';
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${item}`;
      } else {
        phoneNumber = `telprompt:${item}`;
      }
      Linking.openURL(phoneNumber);
      ClickSocial({
        id,
        url: 'click-phone',
        token,
      });
      break;
    case 'Location':
      const lat = item?.latitude;
      const lon = item?.longitude;
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

      Linking.openURL(url);
      ClickSocial({
        id,
        url: 'click-map',
        token,
      });
      break;
    case 'Telegram':
      const url2 = item;
      // const url2 = 'tg://+251921429029';
      Linking.openURL(url2).catch(err =>
        console.error('An error occurred', err),
      );
      ClickSocial({
        id,
        url: 'click-telegram',
        token,
      });
      break;
    case 'WhatsApp':
      const url3 = item;
      // const url3 = `whatsapp://send?text=${'message'}&phone=${+251921429029}`;
      Linking.openURL(url3).catch(err =>
        console.error('An error occurred', err),
      );
      ClickSocial({
        id,
        url: 'click-whatsapp',
        token,
      });
      break;
    case 'Facebook':
      const url4 = item;
      // const url4 = 'fb://+251921429029';
      Linking.openURL(url4).catch(err =>
        console.error('An error occurred', err),
      );
      ClickSocial({
        id,
        url: 'click-facebook',
        token,
      });
      break;
    case 'Website':
      const url5 = item;
      Linking.openURL(url5).catch(err =>
        console.error('An error occurred', err),
      );
      ClickSocial({
        id,
        url: 'click-website',
        token,
      });
      break;
    default:
      break;
  }
}
