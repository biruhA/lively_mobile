import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useAppDispatch} from '../store/hooks';
import {setCurrentLocation} from '../store/features/searchSlice';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export function useCurrentLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [res, setResult] = useState(null);
  const dispatch = useAppDispatch();

  function handleLocationPermission() {
    try {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(res => {
        console.log(
          '🚀 ~ file: useCurrentLocation.ts:26 ~ request ~ res:',
          res,
        );
        setResult(res);
        if (res !== RESULTS.GRANTED) {
          requestLocationPermission();
        }
      });
    } catch (error) {
      console.log('location set error:', error);
    }
  }

  useEffect(() => {
    handleLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const openSetting = () => {
        Linking.openSettings().catch(() => {
          Alert.alert('Unable to open settings');
        });
      };
      const status = await Geolocation.requestAuthorization('whenInUse');
      setResult(status);

      if (status === 'granted') {
        return true;
      }

      if (status === 'denied') {
        Alert.alert('Location permission denied');
      }

      if (status === 'disabled') {
        Alert.alert(
          'Turn on Location Services to allow Lively to determine your location.',
          '',
          [
            {text: 'Go to Settings', onPress: openSetting},
            {text: "Don't Use Location", onPress: () => {}},
          ],
        );
      }
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
          setResult('granted');
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

  return {
    res,
    location,
    error,
    requestLocationPermission,
    handleLocationPermission,
  };
}
