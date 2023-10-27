import {PermissionsAndroid, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image, Stack, Text} from 'native-base';
import {PERMISSIONS, request} from 'react-native-permissions';
import {Icons} from '../../theme/icons';
import {GradientButton} from '..';
import Geolocation from 'react-native-geolocation-service';
import {useAppDispatch} from '../../store/hooks';
import {setCurrentLocation} from '../../store/features/searchSlice';

export default function EnableLocation() {
  const [has, setHas] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(res => {
        console.log('🚀 ~ file: EnableLocation.tsx:17 ~ useEffect ~ res:', res);
        if (res == 'granted') {
          setHas(true);
        } else {
          setHas(false);
        }
      });
    } catch (error) {
      console.log('location set error:', error);
    }
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      console.log('iOS device Location permission granted');
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        dispatch(
          setCurrentLocation({
            lat: position?.coords?.latitude,
            lon: position?.coords?.longitude,
          }),
        );
      },
      error => {
        setError({
          code: error.code,
          message: error.message,
        });
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <>
      {!has && (
        <Stack>
          <Image source={Icons.noInternet} w={'100%'} h={300} />
          <Text
            textAlign={'center'}
            fontFamily={'Poppins-Regular'}
            color={'#5F5D5D'}>
            Please allow location access. We need
          </Text>
          <Text
            textAlign={'center'}
            fontFamily={'Poppins-Regular'}
            color={'#5F5D5D'}>
            your location in order to provide you with
          </Text>
          <Text
            textAlign={'center'}
            fontFamily={'Poppins-Regular'}
            color={'#5F5D5D'}>
            a better experience.
          </Text>
          <GradientButton
            text="Enable Location"
            mainStyle={{marginTop: 15}}
            onPress={async () => {
              await requestLocationPermission();
            }}
          />
        </Stack>
      )}
    </>
  );
}
