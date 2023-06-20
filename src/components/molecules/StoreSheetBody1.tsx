import React from 'react';
import {HStack, Image, Stack, Text, useDisclose} from 'native-base';
import placeBackground from '../../assets/images/place-background.png';
import {fonts} from '../../theme/fonts';
import {GradientButtonSmall} from '../atoms';
import {LoginSheet} from '../organisms';
import {useAppSelector} from '../../store/hooks';
import {colors} from '../../theme/colors';

export function StoreSheetBody1({onPress}: any) {
  const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <Stack w={'100%'} p={2} space={2}>
      <Stack>
        <Text style={fonts.heading6}>Yardley Loose Powder</Text>
        <Text style={fonts.body1}>You can find the product in this store</Text>
      </Stack>
      <Image
        source={placeBackground}
        alt="Alternate Text"
        w={'100%'}
        h={120}
        resizeMode={'contain'}
      />
      <HStack alignItems={'flex-start'}>
        <Image
          position={'absolute'}
          borderRadius={8}
          top={-15}
          left={5}
          bg={'white'}
          source={{
            uri: 'https://saspharmacies.com/assets/images/sas-multi-ln-logo.png',
          }}
          alt="Alternate Text"
          w={65}
          h={60}
          resizeMode={'contain'}
        />
        <Stack ml={100}>
          <Text style={fonts.subtitle1} numberOfLines={2}>
            SAS Pharmacy
          </Text>
          <Text>Addis Ababa, Ethiopia</Text>
        </Stack>
      </HStack>
      <SelectedProductCard />
      <GradientButtonSmall
        mainStyle={{borderRadius: 8, width: '100%', marginTop: 10}}
        containerStyle={{paddingVertical: 13}}
        text="Login to view"
        onPress={() => {
          // onOpen();
          onPress();
        }}
      />
      <LoginSheet isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}

function SelectedProductCard() {
  const {selectedProduct, selectedProductVariantIndex} = useAppSelector(
    state => state.product,
  );

  return (
    <HStack space={3} pt={6} pb={3}>
      <Image
        source={{uri: selectedProduct?.thumbnail?.url}}
        alt="thumbnail"
        w={94}
        h={54}
      />
      <Stack w={'70%'} space={1}>
        <Text style={fonts.subtitle1}>
          {selectedProduct?.title?.english}
          Philosophy Renewed Hope in a Jar Moisturizer
        </Text>
        <Text style={[fonts.body2, {color: colors.primary}]}>
          Selected Size:{' '}
          {
            selectedProduct?.variants[selectedProductVariantIndex]?.value
              ?.english
          }
        </Text>
      </Stack>
    </HStack>
  );
}
