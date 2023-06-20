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
}

export function SingleSlider({
  prefix,
  sliderOneValue,
  setSliderOneValue,
}: Props) {
  const sliderValuesChange = (values: any) => {
    setSliderOneValue(values[0]);
  };

  return (
    <Stack px={4}>
      <View style={styles.container}>
        <MultiSlider
          values={[sliderOneValue]}
          min={0}
          max={100}
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
      </HStack>
      <Text>RangeSlider</Text>
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
