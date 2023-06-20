import {FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Stack, Text} from 'native-base';
import {GradientButtonSmall, gradientSmallVariant} from '../atoms';
import {useAppDispatch} from '../../store/hooks';
import {setSelectedProductVariantIndex} from '../../store/features/productSlice';

interface Props {
  Data: any;
  variant?: gradientSmallVariant;
}

export function VaiantList({Data, variant = 'rounded'}: Props) {
  const dispatch = useAppDispatch();
  const [IsSelected, setIsSelected] = useState(0);

  const onPress = (index: number) => {
    dispatch(setSelectedProductVariantIndex(index));
    setIsSelected(index);
  };

  return (
    <Stack>
      <FlatList
        data={Data}
        horizontal={true}
        renderItem={({item, index}) => (
          <>
            <TouchableOpacity
              onPress={() => onPress(index)}
              style={
                IsSelected === index ? styles.activeBtn : styles.inActiveBtn
              }>
              <Text>{item?.value?.english}</Text>
            </TouchableOpacity>
          </>
        )}
        keyExtractor={item => item.id}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  activeBtn: {
    backgroundColor: '#ebf6f1',
    borderColor: '#00ba63',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 8,
    marginRight: 10,
  },
  inActiveBtn: {
    backgroundColor: '#fff',
    borderColor: '#b4b4b4',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 8,
    marginRight: 10,
  },
});
