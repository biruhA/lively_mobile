import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {Avatar, HStack, Image, Stack, Text} from 'native-base';
import {colors} from '../theme/colors';
import {GoBack, GradientButton} from '../components/atoms';
import {fonts} from '../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';

export function MedicinePerscriptionScreen() {
  const navigation = useNavigation();
  return (
    <Stack flex={1} bg={colors.pureWhite}>
      <Stack bg={'white'} p={4}>
        <GoBack label="Medicines" />
      </Stack>
      <ScrollView>
        <Stack px={4} space={4} py={4}>
          <Stack space={1}>
            <Text style={fonts.subtitle1}>List of medicines</Text>
            <Text style={fonts.caption}>
              Here are the list of medicines identified from the prescription
              you uploaded on <Text color={'black'}>01/02/2023 9:03PM</Text>
            </Text>
          </Stack>
          <MedicinePerscriptionCard />
          <MedicinePerscriptionCard />
          <Stack bg={'white'} p={2} rounded={'lg'}>
            <DoctorTag />
            <DoctorsNotes />
          </Stack>
        </Stack>
      </ScrollView>
      <Stack
        px={2}
        pt={3}
        position={'absolute'}
        bottom={0}
        w={'100%'}
        alignItems={'center'}
        bg={'white'}>
        <GradientButton
          text="View All stores"
          onPress={() => {
            navigation.navigate(ScreenNames.DrugStores);
          }}
        />
      </Stack>
    </Stack>
  );
}

function MedicinePerscriptionCard() {
  return (
    <Stack style={styles.main} bg={'white'} rounded={'lg'}>
      <TouchableOpacity>
        <HStack space={2}>
          <Image
            source={{
              uri: 'https://wallpaperaccess.com/full/317501.jpg',
            }}
            alt="Alternate Text"
            w={120}
            resizeMode="cover"
          />
          <Stack w={'70%'} py={2} space={1}>
            <Text style={[fonts.caption, {color: 'black'}]}>
              Nauzene Upset Stomach & Nausea, Non-Drowsy, Chewable Tablets, Wild
            </Text>
            <Text style={fonts.caption}>50mg</Text>
            <Text
              w={'90%'}
              style={[fonts.caption, {color: 'black'}]}
              bg={'#EBF6F1'}
              px={2}
              py={2}>
              Twice a day For two weeks
            </Text>
          </Stack>
        </HStack>
      </TouchableOpacity>
    </Stack>
  );
}

function DoctorTag() {
  return (
    <HStack space={3} alignItems={'center'} pt={4}>
      <Avatar
        size={'lg'}
        source={{
          uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        }}>
        AJ
      </Avatar>
      <Stack>
        <Text style={fonts.subtitle1}>Lidya Girma</Text>
        <Text style={fonts.caption}>Lively Pharmacist</Text>
      </Stack>
    </HStack>
  );
}

function DoctorsNotes() {
  return (
    <Stack space={2} py={4}>
      <Text style={[fonts.body1, {color: 'black'}]}>Lidya Note</Text>
      <Text style={[fonts.normal, {color: colors.greyText, fontSize: 14}]}>
        Here is some advice we recommend you follow along with your prescribed
        medicines: rink plenty of fluids throughout the day, especially water or
        diluted squash. Avoid fruit juices or fizzy drinks as they can make your
        diarrhoea worse. You should drink enough so that your pee is a pale
        clear colour.If you are feeling sick or have difficulty drinking, take
        small sips of ORS or water every few minutes. You can also suck on ice
        cubes or ice lollies to keep your mouth moist.You should not use ORS for
        more than 2-3 days, unless your doctor has told you to. You should only
        use water to mix with the ORS; do not use milk or juice and never add
        extra sugar or salt12.If you are on a normal diet, you can continue to
        eat as usual. You may want to avoid spicy, fatty or high-fibre foods as
        they can irritate your stomach. If you have lost your appetite, try to
        eat small, bland meals or snacks that are easy to digest, such as toast,
        rice, bananas or yoghurt.If you have any signs of serious dehydration,
        such as confusion, drowsiness, fast breathing, fast heart rate, sunken
        eyes or dry mouth, you should seek medical help immediately. You may
        need intravenous fluids in hospital to restore your fluid balance3.You
        should also see your doctor if your symptoms do not improve after 48
        hours, if you have blood or mucus in your stools, if you have severe
        abdominal pain or if you have any other concerns
      </Text>
    </Stack>
  );
}

const styles = StyleSheet.create({
  main: {
    shadowColor: 'rgba(25, 38, 32, 0.3)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
});
