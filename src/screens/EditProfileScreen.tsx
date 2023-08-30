import React, {useState} from 'react';
import {
  Stack,
  Text,
  Avatar,
  Center,
  VStack,
  HStack,
  View,
  useDisclose,
  Badge,
  Actionsheet,
  Box,
  Input,
  FormControl,
  ChevronDownIcon,
  Select,
  Spinner,
  useToast,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {ProfileScreensHeader} from '../components/molecules';
import {colors} from '../theme/colors';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScreenNames} from '../constants';
import {fonts} from '../theme/fonts';
import {useAppSelector} from '../store/hooks';
import {useProfileQuery, useUpdateProfileMutation} from '../store/services';
import {storeProtectedData} from '../util';
import {useDispatch} from 'react-redux';
import {updateUser} from '../store/features/authSlice';

export function EditProfileScreen() {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const {token} = useAppSelector(state => state.auth);
  const {data, isLoading} = useProfileQuery(token);

  const [firstName, setFirstName] = useState(data?.data?.name?.split(' ')[0]);
  const [lastName, setLastName] = useState(data?.data?.name?.split(' ')[1]);
  const [gender, setGender] = useState(data?.data?.gender);
  const [email, setEmail] = useState(data?.data?.email);
  const [UpdateProfile, result] = useUpdateProfileMutation();
  const toast = useToast();
  console.log(
    '🚀 ~ file: EditProfileScreen.tsx:46 ~ EditProfileScreen ~ result:',
    result,
  );

  const handleSave = () => {
    UpdateProfile({
      name: `${firstName} ${lastName}`,
      email,
      gender,
      token,
    })
      .unwrap()
      .then(res => {
        dispatch(updateUser(res?.data));
        toast.show({
          description: 'Profile updated successfully',
        });
      })
      .catch(err => {
        toast.show({
          description: err?.data?.data,
        });
      });
  };

  const handleResetPAssword = () => {
    console.log('====================================');
    console.log('Next button clicked');
    console.log('====================================');
  };

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack bg={'white'} flex={1}>
      <View py={2}>
        <ProfileScreensHeader
          navigationTo={ScreenNames.Settings}
          screenName="Edit Profile"
        />
      </View>
      <ScrollView style={{backgroundColor: '#E3EBEB'}} alignItems={'center'}>
        <Stack bg={colors.pureWhite} borderRadius={12} py={6} mx={5} my={3}>
          <VStack
            space={2}
            alignItems={{
              base: 'center',
              md: 'flex-start',
            }}>
            <HStack paddingLeft={'45%'} w={'110%'}>
              <Avatar
                bg="cyan.500"
                size="lg"
                source={{
                  uri: data?.data?.profile_photo_url,
                }}
              />

              <TouchableOpacity
                style={{marginLeft: -20}}
                onPress={() =>
                  navigation.navigate(ScreenNames.EditProfileScreen)
                }>
                <Badge
                  bg={colors.primary}
                  alignSelf={'flex-start'}
                  borderRadius={15}
                  width={30}
                  height={30}
                  colorScheme={colors.pureWhite}>
                  <Icon name="camera" size={12} color={colors.pureWhite} />
                </Badge>
              </TouchableOpacity>

              <TouchableOpacity style={{paddingLeft: 70}} onPress={handleSave}>
                <Badge
                  bg={colors.primary}
                  alignSelf={'flex-start'}
                  borderRadius={10}
                  height={7}
                  colorScheme={colors.pureWhite}>
                  <HStack style={styles.editButton}>
                    <Icon name="pencil" size={15} color={colors.pureWhite} />
                    <Text style={styles.editText}>Save</Text>
                  </HStack>
                </Badge>
              </TouchableOpacity>
            </HStack>

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
        </Stack>

        <Stack
          my={2}
          bg={colors.pureWhite}
          borderRadius={12}
          shadow={'0.5'}
          mx={5}
          px={4}
          py={4}
          space={2}>
          <Text>Personal Detail</Text>

          <VStack
            space={2}
            alignItems={{
              base: 'center',
              md: 'flex-start',
            }}>
            <HStack space={2}>
              <VStack w="50%">
                <FormControl.Label>First Name</FormControl.Label>
                <Input
                  variant="outline"
                  value={firstName}
                  onChangeText={text => setFirstName(text)}
                />
              </VStack>

              <VStack w="50%">
                <FormControl.Label>Last Name</FormControl.Label>
                <Input
                  variant="outline"
                  value={lastName}
                  onChangeText={text => setLastName(text)}
                />
              </VStack>
            </HStack>

            <VStack w="50%" alignSelf={'flex-start'}>
              <Select
                placeholder="Gender"
                selectedValue={gender}
                onValueChange={(itemValue: string) => {
                  setGender(itemValue);
                }}>
                <Select.Item label="Male" value="Male" />
                <Select.Item label="Female" value="Female" />
              </Select>
            </VStack>

            <VStack w="100%">
              <FormControl.Label>Email</FormControl.Label>
              <Input
                variant="outline"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </VStack>
          </VStack>
        </Stack>

        <Stack
          my={2}
          bg={colors.pureWhite}
          borderRadius={12}
          shadow={'0.5'}
          mx={5}
          px={4}
          py={4}
          space={2}>
          <Text>Password</Text>
          <Center>
            <VStack
              space={2}
              alignItems={{
                base: 'center',
                md: 'flex-start',
              }}>
              <HStack space={2}>
                <VStack w="100%">
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ScreenNames.ChangePasswordScreen);
                    }}>
                    <Badge
                      bg={colors.unselected}
                      alignSelf={'flex-start'}
                      borderRadius={15}
                      width="100%"
                      height={35}
                      colorScheme={colors.pureWhite}>
                      <Text color={colors.primary}>Change Password</Text>
                    </Badge>
                  </TouchableOpacity>
                </VStack>
              </HStack>
            </VStack>
          </Center>
        </Stack>
      </ScrollView>
    </Stack>
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
    padding: 1,
  },
});
