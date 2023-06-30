import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'native-base';
import heart from '../../assets/icons/heart.png';
import activeHeart from '../../assets/icons/active_heart.png';

import visible from '../../assets/icons/creating-an-account-visible.png';
import invisible from '../../assets/icons/creating-an-account-open-eye.png';

export function PasswordIcon({isActive, setIsActive}) {
  return (
    <TouchableOpacity
      onPress={() => setIsActive(prev => !prev)}
      style={{
        // backgroundColor: 'red',
        marginRight: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>
      {!isActive ? <InactiveImage /> : <ActiveImage />}
    </TouchableOpacity>
  );
}

function ActiveImage() {
  return <Image source={invisible} alt="Alternate Text" boxSize={4} />;
}

function InactiveImage() {
  return <Image source={visible} alt="Alternate Text" boxSize={4} />;
}
