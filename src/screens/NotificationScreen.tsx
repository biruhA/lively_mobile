import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Text, Avatar, HStack, Stack, Box} from 'native-base';
import {colors} from '../theme/colors';
import {GoBack} from '../components/atoms';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';

export function NotificationScreen() {
  return (
    <Stack flex={1} bg={colors.pureWhite}>
      <Stack bg={'white'} p={4}>
        <GoBack label="Notifications" />
      </Stack>
      <Stack px={4} space={4} py={4}>
        <HStack>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              fontWeight: '700',
              color: colors.primary,
            }}>
            1 new
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              fontWeight: '700',
              color: colors.greyText,
            }}>
            {' '}
            Notification
          </Text>
        </HStack>
        <NotificationCard />
        <NotificationCard />
      </Stack>
    </Stack>
  );
}

const NotificationCard = () => {
  const navigation = useNavigation();
  return (
    <Stack bg={'white'} px={2} py={2} shadow={0} rounded={'lg'} space={3}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenNames.MedicinePerscription);
        }}>
        <AvatarGroup />
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            fontWeight: '700',
            color: colors.primary,
          }}>
          Your prescription has been verified!
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            fontWeight: '400',
            color: colors.pureBlack,
            backgroundColor: '#ebf6f1',
            padding: 8,
            borderRadius: 5,
          }}>
          Hello Kidist, please check the list of medications and where to find
          them at a pharmacy near you.
        </Text>
      </TouchableOpacity>
    </Stack>
  );
};

function AvatarGroup() {
  return (
    <Stack alignItems="flex-start" px={4}>
      <Avatar.Group
        _avatar={{
          size: 'sm',
        }}
        max={4}>
        <Avatar
          bg="green.500"
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}>
          AJ
        </Avatar>
        <Avatar
          bg="cyan.500"
          source={{
            uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          }}>
          TE
        </Avatar>
        <Avatar
          bg="indigo.500"
          source={{
            uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}>
          JB
        </Avatar>
        <Avatar
          bg="amber.500"
          source={{
            uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          }}>
          TS
        </Avatar>
        <Avatar
          bg="green.500"
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}>
          AJ
        </Avatar>
        <Avatar
          bg="cyan.500"
          source={{
            uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          }}>
          TE
        </Avatar>
        <Avatar
          bg="indigo.500"
          source={{
            uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}>
          JB
        </Avatar>
        <Avatar
          bg="amber.500"
          source={{
            uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          }}>
          TS
        </Avatar>
      </Avatar.Group>
    </Stack>
  );
}
