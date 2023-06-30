import {FlatList} from 'react-native';
import React from 'react';
import {Image, Pressable, Stack, Text} from 'native-base';
import {colors} from '../theme/colors';
import {CatalogList, IconOnlyHeader} from '../components/molecules';
import {ListEmptyComponent} from '../components/atoms';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import {useGetMedicinesByDiseaseQuery} from '../store/services';
import {useAppSelector} from '../store/hooks';

const Data = [
  {
    id: '1',
    label: 'Pharmacies',
    icon: null,
  },
  {
    id: '2',
    label: 'Sores',
    icon: null,
  },
  {
    id: '3',
    label: 'Clinics',
    icon: null,
  },
  {
    id: '4',
    label: 'MakeUp',
    icon: null,
  },
];

interface Props {
  id: string;
  item: string;
  volume: string;
  amount: string;
}

export function SeeAllDrugsScreen() {
  const {selectedDiseaseId} = useAppSelector(state => state.medicine);
  const {data, isLoading} = useGetMedicinesByDiseaseQuery(selectedDiseaseId);
  console.log(
    '🚀 ~ file: SeeAllDrugsScreen.tsx:46 ~ SeeAllDrugsScreen ~ data:',
    data?.data?.medicines,
  );

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
      <CatalogList Data={Data} />
      <FlatList
        style={{marginTop: 4}}
        numColumns={2}
        data={data?.data?.medicines}
        ListEmptyComponent={() => {
          return <ListEmptyComponent />;
        }}
        renderItem={({item}) => <Card />}
        keyExtractor={(item: Props) => item.id}
      />
      {/* <FilterSheet isOpen={isOpen} onClose={onClose} setData={setData} /> */}
    </Stack>
  );
}

function Card() {
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
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyY-0cJsK52fsQPnfIXhFnNrLij-YujWCHVw&usqp=CAU',
        }}
        h={99}
        w={'100%'}
        alt="Alternate Text"
        resizeMode="cover"
      />
      <Stack p={2}>
        <Text fontSize={14} color={'black'} fontWeight={'semibold'}>
          Sulfasalazine (Sulfasalazine) 500mg Tablet
        </Text>
        <Text fontSize={14} color={'black'} fontWeight={'semibold'}>
          30-90 Tablet
        </Text>
      </Stack>
    </Pressable>
  );
}
