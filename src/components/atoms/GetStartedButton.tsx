import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import React, {useCallback} from 'react';
import Context from '../../realm/config';
import {OnBoarding} from '../../realm/OnBoarding';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../theme/colors';

const {useRealm, useQuery} = Context;

export function GetStartedButton() {
  const realm = useRealm();
  const onboarding = useQuery(OnBoarding);

  const onPress = useCallback((): void => {
    if (onboarding.length === 0) {
      realm.write(() => {
        realm.create('OnBoarding', OnBoarding.generate(true));
      });
    } else {
      realm.write(() => {
        onboarding[0].hasOnBoarded = false;
      });
    }
  }, [realm, onboarding]);

  return (
    <TouchableOpacity
      style={{width: '94%', alignSelf: 'flex-end'}}
      onPress={onPress}>
      <LinearGradient
        style={styles.nextFull}
        colors={[colors.gradient1, colors.gradient2]}>
        <Text style={styles.nextTxt}>Get Started</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nextFull: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
  },
  nextTxt: {
    color: colors.pureWhite,
    textAlign: 'center',
  },
});
