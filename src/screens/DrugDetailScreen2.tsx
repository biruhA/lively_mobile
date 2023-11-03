import React, {useState} from 'react';
import {
  Button,
  Center,
  Divider,
  FlatList,
  HStack,
  Image,
  ScrollView,
  Spinner,
  Stack,
  Text,
  useDisclose,
} from 'native-base';
import {Carousel1Centered} from '../components/organisms';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  AccordionItemTwo,
  ApiImage,
  GradientButton,
  LabeledHeader,
  ShadowCard,
  StoreSheet,
} from '../components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {fonts} from '../theme/fonts';
import {setSelectedMedicineId} from '../store/features/medicineSlice';
import {colors} from '../theme/colors';
import {useMedicineDetailQuery} from '../store/services';
import {TouchableOpacityComponent} from 'react-native';
import {ScreenNames} from '../constants';

export function DrugDetailScreen2() {
  const navigation = useNavigation();
  const {selectedMedicineId} = useAppSelector(state => state.medicine);
  const {data, isLoading} = useMedicineDetailQuery(selectedMedicineId);
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
      <LabeledHeader label="" />
      <ScrollView>
        <HeaderImage
          coverImg={data?.data?.medicine_image?.url}
          brandImg={data?.data?.drug_brand?.brand_image?.url}
        />
        <Detail data={data?.data} />
        <Stack m={4} borderRadius={20} py={3} shadow={'4'} bg={'white'}>
          <AccordionItemTwo title={'Drug Description'}>
            <DrugDescription data={data?.data?.drug} />
          </AccordionItemTwo>
          <Divider thickness={'1'} />
          <AccordionItemTwo title={'Side Effect'}>
            <SideEffect data={data?.data?.drug?.side_effect} />
          </AccordionItemTwo>
          <Divider thickness={'1'} />
          <AccordionItemTwo title={'Contraindication'}>
            <Contraindication data={data?.data?.drug?.contraindication} />
          </AccordionItemTwo>
          <Divider thickness={'1'} />
          <AccordionItemTwo title={'Drug interactions'}>
            <DrugInteractions data={data?.data?.drug?.interactions} />
          </AccordionItemTwo>
        </Stack>
        <Stack px={4} py={2} mb={6}>
          <SectionHeader label={'Related Drugs'} id={data?.data?.id} />
          <FlatList
            horizontal
            data={data?.data?.related}
            renderItem={({item}) => (
              <Cards
                id={item.id}
                imageUrl={item?.medicine_image?.url}
                name={item?.name}
                size={item?.size}
              />
            )}
            keyExtractor={item => item.id}
          />
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
            }}
          />
        )}
      </Stack>
      <StoreSheet isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}

function SectionHeader({label, id}) {
  const navigation = useNavigation();

  function onPressHandler() {
    navigation.navigate(ScreenNames.SeeAllRelatedDrugs, {id});
  }

  return (
    <HStack alignItems={'center'} justifyContent={'space-between'} pt={2}>
      <Text style={[fonts.subtitle1, {color: 'black', fontWeight: '900'}]}>
        {label}
      </Text>
      <TouchableOpacity onPress={onPressHandler}>
        <Text color={colors.lightgreyText}> See All</Text>
      </TouchableOpacity>
    </HStack>
  );
}

function Cards({id, imageUrl, name, size}) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  return (
    <ShadowCard style={styles.main}>
      <TouchableOpacity onPress={() => {}}>
        <Stack w={'100%'} bg="white" rounded={'md'} overflow={'hidden'}>
          <ApiImage
            imageUrl={imageUrl}
            resizeMode="cover"
            style={{width: '100%', height: 99, alignSelf: 'flex-end'}}
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
    </ShadowCard>
  );
}

function HeaderImage({coverImg, brandImg}) {
  return (
    <Stack>
      <ApiImage
        imageUrl={coverImg}
        style={{width: '100%', height: 170, backgroundColor: 'white'}}
        resizeMode="cover"
      />
      <ApiImage
        imageUrl={brandImg}
        style={styles.sideImg}
        resizeMode="contain"
      />
    </Stack>
  );
}

function Detail({data}) {
  return (
    <Stack px={4} mt={8} space={2}>
      <Text style={fonts.subtitle1}>{data?.name}</Text>
      <Text style={fonts.normal}>
        {data?.drug?.scientific_name} {data?.drug?.strength}
      </Text>
      <DetilItem label="Dosage Form" value={data?.drug?.dossage?.name} />
      <DetilItem label="Size of package" value={data?.size} />
      <DetilItem
        label="Prescription"
        value={data?.drug?.needs_prescription ? 'Dry Powder ' : 'dsc'}
      />
      <DetilItem
        label="Country of manufacturer"
        value={data?.drug_brand?.country?.name}
      />
      <HStack alignItems={'center'} py={1} space={2}>
        <Text style={[fonts.body1, {color: '#000000CC', fontSize: 17}]}>
          Manufacturer :
        </Text>
        <Text style={[fonts.normal, styles.underLinedText]}>
          {data?.drug_brand?.name}
        </Text>
      </HStack>
    </Stack>
  );
}

function DetilItem({label, value}) {
  return (
    <HStack alignItems={'center'} py={1}>
      <Text style={[fonts.body1, {color: '#000000CC', fontSize: 17}]}>
        {label} :{' '}
      </Text>
      <Text style={[fonts.normal, styles.roundText]}>{value}</Text>
    </HStack>
  );
}

function DrugDescription({data}) {
  return (
    <Stack>
      <ImageHeader
        txt={'Drug sub group:'}
        img={require('../assets/icons/healthicons_medicines.png')}
      />
      {data?.sub_drug_groups?.map(item => {
        return <Ul>{item?.sub_group_name}</Ul>;
      })}
      <ImageHeader
        pt={4}
        txt={'Drug description:'}
        img={require('../assets/icons/healthicons_medicines.png')}
      />
      <Text style={styles.detailSubTxt} pl={6} pt={1}>
        {data?.description}
      </Text>
    </Stack>
  );
}

function SideEffect({data}) {
  return (
    <Stack>
      <ImageList
        txt={data}
        img={require('../assets/icons/covid_vaccine-protection-medicine-pill.png')}
      />
    </Stack>
  );
}

function Contraindication({data}) {
  return (
    <Stack>
      <ImageList
        txt={data}
        img={require('../assets/icons/pepicons-pencil_pill-circle-off.png')}
      />
    </Stack>
  );
}

function DrugInteractions({data}) {
  return (
    <Stack>
      <ImageList
        txt={data}
        img={require('../assets/icons/healthicons_pills-2-outline.png')}
      />
    </Stack>
  );
}

function Ul({children}) {
  return (
    <HStack alignItems={'center'} pl={4} pt={1}>
      <Text fontSize={18} color={'#636363'}>
        {'\u2022 '}
      </Text>
      <Text style={styles.detailSubTxt}>{children}</Text>
    </HStack>
  );
}

function ImageHeader({txt, img, pt = 0}) {
  return (
    <HStack alignItems={'center'} space={2} pt={pt}>
      <Image source={img} boxSize={5} />
      <Text style={styles.detailTxt}>{txt}</Text>
    </HStack>
  );
}

function ImageList({txt, img, pt = 0}) {
  return (
    <Stack space={2}>
      {!txt && (
        <Center py={4}>
          <Text style={[styles.detailSubTxt, {fontSize: 12}]}>No Data</Text>
        </Center>
      )}
      {txt?.split(';')?.map(item => {
        return (
          <HStack alignItems={'flex-start'} space={2} pt={pt}>
            <Image source={img} boxSize={4} />
            <Text style={styles.detailSubTxt}>{item}</Text>
          </HStack>
        );
      })}
    </Stack>
  );
}

const styles = StyleSheet.create({
  main: {
    width: 150,
    borderRadius: 8,
    marginRight: 15,
    marginVertical: 10,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  sideImg: {
    position: 'absolute',
    right: 10,
    bottom: -25,
    width: 50,
    height: 50,
    borderRadius: 200,
    backgroundColor: 'white',
  },
  roundText: {
    color: '#00000080',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#000000',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  underLinedText: {
    color: '#00000080',
    textDecorationLine: 'underline',
  },
  detailTxt: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#636363',
  },
  detailSubTxt: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
    color: '#636363',
  },
});
