import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {Stack, HStack} from 'native-base';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

interface Props {
  prefix: string;
  sliderOneValue: number;
  setSliderOneValue: any;
  sliderTwoValue: number;
  setSliderTwoValue: any;
  minValue: number;
  maxValue: number;
}

export function RangeSlider({
  prefix,
  sliderOneValue,
  setSliderOneValue,
  sliderTwoValue,
  setSliderTwoValue,
  minValue,
  maxValue,
}: Props) {
  const sliderValuesChange = (values: any) => {
    setSliderOneValue(values[0]);
    setSliderTwoValue(values[1]);
  };

  return (
    <Stack px={4} pb={4}>
      <View style={styles.container}>
        <MultiSlider
          values={[sliderOneValue, sliderTwoValue]}
          min={minValue === maxValue ? 0 : minValue}
          max={maxValue === 0 ? 100 : maxValue}
          markerStyle={styles.marker}
          trackStyle={styles.track}
          selectedStyle={styles.selectedTrack}
          sliderLength={Dimensions.get('window').width - 45}
          onValuesChange={sliderValuesChange}
        />
      </View>
      <HStack justifyContent={'space-between'}>
        <Text style={fonts.normal}>
          {sliderOneValue}
          {prefix}
        </Text>
        <Text style={fonts.normal}>
          {sliderTwoValue}
          {prefix}
        </Text>
      </HStack>
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 40,
  },
  marker: {
    height: 22,
    width: 22,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: colors.primary,
    elevation: 2,
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E3E3E3',
  },
  selectedTrack: {
    backgroundColor: colors.primary,
  },
});
