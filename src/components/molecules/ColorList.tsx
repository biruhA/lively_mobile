import {FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Stack, Text} from 'native-base';
import {GradientButtonSmall, gradientSmallVariant} from '../atoms';
import {useAppDispatch} from '../../store/hooks';
import {setSelectedProductVariantIndex} from '../../store/features/productSlice';

interface Props {
  Data: any;
  setColor?: any;
}

export function ColorList({Data, setColor}: Props) {
  const dispatch = useAppDispatch();
  const [IsSelected, setIsSelected] = useState(0);

  const onPress = (index: number, item: any) => {
    dispatch(setSelectedProductVariantIndex(index));
    setColor(item);
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
              onPress={() => onPress(index, item)}
              style={
                IsSelected === index
                  ? [styles.activeBtn, {backgroundColor: item?.color?.hash}]
                  : [styles.inActiveBtn, {backgroundColor: item?.color?.hash}]
              }>
              <Text></Text>
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
    width: 47,
    height: 47,
    backgroundColor: '#ebf6f1',
    borderColor: '#008579',
    borderWidth: 3,
    borderRadius: 200,
    padding: 10,
    marginRight: 10,
  },
  inActiveBtn: {
    width: 47,
    height: 47,
    backgroundColor: '#fff',
    borderColor: '#b4b4b4',
    borderWidth: 1,
    borderRadius: 200,
    padding: 10,
    marginRight: 10,
  },
});
