import {FlatList} from 'react-native';
import React, {useState} from 'react';
import {HStack, Spinner, Stack} from 'native-base';
import {GradientButtonSmall, gradientSmallVariant} from '../atoms';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../store/hooks';
import {useGetSymptomsQuery} from '../../store/services';
import {setSelectedSubCategoryId} from '../../store/features/productSlice';
import {
  setSelectedDiseaseId,
  setSelectedSymptomId,
} from '../../store/features/medicineSlice';

interface DataProp {
  id: string;
  label: string;
  icon: string | null;
}

interface Props {
  Data: DataProp[];
  variant?: gradientSmallVariant;
}

export function MedicineSubCategory({variant = 'rounded'}: Props) {
  const dispatch = useDispatch();
  const {selectedDiseaseId, selectedSymptomId} = useAppSelector(
    state => state.medicine,
  );
  const {data, isLoading} = useGetSymptomsQuery(selectedDiseaseId);

  const onPress = (id: string) => {
    dispatch(setSelectedSymptomId(id));
  };

  return (
    <HStack>
      <GradientButtonSmall
        variant={variant}
        text={'All'}
        onPress={() => onPress('')}
        isActive={selectedSymptomId === ''}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          data={data?.data}
          horizontal={true}
          renderItem={({item}) => (
            <GradientButtonSmall
              variant={variant}
              text={item?.name}
              onPress={() => onPress(item?.id)}
              isActive={selectedSymptomId === item?.id}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </HStack>
  );
}
