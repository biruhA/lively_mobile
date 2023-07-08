import {StyleSheet} from 'react-native';
import React from 'react';
import {useGetClaimedDetailQuery} from '../store/services';
import {useAppSelector} from '../store/hooks';
import {HStack, Image, Stack, Text} from 'native-base';
import {GoBack, GradientButtonSmall} from '../components/atoms';
import {fonts} from '../theme/fonts';
import {colors} from '../theme/colors';
import FastImage from 'react-native-fast-image';

export function NotificationDiscountScreen() {
  const {token} = useAppSelector(state => state.auth);
  const {userLocation} = useAppSelector(state => state.search);
  const {selectedNotificationId} = useAppSelector(state => state.medicine);

  const {data, isLoading} = useGetClaimedDetailQuery({
    id: selectedNotificationId,
    token,
    longitude: userLocation?.lon,
    latitude: userLocation?.lat,
  });

  console.log(
    '🚀 ~ file: NotificationDiscountScreen.tsx:14 ~ NotificationDiscountScreen ~ data:',
    data?.data,
  );

  return (
    <Stack space={4}>
      <Stack p={4} bg={'white'}>
        <GoBack label="Discount Claimed" />
      </Stack>
      <Stack style={styles.main} alignItems={'center'} space={4}>
        <SelectedProductCard Data={data?.data} />
        <FastImage
          style={{width: 270, height: 270}}
          source={{
            uri: data?.data?.qr_code?.url,
          }}
          resizeMode={'cover'}
        />
        <Stack bg={'#F4F4F4B2'} borderRadius={5} px={41} py={21}>
          <Text pt={2} style={fonts.heading5}>
            783242HJNBB
          </Text>
        </Stack>
        {/* Store Card */}
        <HStack pb={8} w={'75%'} justifyContent={'space-between'}>
          <GradientButtonSmall isActive={false} text="Share" variant="flat" />
          <GradientButtonSmall text="GO to store" variant="flat" />
        </HStack>
      </Stack>
    </Stack>
  );
}

function SelectedProductCard({Data}) {
  return (
    <HStack space={2} p={2}>
      <Image
        source={{uri: Data?.product_image?.url}}
        alt="thumbnail"
        w={66}
        h={54}
      />
      <Stack w={'77%'} space={1}>
        <Text style={fonts.subtitle1}>{Data?.product_name?.english}</Text>
        <HStack justifyContent={'space-between'}>
          <Stack>
            <HStack space={2}>
              <Text style={styles.lightText}>{Data?.price} Birr</Text>
              <Text style={styles.lightText}>{Data?.discount}% off</Text>
            </HStack>
            <Text style={styles.priceText}>{Data?.current_price} Birr</Text>
          </Stack>
          <Text style={[fonts.body2, {color: colors.primary}]}>
            Selected Size: {Data?.variant?.english}
          </Text>
        </HStack>
      </Stack>
    </HStack>
  );
}

const styles = StyleSheet.create({
  selectedText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.lightgreyText,
  },
  lightText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.lightgreyText,
  },
  priceText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.primary,
  },
  main: {
    margin: 24,
    paddingHorizontal: 2,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: 'rgba(25, 38, 32, 0.3)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
});
