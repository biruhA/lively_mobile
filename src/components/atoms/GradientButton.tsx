import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../theme/colors';
import {HStack, Spinner} from 'native-base';

interface Props {
  text: string;
  disabled?: boolean;
  onPress: any;
  title?: string;
  mainStyle?: object;
  isLoading?: boolean;
}

export const GradientButton = ({
  title,
  text,
  onPress,
  disabled = false,
  isLoading = false,
  mainStyle,
}: Props) => {
  return (
    <TouchableOpacity
      title={title}
      disabled={disabled || isLoading}
      style={[styles.main, mainStyle]}
      onPress={onPress}>
      <LinearGradient
        style={styles.container}
        colors={
          disabled || isLoading
            ? [colors.unselected, colors.unselected]
            : [colors.gradient1, colors.gradient2]
        }>
        <HStack space={2} justifyContent="center">
          {isLoading && <Spinner accessibilityLabel="Loading posts" />}
          <Text style={disabled || isLoading ? styles.txtDisabled : styles.txt}>
            {text}
          </Text>
        </HStack>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 5,
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
