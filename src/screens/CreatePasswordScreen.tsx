import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  Checkbox,
  HStack,
  Image,
  Input,
  Pressable,
  Stack,
  Text,
} from 'native-base';
import mail from '../assets/icons/mail.png';
import passwordVisible from '../assets/icons/password-visible.png';
import {
  GoBack,
  GradientButton,
  LoginBackGround,
  PasswordIcon,
} from '../components/atoms';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/colors';
import {ScreenNames} from '../constants';
import {SignUpStepper} from '../components/molecules';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {setPassword} from '../store/features/authSlice';

export function CreatePasswordScreen() {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [showCofirm, setShowCofirm] = useState(false);
  const dispatch = useAppDispatch();
  const {token} = useAppSelector(state => state.auth);
  console.log(
    '🚀 ~ file: CreatePasswordScreen.tsx:30 ~ CreatePasswordScreen ~ token:',
    token,
  );

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = data => {
    dispatch(setPassword(data?.password));
    navigation.navigate(ScreenNames.AdditionalInformation);
  };
  return (
    <Stack
      flex={1}
      px={4}
      py={12}
      space={8}
      bg={'white'}
      justifyContent={'flex-start'}>
      <GoBack />
      <SignUpStepper step={3} />
      <Stack pt={24}>
        <Text style={fonts.heading4} pt={3}>
          Create a password
        </Text>
        <Text style={fonts.body1}>
          Set a password that you can use to log back in to your account at
          anytime.
        </Text>
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
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              size={'lg'}
              borderRadius={5}
              placeholder="Password"
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
          name="password"
        />
        {errors.password && <Text>{errors.password.message}</Text>}
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
              value === getValues('password') || 'The passwords do not match',
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              size={'lg'}
              borderRadius={5}
              placeholder="Confirm Password"
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
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <Text>{errors.confirmPassword.message}</Text>
        )}
        <GradientButton
          title="Submit"
          text="Continue"
          onPress={handleSubmit(onSubmit)}
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
