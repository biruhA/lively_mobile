import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {FilterGoBack, GradientButton} from '../atoms';
import {Divider, Stack, Text} from 'native-base';
import {RangeSlider} from '../molecules';
import {fonts} from '../../theme/fonts';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setPrice} from '../../store/features/filterSlice';
import {bodyTypes} from './FilterSheet';

interface Props {
  setSelectedBody: any;
}

export function FilterBodyPrice({setSelectedBody}: Props) {
  const {filterData} = useAppSelector(state => state.filter);
  const [sliderOneValue, setSliderOneValue] = useState(filterData?.price?.min);
  const [sliderTwoValue, setSliderTwoValue] = useState(filterData?.price?.max);
  const dispatch = useAppDispatch();

  return (
    <Stack w={'100%'} py={2} space={3} justifyContent={'center'} pb={4}>
      <FilterGoBack label="Price" setSelectedBody={setSelectedBody} />
      <Stack pt={2}>
        <Text
          style={[fonts.subtitle2, {fontWeight: '600', color: 'black'}]}
          px={2}>
          Price
        </Text>
        <RangeSlider
          prefix=" Birr"
          sliderOneValue={sliderOneValue}
          setSliderOneValue={setSliderOneValue}
          sliderTwoValue={sliderTwoValue}
          setSliderTwoValue={setSliderTwoValue}
          minValue={filterData?.price?.min}
          maxValue={filterData?.price?.max}
        />
      </Stack>
      <Divider bg={'#E6E6E6'} thickness="2" />
      <GradientButton
        text="Apply"
        onPress={() => {
          dispatch(
            setPrice({
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
