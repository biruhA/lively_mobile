import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useAppDispatch} from '../store/hooks';
import {setCurrentLocation} from '../store/features/searchSlice';

export function useCurrentLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();

  const requestLocationPermission = async () => {
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
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

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

  return {location, getLocation, error};
}
