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
import {GoBack, GradientButton} from '../components/atoms';
import {fonts} from '../theme/fonts';

export function PrivacyScreen() {
  const onSubmit = () => {
    console.log('====================================');
    console.log('Mr. Biruh, please do your things here ');
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
          screenName="Privacy"
        />
      </View>
      <ScrollView>
        <Stack py={3} />
        <Stack
          my={2}
          bg={colors.pureWhite}
          borderRadius={12}
          shadow={'0.5'}
          mx={1}
          px={4}
          py={4}
          space={2}>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            bg={colors.pureWhite}>
            <TouchableOpacity onPress={onSubmit}>
              <HStack space={'52%'}>
                <Text fontSize="md" alignSelf="flex-start">
                  Terms & Conditions
                </Text>
                <ChevronRightIcon size="5" mt="0.5" alignSelf="flex-end" />
              </HStack>
            </TouchableOpacity>
          </HStack>
          <>
            <DeleteAccount />
          </>
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

function DeleteAccount() {
  const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <Center>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        bg={colors.pureWhite}
        maxW="350">
        <TouchableOpacity onPress={onOpen}>
          <HStack space={'61%'}>
            <Text fontSize="md">Delete Account</Text>

            <ChevronRightIcon size="5" mt="0.5" alignSelf="flex-end" />
          </HStack>
        </TouchableOpacity>
      </HStack>

      <Actionsheet
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        hideDragIndicator={true}>
        <Actionsheet.Content>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            bg={colors.pureWhite}>
            <Text
              fontSize="md"
              style={fonts.heading6}
              w={'98%'}
              noOfLines={2}
              px={2}
              py={6}>
              Are you sure do you want to delete your account?
            </Text>
          </HStack>

          <ScrollView style={{width: '96%'}}>
            <HStack space={5} justifyContent="center">
              <Box w="40%" h={60}>
                <TouchableOpacity onPress={onClose}>
                  <Badge
                    bg={colors.unselected}
                    alignSelf={'flex-start'}
                    borderRadius={8}
                    width="100%"
                    height={35}
                    colorScheme={colors.pureWhite}>
                    <Text color={colors.pureBlack} fontSize={16}>
                      Cancel
                    </Text>
                  </Badge>
                </TouchableOpacity>
              </Box>

              <Box w="40%" h={60}>
                <TouchableOpacity>
                  <Badge
                    bg={colors.error}
                    alignSelf={'flex-start'}
                    borderRadius={8}
                    width="100%"
                    height={35}
                    colorScheme={colors.pureWhite}>
                    <Text color={colors.pureWhite} fontSize={16}>
                      Delete
                    </Text>
                  </Badge>
                </TouchableOpacity>
              </Box>
            </HStack>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}
