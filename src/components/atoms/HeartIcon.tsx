import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image, useDisclose} from 'native-base';
import heart from '../../assets/icons/heart.png';
import activeHeart from '../../assets/icons/active_heart.png';
import {
  useProductWishlistMutation,
  useStoreWishlistMutation,
} from '../../store/services';
import {useAppSelector} from '../../store/hooks';
import {LoginSheet} from '../sheets';
import {useNavigation} from '@react-navigation/native';

export function HeartIcon({id, init = false, isStore = false}) {
  const {token, isLoggedIn, inAppLoggedIn} = useAppSelector(
    state => state.auth,
  );
  const [isActive, setIsActive] = useState(init);
  const [ProductWishlist, productRes] = useProductWishlistMutation();
  const [StoreWishlist, storeRes] = useStoreWishlistMutation();
  const {isOpen, onClose, onOpen} = useDisclose();

  function handleWishlist() {
    setIsActive(prev => !prev);
    if (isStore) {
      StoreWishlist({
        id,
        token,
      });
    } else {
      ProductWishlist({
        id,
        token,
      });
    }
  }

  function onPress() {
    if (isLoggedIn || (!isLoggedIn && inAppLoggedIn)) {
      handleWishlist();
    } else {
      onOpen();
    }
  }

  return (
    <TouchableOpacity onPress={onPress} style={{padding: 10}}>
      {!isActive ? <InactiveImage /> : <ActiveImage />}
      <LoginSheet isOpen={isOpen} onClose={onClose} action={''} payload="" />
    </TouchableOpacity>
  );
}

function ActiveImage() {
  return (
    <Image
      source={activeHeart}
      alt="Alternate Text"
      boxSize={4}
      resizeMode="contain"
    />
  );
}

function InactiveImage() {
  return (
    <Image
      source={heart}
      alt="Alternate Text"
      boxSize={4}
      resizeMode="contain"
    />
  );
}
