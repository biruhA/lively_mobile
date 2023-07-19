import React from 'react';
import {Stack, Center, VStack, HStack, View, FormControl} from 'native-base';
import {ProfileScreensHeader} from '../components/molecules';
import {colors} from '../theme/colors';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import {ScreenNames} from '../constants';
import {GradientButton} from '../components/atoms';

export function HelpScreen() {
  const onSubmit = () => {
    console.log('====================================');
    console.log('Mr. Biruh, please o your things here ');
    console.log('====================================');
  };
  return (
    <Stack bg={'#ffffff'} h={'full'} py={1}>
      <View w={'full'} h={10}>
        <ProfileScreensHeader
          navigationTo={ScreenNames.Settings}
          screenName="Help"
        />
      </View>
      <ScrollView style={{backgroundColor: '#E3EBEB'}} alignItems={'center'}>
        <Stack py={2} />
        <Stack
          my={2}
          bg={colors.pureWhite}
          borderRadius={12}
          shadow={'0.5'}
          mx={3}
          px={4}
          py={4}
          space={2}>
          <Center>
            <VStack
              space={2}
              alignItems={{
                base: 'center',
                md: 'flex-start',
              }}>
              <HStack space={2}>
                <VStack w="100%">
                  <FormControl.Label>Subject</FormControl.Label>
                  <TextInput
                    editable
                    placeholder="Write your subject"
                    // onChangeText={text => onChangeText(text)}
                    // value={value}
                    style={styles.subjectInput}
                  />
                </VStack>
              </HStack>
              <HStack space={2}>
                <VStack w="100%">
                  <FormControl.Label>Your Message</FormControl.Label>
                  <TextInput
                    editable
                    multiline
                    numberOfLines={10}
                    maxLength={40}
                    placeholder="Write your message here"
                    // onChangeText={text => onChangeText(text)}
                    // value={value}
                    style={styles.input}
                  />
                </VStack>
              </HStack>
            </VStack>
            <GradientButton
              title="Submit"
              text="Submit"
              onPress={onSubmit()}
              mainStyle={styles.mainStyle}
            />
          </Center>
        </Stack>
      </ScrollView>
    </Stack>
  );
}

const styles = StyleSheet.create({
  mainStyle: {marginTop: 15},
  subjectInput: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#B4B4B4',
  },
  input: {
    height: 200,
    borderWidth: 1,
    padding: 10,
    borderColor: '#B4B4B4',
  },
});
