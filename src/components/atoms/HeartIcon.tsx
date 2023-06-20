import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'native-base';
import heart from '../../assets/icons/heart.png';
import activeHeart from '../../assets/icons/active_heart.png';

export function HeartIcon() {
  const [isActive, setIsActive] = useState(false);
  return (
    <TouchableOpacity onPress={() => setIsActive(prev => !prev)}>
      {!isActive ? <InactiveImage /> : <ActiveImage />}
    </TouchableOpacity>
  );
}

function ActiveImage() {
  return <Image source={activeHeart} alt="Alternate Text" boxSize={4} />;
}

function InactiveImage() {
  return <Image source={heart} alt="Alternate Text" boxSize={4} />;
}
