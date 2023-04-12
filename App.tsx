/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Navigation} from './src/navigation';
import Context from './src/realm';
import {Provider} from 'react-redux';
import {store} from './src/store';

const {RealmProvider} = Context;

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} />
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
  },
});

export default App;
