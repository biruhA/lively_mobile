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
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import about from '../assets/icons/settingIcons/FAQ.png';
import faq from '../assets/icons/settingIcons/faq2.png';
import help from '../assets/icons/settingIcons/Help.png';
import lively_logo from '../assets/images/lively_logo.png';
import lang from '../assets/icons/settingIcons/lang.png';
import edit from '../assets/icons/pencil-edit.png';
import terms_and_cond from '../assets/icons/settingIcons/terms-conditions.png';
import logout from '../assets/icons/settingIcons/Logout.png';
import {ScreenNames} from '../constants';
import {fonts} from '../theme/fonts';

export function SettingsScreen() {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
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
              <HStack paddingLeft={'40%'}>
                <Avatar
                  bg="cyan.500"
                  size="lg"
                  source={{
                    uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                  }}
                />

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(ScreenNames.EditProfileScreen)
                  }>
                  <Badge
                    bg={colors.primary}
                    alignSelf={'flex-start'}
                    marginLeft={'40%'}
                    borderRadius={10}
                    height={7}
                    colorScheme={colors.pureWhite}>
                    <HStack style={styles.editButton}>
                      <Icon name="pencil" size={15} color={colors.pureWhite} />
                      <Text style={styles.editText}>Edit</Text>
                    </HStack>
                  </Badge>
                </TouchableOpacity>
              </HStack>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ScreenNames.ProfileDetailScreen)
                }>
                <Text style={styles.userFullnameText}>
                  Mr. Anduamlak Temesgen A.
                </Text>
              </TouchableOpacity>
              <Text style={styles.userInfoText}>anduamlakt77@gmail.com</Text>
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <View>
                  <Text style={styles.userInfoText}>
                    {isVisible ? '+251 911581886' : ' +251 *******86'}
                  </Text>
                </View>
              </TouchableOpacity>
            </VStack>
          </Center>
        </Stack>

        <Stack
          my={2}
          bg={colors.pureWhite}
          borderRadius={12}
          shadow={'0.5'}
          mx={1}
          px={4}
          py={4}
          space={4}>
          <>
            <LanguagesList />
          </>

          {/* <SettingItems item_icon={faq} title="Your Reviews" /> */}
          <SettingItems item_icon={terms_and_cond} title="Terms & Conditions" />
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.HelpScreen)}>
            <SettingItems item_icon={help} title="Help" />
          </TouchableOpacity>
          <SettingItems item_icon={faq} title="FAQ" />
          <SettingItems item_icon={about} title="About" />
          <>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              bg={colors.pureWhite}
              maxW="350">
              <HStack space={2}>
                <Image source={logout} alt="Alternate Text" size="24px" />
                <Text fontSize="md">Logout</Text>
              </HStack>
            </HStack>
          </>
        </Stack>

        <Center paddingTop={20}>
          <HStack space={2}>
            <Avatar bg="cyan.500" size="40px" source={lively_logo} />
            <Text color={colors.pureBlack} paddingTop={2}>
              LIVELY
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

function LanguagesList() {
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
          <Box w="100%" h={30} px={4}>
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
              <TouchableOpacity onPress={onClose}>
                <HStack
                  shadow={2}
                  bg={colors.pureWhite}
                  alignSelf={'flex-start'}
                  borderRadius={15}
                  borderColor={colors.error}
                  width={30}
                  height={30}
                  colorScheme={colors.pureWhite}>
                  <Text fontSize={20} paddingLeft={2}>
                    X
                  </Text>
                </HStack>
              </TouchableOpacity>
            </HStack>
          </Box>

          <ScrollView style={{width: '96%'}}>
            <Box w="100%" h={60} justifyContent="center">
              <TouchableOpacity>
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
