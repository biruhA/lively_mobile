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
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {ProfileScreensHeader} from '../components/molecules';
import {colors} from '../theme/colors';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScreenNames} from '../constants';
import {fonts} from '../theme/fonts';

export function EditProfileScreen() {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  const handleSave = () => {
    console.log('====================================');
    console.log('save button clicked');
    console.log('====================================');
  };

  const handleResetPAssword = () => {
    console.log('====================================');
    console.log('Next button clicked');
    console.log('====================================');
  };

  return (
    <Stack
      bg={colors.pureWhite}
      h={'full'}
      style={{backgroundColor: colors.pagesBackeground}}>
      <View w={'full'}>
        <ProfileScreensHeader
          navigationTo={ScreenNames.Settings}
          screenName="Edit Profile"
        />
      </View>
      <ScrollView>
        <Stack bg={colors.pureWhite} borderRadius={12} py={6}>
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
                  uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
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

              <TouchableOpacity
                style={{paddingLeft: 70}}
                onPress={handleSave()}>
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

            <Text style={styles.userInfoText}>anduamlakt77@gmail.com</Text>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              <View>
                <Text style={styles.userInfoText}>
                  {isVisible ? '+251 911581886' : ' +251 *******86'}
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
          mx={1}
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
                <Input variant="outline" value="Anduamlak" />
              </VStack>

              <VStack w="50%">
                <FormControl.Label>Last Name</FormControl.Label>
                <Input variant="outline" value="Temesgen" />
              </VStack>
            </HStack>

            <HStack space={2} alignSelf={'flex-start'}>
              <VStack w="42%">
                <GendersList />
              </VStack>
            </HStack>

            <HStack space={2}>
              <VStack w="100%">
                <FormControl.Label>Email</FormControl.Label>
                <Input variant="outline" value="anduamlakt77@gmail.com" />
              </VStack>
            </HStack>
          </VStack>
        </Stack>

        <Stack
          my={2}
          bg={colors.pureWhite}
          borderRadius={12}
          shadow={'0.5'}
          mx={1}
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
                      navigation.navigate(ScreenNames.PhoneConfirmationScreen);
                    }}>
                    <Badge
                      bg={colors.unselected}
                      alignSelf={'flex-start'}
                      borderRadius={15}
                      width="100%"
                      height={35}
                      colorScheme={colors.pureWhite}>
                      <Text color={colors.primary}>Reset Password</Text>
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

function GendersList() {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [gender, setGender] = useState('Select');

  const onGenderSelect = data => {
    setGender(data);
  };
  return (
    <>
      <FormControl.Label> Gender </FormControl.Label>
      <HStack
        borderColor={colors.greyText}
        borderRadius={4}
        borderWidth={1}
        bg={colors.pureWhite}>
        <TouchableOpacity onPress={onOpen}>
          <HStack space={10} paddingRight={2} paddingLeft={1}>
            <Text fontSize="md">{gender}</Text>
            <ChevronDownIcon size="5" mt="1" />
          </HStack>
        </TouchableOpacity>
      </HStack>

      <Actionsheet
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        hideDragIndicator={true}>
        <Actionsheet.Content>
          <Box w="100%" h={30} px={4}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              bg={colors.pureWhite}
              maxW="350">
              <HStack space={2}>
                <Text fontSize="md" style={fonts.heading6}>
                  Gender
                </Text>
              </HStack>
              <TouchableOpacity onPress={onClose}>
                <HStack
                  shadow={2}
                  bg={colors.pureWhite}
                  alignSelf={'flex-start'}
                  borderRadius={15}
                  borderColor={colors.error}
                  width={30}
                  height={30}
                  colorScheme={colors.pureWhite}>
                  <Text fontSize={20} paddingLeft={2}>
                    X
                  </Text>
                </HStack>
              </TouchableOpacity>
            </HStack>
          </Box>

          <ScrollView style={{width: '96%'}}>
            <Box w="100%" h={60} justifyContent="center">
              {/* <TouchableOpacity onPress={setGender('Female')}> */}
              <TouchableOpacity>
                <Badge
                  bg={colors.unselected}
                  alignSelf={'flex-start'}
                  borderRadius={8}
                  width="100%"
                  height={35}
                  colorScheme={colors.pureWhite}>
                  <Text color={colors.primary}>Female</Text>
                </Badge>
              </TouchableOpacity>
            </Box>

            <Box w="100%" h={60}>
              {/* <TouchableOpacity onPress={setGender('Male')}> */}
              <TouchableOpacity>
                <Badge
                  bg={colors.unselected}
                  alignSelf={'flex-start'}
                  borderRadius={8}
                  width="100%"
                  height={35}
                  colorScheme={colors.pureWhite}>
                  <Text color={colors.primary}>Male</Text>
                </Badge>
              </TouchableOpacity>
            </Box>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
