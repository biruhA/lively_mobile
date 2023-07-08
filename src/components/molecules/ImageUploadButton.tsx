import {TouchableOpacity, Platform, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import {HStack, Image, Stack, Text} from 'native-base';
import {colors} from '../../theme/colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useUploadPrescriptionMutation} from '../../store/services';

export function ImageUploadButton({onClose}) {
  const [uploadPrescription, res] = useUploadPrescriptionMutation();
  console.log(
    '🚀 ~ file: ImageUploadButton.tsx:10 ~ ImageUploadButton ~ res:',
    res,
  );

  useEffect(() => {
    if (!res?.isLoading && !res?.isUninitialized) {
      onClose();
    }
  }, [res]);

  let options = {
    title: 'You can choose one image',
    maxWidth: 256,
    maxHeight: 256,
    storageOptions: {
      skipBackup: true,
    },
  };

  async function takeImage() {
    const result = await launchCamera(options);
    const formData = new FormData('image', {
      name: result?.assets[0]?.fileName,
      type: result?.assets[0]?.type,
      uri:
        Platform.OS === 'ios'
          ? result?.assets[0]?.uri.replace('file://', '')
          : result?.assets[0]?.uri,
    });
    uploadPrescription(formData);
  }

  async function selectImage() {
    const result = await launchImageLibrary(options);
    const formData = new FormData('image', {
      name: result?.assets[0]?.fileName,
      type: result?.assets[0]?.type,
      uri:
        Platform.OS === 'ios'
          ? result?.assets[0]?.uri.replace('file://', '')
          : result?.assets[0]?.uri,
    });
    uploadPrescription(formData);
  }

  return (
    <HStack
      justifyContent={'space-between'}
      alignItems={'center'}
      pb={4}
      px={4}
      pt={2}>
      <FlatButton
        image={require('../../assets/icons/ph-camera.png')}
        label={'Camera'}
        onPress={() => takeImage()}
      />
      <FlatButton
        image={require('../../assets/icons/solar-gallery-linear.png')}
        label={'Gallery'}
        onPress={() => selectImage()}
      />
    </HStack>
  );
}

function FlatButton({image, label, onPress}) {
  return (
    <TouchableOpacity style={{width: '47%'}} onPress={onPress}>
      <Stack
        bg={colors.unselected}
        w={140}
        h={90}
        space={1}
        alignItems={'center'}
        rounded={'lg'}
        justifyContent={'center'}>
        <Image source={image} alt="image" boxSize={6} resizeMode="center" />
        <Text
          color={colors.primary}
          fontFamily={'Poppins-Regular'}
          fontSize={16}>
          {label}
        </Text>
      </Stack>
    </TouchableOpacity>
  );
}
