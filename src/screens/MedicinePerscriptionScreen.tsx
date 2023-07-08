import {FlatList, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {Avatar, Center, HStack, Image, Spinner, Stack, Text} from 'native-base';
import {colors} from '../theme/colors';
import {GoBack, GradientButton} from '../components/atoms';
import {fonts} from '../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import {useMedicineNotificationDetailQuery} from '../store/services';
import {useAppSelector} from '../store/hooks';

export function MedicinePerscriptionScreen() {
  const {token} = useAppSelector(state => state.auth);
  const {selectedNotificationId} = useAppSelector(state => state.medicine);

  const {data, isLoading} = useMedicineNotificationDetailQuery({
    id: selectedNotificationId,
    token,
  });

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

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

          <FlatList
            data={data?.data?.medicine_lists}
            keyExtractor={item => item.id}
            renderItem={({item}) => <MedicinePerscriptionCard item={item} />}
          />

          <Stack bg={'white'} p={2} rounded={'lg'}>
            <DoctorTag data={data?.data?.pharmacist} />
            <DoctorsNotes data={data?.data?.pharmacist_note} />
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

function MedicinePerscriptionCard({item}) {
  return (
    <Stack style={styles.main} bg={'white'} rounded={'lg'} my={2}>
      <TouchableOpacity>
        <HStack space={2}>
          <Image
            source={{
              uri: item?.medicine?.medicine_image?.url,
            }}
            alt="Alternate Text"
            w={120}
            resizeMode="cover"
          />
          <Stack w={'70%'} py={2} space={1}>
            <Text style={[fonts.caption, {color: 'black'}]}>
              {item?.medicine?.drug?.scientific_name}
            </Text>
            <Text style={fonts.caption}>
              {item?.medicine?.drug?.size} {item?.medicine?.drug?.dossage?.name}
            </Text>
            <Text
              w={'90%'}
              style={[fonts.caption, {color: 'black'}]}
              bg={'#EBF6F1'}
              px={2}
              py={2}>
              {item?.medicine?.drug?.administration?.name}
            </Text>
          </Stack>
        </HStack>
      </TouchableOpacity>
    </Stack>
  );
}

function DoctorTag({data}) {
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
        <Text style={fonts.subtitle1}>{data}</Text>
        <Text style={fonts.caption}>Lively Pharmacist</Text>
      </Stack>
    </HStack>
  );
}

function DoctorsNotes({data}) {
  return (
    <Stack space={2} py={4}>
      <Text style={[fonts.body1, {color: 'black'}]}>Lidya Note</Text>
      <Text style={[fonts.normal, {color: colors.greyText, fontSize: 14}]}>
        {data}
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
