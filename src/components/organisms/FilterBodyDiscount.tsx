import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {FilterGoBack, GradientButton} from '../atoms';
import {Divider, Stack, Text} from 'native-base';
import {RangeSlider} from '../molecules';
import {fonts} from '../../theme/fonts';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {bodyTypes} from './FilterSheet';
import {setDiscount} from '../../store/features/filterSlice';

interface Props {
  setSelectedBody: any;
}

export function FilterBodyDiscount({setSelectedBody}: Props) {
  const {filterData} = useAppSelector(state => state.filter);
  const [sliderOneValue, setSliderOneValue] = useState(
    filterData?.discount?.min,
  );
  const [sliderTwoValue, setSliderTwoValue] = useState(
    filterData?.discount?.max,
  );
  const dispatch = useAppDispatch();

  return (
    <Stack w={'100%'} py={2} space={3} justifyContent={'center'} pb={4}>
      <FilterGoBack label="Discount" setSelectedBody={setSelectedBody} />
      <Stack pt={2}>
        <Text
          style={[fonts.subtitle2, {fontWeight: '600', color: 'black'}]}
          px={2}>
          Discount
        </Text>
        <RangeSlider
          prefix="%"
          sliderOneValue={sliderOneValue}
          setSliderOneValue={setSliderOneValue}
          sliderTwoValue={sliderTwoValue}
          setSliderTwoValue={setSliderTwoValue}
          minValue={filterData?.discount?.min}
          maxValue={filterData?.discount?.max}
        />
      </Stack>
      <Divider bg={'#E6E6E6'} thickness="2" />
      <GradientButton
        text="Apply"
        onPress={() => {
          dispatch(
            setDiscount({
              min: sliderOneValue,
              max: sliderTwoValue,
            }),
          );
          setSelectedBody(bodyTypes.menu);
        }}
      />
    </Stack>
  );
}
const styles = StyleSheet.create({});
