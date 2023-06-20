import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {HStack, Image} from 'native-base';
import rightArrowBlack from '../../assets/icons/right_arrow_black.png';
import {colors} from '../../theme/colors';
import {SelectedBody} from '../organisms';
import {fonts} from '../../theme/fonts';

interface Props {
  label: string;
  count: string;
  onPress: () => void;
}

export function FilterButton({label, count, onPress}: Props) {
  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <Text style={{color: colors.NormalText}}>{label}</Text>
        <HStack alignItems={'center'} space={4}>
          <Text style={{color: colors.NormalText}}>{count}</Text>
          <Image
            source={rightArrowBlack}
            alt="rightArrowBlack"
            boxSize={3}
            resizeMode="contain"
          />
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.lightgreyText,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});
