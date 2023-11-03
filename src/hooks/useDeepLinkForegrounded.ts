import {useEffect} from 'react';
import {Linking} from 'react-native';
import DeepLinking from 'react-native-deep-linking';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'native-base';
import {ScreenNames} from '../constants';
import {useAppDispatch} from '../store/hooks';
import {setProductId} from '../store/features/productSlice';

export type DeepLinkPath = 'product' | 'store';

export const useDeepLinkForegrounded = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    DeepLinking.addScheme('https://');
    Linking.addEventListener('url', handleUrl);
    return () => {
      Linking.removeEventListener('url', handleUrl);
    };
  }, []);

  function handleUrl(url) {
    const baseurl = url?.url;
    const path = url?.url?.split('/')[3];
    const id = url?.url?.split('/')[4];

    toast.show({
      description: `Url: ${baseurl}, path: ${path}, id: ${id}`,
      placement: 'top',
    });

    switch (path) {
      case 'product':
        dispatch(setProductId(id));
        navigation.navigate(ScreenNames.ProductDetailScreen);
        break;

      default:
        toast.show({
          description: 'Link unknown',
          placement: 'top',
        });
        break;
    }
  }
};
