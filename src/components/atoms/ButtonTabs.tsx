import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../theme/colors';
import {HStack, Image} from 'native-base';

export function ButtonTabs({
  buttonOneTitle,
  buttonTwoTitle,
  buttonOneIcon,
  buttonTwoIcon,
  isPharmacySelected,
  setIsPharmacySelected,
}: any) {
  const onPress = value => {
    console.log('Store is clicked: ', setIsPharmacySelected);
    setIsPharmacySelected(value);
  };

  return (
    <HStack space={3} w={'100%'}>
      <TouchableOpacity style={styles.main} onPress={() => onPress(true)}>
        <LinearGradient
          style={styles.container}
          colors={
            isPharmacySelected
              ? [colors.unselected, colors.unselected]
              : [colors.gradient1, colors.gradient2]
          }>
          <HStack space={2} justifyContent="center" alignItems={'center'}>
            <Image source={buttonOneIcon} alt="search" size="24px" />
            <Text style={isPharmacySelected ? styles.txtDisabled : styles.txt}>
              {buttonOneTitle}
            </Text>
          </HStack>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.main} onPress={() => onPress(false)}>
        <LinearGradient
          style={styles.container}
          colors={
            !isPharmacySelected
              ? [colors.unselected, colors.unselected]
              : [colors.gradient1, colors.gradient2]
          }>
          <HStack space={2} justifyContent="center" alignItems={'center'}>
            <Image source={buttonTwoIcon} alt="search" size="24px" />
            <Text style={!isPharmacySelected ? styles.txtDisabled : styles.txt}>
              {buttonTwoTitle}
            </Text>
          </HStack>
        </LinearGradient>
      </TouchableOpacity>
    </HStack>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '48%',
    height: 30,
    alignSelf: 'center',
  },
  container: {
    paddingVertical: 8,
    borderRadius: 26,
  },
  txt: {
    fontWeight: '400',
    paddingTop: 3,
    color: colors.pureWhite,
    textAlign: 'center',
  },
  txtDisabled: {
    fontWeight: '400',
    color: colors.greyText,
    textAlign: 'center',
  },
});
