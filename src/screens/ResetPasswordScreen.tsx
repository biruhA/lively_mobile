import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {HStack, Image, Input, Stack, Text, useToast} from 'native-base';
import rightArrow from '../assets/icons/right-arrow.png';
import passwordVisible from '../assets/icons/password-visible.png';
import {GoBack, GradientButton, LoginBackGround} from '../components/atoms';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/colors';
import {ScreenNames} from '../constants';
import {SignUpStepper} from '../components/molecules';
import {useNavigation} from '@react-navigation/native';
import {useCreateNewPasswordMutation} from '../store/services';
import {useAppSelector} from '../store/hooks';

export function ResetPasswordScreen() {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [showCofirm, setShowCofirm] = useState(false);
  const [CreateNewPassword, result] = useCreateNewPasswordMutation();
  const toast = useToast();
  const {token} = useAppSelector(state => state.auth);

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  useEffect(() => {
    console.log(
      '🚀 ~ file: ResetPasswordScreen.tsx:34 ~ useEffect ~ result:',
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
    navigation.navigate(ScreenNames.WelcomeBack);
  }, [result]);

  const onSubmit = data => {
    CreateNewPassword({
      new_password: data?.newPassword,
      confirm_new_password: data?.confirmNewPassword,
      token: token,
    });
  };
  return (
    <Stack
      flex={1}
      px={4}
      py={12}
      space={8}
      bg={colors.pureWhite}
      justifyContent={'flex-start'}>
      <GoBack label="Forgot Password" />
      <Stack pt={24}>
        <Text style={fonts.heading4} pt={3}>
          Forgot Password
        </Text>
        <Text style={fonts.body1}>use strong password</Text>
      </Stack>

      <Stack space={3}>
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
            maxLength: {
              value: 8,
              message: 'Password max length is 8',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              borderRadius={5}
              placeholder="New Password"
              type={show ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Image
                    alt="newPassword"
                    source={passwordVisible}
                    boxSize={5}
                    mr="2"
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
            maxLength: {
              value: 8,
              message: 'Password max length is 8',
            },
            validate: value =>
              value === getValues('newPassword') ||
              'The passwords do not match',
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              borderRadius={5}
              placeholder="Confirmed New Password"
              type={showCofirm ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={() => setShowCofirm(!showCofirm)}>
                  <Image
                    alt="confirmNewPassword"
                    source={passwordVisible}
                    boxSize={5}
                    mr="2"
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
