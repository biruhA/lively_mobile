import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setFcmToken} from '../store/features/authSlice';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import {setHasNotification} from '../store/features/notificationSlice';

export function usePushNotification() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
      // console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(
        '🚀 ~ file: usePushNotification.ts:50 ~ messaging ~ remoteMessage:',
        remoteMessage,
      );
      dispatch(setHasNotification(true));
    });

    // Called when a message is delivered and app is in the background
    messaging().onNotificationOpenedApp(remoteMessage => {
      onMessageReceived(remoteMessage);
    });

    // Called when a message is delivered and app is closed
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          onMessageReceived(remoteMessage);
        }
      });
  };

  function onMessageReceived(remoteMessage: any) {
    console.log(
      '🚀 ~ file: usePushNotification.ts:80 ~ onMessageReceived ~ notification:',
      remoteMessage?.notification,
    );

    switch (remoteMessage?.notification?.title) {
      case 'Discount Claimed!':
        navigation.navigate(ScreenNames.NotificationDiscount);
        break;
      case 'Your prescription has been verified!':
        navigation.navigate(ScreenNames.NotificationDiscount);
        break;

      default:
        navigation.navigate(ScreenNames.Notification);
        break;
    }
  }
}
