import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';
import {Center, HStack, Image, Stack} from 'native-base';

export type gradientSmallVariant = 'rounded' | 'flat';

interface Props {
  text: string;
  disabled?: boolean;
  onPress: any;
  isActive?: boolean;
  icon?: any;
  variant?: gradientSmallVariant;
  mainStyle?: object;
  containerStyle?: object;
}

export const GradientButtonSmall = ({
  text,
  onPress,
  disabled = false,
  isActive = true,
  icon,
  variant = 'rounded',
  mainStyle,
  containerStyle,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.main, mainStyle]}
      style={
        variant === 'flat'
          ? [styles.mainFlat, mainStyle]
          : [styles.mainRounded, mainStyle]
      }
      onPress={onPress}>
      {isActive ? (
        <LinearGradient
          style={
            variant === 'flat'
              ? [styles.containerFlat, containerStyle]
              : [styles.containerRounded, containerStyle]
          }
          colors={
            disabled
              ? [colors.unselected, colors.unselected]
              : [colors.gradient1, colors.gradient2]
          }>
          <HStack alignItems={'center'} justifyContent={'center'} space={2}>
            {icon && <Image source={icon} alt="icon" boxSize={5} />}
            <Text style={disabled ? styles.txtDisabled : styles.txt}>
              {text}
            </Text>
          </HStack>
        </LinearGradient>
      ) : (
        <HStack
          style={
            variant === 'flat' ? styles.notActiveFlat : styles.notActiveRounded
          }
          alignItems={'center'}
          justifyContent={'center'}
          space={2}>
          {icon && <Image source={icon} alt="icon" boxSize={5} />}
          <Text style={fonts.button1}>{text}</Text>
        </HStack>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainFlat: {
    marginHorizontal: 5,
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  containerFlat: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  mainRounded: {
    marginHorizontal: 5,
    alignSelf: 'center',
    borderRadius: 26,
    overflow: 'hidden',
  },
  containerRounded: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  notActiveFlat: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
  },
  notActiveRounded: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 26,
    backgroundColor: '#F2F2F2',
  },
  txt: {
    fontWeight: '400',
    color: colors.pureWhite,
    textAlign: 'center',
  },
  txtDisabled: {
    fontWeight: '400',
    color: colors.greyText,
    textAlign: 'center',
  },
});
