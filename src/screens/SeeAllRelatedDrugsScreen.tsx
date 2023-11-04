import {FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Center, Image, Pressable, Spinner, Stack, Text} from 'native-base';
import {colors} from '../theme/colors';
import {
  CatalogList,
  IconOnlyHeader,
  MedicineSubCategory,
} from '../components/molecules';
import {ApiImage, ListEmptyComponent} from '../components/atoms';
import {useRoute, useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import {
  useGetMedicinesByDiseaseQuery,
  useGetMedicinesBySymptomQuery,
  useGetSymptomsQuery,
  useRelatedMedicinesQuery,
} from '../store/services';
import {useAppSelector} from '../store/hooks';
import {LabeledHeader} from '../components';

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
}

export function SeeAllRelatedDrugsScreen() {
  const route = useRoute();
  const {data, isLoading} = useRelatedMedicinesQuery(route?.params?.id);
  console.log(
    '🚀 ~ file: SeeAllRelatedDrugsScreen.tsx:31 ~ SeeAllRelatedDrugsScreen ~ data:',
    data?.data?.data,
  );

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack space={4} flex={1} bg={colors.pureWhite}>
      <LabeledHeader label="" />
      <FlatList
        style={{marginTop: 4, paddingHorizontal: 16}}
        numColumns={2}
        data={data?.data?.data}
        ListEmptyComponent={() => {
          return <ListEmptyComponent />;
        }}
        renderItem={({item}) => (
          <Card
            imageUrl={item?.medicine_image?.url}
            name={item?.name}
            size={item?.size}
          />
        )}
        keyExtractor={(item: Props) => item.id}
      />
    </Stack>
  );
}

function Card({imageUrl, name, size}) {
  const navigation = useNavigation();
  return (
    <Pressable
      w={175}
      my={2}
      mr={2}
      bg="white"
      rounded={'md'}
      shadow={0}
      overflow={'hidden'}
      onPress={() => navigation.navigate(ScreenNames.DrugDetail2)}>
      <ApiImage
        resizeMode="cover"
        imageUrl={imageUrl}
        style={{width: '100%', height: 99, alignSelf: 'flex-end'}}
      />
      <Stack p={2}>
        <Text fontSize={14} color={'black'} fontWeight={'semibold'}>
          {name}
        </Text>
        <Text fontSize={14} color={'black'} fontWeight={'semibold'}>
          {size} Tablet
        </Text>
      </Stack>
    </Pressable>
  );
}
