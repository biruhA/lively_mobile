import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text, Actionsheet, Stack, HStack, Image} from 'native-base';
import {colors} from '../../theme/colors';
import {ImageUploadButton} from '../molecules';

interface Props {
  isOpen: any;
  onClose: any;
}

export function PrescriptionUploadSheet({isOpen, onClose}: Props) {
  return (
    <Stack bg={colors.pureWhite}>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <PrescriptionUploadBody onClose={onClose} />
        </Actionsheet.Content>
      </Actionsheet>
    </Stack>
  );
}

function PrescriptionUploadBody({onClose}) {
  return (
    <Stack space={2} px={2} py={4}>
      <Text
        style={{
          fontFamily: 'Poppins-Black',
          fontSize: 20,
          fontWeight: '700',
          color: 'black',
        }}>
        Prescription Upload
      </Text>
      <Text style={styles.normalTxt}>
        Upload the prescription you get from the doctor.
      </Text>
      <ImageUploadButton onClose={onClose} />
      <HStack justifyContent={'space-between'}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            fontWeight: '500',
            color: 'black',
          }}>
          Some Additional Info
        </Text>
        <Image
          source={require('../../assets/icons/info.png')}
          alt="ellipse"
          boxSize={4}
          resizeMode="center"
        />
      </HStack>
      <List text="Valid prescription is..." />
      <List
        text="Want to take your Renewed Hope in a Jar Moisturiser on holiday? Try the
        15ml jar"
      />
      <Text
        pt={2}
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 16,
          fontWeight: '500',
          color: 'black',
        }}>
        Valid prescription image is as follow
      </Text>
      <HStack justifyItems={'space-between'} w={'100%'} pb={4}>
        <Image
          source={require('../../assets/images/incorrrect-upload.png')}
          alt="ellipse"
          h={145}
          w={'47%'}
          resizeMode="center"
        />
        <Image
          source={require('../../assets/images/correct-upload.png')}
          alt="ellipse"
          h={145}
          w={'47%'}
          resizeMode="center"
        />
      </HStack>
    </Stack>
  );
}

function List({text}) {
  return (
    <HStack alignItems={'flex-start'} space={2}>
      <Image
        mt={1.5}
        source={require('../../assets/icons/ellipse.png')}
        alt="ellipse"
        boxSize={1.5}
        resizeMode="center"
      />
      <Text style={styles.normalTxt}>{text}</Text>
    </HStack>
  );
}

const styles = StyleSheet.create({
  normalTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#A4A4A4',
  },
});
