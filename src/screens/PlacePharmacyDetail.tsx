import {Linking, Platform, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {Divider, HStack, Stack, Text, VStack, Badge, Button} from 'native-base';
import {colors} from '../theme/colors';
import {GoBack} from '../components/atoms';
import {ScreenNames} from '../constants';
import {fonts} from '../theme/fonts';
import {useRoute} from '@react-navigation/native';

export function PlacePharmacyDetail() {
  const route = useRoute();
  let Data = route?.params?.Data;

  console.log(
    '🚀 ~ file: PlacePharmacyDetail.tsx:12 ~ PlacePharmacyDetail ~ route:',
    Data,
  );

  return (
    <Stack flex={1} bg={colors.pureWhite}>
      <Stack p={4} mb={8} bg={'white'}>
        <GoBack label="" />
      </Stack>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Stack p={4} space={8}>
          <Stack space={2}>
            <Text style={fonts.heading5}>{Data?.store?.name?.english}</Text>
            <Text style={fonts.subtitle1}>About Store</Text>
            <Text style={fonts.body1}>{Data?.store?.description?.english}</Text>
          </Stack>
          <Address Data={Data} />
          <OpeningHours Data={Data} />
        </Stack>
      </ScrollView>
    </Stack>
  );
}

function Rows({label, value}) {
  return (
    <Stack py={2}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="md" color={'#636363'}>
          {label}
        </Text>
        <Text fontSize="md" alignSelf="flex-end">
          {value}
        </Text>
      </HStack>
      <Divider marginTop={1} bg={'#E6E6E6'} thickness="0.5" />
    </Stack>
  );
}

function Address({Data}) {
  return (
    <Stack>
      <Text style={fonts.heading5}>Address</Text>
      {/* <Rows label={'City'} value={'Addis Ababa'} /> */}
      {/* <Rows label={'Sub City'} value={'Nefas Silk'} /> */}
      <Rows label={'Phone'} value={Data?.store?.phone} />
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="md" color={'#636363'}>
          Location
        </Text>
        <TouchableOpacity
          onPress={() => {
            const lat = Data?.location?.latitude;
            const lon = Data?.location?.longitude;
            const url = Platform.select({
              ios: 'maps:' + lat + ',' + lon,
              android: 'geo:' + lat + ',' + lon,
            });
            Linking.openURL(url);
          }}>
          <Badge rounded={'md'} colorScheme="#E2FFF1">
            <Text style={{color: colors.primary}}>View on the map</Text>
          </Badge>
        </TouchableOpacity>
      </HStack>
      <Divider marginTop={1} bg={'#E6E6E6'} thickness="0.5" />
      <Rows label={'Website'} value={Data?.store?.website} />
    </Stack>
  );
}

function OpeningHours({Data}) {
  return (
    <Stack>
      <Text style={fonts.heading5}>Opening Hours</Text>
      {Data?.opening_hours.map(days => {
        return (
          <Rows
            label={days?.day_of_week}
            value={`${days?.opening_time.substr(
              0,
              5,
            )} - ${days?.closing_time.substr(0, 5)}`}
          />
        );
      })}
    </Stack>
  );
}
