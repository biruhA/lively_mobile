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
import {ScreenNames} from '../constants';

export function ProfileDetailScreen() {
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
        <ProfileScreensHeader
          navigationTo={ScreenNames.Settings}
          screenName="Profile Detail"
        />
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
              <HStack>
                <Avatar
                  bg="cyan.500"
                  size="lg"
                  source={{
                    uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                  }}
                />

                <TouchableOpacity
                  style={{marginLeft: -20}}
                  onPress={() =>
                    navigation.navigate(ScreenNames.EditProfileScreen)
                  }>
                  <Badge
                    bg={colors.primary}
                    alignSelf={'flex-start'}
                    borderRadius={15}
                    width={30}
                    height={30}
                    colorScheme={colors.pureWhite}>
                    <Icon name="camera" size={12} color={colors.pureWhite} />
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
          space={2}>
          <Text>Personal Detail</Text>
          <Center>
            <VStack
              space={2}
              alignItems={{
                base: 'center',
                md: 'flex-start',
              }}>
              <HStack space={2}>
                <VStack w="50%">
                  <FormControl.Label>First Name</FormControl.Label>
                  <Input
                    variant="outline"
                    isDisabled={true}
                    value="Anduamlak"
                  />
                </VStack>

                <VStack w="50%">
                  <FormControl.Label>Last Name</FormControl.Label>
                  <Input variant="outline" isDisabled={true} value="Temesgen" />
                </VStack>
              </HStack>
              <HStack space={2}>
                <VStack w="100%">
                  <FormControl.Label>Gender</FormControl.Label>
                  <Input
                    variant="outline"
                    isDisabled={true}
                    value="Male"
                    w="50%"
                  />
                </VStack>
              </HStack>
              <HStack space={2}>
                <VStack w="100%">
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    variant="outline"
                    isDisabled={true}
                    value="anduamlakt77@gmail.com"
                  />
                </VStack>
              </HStack>
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
          space={2}>
          <Text>Password</Text>
          <Center>
            <VStack
              space={2}
              alignItems={{
                base: 'center',
                md: 'flex-start',
              }}>
              <HStack space={2}>
                <VStack w="100%">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(ScreenNames.ResetPassword)
                    }>
                    <Badge
                      bg={colors.unselected}
                      alignSelf={'flex-start'}
                      borderRadius={15}
                      width="100%"
                      height={35}
                      colorScheme={colors.pureWhite}>
                      <Text color={colors.primary}>Reset Password</Text>
                    </Badge>
                  </TouchableOpacity>
                </VStack>
              </HStack>
            </VStack>
          </Center>
        </Stack>
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
    padding: 1,
  },
});
