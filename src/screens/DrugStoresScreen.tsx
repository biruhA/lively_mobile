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
            id={item?.id}
            store={`${item?.store_name?.english} ${item?.store_branch_name?.english}`}
            distance={item?.distance}
            rating={item?.rating?.average}
            imageUrl={item?.store_logo?.url}
            price={item?.price}
            discountAmount={null}
            discountPresent={null}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Stack>
  );
}
