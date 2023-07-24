import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  Actionsheet,
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
import {GradientButtonSmall, PasswordIcon} from '../atoms';
import {StoreSheetBody1} from '../molecules';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {colors} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {LoginSheetState, ScreenNames} from '../../constants';
import mail from '../../assets/icons/mail.png';
import passwordVisible from '../../assets/icons/password-visible.png';
import {GradientButton, LoginBackGround} from '../atoms';
import {fonts} from '../../theme/fonts';
import {useLoginMutation} from '../../store/services';
import {storeSheetState} from './StoreSheet';
import Context from '../../realm/config';
import {OnBoarding} from '../../realm/OnBoarding';
import {rememberMe} from '../../store/features/authSlice';

const {useRealm, useQuery} = Context;

interface Props {
  setState: any;
  onClose: any;
}

interface Form {
  phoneNo: string;
  password: string;
}

export function LoginSheetBody({setState, onClose}: Props) {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [login, result] = useLoginMutation();
  const toast = useToast();
  const {token} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const realm = useRealm();
  const onboarding = useQuery(OnBoarding);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
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
    });
  };

  useEffect(() => {
    if (result?.isUninitialized) {
      return;
    }
    if (result?.isLoading) {
      return;
    }
    if (!result?.isSuccess) {
      toast.show({
        description: 'Phone No. or password not valid',
      });
      return;
    }
    if (rememberMe) {
      dispatch(rememberMe());
    }
    if (!result?.isSuccess) {
      offlineSaveUser();
      setState(LoginSheetState.LoggedIn);
    }
  }, [result, token]);

  return (
    <Stack bg={colors.pureWhite}>
      <Stack h={'95%'} px={4} space={4} bg={'white'} justifyContent={'center'}>
        <Stack space={2}>
          <Text style={fonts.heading4} pt={3}>
            Login
          </Text>
          <Text style={fonts.subtitle2}>
            You need to sign up or log in to access this feature.
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
                        source={require('../../assets/icons/phone.png')}
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
              <Checkbox value="one" size={'sm'} onChange={setRememberMe}>
                Remember me
              </Checkbox>
              <TouchableOpacity
                onPress={() => {
                  onClose();
                  navigation.navigate(ScreenNames.ForgotPassword);
                }}>
                <Text style={styles.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
            </HStack>
            <HStack justifyContent={'center'}>
              <Text style={styles.notRegistered}>Not Registered Yet? </Text>
              <TouchableOpacity
                onPress={() => {
                  onClose();
                  navigation.navigate(ScreenNames.CreateAccount);
                }}>
                <Text style={styles.forgot}>Create an Account</Text>
              </TouchableOpacity>
            </HStack>
          </Stack>
        </Stack>
      </Stack>
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
    fontWeight: '500',
    color: colors.pureBlack,
  },
});
