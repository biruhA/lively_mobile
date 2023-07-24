import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  useToast,
} from 'native-base';
import rightArrow from '../assets/icons/right-arrow.png';
import mail from '../assets/icons/mail.png';
import {GoBack, GradientButton, LoginBackGround} from '../components/atoms';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/colors';
import {ScreenNames} from '../constants';
import {SignUpStepper} from '../components/molecules';
import {useNavigation} from '@react-navigation/native';
import {useResetPasswordMutation} from '../store/services';
import {
  getHash,
  startOtpListener,
  removeListener,
} from 'react-native-otp-verify';
import {useAppDispatch} from '../store/hooks';
import {
  setOtp,
  setToken,
  setVerificationPhoneNumber,
} from '../store/features/authSlice';

export function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [ResetPassword, result] = useResetPasswordMutation();
  const [hash, setHash] = useState('');
  const dispatch = useAppDispatch();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      phoneNo: '',
    },
  });

  useEffect(() => {
    getHash()
      .then(res => {
        setHash(res[0]);
      })
      .catch(error => console.log('Error:', error));
  }, []);

  useEffect(() => {
    startOtpListener(message => {
      const otp = /(\d{5})/g.exec(message)[1];
      dispatch(setOtp(otp));
    });
    return () => removeListener();
  }, []);

  useEffect(() => {
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
    dispatch(setToken(result?.data?.data?.token));
    navigation.navigate(ScreenNames.ConfirmPhone, {
      prev: ScreenNames.ForgotPassword,
    });
  }, [result]);

  const onSubmit = data => {
    ResetPassword({
      phone: `251${data?.phoneNo}`,
      appKey: hash,
    });
    dispatch(setVerificationPhoneNumber(`251${data?.phoneNo}`));
  };
  return (
    <Stack
      flex={1}
      px={4}
      py={12}
      space={8}
      bg={'white'}
      justifyContent={'flex-start'}>
      <GoBack label="Forgot Password" />
      <Stack pt={24} space={1}>
        <Text style={fonts.heading4} pt={3}>
          Forgot Password
        </Text>
        <Text style={fonts.body1}>
          You can create an account by filling the informationbelow
        </Text>
      </Stack>

      <Stack space={3}>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Phone number is required.',
            },
            minLength: {
              value: 9,
              message: 'Phone number min length is 9',
            },
            maxLength: {
              value: 9,
              message: 'Phone number max length is 9',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Stack alignItems="center">
              <InputGroup w={'100%'}>
                <Input
                  w={'100%'}
                  size={'lg'}
                  InputRightElement={
                    <Image
                      alt={'phone number'}
                      source={require('../assets/icons/phone.png')}
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
        {errors.phoneNo && <Text>{errors.phoneNo.message}</Text>}
        <GradientButton
          title="Submit"
          text="Continue"
          onPress={handleSubmit(onSubmit)}
          isLoading={result?.isLoading}
          // disabled={!isValid}
          mainStyle={styles.mainStyle}
        />
      </Stack>
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
