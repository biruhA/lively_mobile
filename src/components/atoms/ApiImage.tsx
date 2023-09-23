import {View, Text} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Image} from 'native-base';
import {Images} from '../../theme/icons';
import Config from 'react-native-config';

interface Props {
  imageUrl: string;
  style: object;
  resizeMode: 'cover' | 'contain';
}

const SAS_TOKEN = Config.SAS_TOKEN;

export function ApiImage({imageUrl, style, resizeMode = 'contain'}: Props) {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <FastImage
      style={style}
      source={{uri: `${imageUrl}?${SAS_TOKEN}`}}
      resizeMode={resizeMode}
      onLoad={() => {
        setHasLoaded(true);
      }}
      onError={() => {
        setHasLoaded(false);
      }}>
      <Image
        source={Images.placeholder}
        style={[style, {display: hasLoaded ? 'none' : 'flex'}]}
      />
    </FastImage>
  );
}
