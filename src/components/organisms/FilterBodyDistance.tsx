import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {FilterGoBack, GradientButton} from '../atoms';
import {Divider, Stack, Text} from 'native-base';
import {SingleSlider} from '../molecules';
import {fonts} from '../../theme/fonts';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {bodyTypes} from './FilterSheet';
import {setDiscount, setDistance} from '../../store/features/filterSlice';

interface Props {
  setSelectedBody: any;
}

export function FilterBodyDistance({setSelectedBody}: Props) {
  const {filterData} = useAppSelector(state => state.filter);
  const [sliderOneValue, setSliderOneValue] = useState(
    filterData?.distance?.max,
  );
  const dispatch = useAppDispatch();

  return (
    <Stack w={'100%'} py={2} space={3} justifyContent={'center'} pb={4}>
      <FilterGoBack label="Distance" setSelectedBody={setSelectedBody} />
      <Stack pt={2}>
        <Text
          style={[fonts.subtitle2, {fontWeight: '600', color: 'black'}]}
          px={2}>
          Distance
        </Text>
        <SingleSlider
          prefix=" Km"
          sliderOneValue={sliderOneValue}
          setSliderOneValue={setSliderOneValue}
        />
      </Stack>
      <Divider bg={'#E6E6E6'} thickness="2" />
      <GradientButton
        text="Apply"
        onPress={() => {
          dispatch(setDistance(sliderOneValue));
          setSelectedBody(bodyTypes.menu);
        }}
      />
    </Stack>
  );
}
