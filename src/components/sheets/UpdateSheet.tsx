import {Linking} from 'react-native';
import React, {useEffect} from 'react';
import {
  Actionsheet,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useDisclose,
} from 'native-base';
import {useDispatch} from 'react-redux';
import {setCurrentVersion} from '../../store/features/settingSlice';
import {GradientButton} from '..';
import {fonts} from '../../theme/fonts';

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
        <Stack w={'100%'} px={4}>
          <Image
            source={require('../../assets/images/Google-Play-Logo.png')}
            w={102}
            h={29}
            alt="Google Play"
            alignContent={'flex-start'}
          />
          <Text pt={1} style={fonts.heading6} mt={5}>
            Update Available
          </Text>
          <Text style={fonts.body1}>
            To use this app, download the latest version.
          </Text>
          <HStack space={3} alignItems={'center'} my={6}>
            <Image
              source={require('../../assets/images/app_Icon.png')}
              boxSize={60}
              alt="Google Play"
              alignContent={'flex-start'}
            />
            <Stack>
              <Text
                style={[
                  fonts.normal,
                  {fontSize: 20, fontWeight: 700, color: 'black'},
                ]}>
                Lively
              </Text>
              <Text
                style={[
                  fonts.normal,
                  {fontSize: 14, fontWeight: 400, color: '#6B6B6B'},
                ]}>
                Unravel Technologies {versionData?.currentVersion}
              </Text>
            </Stack>
          </HStack>
          <HStack space={2} alignItems={'center'}>
            <Button
              h={45}
              rounded={'full'}
              variant={'outline'}
              w={'50%'}
              colorScheme={'green'}
              onPress={() => {
                Linking.openURL(versionData?.storeUrl);
              }}>
              More info.
            </Button>
            <GradientButton
              text="Update"
              mainStyle={{
                borderRadius: 200,
                overflow: 'hidden',
                width: '50%',
              }}
              onPress={() => {
                Linking.openURL(versionData?.storeUrl);
              }}
            />
          </HStack>
        </Stack>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
