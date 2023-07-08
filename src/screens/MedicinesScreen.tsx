import {FlatList, ScrollView} from 'react-native';
import React from 'react';
import {GoBack} from '../components/atoms';
import {Image, Pressable, Stack, Text, useDisclose} from 'native-base';
import {colors} from '../theme/colors';
import {
  OrderWithPrescription,
  Prescription,
  SearchBox,
} from '../components/molecules';
import {MedicineSections} from '../components/organisms';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import {PrescriptionUploadSheet} from '../components/sheets';
import {useGetAllMedicinesQuery, useGetDiseasesQuery} from '../store/services';
import {useAppDispatch} from '../store/hooks';
import {setSelectedDiseaseId} from '../store/features/medicineSlice';

export function MedicinesScreen() {
  const {isOpen, onOpen, onClose} = useDisclose();
  const getDiseases = useGetDiseasesQuery();
  const getAllMedicines = useGetAllMedicinesQuery();

  return (
    <Stack flex={1} p={4} space={6} bg={'white'}>
      <ScrollView>
        <Stack space={4}>
          <GoBack label="Medicines" />
          <SearchBox onCamPress={onOpen} />
          <OrderWithPrescription onCamPress={onOpen} />
          <FlatList
            horizontal={true}
            data={getDiseases?.data?.data}
            renderItem={({item}) => (
              <Cards
                id={item?.id}
                name={item?.name}
                imageurl={item?.disease_image?.url}
              />
            )}
            keyExtractor={(item: Props) => item.id}
          />
          <MedicineSections data={getAllMedicines?.data?.data?.data} />
        </Stack>
      </ScrollView>
      <PrescriptionUploadSheet isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}

function Cards({id, imageurl, name}) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <Pressable
      bg={'#DA4167'}
      w={95}
      h={95}
      mt={5}
      rounded={'lg'}
      p={2}
      space={1}
      mr={4}
      onPress={() => {
        dispatch(setSelectedDiseaseId(id));
        navigation.navigate(ScreenNames.SeeAllDrugs);
      }}>
      <Stack justifyContent={'space-between'} h={'100%'}>
        <Text
          fontSize={14}
          color={'white'}
          fontWeight={'semibold'}
          noOfLines={2}>
          {name}
        </Text>
        <Image
          alignSelf={'flex-end'}
          source={{
            uri: imageurl,
          }}
          alt="Alternate Text"
          boxSize={10}
          resizeMode="cover"
        />
      </Stack>
    </Pressable>
  );
}
