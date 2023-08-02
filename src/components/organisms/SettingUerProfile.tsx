import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {
  Avatar,
  Center,
  HStack,
  Spinner,
  Stack,
  VStack,
  Text,
  Badge,
  Image,
  Button,
} from 'native-base';
import {StackActions, useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {useAppSelector} from '../../store/hooks';
import {useProfileQuery} from '../../store/services';
import Icon from 'react-native-vector-icons/FontAwesome';

export function SettingUerProfile() {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const {token, isLoggedIn} = useAppSelector(state => state.auth);
  const {data, isLoading} = useProfileQuery(token);

  if (isLoggedIn && isLoading) {
    return (
      <Center
        my={2}
        bg={colors.pureWhite}
        borderRadius={12}
        shadow={'0.5'}
        mx={3}
        px={4}
        py={16}
        space={2}>
        <Spinner />
      </Center>
    );
  }

  return (
    <View>
      {!isLoggedIn ? (
        <Stack
          my={2}
          bg={colors.pureWhite}
          borderRadius={12}
          shadow={'0.5'}
          mx={3}
          p={4}
          space={2}
          alignItems={'center'}>
          <Image
            source={require('../../assets/images/avatar.png')}
            size={16}
            mb={2}
            alt="avatar"
          />
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                StackActions.replace(ScreenNames.CreateAccount),
              )
            }>
            <Text color={colors.primary} fontWeight={'semibold'} fontSize={18}>
              Sign In
            </Text>
          </TouchableOpacity>
          <Text color={colors.lightgreyText} fontSize={16}>
            Guest user
          </Text>
        </Stack>
      ) : (
        <Stack
          bg={colors.pureWhite}
          borderRadius={12}
          shadow={'0.5'}
          p={4}
          space={2}>
          <Center>
            <VStack
              space={2}
              alignItems={{
                base: 'center',
                md: 'flex-start',
              }}>
              <HStack paddingLeft={'40%'}>
                <Avatar
                  bg="cyan.500"
                  size="lg"
                  source={{
                    uri: data?.data?.profile_photo_url,
                  }}>
                  {`${data?.data?.name
                    .split(' ')[0]
                    .charAt(0)
                    .toUpperCase()} ${data?.data?.name
                    .split(' ')[1]
                    .charAt(0)
                    .toUpperCase()}`}
                </Avatar>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(ScreenNames.EditProfileScreen)
                  }>
                  <Badge
                    bg={colors.primary}
                    alignSelf={'flex-start'}
                    marginLeft={'40%'}
                    borderRadius={10}
                    height={7}
                    colorScheme={colors.pureWhite}>
                    <HStack style={styles.editButton}>
                      <Icon name="pencil" size={15} color={colors.pureWhite} />
                      <Text style={styles.editText}>Edit</Text>
                    </HStack>
                  </Badge>
                </TouchableOpacity>
              </HStack>

              <Text style={styles.userFullnameText}>{data?.data?.name}</Text>

              <Text style={styles.userInfoText}>{data?.data?.email}</Text>
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <View>
                  <Text style={styles.userInfoText}>
                    {isVisible
                      ? `+${data?.data?.phone}`
                      : `+251 *******${data?.data?.phone.substring(10, 12)}`}
                  </Text>
                </View>
              </TouchableOpacity>
            </VStack>
          </Center>
        </Stack>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  editText: {
    fontSize: 14,
    color: colors.pureWhite,
    paddingLeft: 5,
  },
  userInfoText: {
    color: colors.greyText,
    margin: -5,
  },
  userFullnameText: {
    color: colors.pureBlack,
    margin: -5,
  },
  editButton: {
    padding: 2,
  },
});
