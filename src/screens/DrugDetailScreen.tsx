import {View} from 'react-native';
import React from 'react';
import {Center, HStack, ScrollView, Spinner, Stack, Text} from 'native-base';
import {colors} from '../theme/colors';
import {Carousel1, Carousel1Centered, Carousel2} from '../components/organisms';
import {fonts} from '../theme/fonts';
import {IconOnlyHeader} from '../components/molecules';
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
          <Stack px={4} bg={colors.pureWhite} pb={8}>
            <IconOnlyHeader
              iconL={heart}
              iconR={share}
              onPressL={() => {
                console.log('cat');
              }}
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
          <Stack pt={6} px={4} space={3} bg={colors.pureWhite} pb={16}>
            <Text style={fonts.subtitle1}>Drug Description </Text>
            <Text style={fonts.body1}>{data?.data?.description}</Text>
          </Stack>
        </Stack>
      </ScrollView>
      <Stack
        px={2}
        pt={3}
        position={'absolute'}
        bottom={0}
        w={'100%'}
        alignItems={'center'}
        bg={'white'}>
        <GradientButton
          text="Visit All stores"
          onPress={() => {
            navigation.navigate(ScreenNames.DrugStores);
          }}
        />
      </Stack>
    </Stack>
  );
}

function Detail({data}) {
  return (
    <Stack mt={7} space={2} bg={colors.pureWhite} p={4} mb={2}>
      <Text style={fonts.subtitle1}>{data?.name}</Text>
      <ListDetail label="Size" value={data?.drug?.size} />
    </Stack>
  );
}

function ListDetail({label, value}) {
  return (
    <HStack space={2}>
      <Text style={fonts.body1}>{label}:</Text>
      <Text style={[fonts.body1, {color: 'black'}]} underline>
        {value} Tablet
      </Text>
    </HStack>
  );
}