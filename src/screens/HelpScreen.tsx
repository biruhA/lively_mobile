import React, {useState} from 'react';
import {
  Stack,
  Text,
  Avatar,
  Center,
  VStack,
  Image,
  HStack,
  ChevronRightIcon,
  View,
  useDisclose,
  Badge,
  Button,
  Actionsheet,
  Box,
  Input,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {SettingsScreenHeader} from '../components/organisms';
import {ProfileScreensHeader, SettingItems} from '../components/molecules';
import {colors} from '../theme/colors';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import about from '../assets/icons/settingIcons/faq.png';
import faq from '../assets/icons/settingIcons/faq2.png';
import help from '../assets/icons/settingIcons/help.png';
import lively_logo from '../assets/images/lively_logo.png';
import lang from '../assets/icons/settingIcons/lang.png';
import edit from '../assets/icons/pencil-edit.png';
import terms_and_cond from '../assets/icons/settingIcons/terms-conditions.png';
import logout from '../assets/icons/settingIcons/logout.png';
import {ScreenNames} from '../constants';
import {GradientButton} from '../components/atoms';

export function HelpScreen() {
  const onSubmit = () => {
    console.log('====================================');
    console.log('Mr. Biruh, please o your things here ');
    console.log('====================================');
  };
  return (
    <Stack
      bg={colors.pureWhite}
      h={'full'}
      style={{backgroundColor: colors.pagesBackeground}}>
      <View w={'full'}>
        <ProfileScreensHeader
          navigationTo={ScreenNames.Settings}
          screenName="Help"
        />
      </View>
      <ScrollView>
        <Stack py={2} />
        <Stack
          my={2}
          bg={colors.pureWhite}
          borderRadius={12}
          shadow={'0.5'}
          mx={1}
          px={4}
          py={4}
          space={2}>
          <Center>
            <VStack
              space={2}
              alignItems={{
                base: 'center',
                md: 'flex-start',
              }}>
              <HStack space={2}>
                <VStack w="100%">
                  <FormControl.Label>Subject</FormControl.Label>
                  <TextInput
                    editable
                    placeholder="Write your subject"
                    // onChangeText={text => onChangeText(text)}
                    // value={value}
                    style={styles.subjectInput}
                  />
                </VStack>
              </HStack>
              <HStack space={2}>
                <VStack w="100%">
                  <FormControl.Label>Your Message</FormControl.Label>
                  <TextInput
                    editable
                    multiline
                    numberOfLines={10}
                    maxLength={40}
                    placeholder="Write your message here"
                    // onChangeText={text => onChangeText(text)}
                    // value={value}
                    style={styles.input}
                  />
                </VStack>
              </HStack>
            </VStack>
            <GradientButton
              title="Submit"
              text="Submit"
              onPress={onSubmit()}
              mainStyle={styles.mainStyle}
            />
          </Center>
        </Stack>
      </ScrollView>
    </Stack>
  );
}

const styles = StyleSheet.create({
  mainStyle: {marginTop: 15},
  editText: {
    fontSize: 14,
    color: colors.pureWhite,
    paddingLeft: 5,
  },
  userInfoText: {
    color: colors.greyText,
    margin: -5,
  },
  userFullnameText: {
    color: colors.pureBlack,
    margin: -5,
  },
  editButton: {
    padding: 2,
  },
  subjectInput: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#B4B4B4',
  },
  input: {
    height: 200,
    borderWidth: 1,
    padding: 10,
    borderColor: '#B4B4B4',
  },
});
