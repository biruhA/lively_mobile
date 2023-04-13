import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {fonts} from '../theme/fonts';

export function Navigation() {
  return (
    <NavigationContainer>
      <View>
        <Text style={styles.bold}>Navigation</Text>
        <Text style={{fontFamily: 'Poppins-Light'}}>Navigation</Text>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bold: fonts.body1,
});
