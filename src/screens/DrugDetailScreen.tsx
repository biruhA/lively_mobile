import {View} from 'react-native';
import React from 'react';
import {
  Center,
  HStack,
  ScrollView,
  Spinner,
  Stack,
  Text,
  useDisclose,
} from 'native-base';
import {colors} from '../theme/colors';
import {
  Carousel1,
  Carousel1Centered,
  Carousel2,
  StoreSheet,
} from '../components/organisms';
import {fonts} from '../theme/fonts';
import {IconOnlyHeader, RichText} from '../components/molecules';
import share from '../assets/icons/share.png';
import heart from '../assets/icons/heart.png';
import {GradientButton} from '../components/atoms';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';
import {useAppSelector} from '../store/hooks';
import {useMedicineDetailQuery} from '../store/services';

export function DrugDetailScreen() {
  const navigation = useNavigation();
  const {selectedMedicineId} = useAppSelector(state => state.medicine);
  const {data, isLoading} = useMedicineDetailQuery(selectedMedicineId);
  console.log(
    '🚀 ~ file: DrugDetailScreen.tsx:33 ~ DrugDetailScreen ~ data:',
    data,
    selectedMedicineId,
  );
  const {isOpen, onOpen, onClose} = useDisclose();

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack flex={1}>
      <ScrollView>
        <Stack>
          <Stack px={4} bg={'white'} pb={8}>
            <IconOnlyHeader
              iconL={heart}
              iconR={share}
              onPressL={() => {}}
              onPressR={() => {}}
            />
            <Carousel1Centered
              Data={[
                {
                  banner_image: {
                    url: data?.data?.medicine_image?.url,
                  },
                },
              ]}
            />
          </Stack>
          <Detail data={data?.data} />
          <Stack pt={6} px={4} space={3} bg={'white'} pb={16}>
            <Text style={fonts.subtitle1}>Drug Description </Text>
            <RichText text={data?.data?.description} />
          </Stack>
        </Stack>
      </ScrollView>
      <Stack
        p={2}
        position={'absolute'}
        bottom={0}
        w={'100%'}
        alignItems={'center'}
        bg={'white'}>
        {data?.data?.has_store && (
          <GradientButton
            text="Visit All stores"
            onPress={() => {
              onOpen();
              // navigation.navigate(ScreenNames.DrugStores);
            }}
          />
        )}
      </Stack>
      <StoreSheet isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}

function Detail({data}) {
  return (
    <Stack mt={7} space={2} bg={'white'} p={4} mb={2}>
      <Text style={fonts.subtitle1}>
        {data?.name} {data?.drug?.scientific_name} {data?.drug?.dossage?.name}
      </Text>
      <ListDetail label="Manufacturer" value={data?.drug_brand?.name} />
      <ListDetail label="Country" value={data?.drug_brand?.country} />
      <ListDetail label="DOSAGE" value={data?.drug?.dossage?.name} />
      <ListDetail label="Size" value={data?.drug?.size} />
    </Stack>
  );
}

function ListDetail({label, value}) {
  return (
    <HStack space={2}>
      <Text style={fonts.body1}>{label}:</Text>
      <Text style={[fonts.body1, {color: 'black'}]} underline>
        {value}
      </Text>
    </HStack>
  );
}
