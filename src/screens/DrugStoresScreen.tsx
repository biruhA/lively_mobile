import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {Center, HStack, Image, Spinner, Stack} from 'native-base';
import {fonts} from '../theme/fonts';
import {
  PharmacyCardLarge,
  StoreHeader,
  StoresCardLarge,
} from '../components/molecules';
import {colors} from '../theme/colors';
import {useMedicineStoresQuery, useStoresQuery} from '../store/services';
import {useAppSelector} from '../store/hooks';
import {useCurrentLocation} from '../hooks';
import {GoBack} from '../components/atoms';
import TouchableIcon from '../components/atoms/TouchableIcon';

interface Props {
  id?: string;
  label: string;
  value: string;
}

export function DrugStoresScreen() {
  const {userLocation} = useAppSelector(state => state.search);
  const {selectedMedicineId} = useAppSelector(state => state.medicine);
  const {data, isLoading} = useMedicineStoresQuery({
    id: selectedMedicineId,
    longitude: userLocation?.lon,
    latitude: userLocation?.lat,
  });
  console.log(
    '🚀 ~ file: DrugStoresScreen.tsx:26 ~ DrugStoresScreen ~ data:',
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
    <Stack bg={colors.pureWhite} flex={1} px={4} py={2} space={3}>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <GoBack label="All Stores" />
        <TouchableIcon
          image={require('../assets/icons/filter.png')}
          onPress={() => {}}
        />
      </HStack>
      <Text style={fonts.subtitle1}>All Available Pharmacies</Text>
      <FlatList
        data={data?.data?.data}
        renderItem={({item}) => (
          <PharmacyCardLarge
            id={'1'}
            store={'SAS Pharmacy'}
            distance={'12'}
            rating={'52'}
            imageUrl={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyY-0cJsK52fsQPnfIXhFnNrLij-YujWCHVw&usqp=CAU'
            }
            price={'120'}
            discountAmount={null}
            discountPresent={null}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Stack>
  );
}
