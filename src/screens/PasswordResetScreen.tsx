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
} from 'native-base';
import {SettingsScreenHeader} from '../components/organisms';
import {SettingItems} from '../components/molecules';
import {colors} from '../theme/colors';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import about from '../assets/icons/settingIcons/faq.png';
import faq from '../assets/icons/settingIcons/faq2.png';
import help from '../assets/icons/settingIcons/help.png';
import lively_logo from '../assets/images/lively_logo.png';
import lang from '../assets/icons/settingIcons/lang.png';
import edit from '../assets/icons/pencil-edit.png';
import terms_and_cond from '../assets/icons/settingIcons/terms-conditions.png';
import logout from '../assets/icons/settingIcons/logout.png';

export function PasswordResetScreen() {
  return (
    <Stack
      px={'16px'}
      bg={colors.pureWhite}
      h={'full'}
      pb={2}
      style={{backgroundColor: colors.pagesBackeground}}>
      <View w={'full'}>
        <SettingsScreenHeader />
      </View>
      <ScrollView>
        <Center paddingTop={20}>
          <HStack space={2}>
            <Text color={colors.pureBlack} paddingTop={2}>
              Password Reset Screen
            </Text>
          </HStack>
          <Text color={colors.greyText}>© Powered by Unravel Technologies</Text>
        </Center>
      </ScrollView>
    </Stack>
  );
}

const styles = StyleSheet.create({
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
});
