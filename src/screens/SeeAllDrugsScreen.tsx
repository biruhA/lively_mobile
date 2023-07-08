import {FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Center, Image, Pressable, Spinner, Stack, Text} from 'native-base';
import {colors} from '../theme/colors';
import {
  CatalogList,
  IconOnlyHeader,
  MedicineSubCategory,
} from '../components/molecules';
import {ListEmptyComponent} from '../components/atoms';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import {
  useGetMedicinesByDiseaseQuery,
  useGetMedicinesBySymptomQuery,
  useGetSymptomsQuery,
} from '../store/services';
import {useAppSelector} from '../store/hooks';

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
}

export function SeeAllDrugsScreen() {
  const {selectedDiseaseId, selectedSymptomId} = useAppSelector(
    state => state.medicine,
  );

  const {data, isLoading} = useGetMedicinesByDiseaseQuery(selectedDiseaseId);

  const getMedicinesBySymptom =
    useGetMedicinesBySymptomQuery(selectedSymptomId);
  const [Data, setData] = useState([]);

  useEffect(() => {
    if (selectedSymptomId) {
      setData(getMedicinesBySymptom?.data?.data);
    } else {
      setData(data?.data?.medicines);
    }
  }, [selectedDiseaseId, selectedSymptomId, data, getMedicinesBySymptom]);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack
      space={4}
      flex={1}
      bg={colors.pureWhite}
      px={'16px'}
      py={2}
      justifyContent={'center'}>
      <IconOnlyHeader
        iconL={require('../assets/icons/search.png')}
        iconR={require('../assets/icons/filter.png')}
        onPressL={() => {
          console.log('cat');
        }}
        onPressR={() => {}}
      />
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <MedicineSubCategory />
      )}
      <FlatList
        style={{marginTop: 4}}
        numColumns={2}
        data={Data}
        ListEmptyComponent={() => {
          return <ListEmptyComponent />;
        }}
        renderItem={({item}) => (
          <Card
            imageUrl={item?.medicine_image?.url}
            name={item?.name}
            size={'30-90'}
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
      onPress={() => navigation.navigate(ScreenNames.DrugDetail)}>
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
