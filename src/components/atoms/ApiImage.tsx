import {View, Text} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Image} from 'native-base';
import {Images} from '../../theme/icons';

interface Props {
  imageUrl: string;
  style: object;
  resizeMode: 'cover' | 'contain';
}

const SAS_TOKEN =
  'sp=r&st=2023-09-08T08:40:20Z&se=2028-09-08T16:40:20Z&spr=https&sv=2022-11-02&sr=c&sig=zzVXtSWmsCeYZizH7CfvILNulqFpTqvip5dj0k6Tl9Q%3D';

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
