import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'native-base';
import login from '../../assets/images/login.png';

export function LoginBackGround() {
  return (
    <Image
      zIndex={-1}
      position={'absolute'}
      bottom={0}
      w={'100%'}
      height={267}
      source={login}
      alt="login"
    />
  );
}
