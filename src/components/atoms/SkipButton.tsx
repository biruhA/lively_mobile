import {View, Text} from 'react-native';
import React, {useCallback} from 'react';
import {Button} from 'native-base';
import Context from '../../realm/config';
import {OnBoarding} from '../../realm/OnBoarding';

const {useRealm, useQuery} = Context;

export function SkipButton() {
  const realm = useRealm();
  const onboarding = useQuery(OnBoarding);

  const onPress = useCallback((): void => {
    if (onboarding.length === 0) {
      realm.write(() => {
        realm.create('OnBoarding', OnBoarding.generate(true, false));
      });
    } else {
      realm.write(() => {
        onboarding[0].hasOnBoarded = false;
      });
    }
  }, [realm, onboarding]);

  return (
    <Button onPress={onPress} alignSelf={'flex-end'} variant={'ghost'}>
      Skip
    </Button>
  );
}
