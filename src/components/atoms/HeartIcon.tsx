import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'native-base';
import heart from '../../assets/icons/heart.png';
import activeHeart from '../../assets/icons/active_heart.png';
import {
  useProductWishlistMutation,
  useStoreWishlistMutation,
} from '../../store/services';
import {useAppSelector} from '../../store/hooks';

export function HeartIcon({id, init = false, isStore = false}) {
  const {token} = useAppSelector(state => state.auth);
  const [isActive, setIsActive] = useState(init);
  const [ProductWishlist, productRes] = useProductWishlistMutation();
  const [StoreWishlist, storeRes] = useStoreWishlistMutation();

  function onPress() {
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

  return (
    <TouchableOpacity onPress={onPress} style={{padding: 10}}>
      {!isActive ? <InactiveImage /> : <ActiveImage />}
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
