import {StyleSheet} from 'react-native';
import React from 'react';
import {Stack} from 'native-base';

interface Props {
  children: any;
  style: any;
}

export function ShadowCard({children, style}: Props) {
  return <Stack style={[styles.main, style]}>{children}</Stack>;
}

const styles = StyleSheet.create({
  main: {
    shadowColor: 'rgba(25, 38, 32, 0.3)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
});
