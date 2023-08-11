import React from 'react';
import {Pressable, Text, Image, StyleSheet} from 'react-native';
import {ScreenNames} from '../../constants';
import {fonts} from '../../theme/fonts';
import {Stack} from 'native-base';

interface Props {
  label: string;
  navigation: any;
  active: number;
  inactive: number;
  navTo?: string;
  routeName?: string;
}

export function CustomBarButton({
  label,
  navTo,
  navigation,
  active,
  inactive,
  routeName,
}: Props) {
  return (
    <Pressable
      style={styles.main}
      onPress={() =>
        navigation.navigate(navTo ? ScreenNames[navTo] : ScreenNames[label])
      }>
      <Stack
        space={1}
        h={'100%'}
        alignItems={'center'}
        justifyContent={'center'}>
        {(routeName ? routeName === label : navigation.isFocused()) ? (
          <Image style={styles.img} source={active} />
        ) : (
          <Image style={styles.img} source={inactive} />
        )}
        <Text style={styles.label}>{label}</Text>
      </Stack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '25%',
  },
  img: {
    width: 24,
    height: 24,
  },
  label: {...fonts.tabs, paddingTop: 5},
});
