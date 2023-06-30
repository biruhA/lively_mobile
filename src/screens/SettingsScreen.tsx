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
  Badge,
} from 'native-base';
import {SettingsScreenHeader} from '../components/organisms';
import {SettingItems} from '../components/molecules';
import {colors} from '../theme/colors';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import faq from '../assets/icons/settingIcons/FAQ.png';
import help from '../assets/icons/settingIcons/Help.png';
import lively_logo from '../assets/images/lively_logo.png';

export function SettingsScreen() {
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
                <Badge
                  bg={colors.primary}
                  alignSelf={'flex-start'}
                  marginLeft={'30%'}
                  borderRadius={10}
                  height={7}
                  colorScheme={colors.pureWhite}>
                  <HStack style={styles.editButton}>
                    <Icon name="pencil" size={15} color={colors.pureWhite} />
                    <Text style={styles.editText}>Edit</Text>
                  </HStack>
                </Badge>
              </HStack>

              <Text style={styles.userFullnameText}>
                Mr. Anduamlak Temesgen A.
              </Text>
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
            <HStack
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              bg={colors.pureWhite}
              maxW="350">
              <HStack space={2}>
                <Image source={faq} alt="Alternate Text" size="24px" />
                <Text fontSize="md">Lang</Text>
              </HStack>
              <HStack>
                <Text fontSize="md">EN</Text>
                <ChevronRightIcon size="5" mt="0.5" alignSelf="flex-end" />
              </HStack>
            </HStack>
          </>

          <SettingItems item_icon={faq} title="Your Reviews" />
          <SettingItems item_icon={faq} title="Terms & Conditions" />
          <SettingItems item_icon={help} title="Help" />
          <SettingItems item_icon={help} title="FAQ" />

          <>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              bg={colors.pureWhite}
              maxW="350">
              <HStack space={2}>
                <Image source={faq} alt="Alternate Text" size="24px" />
                <Text fontSize="md">Logout</Text>
              </HStack>
            </HStack>
          </>
        </Stack>

        <Center paddingTop={20}>
          <HStack space={2}>
            <Image source={lively_logo} alt="Alternate Text" size="44px" />
            <Text paddingTop={3}>LIVELY</Text>
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
