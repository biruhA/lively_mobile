import React, {useState} from 'react';
import {
  Stack,
  Text,
  Center,
  HStack,
  ChevronRightIcon,
  View,
  useDisclose,
  Badge,
  Actionsheet,
  Box,
  Divider,
  useToast,
  Button,
  Pressable,
  Spinner,
} from 'native-base';
import {ProfileScreensHeader} from '../components/molecules';
import {colors} from '../theme/colors';
import {Linking, ScrollView, TouchableOpacity} from 'react-native';
import {ScreenNames} from '../constants';
import {fonts} from '../theme/fonts';
import {useDeleteAccountMutation} from '../store/services';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {StackActions, useNavigation} from '@react-navigation/native';
import {logoutUser} from '../store/features/authSlice';
import {OnBoarding} from '../realm/OnBoarding';
import Context from '../realm/config';

const {useRealm, useQuery} = Context;

export function PrivacyScreen() {
  return (
    <Stack bg={'#ffffff'} h={'full'} py={1}>
      <View w={'full'} h={10}>
        <ProfileScreensHeader
          navigationTo={ScreenNames.Settings}
          screenName="Privacy"
        />
      </View>
      <ScrollView style={{backgroundColor: '#E3EBEB', paddingHorizontal: 8}}>
        <Stack py={3} />
        <Stack
          bg={colors.pureWhite}
          borderRadius={12}
          shadow={'0.5'}
          mx={1}
          px={4}
          py={4}
          space={4}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://lively-et.com/terms-condition');
            }}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              bg={colors.pureWhite}>
              <Text fontSize="md" alignSelf="flex-start">
                Terms & Conditions
              </Text>
              <ChevronRightIcon size="5" mt="0.5" alignSelf="flex-end" />
            </HStack>
          </TouchableOpacity>
          <Divider bg={'#E6E6E6'} thickness="1" />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://lively-et.com/privacy-policy');
            }}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              bg={colors.pureWhite}>
              <Text fontSize="md" alignSelf="flex-start">
                Privacy
              </Text>
              <ChevronRightIcon size="5" mt="0.5" alignSelf="flex-end" />
            </HStack>
          </TouchableOpacity>
          <Divider bg={'#E6E6E6'} thickness="1" />
          <DeleteAccount />
        </Stack>
      </ScrollView>
    </Stack>
  );
}

function DeleteAccount() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {isOpen, onOpen, onClose} = useDisclose();
  const {token} = useAppSelector(state => state.auth);
  const [deleteAccount, result] = useDeleteAccountMutation();
  const realm = useRealm();
  const onboarding = useQuery(OnBoarding);
  const toast = useToast();

  function deleteHandler() {
    deleteAccount(token)
      .unwrap()
      .then(res => {
        dispatch(logoutUser());
        realm.write(() => {
          onboarding[0].rememberMe = false;
        });
        navigation.dispatch(StackActions.replace(ScreenNames.AuthStack));
      })
      .catch(err => {
        toast.show({
          description: err?.data?.message,
        });
      });
  }

  return (
    <Stack w={'100%'}>
      <TouchableOpacity onPress={onOpen}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          bg={colors.pureWhite}>
          <Text fontSize="md">Delete Account</Text>
          <ChevronRightIcon size="5" mt="0.5" alignSelf="flex-end" />
        </HStack>
      </TouchableOpacity>

      <Actionsheet
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        hideDragIndicator={true}>
        <Actionsheet.Content>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            bg={colors.pureWhite}>
            <Text
              fontSize="md"
              style={fonts.heading6}
              w={'98%'}
              noOfLines={2}
              px={2}
              py={6}>
              Are you sure do you want to delete your account?
            </Text>
          </HStack>

          <ScrollView style={{width: '96%'}}>
            <HStack space={5} justifyContent="center">
              <Box w="40%" h={60}>
                <TouchableOpacity onPress={onClose}>
                  <Badge
                    bg={colors.unselected}
                    alignSelf={'flex-start'}
                    borderRadius={8}
                    width="100%"
                    height={35}
                    colorScheme={colors.pureWhite}>
                    <Text color={colors.pureBlack} fontSize={16}>
                      Cancel
                    </Text>
                  </Badge>
                </TouchableOpacity>
              </Box>
              <Box w="40%" h={60}>
                <TouchableOpacity onPress={deleteHandler}>
                  <Badge
                    bg={result?.isLoading ? colors.unselected : colors.error}
                    alignSelf={'flex-start'}
                    borderRadius={8}
                    width="100%"
                    height={35}
                    colorScheme={colors.pureWhite}>
                    {result?.isLoading ? (
                      <Spinner size={'sm'} />
                    ) : (
                      <Text color={colors.pureWhite} fontSize={16}>
                        Delete
                      </Text>
                    )}
                  </Badge>
                </TouchableOpacity>
              </Box>
            </HStack>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Stack>
  );
}
