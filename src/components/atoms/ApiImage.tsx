import {View, Text} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Image} from 'native-base';
import {Images} from '../../theme/icons';

interface Props {
  imageUrl: string;
  style: object;
}

export function ApiImage({imageUrl, style}: Props) {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <FastImage
      style={style}
      source={{uri: imageUrl}}
      resizeMode={'contain'}
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
