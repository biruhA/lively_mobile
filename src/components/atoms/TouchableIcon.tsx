import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'native-base';

interface Props {
  image: any;
  boxSize?: number;
  onPress: any;
  style?: any;
}

export default function TouchableIcon({
  image,
  boxSize = 7,
  onPress,
  style,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image source={image} alt="filter" boxSize={boxSize} />
    </TouchableOpacity>
  );
}
