/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Navigation} from './src/navigation';
import Context from './src/realm/config';
import {Provider, useDispatch} from 'react-redux';
import {store} from './src/store';
import {colors} from './src/theme/colors';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import {Mixpanel} from 'mixpanel-react-native';
import Config from 'react-native-config';
import RNUxcam from 'react-native-ux-cam';
import VersionCheck from 'react-native-version-check';
import {UpdateSheet} from './src/components';
import {setCurrentVersion} from './src/store/features/settingSlice';

const userAppKey = Config.UX_CAM_USERAPPKEY;

RNUxcam.optIntoSchematicRecordings();

const configuration = {
  userAppKey,
  enableAutomaticScreenNameTagging: false,
  enableAdvancedGestureRecognition: true,
  enableImprovedScreenCapture: true,
};

RNUxcam.startWithConfiguration(configuration);

const trackAutomaticEvents = true;
export const mixpanel = new Mixpanel(
  Config.MIXPANEL_PROJECT_KEY,
  trackAutomaticEvents,
);

LogBox.ignoreAllLogs();

const {RealmProvider} = Context;

function App(): JSX.Element {
  const [versionData, setVersionData] = useState();

  function CheckVersion() {
    VersionCheck.needUpdate().then(async res => {
      setVersionData(res);
    });
  }

  useEffect(() => {
    SplashScreen.hide();
    mixpanel.init();
    CheckVersion();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <RealmProvider>
        <Provider store={store}>
          <NavigationContainer>
            <NativeBaseProvider>
              <Navigation />
              {true && <UpdateSheet versionData={versionData} />}
            </NativeBaseProvider>
          </NavigationContainer>
        </Provider>
      </RealmProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
