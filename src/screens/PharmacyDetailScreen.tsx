import {FlatList, ScrollView} from 'react-native';
import React from 'react';
import {HStack, Image, Spinner, Stack, Text} from 'native-base';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/colors';
import {GoBack, GradientButtonSmall} from '../components/atoms';
import phone from '../assets/images/phone.png';
import location from '../assets/images/location.png';
import telegram from '../assets/images/telegram.png';
import whatsup from '../assets/images/whatsup.png';
import facebook from '../assets/images/facebook.png';
import website from '../assets/images/website.png';
import {PharmacyCardLarge} from '../components/molecules';
import {useAppSelector} from '../store/hooks';
import {useStoreDetailByIdQuery} from '../store/services';

export function PharmacyDetailScreen() {
  const {userLocation} = useAppSelector(state => state.search);
  const {selectedStoreId} = useAppSelector(state => state.store);
  const {data, isLoading} = useStoreDetailByIdQuery({
    id: selectedStoreId,
    latitude: userLocation?.lat,
    longitude: userLocation?.lon,
  });

  console.log(
    '🚀 ~ file: PharmacyDetailScreen.tsx:25 ~ PharmacyDetailScreen ~ data:',
    data?.data,
  );

  if (isLoading) {
    return <Spinner py={'90%'} size="large" color="red" />;
  }

  return (
    <Stack flex={1} bg={colors.pureWhite} w={'100%'} px={4} space={2}>
      <ScrollView>
        <Stack mt={5} mb={2}>
          <GoBack label="Pharmacy" />
        </Stack>
        <Image
          source={require('../assets/images/place-background.png')}
          alt="Alternate Text"
          w={'100%'}
          h={120}
          resizeMode={'contain'}
        />
        <HStack alignItems={'flex-start'}>
          <Image
            position={'absolute'}
            borderRadius={8}
            top={-30}
            left={5}
            bg={'white'}
            source={{
              uri: 'https://wallpaperaccess.com/full/317501.jpg',
            }}
            alt="Alternate Text"
            w={65}
            h={65}
            resizeMode={'contain'}
          />
          <Stack ml={100}>
            <Text style={fonts.subtitle1} numberOfLines={2}>
              store_name
            </Text>
            <Text>cityOrTown</Text>
          </Stack>
        </HStack>
        <Stack>
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
          <ContactAddress />
        </Stack>
        <Stack space={1}>
          <Text style={[fonts.subtitle2, {color: 'black'}]}>
            Notify The Store
          </Text>
          <Text style={[fonts.body2, {color: colors.lightgreyText}]}>
            Tell the Store you are interested in buying the item, They will
            contact you right away.
          </Text>
        </Stack>
        <GradientButtonSmall
          mainStyle={{
            borderRadius: 8,
            width: '100%',
            marginTop: 5,
          }}
          containerStyle={{paddingVertical: 13}}
          text="Get in touch"
          onPress={() => {}}
        />
      </ScrollView>
    </Stack>
  );
}

const Data = [
  {id: 1, url: phone, name: 'Phone Number'},
  {id: 2, url: location, name: 'Location'},
  {id: 3, url: telegram, name: 'Telegram'},
  {id: 4, url: whatsup, name: 'WhatsApp'},
  {id: 5, url: facebook, name: 'Facebook'},
  {id: 6, url: website, name: 'Website'},
];

function ContactAddress() {
  return (
    <Stack borderWidth={1} borderColor={colors.border} p={2} borderRadius={8}>
      <Text style={[fonts.subtitle2, {color: 'black', paddingBottom: 5}]}>
        Contact Address
      </Text>
      <FlatList
        data={Data}
        renderItem={({item}) => (
          <HStack
            py={2}
            justifyContent={'space-between'}
            alignItems={'center'}
            borderBottomWidth={1}
            borderBottomColor={colors.border}>
            <Text style={fonts.body1}>{item?.name}</Text>
            <Image source={item.url} alt="phone" boxSize={7} borderRadius={6} />
          </HStack>
        )}
        keyExtractor={item => item.id}
      />
    </Stack>
  );
}
