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
} from 'native-base';
import {ProfileScreensHeader} from '../components/molecules';
import {colors} from '../theme/colors';
import {ScrollView, TouchableOpacity} from 'react-native';
import {ScreenNames} from '../constants';
import {fonts} from '../theme/fonts';

export function PrivacyScreen() {
  const onSubmit = () => {
    console.log('====================================');
    console.log('Mr. Biruh, please do your things here ');
    console.log('====================================');
  };
  return (
    <Stack bg={'#ffffff'} h={'full'} py={1}>
      <View w={'full'} h={10}>
        <ProfileScreensHeader
          navigationTo={ScreenNames.Settings}
          screenName="Privacy"
        />
      </View>
      <ScrollView style={{backgroundColor: '#E3EBEB'}} alignItems={'center'}>
        <Stack py={3} />
        <Stack
          bg={colors.pureWhite}
          borderRadius={12}
          shadow={'0.5'}
          mx={1}
          px={4}
          py={4}
          space={4}>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            bg={colors.pureWhite}>
            <TouchableOpacity onPress={onSubmit}>
              <HStack space={'52%'}>
                <Text fontSize="md" alignSelf="flex-start">
                  Terms & Conditions
                </Text>
                <ChevronRightIcon size="5" mt="0.5" alignSelf="flex-end" />
              </HStack>
            </TouchableOpacity>
          </HStack>
          <Divider bg={'#E6E6E6'} thickness="1" />
          <>
            <DeleteAccount />
          </>
        </Stack>
      </ScrollView>
    </Stack>
  );
}

function DeleteAccount() {
  const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <Center>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        bg={colors.pureWhite}
        maxW="350">
        <TouchableOpacity onPress={onOpen}>
          <HStack space={'61%'}>
            <Text fontSize="md">Delete Account</Text>

            <ChevronRightIcon size="5" mt="0.5" alignSelf="flex-end" />
          </HStack>
        </TouchableOpacity>
      </HStack>

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
                <TouchableOpacity>
                  <Badge
                    bg={colors.error}
                    alignSelf={'flex-start'}
                    borderRadius={8}
                    width="100%"
                    height={35}
                    colorScheme={colors.pureWhite}>
                    <Text color={colors.pureWhite} fontSize={16}>
                      Delete
                    </Text>
                  </Badge>
                </TouchableOpacity>
              </Box>
            </HStack>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}
