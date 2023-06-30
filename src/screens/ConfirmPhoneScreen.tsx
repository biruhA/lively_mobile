import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {HStack, Image, Input, Stack, Text, useToast} from 'native-base';
import {SignUpStepper} from '../components/molecules';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import {
  GoBack,
  GradientButton,
  LoginBackGround,
  Timer,
} from '../components/atoms';
import {fonts} from '../theme/fonts';
import {useForm, Controller} from 'react-hook-form';
import {colors} from '../theme/colors';
import {useResendOtpMutation, useVerifyOtpMutation} from '../store/services';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {setToken} from '../store/features/authSlice';

export function ConfirmPhoneScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [isFinished, setIsFinished] = useState(false);
  const [VerifyOtp, result] = useVerifyOtpMutation();
  const [ResendOtp, resultResendOtp] = useResendOtpMutation();
  const {verificationPhoneNumber, otp} = useAppSelector(state => state.auth);
  const toast = useToast();
  const ref_input2 = useRef('');
  const ref_input3 = useRef('');
  const ref_input4 = useRef('');
  const ref_input5 = useRef('');
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    setValue,
    formState: {isValid},
  } = useForm({
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

  const onSubmit = data => {
    VerifyOtp({
      phone: verificationPhoneNumber,
      otp: `${data?.code1}${data?.code2}${data?.code3}${data?.code4}${data?.code5}`,
    });
  };

  useEffect(() => {
    if (resultResendOtp?.isUninitialized) {
      return;
    }
    if (resultResendOtp?.isLoading) {
      return;
    }
    if (resultResendOtp.isSuccess) {
      toast.show({
        description: 'Otp resent',
      });
    } else {
      toast.show({
        description: 'An error has occurred, please try again',
      });
    }
  }, [resultResendOtp]);

  useEffect(() => {
    console.log(
      '🚀 ~ file: ConfirmPhoneScreen.tsx:77 ~ useEffect ~ result:',
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

    dispatch(setToken(result?.data?.data?.token));

    if (route?.params?.prev === ScreenNames.ForgotPassword) {
      navigation.navigate(ScreenNames.ResetPassword);
    } else {
      navigation.navigate(ScreenNames.CreatePassword);
    }
  }, [result]);

  return (
    <Stack
      flex={1}
      px={4}
      py={12}
      space={12}
      bg={'white'}
      justifyContent={'flex-start'}>
      <GoBack />
      {route?.params?.prev !== ScreenNames.ForgotPassword && (
        <SignUpStepper step={2} />
      )}
      <Stack pt={24}>
        <Text style={fonts.heading4} pt={3}>
          Confirm your phone
        </Text>
        <Text style={fonts.body1}>
          {`We have sent you a 5 digit OTP code to this number +${verificationPhoneNumber}`}
        </Text>
      </Stack>

      <Stack space={3}>
        <HStack justifyContent={'space-between'}>
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
                value={value}
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
                value={value}
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
                onSubmitEditing={() => ref_input4.current.focus()}
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
                value={value}
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
                onSubmitEditing={() => ref_input5.current.focus()}
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
                value={value}
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
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="code5"
          />
        </HStack>
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
        <Timer setIsFinished={setIsFinished} initTime={59} />
        <TouchableOpacity
          disabled={!isFinished}
          onPress={() => {
            ResendOtp(verificationPhoneNumber);
          }}>
          <Text
            style={!isFinished ? styles.forgotInactive : styles.forgotActive}>
            {' '}
            Resend
          </Text>
        </TouchableOpacity>
      </HStack>
      <LoginBackGround />
    </Stack>
  );
}

const styles = StyleSheet.create({
  mainStyle: {marginTop: 15},
  forgotActive: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.greyText,
  },
  forgotInactive: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.lightgreyText,
  },
  notRegistered: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.pureBlack,
  },
});
