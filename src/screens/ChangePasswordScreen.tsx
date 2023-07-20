import React, {useState, useEffect, useRef} from 'react';
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
  Heading,
  useToast,
} from 'native-base';
import {fonts} from '../theme/fonts';
import {useForm, Controller} from 'react-hook-form';
import {SettingsScreenHeader} from '../components/organisms';
import {ProfileScreensHeader, SettingItems} from '../components/molecules';
import {colors} from '../theme/colors';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import about from '../assets/icons/settingIcons/faq.png';
import faq from '../assets/icons/settingIcons/faq2.png';
import help from '../assets/icons/settingIcons/help.png';
import lively_logo from '../assets/images/lively_logo.png';
import lang from '../assets/icons/settingIcons/lang.png';
import success from '../assets/icons/settingIcons/success.png';
import edit from '../assets/icons/pencil-edit.png';
import terms_and_cond from '../assets/icons/settingIcons/terms-conditions.png';
import logout from '../assets/icons/settingIcons/logout.png';
import {ScreenNames} from '../constants';
import {GradientButton, PasswordIcon} from '../components/atoms';
import {useAppSelector} from '../store/hooks';
import {useNavigation} from '@react-navigation/native';
import {useCreateNewPasswordMutation} from '../store/services';

export function ChangePasswordScreen() {
  const {verificationPhoneNumber, otp} = useAppSelector(state => state.auth);
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [showCofirm, setShowCofirm] = useState(false);
  const [CreateNewPassword, result] = useCreateNewPasswordMutation();
  const toast = useToast();

  const handleNext = () => {
    console.log('====================================');
    console.log('Next button clicked');
    console.log('====================================');
  };

  const ref_input2 = useRef('');
  const ref_input3 = useRef('');
  const ref_input4 = useRef('');
  const ref_input5 = useRef('');

  const {control, setValue} = useForm({
    defaultValues: {
      code1: Array.from(otp)[0],
      code2: Array.from(otp)[1],
      code3: Array.from(otp)[2],
      code4: Array.from(otp)[3],
      code5: Array.from(otp)[4],
    },
  });

  useEffect(() => {
    setValue('code1', Array.from(otp)[0]);
    setValue('code2', Array.from(otp)[1]);
    setValue('code3', Array.from(otp)[2]);
    setValue('code4', Array.from(otp)[3]);
    setValue('code5', Array.from(otp)[4]);
  }, [otp]);

  return (
    <Stack bg={'#ffffff'} h={'full'} py={1}>
      <View w={'full'} h={10}>
        <ProfileScreensHeader
          navigationTo={ScreenNames.Settings}
          screenName="Password Reset"
        />
      </View>
      <ScrollView style={{backgroundColor: '#E3EBEB'}}>
        <Stack
          my={'40%'}
          mx={3}
          bg="white"
          rounded={'md'}
          padding={2}
          overflow={'hidden'}>
          <VStack>
            <Text style={fonts.heading5}>Reset Password</Text>
            <Text style={fonts.subtitle2}>use strong password</Text>
          </VStack>

          <Stack space={3} paddingTop={5}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Old Password is required',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  size={'lg'}
                  borderRadius={5}
                  placeholder="Old Password"
                  type={show ? 'text' : 'password'}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <PasswordIcon isActive={show} setIsActive={setShow} />
                    </Pressable>
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="newPassword"
            />

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'New Password is required',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  size={'lg'}
                  borderRadius={5}
                  placeholder="New Password"
                  type={show ? 'text' : 'password'}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <PasswordIcon isActive={show} setIsActive={setShow} />
                    </Pressable>
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="newPassword"
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Confirme Password is required',
                },
                validate: value =>
                  value === getValues('newPassword') ||
                  'The passwords do not match',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  size={'lg'}
                  borderRadius={5}
                  placeholder="Confirme New Password"
                  type={showCofirm ? 'text' : 'password'}
                  InputRightElement={
                    <Pressable onPress={() => setShowCofirm(!showCofirm)}>
                      <PasswordIcon
                        isActive={showCofirm}
                        setIsActive={setShowCofirm}
                      />
                    </Pressable>
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="confirmNewPassword"
            />
          </Stack>

          <>
            <LanguagesList />
          </>
        </Stack>
      </ScrollView>
    </Stack>
  );
}

const styles = StyleSheet.create({
  mainStyle: {marginTop: 15, width: '100%'},
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
        <GradientButton
          onPress={onOpen}
          title="Submit"
          text="Continue"
          mainStyle={styles.mainStyle}
        />
      </HStack>

      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator={true}>
        <Actionsheet.Content>
          <Box w="100%" justifyContent="center" py={3}>
            <HStack
              w="90%"
              bg={colors.pureWhite}
              paddingLeft={8}
              justifyContent="center">
              <Image
                source={success}
                alt="Alternate Text"
                size="200px"
                w={284}
                h={203}
              />
            </HStack>

            <Center>
              <Text
                fontSize="md"
                style={fonts.heading6}
                w={'80%'}
                textAlign={'center'}
                fontWeight={'bold'}
                noOfLines={2}
                px={2}
                py={6}>
                You’re successfully changed your password
              </Text>
            </Center>

            <GradientButton
              onPress={onOpen}
              title="Go to Home"
              text="Go to Home"
              mainStyle={styles.mainStyle}
            />
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}
