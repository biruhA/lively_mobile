import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {Stack} from 'native-base';
import {IconOnlyHeader} from '../components/molecules';
import share from '../assets/icons/share.png';
import heart from '../assets/icons/heart.png';
import {DiscountDetail, ProductCarousel} from '../components/organisms';
import {colors} from '../theme/colors';
import {GradientButton} from '../components/atoms';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../constants';

export function DiscountDetailScreen() {
  const navigation = useNavigation();

  return (
    <Stack flex={1} bg={colors.pureWhite} pt={4} pb={2} px={2}>
      <Stack px={5}>
        <IconOnlyHeader
          iconL={share}
          iconR={heart}
          onPressL={() => {
            console.log('cat');
          }}
          onPressR={() => {}}
        />
      </Stack>
      <ScrollView style={{paddingHorizontal: 8}}>
        <ProductCarousel
          images={[
            {
              url: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1655153111-41fYY4Q1KL._SL500_.jpg?crop=0.944xw:1xh;center,top&resize=980:*',
            },
            {
              url: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1655153111-41fYY4Q1KL._SL500_.jpg?crop=0.944xw:1xh;center,top&resize=980:*',
            },
          ]}
        />
        <DiscountDetail />
        {/* <DiscountDescription /> */}
      </ScrollView>
      <GradientButton
        text="Claim Discount"
        onPress={() => navigation.navigate(ScreenNames.ClaimDiscount)}
      />
    </Stack>
  );
}
