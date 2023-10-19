import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'native-base';
import heart from '../../assets/icons/heart.png';
import activeHeart from '../../assets/icons/active_heart.png';

interface Props {
  id: number;
  activeImage: any;
  inactiveImage: any;
  onPress: any;
  isActive: any;
}

export function ToggleIcon({
  id,
  activeImage,
  inactiveImage,
  onPress,
  isActive,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      {isActive !== id ? (
        <InactiveImage image={inactiveImage} />
      ) : (
        <ActiveImage image={activeImage} />
      )}
    </TouchableOpacity>
  );
}

function ActiveImage({image}) {
  return (
    <Image
      source={image}
      alt="Alternate Text"
      boxSize={10}
      resizeMode="contain"
    />
  );
}

function InactiveImage({image}) {
  return (
    <Image
      source={image}
      alt="Alternate Text"
      boxSize={10}
      resizeMode="contain"
    />
  );
}
