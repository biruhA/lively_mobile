import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Box,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  VStack,
  useToast,
} from 'native-base';
import {SignUpStepper} from '../components/molecules';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import {GoBack, GradientButton, LoginBackGround} from '../components/atoms';
import {fonts} from '../theme/fonts';
import {useForm, Controller} from 'react-hook-form';
import {colors} from '../theme/colors';
import mail from '../assets/icons/mail.png';
import {useRegisterMutation} from '../store/services';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {setOtp, setVerificationPhoneNumber} from '../store/features/authSlice';
import {
  getHash,
  startOtpListener,
  removeListener,
} from 'react-native-otp-verify';

interface RegisterProp {
  firstName: string;
  lastname: string;
  phoneNo: string;
}

export function CreateAccountScreen() {
  const navigation = useNavigation();
  const toast = useToast();
  const [Register, result] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const [hash, setHash] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastname: '',
      phoneNo: '',
    },
  });

  useEffect(() => {
    getHash()
      .then(res => {
        setHash(res[0]);
      })
      .catch(console.log);

    startOtpListener(message => {
      const otp = /(\d{5})/g.exec(message)[1];
      dispatch(setOtp(otp));
    });
    return () => removeListener();
  }, []);

  useEffect(() => {
    console.log(
      '🚀 ~ file: CreateAccountScreen.tsx:73 ~ useEffect ~ result:',
      result,
    );
    if (result?.isUninitialized) {
      return;
    }
    if (result?.isLoading) {
      return;
    }
    if (!result?.isSuccess) {
      toast.show({
        description: 'An error has occurs, please try again',
      });
      return;
    }
    toast.show({
      description: 'Otp sent, Please wait...',
    });
    navigation.navigate(ScreenNames.ConfirmPhone);
  }, [result]);

  const onSubmit = (data: RegisterProp) => {
    dispatch(setVerificationPhoneNumber(`251${data?.phoneNo}`));
    Register({
      name: `${data?.firstName} ${data?.lastname}`,
      phone: `251${data?.phoneNo}`,
      appKey: hash,
    });
  };

  return (
    <Stack
      flex={1}
      px={4}
      py={12}
      space={12}
      bg={'white'}
      justifyContent={'flex-start'}>
      <SignUpStepper step={1} />

      <Stack pt={24}>
        <Text style={fonts.heading4} pt={3}>
          Create an account
        </Text>
        <Text style={fonts.body1}>
          You can create an account by filling the information below
        </Text>
      </Stack>

      <Stack space={3}>
        <HStack justifyContent={'center'} space={2}>
          <Stack w={'49%'}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  w={'100%'}
                  borderRadius={5}
                  placeholder="First Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="firstName"
            />
            {errors.firstName && (
              <Text color={'error.500'}>First Name is required.</Text>
            )}
          </Stack>
          <Stack w={'49%'}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  w={'100%'}
                  borderRadius={5}
                  placeholder="Last Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="lastname"
            />
            {errors.lastname && (
              <Text color={'error.500'}>Last Name is required.</Text>
            )}
          </Stack>
        </HStack>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 9,
            maxLength: 9,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Stack alignItems="center">
              <InputGroup w={'100%'}>
                <InputLeftAddon children={'+251'} />
                <Input
                  w={'87%'}
                  InputRightElement={
                    <Image
                      alt={'phone number'}
                      source={mail}
                      boxSize={5}
                      mr="2"
                    />
                  }
                  placeholder="Phone No"
                  keyboardType={'number-pad'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  borderRadius={5}
                />
              </InputGroup>
            </Stack>
          )}
          name="phoneNo"
        />
        {errors.phoneNo?.type === 'required' && (
          <Text color={'error.500'}>Phone number is required.</Text>
        )}
        {errors.phoneNo?.type === 'maxLength' && (
          <Text color={'error.500'}>Phone number max length is 9</Text>
        )}
        {errors.phoneNo?.type === 'minLength' && (
          <Text color={'error.500'}>Phone number min length is 9</Text>
        )}
        <GradientButton
          title="Submit"
          text="Continue"
          onPress={handleSubmit(onSubmit)}
          // disabled={!isValid}
          isLoading={result?.isLoading}
          mainStyle={styles.mainStyle}
        />
      </Stack>
      <HStack justifyContent={'center'}>
        <Text style={styles.notRegistered}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNames.WelcomeBack)}>
          <Text style={styles.forgot}>Sign in</Text>
        </TouchableOpacity>
      </HStack>
      <LoginBackGround />
    </Stack>
  );
}

const styles = StyleSheet.create({
  mainStyle: {marginTop: 15},
  forgot: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.primary,
  },
  notRegistered: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.pureBlack,
  },
});
