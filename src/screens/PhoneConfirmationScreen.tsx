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
} from 'native-base';
import {fonts} from '../theme/fonts';
import {useForm, Controller} from 'react-hook-form';
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
import {GradientButton} from '../components/atoms';
import {useAppSelector} from '../store/hooks';
import {useNavigation} from '@react-navigation/native';

export function PhoneConfirmationScreen() {
  const {verificationPhoneNumber, otp} = useAppSelector(state => state.auth);
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate(ScreenNames.PasswordResetScreen);
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
      <ScrollView style={{backgroundColor: '#E3EBEB'}} alignItems={'center'}>
        <Stack
          my={'40%'}
          bg="white"
          mx={1.8}
          rounded={'md'}
          padding={4}
          overflow={'hidden'}>
          <VStack>
            <Text style={fonts.heading5}>Confirm your phone</Text>
            <Text style={fonts.subtitle2}>
              We have sent you a 6 digit OTP code to this number
              <Text fontWeight={'bold'}> +251-9229020920</Text>
            </Text>
          </VStack>

          <Center paddingTop={5} space={2}>
            <HStack space={5} padding={2}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    size={'2xl'}
                    maxLength={1}
                    autoFocus={true}
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input2.current.focus()}
                    onChangeText={text => {
                      onChange(text);
                      if (text.length === 1) {
                        ref_input2.current.focus();
                      }
                    }}
                    keyboardType="number-pad"
                    w={'13%'}
                    textAlign={'center'}
                    borderRadius={5}
                    placeholder=" - "
                    onBlur={onBlur}
                    // value={value}
                  />
                )}
                name="code1"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    size={'2xl'}
                    returnKeyType="next"
                    onSubmitEditing={() => ref_input3.current.focus()}
                    ref={ref_input2}
                    keyboardType="number-pad"
                    w={'13%'}
                    textAlign={'center'}
                    borderRadius={5}
                    placeholder=" - "
                    onBlur={onBlur}
                    onChangeText={text => {
                      onChange(text);
                      if (text.length === 1) {
                        ref_input3.current.focus();
                      }
                    }}
                    // value={value}
                  />
                )}
                name="code2"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    size={'2xl'}
                    returnKeyType="next"
                    // onSubmitEditing={() => ref_input4.current.focus()}
                    ref={ref_input3}
                    keyboardType="number-pad"
                    w={'13%'}
                    textAlign={'center'}
                    borderRadius={5}
                    placeholder=" - "
                    onBlur={onBlur}
                    onChangeText={text => {
                      onChange(text);
                      if (text.length === 1) {
                        ref_input4.current.focus();
                      }
                    }}
                    // value={value}
                  />
                )}
                name="code3"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    size={'2xl'}
                    returnKeyType="next"
                    // onSubmitEditing={() => ref_input5.current.focus()}
                    ref={ref_input4}
                    keyboardType="number-pad"
                    w={'13%'}
                    textAlign={'center'}
                    borderRadius={5}
                    placeholder=" - "
                    onBlur={onBlur}
                    onChangeText={text => {
                      onChange(text);
                      if (text.length === 1) {
                        ref_input5.current.focus();
                      }
                    }}
                    // value={value}
                  />
                )}
                name="code4"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    size={'2xl'}
                    ref={ref_input5}
                    keyboardType="number-pad"
                    w={'13%'}
                    textAlign={'center'}
                    borderRadius={5}
                    placeholder=" - "
                    // onBlur={onBlur}
                    // onChangeText={onChange}
                    // value={value}
                  />
                )}
                name="code5"
              />
            </HStack>

            <GradientButton
              onPress={() => {
                navigation.navigate(ScreenNames.PasswordResetScreen);
              }}
              title="Submit"
              text="Continue"
              mainStyle={styles.mainStyle}
            />

            <HStack space={2}>
              <Text color={colors.pureBlack} paddingTop={2}>
                countdown timere here
              </Text>
            </HStack>
          </Center>
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
