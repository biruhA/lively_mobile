import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';

export async function requestUserPermission() {
  let fcmToken;
  console.log('Step 1');
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
    console.log('Step 2');
    fcmToken = await getFCMToken();
  } else {
    console.log('User has disabled notification permissions');
  }
  notificationListner();

  console.log('🚀 ~ file: index.ts:36 ~ getFCMToken ~ fcmToken:', fcmToken);
}

async function getFCMToken() {
  console.log('Step 3');
  await messaging().registerDeviceForRemoteMessages();
  console.log('Step 4');
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }

  const fcmToken = await messaging().getToken();
  console.log('🚀 ~ file: index.ts:36 ~ getFCMToken ~ fcmToken:', fcmToken);
}

const notificationListner = () => {
  // Foreground message listener
  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
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
