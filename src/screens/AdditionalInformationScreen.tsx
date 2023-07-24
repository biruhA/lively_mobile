import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  Pressable,
  CheckIcon,
  ChevronDownIcon,
  HStack,
  Icon,
  Image,
  Input,
  Select,
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
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  SetDob,
  SetGender,
  setDob,
  setGender,
} from '../store/features/authSlice';
import {useFinishRegisterMutation} from '../store/services';
import DatePicker from 'react-native-date-picker';

export function AdditionalInformationScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      Dof: new Date(),
      gender: '',
    },
  });

  // Calculate the date 18 years ago
  const minDateForUnder18 = new Date();
  minDateForUnder18.setFullYear(minDateForUnder18.getFullYear() - 18);

  const onSubmit = data => {
    dispatch(SetDob(data?.Dof?.toISOString().split('T')[0]));
    dispatch(SetGender(data?.gender));
    navigation.navigate(ScreenNames.AddEmail);
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
      <SignUpStepper step={5} />
      <Stack pt={24}>
        <Text style={fonts.heading4} pt={3}>
          Additional Information
        </Text>
        <Text style={fonts.body1}>
          You can create an account by filling the informationbelow
        </Text>
      </Stack>
      <Stack space={3}>
        <Pressable
          py={2}
          rounded={'sm'}
          borderWidth={1}
          borderColor={'#B4B4B4aa'}
          onPress={() => {
            setOpen(true);
          }}>
          <HStack px={3} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontSize={13}>
              Birth Date: {date.toISOString().split('T')[0]}
            </Text>
            <ChevronDownIcon size={6} />
          </HStack>
        </Pressable>

        <Controller
          name="Dof"
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date ? date : new Date());
                onChange(date ? date : new Date());
              }}
              onCancel={() => {
                setOpen(false);
              }}
              theme="auto"
              mode="date"
              maximumDate={minDateForUnder18}
            />
          )}
        />
        {errors.Dof && (
          <Text color={'error.500'}>Date of Birth is required.</Text>
        )}

        <Controller
          name="gender"
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <Select
              placeholder="Gender"
              selectedValue={value}
              onValueChange={(itemValue: string) => {
                onChange(itemValue);
              }}>
              <Select.Item label="Male" value="Male" />
              <Select.Item label="Female" value="Female" />
            </Select>
          )}
        />
        {errors.gender && <Text color={'error.500'}>Gender is required.</Text>}

        <GradientButton
          title="Submit"
          text="Continue"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
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
