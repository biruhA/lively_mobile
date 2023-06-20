import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {HStack, Image, Input, Stack, Text} from 'native-base';
import rightArrow from '../assets/icons/right-arrow.png';
import mail from '../assets/icons/mail.png';
import {GoBack, GradientButton, LoginBackGround} from '../components/atoms';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/colors';
import {ScreenNames} from '../constants';
import {SignUpStepper} from '../components/molecules';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../store/hooks';
import {setEmail} from '../store/features/authSlice';

export function AddEmailScreen() {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [showCofirm, setShowCofirm] = useState(false);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = data => {
    dispatch(setEmail(data?.email));
    navigation.navigate(ScreenNames.AdditionalInformation);
  };

  const skipHandler = () => {
    dispatch(setEmail(''));
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
      <SignUpStepper step={4} />
      <Stack pt={24}>
        <Text style={fonts.heading4} pt={3}>
          Add your email
        </Text>
        <Text style={fonts.body1}>
          You can create an account by filling the information below
        </Text>
      </Stack>

      <Stack space={3}>
        <Text style={fonts.caption} pt={3}>
          (Optional)
        </Text>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'email is required',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              borderRadius={5}
              placeholder="Email"
              keyboardType="email-address"
              InputRightElement={
                <Image alt="email" source={mail} boxSize={5} mr="2" />
              }
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && <Text>{errors.email.message}</Text>}

        <GradientButton
          title="Submit"
          text="Continue"
          onPress={handleSubmit(onSubmit)}
          mainStyle={styles.mainStyle}
        />
        <TouchableOpacity onPress={skipHandler}>
          <HStack
            alignItems={'center'}
            justifyContent={'center'}
            pt={4}
            space={2}>
            <Text
              style={[
                fonts.subtitle2,
                {color: colors.primary, fontWeight: '600'},
              ]}>
              Or skip
            </Text>
            <Image source={rightArrow} alt="rightArrow" w={2} h={3.5} />
          </HStack>
        </TouchableOpacity>
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
