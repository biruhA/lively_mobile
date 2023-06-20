import React from 'react';
import {Stack, Text} from 'native-base';
import {FilterButton} from '../molecules';
import {bodyTypes} from './FilterSheet';
import {fonts} from '../../theme/fonts';
import {useAppSelector} from '../../store/hooks';

interface Props {
  setSelectedBody: any;
}

export function FilterBodyMenu({setSelectedBody}: Props) {
  const {brandLabel, discountLabel, priceLabel, distanceLabel} = useAppSelector(
    state => state.filter,
  );

  return (
    <Stack space={4} w={'100%'} py={4}>
      <Text pt={1} style={fonts.heading6}>
        Filter by
      </Text>
      <FilterButton
        label="Brand"
        count={brandLabel}
        onPress={() => setSelectedBody(bodyTypes.brand)}
      />
      <FilterButton
        label="Discount"
        count={discountLabel}
        onPress={() => setSelectedBody(bodyTypes.discount)}
      />
      <FilterButton
        label="Price"
        count={priceLabel}
        onPress={() => setSelectedBody(bodyTypes.price)}
      />
      <FilterButton
        label="Store Distance"
        count={distanceLabel}
        onPress={() => setSelectedBody(bodyTypes.distance)}
      />
    </Stack>
  );
}
