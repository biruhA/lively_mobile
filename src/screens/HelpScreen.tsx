import React from 'react';
import {
  Stack,
  Text,
  VStack,
  HStack,
  View,
  FormControl,
  Input,
  TextArea,
  useDisclose,
  useToast,
} from 'native-base';
import {ProfileScreensHeader} from '../components/molecules';
import {Colors, colors} from '../theme/colors';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import {ScreenNames} from '../constants';
import {GradientButton} from '../components/atoms';
import {useForm, Controller} from 'react-hook-form';
import {LabeledHeader, LoginSheet} from '../components';
import {useHelpMutation} from '../store/services';
import {useAppSelector} from '../store/hooks';
import {Navigation} from '../navigation';
import {useNavigation} from '@react-navigation/native';

export function HelpScreen() {
  const {isOpen, onOpen, onClose} = useDisclose();
  const {token, isLoggedIn} = useAppSelector(state => state.auth);
  const [Help] = useHelpMutation();
  const toast = useToast();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      subject: '',
      message: '',
      token,
    },
  });

  const onSubmit = data => {
    Help({
      subject: data.subject,
      body: data.message,
      token,
    })
      .unwrap()
      .then(res => {
        toast.show({
          placement: 'top',
          description: 'Your message has been sent',
        });
        reset();
        navigation.goBack();
      })
      .catch(err => {
        toast.show({
          placement: 'top',
          description: err?.data?.message,
        });
      });
  };

  return (
    <Stack bg={Colors.background.artemisia} flex={1}>
      <LabeledHeader label="Help" />
      <Stack
        my={6}
        mx={3}
        p={4}
        bg={colors.pureWhite}
        borderRadius={12}
        space={2}>
        <Stack w={'100%'}>
          <FormControl.Label>Subject</FormControl.Label>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'subject is required',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                w={'100%'}
                size={'lg'}
                borderRadius={5}
                placeholder="Subject"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="subject"
          />
          {errors.subject && <Text>{errors.subject.message}</Text>}
        </Stack>
        <Stack w={'100%'} mt={3}>
          <FormControl.Label>Your Message</FormControl.Label>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Message is required',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextArea
                w={'100%'}
                size={'lg'}
                borderRadius={5}
                placeholder="Your Message"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="message"
          />
          {errors.message && <Text>{errors.message.message}</Text>}
        </Stack>
        {!isLoggedIn ? (
          <GradientButton
            title="Submit"
            text="Submit"
            onPress={onOpen}
            mainStyle={styles.mainStyle}
          />
        ) : (
          <GradientButton
            title="Submit"
            text="Submit"
            onPress={handleSubmit(onSubmit)}
            mainStyle={styles.mainStyle}
          />
        )}
      </Stack>
      <LoginSheet isOpen={isOpen} onClose={onClose} action={''} payload={''} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  mainStyle: {marginTop: 15},
});
