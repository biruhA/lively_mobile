/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Navigation} from './src/navigation';
import Context from './src/realm/config';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {colors} from './src/theme/colors';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import {Mixpanel} from 'mixpanel-react-native';
import Config from 'react-native-config';

const trackAutomaticEvents = true;
export const mixpanel = new Mixpanel(
  Config.MIXPANEL_PROJECT_KEY,
  trackAutomaticEvents,
);

LogBox.ignoreAllLogs();

const {RealmProvider} = Context;

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
    mixpanel.init();
  }, []);

  console.log(
    '🚀 ~ file: App.tsx:25 ~ Config.MIXPANEL_PROJECT_KEY:',
    Config.MIXPANEL_PROJECT_KEY,
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <RealmProvider>
        <Provider store={store}>
          <NavigationContainer>
            <NativeBaseProvider>
              <Navigation />
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
