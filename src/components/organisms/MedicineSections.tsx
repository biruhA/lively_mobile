import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {IconOnlyHeader, SectionHeader} from '../molecules';
import {ScreenNames} from '../../constants';
import {Button, Image, Pressable, Stack, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../theme/colors';
import {useAppDispatch} from '../../store/hooks';
import {setSelectedMedicineId} from '../../store/features/medicineSlice';

const Data = [
  {id: '1'},
  {id: '2'},
  {id: '3'},
  {id: '4'},
  {id: '5'},
  {id: '6'},
  {id: '7'},
  {id: '8'},
  {id: '8'},
];

export function MedicineSections({data}) {
  return (
    <Stack mt={4}>
      <FlatList
        numColumns={2}
        data={data}
        columnWrapperStyle={styles.columnWrapperStyle}
        renderItem={({item}) => (
          <Cards
            id={item.id}
            imageUrl={item?.medicine_image?.url}
            name={item?.name}
            size={item?.drug?.size}
          />
        )}
        keyExtractor={item => item.id}
        ListFooterComponent={() => {
          return (
            <>
              {data?.length > 10 && (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#E2FFF1',
                    padding: 8,
                    width: 80,
                    borderRadius: 8,
                    alignSelf: 'center',
                    marginTop: 12,
                  }}>
                  <Text color={'#00BA63'}>See more</Text>
                </TouchableOpacity>
              )}
            </>
          );
        }}
      />
    </Stack>
  );
}

function Cards({id, imageUrl, name, size}) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch(setSelectedMedicineId(id));
        navigation.navigate(ScreenNames.DrugDetail);
      }}>
      <Stack
        w={'100%'}
        my={2}
        bg="white"
        rounded={'md'}
        shadow={0}
        overflow={'hidden'}>
        <Image
          alignSelf={'flex-end'}
          source={{
            uri: imageUrl,
          }}
          h={99}
          w={'100%'}
          alt="Alternate Text"
          resizeMode="cover"
        />
        <Stack p={2} space={1}>
          <Text fontSize={14} color={'black'} fontWeight={'400'}>
            {name}
          </Text>
          <Text fontSize={14} color={colors.lightgreyText} fontWeight={'400'}>
            {size} Tablet
          </Text>
        </Stack>
      </Stack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '47%',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
});