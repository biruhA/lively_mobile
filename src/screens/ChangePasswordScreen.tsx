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
import {
  useChangePasswordMutation,
  useCreateNewPasswordMutation,
} from '../store/services';

export function ChangePasswordScreen() {
  const toast = useToast();
  const navigation = useNavigation();
  const {token} = useAppSelector(state => state.auth);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCofirm, setShowCofirm] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();

  const [ChangePassword, result] = useChangePasswordMutation();
  console.log(
    '🚀 ~ file: ChangePasswordScreen.tsx:57 ~ ChangePasswordScreen ~ result:',
    result,
  );

  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = data => {
    ChangePassword({
      current_password: data?.oldPassword,
      new_password: data?.newPassword,
      confirm_new_password: data?.confirmNewPassword,
      token,
    });
  };

  useEffect(() => {
    if (result?.isSuccess) {
      onOpen();
    }
    if (result?.isError) {
      toast.show({
        description: 'Something went wrong, please try again',
      });
    }
  }, [result]);

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
                  message: 'Confirmed Password is required',
                },
                minLength: {
                  value: 8,
                  message: 'Password min length is 8',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  size={'lg'}
                  borderRadius={5}
                  placeholder="Old Password"
                  type={showOld ? 'text' : 'password'}
                  InputRightElement={
                    <Pressable onPress={() => setShowOld(!showOld)}>
                      <PasswordIcon
                        isActive={showOld}
                        setIsActive={setShowOld}
                      />
                    </Pressable>
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="oldPassword"
            />
            {errors.oldPassword && <Text>{errors.oldPassword.message}</Text>}

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Confirmed Password is required',
                },
                minLength: {
                  value: 8,
                  message: 'Password min length is 8',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  size={'lg'}
                  borderRadius={5}
                  placeholder="New Password"
                  type={showNew ? 'text' : 'password'}
                  InputRightElement={
                    <Pressable onPress={() => setShowNew(!showNew)}>
                      <PasswordIcon
                        isActive={showNew}
                        setIsActive={setShowNew}
                      />
                    </Pressable>
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="newPassword"
            />
            {errors.newPassword && <Text>{errors.newPassword.message}</Text>}

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Confirmed Password is required',
                },
                minLength: {
                  value: 8,
                  message: 'Password min length is 8',
                },
                validate: value =>
                  value === getValues('newPassword') ||
                  'The passwords do not match',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  size={'lg'}
                  borderRadius={5}
                  placeholder="Confirm new password"
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
            {errors.confirmNewPassword && (
              <Text>{errors.confirmNewPassword.message}</Text>
            )}

            <GradientButton
              title="Submit"
              text="Continue"
              onPress={handleSubmit(onSubmit)}
              mainStyle={styles.mainStyle}
            />
          </Stack>
          <SuccessSheet isOpen={isOpen} onClose={onClose} />
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

function SuccessSheet({isOpen, onClose}) {
  const navigation = useNavigation();
  return (
    <Center>
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
              onPress={() => {
                navigation.navigate(ScreenNames.Home);
              }}
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
