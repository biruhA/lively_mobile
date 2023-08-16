import React, {useEffect, useState} from 'react';
import {Actionsheet, Center, Divider, Spinner, Stack, Text} from 'native-base';
import {FilterBodyBrand} from './FilterBodyBrand';
import {FilterBodyDiscount} from './FilterBodyDiscount';
import {FilterBodyPrice} from './FilterBodyPrice';
import {FilterBodyDistance} from './FilterBodyDistance';
import {colors} from '../../theme/colors';
import {FilterBodyMenu} from './FilterBodyMenu';
import {GradientButton} from '../atoms';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  useApplyFilterMutation,
  useFilterCountQuery,
} from '../../store/services';
import {reset} from '../../store/features/filterSlice';

interface Props {
  isOpen: any;
  onClose: any;
  setData: any;
}

export enum bodyTypes {
  menu = 'menu',
  brand = 'brand',
  discount = 'discount',
  price = 'price',
  distance = 'distance',
}

export function FilterSheet({isOpen, onClose, setData}: Props) {
  const [selectedBody, setSelectedBody] = useState(bodyTypes.menu);
  const {selectedCategoryId} = useAppSelector(state => state.product);
  const {data, isLoading} = useFilterCountQuery(selectedCategoryId);
  const [ApplyFilter, result] = useApplyFilterMutation();
  const {filterData, brandValue, discountValue, priceValue, distanceValue} =
    useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  function onPress() {
    ApplyFilter({
      brandIds: brandValue,
      discount_min: discountValue.min,
      discount_max: discountValue.max,
      price_min: priceValue.min,
      price_max: priceValue.max,
      // distance_min:distanceValue,
      // distance_max:distanceValue,
    });
  }

  useEffect(() => {
    if (result.isSuccess) {
      setData(result?.data);
    }
  }, [result]);

  return (
    <Stack bg={colors.pureWhite}>
      <Actionsheet
        isOpen={isOpen}
        onClose={() => {
          dispatch(reset());
          setSelectedBody(bodyTypes.menu);
          onClose();
        }}>
        {isLoading ? (
          <Center h={250} w={'100%'} bg={'white'} roundedTop={'lg'}>
            <Spinner size={'lg'} />
          </Center>
        ) : (
          <Actionsheet.Content>
            {selectedBody === bodyTypes.menu && (
              <FilterBodyMenu setSelectedBody={setSelectedBody} />
            )}
            {selectedBody === bodyTypes.brand && (
              <FilterBodyBrand setSelectedBody={setSelectedBody} />
            )}
            {selectedBody === bodyTypes.discount && (
              <FilterBodyDiscount setSelectedBody={setSelectedBody} />
            )}
            {selectedBody === bodyTypes.price && (
              <FilterBodyPrice setSelectedBody={setSelectedBody} />
            )}
            {selectedBody === bodyTypes.distance && (
              <FilterBodyDistance setSelectedBody={setSelectedBody} />
            )}
            {selectedBody === bodyTypes.menu && (
              <Stack space={3} py={3} w={'100%'}>
                <Divider bg={'#E6E6E6'} thickness="2" />
                <GradientButton text="Filter" onPress={onPress} />
              </Stack>
            )}
          </Actionsheet.Content>
        )}
      </Actionsheet>
    </Stack>
  );
}
