import {View, Text, Share, Button} from 'react-native';
import React from 'react';
import {useToast} from 'native-base';
import {DeepLinkPath} from '../../hooks';
import TouchableIcon from './TouchableIcon';
import {Icons} from '../../theme/icons';

interface Props {
  path: string;
  id: string;
}

export default function ShareButton({path, id}: Props) {
  const toast = useToast();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://www.lively-et.com/${path}/${id}`,
      });
      console.log('🚀 ~ file: ShareButton.tsx:11 ~ onShare ~ result:', result);
    } catch (error) {
      toast.show({
        description: 'Error: ' + error.message,
        placement: 'top',
      });
    }
  };

  return <TouchableIcon onPress={onShare} image={Icons.share} boxSize={6} />;
}
