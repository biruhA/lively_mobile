import {View, Text} from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';

export function QRImage({value, getRef}) {
  return (
    <QRCode
      value={value}
      size={200}
      color="black"
      backgroundColor="white"
      getRef={getRef}
    />
  );
}
