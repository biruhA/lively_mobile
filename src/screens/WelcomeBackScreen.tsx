import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  Center,
  Checkbox,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Pressable,
  Stack,
  Text,
  useToast,
} from 'native-base';
import mail from '../assets/icons/mail.png';
import passwordVisible from '../assets/icons/password-visible.png';
import {
  GradientButton,
  LoginBackGround,
  PasswordIcon,
} from '../components/atoms';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {useLoginMutation} from '../store/services';
import {rememberMe, rememberUser} from '../store/features/authSlice';
import Context from '../realm/config';
import {OnBoarding} from '../realm/OnBoarding';

const {useRealm, useQuery} = Context;

interface Form {
  phoneNo: string;
  password: string;
}

export function WelcomeBackScreen() {
  const [show, setShow] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();
  const [login, result] = useLoginMutation();
  const toast = useToast();
  const {token} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const realm = useRealm();
  const onboarding = useQuery(OnBoarding);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      phoneNo: '',
      password: '',
    },
  });

  const offlineSaveUser = useCallback((): void => {
    if (onboarding.length === 0) {
      realm.write(() => {
        realm.create('OnBoarding', OnBoarding.generate(true, rememberMe));
      });
    } else {
      realm.write(() => {
        onboarding[0].rememberMe = rememberMe;
      });
    }
  }, [realm, onboarding, rememberMe]);

  const onSubmit = (data: Form) => {
    login({
      password: data.password,
      phone: `251${data?.phoneNo}`,
    })
      .unwrap()
      .then(() => {
        if (rememberMe) {
          dispatch(rememberUser());
          offlineSaveUser();
        }
        reset();
        navigation.navigate(ScreenNames.MainBottomTab);
      })
      .catch(err => {
        console.log(
          '🚀 ~ file: WelcomeBackScreen.tsx:91 ~ onSubmit ~ err:',
          err,
        );
        toast.show({
          description: err?.data?.data,
        });
      });
  };

  return (
    <Stack
      flex={1}
      px={4}
      py={12}
      space={2}
      bg={'white'}
      justifyContent={'space-between'}>
      <Stack pt={24}>
        <Text style={fonts.subtitle2}>Hello Again!</Text>
        <Text style={fonts.heading4} pt={3}>
          Welcome Back
        </Text>
      </Stack>
      <Stack space={3}>
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
                  maxLength={9}
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
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 8,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              borderRadius={5}
              size={'lg'}
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
        {errors.password?.type === 'required' && (
          <Text color={'error.500'}>Password is required.</Text>
        )}
        {errors.password?.type === 'minLength' && (
          <Text color={'error.500'}>Password min length is 8</Text>
        )}
        <GradientButton
          title="Submit"
          text="Login"
          onPress={handleSubmit(onSubmit)}
          mainStyle={styles.mainStyle}
          isLoading={result?.isLoading}
        />
        <Stack space={8} pt={2}>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Checkbox
              colorScheme={'green'}
              value="one"
              size={'sm'}
              onChange={setRememberMe}>
              <Text color={colors.lightgreyText} fontSize={16}>
                Remember me
              </Text>
            </Checkbox>
            <TouchableOpacity
              onPress={() => navigation.navigate(ScreenNames.ForgotPassword)}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
          </HStack>
          <HStack justifyContent={'center'}>
            <Text style={styles.notRegistered}>Not Registered Yet? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNames.CreateAccount);
              }}>
              <Text style={styles.forgot}>Create an Account</Text>
            </TouchableOpacity>
          </HStack>
        </Stack>
      </Stack>
      <HStack justifyContent={'center'}>
        <Text style={styles.notRegistered}>Continue as </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNames.MainBottomTab)}>
          <Text style={styles.forgot}>Guest</Text>
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
    fontWeight: '700',
    color: colors.primary,
  },
  notRegistered: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.lightgreyText,
  },
});
