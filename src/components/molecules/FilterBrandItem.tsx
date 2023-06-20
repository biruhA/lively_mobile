import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Checkbox, Image, Stack} from 'native-base';
import checked from '../../assets/icons/checked.png';

interface Props {
  value: string;
  groupValues: any;
  setGroupValues: any;
  imageUrl: string;
}

export function FilterBrandItem({
  value,
  groupValues,
  setGroupValues,
  imageUrl,
}: Props) {
  const [IsChecked, setIsChecked] = useState(false);

  function onPress() {
    setIsChecked(prev => !prev);
    const newGroupValues = groupValues.map(item => {
      if (item?.id === value) {
        return {
          id: item?.id,
          isChecked: !item?.isChecked,
        };
      } else {
        return item;
      }
    });
    setGroupValues(newGroupValues);
  }

  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      {IsChecked && (
        <Image
          position={'absolute'}
          right={2}
          source={checked}
          zIndex={1}
          boxSize={4}
          resizeMode="contain"
          alt="image"
        />
      )}
      <Image
        source={{
          uri: imageUrl,
        }}
        w={'100%'}
        h={109}
        resizeMode="contain"
        alt="image"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '47%',
    marginHorizontal: 6,
    marginVertical: 8,
    padding: 5,
    borderRadius: 8,
  },
});
