import React, {useState} from 'react';
import {
  Button,
  Divider,
  FlatList,
  HStack,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import {Carousel1Centered} from '../components/organisms';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  AccordionItemTwo,
  ApiImage,
  LabeledHeader,
  SectionHeader,
} from '../components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {fonts} from '../theme/fonts';
import {setSelectedMedicineId} from '../store/features/medicineSlice';
import {colors} from '../theme/colors';

export function DrugDetailScreen2() {
  const navigation = useNavigation();
  const {selectedMedicineId} = useAppSelector(state => state.medicine);

  return (
    <Stack flex={1}>
      <LabeledHeader label="" />
      <ScrollView>
        <HeaderImage />
        <Detail />
        <Stack m={4} borderRadius={20} py={3} shadow={'4'} bg={'white'}>
          <AccordionItemTwo title={'Drug Description'}>
            <Text>Cat</Text>
          </AccordionItemTwo>
          <Divider thickness={'1'} />
          <AccordionItemTwo title={'Side Effect'}>
            <Text>Cat</Text>
          </AccordionItemTwo>
          <Divider thickness={'1'} />
          <AccordionItemTwo title={'Contraindication'}>
            <Text>Cat</Text>
          </AccordionItemTwo>
          <Divider thickness={'1'} />
          <AccordionItemTwo title={'Drug interactions'}>
            <Text>Cat</Text>
          </AccordionItemTwo>
        </Stack>
        <Stack px={4} py={2} mb={16}>
          <SectionHeader id={''} label={'Related Drugs'} navTo={''} />
          <FlatList
            horizontal
            data={[]}
            renderItem={({item}) => (
              <Cards
                id={item.id}
                imageUrl={item?.medicine_image?.url}
                name={item?.name}
                size={item?.drug?.size}
              />
            )}
            keyExtractor={item => item.id}
          />
        </Stack>
      </ScrollView>
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
        navigation.navigate('DrugDetailScreen2');
      }}>
      <Stack
        w={'100%'}
        my={2}
        bg="white"
        rounded={'md'}
        shadow={0}
        overflow={'hidden'}>
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
  );
}

function HeaderImage() {
  return (
    <Stack>
      <ApiImage
        imageUrl={''}
        style={{width: '100%', height: 170}}
        resizeMode="cover"
      />
      <ApiImage imageUrl={''} style={styles.sideImg} resizeMode="contain" />
    </Stack>
  );
}

function Detail() {
  return (
    <Stack px={4} mt={8} space={2}>
      <Text style={fonts.subtitle1}>Tramadol Denk</Text>
      <Text style={fonts.normal}>
        Aluminum Hydroxide + Magnesium Hydroxide + Simethicone (4.58mg + 5mg +
        7.5mg + 50mg)/ 5ml
      </Text>
      <DetilItem label="Dosage Form" value="Dry Powder Inhalation" />
      <DetilItem label="Size of package" value="Dry Powder Inhalation" />
      <DetilItem label="Prescription" value="Dry Powder Inhalation" />
      <DetilItem
        label="Country of manufacturer"
        value="Dry Powder Inhalation"
      />
      <HStack alignItems={'center'} py={1} space={2}>
        <Text style={[fonts.body1, {color: '#000000CC', fontSize: 17}]}>
          Manufacturer :
        </Text>
        <Text style={[fonts.normal, styles.underLinedText]}>
          East African Pharmaceuticals
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

const styles = StyleSheet.create({
  container: {
    width: '47%',
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
});
