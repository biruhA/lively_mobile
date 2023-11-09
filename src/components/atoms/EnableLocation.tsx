import {PermissionsAndroid, Platform} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, Stack, Text} from 'native-base';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Icons} from '../../theme/icons';
import {GradientButton} from '..';
import Geolocation from 'react-native-geolocation-service';
import {useAppDispatch} from '../../store/hooks';
import {setCurrentLocation} from '../../store/features/searchSlice';
import {useFocus} from 'native-base/lib/typescript/components/primitives';
import {useFocusEffect} from '@react-navigation/native';

export default function EnableLocation({result, requestLocationPermission}) {
  return (
    <>
      {result === RESULTS.GRANTED && <></>}
      {result === RESULTS.BLOCKED && (
        <Stack justifyContent={'center'} bg={'white'} rounded={'2xl'} p={4}>
          <Image
            source={Icons.noInternet}
            w={'100%'}
            h={98}
            resizeMode="center"
          />
          <Stack space={1} py={5}>
            <Text
              textAlign={'center'}
              fontFamily={'Poppins-Medium'}
              color={'#5F5D5D'}>
              Denied Need to Enable Location
            </Text>
            <Text
              textAlign={'center'}
              fontFamily={'Poppins-Regular'}
              color={'#5F5D5D'}>
              Go to Setting > Location > Enable Location
            </Text>
          </Stack>
        </Stack>
      )}
      {result === RESULTS.DENIED && (
        <Stack justifyContent={'center'} bg={'white'} rounded={'2xl'} p={4}>
          <Image
            source={Icons.noInternet}
            w={'100%'}
            h={98}
            resizeMode="center"
          />
          <Stack py={5}>
            <Text
              textAlign={'center'}
              fontFamily={'Poppins-Regular'}
              color={'#5F5D5D'}>
              Please allow location access. We need your location
            </Text>
            <Text
              textAlign={'center'}
              fontFamily={'Poppins-Regular'}
              color={'#5F5D5D'}>
              in order to provide you with a better experience.
            </Text>
          </Stack>
          <GradientButton
            text="Enable Location"
            mainStyle={{
              borderRadius: 7,
              overflow: 'hidden',
              width: '100%',
            }}
            onPress={requestLocationPermission}
          />
        </Stack>
      )}
    </>
  );
}
