import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setFcmToken} from '../store/features/authSlice';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';

export function usePushNotification() {
  const dispatch = useDispatch();

  useEffect(() => {
    requestUserPermission();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission({
      sound: true,
      announcement: true,
      badge: true,
      alert: true,
      provisional: true,
    });

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await getFCMToken();
    } else {
      console.log('User has disabled notification permissions');
    }
    notificationListner();
  }

  async function getFCMToken() {
    await messaging().registerDeviceForRemoteMessages();
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
    const fcmToken = await messaging().getToken();
    dispatch(setFcmToken(fcmToken));
  }

  const notificationListner = () => {
    // Foreground message listener
    messaging().onMessage(async remoteMessage => {
      console.log(
        '🚀 ~ file: usePushNotification.ts:50 ~ messaging ~ remoteMessage:',
        remoteMessage?.notification,
      );
      // console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // Called when a message is delivered and app is in the background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Called when a message is delivered and app is closed
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  };
}
