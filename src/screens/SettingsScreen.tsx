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
  Actionsheet,
  Box,
  Spinner,
  useToast,
} from 'native-base';
import {SettingUerProfile, SettingsScreenHeader} from '../components/organisms';
import {BottomTabBar, SettingItems} from '../components/molecules';
import {colors} from '../theme/colors';
import {ScrollView, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import about from '../assets/icons/settingIcons/FAQ.png';
import faq from '../assets/icons/settingIcons/faq2.png';
import help from '../assets/icons/settingIcons/Help.png';
import privacy from '../assets/icons/settingIcons/privacy.png';
import lively_logo from '../assets/images/lively_logo.png';
import lang from '../assets/icons/settingIcons/lang.png';
import logout from '../assets/icons/settingIcons/Logout.png';
import {ScreenNames} from '../constants';
import {fonts} from '../theme/fonts';
import {useLogoutMutation, useProfileQuery} from '../store/services';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import Context from '../realm/config';
import {OnBoarding} from '../realm/OnBoarding';
import {logoutUser} from '../store/features/authSlice';
import {MainScreenHeader} from '../components/headers';

const {useRealm, useQuery} = Context;

export function SettingsScreen() {
  const navigation = useNavigation();
  const {token, isLoggedIn, inAppLoggedIn} = useAppSelector(
    state => state.auth,
  );
  const {currentVersion} = useAppSelector(state => state.setting);
  const dispatch = useAppDispatch();
  const {data, isLoading} = useProfileQuery(token);
  const [Logout, result] = useLogoutMutation();
  const realm = useRealm();
  const onboarding = useQuery(OnBoarding);
  const toast = useToast();

  function logoutHandler() {
    Logout(token)
      .unwrap()
      .then(() => {
        dispatch(logoutUser());
        realm.write(() => {
          onboarding[0].rememberMe = false;
        });
        navigation.dispatch(StackActions.replace(ScreenNames.AuthStack));
      })
      .catch(err => {
        toast.show({
          description: err?.data?.message,
        });
      });
  }

  return (
    <Stack style={{backgroundColor: '#E3EBEB'}} flex={1}>
      <MainScreenHeader label={'Settings'} />
      <ScrollView style={{padding: 5}}>
        <SettingUerProfile />
        <Stack
          my={2}
          bg={colors.pureWhite}
          borderRadius={12}
          shadow={'0.5'}
          mx={3}
          px={4}
          py={4}
          space={4}>
          <LanguagesList />
          <SettingItems
            item_icon={privacy}
            title="Privacy"
            onPress={() => navigation.navigate(ScreenNames.PrivacyScreen)}
          />
          <SettingItems
            item_icon={help}
            title="Help"
            onPress={() => navigation.navigate(ScreenNames.HelpScreen)}
          />
          <SettingItems
            item_icon={faq}
            title="FAQ"
            onPress={() => navigation.navigate(ScreenNames.Faq)}
          />
          <SettingItems
            item_icon={about}
            title="About"
            onPress={() =>
              Linking.openURL(
                'https://lively-landing-k0rzdm6be-unravel.vercel.app/',
              ).catch(err => console.error('An error occurred', err))
            }
          />
          {(isLoggedIn || inAppLoggedIn) && (
            <SettingItems
              item_icon={logout}
              title="Logout"
              onPress={logoutHandler}
              isLoading={result?.isLoading}
            />
          )}
        </Stack>
        <Center paddingTop={20}>
          <HStack space={2}>
            <Avatar bg="cyan.500" size="40px" source={lively_logo} />
            <Text color={colors.pureBlack} paddingTop={2}>
              LIVELY
            </Text>
          </HStack>
          <Text color={colors.greyText}>© Powered by Unravel Technologies</Text>
          <Text color={colors.greyText}>v {currentVersion}</Text>
        </Center>
      </ScrollView>
      <BottomTabBar />
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

function LanguagesList() {
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <Center>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        bg={colors.pureWhite}
        maxW="350">
        <HStack space={2}>
          <Image source={lang} alt="Alternate Text" size="24px" />
          <Text fontSize="md">Lang</Text>
        </HStack>
        <TouchableOpacity onPress={onOpen}>
          <HStack>
            <Text fontSize={14}>EN</Text>
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
          <Box w="100%" h={60} p={4}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              bg={colors.pureWhite}
              maxW="350">
              <HStack space={2}>
                <Text fontSize="md" style={fonts.heading6}>
                  Language
                </Text>
              </HStack>
            </HStack>
          </Box>

          <ScrollView style={{width: '96%'}}>
            <Box w="100%" h={60} justifyContent="center">
              <TouchableOpacity
                onPress={() => {
                  toast.show({
                    description: 'Amharic Coming Soon',
                  });
                }}>
                <Badge
                  bg={colors.unselected}
                  alignSelf={'flex-start'}
                  borderRadius={8}
                  width="100%"
                  height={35}
                  colorScheme={colors.pureWhite}>
                  <Text color={colors.primary}>አማርኛ</Text>
                </Badge>
              </TouchableOpacity>
            </Box>

            <Box w="100%" h={60}>
              <TouchableOpacity>
                <Badge
                  bg={colors.unselected}
                  alignSelf={'flex-start'}
                  borderRadius={8}
                  width="100%"
                  height={35}
                  colorScheme={colors.pureWhite}>
                  <Text color={colors.primary}>English</Text>
                </Badge>
              </TouchableOpacity>
            </Box>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}
