import {Linking} from 'react-native';
import React, {useEffect} from 'react';
import {Actionsheet, Heading, Text, useDisclose} from 'native-base';
import {useDispatch} from 'react-redux';
import {setCurrentVersion} from '../../store/features/settingSlice';

export function UpdateSheet({versionData = false}) {
  const dispatch = useDispatch();
  const {isOpen, onOpen, onClose} = useDisclose();

  useEffect(() => {
    dispatch(setCurrentVersion(versionData?.currentVersion));
    if (versionData?.isNeeded) {
      onOpen();
    }
  }, [versionData]);

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Heading size="md">Update</Heading>
        <Actionsheet.Item
          onPress={() => {
            Linking.openURL(versionData?.storeUrl);
          }}>
          Please Updata
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
