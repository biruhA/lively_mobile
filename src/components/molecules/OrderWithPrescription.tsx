import React from 'react';
import {Stack, Image, Pressable, Text, useDisclose} from 'native-base';
import {fonts} from '../../theme/fonts';
import rx_card from '../../assets/images/rx_card.png';
import {GradientButtonSmall} from '../atoms';
import {LoginSheet} from '../sheets';
import {ScreenNames} from '../../constants';
import {useAppSelector} from '../../store/hooks';

export function OrderWithPrescription({onCamPress}) {
  const {isLoggedIn, inAppLoggedIn} = useAppSelector(state => state.auth);
  const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <Stack bg={'#E9F4EF'} rounded={'lg'} px={4} pb={2} pt={4} space={2}>
      <Text style={[fonts.body1, {color: 'black'}]}>
        Order drugs with Prescription
      </Text>
      <Text style={fonts.caption} w={'75%'}>
        Upload your prescription & we will show you the medicines
      </Text>
      <GradientButtonSmall
        text={'Upload now'}
        onPress={() => {
          if (isLoggedIn || (!isLoggedIn && inAppLoggedIn)) {
            onCamPress();
          } else {
            onOpen();
          }
        }}
        mainStyle={{
          alignSelf: 'flex-start',
          marginHorizontal: 0,
          marginTop: 5,
        }}
      />
      <Image
        position={'absolute'}
        bottom={0}
        right={2}
        source={require('../../assets/images/order_with_prescription.png')}
        alt="Alternate Text"
        w={79}
        h={110}
      />
      <LoginSheet
        isOpen={isOpen}
        onClose={onClose}
        action={ScreenNames.MedicinePerscription}
        payload={''}
      />
    </Stack>
  );
}
