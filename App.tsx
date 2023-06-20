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
import {LogBox} from 'react-native';

//TODO remove this log before build
LogBox.ignoreLogs([
  "exported from 'deprecated-react-native-prop-types'.",
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

const {RealmProvider} = Context;

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.pureWhite} />
      <RealmProvider>
        <Provider store={store}>
          <NativeBaseProvider>
            <Navigation />
          </NativeBaseProvider>
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
