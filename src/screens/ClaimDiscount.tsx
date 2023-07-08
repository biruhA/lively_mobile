import {
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Button, HStack, Image, Pressable, Stack, Text} from 'native-base';
import {GoBack, GradientButtonSmall, QRImage} from '../components/atoms';
import {colors} from '../theme/colors';
import {fonts} from '../theme/fonts';
import download from '../assets/icons/download.png';
import {useRoute, useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import CameraRoll, {useCameraRoll} from '@react-native-camera-roll/camera-roll';

export function ClaimDiscount() {
  const route = useRoute();
  const [productQRref, setProductQRref] = useState();
  const [photos, getPhotos, save] = useCameraRoll();
  console.log(
    '🚀 ~ file: ClaimDiscount.tsx:21 ~ ClaimDiscount ~ photos:',
    photos,
  );

  const saveQrToDisk = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    if (productQRref) {
      productQRref.toDataURL(data => {
        let filePath =
          RNFS.CachesDirectoryPath + `/${route?.params?.promo_code}.png`;
        RNFS.writeFile(filePath, data, 'base64')
          .then(success => {
            console.log(
              '🚀 ~ file: ClaimDiscount.tsx:32 ~ saveQrToDisk ~ success:',
              success,
              ' : ',
              filePath,
            );
            return save(filePath, 'photo');
          })
          .then(() => {
            ToastAndroid.show('QRCode saved to gallery', ToastAndroid.LONG);
          });
      });
    }
  };

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  function Example() {
    return (
      <>
        <Button
          title="Get Photos"
          onPress={() =>
            getPhotos({
              first: 1,
              assetType: 'Photos',
            })
          }>
          Get Photos
        </Button>
        {/* {photos?.map(photo => {
          return (
            <Image
              alt="brand"
              source={photo}
              boxSize={8}
              borderRadius={8}
              resizeMode="contain"
            />
          );
        })} */}
      </>
    );
  }

  return (
    <Stack>
      <Stack px={5} pt={4} pb={7} mb={4} bg={colors.pureWhite}>
        <GoBack label="" />
      </Stack>
      <Example />
      <Stack py={4} px={5}>
        <Stack
          alignItems={'center'}
          shadow={2}
          borderRadius={8}
          space={3}
          bg={colors.pureWhite}>
          <Pressable
            position={'absolute'}
            right={5}
            top={5}
            zIndex={1}
            onPress={() => saveQrToDisk()}>
            <Image
              alt="brand"
              source={download}
              boxSize={8}
              borderRadius={8}
              resizeMode="contain"
            />
          </Pressable>

          <QRImage
            value={JSON.stringify(route?.params?.promo_code)}
            getRef={c => setProductQRref(c)}
          />

          <Stack>
            <Text style={fonts.heading5} textAlign={'center'} pt={2}>
              You are successfully
            </Text>
            <Text style={fonts.heading5} textAlign={'center'} pt={2}>
              generated QR & promo code
            </Text>
          </Stack>
          <Text style={fonts.body1} textAlign={'center'}>
            You are reserved this item for 24 hours, so collect your item with
            in the time!
          </Text>
          <Stack bg={'#F4F4F4B2'} borderRadius={5} px={41} py={21}>
            <Text pt={2} style={fonts.heading5}>
              {route?.params?.promo_code}
            </Text>
          </Stack>
          <Text style={fonts.body1} textAlign={'center'}>
            You are reserved this item for 24 hours, so collect your item with
            in the time!
          </Text>
          <HStack pb={5}>
            <GradientButtonSmall isActive={false} text="Share" variant="flat" />
            <GradientButtonSmall text="Go to store" variant="flat" />
          </HStack>
        </Stack>
      </Stack>
    </Stack>
  );
}
